import { AsyncStorage } from "react-native";
import types from './types';
import moment from 'moment';
import uuidv1  from 'uuid/v1';// v1 is using timestamp

export const deleteOutcome = (id, callback=null)=> async(dispatch)=>{
    try {
        let outcomes = await AsyncStorage.getItem("outcomes")
        outcomes = JSON.parse(outcomes);
        if(!outcomes){
            return;
        }
        outcomes = outcomes.filter(o=>o.id!= id);
        await AsyncStorage.setItem('outcomes', JSON.stringify(outcomes));
        if(callback){
            callback(outcomes);
        }
        return dispatch({type: types.DELETE_OUTCOME, payload: outcomes});
      } catch (error) {
        // Error saving data
      }
}

export const updateOutcome = (id, newValue, callback=null)=> async(dispatch)=>{
    try {
        let outcomes = await AsyncStorage.getItem("outcomes")
        outcomes = JSON.parse(outcomes);
        if(!outcomes){
            return;
        }
        if(outcomes.filter(outc=>outc.id == id).length > 0 ){
            outcomes = outcomes.filter(o=>o.id!= id);
            newValue.id = id;
            outcomes.push(newValue);
            await AsyncStorage.setItem('outcomes', JSON.stringify(outcomes));
            if(callback){
                callback(outcomes);
            }
            return dispatch({type: types.UPDATE_OUTCOME, payload: outcomes});
        }


      } catch (error) {
        // Error saving data
      }
}

export const saveOutcome = (value, callback=null)=> async(dispatch)=>{
    try {
        let outcomes = await AsyncStorage.getItem("outcomes")
        outcomes = JSON.parse(outcomes);
        if(!outcomes){
            outcomes = [];
        }
        value.id = uuidv1();
        outcomes.push(value);
        await AsyncStorage.setItem('outcomes', JSON.stringify(outcomes));
        dispatch({type: types.SAVE_OUTCOME, payload: outcomes});
        if(callback){
            callback(outcomes);
        }
      } catch (error) {
        // Error saving data
      }
}

export const getOutcomesByMonth = (date)=> async(dispatch)=>{
    try {
        let outcomes = await AsyncStorage.getItem("outcomes")
        outcomes = JSON.parse(outcomes);
        if(!outcomes){
            return [];
        }
       let dateAsMoment = moment(date);
        outcomes = outcomes.filter(o=>moment(o.Date).isSame(dateAsMoment, 'month'));
        return dispatch({type: types.GET_OUTCOMES_BY_MONTH, payload: outcomes});
      } catch (error) {
        // Error saving data
      }
}

export const getOutcomesByRange = (startDate, endDate)=> async(dispatch)=>{
    try {
        let outcomes = await AsyncStorage.getItem("outcomes")
        outcomes = JSON.parse(outcomes);
        if(!outcomes){
            return [];
        }
       let startDateAsMoment = moment(startDate);
       let endDateAsMoment = moment(endDate);
        outcomes = outcomes.filter(o=>moment(o.Date).isBetween(startDateAsMoment, endDateAsMoment));
        return dispatch({type: types.GET_OUTCOMES_BY_RANGE, payload: outcomes});
      } catch (error) {
        // Error saving data
      }
}


