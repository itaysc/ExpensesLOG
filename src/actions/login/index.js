import { AsyncStorage } from "react-native";
import types from './types';
import {Actions} from 'react-native-router-flux';

export const getUserData = ()=> async(dispatch)=>{
    try {
        let userData = await AsyncStorage.getItem("userData")
        userData = JSON.parse(userData);
        if(!userData){
             dispatch({type: types.GET_USER_DATA, payload: null});
             Actions.auth();
             return;
        }
 
         dispatch({type: types.GET_USER_DATA, payload: userData});
         Actions.main();
      } catch (error) {
        // Error saving data
      }
}

export const saveUserData = (email, password)=> async(dispatch)=>{
    try {
        let userData={email, password};
         await AsyncStorage.setItem("userData", JSON.stringify(userData))
         dispatch({type: types.GET_USER_DATA, payload: userData});
         Actions.main();
      } catch (error) {
        // Error saving data
      }
}

