(function(ns) {
	var PlayMainscene = ns.PlayMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.play,
		items: null,
		bglayer: null,
		currentmj: null,
		mjDirect: null,
		currentThrowIndex: null,
		currentThrowMj: null,      //打出的手牌

		isTurn: false,
		isThrow: false,
		throwDownNum: 0,
		throwUpNum: 0,
		throwLeftNum: 0,
		throwRightNum: 0,
		ishuangzhuang: false,
		downPutx: 0,
		downPuty: 0,

		pointer_mj: null,
		pointer_user: null,
		goldmj: null,
		initFlowers: null,

		maxMjStack: 9, //堆牌长度
		maxMjHandle: 16, //手牌张数

		dealUpMjLayer: null,
		dealDownMjLayer: null,
		dealLeftMjLayer: null,
		dealRightMjLayer: null,

		residueMjLabel: null, //剩余牌数
		residueGamenumLabel: null, //剩余局数
		roomIdLabel: null, //房间ID号
		bankerDir: 'down', //庄家位置
		skipOverBtn: null,

		constructor: function(properties) {
			PlayMainscene.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			console.log('%s init', this.name);
			this.width = game.configdata.mainStageSize.width;
			this.height = game.configdata.mainStageSize.height;
			this.items = {};
			game.playsceneUidata.init(this.width, this.height);
		},

		active: function(data) {
			console.log('%s active:', this.name);
			var self = this;
			this.addTo(game.stage);
			this.initBg('bg', 'battle_bg');
			this.x = 0;
			this.y = 0;
			this.resetDefault();
			this.initLayerAndPositions();
			this.setRoomInfo();
			this.deal(game.roominfo.getData().playerNums);
			this.setTurnGold();
			this.takemj();
			this.turnBuhua();
		},

		executeMsg: function(sendobj, msgtype, msgdata) {
			var self = this;
			switch(msgtype) {
				case game.networker.msg.HUANGZHUANG:
					self.isTurn = false;
					console.log('huangzhuang');
					self.huangzhuang();
					break;
				case game.networker.msg.BESELECT:
					if(self.currentmj)
						self.currentmj.backQueue();
					self.currentmj = sendobj;
					console.log('点选手牌:%s', game.mjdata.mj[sendobj.mjid][0]);
					break;
				case game.networker.msg.BETHROW:
					if(self.isTurn) {
						sendobj.removeFromParent();
						self.throwOneMj('down', sendobj.mjid);
						self.sortPlayerMj('down');
						self.setDownChipos();
						console.log('扔掉手牌：%s', game.mjdata.mj[sendobj.mjid][0]);
					} else {
						console.log('放回手牌：%s', game.mjdata.mj[sendobj.mjid][0]);
						sendobj.backQueue();
					}
					self.currentmj = null;
					self.isThrow = false;
					break;
				case game.networker.msg.NEXTUSER_HANDLE:
					self.checkChipenggang(msgdata[0], msgdata[1]);
					break;
				case game.networker.msg.NEXTUSER_BUHUA:
					self.currentThrowIndex++;
					if(self.currentThrowIndex >= self.mjDirect.length) {
						self.currentThrowIndex = 0;
					}
					var user = self.mjDirect[self.currentThrowIndex];
					if(self.checkFlower(user)) {
						self.buhua(user);
					} else {
						self.initFlowers[user] = 0;
					}
					if(!self.checkAllFlower()) {
						game.sendMsg(this, game.networker, game.networker.msg.NEXTUSER_BUHUA, 'down');
					} else {
						self.isTurn = true;
						self.currentThrowIndex = 0;
					}
					break;
				case game.networker.msg.SHOWTALK:
					self.showtalk(msgdata[0], msgdata[1], msgdata[2], msgdata[3]);
					break;
				case game.networker.msg.MJPENG:
					game.sounds.playMjAction(1);
					self.actionBeforeChigang();
					self.actionPeng(msgdata);
					break;
				case game.networker.msg.MJGANG:
					game.sounds.playMjAction(2);
					self.actionBeforeChigang();
					self.takemj();
					self.actionPeng(msgdata, true);
					break;
				case game.networker.msg.MJCHI:
					game.sounds.playMjAction(0);
					self.actionBeforeChigang();
					var pos = msgdata[1];
					self.actionChi(msgdata[0], pos);
					break;
			}
		},
		
		//吃碰杠之前的动作-- 清除牌面中的牌，隐藏指示器，回退一个位置
		actionBeforeChigang: function() {
			var self = this;
			self.pointer_mj.visible = false;
			self.currentThrowMj.removeFromParent();
			var userdir = self.mjDirect[self.currentThrowIndex];
			if(userdir == 'down')
				self.throwDownNum--;
			if(userdir == 'up')
				self.throwUpNum--;
			if(userdir == 'left')
				self.throwLeftNum--;
			if(userdir == 'right')
				self.throwRightNum--;
			self.currentThrowIndex = 0;
			self.isTurn = true;
		},

		actionPeng: function(mjid, isgang) {
			var mjlist = this.dealDownMjLayer.children;
			var peng = 0;
			var w = 0;
			var l = 2;
			if(isgang) {
				l = 3;
			}
			for(var i = mjlist.length - 1; i > -1; i--) {
				var item = mjlist[i];
				var w = item.swidth;
				console.log('%s:%s', i, item.name);
				if(item.mjid == mjid) {
					if(peng < l) {
						console.log(i);
						item.removeFromParent();
						peng++;
						if(peng == l)
							break;
					}
				}
			}
			var initx = this.downChiLayer.children.length;
			var middlex, middley;
			for(var i = 0; i < l + 1; i++) {
				var mj = new game.MjImg({ isput: true, mjid: mjid, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.downChiLayer);
				mj.x = i * mj.swidth + initx * mj.swidth;
				mj.y = mj.sheight * 0.05;
				if(i == 1) {
					middlex = mj.x;
					middley = mj.y;
				}
				if(isgang && i == l) {
					mj.x = middlex;
					mj.y = middley - mj.sheight * 0.1;
				}
			}
			this.setDownChipos();
		},

		//chipos 0:左张  1：右张  2：卡张
		actionChi: function(mjid, chipos) {
			var mjlist = this.dealDownMjLayer.children;
			var ist1 = true;
			var ist2 = true;
			var t1, t2;
			var mjteam = game.mjdata.getChiQueue(mjid, chipos);
			if(chipos == 0) {
				t1 = mjteam[1];
				t2 = mjteam[2];
			}
			if(chipos == 1) {
				t1 = mjteam[0];
				t2 = mjteam[1];
			}
			if(chipos == 2) {
				t1 = mjteam[0];
				t2 = mjteam[2];
			}

			for(var i = mjlist.length - 1; i > -1; i--) {
				var item = mjlist[i];
				if(item.mjid == t1 && ist1) {
					ist1 = false;
					item.removeFromParent();
					console.log(item.name);
				}
				if(item.mjid == t2 && ist2) {
					ist2 = false;
					item.removeFromParent();
					console.log(item.name);
				}
			}

			var initx = this.downChiLayer.children.length;
			for(var i = 0; i < mjteam.length; i++) {
				var mj = new game.MjImg({ isput: true, mjid: mjteam[i], scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.downChiLayer);
				mj.x = i * mj.swidth + initx * mj.swidth;
				mj.y = mj.sheight * 0.05;
			}
			this.setDownChipos();
		},

		setDownChipos: function() {
			var mjlist = this.dealDownMjLayer.children;
			var w = mjlist[0].swidth;
			var x = game.playsceneUidata.initPostion['down']['dealX'];
			var y = game.playsceneUidata.initPostion['down']['dealY'];
			this.downChiLayer.x = mjlist.length * w + x;
			this.downChiLayer.y = y;
			this.sortPlayerMj('down');
		},

		checkChipenggang: function(mjid, userdir) {
			var resultList = [0, 0, 0, 0];
			var count = this.checkPeng(mjid, this.dealDownMjLayer.children);
			var result = this.checkChi(mjid, this.dealDownMjLayer.children);
			if(count <= 1 && !result[0] && !result[1] && !result[2]) {
				this.turnNext();
			} else {
				if(userdir != 'down') {
					if(count == 2) {
						resultList = [0, 1, 0, 0];
					}
					if(count == 3) {
						resultList = [0, 1, 0, 1];
					}
					if((userdir == 'right' && game.roominfo.playerNums == 4) ||
						(userdir == 'up' && (game.roominfo.playerNums == 3 || game.roominfo.playerNums == 2))
					) {
						if(result[0] || result[1] || result[2]) {
							resultList[2] = 1;
						}
					}
					if(resultList[0]+resultList[1]+resultList[2]+resultList[3] != 0) {
						console.log(resultList);
						this.pointer_user.setDirect('down');
						
						this.skipOverBtn.setData(mjid, resultList,result);
					} else {
						this.turnNext();
					}

				} else {
					this.turnNext();
				}
			}
		},

		//如果要查看牌 ,可以把 createDealMj 的最后一个参数去掉，左右的牌行，缩放改为0.72
		//playNumber :2,3,4 
		deal: function(playNumber) {
			for(var i = 0; i < this.maxMjHandle; i++) {
				//self -down
				var mj_down = new game.MjSelf({ mjid: game.mjdata.dealOne(), scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.dealDownMjLayer);
				mj_down.x = mj_down.swidth * i + game.playsceneUidata.initPostion['down']['dealX'];
				mj_down.y = game.playsceneUidata.initPostion['down']['dealY'];
				this.downPutx = mj_down.x + mj_down.width;
				this.downPuty = mj_down.y;
				//up
				var mj_up = this.createDealMj(game.mjdata.dealOne(), 1, 1).addTo(this.dealUpMjLayer);
				mj_up.x = mj_up.swidth * i + game.playsceneUidata.initPostion['up']['dealX'];
				mj_up.y = game.playsceneUidata.initPostion['up']['dealY'];
				//lfet
				if(playNumber >= 3) {
					var mj_left = this.createDealMj(game.mjdata.dealOne(), 2, 2).addTo(this.dealLeftMjLayer);
					mj_left.x = game.playsceneUidata.initPostion['left']['dealX'];
					mj_left.y = (mj_left.sheight * 0.5) * i + game.playsceneUidata.initPostion['left']['dealY'];
				}
				//right
				if(playNumber == 4) {
					var mj_right = this.createDealMj(game.mjdata.dealOne(), 3, 3).addTo(this.dealRightMjLayer);
					mj_right.x = game.playsceneUidata.initPostion['right']['dealX'];
					mj_right.y = (mj_right.sheight * 0.5) * i + game.playsceneUidata.initPostion['right']['dealY'];
				}
			}

			this.sortPlayerMj('down');
			this.sortPlayerMj('up');
			this.sortPlayerMj('right');
			this.sortPlayerMj('left');
		},

		turnBuhua: function() {
			game.sendMsg(this, game.networker, game.networker.msg.NEXTUSER_BUHUA, 'down');
		},

		turnNext: function() {
			var self = this;
			if(self.ishuangzhuang)
				return;
			self.currentThrowIndex++;
			if(self.currentThrowIndex >= self.mjDirect.length) {
				self.currentThrowIndex = 0;
			}
			var user = self.mjDirect[self.currentThrowIndex];
			self.pointer_user.setDirect(user);
			console.log('dir:%s',user);
			if(user == 'down') {
				self.isTurn = true;
				self.takemj();
			} else {
				self.otherTakemj(user);
			}
		},

		checkPeng: function(mjid, mjlist) {
			var count = 0;
			for(var index in mjlist) {
				var item = mjlist[index];
				if(item.mjid == mjid) {
					count++;
				}
			}
			if(count == 2) {
				console.log('%s 砰', mjid);
			}
			if(count == 3 || count == 4) {
				console.log('%s 杠', mjid);
			}
			return count;
		},

		checkChi: function(mjid, mjlist) {
			var tmp = mjid.split('_');
			var mjHead = tmp[0];
			var mjOrder = tmp[1];
			var result = [false, false, false];
			//左张
			var left1 = mjHead + '_' + (parseInt(mjOrder) + 1);
			var left2 = mjHead + '_' + (parseInt(mjOrder) + 2);
			if(this.checkMjIn(left1, mjlist) && this.checkMjIn(left2, mjlist))
				result[0] = true;
			//右张
			var right1 = mjHead + '_' + (parseInt(mjOrder) - 1);
			var right2 = mjHead + '_' + (parseInt(mjOrder) - 2);
			if(this.checkMjIn(right1, mjlist) && this.checkMjIn(right2, mjlist))
				result[1] = true;
			//卡张
			var l1 = mjHead + '_' + (parseInt(mjOrder) - 1);
			var r1 = mjHead + '_' + (parseInt(mjOrder) + 1);
			if(this.checkMjIn(l1, mjlist) && this.checkMjIn(r1, mjlist))
				result[2] = true;
			return result;
		},

		checkMjIn: function(mjid, mjlist) {
			var result = false;
			for(var i in mjlist) {
				var item = mjlist[i];
				if(item.mjid == mjid) {
					result = true;
					break;
				}
			}
			return result;
		},

		initLayerAndPositions: function() {
			this.mjselfW = 76;
			this.mjselfH = 114;
			this.shmjW = 40;
			this.shmjH = 53;
			this.svmjW = 49;
			this.svmjH = 50;
			this.slideMjWidth = 21;
			this.slideMjHeight = 52;

			this.bglayer = new Hilo.Container().addTo(this);
			this.bglayer.pointerChildren = false;
			this.throwlayer = new Hilo.Container().addTo(this);
			this.throwlayer.pointerChildren = false;
			this.throwuplayer = new Hilo.Container().addTo(this);
			this.throwuplayer.pointerChildren = false;
			this.hualayer = new Hilo.Container().addTo(this);
			this.hualayer.pointerChildren = false;
			this.dealUpMjLayer = new Hilo.Container().addTo(this);
			this.dealLeftMjLayer = new Hilo.Container().addTo(this);
			this.dealRightMjLayer = new Hilo.Container().addTo(this);
			this.dealDownMjLayer = new Hilo.Container().addTo(this);
			this.selfMjInitx = this.width / 50;
			this.selfMjTakeInitx = this.maxMjHandle * 74 * game.scalefact + this.width / 50 + 50;

			this.downChiLayer = new Hilo.Container().addTo(this);
		},

		setRoomInfo: function() {
			var self = this;
			this.residueMjLabel = game.configdata.createBgTitletext('剩余' + game.networker.getResidueMj().toString() + '张', '18px 黑体', 'yellow', 'ui', 'login_bg9', 'center').addTo(this.bglayer);
			this.residueMjLabel.x = this.width / 2 - this.residueMjLabel.width - 50;
			this.residueMjLabel.y = this.height / 2 - this.residueMjLabel.height / 2;
			this.residueMjLabel.txt.text = '剩余' + game.networker.getResidueMj().toString() + '张';
			this.residueGamenumLabel = game.configdata.createBgTitletext('剩余' + game.roominfo.totalCount + '局', '18px 黑体', 'yellow', 'ui', 'login_bg9', 'center').addTo(this.bglayer);
			this.residueGamenumLabel.x = this.width / 2 + 50;
			this.residueGamenumLabel.y = this.height / 2 - this.residueMjLabel.height / 2;
			this.roomIdLabel = game.configdata.createBgTitletext('房间号:123980', '20px 黑体', 'white', 'ui', 'login_bg17', 'center').addTo(this.bglayer);
			this.roomIdLabel.x = this.width / 2 - this.roomIdLabel.width / 2;
			this.roomIdLabel.y = 0;
			this.pointer_mj = new game.Pointermj({ imgsource: 'ui', rectname: 'lsbattle_21', scaleX: game.scalefact, scaleY: game.scalefact, visible: false }).addTo(this);
			this.pointer_mj.alpha = 0.8;
			this.pointer_user = new game.Pointeruser({ imgsource: 'ui', rectname: 'battle_10', pivotx: 40, pivoty: 40, x: this.width / 2, y: this.height / 2, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.bglayer);
			var info = game.roominfo.getData();
			this.roomIdLabel.txt.text = '房间号：' + info.roomid;
			var settingbtn = game.configdata.createScalebutton('ui', 'lsbattle_2', 0, 10).addTo(this);
			settingbtn.x = this.width - settingbtn.width * game.scalefact * 0.5 - 10;
			settingbtn.y = settingbtn.height * game.scalefact * 0.5 + 10;
			var talkbtn = game.configdata.createScalebutton('ui', 'lsbattle_3', settingbtn.x, settingbtn.height * (game.scalefact + 1)).addTo(this);
			talkbtn.on(Hilo.event.POINTER_END, function(e) {
				self.showTalkpanel(self);
			});

			if(info.playerNums == 4) {
				this.mjDirect = ['down', 'left', 'up', 'right'];
				this.maxMjStack = 9;
			}
			if(info.playerNums == 3) {
				this.mjDirect = ['down', 'left', 'up'];
				this.maxMjStack = 12;
			}
			if(info.playerNums == 2) {
				this.mjDirect = ['down', 'up'];
				this.maxMjStack = 24;
			}
			this.setPortrait();
			this.setHandleBtn();
		},
		
		showChiSelect: function(mjid, result){
			var self = this;
			var selectpanel = new game.ChiMjSelectPanel({ chiresult: result, mjid: mjid, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this);
			selectpanel.x = this.width  / 2 - selectpanel.width * game.scalefact / 2;
			selectpanel.y = this.height * 0.6 * game.scalefact;
			console.log('宽高：%d',selectpanel.width);
			selectpanel.func = function(chipos) {
				selectpanel.removeFromParent();
				game.sendMsg(this, game.networker, game.networker.msg.MJCHI, [mjid, chipos]);
			};
			selectpanel.passbtn.handler = function(){
				selectpanel.removeFromParent();
				self.turnNext();
			};
		},

		setHandleBtn: function() {
			var self = this;
			this.skipOverBtn = new game.HandleMjBtn({playscene: this, x: this.width * 0.6, y: this.height * 0.6 ,scaleX: game.scalefact, scaleY: game.scalefact}).addTo(this);
			this.skipOverBtn.visible = false;
			this.skipOverBtn.pass.on(Hilo.event.POINTER_START, function(e) {
				self.turnNext();
			});
			this.skipOverBtn.funcHu = function(mjid) {

			};
			this.skipOverBtn.funcChi = function(mjid, data) {
				var result = self.checkChi(mjid, self.dealDownMjLayer.children);
				var typecount = game.mjdata.getChiTypeCount(result);
				if(typecount == 1) {
					var chipos = game.mjdata.getChiPos(result);
					game.sendMsg(self, game.networker, game.networker.msg.MJCHI, [mjid, chipos]);
				} else {
					self.showChiSelect(mjid, result);
				}
			};
			this.skipOverBtn.funcPeng = function(mjid, data) {
				game.sendMsg(self, game.networker, game.networker.msg.MJPENG, mjid);
			};
			this.skipOverBtn.funcGang = function(mjid, data) {
				game.sendMsg(self, game.networker, game.networker.msg.MJGANG, mjid);
			};
		},

		setPortrait: function() {
			game.userdata.init();
			for(var i in this.mjDirect) {
				var dir = this.mjDirect[i];
				var userData = game.userdata.userInfo[dir];
				var x = game.playsceneUidata.initPostion[dir]['userX'];
				var y = game.playsceneUidata.initPostion[dir]['userY'];
				var name = game.userdata.userInfo[dir]['idname'];
				var score = game.userdata.userInfo[dir]['score'];
				var isbank = game.userdata.userInfo[dir]['isbank'];
				var portrait = new game.MjPortrait({ x: x, y: y, username: name, score: score, isbank: isbank }).addTo(this.bglayer);
			}
		},

		showTalkpanel: function(sceneself) {
			var panel = new game.ShowTalkpanel({ parentscene: sceneself, targetscene: game.configdata.SCENE_NAMES.play });
			panel.addTo(sceneself);
		},

		hidepanel: function() {
			console.log('删除输入框');
			var panel = this.getChildById(this.panelid);
			panel.hide();
			this.panelid = null;
		},

		huangzhuang: function() {
			game.roominfo.totalCount--;
			var st = '剩余' + game.roominfo.totalCount + '局';
			this.residueGamenumLabel.txt.text = st;

			this.ishuangzhuang = true;
			var self = this;
			var img = game.configdata.createRectImg('ui', 'battle_108', 0, 0, 1).addTo(this);
			img.pivotX = img.width / 2;
			img.pivotY = img.height / 2;
			img.x = this.width / 2;
			img.y = this.height / 2;
			img.scaleX = img.scaleY = 0.5;
			new Hilo.Tween.to(img, {
				scaleX: 1,
				scaleY: 1,
			}, {
				delay: 200,
				duration: 400,
				ease: Hilo.Ease.Bounce.EaseOut,
				onComplete: function() {
					new Hilo.Tween.to(img, {
						alpha: 0.3
					}, {
						delay: 100,
						duration: 300,
						onComplete: function() {
							if(game.roominfo.totalCount <= 0) {
								game.roominfo.isCreate = false;
								game.switchScene(game.configdata.SCENE_NAMES.main, 'balanceaccount');
							} else {
								self.createBalanceaccountWindow(self);
							}
						}
					})
				}
			});
		},

		createBalanceaccountWindow: function(self) {
			var panel = game.configdata.createBgPanel([], 'login_bg35', true, true, self, 'login_13', 'login_14', 'ui', 55, 'login_bg111', 'login_bg81');
			panel.addTo(self);
			var inity = panel.height * game.scalefact * 0.125;
			for(var i in self.mjDirect) {
				var dir = self.mjDirect[i];
				var l = null;
				if(dir == 'down')
					l = self.dealDownMjLayer.children;
				if(dir == 'up')
					l = self.dealUpMjLayer.children;
				if(dir == 'right')
					l = self.dealRightMjLayer.children;
				if(dir == 'left')
					l = self.dealLeftMjLayer.children;
				var queue = new game.BalanceAccountMjqueue({ y: inity, l: l, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(panel);
				queue.x = panel.width * game.scalefact / 2 - queue.width * game.scalefact / 2;
				inity += queue.height * game.scalefact * 1.05;
			}
			var l = this.dealDownMjLayer.children;

			var btn = new game.IconButton({
				imgsource: 'ui',
				btnupimg: 'login_10',
				btndownimg: 'login_11',
				iconimg: 'login_bg79',
				scaleX: game.scalefact,
				scaleY: game.scalefact,
			}).addTo(panel);
			btn.x = panel.width * game.scalefact / 2 - btn.width * game.scalefact / 2 - btn.width * game.scalefact / 2;
			btn.y = panel.height * game.scalefact * (7 / 8);

			var btn2 = new game.IconButton({
				imgsource: 'ui',
				btnupimg: 'login_bg65',
				btndownimg: 'login_bg66',
				iconimg: 'login_bg83',
				scaleX: game.scalefact,
				scaleY: game.scalefact,
			}).addTo(panel);
			btn2.x = panel.width * game.scalefact / 2 - btn.width * game.scalefact / 2 + btn.width * game.scalefact / 2;
			btn2.y = panel.height * game.scalefact * (7 / 8);

			btn.handler = function() {
				self.destory();
				self.active();
			};
		},

		showtalk: function(userdir, showtype, txt, sound) {
			var x = game.playsceneUidata.initPostion[userdir]['userX'];
			var y = game.playsceneUidata.initPostion[userdir]['userY'];
			var ids = {
				up: [3, 74, 74],
				down: [0, 0, 74],
				left: [0, 0, 74],
				right: [1, 0, 120],
			};
			var placement = ids[userdir][0];
			var disy = ids[userdir][1] * game.scalefact;
			var disx = ids[userdir][2] * game.scalefact;

			this.hidepanel();
			if(showtype == 'text')
				var talklayer = new game.Chatbubble({ x: x + disx, y: y + disy, delaytime: 2000, txt: txt, placement: placement }).addTo(this);
			else
				var talklayer = new game.Chatbubble({ x: x + disx, y: y + disy, delaytime: 2000, rectname: txt, placement: placement }).addTo(this);
			if(sound)
				game.sounds.playTalk(sound);
		},

		takemj: function() {
			var id = game.mjdata.dealOne();
			this.residueMjLabel.txt.text = '剩余' + game.networker.getResidueMj().toString() + '张';

			var mj = new game.MjSelf({ mjid: id, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.dealDownMjLayer);
			var x = this.selfMjTakeInitx;
			var y = this.height - mj.sheight - 10;
			mj.x = x;
			mj.y = y;
			mj.initx = mj.x;
			mj.inity = mj.y;

			this.isThrow = true;
			this.checkOneGold(mj);

			if(this.checkPeng(mj.mjid, this.dealDownMjLayer.children) == 4) {
				this.skipOverBtn.setData(mj.mjid, [0, 0, 0, 1]);
			}

			if(this.checkOneMjFlower(mj.mjid) && this.isTurn) {
				var self = this;
				new Hilo.Tween.to(this, {
					alpha: 1,
				}, {
					duration: 10,
					delay: 400,
					onComplete: function() {
						self.buhuaSingle('down', mj);
						self.takemj();
					}
				})
			}
		},

		otherTakemj: function(userdir) {
			var self = this;
			var mjid = game.mjdata.dealOne();
			self.residueMjLabel.txt.text = '剩余' + game.networker.getResidueMj().toString() + '张';
			if(this.checkOneMjFlower(mjid)) {
				self.throwFlower(mjid, userdir);
				self.otherTakemj(userdir);
				self.buhuaEffect(userdir);
			} else {
				self.throwOneMj(userdir, mjid);
			}
		},

		sortPlayerMj: function(playerdir) {
			switch(playerdir) {
				case 'up':
					this.sortMj(this.dealUpMjLayer, 0, game.playsceneUidata.initPostion['up']['dealX'], 1);
					break;
				case 'down':
					this.sortMj(this.dealDownMjLayer, 0, game.playsceneUidata.initPostion['down']['dealX'], 1, true);
					break;
				case 'left':
					this.sortMj(this.dealLeftMjLayer, 1, game.playsceneUidata.initPostion['left']['dealY'], 0.5);
					break;
				case 'right':
					this.sortMj(this.dealRightMjLayer, 1, game.playsceneUidata.initPostion['right']['dealY'], 0.5);
					break;
				default:
					this.sortMj(this.dealDownMjLayer, 0, game.playsceneUidata.initPostion['down']['dealX'], 1, true);
					break;
			}
		},

		//重排顺序   direct:0  横向  1:竖向
		sortMj: function(theMjlayer, direct, initpos, fact, isSelf) {
			if(!fact) {
				fact = 1;
			}
			var l = theMjlayer.children;
			theMjlayer.sortChildren(this._sortmj);
			for(var i = 0; i < l.length; i++) {
				var mj = l[i];
				if(direct == 0) {
					mj.x = mj.swidth * fact * i + initpos;
				} else {
					mj.y = mj.sheight * fact * i + initpos;
				}
				if(isSelf) {
					mj.setInitPos(mj.x, game.playsceneUidata.initPostion['down']['dealY']);
				}
			}
		},

		buhua: function(userdir) {
			console.log("-----------补花：%s'---------", userdir);
			var mjlist = null;
			var beThrowMjList = [];
			var x = this.width / 2 - 300 / 2;
			var y = this.height / 2 - 300 / 2;
			switch(userdir) {
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
			for(var i = mjlist.length - 1; i > 0; i--) {
				var sendobj = mjlist[i];
				if(sendobj.mjid.indexOf('f') != -1 || sendobj.mjid.indexOf('h') != -1) {
					beThrowMjList.push(sendobj.mjid);
					sendobj.removeFromParent();
				}
			}
			for(var i = 0; i < beThrowMjList.length; i++) {
				this.throwFlower(beThrowMjList[i], userdir);
				var objdata = game.playsceneUidata.initPostion[userdir];
				switch(userdir) {
					case 'down':
						var mj_down = new game.MjSelf({ mjid: game.mjdata.dealOne(), scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.dealDownMjLayer);
						mj_down.y = objdata['dealY'];
						this.checkOneGold(mj_down);
						break;
					case 'up':
						var mj_up = this.createDealMj(game.mjdata.dealOne(), 1, 1).addTo(this.dealUpMjLayer);
						mj_up.y = objdata['dealY'];
						break;
					case 'left':
						var mj_left = this.createDealMj(game.mjdata.dealOne(), 2, 2).addTo(this.dealLeftMjLayer);
						mj_left.x = objdata['dealX'];
						break;
					case 'right':
						var mj_right = this.createDealMj(game.mjdata.dealOne(), 3, 3).addTo(this.dealRightMjLayer);
						mj_right.x = objdata['dealX'];
						break;
				}
				this.residueMjLabel.txt.text = '剩余' + game.networker.getResidueMj().toString() + '张';
			}
			if(beThrowMjList.length > 0) {
				this.sortPlayerMj(userdir);
				this.buhuaEffect(userdir);
			}
		},

		buhuaEffect: function(userdir) {
			var x = this.width / 2 - 300 / 2;
			var y = this.height / 2 - 300 / 2;
			switch(userdir) {
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
			game.mjdata.createEffect('buhua', x, y, 4, true).addTo(this);
		},

		buhuaSingle: function(userdir, sendobj) {
			console.log("-----------单张补花：%s'---%s------", userdir, sendobj.name);
			var mjlayer = null;
			var x = this.width / 2 - 300 / 2;
			var y = this.height / 2 - 300 / 2;
			switch(userdir) {
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
			this.throwFlower(sendobj.mjid, userdir);
			this.buhuaEffect(userdir);
		},
		
		openGold:function(mjid){
			var self = this;
			var targetMjid = game.configdata.createRandomMjid();
			if(mjid)
				targetMjid = mjid;
			var goldshowmj = new game.MjImg({mjid:targetMjid,alpha:0.3}).addTo(this);
			var goldeffect = game.mjdata.createEffect('beikeguang',0,0,6,false).addTo(this);
			goldshowmj.x = this.width/2 - goldshowmj.width/2;
			goldshowmj.y = this.height * 0.6; 
			goldeffect.x = this.width/2 - goldeffect.width/2;
			goldeffect.y = this.height * 0.6;
			new Hilo.Tween.to(goldshowmj,{
				alpha:1,
			},{
				duration:1400,
				onComplete:function(){
					goldeffect.removeFromParent();
					new Hilo.Tween.to(goldshowmj,{
						x:self.goldmj.x,
						y:self.goldmj.y,
					},{
						duration:400,
						delay:200,
						onComplete:function(){
							self.goldmj.showGoldMj(mjid);
							goldshowmj.removeFromParent();
						}
					});
				}
			});
		},

		setTurnGold: function() {
		
			this.goldmj = new game.Goldmj({ mjid: game.configdata.createRandomMjid(), imgsource: 'ui', bgrectname: '15',scaleX:game.scalefact,scaleY:game.scalefact }).addTo(this.bglayer);
			this.openGold(this.goldmj.mjid);
			
			var list = this.dealDownMjLayer.children;
			for(var item in list) {
				var mj = list[item];
				this.checkOneGold(mj);
			}
		},

		checkOneGold: function(mj) {
			if(mj.mjid == this.goldmj.mjid) {
				mj.setGold();
			}
		},

		checkAllFlower: function() {
			var sum = 0;
			for(var i in this.mjDirect) {
				var dir = this.mjDirect[i];
				sum += this.initFlowers[dir];
			}
			return sum == 0;
		},

		checkOneMjFlower: function(mjid) {
			return(mjid.indexOf('f') != -1 || mjid.indexOf('h') != -1);
		},

		checkFlower: function(userdir) {
			var mjlist = null;
			switch(userdir) {
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
			for(var i = mjlist.length - 1; i > 0; i--) {
				var mjobj = mjlist[i];
				if(mjobj.mjid.indexOf('f') != -1 || mjobj.mjid.indexOf('h') != -1) {
					hasFlower = true;
					break;
				}
			}
			return hasFlower;
		},

		throwFlower: function(mjid, userdir) {
			var t = {
				up: 1,
				down: 1,
				left: 2,
				right: 2
			};
			var throwmj = this._getThrowMj(mjid, t[userdir]);
			var offsetW = throwmj.width * game.scalefact;
			var offsetH = throwmj.height * game.scalefact;

			var objdata = game.playsceneUidata.initPostion[userdir];
			if(userdir == 'up' || userdir == 'down') {
				var x = objdata['huaCount'] * offsetW + objdata['huaX'];
				var y = objdata['huaY'];
			} else {
				var y = objdata['huaCount'] * offsetH * 0.8 + objdata['huaY'];
				var x = objdata['huaX'];
			}
			objdata['huaCount']++;
			throwmj.x = x;
			throwmj.y = y;
		},

		throwOneMj: function(dir, mjid, isMsg) {
			game.sounds.playMjEffect(0);
			var throwmj = null;
			var self = this;
			if(self.ishuangzhuang)
				return;
			switch(dir) {
				case 'down':
					throwmj = this._getThrowMj(mjid, 1);
					throwmj.visible = false;
					var x = (this.throwDownNum % this.maxMjStack) * throwmj.swidth + game.playsceneUidata.initPostion['down']['throwX'];
					var y = -Math.floor(this.throwDownNum / this.maxMjStack) * throwmj.sheight * 0.8  + game.playsceneUidata.initPostion['down']['throwY'];
					throwmj.x = x;
					throwmj.y = y;
					this.throwDownNum++;
					this.throwlayer.sortChildren(this._sortByY);
					this.isTurn = false;
					game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid, 0, 'down']);
					this.createThrowMj(dir, mjid, throwmj.x, throwmj.y, 300, 100, 0, throwmj, this);
					break;
				case 'left':
					throwmj = this._getThrowMj(mjid, 2);
					throwmj.visible = false;
					var y = (this.throwLeftNum % this.maxMjStack) * (throwmj.sheight * 0.8);
					var x = Math.floor(this.throwLeftNum / this.maxMjStack) * throwmj.swidth;
					throwmj.x = x + game.playsceneUidata.initPostion['left']['throwX'];
					throwmj.y = y + game.playsceneUidata.initPostion['left']['throwY'];
					this.throwLeftNum++;
					game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid, 1, 'left']);
					this.createThrowMj(dir, mjid, throwmj.x + throwmj.height, throwmj.y, 300, 200, 90, throwmj, this);
					break;
				case 'up':
					throwmj = this._getThrowMj(mjid, 1);
					throwmj.visible = false;
					var x = -(this.throwUpNum % this.maxMjStack) * throwmj.swidth + game.playsceneUidata.initPostion['up']['throwX'];
					var y = Math.floor(this.throwUpNum / this.maxMjStack) * throwmj.sheight*0.8 + game.playsceneUidata.initPostion['up']['throwY'];
					throwmj.x = x;
					throwmj.y = y;
					this.throwUpNum++;
					game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid, 1, 'up']);
					this.createThrowMj(dir, mjid, throwmj.x, throwmj.y, 300, 100, 0, throwmj, this);
					break;
				case 'right':
					throwmj = this._getThrowMj(mjid, 3);
					throwmj.visible = false;
					var y = -(this.throwRightNum % this.maxMjStack) * (throwmj.sheight * 0.8);
					var x = -Math.floor(this.throwRightNum / this.maxMjStack) * throwmj.swidth;
					throwmj.x = x + game.playsceneUidata.initPostion['right']['throwX'];
					throwmj.y = y + game.playsceneUidata.initPostion['right']['throwY'];
					this.throwRightNum++;
					game.sendMsg(this, game.networker, game.networker.msg.THROWMJ, [mjid, 1, 'right']);
					this.createThrowMj(dir, mjid, throwmj.x, throwmj.y - throwmj.width, 300, 200, -90, throwmj, this);
					this.throwlayer.sortChildren(this._sortByY);
					break;
			}
			this.currentThrowMj = throwmj;
		},

		createThrowMj: function(userdir, mjid, x, y, delay, duration, angle, throwmj, self) {
			var mj_show = new game.MjSelf({ mjid: mjid, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(this.throwlayer);
			mj_show.pointerEnabled = false;
			var objdata = game.playsceneUidata.initPostion[userdir];
			mj_show.x = objdata.showX;
			mj_show.y = objdata.showY;
			new Hilo.Tween.to(mj_show, {
				x: x,
				y: y,
				scaleX: 0.5,
				scaleY: 0.5,
			}, {
				duration: duration,
				delay: delay,
				onComplete: function() {
					mj_show.removeFromParent();
					throwmj.visible = true;
					self.pointer_mj.visible = true;
					self.pointer_mj.x = throwmj.x;
					self.pointer_mj.y = throwmj.y - 40;
				}
			});

		},

		createDealMj: function(mjid, typemj, showback) {
			var idname = mjid + "-" + typemj.toString();
			var mj = null;
			var rectimg = null;
			mj = new game.MjScene({
				idname: idname,
				pointerEnabled: false,
				scaleX: game.scalefact,
				scaleY: game.scalefact,
				showback: showback,
			});
			return mj;
		},

		_getThrowMj: function(mjid, typemj) {
			game.sounds.playMj(mjid);
			var throwmj = this.createDealMj(mjid, typemj).addTo(this.throwlayer);
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
			} else if(!mj1.isGold && mj2.isGold) {
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

		_sortByY: function(a, b) {
			if(a.y > b.y) {
				return 1;
			} else if(a.y < b.y) {
				return -1;
			} else {
				return 0;
			}
		},

		resetDefault: function() {
			this.initFlowers = {
				up: 1,
				down: 1,
				left: 1,
				right: 1
			};
			game.roominfo.isStart = true;
			game.mjdata.initMjQueue();
			this.ishuangzhuang = false;
			this.isTurn = false;
			this.isThrow = false;
			this.throwDownNum = 0;
			this.throwUpNum = 0;
			this.throwLeftNum = 0;
			this.throwRightNum = 0;
			this.downPutx = 0;
			this.downPuty = 0;
			game.playsceneUidata.initPostion['down']['huaCount'] = 0;
			game.playsceneUidata.initPostion['up']['huaCount'] = 0;
			game.playsceneUidata.initPostion['left']['huaCount'] = 0;
			game.playsceneUidata.initPostion['right']['huaCount'] = 0;
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
			var fps = game.clock.getfps();
			this.roomIdLabel.txt.text = game.ticker.getMeasuredFPS() + ':' + fps.toString();
		},
	});
})(window.game);