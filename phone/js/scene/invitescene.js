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
				id_invitescene_back_btn: this.gobackScene
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
		setRoomInfo:function(){
			var info = game.roominfo.getData();
			this.items['id_invitescene_wintype_txt'].text = info.paytype;
			this.items['id_invitescene_title_txt'].text = '房间号：'+info.roomid;
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