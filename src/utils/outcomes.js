import {groupBy} from './index';
import moment from 'moment';
const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
const getRandomColor=()=>{
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
// gets all monthly expenses data and returns an array of [{date, total for date}]
// so we can use it as chart data.
export const getMonthlyByDayGraphData = (monthlyExpenses, dateFormat)=>{
      let monthlyGraphData = monthlyExpenses.map(o=>{
        return {
            amount: parseFloat(o.Amount), 
            date: moment(o.Date).format(dateFormat), 
            dayInMonth:moment(o.Date).date()}
      });
      // group the array by date so in next step we can reduce each date amounts into single total
      monthlyGraphData = groupBy(monthlyGraphData, "date");

      let res = [];
      for (let property in monthlyGraphData) {
        if (monthlyGraphData.hasOwnProperty(property)) {
            let arr = monthlyGraphData[property];
            let dayTotal = arr.reduce((acc, b)=>acc + b.amount, 0);
            res.push({date: property, amount: parseFloat(dayTotal), dayInMonth:moment(property).date()});
        }
    }

    return res;
}

export const getMonthlyByCategoryGraphData = (monthlyExpenses)=>{
    let graphData = monthlyExpenses.map((o, index)=>{
      return {
          amount: parseFloat(o.Amount), 
          category: o.Category 
          
        }
    });
    
    // group the array by date so in next step we can reduce each date amounts into single total
    graphData = groupBy(graphData, "category");

    let res = [];
    let key = 0;
    for (let property in graphData) {
      if (graphData.hasOwnProperty(property)) {
          let arr = graphData[property];
          let categoryTotal = arr.reduce((acc, b)=>acc + b.amount, 0);
          res.push({key, amount: parseFloat(categoryTotal), category:property, svg:{ fill: getRandomColor() }});
          key++;
        }
  }
  
  return res;
}