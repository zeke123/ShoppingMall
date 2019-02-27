import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    Dimensions,
    ListView,
    RefreshControl,
    ToastAndroid,
    Alert,
} from 'react-native';

//创建ListView.DataSource数据源
const datas = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class App extends Component<Props> {
    constructor(props) {//构造函数
        super(props);
        this.state = {
            currentPage: 0,
            dataSource: datas.cloneWithRows(['商品1', '商品2', '商品3', '商品4', '商品5', '商品6', '商品7', '商品8', '商品9', '商品10', '商品11', '商品12'])
        };
    }

    //页面渲染之前
    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>

                {/*顶部搜索商品*/}
                <View style={styles.searchbar}>
                    <TextInput style={styles.input} placeholder={'搜索商品'}/>
                    {/*Button添加点击事件 onPress={() => this.searchClick()} */}
                    <Button style={styles.button} title='搜索' onPress={() => this.searchClick()}/>
                </View>

                {/*
                 中间类似于viewpager轮播图
                 showsHorizontalScrollIndicator：是否显示滚动条
                 pagingEnabled：是否显示分页
                 */}

                <View style={styles.advertisment}>
                    <ScrollView ref="scrollView"
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled={true}>
                        <View style={styles.first_advertisment}>
                            <Text >广告1</Text>
                        </View>

                        <View style={styles.second_advertisment}>
                            <Text>广告2</Text>
                        </View>

                        <View style={styles.third_advertisment}>
                            <Text>广告3</Text>
                        </View>
                    </ScrollView>
                </View>

                {/*底部商品列表listview*/}
                <View style={styles.pruducts}>
                    <ListView
                        dataSource={this.state.dataSource}
                        showsVerticalScrollIndicator={false}
                        renderRow={this._renderRow}/>
                </View>
            </View>
        );
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.row}>
                <Text >{rowData}</Text>
            </View>
        );
    }

    //搜索的点击事件
    searchClick() {
        Alert.alert('标题', '只有一个按钮的提示内容', [{text: '确定', onPress: () => this.onSureClick()}]);
    }

    //点击确定的事件
    onSureClick() {
        ToastAndroid.show("确定", ToastAndroid.SHORT);
    }

    //在页面渲染之后
    componentDidMount() {
        //页面渲染之后，开启定时
        this.startTiming();
    }

    //开启定时
    startTiming() {
        this.inteval = setInterval(() => {
            nextpage = this.state.currentPage + 1;
            if (nextpage >= 3) {
                nextpagen = 0;
            }
            this.setState({currentPage: nextpage});
            const offSetX = nextpage * Dimensions.get('window').width;
            this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true})
        }, 2000)
    }

    //卸载组件
    componentWillUnmount() {
        //清除定时
        clearInterval(this.inteval)
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
        justifyContent: 'center',//可以决定其子元素沿着主轴的排列方式：
        //flex-start:从行首开始排列
        //flex-end: 从行尾开始排列
        //center: 伸缩元素向每行中点排列
        //space-between: 在每行上均匀分配弹性元素
        //space-around: 在每行上均匀分配弹性元素

        alignItems: 'center',
        //可以决定其子元素沿着次轴的排列方式：
        flexDirection: 'row',
        //row:水平轴
        //column:竖直轴（默认为竖直轴）
    },
    advertisment: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },

    first_advertisment: {
        width: Dimensions.get('window').width,
        height: 180,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    second_advertisment: {
        width: Dimensions.get('window').width,
        height: 180,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    third_advertisment: {
        width: Dimensions.get('window').width,
        height: 180,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
    },
    button: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 2,
    },
    pruducts: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: Dimensions.get('window').width,//获取屏幕的宽度
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
