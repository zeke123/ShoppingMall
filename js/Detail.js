import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


export default class Detail extends Component<Props> {










    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.backUp()}>
                    
                    <Text style={styles.text}>
                        详情界面
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }







    

    // 返回上一页面
    backUp(){
        //从props取出navigator
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
        
    }
    
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',

    },

    text: {
        fontSize: 20,
    }

});

