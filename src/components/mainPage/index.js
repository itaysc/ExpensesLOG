
import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMail } from '../../utils/email';
import { getMonthlyByCategoryGraphData, getMonthlyByDayGraphData } from '../../utils/outcomes';
import MonthlyByCategory from './graphs/MonthlyByCategory';
import MonthlyGraphByDays from './graphs/MonthlyGraphByDays';
import MainMenu from '../mainMenu';
import {getOutcomesByMonth, getOutcomesByRange} from '../../actions/outcomes';
import {getSettings} from '../../actions/settings';

 class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
          monthTotalExpenses: 0
        }
    }

    componentDidMount(){
      this.props.getSettings();
      this.props.getOutcomesByMonth(new Date());
     
      //this.generateCSV();
    }


    componentWillReceiveProps(nextProps){
      if(this.props.outcomes.byMonth !== nextProps.outcomes.byMonth){
       // console.log(this.getMonthTotalExpenses())
       // requestStoragePermission(this.generateMonthlyReportCSV);
        this.setState({monthTotalExpenses: this.getMonthTotalExpenses()})
      }
    }

    getMonthTotalExpenses = ()=>{
      let res = 0;
      this.props.outcomes.byMonth.map(o=>{
        res += parseFloat(o.Amount);
      })
      return res;
    }

    goToMonthlyExpensesPage = ()=>{
      Actions.monthlyExpenses({month: new Date()});
    }

  

  render(){
    let monthlyGraphData = getMonthlyByDayGraphData(this.props.outcomes.byMonth, this.props.settings.dateFormat);
    let monthlyByCategoryGraphData = getMonthlyByCategoryGraphData(this.props.outcomes.byMonth);
    return (
     <ScrollView >
    
       <View style={styles.monthTotalContainer}>
           <Icon.Button 
              backgroundColor="#0066ff"
              name={Platform.OS === "ios" ? `ios-information-circle-outline` : `md-information-circle-outline`}
              color={"black"}
              size={25}
              iconStyle={{color:"white"}}
              onPress={this.goToMonthlyExpensesPage}
              >
                 <Text style={styles.monthTotal}>{`Monthly Expenses: ${this.state.monthTotalExpenses}${this.props.settings.symbol}`}</Text>

              </Icon.Button >
              
       </View>
       {/* <View>
         <TouchableBtn text="Watch Monthly Expenses" onPress={this.goToMonthlyExpensesPage}/>
       </View> */}
       {
         monthlyGraphData.length > 0 &&
         <MonthlyGraphByDays expenses={monthlyGraphData}/>
       }
       {
         monthlyByCategoryGraphData.length > 0 &&
         <MonthlyByCategory data={monthlyByCategoryGraphData} currency={this.props.settings.symbol}/>
       }
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  monthTotalContainer: {
    
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  monthTotal: {
    
    color: "#0066ff",
    justifyContent: 'center',
    
    fontSize:15,
    color:"white"
  },
});

function mapStateToProps(state){
  return({
    outcomes: state.outcomes,
    settings: state.settings
  })
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getOutcomesByMonth, 
    getOutcomesByRange,
    getSettings
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)