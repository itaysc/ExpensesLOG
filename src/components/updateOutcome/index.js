
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import t from 'tcomb-form-native';
import TouchableBtn from '../UI/TouchableBtn';
import {updateOutcome} from '../../actions/outcomes';
import Toast, {DURATION} from 'react-native-easy-toast';

const formatFunction = format => date => formatDate(format, date)

const Form = t.form.Form;

var PaymentMethods = t.enums({
  CASH: 'Cash',
  CREDIT: 'Credit',
  CHECK:  'Check',
  TRANSFER: 'Transfer'
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

 class UpdateOutcome extends Component {
    constructor(props){
        super(props);
      this.state={
        value:{
          Category: this.props.outcome.Category,
          Date: new Date(this.props.outcome.Date),
          Amount: this.props.outcome.Amount,
          Description: this.props.outcome.Description,
          PaymentMethod: this.props.outcome.PaymentMethod,
          NumberOfPayments: this.props.outcome.NumberOfPayments
        }
      }
    }
    
    static propTypes = {
        outcome: PropTypes.shape({
            id: PropTypes.string,
            Category: PropTypes.string,
            Date: PropTypes.oneOfType([
                PropTypes.instanceOf(Date),
                PropTypes.string
            ]),
            Amount: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ]),
            Description: PropTypes.string,
            PaymentMethod: PropTypes.string,
            NumberOfPayments: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string
            ])
        }).isRequired
    }

    // static defaultProps = {
    //     outcome:{
    //         Category: "None",
    //         Date: new Date(),
    //         Amount: 0,
    //         Description: "",
    //         PaymentMethod: "Cash",
    //         NumberOfPayments: 1
    //     }
    // }

    onSave = ()=>{
      let errors = this.getValidationErrors();
      if(errors.length > 0){
        Alert.alert("Error", errors);
      }else if(this.state.value.NumberOfPayments.length === 0){
        let value = {...this.state.value};
        value.NumberOfPayments = 1;
        this.setState({value});
      }else{
        this.props.updateOutcome(this.props.outcome.id, this.state.value, this.updateCallback);
      }
    }

    updateCallback = (outcomes)=>{
        this.toast.show('Saved Successfully!', 500, () => {
            Actions.dashboard();
        });
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
              <TouchableBtn text="Save Changes" onPress={this.onSave}/>
              <Toast ref={el=>this.toast = el} style={styles.toast}/>
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
  toast:{
      backgroundColor: "#33ff33"
  }
});

function mapStateToProps(state){
  return({
    settings: state.settings,
    categories: state.categories
  })
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateOutcome,
  }, dispatch);
}



export default connect(mapStateToProps, mapDispatchToProps)(UpdateOutcome);