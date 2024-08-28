# About this repository
This is test automation repository for  dummy.restapiexample.com

## Pre-requirments
Node.js and npm need to be installed. You can download them from the [Node.js website](https://nodejs.org/).

## Setup
Before running tests, you need to install the required dependencies. Navigate to the root directory of the project in your terminal and run the following commands:

```bash
npm install
npx playwright install
```

### **Important**: Using Proxy for IP Rotation
Due to the API's rate-limiting restrictions, this project uses a proxy service for IP rotation. Although the API indicates a rate limit of "60" requests per minute (as seen in the `x-ratelimit-limit` header), in practice, only one request per minute can be reliably sent without risking being rate-limited.

To bypass this limitation and run the tests or make multiple requests more efficiently, you'll need to use a proxy service that supports IP rotation, such as ScraperAPI. Ensure you have an API key from your chosen proxy service and configure your requests to route through it.

The proxy URL is configured in the `data/testData.ts` file:

```javascript
export const baseProxyUrl = 'http://api.scraperapi.com';
```

You can request an API key from the author of the project or use your own from your preferred proxy service.  The API key should be added to the `.env` configuration file under the `SCRAPERAPI_KEY` parameter to ensure a successful local run. Note that if you run the project without an API key, some tests may fail due to the API rate limits.

## GitHub Actions Workflow
This project includes a **GitHub Actions workflow** that runs Playwright tests automatically. The workflow uses ScraperAPI to handle API rate limits via IP rotation.

## How to run
All scenarios can be found in test dorectory

### To run tests
```bash
npx playwright test
```

### To run particular test or group of tests
- define any tag in test description like, for exmaple, @basic:

```javascript
test('POST: Add New Record to the system @positiveScenarios', async () => {
```

- then use the same tag when run your tests

```bash
npx playwright test --grep @positiveScenarios
```

## Reports
```bash
npx playwright show-report
```

## Test run config
Can be found in /playwright.config.ts