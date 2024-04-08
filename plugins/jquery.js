import Vue from 'vue';
import jQuery from 'jquery';

global.$ = jQuery;
Vue.prototype.$jQuery = jQuery; // Use this if you want to use jQuery inside Vue components
