// import from node_modules/ & convert from commonjs to es6
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// bundle all dependencies
export default {
  input: './src/app.js',
  output: {
    file: 'dist/app.js',
    format: 'iife',
  },
  plugins: [resolve(), commonjs()],
};
