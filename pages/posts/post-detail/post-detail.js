var postPageData = require("../../../data/posts-data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },

  onCollectClick: function (event) {
    var collectStatusArr = wx.getStorageSync("collectedArr")
    var collectStatus = collectStatusArr[this.data.currPostId]
    collectStatus = !collectStatus
    collectStatusArr[this.data.currPostId] = collectStatus
    wx.setStorageSync("collectedArr", collectStatusArr)
    this.setData(
      {
        collected:collectStatus
      }
    )

    wx.showToast({
      title: collectStatus?"收藏成功":"取消成功",
      icon: 'success',
      duration: 1000,
      mask: true,
    })
  }

})