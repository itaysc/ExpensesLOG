
import types from '../actions/outcomes/types';
import { ActionConst } from 'react-native-router-flux';
import moment from 'moment';

export default (state = {all:[], byMonth: [], byRange:[]}, action) =>{
    switch(action.type){
        case types.SAVE_OUTCOME: return {...state, all: action.payload};
        case types.GET_OUTCOMES_BY_MONTH: return {...state, byMonth: action.payload.sort(compare)};
        case types.GET_OUTCOMES_BY_RANGE: return {...state, byRange: action.payload.sort(compare)};
    }
    
    return state;
  }

  function compare(a,b) {
    if (moment(a.Date).isBefore(moment(b.Date))){
        return -1;
    }else{
        return 1;
    }
  }
  