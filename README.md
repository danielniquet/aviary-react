# aviary-react

> Show an aviary control component on a React project

[![NPM](https://img.shields.io/npm/v/aviary-react.svg)](https://www.npmjs.com/package/aviary-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save aviary-react
```

```bash
yarn add aviary-react
```

## Usage

```jsx
import React, { Component } from 'react'

import AviaryReact from 'aviary-react'

class Example extends Component {
  onSave = (URL)=>{
    //You receive S3 URL
    console.log(URL)
  }
  render () {
    return (
      <AviaryReact apiKey="myAPIkeyFromCreativeSDK" onSave={this.onSave} file={myFile} />
    )
  }
}
```

apiKey - Mandatory
onSave - to receive the generated URL
file - (optional) in case you want to pass a file

## License

MIT © [danielniquet](https://github.com/danielniquet)
