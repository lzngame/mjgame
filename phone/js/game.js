(function() {
	
	window.onload = function() {
		game.init();
		
	};
	
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
        if (window.orientation === 180 || window.orientation === 0) { 
            alert('竖屏状态！');
        } 
        if (window.orientation === 90 || window.orientation === -90 ){ 
            //alert('横屏状态！');
            history.go(0);
        }  
    }, false); 
	var game = window.game = {
		self: this,
		canvas: null,
		screenW: 0,
		screenH: 0,
		loadqueue: null,
		isLoadfinished: false,
		isPause: false,
		stage: null,
		ticker: null,
		canvas: null,
		clock: null,
		previousScene: null,
		currentScene: null,
		scenes: null,
		loadingimg: null,
		log: null,
		gamestart: false,
		winWidth:0,
		winHeight:0,
		scalefact:1,
		
		
		init: function() {
			var browserInfo = Hilo.browser;
			var winWidth = window.innerWidth || document.documentElement.clientWidth;
			var winHeight = window.innerHeight || document.documentElement.clientHeight;
			this.screenWidth = winWidth;
			this.screenHeight = winHeight;
			if (this.screenWidth > game.configdata.MAXSIZE.maxWidth)
				this.screenWidth = game.configdata.MAXSIZE.maxWidth;
			if (this.screenHeight > game.configdata.MAXSIZE.maxHeight)
				this.screenHeight = game.configdata.MAXSIZE.maxHeight;
			var scalex = this.screenWidth/game.configdata.MAXSIZE.maxWidth;
			var scaley = this.screenHeight/game.configdata.MAXSIZE.maxHeight;
			this.scalefact = scalex;
			if(scalex > scaley)
				this.scalefact = scaley;
			
			this.refresh();
			this.switchScene(game.configdata.SCENE_NAMES.load);
			console.log('The screen orientation:%ss',window.orientation);
		},
		refresh: function() {
			console.log('game init :window had loaded');
			console.log('screen size:(%d,%d)', this.screenWidth, this.screenHeight);
			this.loadqueue = new Hilo.LoadQueue();
			this.initstage();
			this.initEvent();
			this.initScene();
		},
		
		initstage: function() {
			console.log('game init');
			var gameContainer = document.getElementById("game-container");
			
			/*gameContainer.style.width = this.screenWidth + 'px';
			gameContainer.style.height = this.screenHeight + 'px';
			gameContainer.style.background = 'red';*/
			
			this.initcanvas(this.screenWidth, this.screenHeight);
			this.stage = new Hilo.Stage({
				renderType: 'canvas',
				container: gameContainer,
				canvas: this.canvas,
				width: this.screenWidth,
				height: this.screenHeight,
				background: game.configdata.BGCOLOR,
			});
			game.configdata.mainStageSize.width = this.stage.width;
			game.configdata.mainStageSize.height = this.stage.height;
			this.ticker = new Hilo.Ticker(game.configdata.FPS);
			this.ticker.addTick(game.clock);
			this.ticker.addTick(this.stage);
			this.ticker.addTick(Hilo.Tween);
			this.ticker.start();
			
		},
		initEvent: function() {
			this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
			this.stage.enableDOMEvent(Hilo.event.POINTER_MOVE, true);
			this.stage.enableDOMEvent(Hilo.event.POINTER_END, true);
			
		},
		initcanvas: function(w, h) {
			var canvas = document.getElementById(game.configdata.CANVASID);
			canvas.width = w;
			canvas.height = h;
			this.canvas = canvas;
		},
		switchScene: function(scenename, data) {
			if (this.currentScene != null) {
				this.currentScene.deactive();
				this.previousScene = this.currentScene;
			}
			this.currentScene = this.scenes[scenename];
			this.currentScene.active(data);
			//addfps(10,210,this.currentScene);
		},
		initScene: function() {
			this.scenes = {};
			this.scenes[game.configdata.SCENE_NAMES.load]         = new game.LoadScene();
			this.scenes[game.configdata.SCENE_NAMES.weixinlogin]  = new game.WeixinLoginScene();
			this.scenes[game.configdata.SCENE_NAMES.main]  = new game.MainScene();
		},
		getImg: function(id) {
			var img = this.loadqueue.getContent(id);
			return img;
		},
		
		sendMsg:function(sendObj,inceptObj,msgtype,msgdata){
			if(inceptObj){
				if(inceptObj.executeMsg){
					inceptObj.executeMsg(sendObj,msgtype,msgdata);
				}else{
					console.log('消息接收方无处理函数');
				}
			}else{
				console.log('无消息接收方');
			}
		},
		
		pauseGame: function(ispause) {
			ispause ? this.ticker.pause() : this.ticker.resume();
		},
		checkInRect:function(x,y,x1,y1,w1,h1){
			if(x > x1 && x < x1+w1 && y > y1 && y <y1+h1){
				return true;
			}else{
				return false;
			}
		},
		checkTwoBox:function(x1,y1,w1,h1,x2,y2,w2,h2){
			if (x1 >= x2 && x1 >= x2 + w2) {  
            	return false;  
        	} else if (x1 <= x2 && x1 + w1 <= x2) {  
            	return false;  
        	} else if (y1 >= y2 && y1 >= y2 + h2) {  
            	return false;  
        	} else if (y1 <= y2 && y1 + h1 <= y2) {  
            	return false;  
        	}  
        	return true;  
		},
		delIndexData:function(targetArray,indexItem){
			var index = targetArray.indexOf(indexItem);
			if(index != -1){
				targetArray.splice(index,1);
				return true;
			}else{
				return false;
			}
		}
	};
})();