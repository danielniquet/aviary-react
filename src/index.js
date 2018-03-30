/**
 * @class ExampleComponent
 */

import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import {Header, Icon, Button, Segment, Image, Ref} from 'semantic-ui-react';
import Script from 'react-load-script';
import styles from './styles.css';
// import './semantic.min.css';
// import 'semantic-ui-css/semantic.min.css'



export default class ExampleComponent extends Component {
  // static propTypes = {
  //   onSave: PropTypes.func,
  //   apiKey: PropTypes.String,
  //   apiURL: PropTypes.String,
  // }
  static defaultProps = {
    onSave: (aviaryURL)=>{
      console.log(aviaryURL);
    },
    apiKey: '0ec79a43c4ec499dae4a06fe33712300',
    apiURL: 'http://feather.aviary.com/imaging/v3/editor.js',
  }

  state={
    file:this.props.file,
    fileURL: null,
    aviaryURL: null,
  }
  featherEditor = null
  setAviary = async ()=>{
    const self = this;
    this.featherEditor = new window.Aviary.Feather({
        // apiKey: '3bd340a5f6f64126a9ecb1a9e757bc4c',
        apiKey: this.props.apiKey,
        theme: 'light', // 'light' or 'dark'
        tools: 'all',  // specify tools here.
        appendTo: '',
        onSave: (imageID, newURL) => {
            self.PrvImage.setAttribute('src', newURL)
            self.setState({aviaryURL:newURL })
            self.featherEditor.close();
        },
        onError: (errorObj) => {
            console.log(errorObj.message);
        },
        onClose: () => {
          // console.log(self.featherEditor);
        }
    })
  }
  readImage = (file) => {
    const self = this;
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          console.log(e);
          self.setState({fileURL:e.target.result},()=>{
            self.handleAviary()
          })
        }
        reader.readAsDataURL(file);
    }
  }
  launchEditor=(id, src)=> {
     this.featherEditor.launch({
         image: id, url: src
     });
     return false;
  }
  onDrop = ([file])=>{
    this.setState({file})
    this.readImage(file)
  }
  handleAviary = ()=>{
    this.launchEditor('PrvImage', this.state.aviaryURL || this.state.fileURL);
  }
  handleRestart = (ev)=>{
    ev.preventDefault();
    this.PrvImage.setAttribute('src', this.state.file && this.state.file.preview)
    this.setState({aviaryURL: null},()=>this.handleAviary())
  }
  handleUploadAgain = ()=>{
    this.setState({file:null, fileURL:null, aviaryURL: null})
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.file){
      this.setState({file:nextProps.file, aviaryURL:null},()=>this.handleAviary())
    }
  }


  render(){
    const {aviaryURL} = this.state;
    const self = this;
    const file = this.state.file
    return (
      <Segment>
        <Script
          // url="http://feather.aviary.com/js/feather.js"
          url={this.props.apiURL}
          onLoad={this.setAviary}
        />
        {
          !file && (
            <Dropzone onDrop={this.onDrop}>
              <Header icon style={styles.header}>
                <Icon name='upload' />
                Upload
                <Header.Subheader>
                  Click or drop to upload
                </Header.Subheader>
              </Header>
            </Dropzone>
          )
        }
        {
         file && (
           <Fragment>
             <Segment textAlign='center'>
               <Ref innerRef={(PrvImage) => { self.PrvImage = PrvImage; }}>
                 <Image centered size="medium" id="PrvImage"  src={file.preview} alt="your image"/>
               </Ref>
             </Segment>
             <Segment>
               <Button id="editPrvImage" onClick={this.handleAviary}>Edit</Button>
               <Button onClick={this.handleRestart}>Restart</Button>
               <Button onClick={this.handleUploadAgain}>Upload again</Button>
               <Button onClick={()=>this.props.onSave(aviaryURL)} disabled={!aviaryURL}>Save</Button>
             </Segment>
           </Fragment>
         )
        }
      </Segment>
    )
  }
}
