(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{733:function(t,r,e){"use strict";e.d(r,"a",(function(){return c})),e.d(r,"b",(function(){return d})),e.d(r,"c",(function(){return l})),e.d(r,"d",(function(){return v}));var o=e(743),n=e(0),c=Object(n.j)("v-card__actions"),d=Object(n.j)("v-card__subtitle"),l=Object(n.j)("v-card__text"),v=Object(n.j)("v-card__title");o.a},741:function(t,r,e){var content=e(742);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(13).default)("61d1dd60",content,!0,{sourceMap:!1})},742:function(t,r,e){var o=e(12)((function(i){return i[1]}));o.push([t.i,'.theme--light.v-card{background-color:#fff;color:rgba(0,0,0,.87)}.theme--light.v-card>.v-card__subtitle,.theme--light.v-card>.v-card__text{color:rgba(0,0,0,.6)}.theme--dark.v-card{background-color:#1e1e1e;color:#fff}.theme--dark.v-card>.v-card__subtitle,.theme--dark.v-card>.v-card__text{color:hsla(0,0%,100%,.7)}.v-sheet.v-card{border-radius:4px}.v-sheet.v-card:not(.v-sheet--outlined){box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.v-sheet.v-card.v-sheet--shaped{border-radius:16px 4px}.v-card{border-width:thin;display:block;max-width:100%;outline:none;-webkit-text-decoration:none;text-decoration:none;transition-property:box-shadow,opacity;word-wrap:break-word;position:relative;white-space:normal}.v-card>.v-card__progress+:not(.v-btn):not(.v-chip):not(.v-avatar),.v-card>:first-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-top-left-radius:inherit;border-top-right-radius:inherit}.v-card>:last-child:not(.v-btn):not(.v-chip):not(.v-avatar){border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.v-card__progress{left:0;overflow:hidden;right:0;top:0}.v-card__subtitle+.v-card__text{padding-top:0}.v-card__subtitle,.v-card__text{font-size:.875rem;font-weight:400;letter-spacing:.0071428571em;line-height:1.375rem}.v-card__subtitle,.v-card__text,.v-card__title{padding:16px}.v-card__title{align-items:center;display:flex;flex-wrap:wrap;font-size:1.25rem;font-weight:500;letter-spacing:.0125em;line-height:2rem;word-break:break-all}.v-card__title+.v-card__subtitle,.v-card__title+.v-card__text{padding-top:0}.v-card__title+.v-card__subtitle{margin-top:-16px}.v-card__text{width:100%}.v-card__actions{align-items:center;display:flex;padding:8px}.v-card__actions>.v-btn.v-btn{padding:0 8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn+.v-btn{margin-left:8px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--left{margin-left:4px}.v-application--is-ltr .v-card__actions>.v-btn.v-btn .v-icon--right{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn+.v-btn{margin-right:8px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--left{margin-right:4px}.v-application--is-rtl .v-card__actions>.v-btn.v-btn .v-icon--right{margin-left:4px}.v-card--flat{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12)!important}.v-sheet.v-card--hover{cursor:pointer;transition:box-shadow .4s cubic-bezier(.25,.8,.25,1)}.v-sheet.v-card--hover:focus,.v-sheet.v-card--hover:hover{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.v-card--link,.v-card--link .v-chip{cursor:pointer}.v-card--link:focus:before{opacity:.08}.v-card--link:before{background:currentColor;bottom:0;content:"";left:0;opacity:0;pointer-events:none;position:absolute;right:0;top:0;transition:opacity .2s}.v-card--disabled{pointer-events:none;-webkit-user-select:none;-moz-user-select:none;user-select:none}.v-card--disabled>:not(.v-card__progress){opacity:.6;transition:inherit}.v-card--loading{overflow:hidden}.v-card--raised{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}',""]),o.locals={},t.exports=o},743:function(t,r,e){"use strict";e(8),e(9),e(15),e(16),e(11),e(4),e(10);var o=e(2),n=(e(174),e(175),e(21),e(741),e(295)),c=e(296),d=e(109),l=e(6);function v(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,o)}return e}function h(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?v(Object(e),!0).forEach((function(r){Object(o.a)(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):v(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}r.a=Object(l.a)(c.a,d.a,n.a).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return h(h({"v-card":!0},d.a.options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},n.a.options.computed.classes.call(this))},styles:function(){var style=h({},n.a.options.computed.styles.call(this));return this.img&&(style.background='url("'.concat(this.img,'") center center / cover no-repeat')),style}},methods:{genProgress:function(){var t=c.a.options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var r=this.generateRouteLink(),e=r.tag,data=r.data;return data.style=this.styles,this.isClickable&&(data.attrs=data.attrs||{},data.attrs.tabindex=0),t(e,this.setBackgroundColor(this.color,data),[this.genProgress(),this.$slots.default])}})},843:function(t,r,e){var content=e(889);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(13).default)("756024fc",content,!0,{sourceMap:!1})},888:function(t,r,e){"use strict";e(843)},889:function(t,r,e){var o=e(12)((function(i){return i[1]}));o.push([t.i,".doctor-education[data-v-23481e77]{background:linear-gradient(90deg,#64b5f6,#1976d2);border-radius:10px}.sub-info[data-v-23481e77]{color:#fff}",""]),o.locals={},t.exports=o},993:function(t,r,e){"use strict";e.r(r);var o=e(743),n=e(733),c=e(711),d=e(168),l=e(262),v=e(169),h=e(31),_=e(145),f={data:function(){return{doctorEducations:[{degree:"Doctor of Medicine (MD)",institution:"University of Medicine",graduationYear:"2021"},{degree:"Bachelor of Science in Biology",institution:"State University",graduationYear:"2017"}]}},mounted:function(){var t=this;this.$axios.get("education").then((function(r){t.doctorEducations=r.data.data}))}},x=(e(888),e(20)),component=Object(x.a)(f,(function(){var t=this,r=t._self._c;return r(o.a,{staticClass:"doctor-education",attrs:{outlined:""}},[r(n.d,{staticClass:"headline"},[t._v("Doctor Education")]),t._v(" "),r(c.a),t._v(" "),r(l.a,{attrs:{dense:""}},t._l(t.doctorEducations,(function(e,o){return r("div",{key:o},[[r(v.a,[r(_.a,[r(d.a,{attrs:{color:"primary"}},[t._v("mdi-school")])],1),t._v(" "),r(h.a,[r(h.c,[t._v(t._s(e.degree))]),t._v(" "),r(h.b,{staticClass:"sub-info"},[r("span",[t._v(t._s(e.institution))]),t._v(" "),r("span",[t._v(t._s(e.graduationYear))])])],1)],1),t._v(" "),o<t.doctorEducations.length-1?r(c.a):t._e()]],2)})),0)],1)}),[],!1,null,"23481e77",null);r.default=component.exports}}]);