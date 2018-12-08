
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';

 class MonthlyByCategory extends Component {
    constructor(props){
        super(props);
        
    }

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.number, 
            amount: PropTypes.number,
            category:PropTypes.string,
            svg: PropTypes.shape({fill: PropTypes.string})
          })),
          currency:PropTypes.string.isRequired
    }

    static defaultProps = {
        expenses: []
    }
    render() {
    
        const Labels = (gd) => {
            return gd.slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                   
                    <View key={data.key} >
                        <View style={{flexDirection:'row',flexWrap: 'wrap', maxWidth:80}}>
                            <Text style={{fontSize:14, fontWeight: 'bold'}}>{data.category}</Text>
                        </View>
                        <Text style={{fontSize:15, backgroundColor:data.svg.fill,fontWeight: 'bold', width:70}}>
                            {data.amount+ this.props.currency}
                        </Text>
                    </View>
                        
                    
                )
            })
        }

        // const Labels = ({ slices, height, width }) => {
        //     return slices.map((slice, index) => {
        //         const { labelCentroid, pieCentroid, data } = slice;
        //         return (
        //             <View key={data.key}>
        //                 <View key={data.key} >
        //                     <Text style={{fontSize:20, backgroundColor:data.svg.fill,fontWeight: 'bold', width:70}}>
        //                     {data.amount + this.props.currency}
        //                     </Text>
        //                 </View>
        //                 <G
        //                     key={index}
        //                     x={labelCentroid[ 0 ]}
        //                     y={labelCentroid[ 1 ]}
        //                 >
                    
                         
        //                         <T>{data.amount}</T>
                           
                            
        //                 </G>
        //             </View>
        //         )
        //     })
        // }

        return (
            <View>
                  <View style={{alignItems:'center', marginTop:15}}>
                      <Text style={{fontWeight: 'bold'}}>Monthly Expenses by category:</Text>
                 </View>
           
                <PieChart
                    style={{ height: 200 }}
                    valueAccessor={({ item }) => item.amount}
                    data={this.props.data}
                    spacing={0}
                    outerRadius={'95%'}
                    innerRadius={20}
                >
                    <Labels/>
                </PieChart>
            </View>
        )
    }
        
    
}

const styles = StyleSheet.create({

});



export default MonthlyByCategory