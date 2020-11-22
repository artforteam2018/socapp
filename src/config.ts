export const config = {
  express: {
    port: process.env['express.port'],
    ioPort: process.env['express.ioPort'],
  },
  rabbit: {
    connectionURL: 'amqp://zz@185.144.29.188//',
  },
  yandex: {
    storage: {
      access_key_id: 'QyGgUTLmFLGAcCCpHY9s',
      secret_access_key: 'r7F0xfaXnUxJFGQqZyUYF2t6FOUKvpUNFXqERkfk',
      host: 'storage.yandexcloud.net',
    },
  },
};
