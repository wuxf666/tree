module.exports = {
  presets: [
    '@vue/app'
  ],
  sourceType: 'unambiguous', // 关键是这一句
  plugins: [
    ["component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ]
  ]
}
