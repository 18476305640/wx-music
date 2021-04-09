Page({

    data: {
        currentItem:0
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
    }



})