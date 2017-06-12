var postPageData = require("../../../data/posts-data.js")
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postId = options.postId;
    var tarData = postPageData.postList[postId]

    this.setData(
      {
        currPostId: postId,
        tarPostData: tarData
      }
    )

    var collectStatusArr = wx.getStorageSync("collectedArr")
    if (collectStatusArr) {
      var tarCollect = collectStatusArr[postId]
      this.setData({
        collected: tarCollect
      })
    } else {
      var collectStatusArr = {}
      collectStatusArr[postId] = false
      wx.setStorageSync("collectedArr", collectStatusArr)
    }

    if (app.globalData.g_isPlayMusic && app.globalData.g_isCurrentPostId === postId){
      this.setData({
        isPlayMusic: true
      })
    }

    var that = this;
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayMusic: false
      })
      app.globalData.g_isPlayMusic = false
      app.globalData.g_isCurrentPostId = postId
    })
    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayMusic: true
      })
      app.globalData.g_isPlayMusic = true
      app.globalData.g_isCurrentPostId = postId
    })
  },

  onCollectClick: function (event) {
    var collectStatusArr = wx.getStorageSync("collectedArr")
    var collectStatus = collectStatusArr[this.data.currPostId]
    collectStatus = !collectStatus
    collectStatusArr[this.data.currPostId] = collectStatus
    wx.setStorageSync("collectedArr", collectStatusArr)
    this.setData(
      {
        collected: collectStatus
      }
    )

    wx.showToast({
      title: collectStatus ? "收藏成功" : "取消成功",
      icon: 'success',
      duration: 1000,
      mask: true,
    })
  },

  shareBtn: function (event) {
    var itemList = [
      "分享到朋友圈",
      "分享给微信好友",
      "分享到QQ",
    ];

    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        wx.showModal({
          title: '用户分享',
          content: '用户' + itemList[res.tapIndex],
          showCancel: true,
        })
      },
    })
  },

  onMudicClick: function (event) {
    if (this.data.isPlayMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayMusic: false
      })
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.data.tarPostData.music.url,
        title: this.data.tarPostData.music.title,
        coverImgUrl: this.data.tarPostData.music.coverImg,
      })
      this.setData({
        isPlayMusic: true
      })
    }
  }

})