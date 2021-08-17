# API Response Cacher

API response cacher application.

## Usage

This application is intended for local usage only. Use it to cache the responses gotten from requests made to an API. The body of all requests should be an [AxiosRequestConfig](https://axios-http.com/docs/req_config), which will be used to make the first request to an endpoint and then cache the response.

## Examples

Make a request and cache it (subsequent requests will use the cached response):

```bash
curl --location --request POST 'http://localhost:3100/cache' \
--header 'Content-Type: application/json' \
--data-raw '{
    "url": "https://randomuser.me/api",
    "method": "GET"
}'
```

Clear local cache:

```bash
curl --location --request POST 'http://localhost:3100/clear-cache'
```

## Scripts

```bash
# Install dependencies
$ npm install

# Start application in development mode
$ npm run dev

# Start application in production mode
$ npm start

# Linting
$ npm run lint
$ npm run lint:fix

# Build
npm run build
```
