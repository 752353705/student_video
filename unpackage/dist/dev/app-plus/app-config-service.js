
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/list/list","pages/testVideo/testVideo","pages/index/index","pages/find/find","pages/cpt/cpt","pages/my/my","pages/reg/reg","pages/playVideo/playVideo","pages/login/login"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"大学生短视频","navigationBarBackgroundColor":"#0d0639","backgroundColor":"#F8F8F8"},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"student_video","compilerVersion":"2.7.9","entryPagePath":"pages/list/list","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/list/list","meta":{"isQuit":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"onReachBottomDistance":200}},{"path":"/pages/testVideo/testVideo","meta":{},"window":{}},{"path":"/pages/index/index","meta":{},"window":{"navigationBarTitleText":"大学生短视频"}},{"path":"/pages/find/find","meta":{},"window":{"navigationBarTitleText":"搜索作品","enablePullDownRefresh":true,"onReachBottomDistance":200}},{"path":"/pages/cpt/cpt","meta":{},"window":{"navigationBarTitleText":"合作赞助","enablePullDownRefresh":true,"onReachBottomDistance":200}},{"path":"/pages/my/my","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/reg/reg","meta":{},"window":{}},{"path":"/pages/playVideo/playVideo","meta":{},"window":{"navigationStyle":"custom","subNVues":[{"id":"gift","path":"pages/playVideo/gift.nvue","style":{"position":"absolute","bottom":"0","height":"350px"},"type":"popup"}]}},{"path":"/pages/login/login","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
