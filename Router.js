import React, {Component} from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import {Platform} from 'react-native';
import Login from './src/components/login';
import MainPage from './src/components/mainPage';
import CreateNewOutcome from './src/components/createNewOutcome';
import SelectCategory from './src/components/createNewOutcome/SelectCategory';
import AddCategory from './src/components/createNewOutcome/AddCategory';
import CheckUserExistance from './src/components/checkUserExistance';
import MonthlyExpenses from './src/components/mainPage/MonthlyExpenses';


export default class RouterComponent extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <Router>
                <Scene key="root" hideNavBar>
                     <Scene key="initialPage" initial>
                        <Scene key={"checkUserExistance"} component={CheckUserExistance} title="Initial Page" />
                    </Scene>
                    <Scene key="auth">
                        <Scene key={"Login"} component={Login} title="Please Login" />
                    </Scene>
                    <Scene key="main">
                        <Scene initial key={"dashboard"} 
                            component={MainPage}
                            title="Dashboard"
                            rightTitle={"Add"}
                            onRight={()=>Actions.selectCategory()}/>
                        <Scene key={"selectCategory"}
                               component={SelectCategory}
                               title={"Select Category"}
                               rightTitle={"+Add"}
                               onRight={()=>Actions.addCategory()}
                               onBack={()=> Actions.dashboard()}/>
                        <Scene key={"addCategory"}
                               component={AddCategory}
                               title={"Add Category"}/>
                        <Scene key={"createNewOutcome"}
                               component={CreateNewOutcome}
                               title={"New Outcome"}/>
                        <Scene key={"monthlyExpenses"}
                               component={MonthlyExpenses}
                               title={"Monthly Expenses"}/>
                    </Scene>
                </Scene>
            </Router>
        );
    }

}