import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';

import {
    StyleSheet,
    Image,
    BackHandler,
    ToastAndroid,
} from 'react-native';

import Mine from './Mine';
import Home from './Home';


var lastBackPressed;
var current = true;

export default class Main extends Component<Props> {



    //生命周期方法 -->首先会执行构造函数
    constructor(props) {//构造函数
        super(props);
        this.state = {
            selectedTab: 'home',
            current: true,
        };
    }

    render() {
        return (
            <TabNavigator style={styles.container} tabBarStyle={{alignSelf: 'center'}}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{color: "#3496f0"}}
                    renderIcon={() =>
                        <Image
                            source={require('../images/tabs/faxian_normal.png')}
                            style={styles.tab_image}/>}
                    renderSelectedIcon={() =>
                        <Image
                            source={require('../images/tabs/faxian_focus.png')}
                            style={styles.tab_image}/>}
                    tabStyle={{alignSelf: 'center'}}
                    onPress={() => this.setState({selectedTab: 'home'})}>
                    <Home navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'mine'}

                    selectedTitleStyle={{color: "#3496f0"}}
                    renderIcon={() => <Image
                        source={require('../images/tabs/personal_normal.png')}
                        style={styles.tab_image}/>}
                    renderSelectedIcon={() => <Image
                        source={require('../images/tabs/personal_focus.png')}
                        style={styles.tab_image}/>}
                    tabStyle={{alignSelf: 'center', justifyContent: 'center'}}
                    onPress={() => this.setState({selectedTab: 'mine'})}>


                    <Mine navigator={this.props.navigator}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }


    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid = () => {
        //如果是在首页
        if (this.state.current == true) {
            if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
                //在2秒内按过back返回，可以退出应用
                BackHandler.exitApp();
                return false;
            }
            lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        } else {
            if (this.props && this.props.navigation) {
                //返回上一级（非首页）
                this.props.navigator.pop();
            }
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    tab_image: {


        width: 25,
        height: 30,
        top: 8
    },
    text: {
        fontSize: 20,
    }
});

