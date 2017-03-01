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
		
		throwmjInitx:0,
		
		takmjbtn:null,
		isThrow:false,
		pointer:null,
		
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
				case game.mjdata.msg.SELECT:
					if(self.currentmj)
						self.currentmj.backQueue();
					self.currentmj = sendobj;
					console.log('点选此牌');
					console.log(self.mjlayer.getNumChildren());
					break;
				case game.mjdata.msg.THROW:
					sendobj.removeFromParent();
					self._throwmj(sendobj.mjid);
					self.currentmj = null;
					self.isThrow = false;
					console.log(self.mjlayer.getNumChildren());
					self.sortMj();
					break;
			}
		},
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.initBg('bg','battlebg');
			
			this.mjlayer = new Hilo.Container().addTo(this);
			
			
			
			this.deal();
			var self = this;
			this.takemjbtn = game.configdata.createButton('ui','login_10','login_11',10,140).addTo(this);
			this.takemjbtn.on(Hilo.event.POINTER_END,function(e){
				if(!self.isThrow){
					self.takemj();
					self.isThrow = true;
				}
			});
			
			this.pointer = new game.Pointermj({imgsource:'ui',rectname:'tbattle_21',scaleX:game.scalefact,scaleY:game.scalefact}).addTo(this);
		},
		
		_throwmj:function(mjid){
			var idname = mjid+'-1';
			this.throwmjInitx += 24;
			var throwmj = new game.MjScene({mjid:idname,x:this.throwmjInitx,y:50}).addTo(this);
			this.pointer.x = throwmj.x ;
			this.pointer.y = throwmj.y -25;
			this.swapChildren(this.pointer,throwmj);
		},
		
		takemj:function(){
			var id = this.createRandomMjid();
			var mj = new game.MjSelf({mjid:id,scaleX:game.scalefact,scaleY:game.scalefact}).addTo(this.mjlayer);
			var x = this.width - mj.swidth - 50;
			var y = this.height - mj.sheight - 10;
			mj.x = x;
			mj.y = y;
			mj.initx = mj.x;
			mj.inity = mj.y;
		},
		
		sortMj:function(){
			var l = this.mjlayer.children;
			console.log('张数：%s',l.length);
			this.mjlayer.sortChildren(this._sortmj);
			for(var i=0;i<l.length;i++){
				var mj = l[i];
				mj.x = (mj.swidth)*i +10;
				mj.y = this.height - 10 -mj.sheight;
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