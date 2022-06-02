require('dotenv').config()
const { Client,Intents,MessageEmbed,
    MessageAttachment} = require("discord.js");
const { joinVoiceChannel,createAudioPlayer,createAudioResource} = require("@discordjs/voice");
const client = new Client({intents:[
Intents.FLAGS.GUILDS,
Intents.FLAGS.GUILD_MESSAGES,
Intents.FLAGS.GUILD_VOICE_STATES],
});

// const file = new MessageAttachment("./assets/meMuero.png");

// const exampleEmbed = new MessageEmbed()
//   .setTitle("AYYY ME MUERO!!")
//   .setImage("attachment://meMuero.png");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  client.on("message", async (msg) => {
  //   if (msg.content === "me Muero") {
  //       msg.channel.send({
  //         embeds: [exampleEmbed],
  //         files: [file],
  //       });
  // }
  if (msg.content.toLowerCase() === "hola") {
    msg.reply(`Hola ${msg.author.username}`);
}

if (msg.content.includes('$')) {
    const command = msg.content.split('$')[1];
  console.log("prueba",command);
    const channel = msg.member?.voice.channel;
    if (channel) {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: msg.guild.id,
            adapterCreator: msg.guild.voiceAdapterCreator
        });
        const audioPlayer = createAudioPlayer();
        connection.subscribe(audioPlayer);
        audioPlayer.play(createAudioResource(`./sounds/${command}.mp3`));
        audioPlayer.addListener('stateChange',(oldOne, newOne)=>{
            if(newOne.status == 'idle'){
              connection.destroy(true);
            }
        })
    }else {
        msg.reply('Join a voice channel then try again!');
    }
}})


client.login(process.env.TOKEN);
