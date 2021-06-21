const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const port = 8080;

module.exports = {
  entry: {
    bundle: ['./src/main.ts']
  },
  resolve: {
    alias: {
      "svelte": path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: require('svelte-preprocess')(),
            compilerOptions: {
              dev: !prod
            },
            emitCss: true,
            hotReload: !prod
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
      // {
      //     test: /\.(html|svelte)$/,
      //     use: 'svelte-loader'
      // },
      // {
      //     // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
      //     test: /node_modules\/svelte\/.*\.mjs$/,
      //     resolve: {
      //         fullySpecified: false
      //     }
      // },
      // {
      //     test: /\.ts$/,
      //     exclude: /node_modules/,
      //     use: [
      //         {
      //             loader: 'ts-loader'
      //         }
      //     ]
      // },
      // {
      //     test: /\.css$/,
      //     use: [
      //         /**
      //          * MiniCssExtractPlugin doesn't support HMR.
      //          * For developing, use 'style-loader' instead.
      //          * */
      //         // prod ? MiniCssExtractPlugin.loader : 'style-loader',
      //         // 'css-loader'
      //         'css-loader'
      //     ]
      // }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
  ],
  devtool: prod ? false : 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: port,
    host: 'localhost',
    historyApiFallback: true,
    hot: true,
  },
};
