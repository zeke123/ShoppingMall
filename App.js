import React, {Component} from 'react';
import Swiper from 'react-native-swiper';
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

    TouchableHighlight,
} from 'react-native';


//yarn add react-native-swiper  安装第三方库react-native-swiper

//模拟数据
var data = {
    "result": [
        {
            "name": "荔枝",
            "price": "10.00"
        },
        {
            "name": "橙子",
            "price": "5.00"
        },
        {
            "name": "苹果",
            "price": "4.00"
        },
        {
            "name": "葡萄",
            "price": "6.00"
        },
        {
            "name": "香蕉",
            "price": "5.00"
        },
        {
            "name": "桂圆",
            "price": "8.00"
        },
        {
            "name": "橘子",
            "price": "3.00"
        },
        {
            "name": "草莓",
            "price": "5.00"
        },
        {
            "name": "樱桃",
            "price": "25.00"
        },
        {
            "name": "桃子",
            "price": "5.00"
        }
    ]
};

//创建ListView.DataSource数据源
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


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
            dataSource: ds.cloneWithRows(data.result),
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

                <View style={styles.swiper_style}>
                    <Swiper
                        showsButtons={false}
                        loop={true}
                        autoplay={true}
                        autoplayTimeout={2}>


                        <TouchableOpacity onPress={() => this.onfirstAdClick()}>
                            <Image style={styles.image} source={require('./images/banner/1.jpg')}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onSecondAdClick()}>
                            <Image style={styles.image} source={require('./images/banner/2.jpg')}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onThirdAdClick()}>
                            <Image style={styles.image} source={require('./images/banner/3.jpg')}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.onfouthAdClick()}>
                            <Image style={styles.image} source={require('./images/banner/4.jpg')}/>
                        </TouchableOpacity>


                    </Swiper>
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
                        renderRow={(item) => this._renderRow(item)}/>
                </View>
            </View>
        );
    }

    /**
     * 第一张广告图的点击事件
     */
    onfirstAdClick() {
        Alert.alert('第一张广告图', null, null, null, null)

    }

    /**
     * 第二张广告图的点击事件
     */
    onSecondAdClick() {
        ToastAndroid.show("第二张广告图", ToastAndroid.SHORT);

    }

    /**
     * 第三张广告图的点击事件
     */
    onThirdAdClick() {
        ToastAndroid.show("第三张广告图", ToastAndroid.SHORT);

    }

    /**
     * 第四张广告图的点击事件
     */
    onfouthAdClick() {
        ToastAndroid.show("第四张广告图", ToastAndroid.SHORT);

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
    }

    //生命周期方法 -->卸载组件
    componentWillUnmount() {

    }

    _renderRow(item) {
        return (
            <TouchableOpacity onPress={() => this.onListViewItemClick(item)}>
                <View style={styles.row}>
                    <Text style={styles.name_style}>{item.name}</Text>
                    <Text style={styles.price_style}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    // ListView的item的点击事件
    onListViewItemClick(item) {
        ToastAndroid.show("点击了->" + item.name, ToastAndroid.SHORT);
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
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: width,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImg: {
        height: 180,
        width: width,
    },
    name_style: {
        fontSize: 15,
        color: '#ffffff',
    },
    price_style: {
        fontSize: 15,//relative（默认值）和absolute。
        color: '#ffffff',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    line: {
        height: 1,
        backgroundColor: '#ffffff'
    },
    swiper_style: {
        height: 180,
    },
    image: {
        resizeMode: 'stretch',
    }
});
