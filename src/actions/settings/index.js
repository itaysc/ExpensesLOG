
import { AsyncStorage } from "react-native";
import types from './types';

export const getSettings = ()=> async(dispatch)=>{
    let settings = await AsyncStorage.getItem('settings');
    return {type: types.GET_SETTINGS, payload: JSON.parse(settings)};
}

export const setCurrency = (symbol)=> async(dispatch)=>{
    let settings = await AsyncStorage.getItem('settings');
    if(!settings){
        settings={
            symbol
        }
    }else{
        settings.symbol = symbol;
    }
    AsyncStorage.setItem('settings', JSON.stringify(settings));
    return {type: types.GET_SETTINGS, payload: settings};
}

export const setDateFormat = (dateFormat)=> async(dispatch)=>{
    let settings = await AsyncStorage.getItem('settings');
    if(!settings){
        settings={
            dateFormat
        }
    }else{
        settings.dateFormat = dateFormat;
    }
    AsyncStorage.setItem('settings', JSON.stringify(settings));
    return {type: types.GET_SETTINGS, payload: settings};
}