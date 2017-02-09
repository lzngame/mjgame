(function(ns) {
	var LoadScene = ns.LoadScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name: game.configdata.SCENE_NAMES.load,
		coinInitXpos: 0,
		coinInitYpos: 0,
		totalLoadTaskNum: 0,
		currentLoadTaskIndex: 0,
		startTxtBtn: null,
		loadtxt: null,
		isflash: false,
		loadingline:null,
		inputtxt:null,

		
		constructor: function(properties) {
			LoadScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
		},
		active: function(data){
			console.log('%s active:', this.name);
			var obj = this;
			this.addTo(game.stage);
			this.startLoadQueue();

			new Hilo.Bitmap({
				image: 'img/bg01.png',
				width: game.screenWidth,
				height: game.screenHeight
			}).addTo(this);
			this.loadtxt = new Hilo.Text({
				text: 'loading...',
				color: '#FFFFFF',
				x: game.screenWidth / 2 - 40,
				y: game.screenHeight / 2 + 5,
			}).addTo(this);
			this.loadingline = new Hilo.Container({
				height:18,
				width:180,
				y: game.screenHeight / 2 + 10 + 14,
				x: game.screenWidth / 2 - 47,
			}).addTo(this);
			new Hilo.Bitmap({
				image: 'img/pipcoin.png',
				y:5,
				x:this.loadingline.width/2 - 218/2-2,
			}).addTo(this.loadingline);
			
			/*new Hilo.Bitmap({
				image: 'img/loadtitle2.png',
				y: game.screenHeight / 2 - 140,
				x: game.screenWidth / 2 - 240 / 2,
			}).addTo(this);*/
			
			var sumtime = 0;
			this.startTxtBtn = new Hilo.Bitmap({
				image: 'img/txt_start.png',
				y: game.screenHeight / 2 + 10,
				x: game.screenWidth / 2 - 210 / 2 + 40,
				visible:false,
				onUpdate: function(e) {
					if (!obj.isflash)
						return;
					if (sumtime < 600) {
						this.alpha = 0.8;
					} else {
						this.alpha = 0.1;
					}
					sumtime += game.clock.fpstick;
					if (sumtime >= 600 * 2) {
						sumtime = 0;
					}
				},
			}).addTo(this);
			new Hilo.Text({
				text: '福州麻将.2017~2019',
				color: '#FFF200',
				x: game.screenWidth - 200,
				y: game.screenHeight - 22,
			}).addTo(this);
			var atlas = new Hilo.TextureAtlas({
				image: 'img/fire7.png',
				width: 256,
				height: 64,
				frames: {
					frameWidth: 32,
					frameHeight: 64,
					numFrames: 8
				},
				sprites: {
					fish: {
						from: 0,
						to: 7
					}
				}
			});

			var fire = new Hilo.Sprite({
				frames: atlas.getSprite('fish'),
				x: game.screenWidth / 2 - 100,
				y: game.screenHeight / 2 - 32 + 10,
				interval: 6,
				timeBased: false,
				loop: true,
			}).addTo(this);
			this.addLoadCoinbg();
		},
		deactive: function() {
			this.destory();
		},
		destory: function() {
			console.log('%s destory', this.name);
			this.removeAllChildren();
			this.removeFromParent();
		},
		startLoadQueue: function() {
			var list = this.getDownloadList(game.loaddata.DOWNLOADLIST_PNGS, 'loadimgs');
			var total = list.length;
			var m = Math.floor(list.length / 10);
			var self = this;
			game.loadqueue.add(list);
			game.loadqueue.on('load', function(e) {
				self.loadtxt.text = 'Loading... %' + (Math.floor(this._loaded / total * 100)).toString();
				if (this._loaded % m == 0) {
					self.addLoadCoin();
				}
			});
			game.loadqueue.on('complete', function(e) {
				console.log('end');
				self.loadingline.removeFromParent();
				self.loadtxt.removeFromParent();
				self.startTxtBtn.visible = true;
				self.isflash = true;
				self.on(Hilo.event.POINTER_START, function(e) {
					game.switchScene(game.configdata.SCENE_NAMES.main);
				});
				game.loadqueue.off('complete');
				game.loadqueue.off('load');
				
				game.monsterdata.initAtlas();
				
				game.switchScene(game.configdata.SCENE_NAMES.main);
			});
			game.loadqueue.start();
		},
		getDownloadList: function(files, specific) {
			return _.map(files, function(item) {
				return {
					id: item.split('.')[0],
					src: game.configdata.RESOURCE_BASEDIR + '/' + specific + '/' + item
				};
			});
		},
		addLoadCoinbg: function(e) {
			var self = this;
			for(var i=0;i<10;i++){
				new Hilo.Bitmap({
					image: 'img/coin_01.png',
					x: i*18,
					alpha:0.2
				}).addTo(this.loadingline);
			}
		},
		addLoadCoin: function(e) {
			var self = this;
			new Hilo.Bitmap({
				image: 'img/coin_01.png',
				x:18*this.coinInitXpos,
			}).addTo(this.loadingline);
			this.coinInitXpos++;
		},
	});

	var MainScene = ns.MainScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name: game.configdata.SCENE_NAMES.main,
		fingerMouse:null,
		btnpassCalamity:null,
		btnpassEcosystem:null,
		btnExit:null,
		items:null,
		
		constructor: function(properties) {
			MainScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
			this.width = game.configdata.mainStageSize.width;
			this.height = game.configdata.mainStageSize.height;
			this.y = -this.height;
			this.x = game.screenWidth/2 - this.width/2;
			this.items = {};
		},
		initTouchEvent:function(){
			var scene = this;
			game.stage.off();
			game.stage.on(Hilo.event.POINTER_MOVE, function(e) {
				
			});
		},
		
		layoutUiData:function(uidata){
			for(var i=0;i<uidata.length;i++){
				var itemdata = uidata[i];
				if(itemdata.itemtype === 'bmp'){
					var posxy = game.layoutUi.getItemPos(itemdata);
					var rect = game.configdata.getPngRect(itemdata.itemurlvalue,'uimap');
					var x = posxy[0];
					var y = posxy[1];
					var w = rect[2] * game.scalefact;
					var h = rect[3] * game.scalefact;
					this.items[itemdata.id] = game.configdata.creatRectImg('ui',itemdata.itemurlvalue,x,y,game.scalefact).addTo(this);
				}
			}
		},
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.initTouchEvent();
			this.alpha = 1;
			var img = game.getImg('ui');
			var bg = new Hilo.Bitmap({
				width:this.width,
				height:this.height,
				image:game.getImg('battlebg'),
			}).addTo(this);
			
			Hilo.Tween.to(this, {
				y: game.screenHeight/2 - this.height/2
			}, {
				duration: 800,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {
					game.previousScene.destory();
				}
			});
			this.layoutUiData(game.configdata.testuidata);
			//game.layoutUi.layoutUiData(game.configdata.testuidata);
			/*var self = this;
			var btn = game.configdata.createButton('login_10','login_11',30,120).addTo(this);
			btn.scaleX =  game.scalefact;
			btn.scaleY =  game.scalefact;
			btn.on(Hilo.event.POINTER_END, function(e) {
				console.log('button handler');
				console.log(self.items);
				self.items['testid_1'].x++;
			});
			game.configdata.createSelectbox('login_3','login_4',300,10).addTo(this);*/
			
			//this.initTouchEvent();
			this.drawStepLine();
			//this.drawLine(0,0,game.screenWidth,game.screenHeight);
		},
		drawStepLine:function(){
			var w = game.screenWidth/4;
			var h = game.screenHeight/4;
			for(var i=0;i<16;i++){
				var x = i%4 * game.screenWidth/4;
				var y = Math.floor(i/4) * game.screenHeight/4;
				this.drawLine(x,y,w,h);
			}
		},
		drawLine:function(initx,inity,w,h){
			for(var i=0;i<4;i++){
				game.drawdata.drawItemRect(1,'white','rgba(0,0,0,0)',initx+i%2 * w/2,inity+Math.floor(i/2)*h/2,w/2,h/2,this);
			}
		},
		deactive: function() {
			var scene = this;
			game.sounds.stop(20);
			Hilo.Tween.to(this, {
					y: -this.height,
				}, {
					duration: 500,
					ease: Hilo.Ease.Back.EaseIn,
					onComplete: function() {
						console.log('main scene destory');
						scene.destory();
					}
				});
		},
		destory: function() {
			console.log('%s destory', this.name);
			this.removeAllChildren();
			this.removeFromParent();
		},
		onUpdate:function(){
			
		},
	});
})(window.game);