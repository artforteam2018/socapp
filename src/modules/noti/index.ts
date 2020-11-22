import * as Discord from 'discord.js';

export const noti = new class {
  private defChannel: Discord.TextChannel;
  private logChannel: Discord.TextChannel;

  constructor() {
    const discordClient = new Discord.Client();
    discordClient
      .login('NjYyOTk5NTQ2ODU0NjM3NTg5.XhCIjQ.8fCE9Q9PjG_G1jDSgbe6x-tc8Pg')
      .then(() => {
        this.defChannel = discordClient.channels.get('587992052869103656') as Discord.TextChannel;
        this.logChannel = discordClient.channels.get('670980905585606666') as Discord.TextChannel;
      });
  }

  sendSmsMessage(number: String, text: String) {
    const snippet = new Discord.RichEmbed()
      .setFooter(number)
      .setColor(0xb2ffb2)
      .addField('смс', text);
    this.defChannel.send(snippet);
  }

  sendLog(type: String, data: { id: String, msg: String }) {
    const snippet = new Discord.RichEmbed()
      .setFooter(type)
      .setColor(0xffb2b2)
      .addField('ID ошибки', data.id)
      .addField('ошибка', data.msg);
    this.logChannel.send(snippet);
  }

};
