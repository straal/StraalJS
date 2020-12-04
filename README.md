<p align="left">
    <img height=80 src="web/logo_github.png"/>
</p>

---

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-green.svg?style=flat)](LICENSE)
[![Twitter](https://img.shields.io/badge/twitter-@straal-blue.svg?style=flat)](http://twitter.com/straal_)

# StraalJS

> A JavaScript library for Straal API.
> A brilliant payment solution for disruptive businesses.

- [Installation](#installation)
- [Usage](#usage)
- [`sendEncrypted` method](#sendencrypted-method)
- [Support](#support)
- [License](#license)

## Installation

Add StraalJS to your project via NPM:

```shell
npm i --save https://github.com/straal/StraalJS.git#1.0.5
```

## Usage

```js
import { sendEncrypted, getBrowserParams } from "straaljs";

sendEncrypted(
  "yourCryptKey",
  {
    name: "John Smith",
    number: "4444444444444448",
    cvv: "123",
    expiry_month: 11,
    expiry_year: 2020,
    threeds_v2: getBrowserParams(), // optional for 3DSV2
  },
  {
    success: function (xhr) {
      console.log(xhr);
    },
    fail: function (xhr) {
      console.log(xhr);
    },
  }
);
```

## `sendEncrypted` method

This is the main method for sending encrypted data to a Straal endpoint:

```js
Straal.sendEncrypted(cryptKey, jsonData[ , options])
```

## Support

Any suggestions or reports of technical issues are welcome! Contact us via [email](mailto:devteam@straal.com).

## License

This library is released under Apache License 2.0. See [LICENSE](LICENSE) for more info.
