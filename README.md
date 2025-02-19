# MoreLogin API with Node.js & Puppeteer

This project demonstrates how to use MoreLogin APIs in a Node.js application with Puppeteer. It includes functionalities for managing browser profiles, proxies, and fingerprinting to enhance web automation and privacy.
## MoreLogin
* API Documention: https://docs.morelogin.com/l/en/interface-documentation/browser-profile
* Site: https://www.morelogin.com

# Features

* Browser Profile Management: Create, update, and delete MoreLogin browser profiles.

* Fingerprint Management: Customize and manage browser fingerprints for anonymity.

* Proxy Integration: Use proxies to route browser traffic securely.

* Puppeteer Automation: Launch MoreLogin profiles with Puppeteer for web automation.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/mozi47/morelogin_API_Nodejs_Puppeteer.git
   cd morelogin_API_Nodejs_Puppeteer
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your environment variables in a `.env` file:
   ```ini
   SECRETKEY=your_secret_key
   APPID=your_app_id
   BASEURL=http://127.0.0.1:40000
   ```

## Usage

### Run the Application
```sh
npm run dev
```

## API Endpoints

### 1. **Authenticate with MoreLogin API**
   - **Description:** Authenticates and retrieves an access token.
   
### 2. **Get Browser Profiles**
   - **Description:** Fetches all available browser profiles.
   
### 3. **Create a New Profile**
   - **Description:** Creates a new MoreLogin browser profile.

### 4. **Launch a Profile with Puppeteer**
   - **Description:** Starts a browser session using Puppeteer.

### 5. **Proxy**
   - **Description:** Manage and configure Proxies.

## Environment Variables
Ensure the following variables are set in your `.env` file:

| Variable   | Description |
|------------|-------------|
| `SECRETKEY` | Your MoreLogin API secret key |
| `APPID` | Your MoreLogin app ID |
| `BASEURL` | MoreLogin API base URL (default: `http://127.0.0.1:40000`) |

## Dependencies
- Node.js
- Puppeteer
- Axios
- dotenv

## Contributing
Feel free to submit issues and pull requests for improvements.

## License
This project is licensed under the MIT License.

---
### Author
**[Syed Muzakir Shah](https://github.com/mozi47)**


