//模拟的网络处理，相当于一个控制器
game.networker = new function() {
	var self = this;
	self.msg = {
		BETHROW: 'bethrow_mj_msg_100',           //牌被扔掉
		BESELECT: 'beselect_mj_msg_101',         //选牌
		NEXTUSER_HANDLE: 'nextuser_mjhandle_102',//下一个玩家操作
		NEXTUSER_BUHUA:'nextuser_buhua',      //补花
		THROWMJ: 'throw_mj_mjid_103',         //扔牌
		CREATEROOM: 'create_mj_room_104',     //创建房间
		JOINROOM: 'join_mj_room_105',         //加入房间
		SHOWTALK: 'show_talk_panel_106',      //显示聊天
		DISBANDROOM:'disband_mj_room_107',    //解散房间
		SCROLLIMGLIST:'scroll_image_list_108',//滚动图片
		HUANGZHUANG:'huangzhuang_109',            //黄庄
		MJCHI:'mj_chi_110',  //吃
		MJPENG:'mj_peng_111',//碰
		MJGANG:'mj_gang_112',//杠
		MJHU:'mj_hu_113',    //胡
	};
	this.executeMsg = function(sendobj, msgtype, msgdata) {
		var self = this;
		switch(msgtype) {
			case this.msg.JOINROOM:   //加入房间
				self.delayHandle(1000,sendobj, msgdata, self.joinRoom);
				break;
			case this.msg.THROWMJ:    //某玩家扔掉手牌
				if(this.checkResidue()){
					game.sendMsg(this,game.currentScene,this.msg.HUANGZHUANG,game.mjdata.getResidueMj());
				}else{
					self.delayHandle(1000,sendobj, msgdata, self.nextuserHandle);
				}
				break;
			case this.msg.CREATEROOM: //创建房间
				self.delayHandle(1000,sendobj, msgdata, self.canCreateRoom, self);
				break;
			case this.msg.NEXTUSER_BUHUA://补花
				self.delayHandle(200,sendobj, msgdata, self.buhua, self);
				break;
			case this.msg.SHOWTALK://显示聊天
				self.delayHandle(50,sendobj,msgdata,self.showtalk,self);
				break;
			case this.msg.MJPENG://碰
				self.delayHandle(30,sendobj,msgdata,self.mjPeng,self);
				break;
			case this.msg.MJGANG://杠
				self.delayHandle(30,sendobj,msgdata,self.mjGang,self);
				break;
			case this.msg.MJCHI://吃
				self.delayHandle(30,sendobj,msgdata,self.mjChi,self);
				break;
		}
	};
	
	this.getResidueMj = function(){
		if(this.checkResidue()){
			game.sendMsg(this,game.currentScene,this.msg.HUANGZHUANG,game.mjdata.getResidueMj());
			return 0;
		}else{
			return game.mjdata.getResidueMj() - game.roominfo.lastmj;
		}
	};
	
	this.checkResidue = function(){
		var residue = game.mjdata.getResidueMj();
		return residue == game.roominfo.lastmj;
	};
	
	this.delayHandle = function(delaytime,sendobj, msgdata, func, self) {
		var self = this;
		new Hilo.Tween.to(this, {
			alpha: 1
		}, {
			duration: 10,
			delay: delaytime,
			onComplete: function() {
				func(sendobj, msgdata, self);
			}
		});
	};
	this.joinRoom  = function(sendobj, msgdata, self) {
		var isright = false;
		if(msgdata == '112233') {
			game.roominfo.id = '112233';
			isright = true;
		}
		game.sendMsg(self, sendobj, self.msg.JOINROOM, isright);
	};
	this.canCreateRoom = function(sendobj, msgdata, self) {
		var isEnoughcards = true;
		if(msgdata[0] > game.userdata.oneself.cardnums) {
			isEnoughcards = false;
			console.log('房卡不够');
		}else{
			var id = self._createRoomId();
			var man     = msgdata[1][2];      //人数
			var paytype = msgdata[1][3];      //赔率
			var count   = msgdata[1][0];      //局数
			var whopay  = msgdata[1][1];	  //支付方
			game.roominfo.setData(id,paytype,man,whopay,count);
			game.roominfo.isCreate = true;
		}
		game.sendMsg(self, sendobj, self.msg.CREATEROOM, isEnoughcards);
	};
	this.nextuserHandle = function(playscene, msgdata, self) {
		var tmp1 = ['up', 'left', 'down'];
		var index = Math.floor(Math.random() * 3);
		//debugger;
		game.sendMsg(this, playscene, self.msg.NEXTUSER_HANDLE, [msgdata[0],msgdata[2]]);
	};
	this._createRoomId = function(){
		var roomid  = (Math.floor(Math.random()*9)+1).toString();
		for(var i=0;i<5;i++){
			var n = Math.floor(Math.random() * 10);
			roomid += n.toString();
		}
		return roomid;
	};
	this.buhua = function(playscene, msgdata, self) {
		game.sendMsg(this, playscene, self.msg.NEXTUSER_BUHUA, 999);
	};
	this.showtalk = function(playscene, msgdata, self){
		console.log(msgdata);
		var dirs = ['down','up','right','left'];
		var dir = dirs[Math.floor(Math.random()*4)];
		
		game.sendMsg(this, playscene, self.msg.SHOWTALK, [dir,msgdata[0],msgdata[1],msgdata[2]]);
	};
	
	this.mjPeng = function(sendobj,msgdata,self){
		var mjid = msgdata;
		game.sendMsg(this,sendobj.playscene,self.msg.MJPENG, mjid);
	};
	this.mjGang = function(sendobj,msgdata,self){
		var mjid = msgdata;
		game.sendMsg(this,sendobj.playscene,self.msg.MJGANG, mjid);
	};
	this.mjChi = function(sendobj,msgdata,self){
		var mjid = msgdata[0];
		game.sendMsg(this,game.currentScene,self.msg.MJCHI, msgdata);
	};
};