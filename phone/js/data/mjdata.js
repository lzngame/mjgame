//麻将配置数据
game.mjdata = new function() {
	var self = this;
	
	self.mj = {
			w_1: ['一万', 'self_32'],
			w_2: ['两万', 'self_33'],
			w_3: ['三万', 'self_34'],
			w_4: ['四万', 'self_35'],
			w_5: ['五万', 'self_36'],
			w_6: ['六万', 'self_37'],
			w_7: ['七万', 'self_38'],
			w_8: ['八万', 'self_39'],
			w_9: ['九万', 'self_40'],

			t_1: ['一条', 'self_41'],
			t_2: ['两条', 'self_42'],
			t_3: ['三条', 'self_43'],
			t_4: ['四条', 'self_44'],
			t_5: ['五条', 'self_45'],
			t_6: ['六条', 'self_46'],
			t_7: ['七条', 'self_47'],
			t_8: ['八条', 'self_48'],
			t_9: ['九条', 'self_49'],

			b_1: ['一饼', 'self_50'],
			b_2: ['两饼', 'self_51'],
			b_3: ['三饼', 'self_52'],
			b_4: ['四饼', 'self_53'],
			b_5: ['五饼', 'self_54'],
			b_6: ['六饼', 'self_55'],
			b_7: ['七饼', 'self_56'],
			b_8: ['八饼', 'self_57'],
			b_9: ['九饼', 'self_58'],
		};

	self.smallmj = {
		w_1: ['一万', 'battle_32','battle_hg_32','battle_hgR_32','wan1.mp3'],
		w_2: ['两万', 'battle_33','battle_hg_33','battle_hgR_33','wan2.mp3'],
		w_3: ['三万', 'battle_34','battle_hg_34','battle_hgR_34','wan3.mp3'],
		w_4: ['四万', 'battle_35','battle_hg_35','battle_hgR_35','wan4.mp3'],
		w_5: ['五万', 'battle_36','battle_hg_36','battle_hgR_36','wan5.mp3'],
		w_6: ['六万', 'battle_37','battle_hg_37','battle_hgR_37','wan6.mp3'],
		w_7: ['七万', 'battle_38','battle_hg_38','battle_hgR_38','wan7.mp3'],
		w_8: ['八万', 'battle_39','battle_hg_39','battle_hgR_39','wan8.mp3'],
		w_9: ['九万', 'battle_40','battle_hg_40','battle_hgR_40','wan9.mp3'],

		t_1: ['一条', 'battle_41','battle_hg_41','battle_hgR_41','tiao1.mp3'],
		t_2: ['两条', 'battle_42','battle_hg_42','battle_hgR_42','tiao2.mp3'],
		t_3: ['三条', 'battle_43','battle_hg_43','battle_hgR_43','tiao3.mp3'],
		t_4: ['四条', 'battle_44','battle_hg_44','battle_hgR_44','tiao4.mp3'],
		t_5: ['五条', 'battle_45','battle_hg_45','battle_hgR_45','tiao5.mp3'],
		t_6: ['六条', 'battle_46','battle_hg_46','battle_hgR_46','tiao6.mp3'],
		t_7: ['七条', 'battle_47','battle_hg_47','battle_hgR_47','tiao7.mp3'],
		t_8: ['八条', 'battle_48','battle_hg_48','battle_hgR_48','tiao8.mp3'],
		t_9: ['九条', 'battle_49','battle_hg_49','battle_hgR_49','tiao9.mp3'],

		b_1: ['一饼', 'battle_50','battle_hg_50','battle_hgR_50','tong1.mp3'],
		b_2: ['两饼', 'battle_51','battle_hg_51','battle_hgR_51','tong2.mp3'],
		b_3: ['三饼', 'battle_52','battle_hg_52','battle_hgR_52','tong3.mp3'],
		b_4: ['四饼', 'battle_53','battle_hg_53','battle_hgR_53','tong4.mp3'],
		b_5: ['五饼', 'battle_54','battle_hg_54','battle_hgR_54','tong5.mp3'],
		b_6: ['六饼', 'battle_55','battle_hg_55','battle_hgR_55','tong6.mp3'],
		b_7: ['七饼', 'battle_56','battle_hg_56','battle_hgR_56','tong7.mp3'],
		b_8: ['八饼', 'battle_57','battle_hg_57','battle_hgR_57','tong8.mp3'],
		b_9: ['九饼', 'battle_58','battle_hg_58','battle_hgR_58','tong9.mp3'],

	};
	
	self.mjindex = {0: 't_1', 1: 't_2', 2: 't_3', 3: 't_4', 4: 't_5', 5: 't_6', 6: 't_7', 7: 't_8', 8: 't_9', 9: 'b_1', 10: 'b_2', 11: 'b_3', 12: 'b_4', 13: 'b_5', 14: 'b_6', 15: 'b_7', 16: 'b_8', 17: 'b_9', 18: 'w_1', 19: 'w_2', 20: 'w_3', 21: 'w_4', 22: 'w_5', 23: 'w_6', 24: 'w_7', 25: 'w_8', 26: 'w_9', 27: 't_1', 28: 't_2', 29: 't_3', 30: 't_4', 31: 't_5', 32: 't_6', 33: 't_7', 34: 't_8', 35: 't_9', 36: 'b_1', 37: 'b_2', 38: 'b_3', 39: 'b_4', 40: 'b_5', 41: 'b_6', 42: 'b_7', 43: 'b_8', 44: 'b_9', 45: 'w_1', 46: 'w_2', 47: 'w_3', 48: 'w_4', 49: 'w_5', 50: 'w_6', 51: 'w_7', 52: 'w_8', 53: 'w_9', 54: 't_1', 55: 't_2', 56: 't_3', 57: 't_4', 58: 't_5', 59: 't_6', 60: 't_7', 61: 't_8', 62: 't_9', 63: 'b_1', 64: 'b_2', 65: 'b_3', 66: 'b_4', 67: 'b_5', 68: 'b_6', 69: 'b_7', 70: 'b_8', 71: 'b_9', 72: 'w_1', 73: 'w_2', 74: 'w_3', 75: 'w_4', 76: 'w_5', 77: 'w_6', 78: 'w_7', 79: 'w_8', 80: 'w_9', 81: 't_1', 82: 't_2', 83: 't_3', 84: 't_4', 85: 't_5', 86: 't_6', 87: 't_7', 88: 't_8', 89: 't_9', 90: 'b_1', 91: 'b_2', 92: 'b_3', 93: 'b_4', 94: 'b_5', 95: 'b_6', 96: 'b_7', 97: 'b_8', 98: 'b_9', 99: 'w_1', 100: 'w_2', 101: 'w_3', 102: 'w_4', 103: 'w_5', 104: 'w_6', 105: 'w_7', 106: 'w_8', 107: 'w_9'};
	
	self.randmj = [];
	self.initMjQueue = function(){
		var tm = [];
		self.randmj = [];
		for(var i=0;i<108;i++){
			tm.push(i);
		}
		var a = [];
		var mj = [];
		console.log('----------------------------------');
		for(var i=tm.length;i>0;i--){
			var rIndex = Math.floor(Math.random() * i);
			var mjid = self.mjindex[tm[rIndex]];
			var mjname = self.mj[mjid][0];
			this.randmj.push(mjid);
			mj.push(mjname);
			tm.splice(rIndex,1);
		}
	};
	
	self.getResidueMj = function(){
		return self.randmj.length;
	};
	
	self.dealOne = function(){
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

