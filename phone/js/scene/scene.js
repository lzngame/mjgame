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
		loadingline: null,
		inputtxt: null,

		constructor: function(properties) {
			LoadScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
		},
		active: function(data) {
			console.log('%s active:', this.name);
			var obj = this;
			this.addTo(game.stage);
			this.startLoadQueue();

			new Hilo.Bitmap({
				image: 'img/bg01.png',
				width: game.stage.width,
				height: game.stage.height,
			}).addTo(this);
			this.loadtxt = new Hilo.Text({
				font: '20px 黑体',
				text: 'loading...',
				color: '#FFFFFF',
				x: game.stage.width / 2 - 40,
				y: game.stage.height / 2 + 5,
			}).addTo(this);
			this.loadingline = new Hilo.Container({
				height: 18,
				width: 180,
				y: game.stage.height / 2 + 10 + 14,
				x: game.stage.width / 2 - 47,
			}).addTo(this);
			new Hilo.Bitmap({
				image: 'img/pipcoin.png',
				y: 5,
				x: this.loadingline.width / 2 - 218 / 2 - 2,
			}).addTo(this.loadingline);

			var sumtime = 0;
			this.startTxtBtn = new Hilo.Bitmap({
				image: 'img/txt_start.png',
				y: game.stage.height / 2 + 10,
				x: game.stage.width / 2 - 210 / 2 + 40,
				visible: false,
				onUpdate: function(e) {
					if(!obj.isflash)
						return;
					if(sumtime < 600) {
						this.alpha = 0.8;
					} else {
						this.alpha = 0.1;
					}
					sumtime += game.clock.fpstick;
					if(sumtime >= 600 * 2) {
						sumtime = 0;
					}
				},
			}).addTo(this);
			new Hilo.Text({
				text: '福州麻将.2017~2019',
				color: '#FFF200',
				x: game.stage.width - 200,
				y: game.stage.height - 22,
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
				x: game.stage.width / 2 - 100,
				y: game.stage.height / 2 - 32 + 10,
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
				if(this._loaded % m == 0) {
					self.addLoadCoin();
				}
				console.log(this._loaded / total);
				console.log(game.loadqueue.getLoaded()/game.loadqueue.getTotal());
			});
			game.loadqueue.on('complete', function(e) {
				console.log('end');
				self.loadingline.removeFromParent();
				self.loadtxt.removeFromParent();
				self.startTxtBtn.visible = true;
				self.isflash = true;

				game.loadqueue.off('complete');
				game.loadqueue.off('load');
				
				game.mjdata.init();

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
			for(var i = 0; i < 10; i++) {
				new Hilo.Bitmap({
					image: 'img/coin_01.png',
					x: i * 18,
					alpha: 0.2
				}).addTo(this.loadingline);
			}
		},
		addLoadCoin: function(e) {
			var self = this;
			new Hilo.Bitmap({
				image: 'img/coin_01.png',
				x: 18 * this.coinInitXpos,
			}).addTo(this.loadingline);
			this.coinInitXpos++;
		},
	});

	var WeixinLoginScene = ns.WeixinLoginScene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.weixinlogin,
		items: null,

		constructor: function(properties) {
			WeixinLoginScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
			this.width = game.configdata.mainStageSize.width;
			this.height = game.configdata.mainStageSize.height;
			this.y = -this.height;
			this.x = game.stage.width / 2 - this.width / 2;
			this.items = {};
		},

		active: function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.alpha = 1;
			this.initBg('loginbg');

			Hilo.Tween.to(this, {
				y: game.stage.height / 2 - this.height / 2
			}, {
				duration: 800,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {

				}
			});

			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[0], game.stage.width, game.stage.height, 1, this);
			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[1], game.stage.width, game.stage.height, 1, this);

			var self = this;
			this.items['id_weixinlogin_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('switch main scene');
				var t = self.items['id_agreeweixinlogin_selectbox'];
				if(t.isSelected){
					game.switchScene(game.configdata.SCENE_NAMES.main);
				}else{
					self.createPointoutWindow([], 'login_9', '请同意用户协议').addTo(self);
				}
			});

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
					console.log('scenename:%s tween destory', scene.name);
					scene.destory();
				}
			});
		},
		destory: function() {
			console.log('%s destory', this.name);
			this.removeAllChildren();
			this.removeFromParent();
		},
		onUpdate: function() {

		},
	});

})(window.game);