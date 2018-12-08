
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, TextInput, StyleSheet,
     Keyboard, TouchableWithoutFeedback, Platform } from 'react-native'
import {Actions} from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";



 class SearchInput extends Component {
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
    placeholder: "Search",
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
            <View style={styles.searchSection}>
                <TextInput
                    style={styles.input}
                    onEndEditing={()=>Keyboard.dismiss()}
                    clearButtonMode={this.props.clearButtonMode}
                    keyboardType ={this.props.keyboardType}
                    blurOnSubmit={true}
                    autoFocus={this.props.autoFocus}
                    underlineColorAndroid = "transparent"
                    placeholder = {this.props.placeholder}
                    placeholderTextColor = {this.props.placeholderTextColor}
                    autoCapitalize = "none"
                    onChangeText = {this.onChangeText}
                />
                <Icon
                name={Platform.OS === "ios" ? "ios-search" : "md-search"}
                color="#000"
                style={styles.searchIcon}
                size={25}
                />
            </View>
    );
  }
}
export default SearchInput;

const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
 })
