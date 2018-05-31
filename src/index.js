if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.host
}

if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value(callback, type, quality) {
      const binStr = atob(this.toDataURL(type, quality).split(',')[1])
      const len = binStr.length
      const arr = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      callback(new Blob([arr], {type: type || 'image/png'}))
    },
  })
}

if (!Storage.prototype.getObject) {
  Storage.prototype.getObject = function (key) {
    const value = this.getItem(key)
    return value && JSON.parse(value)
  }
}

if (!Storage.prototype.setObject) {
  Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value))
  }
}

// 在数组中插入或删除当前元素
if (!Array.prototype.toggle) {
  Array.prototype.toggle = function (value) {
    const index = this.findIndex(v => v === value)
    if (index === -1) {
      this.push(value)
    } else {
      this.splice(index, 1)
    }
  }
}

// 数组对象的相同字段统计求和
if (!Array.prototype.keysum) {
  Array.prototype.keysum = function (key, len = 0) {
    let total = 0
    this.forEach(v => {
      if (v[key]) {
        total += parseFloat(v[key])
      }
    })
    return round(total, len)
  }
}

// 判断对象类型
export function getType(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

// 包括Max Min
export function random(min, max) {
  return parseInt(min + Math.random() * (max - min + 1), 10)
}

// PHP round
export function round(num, len = 0) {
  return Math.round(num * Math.pow(10, len)) / Math.pow(10, len)
}

// 计算百分比：n分子，d分母，len最长小数位数
export function percent(n, d, len = 0) {
  const percent = round(n / d * 100, len)
  return percent ? percent : ''
}

// i:下标从0开始，total:总数从1开始
export function indexPos(i, total) {
  let index = i % total
  if (index < 0) {
    index = index + total
  }
  return index
}


export default {
  getType,
  random,
  round,
  percent,
  indexPos,
}
