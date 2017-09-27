const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin'); //代码压缩
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css
const webpack = require('webpack');

module.exports = {
  // 编译打包的入口文件
  entry: {
    "index": './src/index.js',
    "style": './src/style.js'
  },
  output: {
    filename: 'asset/js/[name].js',
    path: path.resolve(__dirname, 'dist') // 这里是定义了所以资源打包输出的跟目录,后面单个配置的路径都是基于它的
  },
  devtool: 'inline-source-map', 
  // [inline-source-map]dev开发环境下面可以使用这个,有报错的话可以看见是那个文件
  // [source-map] 建议是开生产环境中使用,如果有错误也可以定位到位置,他会生成对应的map.js文件,   
  devServer: {
    contentBase: './dist',
    hot: true
  },
  // 模块处理
  module: {
    rules: [ // 处理规则
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: "style-loader",
      //     use: "css-loader",
      //   })
      // },
      { 
        //TODO::图片打包的路径问题？
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { 
              name: "[name].[ext]",
              // publicPaht: "/",
              outputPath: 'asset/image/',//这个是在文件打包编译的时候对应位置替换的时候会带上的路径
              limit: 81920
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '这里是编译自动生成的index',
      template: "./src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    // new UglifyJSPlugin({
    //   comments: false
    // }),
    new webpack.optimize.UglifyJsPlugin({ //代码压缩的时候就已经把注释去掉了
      compress:{
        warnings: false,
        drop_debugger: true,
        drop_console: true
    }}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    }),
    // new ExtractTextPlugin("asset/css/styles.css")
  ]
};