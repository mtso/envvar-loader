import path from 'path';
import webpack from 'webpack';
import test from 'ava';
import { config } from 'dotenv';

const expected = '<sometag>name1</sometag>\n<anothertag>name2</anothertag>';

const options = {
  mode: 'development',
  entry: path.resolve(__dirname, './fixtures/input.txt'),
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, './output'),
    filename: 'output.txt',
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.txt$/,
        loader: require.resolve('../index.js'),
      },
    ],
  },
};

test.cb((t) => {
  config({
    path: path.resolve(__dirname, './fixtures/.test.env'),
  });

  webpack(options, function onCompilationFinished(err, stats) {
    if (err) {
      return t.end(err);
    }

    if (stats.hasErrors()) {
      return t.end(stats.compilation.errors[0]);
    }

    if (stats.hasWarnings()) {
      return t.end(stats.compilation.warnings[0]);
    }

    const result = require(path.resolve(__dirname, './output/output.txt'));
    t.is(result, expected, 'Output has replaced variables');

    t.end();
  });
})
