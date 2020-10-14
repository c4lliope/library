const { openBrowser, goto, click, closeBrowser } = require('taiko');
(async () => {
    try {
        await openBrowser();
        await goto("localhost:3000");
        await click("/mail-money-pool");
        await click("/");
        await click("Display as grid");
        await click("Display as cards");
    } catch (error) {
        console.error(error);
    } finally {
        await closeBrowser();
    }
})();
