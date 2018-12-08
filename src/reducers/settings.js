
import types from '../actions/settings/types';

const initialSettings = {
    symbol: '₪', 
    dateFormat: "YYYY-MM-DD"
}

export default (state = initialSettings, action) =>{
    switch(action.type){
        case types.GET_SETTINGS: return action.payload;
    }
    
    return state;
  }