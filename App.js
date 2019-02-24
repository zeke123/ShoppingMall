/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,Button} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder={'搜索商品'}/>
                    <Button style={styles.button} title='搜索'/>
                </View>
                <View style={styles.advertisment}>
                    <Text>轮播广告</Text>
                </View>

                <View style={styles.pruducts}>
                    <Text>商品列表</Text>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        height: 40,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
    },

    advertisment: {
        height: 180,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',

    },
    input:{
        flex:1,
        borderColor:'gray',
        borderWidth:2,

    },
    button:{
        flex:1,


    },
    pruducts: {

        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',


    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
