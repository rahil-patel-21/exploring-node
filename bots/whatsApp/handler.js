async function handleEvents(page) {
  try {
    await handleNewMsg(page);
  } catch (error) {}
}

async function handleNewMsg(page) {
  try {
    await page.exposeFunction("onNewMsgEvent", event => {
      try {
        console.log("====================================");
        console.log("onNewMsgEvent", event);
        console.log("====================================");
      } catch (error) {}
    });

    await page.evaluate(() => {
      try {
        window.Store.Msg.on("add", event => {
          if (event.isNewMsg) window.onNewMsgEvent(event);
        });
      } catch (error) {}
    });
  } catch (error) {}
}

module.exports = handleEvents;
