const WupBot = require("./bots/whatsApp/wup.bot");

async function initialize() {
  try {
    const remoteURL =
      "ws://127.0.0.1:9222/devtools/browser/235d7338-6e1d-4e18-98df-ce80c327aad3";
    const bot = new WupBot();
    await bot.wakeUp({ remoteURL });
  } catch (error) {}
}

initialize();
