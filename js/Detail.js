import React, {Component} from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';


export default class Detail extends Component<Props> {

    //生命周期方法 -->首先会执行构造函数
    constructor(props) {//构造函数
        super(props);
        this.state = {

            current: false,
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => this.backUp()}>

                    <Text style={styles.text}>
                        详情界面
                    </Text>
                </TouchableOpacity>

                <Text style={styles.text}>{this.props.productName}</Text>


            </View>
        );
    }

    // 返回上一页面
    backUp() {
        //从props取出navigator
        const {navigator} = this.props;
        if (navigator) {
            //返回上一个界面
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

