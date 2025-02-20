const axios = require("axios");
const { getRandomInt } = require("../utils.js");
const requestHeader = require("./auth.js");

// Function to add a proxy
async function deleteProxy(proxyId) {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/proxyInfo/delete`;

  const requestBody = [proxyId];

  try {
    const response = await axios.post(url, requestBody, { headers });
    console.log(response.data);
    return response.data.requestId;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to add a proxy
async function addProxyToProfile(ip, port, username, password, name) {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/proxyInfo/add`;

  const requestBody = {
    proxyIp: ip, // Proxy IP
    proxyPort: port, // Proxy port
    proxyName: name, // Proxy name
    username: username, // Proxy account number (username)
    password: password, // Proxy password
    proxyType: 0, // HTTP
    proxyProvider: 0, // Custom proxy
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to create a browser profile
async function createBrowserProfile(proxyId, name) {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/env/create/advanced`;

  // Randomize OS (1: Windows, 2: macOS)
  const osTypes = [1, 2];
  const randomOS = osTypes[getRandomInt(0, osTypes.length - 1)];

  // Randomize UA version based on OS
  const uaVersions = await getUA(headers);
  const randomUAVersion = uaVersions[getRandomInt(0, uaVersions.length - 1)];

  const requestBody = {
    browserTypeId: 1, // Chrome
    operatorSystemId: randomOS, // Random OS (1: Windows, 2: macOS)
    envName: name, // name from proxy
    accountInfo: {
      platformId: 9999, // Custom platform mandatory
      customerUrl: "https://www.google.com/", // Custom platform mandatory (any site url)
    },
    // startupParams:["--disable-notifications","--window-size=1920,1080","--start-maximized"], // For Full Screen of Browser pass these params
    proxyId, // when using custom proxy (default value 0)
    uaVersion: randomUAVersion, // Random UA
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating profile:",
      error.response ? error.response.data : error.message
    );
  }
}

// Function to start browser
async function startBrowser(profileId) {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/env/start`;

  const requestBody = {
    envId: profileId,
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to stop browser
async function stopBrowser(profileId) {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/env/close`;

  const requestBody = {
    envId: profileId,
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data.data.envId;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to delete browser
async function deleteBrowser(profileId) {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/env/removeToRecycleBin/batch`;

  const requestBody = {
    envIds: profileId,
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data.data;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to get list of UA
async function getUA(headers) {
  const url = `${process.env.BASEURL}/api/env/advanced/ua/versions`;

  try {
    const response = await axios.get(url, { headers });
    const chromeUA = response.data.data[0].versions;
    return chromeUA;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to get list of profiles
async function getProfiles() {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/env/page`;

  const requestBody = {
    pageNo: 1,
    pageSize: 10,
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    console.log(response.data);
    return response.data.data.dataList.length;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

// Function to add Refresh Finger Print
async function refreshFingerPrint(profileId) {
  const headers = requestHeader();
  const url = `${process.env.BASEURL}/api/env/fingerprint/refresh`;

  const requestBody = {
    envId: profileId,
  };

  try {
    const response = await axios.post(url, requestBody, { headers });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error adding proxy:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = {
  deleteProxy,
  addProxyToProfile,
  createBrowserProfile,
  startBrowser,
  stopBrowser,
  deleteBrowser,
  getProfiles,
  refreshFingerPrint,
};
