//麻将配置数据
game.mjdata = new function() {
	var self = this;

	self.mj = {
		w_1: ['一万', 'self_32','F'],
		w_2: ['两万', 'self_33','F'],
		w_3: ['三万', 'self_34','F'],
		w_4: ['四万', 'self_35','F'],
		w_5: ['五万', 'self_36','F'],
		w_6: ['六万', 'self_37','F'],
		w_7: ['七万', 'self_38','F'],
		w_8: ['八万', 'self_39','F'],
		w_9: ['九万', 'self_40','F'],

		t_1: ['一条', 'self_41','F'],
		t_2: ['两条', 'self_42','F'],
		t_3: ['三条', 'self_43','F'],
		t_4: ['四条', 'self_44','F'],
		t_5: ['五条', 'self_45','F'],
		t_6: ['六条', 'self_46','F'],
		t_7: ['七条', 'self_47','F'],
		t_8: ['八条', 'self_48','F'],
		t_9: ['九条', 'self_49','F'],

		b_1: ['一饼', 'self_50','F'],
		b_2: ['两饼', 'self_51','F'],
		b_3: ['三饼', 'self_52','F'],
		b_4: ['四饼', 'self_53','F'],
		b_5: ['五饼', 'self_54','F'],
		b_6: ['六饼', 'self_55','F'],
		b_7: ['七饼', 'self_56','F'],
		b_8: ['八饼', 'self_57','F'],
		b_9: ['九饼', 'self_58','F'],

		f_1: ['东风', 'self_59','T'],
		f_2: ['西风', 'self_60','T'],
		f_3: ['南风', 'self_61','T'],
		f_4: ['北风', 'self_62','T'],
		f_5: ['红中', 'self_64','T'],
		f_6: ['发财', 'self_63','T'],
		f_7: ['白皮', 'self_79','T'],

		h_1: ['春', 'self_65','T'],
		h_2: ['夏', 'self_66','T'],
		h_3: ['秋', 'self_67','T'],
		h_4: ['冬', 'self_68','T'],
		h_5: ['梅', 'self_69','T'],
		h_6: ['兰', 'self_70','T'],
		h_7: ['竹', 'self_72','T'],
		h_8: ['菊', 'self_71','T'],
	};

	self.smallmj = {
		w_1: ['一万', 'battle_32', 'battle_hg_32', 'battle_hgR_32', 'wan1.mp3','F'],
		w_2: ['两万', 'battle_33', 'battle_hg_33', 'battle_hgR_33', 'wan2.mp3','F'],
		w_3: ['三万', 'battle_34', 'battle_hg_34', 'battle_hgR_34', 'wan3.mp3','F'],
		w_4: ['四万', 'battle_35', 'battle_hg_35', 'battle_hgR_35', 'wan4.mp3','F'],
		w_5: ['五万', 'battle_36', 'battle_hg_36', 'battle_hgR_36', 'wan5.mp3','F'],
		w_6: ['六万', 'battle_37', 'battle_hg_37', 'battle_hgR_37', 'wan6.mp3','F'],
		w_7: ['七万', 'battle_38', 'battle_hg_38', 'battle_hgR_38', 'wan7.mp3','F'],
		w_8: ['八万', 'battle_39', 'battle_hg_39', 'battle_hgR_39', 'wan8.mp3','F'],
		w_9: ['九万', 'battle_40', 'battle_hg_40', 'battle_hgR_40', 'wan9.mp3','F'],

		t_1: ['一条', 'battle_41', 'battle_hg_41', 'battle_hgR_41', 'tiao1.mp3','F'],
		t_2: ['两条', 'battle_42', 'battle_hg_42', 'battle_hgR_42', 'tiao2.mp3','F'],
		t_3: ['三条', 'battle_43', 'battle_hg_43', 'battle_hgR_43', 'tiao3.mp3','F'],
		t_4: ['四条', 'battle_44', 'battle_hg_44', 'battle_hgR_44', 'tiao4.mp3','F'],
		t_5: ['五条', 'battle_45', 'battle_hg_45', 'battle_hgR_45', 'tiao5.mp3','F'],
		t_6: ['六条', 'battle_46', 'battle_hg_46', 'battle_hgR_46', 'tiao6.mp3','F'],
		t_7: ['七条', 'battle_47', 'battle_hg_47', 'battle_hgR_47', 'tiao7.mp3','F'],
		t_8: ['八条', 'battle_48', 'battle_hg_48', 'battle_hgR_48', 'tiao8.mp3','F'],
		t_9: ['九条', 'battle_49', 'battle_hg_49', 'battle_hgR_49', 'tiao9.mp3','F'],

		b_1: ['一饼', 'battle_50', 'battle_hg_50', 'battle_hgR_50', 'tong1.mp3','F'],
		b_2: ['两饼', 'battle_51', 'battle_hg_51', 'battle_hgR_51', 'tong2.mp3','F'],
		b_3: ['三饼', 'battle_52', 'battle_hg_52', 'battle_hgR_52', 'tong3.mp3','F'],
		b_4: ['四饼', 'battle_53', 'battle_hg_53', 'battle_hgR_53', 'tong4.mp3','F'],
		b_5: ['五饼', 'battle_54', 'battle_hg_54', 'battle_hgR_54', 'tong5.mp3','F'],
		b_6: ['六饼', 'battle_55', 'battle_hg_55', 'battle_hgR_55', 'tong6.mp3','F'],
		b_7: ['七饼', 'battle_56', 'battle_hg_56', 'battle_hgR_56', 'tong7.mp3','F'],
		b_8: ['八饼', 'battle_57', 'battle_hg_57', 'battle_hgR_57', 'tong8.mp3','F'],
		b_9: ['九饼', 'battle_58', 'battle_hg_58', 'battle_hgR_58', 'tong9.mp3','F'],

		f_1: ['东风', 'battle_59', 'battle_hg_59', 'battle_hgR_59', 'buhua.mp3','T'],
		f_2: ['西风', 'battle_60', 'battle_hg_60', 'battle_hgR_60', 'buhua.mp3','T'],
		f_3: ['南风', 'battle_61', 'battle_hg_61', 'battle_hgR_61', 'buhua.mp3','T'],
		f_4: ['北风', 'battle_62', 'battle_hg_62', 'battle_hgR_62', 'buhua.mp3','T'],
		f_5: ['红中', 'battle_64', 'battle_hg_64', 'battle_hgR_64', 'buhua.mp3','T'],
		f_6: ['发财', 'battle_63', 'battle_hg_63', 'battle_hgR_63', 'buhua.mp3','T'],
		f_7: ['白皮', 'battle_79', 'battle_hg_79', 'battle_hgR_79', 'buhua.mp3','T'],

		h_1: ['春', 'battle_65', 'battle_hg_65', 'battle_hgR_65', 'buhua.mp3','T'],
		h_2: ['夏', 'battle_66', 'battle_hg_66', 'battle_hgR_66', 'buhua.mp3','T'],
		h_3: ['秋', 'battle_67', 'battle_hg_67', 'battle_hgR_67', 'buhua.mp3','T'],
		h_4: ['冬', 'battle_68', 'battle_hg_68', 'battle_hgR_68', 'buhua.mp3','T'],
		h_5: ['梅', 'battle_69', 'battle_hg_69', 'battle_hgR_69', 'buhua.mp3','T'],
		h_6: ['兰', 'battle_70', 'battle_hg_70', 'battle_hgR_70', 'buhua.mp3','T'],
		h_7: ['竹', 'battle_72', 'battle_hg_72', 'battle_hgR_72', 'buhua.mp3','T'],
		h_8: ['菊', 'battle_71', 'battle_hg_71', 'battle_hgR_71', 'buhua.mp3','T'],

	};

	self.mjindex = { 
		0: 't_1', 1: 't_2', 2: 't_3', 3: 't_4', 4: 't_5', 5: 't_6', 6: 't_7', 7: 't_8', 8: 't_9', 9: 'b_1', 10: 'b_2', 11: 'b_3', 12: 'b_4', 13: 'b_5', 14: 'b_6', 15: 'b_7', 16: 'b_8', 17: 'b_9', 18: 'w_1', 19: 'w_2', 20: 'w_3', 21: 'w_4', 22: 'w_5', 23: 'w_6', 24: 'w_7', 25: 'w_8', 26: 'w_9', 27: 't_1', 28: 't_2', 29: 't_3', 30: 't_4', 31: 't_5', 32: 't_6', 33: 't_7', 34: 't_8', 35: 't_9', 36: 'b_1', 37: 'b_2', 38: 'b_3', 39: 'b_4', 40: 'b_5', 41: 'b_6', 42: 'b_7', 43: 'b_8', 44: 'b_9', 45: 'w_1', 46: 'w_2', 47: 'w_3', 48: 'w_4', 49: 'w_5', 50: 'w_6', 51: 'w_7', 52: 'w_8', 53: 'w_9', 54: 't_1', 55: 't_2', 56: 't_3', 57: 't_4', 58: 't_5', 59: 't_6', 60: 't_7', 61: 't_8', 62: 't_9', 63: 'b_1', 64: 'b_2', 65: 'b_3', 66: 'b_4', 67: 'b_5', 68: 'b_6', 69: 'b_7', 70: 'b_8', 71: 'b_9', 72: 'w_1', 73: 'w_2', 74: 'w_3', 75: 'w_4', 76: 'w_5', 77: 'w_6', 78: 'w_7', 79: 'w_8', 80: 'w_9', 81: 't_1', 82: 't_2', 83: 't_3', 84: 't_4', 85: 't_5', 86: 't_6', 87: 't_7', 88: 't_8', 89: 't_9', 90: 'b_1', 91: 'b_2', 92: 'b_3', 93: 'b_4', 94: 'b_5', 95: 'b_6', 96: 'b_7', 97: 'b_8', 98: 'b_9', 99: 'w_1', 100: 'w_2', 101: 'w_3', 102: 'w_4', 103: 'w_5', 104: 'w_6', 105: 'w_7', 106: 'w_8', 107: 'w_9' ,
	 	108: 'f_5', 109: 'f_6', 110: 'f_7', 111: 'f_8', 112: 'f_1', 113: 'f_2', 114: 'f_3', 115: 'f_4', 116: 'f_5', 117: 'f_6', 118: 'f_7', 119: 'f_8', 120: 'f_1', 121: 'f_2', 122: 'f_3', 123: 'f_4', 124: 'f_5', 125: 'f_6', 126: 'f_7', 127: 'f_8',128: 'f_1', 129: 'f_2', 130: 'f_3', 131: 'f_4', 132: 'f_5', 133: 'f_6', 134: 'f_7', 135: 'f_8',
	 	136: 'h_1', 137: 'h_2', 138: 'h_3', 139: 'h_4', 140: 'h_5', 141: 'h_6', 142: 'h_7', 143: 'h_8'
	};

	self.randmj = [];
	self.initMjQueue = function() {
		var tm = [];
		self.randmj = [];
		for(var i = 0; i < 144; i++) {
			tm.push(i);
		}
		for(var i = tm.length; i > 0; i--) {
			var rIndex = Math.floor(Math.random() * i);
			var mjid = self.mjindex[tm[rIndex]];
			this.randmj.push(mjid);
			tm.splice(rIndex, 1);
		}
	};

	self.getResidueMj = function() {
		return self.randmj.length;
	};

	self.dealOne = function() {
		var mjid = self.randmj.shift();
		return mjid;
	};
};

//玩家配置数据
game.userdata = new function() {
	var self = this;

	self.name = '维维豆奶';
	self.roomcards = 6;

};

//房间配置数据
game.roominfo = new function() {
	var self = this;

	self.PAYTYPES = ['放胡单赔','放胡双倍单赔','放胡全赔'];
	self.id = '000000';
	self.paytype = 0;
	self.paytypeSt = '';
	self.roomman = 0;
	
	self.setData = function(roomid,paytype,roomman){
		self.id = roomid;
		self.paytype = paytype;
		self.roomman = roomman;
		self.paytypeSt = self.PAYTYPES[self.paytype];
	};
	
	self.getData = function(){
		return {
			roomid:self.id,
			roomman:self.roomman,
			paytype:self.paytypeSt
		};
	}

};