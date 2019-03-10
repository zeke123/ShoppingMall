import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default class App extends Component<Props> {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    详情界面
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center',

    },

    text:{
        fontSize:20,
    }




});

