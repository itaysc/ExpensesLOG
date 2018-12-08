
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Platform, Alert, View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {Actions} from 'react-native-router-flux';
import {getOutcomesByMonth, getOutcomesByRange, deleteOutcome} from '../../actions/outcomes';
import {getSettings} from '../../actions/settings';
import TouchableBtn from '../UI/TouchableBtn';
import Collapsible from 'react-native-collapsible';
import moment from 'moment';
import Icon from "react-native-vector-icons/Ionicons";
import {generateMonthlyReportCSVAndSend, saveMonthlyReportCSV} from '../../utils/CSVReports';
import Swipeable from 'react-native-swipeable';

 class MonthlyExpenses extends Component {
    constructor(props){
        super(props);
        this.state = {
          indicesToShow:[]
        }
    }

    componentDidMount(){
      this.props.getOutcomesByMonth(this.props.month);
    }

    toggleContent=(index)=>{
        let indices = [...this.state.indicesToShow];
        if(indices.includes(index)){
            indices = indices.filter(i=>i!=index);
        }else{
            indices.push(index);
        }

        this.setState({indicesToShow: indices});
    }

    isShowContent=(index)=>{
        return this.state.indicesToShow.includes(index);
    }

    createMonthlyReportCSV=()=>{
        generateMonthlyReportCSVAndSend(this.props.outcomes.byMonth, this.props.settings.symbol);
    }
    saveOnlyMonthlyReportCSV=()=>{
        saveMonthlyReportCSV(this.props.outcomes.byMonth, this.props.settings.symbol);
    }

    refreshData = ()=>{
        this.props.getOutcomesByMonth(this.props.month);
    }

    onLeftActionRelease(outcomeIndex){
        Alert.alert("Notification", "Delete Outcome?", [
            {text: 'Delete', onPress: () => this.props.deleteOutcome(outcomeIndex, this.refreshData)},
            {text: 'Cancel', style: 'cancel', onPress: () => false},
        ])
    }

  render(){
    const leftButtons = [
        <TouchableOpacity activeOpacity={0.7}
                style = {{ padding: 10,marginTop: 3,alignItems: 'flex-end', backgroundColor:"#ff3333"}}
                onPress = {()=>false}>
                 <Icon
                    name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                    color="black"
                    size={25}
                />
            </TouchableOpacity>
    ];
       // this.props.navigationState.data = this.state.outcomes.byMonth;
      if(this.props.outcomes.byMonth.length === 0){
          return (<View style={styles.noDataText}><Text >No monthly expenses found.</Text></View>)
      }
    return (
     <ScrollView >
         <View style={{flexDirection: "row"}}>
            <Icon.Button 
                backgroundColor="transparent"
                name={Platform.OS === "ios" ? `ios-send` : `md-send`}
                color={"black"}
                size={25}
                iconStyle={{color:"#0066ff"}}
                onPress={this.createMonthlyReportCSV}
            />
            <Icon.Button 
                backgroundColor="transparent"
                name={Platform.OS === "ios" ? `ios-save` : `md-save`}
                color={"black"}
                size={25}
                iconStyle={{color:"#0066ff"}}
                onPress={this.saveOnlyMonthlyReportCSV}
            />
        </View>

       {
           this.props.outcomes.byMonth.map((o, index)=>{
               let isCollapsed = !this.isShowContent(index);
               return (
                <Swipeable leftButtons={leftButtons} key={index + o.Description} 
                    onLeftActionRelease={this.onLeftActionRelease.bind(this, o.index)}>
                    <View  key={index + o.Description} style={styles.mainContainer}>
                            <TouchableBtn 
                                text={`${o.Amount}${this.props.settings.symbol} (${moment(o.Date).format(this.props.settings.dateFormat)})`} 
                                onPress={()=>this.toggleContent(index)}
                                iconName={isCollapsed?"arrow-dropright":"arrow-dropdown"}/>
                            <Collapsible collapsed={isCollapsed} duration={0} style={styles.collapsible}>
                                <View>
                                    <Text>Category: {o.Category}</Text>
                                    <Text>Date: {moment(o.Date).format(this.props.settings.dateFormat)}</Text>
                                    <Text>Description: {o.Description}</Text>
                                    <Text>Payment Method: {o.PaymentMethod}</Text>
                                    <Text>Number Of Payments: {o.NumberOfPayments}</Text>
                                </View>
                            </Collapsible>
                    </View>
                </Swipeable>
               )
           })
       }
     </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: 'center',
    },
    collapsible:{
        
        padding: 10
    },
    descContainer:{
        flex: 1,
        alignItems:"center",
        backgroundColor:"#0066ff"
    },
    description: {
        fontSize:20,
        color:"white"
    },
    noDataText:{
        alignItems:'center',
        margin: 35
    }
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
    deleteOutcome
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyExpenses)