(function(ns) {
	var InviteMainscene = ns.InviteMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.invite,
		items: null,
		countdown:null,

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
				case game.networker.msg.SHOWTALK:
					self.showtalk(msgdata[0],msgdata[1],msgdata[2],msgdata[3]);
					break;
				case game.networker.msg.DISBANDROOM:
					self.disbandRoom(self);
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
			//this.countdown = new game.CountDown({scaleX:game.scalefact,scaleY:game.scalefact,totaltime:600,iszero:true,y:this.height * game.scalefact * 0.375,fontclr:'white',fontbg:'green',func:function(){console.log('倒计时结束');}}).addTo(this);
			this.countdown = new game.CountDown({totaltime:info.countdown,iszero:true,y:this.height  * 0.375,fontclr:'white',func:function(){console.log('倒计时结束');}}).addTo(this);
			this.countdown.x = this.width /2 - this.countdown.txtwidth/2;
			
		},
		showTalkpanel: function(sceneself) {
			var panel = new game.ShowTalkpanel({parentscene:sceneself,targetscene:game.configdata.SCENE_NAMES.invite});
			panel.addTo(sceneself);
		},
		
		hidepanel:function(){
			console.log('删除输入框');
			var panel = this.getChildById(this.panelid);
			panel.hide();
			this.panelid = null;
		},
		
		showtalk:function(userdir,showtype,txt,sound){
			var ids ={
				up:['id_invitescene_playerup_bmp',2,74],
				down:['id_invitescene_playerdown_bmp',0,0],
				left:['id_invitescene_playerleft_bmp',0,0],
				right:['id_invitescene_playerright_bmp',1,0],
			};
			var obj = this.items[ids[userdir][0]];
			var placement = ids[userdir][1];
			var dis = ids[userdir][2] * game.scalefact;
			var x = obj.x;
			var y = obj.y;
			this.hidepanel();
			if(showtype == 'text')
				var talklayer = new game.Chatbubble({x:x,y:y+dis,delaytime:2000,txt:txt,placement:placement}).addTo(this);
			else
				var talklayer = new game.Chatbubble({x:x,y:y+dis,delaytime:2000,rectname:txt,placement:placement}).addTo(this);
			if(sound)
				game.sounds.playTalk(sound);
		},

		disbandRoom: function(btnself) {
			console.log('disbandRoom');
			game.roominfo.reset();
			var win = btnself.createPointoutWindow(game.sceneuidata.bgtextline, 'login_9', '房间解散，游戏未开始不扣除房卡。').addTo(btnself);
			win.closebtn.on(Hilo.event.POINTER_END,function(e){
				game.switchScene(game.configdata.SCENE_NAMES.main);
			});
		},
		inviteFriend: function(btnself) {
			console.log('inviteFriend');
			game.switchScene(game.configdata.SCENE_NAMES.play);
		},
		gobackScene: function(btnself) {
			console.log('gobackScene');
			game.switchScene(game.configdata.SCENE_NAMES.main);
			game.roominfo.countdown = btnself.countdown.totaltime;
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