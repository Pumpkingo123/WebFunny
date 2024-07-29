module.exports = {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16, // 根据你的设计稿或样式指南调整，通常是设计稿宽度的1/10或基本字体大小。
        unitPrecision: 2, // 转换后的rem值保留的小数位数。
        propList: ['*'], // 选择要转换的属性，'*'表示所有属性都转换。
        selectorBlackList: ['.norem'], // 排除一些不需要转换的选择器，可以使用正则表达式。
        replace: true, // 替换包含px的规则，而不是添加备用规则。
        mediaQuery: false, // 允许在媒体查询中转换px。
        minPixelValue: 0 // 设置要替换的最小像素值。
      }
    }
  };
  