var util = require("../../utils/util.js");
var app = getApp();

Page({

  data: {
    newMovies: {},
    comingMovies: {},
    topMovies: {},
    searchResult:{},
    containerShow:true,
    searchPanelShow: false,
  },

  onLoad: function (event) {
    var hotListUrl = "/movie/in_theaters" + "?start=0&count=3";
    var willPublichLietUrl = "/movie/coming_soon" + "?start=0&count=3";
    var top250ListUrl = "/movie/top250" + "?start=0&count=3";

    this.getCurrListData(app.globalData.g_doubanHomePage + hotListUrl, "newMovies", "即将上映");
    this.getCurrListData(app.globalData.g_doubanHomePage + willPublichLietUrl, "comingMovies", "正在热映");
    this.getCurrListData(app.globalData.g_doubanHomePage + top250ListUrl, "topMovies", "豆瓣Top250");
  },

  getCurrListData: function (url, typeMov, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },

      success: function (data) {
        that.handleData(data.data, typeMov, categoryTitle);
      },
      fail: function (event) {
        console.log("getCurrListData Fail");
      },

    })
  },

  handleData: function (currData, typeMov, categoryTitle) {
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
      categoryTitle: categoryTitle
    }
    this.setData(newMovieList);
  },

  giveMore:function(event){
    var caTitle = event.currentTarget.dataset.moviet;

    wx.navigateTo({
      url: 'movie-more/movie-more?caTitle=' + caTitle,
    })
  },

  FocusInput:function(event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },

  FocusFirm:function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.g_doubanHomePage + "/movie/search?q=" + text;
    this.getCurrListData(searchUrl, "searchResult", "");    
  },

  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult:{}
    })
  },

})