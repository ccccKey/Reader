
function setStars(starNum) {
  var num = starNum.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }

  return array;
}

function HTTP_GET(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },

    success: function (res) {
      callBack(res.data)
    },
    fail: function (event) {
      console.log("HTTP_GET Fail");
    },
  })
}

module.exports = {
  setStars: setStars,
  HTTP_GET: HTTP_GET,
}