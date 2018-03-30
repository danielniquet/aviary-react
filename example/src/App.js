import React, { Component } from 'react'

import ExampleComponent from 'aviary-react'
import Dropzone from 'react-dropzone'

export default class App extends Component {
  state={
    file:null
  }
  onDrop = ([file])=>{
    this.setState({file})
  }

  render () {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          subir
        </Dropzone>
        <ExampleComponent text='Modern React component module' file={this.state.file} />
      </div>
    )
  }
}
