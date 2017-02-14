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
					game.switchScene(game.configdata.SCENE_NAMES.weixinlogin);
				});
				game.loadqueue.off('complete');
				game.loadqueue.off('load');
				
				game.monsterdata.initAtlas();
				
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
	
	var WinXinloginScene = ns.WinXinloginScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name: game.configdata.SCENE_NAMES.main,
		items:null,
		
		constructor: function(properties) {
			WinXinloginScene.superclass.constructor.call(this, properties);
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
		
		layoutUiData:function(uidata,panelwidth,panelheight,imgsourcename){
			if(!imgsourcename){
				imgsourcename = 'ui';
			}
			var tmpposdic = {};
			for(var i=0;i<uidata.length;i++){
				var itemdata = uidata[i];
				var posxy = game.layoutUi.getItemPos(itemdata,panelwidth,panelheight,imgsourcename,tmpposdic);
				var rect = game.configdata.getPngRect(itemdata.itemurlvalue,imgsourcename);
				var x = posxy[0];
				var y = posxy[1];
				var w = rect[2] * game.scalefact;
				var h = rect[3] * game.scalefact;
				tmpposdic[itemdata.itemid] = [x,y,w,h];
				if(itemdata.itemtype === 'bmp'){ 
					this.items[itemdata.itemid] = game.configdata.creatRectImg(imgsourcename,itemdata.itemurlvalue,x,y,game.scalefact).addTo(this);
				}
				if(itemdata.itemtype === 'btn'){ 
					this.items[itemdata.itemid] = game.configdata.createButton(itemdata.itemurlvalue,itemdata.btnup,x,y).addTo(this);
				}
				if(itemdata.itemtype === 'selectbox'){ 
					this.items[itemdata.itemid] = game.configdata.createSelectbox(itemdata.itemurlvalue,itemdata.selectvalue,x,y).addTo(this);
				}
			}
		},
		layoutPanelData:function(uidata,panelwidth,panelheight,imgsourcename,theparent){
			if(!imgsourcename){
				imgsourcename = 'ui';
			}
			var tmpposdic = {};
			panelwidth = panelwidth * game.scalefact;
			panelheight = panelheight * game.scalefact;
			for(var i=0;i<uidata.length;i++){
				var itemdata = uidata[i];
				var posxy = game.layoutUi.getItemPos(itemdata,panelwidth,panelheight,tmpposdic);
				var rect = game.configdata.getPngRect(itemdata.itemurlvalue,imgsourcename);
				var x = posxy[0];
				var y = posxy[1];
				var w = rect[2] * game.scalefact;
				var h = rect[3] * game.scalefact;
				tmpposdic[itemdata.itemid] = [x,y,w,h];
				if(itemdata.itemtype === 'bmp'){ 
					theparent.items[itemdata.itemid] = game.configdata.creatRectImg(imgsourcename,itemdata.itemurlvalue,x,y,game.scalefact).addTo(theparent);
				}
				if(itemdata.itemtype === 'btn'){ 
					theparent.items[itemdata.itemid] = game.configdata.createButton(itemdata.itemurlvalue,itemdata.btnup,x,y).addTo(theparent);
				}
				if(itemdata.itemtype === 'selectbox'){ 
					theparent.items[itemdata.itemid] = game.configdata.createSelectbox(itemdata.itemurlvalue,itemdata.selectvalue,x,y).addTo(theparent);
				}
			}
		},
		createPromptpanel:function(){
			var testuidata =[
				{
					itemid:'id_promptpanel_bg',
					itemtype:'bmp',
					itemurlvalue:'login_bg36',
					layouttype_x:'txt',
					alignx:'left',
					layouttype_y:'txt',
					aligny:'top'
				},
			];
			var uidata_1 =[
				{
					itemid:'id_weixinlogin_btn',
					itemtype:'btn',
					itemurlvalue:'login_13',
					btnup:'login_14',
					layouttype_x:'txt',
					alignx:'right',
					layouttype_y:'txt',
					aligny:'top'
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
			panel.modalmask = new Hilo.Bitmap({
				width:this.width,
				height:this.height,
				image:game.getImg('loginbg'),
				alpha:0.3,
				//visible:false,
			}).addTo(panel);
			
			panel.items = {};
			this.layoutPanelData(testuidata,555,293,'bg',panel);
			this.drawStepLine(555,293,panel);
			this.layoutPanelData(uidata_1,555,293,'ui',panel);
			var p = panel;
			panel.items['id_weixinlogin_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('close');
				console.log(self.items);
				p.removeFromParent();
			});
			return panel;
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
				image:game.getImg('loginbg'),
			}).addTo(this);
			//var girl = game.configdata.creatRectImg('bg','login_girl',0,0,game.scalefact).addTo(this);
			
			Hilo.Tween.to(this, {
				y: game.screenHeight/2 - this.height/2
			}, {
				duration: 800,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {
					game.previousScene.destory();
				}
			});
			var testuidata =[
				{
					itemid:'id_weixinlogbg_girl_bmp',
					itemtype:'bmp',
					itemurlvalue:'login_girl',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'pct',
					aligny:'top_5'
				},];
			var testuidata2 = [
				{
					itemid:'id_weixinlogin_btn',
					itemtype:'btn',
					itemurlvalue:'login_10',
					btnup:'login_11',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_agreeweixinlogin_selectbox',
					itemtype:'selectbox',
					itemurlvalue:'login_bg48',
					selectvalue:'login_4',
					layouttype_x:'pct',
					alignx:'left_36',
					layouttype_y:'pct',
					aligny:'bottom_10'
				},
				{
					itemid:'id_weixinlogin_txt',
					itemtype:'bmp',
					itemurlvalue:'login_5',
					layouttype_x:'follow',
					alignx:'id_agreeweixinlogin_selectbox&45',
					layouttype_y:'follow',
					aligny:'id_agreeweixinlogin_selectbox&15'
				}
			];
			this.layoutUiData(testuidata,game.screenWidth,game.screenHeight,'bg');
			this.layoutUiData(testuidata2,game.screenWidth,game.screenHeight,'ui');

			//this.layoutUiData(game.configdata.testuidata,game.screenWidth,game.screenHeight,'ui');
			var self = this;
			this.items['id_weixinlogin_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('button handler');
				console.log(self.items);
				//self.items['id_weixinlogin_btn'].x++;
				var prompt = self.createPromptpanel();
				//prompt.alpha = 0.3;
				//prompt.y = 150;
				prompt.addTo(self);
				console.log(prompt);
			});

			//this.layoutUiData(game.configdata.testuidata,'ui');
			this.drawStepLine(game.screenWidth,game.screenHeight,this);
		},
		drawStepLine:function(panelwidth,panelheight,panel){
			var w = panelwidth/4;
			var h = panelheight/4;
			for(var i=0;i<16;i++){
				var x = i%4 * w;
				var y = Math.floor(i/4) * h;
				this.drawLine(x,y,w,h,panel);
			}
		},
		
		drawLine:function(initx,inity,w,h,panel){
			for(var i=0;i<4;i++){
				game.drawdata.drawItemRect(1,'white','rgba(0,0,0,0)',initx+i%2 * w/2,inity+Math.floor(i/2)*h/2,w/2,h/2,panel);
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
			//this.layoutUiData(game.configdata.testuidata);
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
			//this.drawStepLine();
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