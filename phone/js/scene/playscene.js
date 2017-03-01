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
		bglayer:null,
		mjlayer:null,
		currentmj:null,
		
		isTurn:true,
		
		
		throwmjInitx:0,
		throwmjInity:0,
		throwNum:0,
		throwupNum:0,
		
		takmjbtn:null,
		isThrow:false,
		pointer_mj:null,
		pointer_user:null,
		
		
		
		selfmjsize:[46,68],
		scenemjsize:[24,32],
		
		currentThrow:null,
		
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
					if(self.isTurn){
						sendobj.removeFromParent();
						self._throwmj(sendobj.mjid);
						console.log(self.mjlayer.getNumChildren());
						self.sortMj();
					}else{
						sendobj.backQueue();
					}
					self.currentmj = null;
					self.isThrow = false;
					break;
				case game.mjdata.msg.THROWMJ:
					self.isTurn = true;
					self.pointer_user.setDirect('down');
					self._throwmjup();
					self.takemj();
					break;
			}
		},
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.initBg('bg','battlebg');
			
			this.bglayer = new Hilo.Container().addTo(this);
			this.bglayer.pointerChildren = false;
			this.throwlayer = new Hilo.Container().addTo(this);
			this.throwuplayer = new Hilo.Container().addTo(this);
			
			this.mjlayer = new Hilo.Container().addTo(this);
			
			
			
			this.deal();
			this._dealUp();
			var self = this;
			/*this.takemjbtn = game.configdata.createButton('ui','login_bg49','login_bg50',10,140).addTo(this);
			this.takemjbtn.on(Hilo.event.POINTER_END,function(e){
				if(!self.isThrow){
					self.takemj();
					self.isThrow = true;
				}
			});*/
			
			this.pointer_mj = new game.Pointermj({imgsource:'ui',rectname:'tbattle_21',scaleX:game.scalefact,scaleY:game.scalefact,visible:false}).addTo(this);
			this.pointer_user = new game.Pointeruser({imgsource:'ui',rectname:'battle_10',x:this.width/2,y:this.height/2,scaleX:game.scalefact,scaleY:game.scalefact}).addTo(this.bglayer);
			var txt = game.configdata.createBgTitletext('剩余73张','12px 黑体','yellow','ui','login_bg9').addTo(this.bglayer);
			txt.x = this.width/2 - txt.width - 50;
			txt.y = this.height/2 - txt.height/2;
			var txt2 = game.configdata.createBgTitletext('剩余3局','12px 黑体','yellow','ui','login_bg9').addTo(this.bglayer);
			txt2.x = this.width/2 + 50;
			txt2.y = this.height/2 - txt.height/2;
			var txt3 = game.configdata.createBgTitletext('房间号:123980','14px 黑体','white','ui','login_bg17').addTo(this.bglayer);
			txt3.x = this.width/2 - txt3.width/2;
			txt3.y = 0;
			var goldmj = new game.Goldmj({mjid:'b_3',imgsource:'ui',bgrectname:'15'}).addTo(this.bglayer);
			goldmj.scaleX = game.scalefact;
			goldmj.scaleY = game.scalefact;
			
			this.takemj();
		},
		
		_throwmj:function(mjid){
			this.pointer_mj.visible = true;
			var idname = mjid+'-1';
			var throwmj = new game.MjScene({mjid:idname}).addTo(this.throwlayer);
			this.throwmjInitx =  (this.throwNum % 12) * throwmj.swidth + this.width/8;
			this.throwmjInity =  -Math.floor(this.throwNum / 12) *  throwmj.sheight + this.height - 150;
			throwmj.x = this.throwmjInitx;
			throwmj.y = this.throwmjInity;
			this.throwNum ++;

			this.throwlayer.sortChildren(function(a,b){
				if(a.y > b.y){
					return 1;
				}else if(a.y < b.y){
					return -1;
				}else{
					return 0;
				}
			});
			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x ;
			this.pointer_mj.y = throwmj.y -25;
			
			//var d = Math.floor(Math.random()*4);
			//var dir =['up','down','right','left'];
			this.pointer_user.setDirect('up');
			this.isTurn = false;
			
			game.sendMsg(this,game.networker,game.mjdata.msg.THROWMJ,mjid);
		},
		
		_throwmjup:function(){
			var mjid = this.createRandomMjid();
			var idname = mjid+'-1';
			var throwmj = new game.MjScene({mjid:idname}).addTo(this.throwuplayer);
			var  x =  (this.throwupNum % 12) * throwmj.swidth + this.width/8;
			var  y =  Math.floor(this.throwupNum / 12) *  throwmj.sheight + 70;// + this.height + 70;
			throwmj.x = x;
			throwmj.y = y;
			this.throwupNum ++;

			
			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x ;
			this.pointer_mj.y = throwmj.y -25;
			
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
			this.isThrow = true;
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
		
		_dealUp:function(){
			for(var i=0;i<13;i++){
				var mj = game.configdata.createRectImg('mj','battle_80',i*22+300,30,1).addTo(this);
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