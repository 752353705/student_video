(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/publish/publishNotice"],{"0561":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={data:function(){return{TImg:"",change:!1,oldItem:"",images:[],imgArr:[],oldImgArr:[],chooseImg:!1,num:0,count:0,uploader:"",videos:[],showCir:!1,percent:0,title:"",areaVal:""}},onLoad:function(t){console.log("上传文章的界面  option",t),t.txtid&&(this.change=!0,this.getTxtDetail(t.txtid))},onHide:function(){},onReady:function(){},methods:{getNtImg:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(o){console.log("选择的图片",o),o.tempFiles.forEach((function(e,o){e.size>1048576&&t.showToast({title:"封面图片大小超过1m,请重新选择",icon:"none"})})),o.tempFilePaths.forEach((function(t){e.TImg=t}))}})},getTxtDetail:function(t){var e=this;this.api._get("article/".concat(t),{},(function(t){console.log("获取文章的详情",t),e.TImg=t.data.coverUrl,e.oldItem=t.data,e.title=t.data.title,e.areaVal=t.data.content,t.data.images.split(",").forEach((function(t,o){e.images.push({url:t})})),e.oldImgArr=t.data.images.split(",")}))},titInput:function(t){this.title=t.detail.value},areaInput:function(t){this.areaVal=t.detail.value},pushImg:function(){this.imgArr=[].concat(this.oldImgArr),this.num=0,console.log("上传图片");var e=this;t.showLoading({title:"正在上传.."}),this.images.forEach((function(o){console.log("上传图片的url",o.url,o.url.substr(0,10)),t.uploadFile({url:e.api.api_root+"picture/upload",filePath:o.url,name:"file",header:{"Content-Type":"multipart/form-data"},success:function(t){200==t.statusCode?(console.log("文件上传成功",t),console.log("向imgArr 添加图片"),e.imgArr.push(JSON.parse(t.data).data),e.num++,e.num!=e.images.length&&e.imgArr.length!=e.images.length||(console.log("所有图片上传完毕"),e.pushAll())):console.log("res ==》",t)}})}))},pushAll:function(){var e=this;0!==this.images.length&&0!==this.title.length&&0!==this.areaVal.length?(console.log("用户进行上传操作"),this.api._post("article",{coverUrl:e.TImg||e.imgArr[0],content:e.areaVal,title:e.title,images:e.imgArr.join(",")},(function(e){console.log(e),t.hideLoading(),t.showToast({title:"上传"+e.errmsg,icon:"none",success:function(){t.navigateTo({url:"/pages/playVideo/txtDetail?txtId=".concat(e.data)})}})}))):t.showToast({title:"请填写完整之后上传",icon:"none"})},detailImg:function(e){console.log("预览图片");var o=[];1==e?o.push(this.TImg):this.images.forEach((function(t){o.push(t.url)})),t.previewImage({urls:o,indicator:"number",loop:!0})},clear:function(t,e){1==t?this.TImg="":(console.log("删除当前作品"),this.$emit("clear"),console.log("当前作品列表 ==》",this.images),this.images.splice(e,1),this.imgArr.splice(e,1),this.change&&this.oldImgArr.splice(e,1),this.num=this.num-1,this.count=this.images.length,console.log("删除操作之后的作品列表 ==》",this.images))},getImg:function(){var e=this,o=e.count;t.chooseImage({count:6-o,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(o){e.chooseImg=!0;var n=o.tempFilePaths.length;e.count+=n,console.log("选择的图片",o),o.tempFiles.forEach((function(e,o){e.size>1048576&&t.showToast({title:"第"+o+"张图片大小超过1m,请重新选择",icon:"none"})})),o.tempFilePaths.forEach((function(t){e.images=e.images.concat({url:t})}))}})}}};e.default=o}).call(this,o("543d")["default"])},"5ca8":function(t,e,o){"use strict";o.r(e);var n=o("d768"),i=o("a916");for(var a in i)"default"!==a&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("9f01");var s,c=o("f0c5"),l=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"5d6c306d",null,!1,n["a"],s);e["default"]=l.exports},"5f17":function(t,e,o){"use strict";(function(t){o("21be");n(o("66fd"));var e=n(o("5ca8"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"8b46":function(t,e,o){},"9f01":function(t,e,o){"use strict";var n=o("8b46"),i=o.n(n);i.a},a916:function(t,e,o){"use strict";o.r(e);var n=o("0561"),i=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},d768:function(t,e,o){"use strict";var n,i=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}))}},[["5f17","common/runtime","common/vendor"]]]);