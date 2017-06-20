// pages/movies/movie-more/movie-more.js
var util = require("../../../utils/util.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies : {},
    currURL:"",
    totalCount:0,
    isEmpty:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var caTitle = options.caTitle;
    this.setData({
      caTitle: caTitle
    })
    var getURL = "";
    switch (caTitle) {
      case "即将上映":
        getURL = app.globalData.g_doubanHomePage + "/movie/in_theaters";
        break;
      case "正在热映":
        getURL = app.globalData.g_doubanHomePage + "/movie/coming_soon";
        break;
      case "豆瓣Top250":
        getURL = app.globalData.g_doubanHomePage + "/movie/top250";
        break;
    }
    this.setData({
      currURL : getURL,
    })
    util.HTTP_GET(getURL, this.getMoreMoviesDataBack);
  },

  scrollViewReflesh:function(event){
    wx.showNavigationBarLoading();
    var getMoreURL = this.data.currURL + "?start=" + this.data.totalCount + "&count=20";
    util.HTTP_GET(getMoreURL, this.getMoreMoviesDataBack);
  },

  getMoreMoviesDataBack: function (currData) {
    var dataList = [];
    for (var idx in currData.subjects) {
      var obj = currData.subjects[idx];
      var title = obj.title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "...";
      }

      var movie = {
        title: title,
        img: obj.images.large,
        movieId: obj.id,
        averange: {
          average: obj.rating.average,
          stars: util.setStars(obj.rating.stars),
        }
      }
      dataList.push(movie);
    }

    var totalMovies = {};
    if (!this.data.isEmpty){
      totalMovies = this.data.movies.concat(dataList);
    }else{
      totalMovies = dataList;
      this.data.isEmpty = false;
    }
    
    this.setData({
      movies: totalMovies
    });

    this.data.totalCount += 20;

    wx.hideNavigationBarLoading();
  },

  onReady: function (event) {
    wx.setNavigationBarTitle({
      title: this.data.caTitle,
    })
  },

  // onPullDownRefresh: function (event) {
  //   console.log("onPullDownRefresh")
  //   var refreshURL = this.data.currURL + "?start=0&count=20";
  //   util.HTTP_GET(refreshURL, this.getMoreMoviesDataBack);
  //   this.data.currMoreMovieList = {};
  //   this.data.isEmpty = true;
  //   wx.showNavigationBarLoading();
  //   wx.stopPullDownRefresh();
  // }

  onReachBottom: function (event) {
    console.log("onReachBottom")
    this.data.currMoreMovieList = {};
    this.data.isEmpty = true;

    var refreshURL = this.data.currURL + "?start=0&count=20";
    util.HTTP_GET(refreshURL, this.getMoreMoviesDataBack);
    wx.showNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
})