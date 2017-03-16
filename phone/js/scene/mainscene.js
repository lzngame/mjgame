(function(ns) {
	var MainScene = ns.MainScene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.main,
		items: null,
		rotate:null,

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
			}
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

			game.layoutUi.layoutPanelData(game.sceneuidata.main_uidata[1], game.stage.width, game.stage.height, 1, this);
			var sl = new game.ScrollBmpwindow({
				x: 30,
				y: game.stage.height / 2 - (410 * game.scalefact) / 2,
				width: 272,
				height: 415,
			}).addTo(this);
			sl.addImgs(['img/loadbanner/activity1.png', 'img/loadbanner/activity2.png', 'img/loadbanner/activity3.png', 'img/loadbanner/activity4.png'], 270, 410);
			sl.scaleX = game.scalefact;
			sl.scaleY = game.scalefact;
			
			var rx = this.items['id_mainscene_enterroom_btn'].x;
			var ry = this.items['id_mainscene_enterroom_btn'].y;
			var backBtn = new game.RotateMjBtn().addTo(this);
			backBtn.x = rx - backBtn.width/2;
			backBtn.y = ry - backBtn.height/2;
			backBtn.visible = game.roominfo.isCreate;
			this.items['id_mainscene_enterroom_btn'].visible = !backBtn.visible;
			backBtn.on(Hilo.event.POINTER_END,function(e){
				console.log('返回已经创建的房间');
				game.switchScene(game.configdata.SCENE_NAMES.invite);
			});
			
			
			
			var self = this;
			this.items['id_mainscene_createroom_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('want to create a room');
				if(game.roominfo.isCreate){
					self.createPointoutWindow(game.sceneuidata.bgtextline, 'login_9', '房间已经创建').addTo(self);
				}else{
					var prompt = self.createPromptpanel('login_bg35', true, true, self);
					prompt.addTo(self);
				}
			});

			this.items['id_mainscene_enterroom_btn'].on(Hilo.event.POINTER_END, function(e) {
				console.log('create a room');
				var prompt = self.createPromptpanel2([], 'login_bg35', true, true, self);
				prompt.addTo(self);
				prompt.iscurrent = true;
				self.currentpanel = prompt;
			});

			this.items['id_mainscene_expandable_btn'].on(Hilo.event.POINTER_END, function(e) {
				var prompt = self.createPromptpanel3(game.sceneuidata.main_uidata[2], 'login_bg35', true, true, self);
				prompt.addTo(self);
			});

			this.items['id_mainscene_score_btn'].on(Hilo.event.POINTER_END, function(e) {
				var prompt = self.createPromptpanel4(game.sceneuidata.main_uidata[2], 'login_bg35', true, true, self);
				prompt.addTo(self);
			});

			this.items['id_mainscene_help_btn'].on(Hilo.event.POINTER_END, function(e) {
				var panel = self.createPointoutWindow([], 'login_9', '测试一下添加输入').addTo(self);
				var t = $('#game-container');
				var tpl = "<input id='testp' style='position:absolute;top:200px;left:100px'></input>";
				
				var x = game.screenWidth  * panel.rx;
				var y = game.screenHeight * panel.ry;
				var px = game.screenWidth *  0.125 * panel.rwidht * game.scalefact +x;
				var py = game.screenHeight * 0.125 * panel.rheight * game.scalefact +y;
				
				var posst = 'top:'+py+'px;left:'+px+'px';
				var cssst = "<input id='testp' onblur='function(){console.log(1111111111);alert(333);}' style='width:150px;position:absolute;"+ posst+"'></input>";
				console.log(cssst);
				console.log(tpl);
				t.after(cssst);
				//$('#testp').focus();
				
				panel.closebtn.on(Hilo.event.POINTER_END,function(e){
					console.log('删除输入框');
					$('#testp').remove();
				});
			});

			this.items['id_mainscene_setting_btn'].on(Hilo.event.POINTER_END, function(e) {
				self.showInvitepanel();
			});

			this.initSlideEvent();
			
			
		},
		
		showInvitepanel:function(){
			//var panel = new game.ShowTalkpanel({parentscene:sceneself,targetscene:game.configdata.SCENE_NAMES.invite});
			//panel.addTo(sceneself);
			
			new game.Invitepanel({parentscene:this}).addTo(this);
		},
		hidepanel:function(){
			console.log('删除输入框');
			var panel = this.getChildById(this.panelid);
			panel.hide();
			this.panelid = null;
		},
		createPointoutWindow: function(data, title, text,isTitle) {
			var self = this;
			var txt = game.configdata.createTitletext(text, '28px 黑体', 'black', 'rgba(0,0,0,0)', 0, 0, 600);
			var panel = game.configdata.createBgPanel(data, 'login_bg35', true, true, self, 'login_13', 'login_14', 'ui', 55, 'login_bg111', title);
			txt.x = panel.width * game.scalefact / 2 - 300;
			txt.y = panel.height * game.scalefact / 2 - txt._fontHeight / 2;
			console.log('x:%f -- y:%f',panel.x,panel.y);
			txt.addTo(panel);
			return panel;
		},

		createPromptpanel: function(bgname, ishalf, ismodal, theparent) {
			var self = this;
			var panel = game.configdata.createBgPanel(game.sceneuidata.main_uidata[3], bgname, ishalf, ismodal, theparent, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'login_bg42');
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