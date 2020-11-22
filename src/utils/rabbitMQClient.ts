import * as amqplib from 'amqplib';
import { config } from 'config';
import * as cron from 'cron';
import { RabbitMQClientInstance } from 'utils';
import { RabbitMQExchanges, RabbitMQTopics } from 'types';

class RabbitMQClient {
  private static instance: RabbitMQClient = new RabbitMQClient();

  private nonExclusiveConnection: amqplib.Connection = null;
  private pushChannel: amqplib.Channel = null;

  private async createExclusiveConnection(): Promise<amqplib.Connection> {
    const connection = await amqplib.connect(`${config.rabbit.connectionURL}?heartbeat=10`);

    connection.on('error', async (error) => {
      console.log('[AMQP] exclusive connection error');
      const connection = await amqplib.connect(`${config.rabbit.connectionURL}?heartbeat=10`);
    });

    return connection;
  }

  public static getInstance() {
    return RabbitMQClient.instance;
  }

  public async connectToServer() {
    try {
      this.nonExclusiveConnection =
        await amqplib.connect({
          heartbeat: 10,
          username: 'chatbot',
          password: 'chatbot',
          hostname: '185.144.29.188',
          port: 5672,
        });

      if (!this.pushChannel) {
        this.pushChannel = await this.nonExclusiveConnection.createChannel();
      }

      this.nonExclusiveConnection.on('error', async (error) => {
        console.log(`[AMQP] error: ${error.message}`);
        this.nonExclusiveConnection = null;
        await this.pushChannel.close();
        this.pushChannel = null;
        await this.connectToServer();
      });

      console.log('[AMQP] connection established');
      // await Monitoring.push({ message: 'REST_API connected to AMQP' });
    } catch (error) {
      console.log('[AMQP] connection error');
      // await Monitoring.push({ message: 'REST_API error connecting to AMQP' });
      this.nonExclusiveConnection = null;
      await this.pushChannel.close();
      this.pushChannel = null;
      await this.connectToServer();
    }
  }

  public async subscribe(
    exchange: string,
    queueName: string,
    routing: { key: string; handler: (message: any) => any }[],
    exclusiveConsume?: boolean) {

    const job = new cron.CronJob({
      cronTime: '*/5 * * * * *',
      onTick: async () => {
        let queueChannel: amqplib.Channel;

        try {
          // If connection was accidentally dropper and not established yet,
          // return and wait for next call.
          if (!exclusiveConsume && !this.nonExclusiveConnection) {
            return;
          }

          queueChannel = exclusiveConsume ?
            await (await this.createExclusiveConnection()).createChannel() :
            await this.nonExclusiveConnection.createChannel();

          await Promise.all(routing.map(async (item: any) =>
            queueChannel.bindQueue(queueName, exchange, item.key),
          ));

          const queueInfo = await queueChannel.assertQueue(queueName);

          if (queueInfo.consumerCount > 0 && exclusiveConsume) {
            return;
          }

          await queueChannel.consume(
            queueName,
            async (message) => {
              const messageRoutingKey = message.fields.routingKey;
              const content = message.content.toString();
              const route = routing.find(i => i.key === messageRoutingKey);

              if (route) {
                route.handler(content);
              }

              queueChannel.ack(message);
            },
            {
              noAck: false,
              exclusive: exclusiveConsume,
            });

          job.stop();
        } catch (error) {
          if (queueChannel) {
            await queueChannel.close();
          }
        }
      },
      start: false,
    });

    job.start();
  }

  public async push(exchange: string, topic: string, data: any) {
    if (!this.pushChannel) {
      console.log('[AMQP]: cannot push message because channel hasn\'t been initialized.');
    } else {
      this.pushChannel.publish(
        exchange,
        topic,
        Buffer.from(JSON.stringify(data, null, 2)));
    }
  }
}

export default RabbitMQClient.getInstance();
