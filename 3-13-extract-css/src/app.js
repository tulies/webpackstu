import base from './css/base.css'
console.log('11111111111111');

console.log(base);
console.log('11111111111111');

import(/* webpackChunkName:'a' */ './components/a').then(function(){
    console.log(a);
});