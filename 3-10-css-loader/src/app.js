import base from './css/base.css';
import index from './css/index.css';

console.log(index);
var styledom = document.getElementById('styledom');
styledom.innerHTML = '<div class="'+index.box+'"></div>'