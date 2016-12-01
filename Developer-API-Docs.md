# Chat Integrations API
## To Register a new app:

**1. Select "Create New App" from the sidebar in the user dashboard**
<img width="214" alt="screenshot 2016-12-01 12 13 42" src="https://cloud.githubusercontent.com/assets/5317799/20810700/a0e2987a-b7bf-11e6-9bf8-eb0b78793f5d.png">

**2. Enter the name of your app, a category, and the endpoint for GitTalk to send POST requests**
<img width="424" alt="screenshot 2016-12-01 12 16 39" src="https://cloud.githubusercontent.com/assets/5317799/20810790/091d0678-b7c0-11e6-85e1-c91c44a1482b.png">

**3. A new app will appear in the user dashboard. Select that entry to view API keys and other details**
<img width="424" alt="screenshot 2016-12-01 12 20 28" src="https://cloud.githubusercontent.com/assets/5317799/20810951/add9bb20-b7c0-11e6-8a2a-4f5be1e4f9d7.png">

**4. Select the "cog" icon next to one of your repos to subscribe any app to your chat messages**
<img width="424" alt="screenshot 2016-12-01 12 22 51" src="https://cloud.githubusercontent.com/assets/5317799/20811023/e78140a0-b7c0-11e6-9b28-45f99968ce17.png">

# Implementation Details
## Outbound Message
![outbound api diagram](https://cloud.githubusercontent.com/assets/5317799/20810377/5a533514-b7be-11e6-9278-449d5cc5fa08.jpg)
### Outbound Payload
```js
# POST /<Developer-Provided-Endpoint> // Configured in the "Create New App" dialog
  JSON --> {
    user: 'String',
    text: 'String',
    image: 'String - url',
    room: 'String'
  }
```
### Example Outbound Payload
```js
{
  user: 'MarvinTheMartian',
  text: 'Greetings, earthling. Are you ready?',
  image: 'https://goo.gl/3gHGVr',
  room: 'elmerfudd/wabbit'
}
```

## Inbound Message
![inbound api diagram](https://cloud.githubusercontent.com/assets/5317799/20810405/7865cba2-b7be-11e6-8667-4f7d6e6673b2.jpg)
### Inbound Payload
```js
# POST gittalk.co/apps
  JSON -->  {
    apiKey: 'String', //required
    method: 'String', // required, Currently accepts 'message'
    room: 'String', // required
    action: {
      text: 'String', // optional
      image: 'String - url', //optional
      avatar: 'String - url' //optional
    }
  }
```

* **Success Response:**

  **Status code:** 200

* **Error Response:**

   **Code:** 400 BAD REQUEST
   **Available Error Messages:**
   `{ err : "apiKey field not found in inbound payload" }`
   `{ err : "method field not found in inbound payload" }`
   `{ err : "room field not found in inbound payload" }`
   `{ err : "${ room } not found" }`
   `{ err : "not authorized to write to ${ room }" }`
   `{ err : "app not found" }`

### Example Inbound Payload
```js
{
  apiKey: 'abc123',
  method: 'message'
  room: 'elmerfudd/wabbit',
  action: {
    text: 'What wight thwough yonduh window bweaks!',
    image: 'https://goo.gl/xmqapC',
    avatar: 'https://goo.gl/BoF9EF'
  }
}
```
