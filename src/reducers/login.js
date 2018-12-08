
import types from '../actions/login/types';
import { ActionConst } from 'react-native-router-flux';

export default (state = {email:"0"}, action) =>{
    switch(action.type){
        case types.GET_USER_DATA: return action.payload;
    }
    
    return state;
  }