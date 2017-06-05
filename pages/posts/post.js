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

    var post_content = [
      {
        date: "Sep 18 2017",
        title: "正是虾肥蟹壮时",
        post_img: "/images/post/crab.png",
        author_img: "/images/avatar/1.png",
        hideStm: false,
        content: "橘黄蟹正壮",
        view_num: "112",
        collect_num: "96",
      },
      {
        date: "Sep 20 2017",
        title: "比利林恩",
        post_img: "/images/post/bl.png",
        author_img: "/images/avatar/2.png",
        hideStm: false,
        content: "比利林恩的中场故事",
        view_num: "172",
        collect_num: "86",
      },
      {
        date: "Sep 21 2017",
        title: "cat",
        post_img: "/images/post/cat.png",
        author_img: "/images/avatar/3.png",
        hideStm: false,
        content: "this is black cat",
        view_num: "212",
        collect_num: "226",
      },
      {
        date: "Sep 22 2017",
        title: "屋子",
        post_img: "/images/post/sls.png",
        author_img: "/images/avatar/4.png",
        hideStm: false,
        content: "漫画里的房子",
        view_num: "312",
        collect_num: "76",
      },
      {
        date: "Sep 25 2017",
        title: "VR时代",
        post_img: "/images/post/vr.png",
        author_img: "/images/avatar/1.png",
        hideStm: false,
        content: "VR time is comming!",
        view_num: "88",
        collect_num: "66",
      },
      {
        date: "Sep 29 2017",
        title: "WeChat",
        post_img: "/images/post/xiaolong.png",
        author_img: "/images/avatar/5.png",
        hideStm: false,
        content: "小龙与微信",
        view_num: "199",
        collect_num: "296",
      },
    ]

    this.setData(
      {
        postsArr: post_content,
      }
    );

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})