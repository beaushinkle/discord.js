var Discord = require("../");

var Bing = require('node-bing-api')({accKey: "YaKuygAMWGb+i1kcLewlrJiMluePvD11iPncscIlnx4"});
// Get the email and password

var bot = new Discord.Client();

bot.on("ready", function () {
  console.log("Ready to begin! Serving in " + bot.channels.length + " channels");
});

bot.on("disconnected", function () {

  console.log("Disconnected!");
  process.exit(1); //exit node.js with an error

});

Array.prototype.chooseRandom = function() {
  return this[Math.floor(Math.random() * this.length)];
};

bot.on("message", function (msg) {
  var content = msg.content
  if (content.substring(0, 9) === "image me ") {
    var query = content.substring(9);
    console.log("received: " + query)
    Bing.images(query, {skip: 50}, function(error, res, body){
      var results = body['d']['results'];
      var response = results.chooseRandom()['MediaUrl'];
      bot.sendMessage(msg, response)
    });
  }

  if (content.substring(0, 6) === "gg me ") {
    var response = "http://champion.gg/champion/" + content.substring(6);
    bot.sendMessage(msg, response)
  }

  if (content === "pee") {
    console.log("kuma went pee!");
    setTimeout(function() {
       bot.sendMessage(msg, "take kuma out");
    }, 1000 * 60 * 90);
  }
});

bot.login(process.argv[2], process.argv[3]);
