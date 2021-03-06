
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, Platform, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux';
import {saveUserData} from '../../actions/login';


 class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
         }
    }

     handleEmail = (text) => {
        this.setState({ email: text })
     }
     handlePassword = (text) => {
        this.setState({ password: text })
     }
     login = (email, pass) => {
         this.props.saveUserData(email, pass);
     }

  render() {
 

    return (
        <View style = {styles.container}>
        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Email"
           keyboardType="email-address"
           autoFocus={true}
           placeholderTextColor = "#9a73ef"
           autoCapitalize = "none"
           onChangeText = {this.handleEmail}/>
        
        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Password"
           password
           secureTextEntry
           placeholderTextColor = "#9a73ef"
           autoCapitalize = "none"
           onChangeText = {this.handlePassword}/>
        
        <TouchableOpacity
           style = {styles.submitButton}
           onPress = {
              () => this.login(this.state.email, this.state.password)
           }>
           <View style={styles.btnContainer}>
                <Text style = {styles.submitButtonText}> Submit </Text>
           </View>
           
        </TouchableOpacity>
     </View>
    );
  }
}

const styles = StyleSheet.create({
    headerText: {fontSize:40},
    headerTextContainer: {
        alignItems:'center'
    },
    container: {
       paddingTop: 23,
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    },
    btnContainer: { alignItems:'center'}
 })

 function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveUserData
    }, dispatch);
}
 export default connect(null, mapDispatchToProps)(Login);