var app = getApp()
var bus = app.globalData.bus
Page({

    data: {
        next_info: {
            current_play_index:0
        },
        currentItem:0,
        songdata: [
            {
                id:0,
                name:'千百度',
                img:'https://zjazn.test.utools.club/images/2.jpg',
                resource:'https://zjazn.test.utools.club/许篙 - 千百度.mp3',
                author:'许蒿',
                
            },
            {
                id:1,
                name:'胡萝卜须',
                img:'https://zjazn.test.utools.club/images/1.jpg',
                resource:'https://zjazn.test.utools.club/许嵩 - 胡萝卜须.mp3',
                author:'许蒿',
                
            },

            {
                id:2,
                name:'清明雨上',
                img:'https://zjazn.test.utools.club/images/3.jpg',
                resource:'https://zjazn.test.utools.club/许嵩 - 清明雨上.mp3',
                author:'许蒿',
                
            }
        ]


    },
    navClickEvent(e) {
        //修改nav currentItem索引
        this.setData({
            currentItem:Number.parseInt(e.target.id)
        })
    },
    loadMore() {
        console.log("上拉加载更多");
    },
    scrolling(e) {
        console.log(e);
        console.log("滚动中");
    },
    item_change(e) {
        this.setData({
            currentItem:e.detail.current
        })
    },
    onShow() {
        bus.on("change_toplay",()=> {
            this.setData({
                currentItem:1
            })
        });
        bus.on("change_toplaylist",()=> {
            this.setData({
                currentItem:2
            })
        });
       
    },
    play_even(e) {
        console.log("开始播放事件测试");
        this.setData({
            next_info: e.detail
        })
    }

    
    






})