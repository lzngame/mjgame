(function(ns) {
	var InviteMainscene = ns.InviteMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.invite,
		items: null,

		constructor: function(properties) {
			InviteMainscene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
			this.width = game.configdata.mainStageSize.width;
			this.height = game.configdata.mainStageSize.height;
			this.items = {};
			this.funcs = {
				id_invitescene_disband_btn: this.disbandRoom,
				id_invitescene_invite_btn: this.inviteFriend,
				id_invitescene_back_btn: this.gobackScene,
				id_invitescene_talk_btn: this.showTalkpanel,
			};
		},
		executeMsg: function(sendobj, msgtype, msgdata) {
			var self = this;
			switch(msgtype) {
				case '':
					break;
			}
		},
		active: function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.initBg('bg', 'battle_bg');
			this.y = 0;
			this.x = 0;

			game.layoutUi.layoutPanelData(game.sceneuidata.playscene_uidata[0], this.width, this.height, 1, this);
			this.setRoomInfo();
			this.initBtnHandle();
		},
		setRoomInfo: function() {
			var info = game.roominfo.getData();
			this.items['id_invitescene_wintype_txt'].text = info.paytype;
			this.items['id_invitescene_title_txt'].text = '房间号：' + info.roomid;
		},
		showTalkpanel: function(sceneself) {
			var panel = sceneself.createPointoutWindow([]).addTo(sceneself);
			var title = new game.TabButton().addTo(panel);
			title.x = (panel.width - title.width) / 2 * game.scalefact;
			title.y = 20;
			var scrollwin = new game.Scrollwindow({
				width: 621, //panel.width * game.scalefact * 6 / 8,
				height: panel.height * game.scalefact * 6 / 8,
				x: panel.width * game.scalefact / 8,
				y: panel.height * game.scalefact / 4,
			}).addTo(panel);
			scrollwin.contentpanel.pointerEnabled = true;
			var content = new Hilo.Container();

			for(var i in game.mjdata.talksounds) {
				var data = game.mjdata.talksounds[i];
				var item = game.configdata.createBgTitletext(data[0], '26px 黑体', 'black', 'ui', 'login_bg92', 'left', 20).addTo(content);
				item.y = i * 60;
				item.sound = data[1];
				item.on(Hilo.event.POINTER_END, function(e) {
					if(scrollwin.slidedisy == 0) {
						game.sounds.playTalk(this.sound);
					}
				});
			}
			scrollwin.addContent(content, 660);

			var t = $('#game-container');

			var x = game.screenWidth * panel.rx;
			var y = game.screenHeight * panel.ry;
			var px = game.screenWidth * 0.125 * panel.rwidht * game.scalefact + x;
			var py = game.screenHeight * 0.125 * panel.rheight * game.scalefact + y;

			var posst = 'top:' + py + 'px;left:' + px + 'px';
			var cssst = "<input id='testp'  style='width:200px;height:30px;position:absolute;"+ posst+"'></input>";
			console.log(cssst);
			t.after(cssst);

			panel.closebtn.on(Hilo.event.POINTER_END, function(e) {
				console.log('删除输入框');
				console.log($('#testp').value);
				var txt =$('#testp')[0].value;
				console.log(txt);
				$('#testp').remove();
			});
			
			var btn = new game.IconButton({
					imgsource:'ui',
					btnupimg:'login_10',
					btndownimg:'login_11',
					iconimg:'login_bg90',
					x:panel.width * 0.65,
					y:panel.height * 0.125,
					handler:sceneself.showtalk,
					scaleX:game.scalefact,
					scaleY:game.scalefact,
				}).addTo(panel);
		},
		sendtalk:function(){
			var txt =$('#testp')[0].value;
			$('#testp').remove();
			game.configdata.sendMsg();
		},
		
		showtalk:function(){
			var txt =$('#testp')[0].value;
			$('#testp').remove();
			console.log(txt);
			var talklayer = new Hilo.Container({x:800,y:600}).addTo(this.parent.parent);
			this.parent.hide();
			game.configdata.createRectImg('ui','login_bg99',0,0,1).addTo(talklayer);
			var talktxt = game.configdata.createTitletext(txt,'34px 黑体','#46485f','rgba(0,0,0,0)',0,20,322).addTo(talklayer);
			new Hilo.Tween.to(talklayer,{
				alpha:0,
			},{
				duration:500,
				delay:1500,
				onComplete:function(){
					talklayer.removeFromParent();
				}
			});
		},

		disbandRoom: function(btnself) {
			console.log('disbandRoom');
			game.roominfo.isCreate = false;
			game.switchScene(game.configdata.SCENE_NAMES.main);
		},
		inviteFriend: function(btnself) {
			console.log('inviteFriend');
			game.switchScene(game.configdata.SCENE_NAMES.play);
		},
		gobackScene: function(btnself) {
			console.log('gobackScene');
			game.switchScene(game.configdata.SCENE_NAMES.main);
		},

		createPointoutWindow: function(data) {
			var self = this;
			var panel = game.configdata.createBgPanel(data, 'login_bg35', true, true, self, 'login_13', 'login_14', 'ui', 55, 'empty', 'empty');
			console.log('x:%f -- y:%f', panel.x, panel.y);
			return panel;
		},

		deactive: function() {
			var scene = this;
			this.disBtnHandle();
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