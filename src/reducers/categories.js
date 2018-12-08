
import types from '../actions/categories/types';
import { ActionConst } from 'react-native-router-flux';

export default (state = [], action) =>{
    switch(action.type){
        case types.SAVE_CATEGORY: return action.payload;
        case types.GET_CATEGORIES: return action.payload;
    }
    
    return state;
  }