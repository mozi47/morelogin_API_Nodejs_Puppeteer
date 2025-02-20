const { delays } = require("./utils.js");
const ScrapeWithPuppeteer = require("./puppeteer.js");
const {
  deleteProxy,
  addProxyToProfile,
  createBrowserProfile,
  startBrowser,
  stopBrowser,
  deleteBrowser,
  getProfiles,
  refreshFingerPrint,
} = require("./moreLogin/morelogin.js");

// Main function
async function main() {
  try {
    const ip = "IP HERE"
    const port  ="PORT HERE"
    const username = "USERNAME HERE"
    const password = "PASSWORD HERE"
    const proxyName = "EMAIL HERE"

    // Add the proxy to profile (optional) if not skip this step
    const proxyId = await addProxyToProfile(
      ip,
      port,
      username,
      password,
      proxyName
    );
    console.log("Proxy Configured!");
    // await delays(10000);

    // Create the browser profile with the proxy ID (if u dont have proxy pass 0)
    let profile = await createBrowserProfile(0, "Profile Name");
    const profileId = profile.data;
    console.log("1. Profile Created!");
    await delays(10000);

    //get profiles and apply refresh finger print api
    const profiles = await getProfiles();
    if (profiles > 1) {
      await refreshFingerPrint(profileId);
      console.log("2: Refresh Finger Print Added!");
      await delays(10000);
    }

    //Start the browser
    const browser = await startBrowser(profileId);
    const { envId, debugPort } = browser.data;
    console.log("5. Browser Started! ");
    await delays(10000);

    //Start the Automation Flow (Your Puppeteer Function)
    await ScrapeWithPuppeteer(debugPort);
    console.log("6. Automation Done!");
    await delays(10000);

    //Stop the browser
    await stopBrowser(envId);
    console.log("7. Browser Stopped!");
    await delays(10000);

    //Step 8: Delete the browser
    await deleteBrowser([envId]);
    console.log("8. Browser Deleted!");

    //Step 9: Delete the proxy
    await deleteProxy(proxyId);
    console.log("9. Proxy Deleted!");

    //Step 10: Add delay of 30 seconds
    console.log("10. Waiting for Next Call!");
    await delays(10000);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
