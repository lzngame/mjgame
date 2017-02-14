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
				
				game.loadqueue.off('complete');
				game.loadqueue.off('load');
				
				game.switchScene(game.configdata.SCENE_NAMES.weixinlogin);
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
	
	var WeixinLoginScene = ns.WeixinLoginScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name: game.configdata.SCENE_NAMES.weixinlogin,
		items:null,
		
		constructor: function(properties) {
			WeixinLoginScene.superclass.constructor.call(this, properties);
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
		
		createPromptpanel:function(bgname,ismodal){
			var uidata_1 =[
				{
					itemid:'id_weixinlogin_exitbtn',
					itemtype:'btn',
					itemurlvalue:'login_13',
					btnup:'login_14',
					layouttype_x:'pct',
					alignx:'left_75',
					layouttype_y:'pct',
					aligny:'top_25'
				},
				{
					itemid:'id_1',
					itemtype:'bmp',
					itemurlvalue:'11',
					layouttype_x:'pct',
					alignx:'left_25',
					layouttype_y:'pct',
					aligny:'top_25'
				},
			];
			var panel = new Hilo.Container();
			if(ismodal){
				panel.modalmask = new Hilo.Bitmap({
					width:this.width,
					height:this.height,
					image:game.getImg('loginbg'),
					alpha:0.6,
				}).addTo(panel);
			}
			var rect = game.configdata.getPngRect(bgname,'bg');
			var panelwidth = rect[2];
			var panelheight = rect[3];
			panel.bg = game.configdata.creatRectImg('bg',bgname,0,0,game.scalefact).addTo(panel);
			panel.items = {};
			game.layoutUi.drawStepLine(panelwidth,panelheight,panel,game.scalefact);
			game.layoutUi.layoutPanelData(uidata_1,panelwidth,panelheight,game.scalefact,'ui',panel);
			
			var p = panel;
			panel.items['id_weixinlogin_exitbtn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('close');
				console.log(self.items);
				p.removeFromParent();
			});
			return panel;
		},
		
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.alpha = 1;
			var img = game.getImg('ui');
			
			var bg = new Hilo.Bitmap({
				width:this.width,
				height:this.height,
				image:game.getImg('loginbg'),
			}).addTo(this);
			
			Hilo.Tween.to(this, {
				y: game.screenHeight/2 - this.height/2
			}, {
				duration: 800,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {
					
				}
			});
			
			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[0],game.screenWidth,game.screenHeight,1,'bg',this);
			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[1],game.screenWidth,game.screenHeight,1,'ui',this);
			game.layoutUi.layoutPanelData(game.configdata.testuidata,game.screenWidth,game.screenHeight,1,'ui',this);
			
			var self = this;
			this.items['id_weixinlogin_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('button handler');
				var prompt = self.createPromptpanel('login_bg36',false);
				prompt.addTo(self);
				//game.switchScene(game.configdata.SCENE_NAMES.main);
			});
			game.layoutUi.drawStepLine(game.screenWidth,game.screenHeight,this);
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
	
	
	var MainScene = ns.MainScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name: game.configdata.SCENE_NAMES.main,
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
		
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.alpha = 1;
			var img = game.getImg('ui');
			
			var bg = new Hilo.Bitmap({
				width:this.width,
				height:this.height,
				image:game.getImg('loginbg'),
			}).addTo(this);
			
			Hilo.Tween.to(this, {
				y: game.screenHeight/2 - this.height/2
			}, {
				duration: 800,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {
					
				}
			});
			
			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[0],game.screenWidth,game.screenHeight,1,'bg',this);
			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[1],game.screenWidth,game.screenHeight,1,'ui',this);
			
			
			game.layoutUi.drawStepLine(game.screenWidth,game.screenHeight,this);
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