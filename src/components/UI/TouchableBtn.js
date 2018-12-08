
import React, {Component} from 'react';
import {Platform, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Ionicons";

export default class TouchableBtn extends Component {
    constructor(props){ 
        super(props);

    }

    static propTypes={
        text: PropTypes.string,
        activeOpacity: PropTypes.number,
        onPress: PropTypes.func,
        backgroundColor: PropTypes.string,
        textColor: PropTypes.string,
        iconName: PropTypes.string,
        iconColor:PropTypes.string
    }

    static defaultProps = {
        text: "",
        activeOpacity: 0.2,
        onPress: ()=>false,
        backgroundColor: '#0080ff',
        textColor: "white",
        iconColor: "black"   
     }

  render(){


      let extraContainerStyles = {
        backgroundColor: this.props.backgroundColor
      }
      let extraTextStyles = {
        color: this.props.textColor
      }
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style = {[styles.container, extraContainerStyles]}
            onPress = {this.props.onPress}>
                    <View style={this.props.iconName? styles.withIconContainer: {}}>
                        <Text style = {[styles.text, extraTextStyles]}>
                        {this.props.text}
                        </Text>
                        {
                            this.props.iconName &&
                            <Icon
                            name={Platform.OS === "ios" ? `ios-${this.props.iconName}` : `md-${this.props.iconName}`}
                            color={this.props.iconColor}
                            style={styles.icon}
                            size={25}
                            />
                        }
                    </View>
         </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create ({
    container: {
       padding: 10,
       marginTop: 3,
       alignItems: 'center',
    },
    withIconContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        marginLeft:5
    },
    text: {
       
    }
 })

