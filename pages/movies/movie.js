var app = getApp();

Page({

  onLoad:function(event){
    var hotListUrl = "/movie/in_theaters";
    var willPublichLietUrl = "/movie/coming_soon";
    var top250ListUrl = "/movie/top250";

    this.getCurrListData(app.globalData.g_doubanHomePage + hotListUrl);
    this.getCurrListData(app.globalData.g_doubanHomePage + willPublichLietUrl);
    this.getCurrListData(app.globalData.g_doubanHomePage + top250ListUrl);
  },

  getCurrListData:function(url){
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },

      success: function (event) {
        console.log("OnSuccess");
        console.log(event.data);
      },
      fail: function (event) {
        console.log("OnFail");
      },
      complete: function (event) {
        console.log("OnComplete");
      }

    })
  }

})