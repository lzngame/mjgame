(function(ns) {
	var InviteMainscene = ns.InviteMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.invite,
		items:null,

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
				id_palyscene_disband_btn:this.temp1,
				id_palyscene_invite_btn:this.temp2,
				id_palyscene_back_btn:this.temp3
			};
		},
		executeMsg:function(sendobj,msgtype,msgdata){
			var self = this;
			switch(msgtype){
				case '':
					break;
			}
		},
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.initBg('bg','battlebg');
			this.y = game.screenHeight/2 - this.height/2;
			this.x = game.screenWidth/2 - this.width/2;
			

			game.layoutUi.layoutPanelData(game.sceneuidata.playscene_uidata[0],game.screenWidth,game.screenHeight,1,this);
			
			this.initBtnHandle();
		},
		
		
		temp1:function(btnself){
			console.log('temp1');
		},
		temp2:function(btnself){
			console.log('temp2');
			game.switchScene(game.configdata.SCENE_NAMES.play);
		},
		temp3:function(btnself){
			console.log('temp3');
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
		onUpdate:function(){
			
		},
	});
	
	var PlayMainscene = ns.PlayMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.play,
		items:null,
		mjlayer:null,
		currentmj:null,
		
		constructor: function(properties) {
			PlayMainscene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
			this.width = game.configdata.mainStageSize.width;
			this.height = game.configdata.mainStageSize.height;
			this.items = {};
		},
		executeMsg:function(sendobj,msgtype,msgdata){
			var self = this;
			switch(msgtype){
				case 'isme':
					if(sendobj == self.currentmj){
						sendobj.y -= 100;
						sendobj.setState(1);
						sendobj.removeFromParent();
						self.currentmj = null;
						self.addRandMj();
						self.sortMj();
					}else{
						if(self.currentmj){
							self.currentmj.y = self.currentmj.inity;
						}
						self.currentmj = sendobj;
					}
					break;
			}
		},
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.initBg('bg','battlebg');
			
			this.mjlayer = new Hilo.Container().addTo(this);
			
			
			
			this.deal();
		},
		
		sortMj:function(){
			this.mjlayer.sortChildren(this._sortmj);
			var l = this.mjlayer.children;
			for(var i=0;i<l.length;i++){
				var mj = l[i];
				mj.x = (mj.swidth+1)*i;
				mj.y = 200;
				mj.initx = mj.x;
				mj.inity = mj.y;
			}
		},
		
		deal:function(){
			for(var i=0;i<13;i++){
				this.addRandMj();
			}
		},
		
		addRandMj:function(){
			var id = this.createRandomMjid();
			this.addMj(id);
		},
		
		createRandomMjid:function(){
			var s = ['t','b','w'];
			var sn = Math.floor(Math.random() * 3);
			var n = Math.floor(Math.random() * 9)+1;
			var mjid = s[sn]+'_'+n.toString();
			return mjid;
		},
		
		_sortmj:function(mj1,mj2){
			var mjid1 = mj1.mjid;
			var mjid2 = mj2.mjid;
			var mjid_1 = mjid1.split('_');
			var mjid_2 = mjid2.split('_');
			if(mjid_1[0] > mjid_2[0]){
				return 1;
			}else if(mjid_1[0] < mjid_2[0]){
				return -1;
			}else{
				if(mjid_1[1] > mjid_2[1]){
					return 1;
				}else if(mjid_1[1] < mjid_2[1]){
					return -1;
				}else{
					return 0;
				}
			}
		},
		
		addMj:function(mjid){
			var mj_tmp1 = new game.MjSelf({mjid:mjid,scaleX:game.scalefact,scaleY:game.scalefact}).addTo(this.mjlayer);
			this.sortMj();
		},
		printmj:function(){
			var l = this.mjlayer.children;
			var st ='';
			for(var i=0;i<l.length;i++){
				var mj = l[i];
				st += (mj.mjid + ',');
			}
			console.log(st);
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