
import React, {Component} from 'react';
import { Platform, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import PropTypes from 'prop-types';

 class MonthlyGraphByDays extends Component {
    constructor(props){
        super(props);
        
    }

    static propTypes = {
        expenses: PropTypes.arrayOf(PropTypes.shape({
            date: PropTypes.string, //instanceOf(Date),
            amount: PropTypes.number,
            dayInMonth:PropTypes.number
          }))
    }

    static defaultProps = {
        expenses: []
    }
    render() {
        
        const amounts = this.props.expenses.map(e=>e.amount);
        const dates = this.props.expenses.map(e=>e.dayInMonth)

        const axesSvg = { fontSize: 10, fill: 'black' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        return (
            <View>
            <View style={{alignItems:'center', marginTop:15}}>
                <Text style={{fontWeight: 'bold'}}>Monthly expenses per day:</Text>
            </View>

            
            <View style={{ height: 200, flexDirection: 'row'}}>
            <YAxis
                data={amounts}
                style={{ marginBottom: xAxisHeight }}
                contentInset={verticalContentInset}
                svg={axesSvg}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
                <LineChart
                    style={{ flex: 1}}
                    data={amounts}
                    contentInset={verticalContentInset}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                >
                    <Grid/>
                </LineChart>
                <XAxis
                    style={{ marginHorizontal: 5, height: xAxisHeight }}
                    data={dates}
                    xAccessor={ ({ item }) => item }
                    formatLabel={(value, index,a) => value}
                    contentInset={{ left: 10, right: 10 }}
                    svg={axesSvg}
                />
            </View>
        </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({

});



export default MonthlyGraphByDays