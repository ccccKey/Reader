var app = getApp();
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    util.HTTP_GET(app.globalData.g_doubanHomePage + "/movie/subject/" + movieId, this.getCurrentMovieData);
  },

  getCurrentMovieData: function (data) {
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      averange: {
        average: data.rating.average,
        stars: util.setStars(data.rating.stars),
      },
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary: data.summary
    }

    this.setData({
      movie: movie
    })
  },

  viewMoviePostImg:function(event){
    var tarImg = event.currentTarget.dataset.src;

    wx.previewImage({
      current: tarImg,
      urls: [tarImg],
    })
  }
})