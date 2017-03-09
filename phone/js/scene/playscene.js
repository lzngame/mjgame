(function(ns) {
	var PlayMainscene = ns.PlayMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.play,
		items: null,
		bglayer: null,
		
		currentmj: null,
		mjDirect:['down','left','up','right'],
		currentThrowIndex: null,
		isTurn: false,
		
		throwDownNum: 0,
		throwUpNum: 0,
		throwLeftNum: 0,
		throwRightNum: 0,

		isThrow: false,
		pointer_mj: null,
		pointer_user: null,

		selfmj_h: 0,
		selfmj_w: 0,
		goldmj:null,
		
		
		initFlowers:null,
		
		maxMjStack:9,  //堆牌长度
		maxMjHandle:16,//手牌张数
		selfMjInitx:0, //玩家 --（down）摆牌的x 起始位置
		
		dealUpMjLayer: null,
		dealDownMjLayer: null,
		dealLeftMjLayer: null,
		dealRightMjLayer: null,
		
		dealDownInitx:0,
		delaDownInity:0,
		dealUpInitx:0,
		delaUpInity:0,
		dealLeftInitx:0,
		delaLeftInity:0,
		dealRightInitx:0,
		delaRightInity:0,
		
		throwDownInitx:0,
		throwDownInity:0,
		throwUpInitx:0,
		throwUpInity:0,
		//this.initPostion['left']['throwX']:0,
		throwLeftInity:0,
		throwRightInitx:0,
		throwRightInity:0,
		
		residueMjLabel:null,	  //剩余牌数
		residueGamenumLabel:null, //剩余局数
		roomIdLabel:null,         //房间ID号
		bankerDir:'down',         //庄家位置

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
		
		active: function(data) {
			console.log('%s active:', this.name);
			var self = this;
			this.addTo(game.stage);
			this.initBg('bg', 'battle_bg');
			this.initFlowers = {
				up:1,
				down:1,
				left:1,
				right:1
			};
			this.initLayerAndPositions();
			this.setRoomInfo();
			game.mjdata.initMjQueue();
			this.deal();
			this.setTurnGold();
			this.takemj();
			this.turnBuhua();
		},
		
		deal: function() {
			for(var i = 0; i < this.maxMjHandle; i++) {
				//self -down
				var mj_down = new game.MjSelf({ mjid: game.mjdata.dealOne(), scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.dealDownMjLayer);
				this.initPostion['down']['dealX']
				var x = mj_down.swidth * i + this.initPostion['down']['dealX'];
				var y = this.initPostion['down']['dealY'];
				mj_down.setInitPos(x,y);
				//up
				var mj_up = this.createDealMj(game.mjdata.dealOne(),1,1).addTo(this.dealUpMjLayer);
				mj_up.x = mj_up.swidth * i + this.initPostion['up']['dealX'];
				mj_up.y = this.initPostion['up']['dealY'];
				//lfet
				var mj_left = this.createDealMj(game.mjdata.dealOne(),2).addTo(this.dealLeftMjLayer);
				mj_left.x = this.initPostion['left']['dealX'];
				mj_left.y = (mj_left.sheight*0.72) * i + this.initPostion['left']['dealY'];
				//right
				var mj_right = this.createDealMj(game.mjdata.dealOne(),3).addTo(this.dealRightMjLayer);
				mj_right.x = this.initPostion['right']['dealX'];
				mj_right.y = (mj_right.sheight*0.72) * i + this.initPostion['right']['dealY'];

			}
			this.sortPlayerMj('down');
			this.sortPlayerMj('up');
			this.sortPlayerMj('right');
			this.sortPlayerMj('left');
		},
		
		executeMsg: function(sendobj, msgtype, msgdata) {
			var self = this;
			switch(msgtype) {
				case game.networker.msg.BESELECT:
					if(self.currentmj)
						self.currentmj.backQueue();
					self.currentmj = sendobj;
					console.log('点选手牌:%s',game.mjdata.mj[sendobj.mjid][0]);
					break;
				case game.networker.msg.BETHROW:
					if(self.isTurn) {
						sendobj.removeFromParent();
						self._throwmjSelf(sendobj.mjid,true);
						self.sortPlayerMj('down');
						console.log('扔掉手牌：%s',game.mjdata.mj[sendobj.mjid][0]);
					} else {
						console.log('放回手牌：%s',game.mjdata.mj[sendobj.mjid][0]);
						sendobj.backQueue();
					}
					self.currentmj = null;
					self.isThrow = false;
					break;
				case game.networker.msg.NEXTUSER_HANDLE:
					self.currentThrowIndex++;
					if(self.currentThrowIndex >= 4){
						self.currentThrowIndex = 0;
					}
					
					var user = self.mjDirect[self.currentThrowIndex];
					self.pointer_user.setDirect(user);
					
					if(user == 'down'){
						self.isTurn = true;
						self.takemj();
					}else{
						self.otherTakemj(user);
					}
					break;
				case game.networker.msg.NEXTUSER_BUHUA:
					self.currentThrowIndex++;
					if(self.currentThrowIndex >= 4){
						self.currentThrowIndex = 0;
					}
					
					var user = self.mjDirect[self.currentThrowIndex];
					
					if(self.checkFlower(user)){
						self.buhua(user);
					}else{
						self.initFlowers[user] = 0;
					}
					
					if(!self.checkAllFlower()){
						game.sendMsg(this, game.networker, game.networker.msg.NEXTUSER_BUHUA, 'down');
					}else{
						self.isTurn = true;
						self.currentThrowIndex = 0;
					}
					break;
			}
		},
		
		turnBuhua:function(){
			if(this.checkFlower('down')){
				this.buhua('down');
			}
			game.sendMsg(this, game.networker, game.networker.msg.NEXTUSER_BUHUA, 'down');
		},
		
		initLayerAndPositions:function(){
			this.mjselfW = 76;
			this.mjselfH = 114;
			this.shmjW = 40;
			this.shmjH = 53;
			this.svmjW = 49;
			this.svmjH = 50;
			
			this.bglayer = new Hilo.Container().addTo(this);
			this.bglayer.pointerChildren = false;
			this.throwlayer = new Hilo.Container().addTo(this);
			this.throwlayer.pointerChildren = false;
			
			this.throwuplayer = new Hilo.Container().addTo(this);
			this.throwuplayer.pointerChildren = false;
			
			this.hualayer = new Hilo.Container().addTo(this);
			this.hualayer.pointerChildren = false;
			
			this.dealUpMjLayer   = new Hilo.Container().addTo(this);
			this.dealLeftMjLayer = new Hilo.Container().addTo(this);
			this.dealRightMjLayer = new Hilo.Container().addTo(this);
			this.dealDownMjLayer  = new Hilo.Container().addTo(this);
			
			
			this.selfMjInitx = this.width / 50;
			this.selfMjTakeInitx = this.maxMjHandle * 74 * game.scalefact + this.selfMjInitx + 50;
			
			this.initPostion = {
				down:{
					dealX:Math.floor(this.width * 0.02),
					dealY:Math.floor(this.height - 10 - this.mjselfH * game.scalefact),
					throwX:Math.floor(this.width * 0.3),
					throwY:Math.floor(this.height * 0.63),
					huaX:Math.floor(this.width * 0.3),
					huaY:Math.floor(this.height * 0.75),
					huaCount:0,
				},
				up:{
					dealX:Math.floor(this.width * 0.3),
					dealY:Math.floor(this.height * 0.125),
					throwX:Math.floor(this.width * 0.35),
					throwY:Math.floor(this.height * 0.33),
					huaX:Math.floor(this.width * 0.35),
					huaY:Math.floor(this.height * 0.23),
					huaCount:0,
				},
				left:{
					dealX:Math.floor(this.width * 0.13 - this.svmjW),
					dealY:Math.floor(this.height * 0.11),
					throwX:Math.floor(this.width * 0.12 + this.svmjH),
					throwY:Math.floor(this.height * 0.25),
					huaX:Math.floor(this.width * 0.16),
					huaY:Math.floor(this.height * 0.11),
					huaCount:0,
				},
				right:{
					dealX:Math.floor(this.width * 0.86),
					dealY:Math.floor(this.height * 0.10),
					throwX:Math.floor(this.width * 0.75),
					throwY:Math.floor(this.height * 0.25),
					huaX:Math.floor(this.width * 0.8),
					huaY:Math.floor(this.height * 0.25),
					huaCount:0,
				}
			};
		},
		
		setRoomInfo:function(){
			this.residueMjLabel = game.configdata.createBgTitletext('剩余'+game.mjdata.getResidueMj().toString()+'张', '18px 黑体', 'yellow', 'ui', 'login_bg9').addTo(this.bglayer);
			this.residueMjLabel.x = this.width / 2 - this.residueMjLabel.width - 50;
			this.residueMjLabel.y = this.height / 2 - this.residueMjLabel.height / 2;
			this.residueMjLabel.txt.text = '剩余'+game.mjdata.getResidueMj().toString()+'张';
			this.residueGamenumLabel = game.configdata.createBgTitletext('剩余3局', '18px 黑体', 'yellow', 'ui', 'login_bg9').addTo(this.bglayer);
			this.residueGamenumLabel.x = this.width / 2 + 50;
			this.residueGamenumLabel.y = this.height / 2 - this.residueMjLabel.height / 2;
			this.roomIdLabel = game.configdata.createBgTitletext('房间号:123980', '20px 黑体', 'white', 'ui', 'login_bg17').addTo(this.bglayer);
			this.roomIdLabel.x = this.width / 2 - this.roomIdLabel.width / 2;
			this.roomIdLabel.y = 0;
			this.pointer_mj = new game.Pointermj({ imgsource: 'ui', rectname: 'lsbattle_21', scaleX: game.scalefact, scaleY: game.scalefact, visible: false }).addTo(this);
			this.pointer_user = new game.Pointeruser({ imgsource: 'ui', rectname: 'battle_10', pivotx: 40, pivoty: 40, x: this.width / 2, y: this.height / 2, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.bglayer);
			var info = game.roominfo.getData();
			this.roomIdLabel.txt.text = '房间号：'+info.roomid;
			var btn01 = game.configdata.createScalebutton('ui','lsbattle_2',0,10).addTo(this);
			btn01.x = this.width - btn01.width * game.scalefact * 0.5 - 10;
			btn01.y = btn01.height * game.scalefact * 0.5 + 10;
			var btn02 = game.configdata.createScalebutton('ui','lsbattle_3',btn01.x,btn01.height * (game.scalefact+1)).addTo(this);
		},

		takemj: function() {
			var id = game.mjdata.dealOne();
			this.residueMjLabel.txt.text = '剩余'+game.mjdata.getResidueMj().toString()+'张';
			
			var mj = new game.MjSelf({ mjid: id, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.dealDownMjLayer);
			var x = this.selfMjTakeInitx;
			var y = this.height - mj.sheight - 10;
			mj.x = x;
			mj.y = y;
			mj.initx = mj.x;
			mj.inity = mj.y;
			this.selfmj_w = mj.swidth;
			this.selfmj_h = mj.sheight;
			this.isThrow = true;
			if(mj.mjid == this.goldmj.mjid) {
				mj.setGold();
			}
			if(this.checkOneMjFlower(mj.mjid) && this.isTurn){
				var self = this;
				new Hilo.Tween.to(this,{
					alpha:1,
				},{
					duration:10,
					delay:400,
					onComplete:function(){
						self.buhuaSingle('down',mj);
						self.takemj();
					}
				})
			}
		},
		
		otherTakemj:function(userdir){
			var self = this;
			var mjid = game.mjdata.dealOne();
			self.residueMjLabel.txt.text = '剩余'+game.mjdata.getResidueMj().toString()+'张';
			if(this.checkOneMjFlower(mjid)){
				self.throwFlower(mjid,userdir);
				self.otherTakemj(userdir);
				self.buhuaEffect(userdir);
			}else{
				switch(userdir){
					case 'up':
						self._throwmjup(mjid);
						break;
					case 'left':
						self._throwmjleft(mjid);
						break;
					case 'right':
						self._throwmjRight(mjid);
						break;
				}
			}
		},
		
		sortPlayerMj:function(playerdir){
			switch(playerdir){
				case 'up':
					this.sortMj(this.dealUpMjLayer,0,this.initPostion['up']['dealX'],1);
					break;
				case 'down':
					this.sortMj(this.dealDownMjLayer,0,this.initPostion['down']['dealX'],1,true);
					break;
				case 'left':
					this.sortMj(this.dealLeftMjLayer,1,this.initPostion['left']['dealY'],0.72);
					break;
				case 'right':
					this.sortMj(this.dealRightMjLayer,1,this.initPostion['right']['dealY'],0.72);
					break;
				default:
					this.sortMj(this.dealDownMjLayer,0,this.initPostion['down']['dealX'],1,true);
					break;
			}
		},

		//重排顺序   direct:0  横向  1:竖向
		sortMj: function(theMjlayer,direct,initpos,fact,isSelf) {
			if(!fact){
				fact = 1;
			}
			var l = theMjlayer.children;
			theMjlayer.sortChildren(this._sortmj);
			for(var i = 0; i < l.length; i++) {
				var mj = l[i];
				if(direct == 0){
					mj.x = mj.swidth * fact * i + initpos;
				}else{
					mj.y = mj.sheight * fact * i + initpos;
				}
				if(isSelf){
					mj.initx = mj.x;
					mj.inity = this.initPostion['down']['dealY'];
				}
			}
		},
		
		buhua:function(userdir){
			//console.log("-----------补花：%s'---------",userdir);
			var mjlist = null;
			var beThrowMjList = [];
			var x = this.width/2 - 300/2;
			var y = this.height/2 - 300/2;
			switch(userdir){
				case 'down':
					mjlist = this.dealDownMjLayer.children;
					y += 200;
					break;
				case 'up':
					mjlist = this.dealUpMjLayer.children;
					y -= 200;
					break;
				case 'left':
					mjlist = this.dealLeftMjLayer.children;
					x -= 300;
					break;
				case 'right':
					mjlist = this.dealRightMjLayer.children;
					x += 300;
					break;
			}
			for(var i = mjlist.length-1; i >0; i--) {
				var sendobj = mjlist[i];
				if(sendobj.mjid.indexOf('f') != -1 || sendobj.mjid.indexOf('h') != -1){
					//console.log('-------(%d):%s',i,sendobj.name);
					beThrowMjList.push(sendobj.mjid);
					sendobj.removeFromParent();
				}
			}
			for(var i=0;i<beThrowMjList.length;i++){
				this.throwFlower(beThrowMjList[i],userdir);
				var objdata = this.initPostion[userdir];
				switch(userdir){
					case 'down':
						var mj_down = new game.MjSelf({ mjid: game.mjdata.dealOne(), scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.dealDownMjLayer);
						mj_down.y = objdata['dealY'];
						break;
					case 'up':
						var mj_up = this.createDealMj(game.mjdata.dealOne(),1).addTo(this.dealUpMjLayer);
						mj_up.y =  objdata['dealY'];
						break;
					case 'left':
						var mj_left = this.createDealMj(game.mjdata.dealOne(),2).addTo(this.dealLeftMjLayer);
						mj_left.x =  objdata['dealX'];
						break;
					case 'right':
						var mj_right = this.createDealMj(game.mjdata.dealOne(),3).addTo(this.dealRightMjLayer);
						mj_right.x = objdata['dealX'];
						break;
				}
			}
			if(beThrowMjList.length > 0){
				this.sortPlayerMj(userdir);
				game.mjdata.createEffect('buhua',x,y,4).addTo(this);
			}
		},
		
		buhuaEffect:function(userdir){
			var x = this.width/2 - 300/2;
			var y = this.height/2 - 300/2;
			switch(userdir){
				case 'down':
					y += 200;
					break;
				case 'up':
					y -= 200;
					break;
				case 'left':
					x -= 300;
					break;
				case 'right':
					x += 300;
					break;
			}
			game.mjdata.createEffect('buhua',x,y,4).addTo(this);
		},
		
		buhuaSingle:function(userdir,sendobj){
			console.log("-----------单张补花：%s'---%s------",userdir,sendobj.name);
			var mjlayer = null;
			var x = this.width/2 - 300/2;
			var y = this.height/2 - 300/2;
			switch(userdir){
				case 'down':
					mjlayer = this.dealDownMjLayer;
					y += 200;
					break;
				case 'up':
					mjlayer = this.dealUpMjLayer;
					y -= 200;
					break;
				case 'left':
					mjlayer = this.dealLeftMjLayer;
					x -= 300;
					break;
				case 'right':
					mjlayer = this.dealRightMjLayer;
					x += 300;
					break;
			}
			sendobj.removeFromParent();
			this.sortPlayerMj(userdir);
			this.throwFlower(sendobj.mjid,userdir);
			game.mjdata.createEffect('buhua',x,y,4).addTo(this);
		},
		
		
		setTurnGold:function(){
			this.goldmj = new game.Goldmj({ mjid: game.configdata.createRandomMjid(), imgsource: 'ui', bgrectname: '15' }).addTo(this.bglayer);
			var list = this.dealDownMjLayer.children;
			for(var item in list) {
				var mj = list[item];
				if(mj.mjid == this.goldmj.mjid) {
					mj.setGold();
				}
			}
		},
		
		checkAllFlower:function(){
			return (this.initFlowers['down']+this.initFlowers['up']+this.initFlowers['left']+this.initFlowers['right']) == 0;
		},
		
		checkOneMjFlower:function(mjid){
			return (mjid.indexOf('f') != -1 || mjid.indexOf('h') != -1);
		},
		
		checkFlower:function(userdir){
			var mjlist = null;
			switch(userdir){
				case 'down':
					mjlist = this.dealDownMjLayer.children;
					break;
				case 'up':
					mjlist = this.dealUpMjLayer.children;
					break;
				case 'left':
					mjlist = this.dealLeftMjLayer.children;
					break;
				case 'right':
					mjlist = this.dealRightMjLayer.children;
					break;
			}
			var hasFlower = false;
			for(var i=mjlist.length -1;i>0;i--){
				var mjobj = mjlist[i];
				if(mjobj.mjid.indexOf('f') != -1 || mjobj.mjid.indexOf('h') != -1){
					hasFlower = true;
					break;
				}
			}
			return hasFlower;
		},
		
			
		throwFlower:function(mjid,userdir){
			var t = {
				up:1,down:1,left:2,right:2
			};
			var throwmj = this._getThrowMj(mjid,t[userdir]);
			var offsetW = throwmj.width*game.scalefact;
			var offsetH = throwmj.height* game.scalefact;
			
			var objdata = this.initPostion[userdir];
			if(userdir == 'up' || userdir == 'down'){
				var x = objdata['huaCount'] * offsetW + objdata['huaX'];
				var y = objdata['huaY'];
			}else{
				var y = objdata['huaCount'] * offsetH + objdata['huaY'];
				var x = objdata['huaX'];
			}
			objdata['huaCount']++;
			throwmj.x = x;
			throwmj.y = y;
		},
		
		_throwmjSelf: function(mjid,isMsg) {
			var throwmj = this._getThrowMj(mjid,1);
			var offsetW = throwmj.width*game.scalefact;
			if(game.scalefact <= 0.771){
				offsetW += 4;
			}
			if(game.scalefact == 1){
				offsetW -= 4;
			}
			var x = (this.throwDownNum % this.maxMjStack) * offsetW + this.initPostion['down']['throwX'];
			var y = -Math.floor(this.throwDownNum / this.maxMjStack) * throwmj.height + 5 + this.initPostion['down']['throwY'];
			throwmj.x = x;
			throwmj.y = y;
			
			this.throwDownNum++;
			this.throwlayer.sortChildren(this._sortByY);
			
			this.pointer_mj.visible = true;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			this.isTurn = false;
			if(isMsg){
				game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,0]);
			}
		},

		_throwmjup: function(mjid) {
			var throwmj = this._getThrowMj(mjid,1);
			var offsetW = throwmj.width*game.scalefact;
			if(game.scalefact <= 0.771){
				offsetW += 4;
			}
			if(game.scalefact == 1){
				offsetW -= 4;
			}
			var x = (this.throwUpNum % this.maxMjStack) * offsetW + this.initPostion['up']['throwX'];
			var y = Math.floor(this.throwUpNum / this.maxMjStack) * throwmj.height + this.initPostion['up']['throwY'];
			throwmj.x = x;
			throwmj.y = y;
			this.throwUpNum++;

			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,1]);
		},
		
		_throwmjleft: function(mjid) {
			var throwmj = this._getThrowMj(mjid,2);
			var y = (this.throwLeftNum % this.maxMjStack) * (throwmj.height-15) ;//+ this.width / 8 * 7;
			var x = Math.floor(this.throwLeftNum / this.maxMjStack) * throwmj.width;// + 170;
			throwmj.x = x + this.initPostion['left']['throwX'];
			throwmj.y = y + this.initPostion['left']['throwY'];
			this.throwLeftNum++;

			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,1]);
		},
		
		_throwmjRight: function(mjid) {
			var throwmj = this._getThrowMj(mjid,3);
			var y = (this.throwRightNum % this.maxMjStack) * (throwmj.height-15) ;//+ this.width / 8 * 7;
			var x = -Math.floor(this.throwRightNum / this.maxMjStack) * throwmj.width;// + 170;
			throwmj.x = x + this.initPostion['right']['throwX'];
			throwmj.y = y + this.initPostion['right']['throwY'];
			this.throwRightNum++;

			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,1]);
		},
		
		createDealMj:function(mjid,typemj,showback){
			var idname = mjid + "-"+ typemj.toString();
			var mj = null;
			var rectimg =null;
			
			mj = new game.MjScene({
				idname: idname,
				pointerEnable:false,
				scaleX:game.scalefact,
				scaleY:game.scalefact,
				showback:showback,
			});
			return mj;
		},
		
		_getThrowMj:function(mjid,typemj){
			game.sounds.playMj(mjid);
			var throwmj = this.createDealMj(mjid,typemj).addTo(this.throwlayer);
			throwmj.pointerEnabled = false;
			return throwmj;
		},
		
		_sortmj: function(mj1, mj2) {
			var mjid1 = mj1.mjid;
			var mjid2 = mj2.mjid;
			var mjid_1 = mjid1.split('_');
			var mjid_2 = mjid2.split('_');
			if(mj1.isGold && !mj2.isGold) {
				return -1;
			} else if(mj1.isGold && mj2.isGold) {
				return 0;
			} else if(!mj1.isGold && mj2.isGold){
				return 1;
			} else {
				if(mjid_1[0] > mjid_2[0]) {
					return 1;
				} else if(mjid_1[0] < mjid_2[0]) {
					return -1;
				} else {
					if(mjid_1[1] > mjid_2[1]) {
						return 1;
					} else if(mjid_1[1] < mjid_2[1]) {
						return -1;
					} else {
						return 0;
					}
				}
			}
		},
		
		_sortByY:function(a,b){
			if(a.y > b.y) {
				return 1;
			}else if(a.y < b.y) {
				return -1;
			}else{
				return 0;
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