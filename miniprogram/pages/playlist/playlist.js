var app = getApp()
var bus = app.globalData.bus
Component({
  data: {},
  properties: {
    resources: {
      type: Array,
      value: []
    },
    play_index: {
      type:Number,
      value: 0
    }
  },
  methods: {
    change_play_target(e) {
      bus.emit("change_play_target",e.currentTarget.dataset.operation);
    }
  },
  lifetimes: {
     
    attached() {
       
    } 
  }

})