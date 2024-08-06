module.exports = {
    plugins: {
      autoprefixer: {},
      "postcss-pxtorem": {
        propList: ['*'],
        selectorBlackList: ['.norem'] // 过滤掉.norem-开头的class，不进行rem转换
      }
    }
  }