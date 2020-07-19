export function formatTime(timestamp, format = 'yyyy/MM/dd hh:mm:ss') {
  const newDate = new Date(timestamp * 1000)
  // eslint-disable-next-line
  Date.prototype.format = function (format) {
    var date = {
      'M+': this.getMonth() + 1,
      'd+': this.getDate(),
      'h+': this.getHours(),
      'm+': this.getMinutes(),
      's+': this.getSeconds(),
      'q+': Math.floor((this.getMonth() + 3) / 3),
      'S+': this.getMilliseconds()
    }

    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var key in date) {
      if (new RegExp('(' + key + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[key] : ('00' + date[key]).substr(('' + date[key]).length))
      }
    }
    return format
  }

  return newDate.format(format)
}
