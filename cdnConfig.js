/**
 * @file cdn配置
 * @author likaixuan
 * js 和 css 属性可为数组
 */

const cdnMap = {
  'vue': {
    name: 'Vue',
    js: 'https://cdn.staticfile.org/vue/2.5.22/vue.min.js'
  },
  'vue-router': {
    name: 'VueRouter',
    js: 'https://cdn.staticfile.org/vue-router/3.0.2/vue-router.min.js'
  },
  'vuex': {
    name: 'Vuex',
    js: 'https://cdn.staticfile.org/vuex/3.1.0/vuex.min.js'
  },
  'axios': {
    name: 'axios',
    js: 'http://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js'
  },
  'echarts': {
    name: 'echarts',
    js: 'http://cdn.staticfile.org/echarts/4.2.0-rc.2/echarts.min.js'
  },
  'element-ui': {
    name: 'ELEMENT',
    js: 'http://cdn.staticfile.org/element-ui/2.4.7/index.js',
    css: 'http://cdn.staticfile.org/element-ui/2.4.7/theme-chalk/index.css'
  }
}

// externals、cssCdn、jsCdn

module.exports = Object.keys(cdnMap).reduce((res, key) => {
  const currentOption = cdnMap[key]
  res.externals[key] = currentOption.name
  if (Array.isArray(currentOption.js)) {
    res.jsCdn.push(...currentOption.js)
  } else {
    res.jsCdn.push(currentOption.js)
  }
  if (currentOption.css) {
    if (Array.isArray(currentOption.css)) {
      res.cssCdn.push(...currentOption.css)
    } else {
      res.cssCdn.push(currentOption.css)
    }
  }
  return res
}, { externals: {}, cssCdn: [], jsCdn: [] })
