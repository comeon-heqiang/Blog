import config from '../config/index'
export function GET(url, data) {
  return request(url, data)

}
export function POST(url, data) {
  return request(url, data, 'POST')
}

function request(url, data, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data && res.data.code === 200) {
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

export function showToast(icon = 'success', msg) {
  wx.showToast({
    icon,
    title: msg
  })
}
export function showModal(title = '提示', content) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
