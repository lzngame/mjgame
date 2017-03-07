(function(ns) {
	var PlayMainscene = ns.PlayMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.play,
		items: null,
		bglayer: null,
		mjlayer: null,
		currentmj: null,

		isTurn: false,
		isAllready:false,

		throwmjInitx: 0,
		throwmjInity: 0,
		throwNum: 0,
		throwupNum: 0,
		throwleftNum: 0,
		throwrightNum: 0,

		takmjbtn: null,
		isThrow: false,
		pointer_mj: null,
		pointer_user: null,

		selfmj_h: 0,
		selfmj_w: 0,
		
		goldmj:null,
		
		
		mjDirect:['down','left','up','right'],
		currentThrowIndex: null,
		
		maxMjStack:6,  //堆牌长度
		maxMjHandle:16,//手牌张数
		selfMjInitx:0, //玩家 --（down）摆牌的x 起始位置
		selfMjW:76,
		selfMjH:114,
		sideMjW:21,
		sideMjH:52,
		upMjW:35,
		upMjH:50,
		
		throwSelfInitx:0,
		throwSelfInity:0,
		
		upDealInitx:0,
		upDealInity:0,
		throwUpInitx:0,
		throwUpInity:0,
		
		leftDealInitx:0,
		leftDealInity:0,
		throwLeftInitx:0,
		throwLeftInity:0,
		
		rightDealInitx:0,
		rightDealInity:0,
		throwRightInitx:0,
		throwRightInity:0,
		
		residueMjLabel:null,	  //剩余牌数
		residueGamenumLabel:null, //剩余局数
		roomIdLabel:null,         //房间ID号

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
						self._throwmjSelf(sendobj.mjid);
						self.sortMj();
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
						self.selfThrow();
					}else{
						var mjid = game.mjdata.dealOne();
						self.residueMjLabel.txt.text = '剩余'+game.mjdata.getResidueMj().toString()+'张';
						switch(user){
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
					break;
			}
		},
		selfThrow:function(){
			var self = this;
			self.isTurn = true;
			self.takemj();
		},
		active: function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			this.initBg('bg', 'battle_bg');
			this._setThrowPostion();

			this.bglayer = new Hilo.Container().addTo(this);
			this.bglayer.pointerChildren = false;
			
			this.throwlayer = new Hilo.Container().addTo(this);
			this.throwlayer.pointerChildren = false;
			
			this.throwuplayer = new Hilo.Container().addTo(this);
			this.throwuplayer.pointerChildren = false;
			
			this.hualayer = new Hilo.Container().addTo(this);
			this.hualayer.pointerChildren = false;

			this.mjlayer = new Hilo.Container().addTo(this);
			
			this.selfMjInitx = this.width / 50;
			this.selfMjTakeInitx = this.maxMjHandle * 74 * game.scalefact + this.selfMjInitx + 50;

			game.mjdata.initMjQueue();
			
			this.deal();
			var self = this;
			
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
			this.setRoomInfo();
			
			
			var btn01 = game.configdata.createScalebutton('ui','lsbattle_2',0,10).addTo(this);
			btn01.x = this.width - btn01.width * game.scalefact * 0.5 - 10;
			btn01.y = btn01.height * game.scalefact * 0.5 + 10;
			var btn02 = game.configdata.createScalebutton('ui','lsbattle_3',btn01.x,btn01.height * (game.scalefact+1)).addTo(this);

			this.goldmj = new game.Goldmj({ mjid: game.configdata.createRandomMjid(), imgsource: 'ui', bgrectname: '15' }).addTo(this.bglayer);
			var list = this.mjlayer.children;
			for(var item in list) {
				var mj = list[item];
				if(mj.mjid == this.goldmj.mjid) {
					mj.setGold();
				}
			}
			this.sortMj();
			this.takemj();
			this.buhua();
			this.isTurn = true;
		},
		_setThrowPostion:function(){
			this.throwSelfInitx = this.width * 0.25;
			this.throwSelfInity = this.height - (2*this.upMjH + this.selfMjH) -10;
			this.upDealInitx = this.width *3/8;
			this.throwUpInitx = 0;
			this.throwUpInity = 0;
			this.throwLeftInitx=0;
			this.throwLeftInity=0;
			
			this.rightDealInitx = this.width *7/8;
			this.throwRightInitx = this.width *7/8 - 100;
			this.throwRightInity=0;
		},
		
		setRoomInfo:function(){
			var info = game.roominfo.getData();
			this.roomIdLabel.txt.text = '房间号：'+info.roomid;
		},

		
		
		

		takemj: function() {
			var id = game.mjdata.dealOne();
			this.residueMjLabel.txt.text = '剩余'+game.mjdata.getResidueMj().toString()+'张';
			
			var mj = new game.MjSelf({ mjid: id, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.mjlayer);
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
		},

		sortMj: function() {
			var l = this.mjlayer.children;
			this.mjlayer.sortChildren(this._sortmj);
			for(var i = 0; i < l.length; i++) {
				var mj = l[i];
				mj.x = (mj.swidth) * i + this.selfMjInitx;
				mj.y = this.height - 10 - mj.sheight;
				mj.initx = mj.x;
				mj.inity = mj.y;
			}
		},

		deal: function() {
			for(var i = 0; i < this.maxMjHandle; i++) {
				//self -down
				this.addMj(game.mjdata.dealOne());
				//up
				var mjid = game.mjdata.dealOne();
				var x = i * 32 + this.upDealInitx;
				var y = 70;
				var throwmj = this._getThrowMj(mjid,1).addTo(this);
				throwmj.x = x;
				throwmj.y = y;
				//lfet
				var offsetx = 30 * game.scalefact;
				mjid = game.mjdata.dealOne();
				x = 70;
				y = i*offsetx + 150;
				throwmj = this._getThrowMj(mjid,2).addTo(this);
				throwmj.x = x;
				throwmj.y = y;
				
				//right
				mjid = game.mjdata.dealOne();
				x = this.rightDealInitx;
				y = i*offsetx + 150;
				throwmj = this._getThrowMj(mjid,3).addTo(this);
				throwmj.x = x;
				throwmj.y = y;
			}
		},
		
		buhua:function(){
			console.log('--------------------------补花---------------------');
			var l = this.mjlayer.children;
			var n = 0;
			for(var i = l.length-1; i >0; i--) {
				var sendobj = l[i];
				if(sendobj.mjid.indexOf('f') != -1 || sendobj.mjid.indexOf('h') != -1){
					console.log('-------(%d):%s',i,sendobj.name);
					sendobj.removeFromParent();
					n++;
				}
			}
			for(var i=0;i<n;i++){
				var id = game.mjdata.dealOne();
				var mj = new game.MjSelf({ mjid: id, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.mjlayer);
			}
			this.sortMj();
			//if(this._checkFlower(l)){
			//	this.buhua();
			//}
		},
		_checkFlower:function(mjList){
			var hasFlower = false;
			for(var i=mjList.length -1;i>0;i--){
				var mjobj = mjList[i];
				if(mjobj.mjid.indexOf('f') != -1 || mjobj.mjid.indexOf('h') != -1){
					hasFlower = true;
					break;
				}
			}
			return hasFlower;
		},

		addMj: function(mjid) {
			var mj_tmp1 = new game.MjSelf({ mjid: mjid, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.mjlayer);
			this.sortMj();
		},
		
		_throwmjSelf: function(mjid) {
			var throwmj = this._getThrowMj(mjid,1);
			var offsetW = throwmj.width*game.scalefact;
			if(game.scalefact <= 0.771){
				offsetW += 4;
			}
			if(game.scalefact == 1){
				offsetW -= 4;
			}
			var x = (this.throwNum % this.maxMjStack) * offsetW + this.throwSelfInitx;
			var y = -Math.floor(this.throwNum / this.maxMjStack) * throwmj.height + 5 + this.throwSelfInity;
			throwmj.x = x;
			throwmj.y = y;
			
			this.throwNum++;
			this.throwlayer.sortChildren(this._sortByY);
			
			this.pointer_mj.visible = true;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			this.isTurn = false;
			game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,0]);
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
			var x = -(this.throwupNum % this.maxMjStack) * offsetW + this.width / 8 * 5;
			var y = Math.floor(this.throwupNum / this.maxMjStack) * throwmj.height + 170;
			throwmj.x = x;
			throwmj.y = y;
			this.throwupNum++;

			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,1]);
		},
		
		_throwmjleft: function(mjid) {
			var throwmj = this._getThrowMj(mjid,2);
			var y = (this.throwleftNum % this.maxMjStack) * (throwmj.height-15) ;//+ this.width / 8 * 7;
			var x = Math.floor(this.throwleftNum / this.maxMjStack) * throwmj.width;// + 170;
			throwmj.x = x + 130;
			throwmj.y = y + 90;
			this.throwleftNum++;

			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,1]);
		},
		
		_throwmjRight: function(mjid) {
			var throwmj = this._getThrowMj(mjid,3);
			var y = (this.throwrightNum % this.maxMjStack) * (throwmj.height-15) ;//+ this.width / 8 * 7;
			var x = -Math.floor(this.throwrightNum / this.maxMjStack) * throwmj.width;// + 170;
			throwmj.x = x + this.throwRightInitx;
			throwmj.y = y + 250;
			this.throwrightNum++;

			throwmj.pointerEnabled = false;
			this.pointer_mj.x = throwmj.x;
			this.pointer_mj.y = throwmj.y - 50;
			
			game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid,1]);
		},
		
		_getThrowMj:function(mjid,typemj){
			//game.sounds.playMj(mjid);
			var idname = mjid + "-"+ typemj.toString();
			var throwmj = new game.MjScene({ mjid: idname }).addTo(this.throwlayer);
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