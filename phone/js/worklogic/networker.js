//模拟的网络处理，相当于一个控制器
game.networker = new function() {
	var self = this;
	this.executeMsg = function(sendobj, msgtype, msgdata) {
		switch(msgtype) {
			case 'testmsg':
				game.sendMsg(this, sendobj, 'test_1', 200);
				break;
			case 'testmsg_num':
				var isright = false;
				if(msgdata == '112233') {
					isright = true;
				}
				game.sendMsg(this, sendobj, 'hide', isright);
				break;
			case game.mjdata.msg.THROWMJ:   //某玩家扔掉手牌
				self.nextuserHandle(sendobj,msgdata);
				break;
		}
	};
	this.nextuserHandle = function(playscene,msgdata){
		new Hilo.Tween.to(this,{
			alpha:1
		},{
			duration:10,
			delay:800,
			onComplete:function(){
				var tmp1 = ['up','left','down'];
				var index = Math.floor(Math.random()*3);
				game.sendMsg(this, playscene, game.mjdata.msg.NEXTUSER_HANDLE, tmp1[index]);
			}
		});
	};

};
