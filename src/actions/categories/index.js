import { AsyncStorage } from "react-native";
import types from './types';

export const saveCategory = (catName)=> async(dispatch)=>{
    try {
        let categories = await AsyncStorage.getItem("categories")
        categories = JSON.parse(categories);
        if(!categories){
            categories = [];
        }
        categories.push(catName);
        await AsyncStorage.setItem('categories', JSON.stringify(categories));
        return dispatch({type: types.SAVE_CATEGORY, payload: categories});
      } catch (error) {
        // Error saving data
      }
}

export const getCategories = ()=> async(dispatch)=>{
    try {
        let categories = await AsyncStorage.getItem("categories")
        categories = JSON.parse(categories);
        if(!categories){
            categories=[];
        }
        dispatch({type: types.GET_CATEGORIES, payload: categories});
      } catch (error) {
        // Error saving data
      }
}

export const deleteCategory = (catToDelete)=> async(dispatch)=>{
    try {
        let categories = await AsyncStorage.getItem("categories")
        categories = JSON.parse(categories);
        if(!categories){
            return;
        }
        categories = categories.filter(cat=> cat != catToDelete);
        await AsyncStorage.setItem("categories",JSON.stringify(categories));
        dispatch({type: types.GET_CATEGORIES, payload: categories});
      } catch (error) {
        // Error saving data
      }
}