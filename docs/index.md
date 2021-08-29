# AiraClient (JavaScript)

## Getting started

### Installation

```
npm install https://github.com/Palladium02/aira-client-js.git
```

Don't worry this package was written in TypeScript so it comes with buildin type definitions.

### First steps

```javascript
const AiraClient = require('aira-client-js');

const init = async () => {
  let client = new AiraClient({
    email: 'youremail@email.com',
    key: '<your api key>'
  });
}
```

## Methods

### AiraClient#init

The init method takes one parameter which has to be a string. That string is your API key.
To generate an API key you have to go to the settings page in Aira-Studio.
The init method is async so it can only be called in an asynchronous function.

>>> All other methods are also returning a promise and are asynchronous meaning they can only be called in an asynchronous context (function).

### AiraClient#find

#### Parameter
|name|type|
|---|---|
|table|string|
|query|DatabaseQuery|

### AiraClient#findOne

#### Parameter
|name|type|
|---|---|
|table|string|
|query|DatabaseQuery|

### AiraClient#insert

#### Parameter
|name|type|
|---|---|
|table|string|
|data|DatabaseEntry|

### AiraClient#update

#### Parameter
|name|type|
|---|---|
|table|string|
|query|DatabaseQuery|
|update|DatabaseEntry|

### AiraClient#deleteEntry

#### Parameter
|name|type|
|---|---|
|table|string|
|query|DatabaseQuery|

### AiraClient#dropTable

#### Parameter
|name|type|
|---|---|
|table|string|