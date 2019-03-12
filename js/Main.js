import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';

import {
    StyleSheet,
    Image,
} from 'react-native';

import Mine from './Mine';
import Home from './Home';


export default class Main extends Component<Props> {


    //生命周期方法 -->首先会执行构造函数
    constructor(props) {//构造函数
        super(props);
        this.state = {
            selectedTab: 'home'
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

