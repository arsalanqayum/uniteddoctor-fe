// plugins/vue2-google-maps.js

import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBMAfJ2zK8u3tv30DlEAEjxf_DteKQPv-o',
    libraries: 'places', // Add additional libraries if needed
  },
});
