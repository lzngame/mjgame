(function(ns) {
	var MainScene = ns.MainScene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.main,
		items: null,
		rotate:null,
		backBtn:null,
		scrollImg:null,

		constructor: function(properties) {
			MainScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
			this.width = game.configdata.mainStageSize.width;
			this.height = game.configdata.mainStageSize.height;
			this.y = -this.height;
			this.x = game.stage.width / 2 - this.width / 2;
			this.items = {};
			this.funcs = {
				id_mainscene_createroom_btn: this.createMjRoom,
				id_mainscene_joinroom_btn: this.joinMjRoom,
				id_mainscene_shareable_btn: this.shareGame,
				id_mainscene_generalize_btn:this.generalizeGame,
				id_mainscene_help_btn:this.helpGame,
				id_mainscene_recharge_btn:this.rechargeGame,
				id_mainscene_setting_btn:this.settingGame,
			};
		},
		executeMsg: function(sendobj, msgtype, msgdata) {
			var self = this;
			switch(msgtype) {
				case game.networker.msg.CREATEROOM:
					self.switchCreateRoom(msgdata);
					break;
				case game.networker.msg.JOINROOM:
					self.showLoadgif(false);
					if(self.currentpanel) {
						self.currentpanel.hide();
						if(msgdata) {
							game.switchScene(game.configdata.SCENE_NAMES.invite);
						} else {
							self.createPointoutWindow([], 'login_9', '对不起，没有此房间').addTo(self);
						}
					}
					break;
				case game.networker.msg.DISBANDROOM:
					self.disbandRoom(self);
					break;
			}
		},
		active: function(data) {
			console.log('%s active: %s', this.name,this.note);
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

			game.layoutUi.layoutPanelData(game.sceneuidata.main_uidata[1], game.stage.width, game.stage.height, 1, this);
			this.scrollImg = new game.ScrollBmpwindow({
				x: 30,
				y: game.stage.height / 2 - (410 * game.scalefact) / 2,
				width: 272,
				height: 415,
			}).addTo(this);
			this.scrollImg.addImgs(['img/loadbanner/activity1.png', 'img/loadbanner/activity2.png', 'img/loadbanner/activity3.png', 'img/loadbanner/activity4.png'], 270, 410);
			this.scrollImg.scaleX = game.scalefact;
			this.scrollImg.scaleY = game.scalefact;
			
			if(game.roominfo.isCreate){
				var rx = this.items['id_mainscene_joinroom_btn'].x;
				var ry = this.items['id_mainscene_joinroom_btn'].y;
				this.backBtn = new game.RotateMjBtn().addTo(this);
				this.backBtn.x = rx - this.backBtn.width/2;
				this.backBtn.y = ry - this.backBtn.height/2;
				this.backBtn.visible = game.roominfo.isCreate;
				this.items['id_mainscene_joinroom_btn'].visible = !this.backBtn.visible;
				this.backBtn.on(Hilo.event.POINTER_END,function(e){
					console.log('返回已经创建的房间');
					game.switchScene(game.configdata.SCENE_NAMES.invite);
				});
			}
			
			this.initBtnHandle();
			this.initSlideEvent();
			
			
		},
		
		createMjRoom:function(self){
			console.log('want to create a room');
			if(game.roominfo.isCreate){
					self.createPointoutWindow(game.sceneuidata.bgtextline, 'login_9', '房间已经创建').addTo(self);
			}else{
					var prompt = self.createPromptpanel(game.sceneuidata.main_uidata[3],'login_bg35', true, true, self);
					prompt.addTo(self);
			}
		},
		
		joinMjRoom:function(self){
			console.log('join a room');
			var prompt = self.createPromptpanel2([], 'login_bg35', true, true, self);
			prompt.addTo(self);
			prompt.iscurrent = true;
			self.currentpanel = prompt;
		},
		
		shareGame:function(self){
			var prompt = self.createPromptpanel3(game.sceneuidata.main_uidata[2], 'login_bg35', true, true, self);
			prompt.addTo(self);
		},
		
		helpGame:function(self){
			var prompt = self.createPromptpanel4(game.sceneuidata.main_uidata[2], 'login_bg35', true, true, self);
			prompt.addTo(self);
		},
		
		settingGame:function(self){
			self.createSettingWindow(self);
		},
		
		generalizeGame:function(self){
			new game.Invitepanel({parentscene:self}).addTo(self);
		},
		
		rechargeGame:function(self){
			self.createRechargeWindow(self);
		},
		
		
		createSettingWindow: function(self) {
			var panel = game.configdata.createBgPanel(game.sceneuidata.main_uidata[4], 'login_bg35', true, true, self, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'login_bg64');
			var btn = new game.IconButton({
				imgsource: 'ui',
				btnupimg: 'login_10',
				btndownimg: 'login_11',
				iconimg: 'login_bg67',
				scaleX: game.scalefact,
				scaleY: game.scalefact,
			}).addTo(panel);
			panel.addTo(self);
			
			btn.x = panel.width* game.scalefact/2 - btn.width * game.scalefact/2 ;
			btn.y = panel.height* game.scalefact * (5/8);
		},
		
		createRechargeWindow: function(self) {
			var panel = game.configdata.createBgPanel([], 'login_bg35', true, true, self, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'zhongzhiz10');
			panel.addTo(self);
			new game.CardNumber({x:panel.width * 0.125 * game.scalefact,y:panel.height*0.05 * game.scalefact,scaleX:game.scalefact,scaleY:game.scalefact}).addTo(panel);
			
			
			var bglayer = game.configdata.createRectImg('bg','login_bg36',0,0,1).addTo(panel);
			bglayer.x = panel.width*game.scalefact/2 - bglayer.width*game.scalefact/2;
			bglayer.y = panel.height*game.scalefact/2 - bglayer.height*game.scalefact/2 + panel.height*game.scalefact*0.1;
			bglayer.scaleX = game.scalefact;
			bglayer.scaleY = game.scalefact;
			var scrollhead = new game.Scrollwindow({
				width:bglayer.width,
				height:bglayer.height,
				direct:'V',
				scaleX:game.scalefact,
				scaleY:game.scalefact,
			}).addTo(panel);
			scrollhead.x  = bglayer.x;
			scrollhead.y  = bglayer.y + bglayer.height * game.scalefact * 0.05;
			
			var content = new Hilo.Container();
			scrollhead.contentpanel.pointerEnabled = true;
			var count = 4;
			var w = 0;
			for(var i=0;i<count;i++){
				var head = new game.Rechargeablecard({carimg:'zhongzhi18'}).addTo(content);
				head.x = head.width* i;
				w += head.width;
			}
			scrollhead.addContent(content,w);
		},
		
		hidepanel:function(){
			console.log('删除输入框');
			var panel = this.getChildById(this.panelid);
			panel.hide();
			this.panelid = null;
		},
		
		disbandRoom: function(btnself) {
			console.log('disbandRoom');
			var win = btnself.createPointoutWindow(game.sceneuidata.bgtextline, 'login_9', '房间解散，游戏未开始不扣除房卡。').addTo(btnself);
			this.backBtn.off();
			this.backBtn.removeFromParent();
			this.items['id_mainscene_joinroom_btn'].visible = true;
			if(this.panelid)
				this.hidepanel();
		},
		
		createPromptpanel: function(data,bgname, ishalf, ismodal, theparent) {
			var self = this;
			var panel = game.configdata.createBgPanel(data, bgname, ishalf, ismodal, theparent, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'login_bg42');
			var btn = new game.RoomSurebtn({
				itemurlvalue: 'login_10',
				defaultNum: 5,
				caricon:   'chuangqian',
				sureicon:  'login_bg72',
				btndown:   'login_11',
				imgsource: 'ui',
				scaleX: game.scalefact,
				scaleY: game.scalefact,
			}).addTo(panel);
			btn.x = (panel.width - btn.width) * game.scalefact / 2;
			btn.y = panel.height * game.scalefact - btn.height * game.scalefact + 20;

			var setvalue = [0, 0, 0, 0];
			for(var itemid in panel.items) {
				var radiobox = panel.items[itemid];
				if(radiobox.groupid) {
					if(radiobox.isSelected) {
						if(radiobox.groupid == 'groupid001') {
							setvalue[0] = radiobox.value;
						}
						if(radiobox.groupid == 'groupid002') {
							setvalue[1] = radiobox.value;
						}
						if(radiobox.groupid == 'groupid003') {
							setvalue[2] = radiobox.value;
						}
						if(radiobox.groupid == 'groupid004') {
							setvalue[3] = radiobox.value;
						}
					}
					radiobox.onhandle = function(txt) {
						if(this.groupid == 'groupid001') {
							setvalue[0] = this.value;
						}
						if(this.groupid == 'groupid002') {
							setvalue[1] = this.value;
						}
						if(this.groupid == 'groupid003') {
							setvalue[2] = this.value;
						}
						if(this.groupid == 'groupid004') {
							setvalue[3] = this.value;
						}
						var carnums = self.calculatePaycard(setvalue);
						btn.setLabelNum(carnums);
					}
				}
			}
			btn.setLabelNum(self.calculatePaycard(setvalue));
			btn.on(Hilo.event.POINTER_END, function(e) {
				var carnums = self.calculatePaycard(setvalue);
				self.showLoadgif(true);
				game.sendMsg(self, game.networker, game.networker.msg.CREATEROOM, [carnums, setvalue]);
			});
			return panel;
		},

		createPromptpanel2: function(data, bgname, ishalf, ismodal, theparent) {
			var panel = game.configdata.createBgPanel(data, bgname, ishalf, ismodal, theparent, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'login_bg43');
			var titletxt = game.configdata.createTitletext('输入房间号', '24px 黑体', 'white', 'rgba(0,0,0,0)', panel.width * game.scalefact / 2 - 200, panel.height * game.scalefact / 8, 400).addTo(panel);
			var numpanel = new game.InputNumpanel({ numcount: 6, x: 350, y: 10, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(panel);
			numpanel.x = (panel.width - numpanel.width) * game.scalefact / 2;
			numpanel.y = panel.height * game.scalefact - numpanel.height * game.scalefact - panel.height * game.scalefact * 0.05 + 30;
			numpanel.inceptHandle = this.inceptNum;
			panel.numpanel = numpanel;
			return panel;
		},
		
		createPromptpanel3: function(data, bgname, ishalf, ismodal, theparent) {
			var panel = game.configdata.createBgPanel(data, bgname, ishalf, ismodal, theparent, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'fenxiang');
			return panel;
		},
		
		createPromptpanel4: function(data, bgname, ishalf, ismodal, theparent) {
			var panel = game.configdata.createBgPanel([], bgname, ishalf, ismodal, theparent, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'login_bg63');
			var scrollwin = new game.Scrollwindow({
				width: panel.width * game.scalefact * 6 / 8,
				height: panel.height * game.scalefact * 6 / 8,
				x: panel.width * game.scalefact / 8,
				y: panel.height * game.scalefact / 8,
			}).addTo(panel);
			var txt = new Hilo.Text({
				text: "",
				font: '24px  黑体',
				color: 'black',
				background: 'rgba(0,0,0,0)',
				width: scrollwin.width,
				maxWidth: scrollwin.width - 60,
				textAlign: 'left',
				height: 1850,
				lineSpacing: 5,
				x: 30,
				y: 10,
				textVAlign: 'top',
			});
			scrollwin.addContent(txt, 1850);
			this.slideList.push(scrollwin);

			$.ajax({
				type: 'GET',
				url: '../phone/txtdata/test.txt',
				timeout: 100,
				success: function(data) {
					console.log(data);
					txt.text = data;
				},
				error: function(xhr, type) {
					console.log(type);
					console.log(xhr);
				}
			})

			return panel;
		},
		
		

		switchCreateRoom: function(msgdata) {
			this.showLoadgif(false);
			if(msgdata) {
				game.switchScene(game.configdata.SCENE_NAMES.invite);
			} else {
				this.createPointoutWindow(game.sceneuidata.bgtextline, 'login_9', '对不起，您的房卡不够').addTo(this);
			}
		},

		calculatePaycard: function(datalist) {
			var base = 1;
			var factcount = 1;
			var factman = 1;
			factcount = datalist[0] / 4;
			if(datalist[2] == 4) {
				factman = 2;
			}
			return base * factcount * factman;
		},

		inceptNum: function(numst) {
			if(numst.length == 6 && !isNaN(numst)) {
				var scene = this.parent.parent;
				scene.showLoadgif(true);
				game.sendMsg(scene, game.networker, game.networker.msg.JOINROOM, numst);
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
		onUpdate: function() {

		},
	});
})(window.game);