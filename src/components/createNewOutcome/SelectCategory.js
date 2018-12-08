
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { View, Platform, ScrollView, Text, Divider, Alert,
    TouchableOpacity, TextInput, StyleSheet, Modal } from 'react-native'
import {Actions} from 'react-native-router-flux';
import TouchableBtn from '../UI/TouchableBtn';
import SearchInput from '../UI/SearchInput';
import {getCategories, deleteCategory} from '../../actions/categories';
import Swipeable from 'react-native-swipeable';
import Icon from "react-native-vector-icons/Ionicons";


class SelectCategory extends Component {
    constructor(props){
        super(props );
        this.state = {
            searchText: "",
           
         }
    }

    static propTypes = {

    }

    static defaultProps = {

    }

    componentDidMount(){
        this.props.getCategories();
    }

    onItemSelected(item){
        Actions.createNewOutcome({categoryName: item});
    }

    onSearchTextChanged = (text)=>{
        this.setState({searchText: text.toLowerCase()});
    }

  isShowItem = (itemName)=>{
      return (this.state.searchText.length === 0 || 
        itemName.toLowerCase().indexOf(this.state.searchText) > -1);
  }

  onLeftActionRelease(catName){
    Alert.alert("Notification", "Delete Category?", [
        {text: 'Delete', onPress: () => this.props.deleteCategory(catName), style: 'cancel'},
        {text: 'Cancel', onPress: () => false},
    ])
  }

  render(){
    const leftButtons = [
        <TouchableOpacity activeOpacity={0.7}
                style = {{ padding: 10,marginTop: 3,alignItems: 'flex-end', backgroundColor:"#ff3333"}}
                onPress = {()=>false}>
                 <Icon
                    name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                    color="black"
                    size={25}
                />
            </TouchableOpacity>
    ];
    
    return (
        <ScrollView>
            <SearchInput onChangeText={this.onSearchTextChanged}/>
            {
                this.isShowItem("None") &&
                <View>
                    <TouchableBtn 
                            activeOpacity={0.7}
                            onPress = {this.onItemSelected.bind(this, 'None')}
                            text={"None"}/>
                    <View style={{marginTop: 3, borderBottomColor: 'black', borderBottomWidth: 3}}/>
                </View>

            }
            <View style={{marginTop: 8}}>
                {
                this.props.categories&&
                this.props.categories.map((item, index) => (
                    this.isShowItem(item) &&
                    <Swipeable leftButtons={leftButtons} key={index} 
                    onLeftActionRelease={this.onLeftActionRelease.bind(this, item)}>
                            <TouchableBtn 
                                key={index}
                                activeOpacity={0.7}
                                onPress = {this.onItemSelected.bind(this, item)}
                                text={item}/>               
                    </Swipeable>
                    
                ))
                }
            </View>
         </ScrollView>
    );
  }
}

const styles = StyleSheet.create ({

 });

const mapStateToProps = (state)=>{
    return({
        categories: state.categories
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getCategories,
        deleteCategory
    }, dispatch);
}
 export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);