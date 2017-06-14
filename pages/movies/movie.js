Page({

  onLoad:function(event){
    wx.request({
      url: 'https://api.douban.com/v2/book/1220562',

      success:function(event)
      {
        console.log("OnSuccess");
        console.log(event.data);
      },
      fail:function(event)
      {
        console.log("OnFail");
      },
      complete:function(event)
      {
        console.log("OnComplete");
      }

    })
  }

})