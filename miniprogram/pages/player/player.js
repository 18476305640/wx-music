var app = getApp()
var bus = app.globalData.bus

Component({
  data: {
        //进度条参数
        current_audio_time:0,
        audio_time_length:0,
        //用户看到的进度
        audio_time_length_format:'00:00',
        current_audio_time_format:'00:00',
        audio_state:false
        
  },
  properties: {
    nextinfo: {
      type:Object,
      value:{}
    }
  },

  methods: {
    time_changeing(e) {
      //
      bus.emit("user_change_time",e);
      console.log("改变中");
      this.setData({
        current_audio_time:e.detail.value
      })
      //改变format的
      var current_to_format = this.TimeToFormat(this.data.current_audio_time) ; 
      this.setData({
        current_audio_time_format: current_to_format,
     })  
    },
    change_time(e) {
      bus.emit("change_time",this.data.current_audio_time);
    },
     TimeToFormat(time) {
        var h = Number.parseInt(time/60/60)+"";
        var m = Number.parseInt(time%(60*60)/60);
        var s = Number.parseInt(time%60);
        m=(m<10)?"0"+m:m;
        s=(s<10)?"0"+s:s;
        var result = (h>0?h+':':'')+m+":"+s;
        return result;
    
     }
  },

  lifetimes: {
    attached: function() {

       bus.on('playing', (e) => {
         //监听事件总线的改变
         var current_to_format = this.TimeToFormat(this.data.current_audio_time) ; 
         var length_to_format = this.TimeToFormat(this.data.audio_time_length); 
         this.setData({
            current_audio_time: e.detail.currentTime,
            audio_time_length: e.detail.duration,
            current_audio_time_format: current_to_format,
            audio_time_length_format: length_to_format
         })  


       });

       bus.on('audio_pause',() => {
          this.setData({
            audio_state:false
          })
       })
       bus.on('audio_play',() => {
          this.setData({
            audio_state:true
          })
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  }


})
