var util = require("../../utils/util.js");
var app = getApp();

Page({

  data: {
    newMovies: {},
    comingMovies: {},
    topMovies: {}
  },

  onLoad: function (event) {
    var hotListUrl = "/movie/in_theaters" + "?start=0&count=3";
    var willPublichLietUrl = "/movie/coming_soon" + "?start=0&count=3";
    var top250ListUrl = "/movie/top250" + "?start=0&count=3";

    this.getCurrListData(app.globalData.g_doubanHomePage + hotListUrl, "newMovies");
    this.getCurrListData(app.globalData.g_doubanHomePage + willPublichLietUrl, "comingMovies");
    this.getCurrListData(app.globalData.g_doubanHomePage + top250ListUrl, "topMovies");
  },

  getCurrListData: function (url, typeMov) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },

      success: function (data) {
        console.log(data);
        that.handleData(data.data, typeMov);
      },
      fail: function (event) {
        console.log("OnFail");
      },
      complete: function (event) {
        console.log("OnComplete");
      }

    })
  },

  handleData: function (currData, typeMov) {
    var dataList = [];

    for (var idx in currData.subjects) {
      var obj = currData.subjects[idx];
      var title = obj.title;

      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }

      var movie = {
        title: obj.title,
        img: obj.images.large,
        movieId: obj.id,
        averange: {
          average: obj.rating.average,
          stars: util.setStars(obj.rating.stars),
        }
      }

      dataList.push(movie);
    }

    var newMovieList = {};
    newMovieList[typeMov] = {
      movies: dataList, 
    }
    this.setData(newMovieList);
  }

})