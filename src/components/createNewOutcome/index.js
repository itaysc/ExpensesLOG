
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import t from 'tcomb-form-native';
import TouchableBtn from '../UI/TouchableBtn';
import {saveOutcome} from '../../actions/outcomes';

const formatFunction = format => date => formatDate(format, date)

const Form = t.form.Form;

var PaymentMethods = t.enums({
  CASH: 'Cash',
  CREDIT: 'Credit',
  CHECK:  'Check'
});
let dateFormatFunc = (format,date) =>{
  return moment(date).format(format);
}
var options = {
  fields: {
    Date: {
        mode: 'date', // display the Date field as a DatePickerAndroid
        config:{
          format:(date) => dateFormatFunc("YYYY-MM-DD", date)
        }
      },
      Category:{
        editable:false
      }
    }
  };


const Outcome = t.struct({
  Category: t.String,
  Date: t.Date,
  Amount: t.Number,
  Description: t.String,
  PaymentMethod: PaymentMethods,
  NumberOfPayments: t.Number 
});

 class CreateNewOutcome extends Component {
    constructor(props){
        super(props);
      this.state={
        value:{
          Category: this.props.categoryName,
          Date: new Date(),
          Amount: 0,
          Description:"",
          PaymentMethod: 'Cash',
          NumberOfPayments:1
        }
      }
    }

    onSave = ()=>{
      let errors = this.getValidationErrors();
      if(errors.length > 0){
        Alert.alert("Error", errors);
      }else if(this.state.value.NumberOfPayments.length === 0){
        let value = {...this.state.value};
        value.NumberOfPayments = 1;
        this.setState({value});
      }else{
        this.props.saveOutcome(this.state.value, ()=>Actions.dashboard());
      }
    }

    getValidationErrors = ()=>{
      if(this.state.value.Description.length === 0){
        return "Please enter description.";
      }
      if(this.state.Amount === 0){
        return "Please enter amount."
      }
      return "";
    }

    onChange =(value)=> {
      this.setState({value});
    }
  render(){
    return (
      <ScrollView >
          <View style={styles.container}>
              <Form type={Outcome} options={options} value={this.state.value} onChange={this.onChange}/>
              <TouchableBtn text="Save" onPress={this.onSave}/>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

function mapStateToProps(state){
  return({
    settings: state.settings
  })
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    saveOutcome,
  }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateNewOutcome);