
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import {Actions} from 'react-native-router-flux';



 class Input extends Component {
    constructor(props){
        super(props);
        this.state={
          
        }
    }

  static propTypes= {
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    onChangeText: PropTypes.func,
    autoFocus: PropTypes.bool,
    keyboardType: PropTypes.string,
    clearButtonMode: PropTypes.string
  }

  static defaultProps = {
    placeholder: "",
    placeholderTextColor: "#9a73ef",
    onChangeText: ()=>false,
    autoFocus: false,
    keyboardType:"default", // "number-pad", "decimal-pad", "numeric", "email-address", "phone-pad"
    clearButtonMode: 'always' //enum('never', 'while-editing', 'unless-editing', 'always')
  }

  onChangeText=(text)=>{
      this.props.onChangeText(text);
  }

  render(){
    return (
      <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <TextInput style = {styles.input}
           onEndEditing={()=>Keyboard.dismiss()}
           clearButtonMode={this.props.clearButtonMode}
           keyboardType ={this.props.keyboardType}
           blurOnSubmit={true}
           autoFocus={this.props.autoFocus}
           underlineColorAndroid = "transparent"
           placeholder = {this.props.placeholder}
           placeholderTextColor = {this.props.placeholderTextColor}
           autoCapitalize = "none"
           onChangeText = {this.onChangeText}/>
        </TouchableWithoutFeedback>
    );
  }
}
export default Input;

const styles = StyleSheet.create({

    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
 })
