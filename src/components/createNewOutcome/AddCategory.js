
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import {Actions} from 'react-native-router-flux';
import Input from '../UI/Input';
import {saveCategory} from '../../actions/categories';
import TouchableBtn from '../UI/TouchableBtn';

 class AddCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
          categoryName: ""
        }
    }

    onCategoryTextChanged = (text)=>{
      this.setState({categoryName: text});
    }

    onSave = ()=>{
      if(this.state.categoryName.length > 0){
        this.props.saveCategory(this.state.categoryName);
        Actions.selectCategory();
      }else{
        Alert.alert('Error', 'Please enter category name.');
      }

    }

  render(){
    return (
     <View >
       <Input
          autoFocus={true}
          placeholder="Enter category name"
          onChangeText={this.onCategoryTextChanged}/>

        <TouchableBtn
           text="Save"
           onPress={this.onSave}/>
     </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveCategory,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddCategory)