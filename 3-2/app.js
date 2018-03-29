//在webpack中几种规范是可以混用的

//es module规范
import sum from './sum';
console.log('sum(1,2)',sum(1,2));

// commonjs 规范

var minux = require('./minux');
console.log('minux(5,4)',minux(5,4));



// amd规范
require(['./muti'],function(muti){
    console.log('muti(3,4)',muti(3,4));
});
