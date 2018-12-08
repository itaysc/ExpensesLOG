import {combineReducers} from 'redux';
import data from './data';
import categories from './categories';
import outcomes from './outcomes';
import login from './login';
import settings from './settings';

export default combineReducers({
    categories,
    outcomes,
    login,
    settings
});