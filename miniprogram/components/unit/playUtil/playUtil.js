//加入机器人
var app = getApp()
var bus = app.globalData.bus
// components/unit/playUtil/playUtil.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
      resources: {
          type:Array,
          value:[]
      },
      plan: {
        type:String,
        value:'loop'
      }
    },
  data: {
    isPlay:false,
    currentAudioIndex: 0
  },
  lifetimes: {
    attached: function() {
      this.audioCtx = wx.createAudioContext('myAudio')

      bus.on("user_change_time",data=> {
         //接收收了用户的改变,执行暂停操作
         this.audioPause();

      });
      bus.on("change_time",time=> {
        //拖动放下了
        this.setAudioTime(time);
        this.audioPlay();
      });
      bus.on("change_play_target",index => {
        this.audioPause();
        this.setData({
          currentAudioIndex: index
        })
        this.audioPlay();
        
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    to_play_index() {
        //点击头像，去修改index ，成play对应的index
        bus.emit("change_toplay");
    },
    to_playlist_index() {
      //点击列表，去修改index ，成playlist对应的index
      bus.emit("change_toplaylist");

  },
    audio_end() {
      //播放结束源事件
      this.nextAudio();
    },
    playing(e) {
      //从事件总线发出正在播放的信息
      bus.emit('playing',e); 
      this.triggerEvent("play_ing",e);
    },
    //播放
    audioPlay() {
      this.setData({
        action: {
         method: 'play'
        }
       });
      this.setData({
        isPlay:true
      })
      //向外发送音频已开始播放
      bus.emit("audio_play");
      //向外发送音频已开始播放,组件
      this.triggerEvent("play",{
        current_play_index:this.data.currentAudioIndex,
        resources:this.data.resources
     });

    },
    //暂停
    audioPause() {
      console.log("暂停");
      this.setData({
        action: {
         method: 'pause'
        }
       });
      this.setData({
        isPlay:false
      })
      //向外发送音频已暂停
      bus.emit("audio_pause");

      this.triggerEvent("pause");
    },

    //下一首
    nextAudio() {
      this.audioPause()
      //组件播放结束，触发的源事件,由组件外传入next的策略，TODO
      if(this.data.currentAudioIndex < this.data.resources.length-1) {
          var length = this.data.resources;
          var plan_val = 0;
          //根据策略，生成下一首的歌曲索引
          if(this.data.plan == 'loop') {
             plan_val = ++this.data.currentAudioIndex;
          }else if(this.plan == 'random'){
             play_val = Math.floor((Math.random()*length));
          }
          //播放生成的索引
          this.setData({
            currentAudioIndex: plan_val
          })
      }else {
        this.setData({
          currentAudioIndex: 0
        })
      }
      var gthis = this;
      setTimeout(function() {
        gthis.audioPlay();
      },100); 
      
    },
    //设置播放时间
    setAudioTime(time) {
      this.setData({
           action: {
            method: 'setCurrentTime',
            data: time
           }
      });
    },

  }
})
