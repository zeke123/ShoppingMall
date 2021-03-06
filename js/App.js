import React, {Component} from 'react';

import {Navigator} from 'react-native-deprecated-custom-components';

import Main from './Main';


export default class App extends Component<Props> {

    render() {
        return (
            <Navigator
                initialRoute={{
                    name: 'main',
                    component: Main
                }}
                configureScene={(route) => {
                    //过渡动画 PushFromRight（默认）
                    //FloatFromRight、FloatFromLeft、FloatFromBottom、FloatFromBottomAndroid、FadeAndroid、HorizontalSwipeJump、HorizontalSwipeJumpFromRight、VerticalUpSwipeJump、VerticalDownSwipeJump
                    return Navigator.SceneConfigs.PushFromRight;
                }}
                renderScene={(route, navigator) => {
                    const Component = route.component;
                    return <Component{...route.params} navigator={navigator}/>
                }}
            />);
    }
}

