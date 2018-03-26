# envvar-loader

Environment variable loader for webpack.

## Usage

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.txt$/,
        loader: 'envvar-loader',
        options: {
          pattern: /\${([^}]*)}/g,
          replacer: (match, varname) => process.env[varname],
        }
      }
    ]
  }
  ...
};
```
