(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{806:function(e,t,n){"use strict";n.r(t);var c=n(784),o=(n(30),n(302),n(66),n(42),n(4),n(828)),l={computed:{location:{get:function(){return this.$store.state.schedule.location},set:function(e){this.$store.commit("SET_LOCATION",e)}}},data:function(){return{search:null,isLoading:!1,selectedPlace:null,places:[]}},created:function(){this.debouncedFetchPlaces=Object(o.debounce)(this.fetchPlaces,300)},watch:{search:function(e){this.isLoading=!0,e&&e!==this.selectedPlace?this.debouncedFetchPlaces(e):this.isLoading=!1}},methods:{fetchPlaces:function(e){var t=this;this.$axios.get("/search-places?query=".concat(encodeURIComponent(e))).then((function(e){console.log(JSON.stringify(e.data.results)),t.places=e.data.results.map((function(e){return{id:e.place_id,name:e.name,address:e.formatted_address,rating:e.rating,latitude:e.geometry.location.lat,longitude:e.geometry.location.lng}}))})).catch((function(e){console.error("There was an error fetching the places:",e)})).finally((function(){t.isLoading=!1}))},onSelect:function(e){this.location=e}}},r=n(20),component=Object(r.a)(l,(function(){var e=this;return(0,e._self._c)(c.a,{attrs:{outlined:"",items:e.places,loading:e.isLoading,"search-input":e.search,"item-text":"name","item-value":"id",label:"Location","return-object":""},on:{"update:searchInput":function(t){e.search=t},"update:search-input":function(t){e.search=t},change:e.onSelect},model:{value:e.selectedPlace,callback:function(t){e.selectedPlace=t},expression:"selectedPlace"}})}),[],!1,null,null,null);t.default=component.exports}}]);