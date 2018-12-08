
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {Actions} from 'react-native-router-flux';
import {getUserData} from '../../actions/login';


 class CheckUserExistance extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.props.getUserData();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.userData && nextProps.userData.email != "0"){
            if(!nextProps.userData.email){
                Actions.auth();
            }else{
                Actions.main();
            }
        }
    }

  render(){
    return (
     <View >
       
     </View>
    );
  }
}

function mapStateToProps(state){
    return ({
        userData: state.login
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      getUserData,
    }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(CheckUserExistance);
