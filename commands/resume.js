const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "resume",
    cooldown: 3,
  aliases: ["r",'devam-et','devam','devamet'],
  description: "Resume currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send({embed: {"description": `**${message.author} Oynatılan Bir Şarkı Bulamadım.**`, "color": "BLUE"}}); 
    if (!canModifyQueue(message.member)) return;

    if (!queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return queue.textChannel.send({embed: {"description": `**${message.author} ▶ Duraklattığınız Şarkıyı Açtım.**`, "color": "BLUE"}}); 
    }

    return message.channel.send({embed: {"description": `**${message.author} Duraklattılan Şarkı Bulunamadı.**`, "color": "BLUE"}}); 
  }
};
