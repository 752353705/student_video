(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/publish/publishNotice"],{"0561":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={data:function(){return{topic:"",value:"",game_type:"",subjectId:"",TImg:"",change:!1,oldItem:"",images:[],imgArr:[],oldImgArr:[],chooseImg:!1,num:0,count:0,nowCount:1,uploader:"",videos:[],btn_statue:!1,percent:0,title:"",areaVal:""}},onLoad:function(t){var e=this;console.log("上传文章的界面  option",t),this.api._get("subject/onGoing",{subjectTypeId:"",pageNum:1,pageSize:10},(function(t){console.log("请求大赛类型",t),e.game_type=t.data.list})),t.txtid&&(this.change=!0,this.getTxtDetail(t.txtid))},onShow:function(){console.log("页面显示"),this.btn_statue=!1,this.topic=JSON.parse(t.getStorageSync("gameMsg")).subjectTitle,this.subjectId=JSON.parse(t.getStorageSync("gameMsg")).subjectId},methods:{bindPickerChange:function(t){console.log("picker发送选择改变，携带值为",t),this.value=t.detail.value,this.topic=this.game_type[t.detail.value].subjectTitle,this.subjectId=this.game_type[t.detail.value].subjectId},getTxtDetail:function(t){var e=this;this.api._get("article/".concat(t),{},(function(t){console.log("获取文章的详情",t),e.TImg=t.data.coverUrl,e.oldItem=t.data,e.title=t.data.title,e.areaVal=t.data.content,t.data.images.split(",").forEach((function(t,i){e.images.push({url:t})})),e.oldImgArr=t.data.images.split(",")}))},titInput:function(t){this.title=t.detail.value},areaInput:function(t){this.areaVal=t.detail.value},pushImg:function(){if(0!=this.images.length&&0!=this.title.length&&0!=this.areaVal.length&&this.topic){this.btn_statue=!0,this.imgArr=[].concat(this.oldImgArr),this.num=0,console.log("上传图片");var e=this;t.showLoading({title:"正在发布.."}),this.images.forEach((function(i){console.log("上传图片的url",i.url,i.url.substr(0,10)),t.uploadFile({url:e.api.api_root+"picture/upload",filePath:i.url,name:"file",header:{"Content-Type":"multipart/form-data"},success:function(i){if(200==i.statusCode){console.log("文件上传成功",i);var o=JSON.parse(i.data);if(500==o.errno)return t.hideLoading(),e.btn_statue=!1,t.showModal({title:"图片信息不合法，请重新选择"});console.log("向imgArr 添加图片"),e.imgArr.push(JSON.parse(i.data).data),e.num++,e.num!=e.images.length&&e.imgArr.length!=e.images.length||(console.log("所有图片上传完毕"),e.pushAll())}else console.log("res ==》",i)}})}))}else t.showToast({title:"请填写完整之后上传",icon:"none"})},pushAll:function(){var e=this;this.api._post("article",{coverUrl:e.TImg||e.imgArr[0],content:e.areaVal,title:e.title,images:e.imgArr.join(","),subjectId:e.subjectId},(function(i){console.log(i),t.hideLoading(),t.showToast({title:"发布"+i.errmsg,icon:"none",success:function(){t.switchTab({url:"/pages/my/my"})}}),e.areaVal="",e.count=0,e.title="",e.topic="",e.images=[],e.imgArr=[],e.btn_statue=!1}),(function(i){console.log(i),t.hideLoading(),e.btn_statue=!1,t.showToast({title:"发布失败",icon:"none"})}))},detailImg:function(e){console.log("预览图片");var i=[];1==e?i.push(this.TImg):this.images.forEach((function(t){i.push(t.url)})),t.previewImage({urls:i,indicator:"number",loop:!0})},clear:function(t,e){1==t?this.TImg="":(console.log("删除当前作品"),this.$emit("clear"),console.log("当前作品列表 ==》",this.images),this.images.splice(e,1),this.imgArr.splice(e,1),this.change&&this.oldImgArr.splice(e,1),this.num=this.num-1,this.count=this.images.length,console.log("删除操作之后的作品列表 ==》",this.images))},getImg:function(){var e=this;t.chooseImage({count:e.nowCount-e.count,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(i){e.chooseImg=!0;var o=i.tempFilePaths.length;e.count+=o,console.log("选择的图片",i),i.tempFiles.forEach((function(e,i){e.size>1048576&&t.showToast({title:"第"+i+"张图片大小超过1m,请重新选择",icon:"none"})})),i.tempFilePaths.forEach((function(t){e.images=e.images.concat({url:t})}))}})}}};e.default=i}).call(this,i("543d")["default"])},3564:function(t,e,i){},"5ca8":function(t,e,i){"use strict";i.r(e);var o=i("6a96"),n=i("a916");for(var a in n)"default"!==a&&function(t){i.d(e,t,(function(){return n[t]}))}(a);i("bcb1");var s,l=i("f0c5"),c=Object(l["a"])(n["default"],o["b"],o["c"],!1,null,"2312c6e8",null,!1,o["a"],s);e["default"]=c.exports},"5f17":function(t,e,i){"use strict";(function(t){i("21be");o(i("66fd"));var e=o(i("5ca8"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},"6a96":function(t,e,i){"use strict";var o,n=function(){var t=this,e=t.$createElement;t._self._c},a=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return o}))},a916:function(t,e,i){"use strict";i.r(e);var o=i("0561"),n=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);e["default"]=n.a},bcb1:function(t,e,i){"use strict";var o=i("3564"),n=i.n(o);n.a}},[["5f17","common/runtime","common/vendor"]]]);