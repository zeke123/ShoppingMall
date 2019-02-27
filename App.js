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
    Image,//在图片外层添加TouchableOpacity，才能设置点击事件
    TouchableOpacity,//本组件用于封装视图，使其可以正确响应触摸操作
} from 'react-native';

//创建ListView.DataSource数据源
const datas = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

//获取屏幕的宽和高
const {width, height} = Dimensions.get('window');

export default class App extends Component<Props> {

    //生命周期方法 -->首先会执行构造函数
    constructor(props) {//构造函数
        super(props);
        this.state = {
            //初始化当前页
            currentPage: 0,
            //ListView数据源
            dataSource: datas.cloneWithRows(['商品1', '商品2', '商品3', '商品4', '商品5', '商品6', '商品7', '商品8', '商品9', '商品10', '商品11', '商品12'])
        };
    }

    //生命周期方法 -->在render方法执行前执行，只会被执行一次，
    componentWillMount() {

    }

    //生命周期方法 -->用于渲染界面
    render() {
        return (
            <View style={styles.container}>

                {/*
                 顶部搜索商品
                 Image 加载本地图片：require('./images/header/header_logo.png')
                 */}
                <View style={styles.searchbar}>
                    <Image
                        source={require('./images/header/header_logo.png')}
                        style={styles.logo}/>

                    <View style={styles.searchBox}>
                        <Image
                            source={require('./images/header/icon_search.png')}
                            style={styles.searchIcon}/>
                        <TextInput
                            keyboardType='web-search'
                            placeholder='搜索商品/店铺'
                            style={styles.inputText}/>

                        <TouchableOpacity onPress={() => this.onVoiceClick()}>
                            <Image
                                source={require('./images/header/icon_voice.png')}
                                style={styles.voiceIcon}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.onScanClick()}>
                        <Image
                            source={require('./images/header/icon_qr.png')}
                            style={styles.scanIcon}/>
                    </TouchableOpacity>
                </View>

                {/*
                 中间类似于viewpager轮播图
                 showsHorizontalScrollIndicator：是否显示滚动条
                 pagingEnabled：是否显示分页
                 */}

                <View style={styles.advertisment}>
                    <ScrollView
                        ref="scrollView"
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

                {/*
                 底部商品列表listview
                 renderRow：接收数据，并渲染数据
                 renderSeparator:设置分割线
                 */}
                <View style={styles.pruducts}>
                    <ListView
                        dataSource={this.state.dataSource}
                        showsVerticalScrollIndicator={false}
                        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                            this.renderSeparator(sectionID, rowID, adjacentRowHighlighted)
                        }


                        renderRow={this._renderRow}/>
                </View>
            </View>
        );
    }

    /**
     * 设置listview分割线
     * @param sectionID
     * @param rowID
     * @param adjacentRowHighlighted
     * @returns {XML}
     */
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }


    //生命周期方法 -->在页面渲染之后
    componentDidMount() {
        //页面渲染之后，开启定时
        this.startTiming();
    }

    //生命周期方法 -->卸载组件
    componentWillUnmount() {
        //清除定时
        clearInterval(this.inteval)
    }

    _renderRow = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.row}>
                <Text >{rowData}</Text>
            </View>
        );
    }

    //扫描的点击事件
    onScanClick() {
        Alert.alert('标题', '只有一个按钮的提示内容', [{text: '确定', onPress: () => this.onSureClick()}]);
    }

    //语音图片的点击事件
    onVoiceClick() {
        ToastAndroid.show("点击了语音的图片", ToastAndroid.SHORT);
    }

    //点击确定的事件
    onSureClick() {
        ToastAndroid.show("点击了扫描的图片", ToastAndroid.SHORT);
    }

    //开启定时
    startTiming() {
        //设置定时
        this.inteval = setInterval(() => {
            nextpage = this.state.currentPage + 1;
            if (nextpage >= 3) {
                nextpagen = 0;
            }
            this.setState({currentPage: nextpage});
            const offSetX = nextpage * width;
            this.refs.scrollView.scrollResponderScrollTo({x: offSetX, y: 0, animated: true})
        }, 2000)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchbar: {
        flexDirection: 'row',
        //可以决定其子元素沿着次轴的排列方式：
        //row:水平轴
        //column:竖直轴（默认为竖直轴）
        backgroundColor: 'red',
        justifyContent: 'center',//可以决定其子元素沿着主轴的排列方式：
        //flex-start:从行首开始排列
        //flex-end: 从行尾开始排列
        //center: 伸缩元素向每行中点排列
        //space-between: 在每行上均匀分配弹性元素
        //space-around: 在每行上均匀分配弹性元素
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,// 处理iOS状态栏
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
        alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
    },
    logo: {
        height: 24,
        width: 64,
        resizeMode: 'stretch'  // 设置拉伸模式
    },
    searchBox: {
        height: 30,
        flexDirection: 'row',
        flex: 1,  // 类似于android中的layout_weight,设置为1即自动拉伸填充
        borderRadius: 5,  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 12
    },
    scanIcon: {
        height: 26,
        width: 26,
        resizeMode: 'stretch'
    },
    searchIcon: {
        marginLeft: 6,
        marginRight: 6,
        width: 16,
        height: 16,
        resizeMode: 'stretch'
    },
    voiceIcon: {
        marginLeft: 5,
        marginRight: 8,
        width: 15,
        height: 20,
        resizeMode: 'stretch'
    },
    inputText: {
        flex: 1,
        height: 60,
        backgroundColor: 'transparent',
        fontSize: 16
    },
    advertisment: {
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },

    first_advertisment: {
        width: width,
        height: 180,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    second_advertisment: {
        width: width,
        height: 180,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    third_advertisment: {
        width: width,
        height: 180,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: 'gray',
    },
    button: {
        flex: 1,
        borderColor: 'gray',
    },
    pruducts: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: width,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    line: {
        height: 1,
        backgroundColor: '#999999'
    },
});
