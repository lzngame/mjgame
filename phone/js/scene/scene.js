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
				width:game.stage.width,
				height:game.stage.height,
			}).addTo(this);
			this.loadtxt = new Hilo.Text({
				font:'20px 黑体',
				text: 'loading...',
				color: '#FFFFFF',
				x: game.stage.width / 2 - 40,
				y: game.stage.height / 2 + 5,
			}).addTo(this);
			this.loadingline = new Hilo.Container({
				height:18,
				width:180,
				y: game.stage.height / 2 + 10 + 14,
				x: game.stage.width / 2 - 47,
			}).addTo(this);
			new Hilo.Bitmap({
				image: 'img/pipcoin.png',
				y:5,
				x:this.loadingline.width/2 - 218/2-2,
			}).addTo(this.loadingline);
			
			var sumtime = 0;
			this.startTxtBtn = new Hilo.Bitmap({
				image: 'img/txt_start.png',
				y: game.stage.height / 2 + 10,
				x: game.stage.width / 2 - 210 / 2 + 40,
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
		Extends: game.BaseScene,
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
			this.x = game.stage.width/2 - this.width/2;
			this.items = {};
		},
		
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.alpha = 1;
			this.initBg('loginbg');
			
			Hilo.Tween.to(this, {
				y: game.stage.height/2 - this.height/2
			}, {
				duration: 800,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {
					
				}
			});
			
			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[0],game.stage.width,game.stage.height,1,this);
			game.layoutUi.layoutPanelData(game.sceneuidata.weixinlogin_uidata[1],game.stage.width,game.stage.height,1,this);
			
			var self = this;
			this.items['id_weixinlogin_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('switch main scene');
				game.switchScene(game.configdata.SCENE_NAMES.main);
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
						console.log('scenename:%s tween destory',scene.name);
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
		Extends: game.BaseScene,
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
			this.x = game.stage.width/2 - this.width/2;
			this.items = {};
		},
		executeMsg:function(sendobj,msgtype,msgdata){
			var self = this;
			switch(msgtype){
				case 'test_1':
					new Hilo.Tween.to(this,{
						alpha:1,
					},{
						duration:10,
						delay:2000,
						onComplete:function(){
							self.showLoadgif(false);
						}
					});
					break;
				case 'hide':
					new Hilo.Tween.to(this,{
						alpha:1,
					},{
						duration:10,
						delay:2000,
						onComplete:function(){
							self.showLoadgif(false);
							if(self.currentpanel){
								self.currentpanel.hide();
								if(msgdata){
									game.switchScene(game.configdata.SCENE_NAMES.invite);
								}else{
									self.createPointoutWindow([],'login_9','对不起，没有此房间').addTo(self);
								}
							}
						}
					});
					break;
			}
		},
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.alpha = 1;
			
			this.initBg('loginbg');
			
			
			Hilo.Tween.to(this, {
				y: game.stage.height/2 - this.height/2
			}, {
				duration: 800,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {
					
				}
			});
			
			game.layoutUi.layoutPanelData(game.sceneuidata.main_uidata[1],game.stage.width,game.stage.height,1,this);
			var sl = new game.ScrollBmpwindow({
				x:30,
				y:game.stage.height/2 - (410*game.scalefact)/2,
				width:272,
				height:415,
			}).addTo(this);
			sl.addImgs(['img/loadbanner/activity1.png','img/loadbanner/activity2.png','img/loadbanner/activity3.png','img/loadbanner/activity4.png'],270,410);
			sl.scaleX = game.scalefact;
			sl.scaleY = game.scalefact;
			
			
			var self = this;
			this.items['id_mainscene_createroom_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('create a room');
				var prompt = self.createPromptpanel('login_bg35',true,true,self);
				prompt.addTo(self);
				console.log(self.getNumChildren());
			});
			
			this.items['id_mainscene_enterroom_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('create a room');
				var prompt = self.createPromptpanel2([],'login_bg35',true,true,self);
				prompt.addTo(self);
				prompt.iscurrent = true;
				self.currentpanel = prompt;
			});
			
			this.items['id_mainscene_expandable_btn'].on(Hilo.event.POINTER_END, function(e) {
				var prompt = self.createPromptpanel3(game.sceneuidata.main_uidata[2],'login_bg35',true,true,self);
				prompt.addTo(self);
				//self.showLoadgif(true);
				//game.sendMsg(self,game.networker,'testmsg',1000);
				
				
				
				
			});
			
			this.items['id_mainscene_score_btn'].on(Hilo.event.POINTER_END, function(e) {
				var prompt = self.createPromptpanel4(game.sceneuidata.main_uidata[2],'login_bg35',true,true,self);
				prompt.addTo(self);
			});
			
			this.items['id_mainscene_help_btn'].on(Hilo.event.POINTER_END, function(e) {
				self.createPointoutWindow([],'login_9','测试一下添加输入').addTo(self);
				var t = $('#game-container');
				t.after("<input id='testp' style='position:absolute;top:200px;left:100px'></input>");
				$('#testp').focus();
			});
			
			this.items['id_mainscene_setting_btn'].on(Hilo.event.POINTER_END, function(e) {
				$('#testp').remove();
			});
			

			
			this.initSlideEvent();
		},
		
		createPointoutWindow:function(data,title,text){
			var self = this;
			var customw = this.width * 0.8;
			var customh = this.height * 0.8;
			debugger;
			var txt = game.configdata.createTitletext(text,'18px 黑体','black','yellow',0,0,300);
			var panel = game.configdata.createBgPanel(data,'login_bg35',true,true,self,'login_13','login_14','ui',55,'login_bg111',title,customw,customh);
			txt.x = panel.width * game.scalefact /2 -150;
			txt.y = panel.height * game.scalefact /2 - txt._fontHeight/2;
			
			txt.addTo(panel);
			return panel;
		},
		
		createPromptpanel:function(bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel(game.sceneuidata.main_uidata[3],bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','login_bg42');
			var btn = new game.RoomSurebtn({
				itemurlvalue:'login_10',
				defaultNum:5,
				caricon:'chuangqian',
				sureicon:'login_bg72',
				btndown:'login_11',
				imgsource:'ui',
				scaleX:game.scalefact,
				scaleY:game.scalefact,
			}).addTo(panel);
			btn.x = (panel.width - btn.width) *game.scalefact/2;
			btn.y = panel.height * game.scalefact - btn.height * game.scalefact - 20;
			return panel;
		},
		
		createPromptpanel2:function(data,bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel(data,bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','login_bg43');
			var numpanel = new game.InputNumpanel({numcount:6,x:350,y:10,scaleX:game.scalefact,scaleY:game.scalefact}).addTo(panel);
			numpanel.x = (panel.width - numpanel.width)*game.scalefact/2;
			numpanel.y = panel.height * game.scalefact -numpanel.height * game.scalefact - panel.height * game.scalefact * 0.05;
			numpanel.inceptHandle = this.inceptNum;
			panel.numpanel = numpanel;
			return panel;
		},
		
		createPromptpanel3:function(data,bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel(data,bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','fenxiang');
			return panel;
		},
		createPromptpanel4:function(data,bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel([],bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','login_bg63');
			var scrollwin = new game.Scrollwindow({
				width:panel.width * game.scalefact * 6/8,
				height:panel.height * game.scalefact * 6/8,
				x:panel.width* game.scalefact/8,
				y:panel.height* game.scalefact/8,
			}).addTo(panel);
			var txt = new Hilo.Text({
				text:"",
				font:'14px  黑体',
				color:'black',
				background:'rgba(0,0,0,0)',
				width:scrollwin.width,
				maxWidth:scrollwin.width-60,
				textAlign:'left',
				height:1850,
				lineSpacing:5,
				x:30,
				y:10,
				textVAlign:'top',
			});
			scrollwin.addContent(txt,1850);
			this.slideList.push(scrollwin);
			
			
			$.ajax({
				type:'GET',
				url:'../phone/txtdata/test.txt',
				timeout:100,
				success:function(data){
					console.log(data);
					txt.text = data;
				},
				error:function(xhr,type){
					console.log(type);
					console.log(xhr);
				}
			})
			
			return panel;
		},
		inceptNum:function(numst){
			if(numst.length >= 6 && !isNaN(numst)){
				var scene = this.parent.parent;
				scene.showLoadgif(true);
				game.sendMsg(scene,game.networker,'testmsg_num',numst);
			}
		},
		
		deactive: function() {
			var scene = this;
			this.off();
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