//麻将配置数据
game.mjdata = new function() {
	var self = this;

	self.mj = {
		w_1: ['一万', 'self_32', 'F'],
		w_2: ['两万', 'self_33', 'F'],
		w_3: ['三万', 'self_34', 'F'],
		w_4: ['四万', 'self_35', 'F'],
		w_5: ['五万', 'self_36', 'F'],
		w_6: ['六万', 'self_37', 'F'],
		w_7: ['七万', 'self_38', 'F'],
		w_8: ['八万', 'self_39', 'F'],
		w_9: ['九万', 'self_40', 'F'],

		t_1: ['一条', 'self_41', 'F'],
		t_2: ['两条', 'self_42', 'F'],
		t_3: ['三条', 'self_43', 'F'],
		t_4: ['四条', 'self_44', 'F'],
		t_5: ['五条', 'self_45', 'F'],
		t_6: ['六条', 'self_46', 'F'],
		t_7: ['七条', 'self_47', 'F'],
		t_8: ['八条', 'self_48', 'F'],
		t_9: ['九条', 'self_49', 'F'],

		b_1: ['一饼', 'self_50', 'F'],
		b_2: ['两饼', 'self_51', 'F'],
		b_3: ['三饼', 'self_52', 'F'],
		b_4: ['四饼', 'self_53', 'F'],
		b_5: ['五饼', 'self_54', 'F'],
		b_6: ['六饼', 'self_55', 'F'],
		b_7: ['七饼', 'self_56', 'F'],
		b_8: ['八饼', 'self_57', 'F'],
		b_9: ['九饼', 'self_58', 'F'],

		f_1: ['东风', 'self_59', 'T'],
		f_2: ['西风', 'self_60', 'T'],
		f_3: ['南风', 'self_61', 'T'],
		f_4: ['北风', 'self_62', 'T'],
		f_5: ['红中', 'self_64', 'T'],
		f_6: ['发财', 'self_63', 'T'],
		f_7: ['白皮', 'self_79', 'T'],

		h_1: ['春', 'self_65', 'T'],
		h_2: ['夏', 'self_66', 'T'],
		h_3: ['秋', 'self_67', 'T'],
		h_4: ['冬', 'self_68', 'T'],
		h_5: ['梅', 'self_69', 'T'],
		h_6: ['兰', 'self_70', 'T'],
		h_7: ['竹', 'self_72', 'T'],
		h_8: ['菊', 'self_71', 'T'],
	};

	self.smallmj = {
		w_1: ['一万', 'battle_32', 'battle_hg_32', 'battle_hgR_32', 'wan1.mp3', 'F'],
		w_2: ['两万', 'battle_33', 'battle_hg_33', 'battle_hgR_33', 'wan2.mp3', 'F'],
		w_3: ['三万', 'battle_34', 'battle_hg_34', 'battle_hgR_34', 'wan3.mp3', 'F'],
		w_4: ['四万', 'battle_35', 'battle_hg_35', 'battle_hgR_35', 'wan4.mp3', 'F'],
		w_5: ['五万', 'battle_36', 'battle_hg_36', 'battle_hgR_36', 'wan5.mp3', 'F'],
		w_6: ['六万', 'battle_37', 'battle_hg_37', 'battle_hgR_37', 'wan6.mp3', 'F'],
		w_7: ['七万', 'battle_38', 'battle_hg_38', 'battle_hgR_38', 'wan7.mp3', 'F'],
		w_8: ['八万', 'battle_39', 'battle_hg_39', 'battle_hgR_39', 'wan8.mp3', 'F'],
		w_9: ['九万', 'battle_40', 'battle_hg_40', 'battle_hgR_40', 'wan9.mp3', 'F'],

		t_1: ['一条', 'battle_41', 'battle_hg_41', 'battle_hgR_41', 'tiao1.mp3', 'F'],
		t_2: ['两条', 'battle_42', 'battle_hg_42', 'battle_hgR_42', 'tiao2.mp3', 'F'],
		t_3: ['三条', 'battle_43', 'battle_hg_43', 'battle_hgR_43', 'tiao3.mp3', 'F'],
		t_4: ['四条', 'battle_44', 'battle_hg_44', 'battle_hgR_44', 'tiao4.mp3', 'F'],
		t_5: ['五条', 'battle_45', 'battle_hg_45', 'battle_hgR_45', 'tiao5.mp3', 'F'],
		t_6: ['六条', 'battle_46', 'battle_hg_46', 'battle_hgR_46', 'tiao6.mp3', 'F'],
		t_7: ['七条', 'battle_47', 'battle_hg_47', 'battle_hgR_47', 'tiao7.mp3', 'F'],
		t_8: ['八条', 'battle_48', 'battle_hg_48', 'battle_hgR_48', 'tiao8.mp3', 'F'],
		t_9: ['九条', 'battle_49', 'battle_hg_49', 'battle_hgR_49', 'tiao9.mp3', 'F'],

		b_1: ['一饼', 'battle_50', 'battle_hg_50', 'battle_hgR_50', 'tong1.mp3', 'F'],
		b_2: ['两饼', 'battle_51', 'battle_hg_51', 'battle_hgR_51', 'tong2.mp3', 'F'],
		b_3: ['三饼', 'battle_52', 'battle_hg_52', 'battle_hgR_52', 'tong3.mp3', 'F'],
		b_4: ['四饼', 'battle_53', 'battle_hg_53', 'battle_hgR_53', 'tong4.mp3', 'F'],
		b_5: ['五饼', 'battle_54', 'battle_hg_54', 'battle_hgR_54', 'tong5.mp3', 'F'],
		b_6: ['六饼', 'battle_55', 'battle_hg_55', 'battle_hgR_55', 'tong6.mp3', 'F'],
		b_7: ['七饼', 'battle_56', 'battle_hg_56', 'battle_hgR_56', 'tong7.mp3', 'F'],
		b_8: ['八饼', 'battle_57', 'battle_hg_57', 'battle_hgR_57', 'tong8.mp3', 'F'],
		b_9: ['九饼', 'battle_58', 'battle_hg_58', 'battle_hgR_58', 'tong9.mp3', 'F'],

		f_1: ['东风', 'battle_59', 'battle_hg_59', 'battle_hgR_59', 'buhua.mp3', 'T'],
		f_2: ['西风', 'battle_60', 'battle_hg_60', 'battle_hgR_60', 'buhua.mp3', 'T'],
		f_3: ['南风', 'battle_61', 'battle_hg_61', 'battle_hgR_61', 'buhua.mp3', 'T'],
		f_4: ['北风', 'battle_62', 'battle_hg_62', 'battle_hgR_62', 'buhua.mp3', 'T'],
		f_5: ['红中', 'battle_64', 'battle_hg_64', 'battle_hgR_64', 'buhua.mp3', 'T'],
		f_6: ['发财', 'battle_63', 'battle_hg_63', 'battle_hgR_63', 'buhua.mp3', 'T'],
		f_7: ['白皮', 'battle_79', 'battle_hg_79', 'battle_hgR_79', 'buhua.mp3', 'T'],

		h_1: ['春', 'battle_65', 'battle_hg_65', 'battle_hgR_65', 'buhua.mp3', 'T'],
		h_2: ['夏', 'battle_66', 'battle_hg_66', 'battle_hgR_66', 'buhua.mp3', 'T'],
		h_3: ['秋', 'battle_67', 'battle_hg_67', 'battle_hgR_67', 'buhua.mp3', 'T'],
		h_4: ['冬', 'battle_68', 'battle_hg_68', 'battle_hgR_68', 'buhua.mp3', 'T'],
		h_5: ['梅', 'battle_69', 'battle_hg_69', 'battle_hgR_69', 'buhua.mp3', 'T'],
		h_6: ['兰', 'battle_70', 'battle_hg_70', 'battle_hgR_70', 'buhua.mp3', 'T'],
		h_7: ['竹', 'battle_72', 'battle_hg_72', 'battle_hgR_72', 'buhua.mp3', 'T'],
		h_8: ['菊', 'battle_71', 'battle_hg_71', 'battle_hgR_71', 'buhua.mp3', 'T'],
	};

	self.mjindex = {
		0: 't_1',
		1: 't_2',
		2: 't_3',
		3: 't_4',
		4: 't_5',
		5: 't_6',
		6: 't_7',
		7: 't_8',
		8: 't_9',
		9: 'b_1',
		10: 'b_2',
		11: 'b_3',
		12: 'b_4',
		13: 'b_5',
		14: 'b_6',
		15: 'b_7',
		16: 'b_8',
		17: 'b_9',
		18: 'w_1',
		19: 'w_2',
		20: 'w_3',
		21: 'w_4',
		22: 'w_5',
		23: 'w_6',
		24: 'w_7',
		25: 'w_8',
		26: 'w_9',
		27: 't_1',
		28: 't_2',
		29: 't_3',
		30: 't_4',
		31: 't_5',
		32: 't_6',
		33: 't_7',
		34: 't_8',
		35: 't_9',
		36: 'b_1',
		37: 'b_2',
		38: 'b_3',
		39: 'b_4',
		40: 'b_5',
		41: 'b_6',
		42: 'b_7',
		43: 'b_8',
		44: 'b_9',
		45: 'w_1',
		46: 'w_2',
		47: 'w_3',
		48: 'w_4',
		49: 'w_5',
		50: 'w_6',
		51: 'w_7',
		52: 'w_8',
		53: 'w_9',
		54: 't_1',
		55: 't_2',
		56: 't_3',
		57: 't_4',
		58: 't_5',
		59: 't_6',
		60: 't_7',
		61: 't_8',
		62: 't_9',
		63: 'b_1',
		64: 'b_2',
		65: 'b_3',
		66: 'b_4',
		67: 'b_5',
		68: 'b_6',
		69: 'b_7',
		70: 'b_8',
		71: 'b_9',
		72: 'w_1',
		73: 'w_2',
		74: 'w_3',
		75: 'w_4',
		76: 'w_5',
		77: 'w_6',
		78: 'w_7',
		79: 'w_8',
		80: 'w_9',
		81: 't_1',
		82: 't_2',
		83: 't_3',
		84: 't_4',
		85: 't_5',
		86: 't_6',
		87: 't_7',
		88: 't_8',
		89: 't_9',
		90: 'b_1',
		91: 'b_2',
		92: 'b_3',
		93: 'b_4',
		94: 'b_5',
		95: 'b_6',
		96: 'b_7',
		97: 'b_8',
		98: 'b_9',
		99: 'w_1',
		100: 'w_2',
		101: 'w_3',
		102: 'w_4',
		103: 'w_5',
		104: 'w_6',
		105: 'w_7',
		106: 'w_8',
		107: 'w_9',
		108: 'f_4',
		109: 'f_5',
		110: 'f_6',
		111: 'f_7',
		112: 'f_1',
		113: 'f_2',
		114: 'f_3',
		115: 'f_4',
		116: 'f_5',
		117: 'f_6',
		118: 'f_7',
		119: 'f_1',
		120: 'f_2',
		121: 'f_3',
		122: 'f_4',
		123: 'f_5',
		124: 'f_6',
		125: 'f_7',
		126: 'f_1',
		127: 'f_2',
		128: 'f_3',
		129: 'f_4',
		130: 'f_5',
		131: 'f_6',
		132: 'f_7',
		133: 'f_1',
		134: 'f_2',
		135: 'f_3',
		136: 'h_1',
		137: 'h_2',
		138: 'h_3',
		139: 'h_4',
		140: 'h_5',
		141: 'h_6',
		142: 'h_7',
		143: 'h_8'
	};

	self.talksounds = [
		['你太牛了!', 'fix_msg_1'],
		['呵呵，手气真好!', 'fix_msg_2'],
		['快点出牌哟!', 'fix_msg_3'],
		['今天真高兴!', 'fix_msg_4'],
		['这个吃得好!', 'fix_msg_5'],
		['你放炮我不胡!', 'fix_msg_6'],
		['你家是开银行的吧!', 'fix_msg_7'],
		['不好意思,我有事要先走一步了!', 'fix_msg_8'],
		['你的牌打得太好了!', 'fix_msg_9'],
		['大家好,很高兴见到各位!', 'fix_msg_10'],
		['怎么又断线了,网络怎么这么差呀!', 'fix_msg_11'],
	];

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

	//动画数据
	//[0-26] 补花  【27-42】贝壳光 【43-67】点炮  【68-78】长电光 【79-87】电圈 【88-103】转动麻将 【104-109】色子1-6 
	//【110-120】色子动画 【121-124】闪光  【125-131】金牌闪光 【132-138】自摸
	self.effectframes = [
		[0, 1059, 344, 312],
		[0, 1376, 344, 312],
		[0, 1693, 344, 312],
		[0, 2010, 344, 312],
		[0, 2327, 344, 312],
		[349, 425, 344, 312],
		[698, 2219, 344, 312],
		[718, 0, 344, 312],
		[1047, 317, 344, 312],
		[369, 0, 344, 312],
		[349, 1059, 344, 312],
		[1047, 634, 344, 312],
		[349, 742, 344, 312],
		[698, 1268, 344, 312],
		[1047, 1268, 344, 312],
		[349, 1376, 344, 312],
		[1047, 951, 344, 312],
		[698, 1585, 344, 312],
		[698, 1902, 344, 312],
		[0, 742, 344, 312],
		[698, 634, 344, 312],
		[0, 425, 344, 312],
		[698, 951, 344, 312],
		[698, 317, 344, 312],
		[349, 2327, 344, 312],
		[349, 2010, 344, 312],
		[349, 1693, 344, 312],
		[2612, 686, 128, 128],
		[2523, 1753, 128, 128],
		[2521, 2259, 128, 128],
		[2521, 2126, 128, 128],
		[2590, 553, 128, 128],
		[2611, 133, 128, 128],
		[2519, 1620, 128, 128],
		[2519, 1487, 128, 128],
		[2523, 1886, 128, 128],
		[2611, 0, 128, 128],
		[2457, 553, 128, 128],
		[2519, 1354, 128, 128],
		[2526, 966, 128, 128],
		[2519, 1221, 128, 128],
		[2606, 310, 128, 128],
		[2516, 2491, 128, 128],
		[1527, 1440, 235, 235],
		[1636, 480, 235, 235],
		[1636, 240, 235, 235],
		[1547, 0, 235, 235],
		[1527, 2400, 235, 235],
		[1527, 2160, 235, 235],
		[1527, 1920, 235, 235],
		[1527, 1680, 235, 235],
		[1396, 720, 235, 235],
		[1396, 1200, 235, 235],
		[1396, 960, 235, 235],
		[1047, 2065, 235, 235],
		[1307, 0, 235, 235],
		[1047, 1825, 235, 235],
		[1047, 1585, 235, 235],
		[1636, 960, 235, 235],
		[1636, 720, 235, 235],
		[1047, 2305, 235, 235],
		[1067, 0, 235, 235],
		[1287, 1585, 235, 235],
		[1287, 1825, 235, 235],
		[1287, 2065, 235, 235],
		[1287, 2305, 235, 235],
		[1396, 240, 235, 235],
		[1396, 480, 235, 235],
		[2457, 310, 144, 238],
		[2354, 2236, 162, 250],
		[2455, 711, 152, 250],
		[2275, 152, 176, 250],
		[2363, 966, 158, 250],
		[2169, 1871, 182, 250],
		[2169, 2236, 180, 250],
		[2272, 711, 178, 250],
		[1767, 1200, 198, 250],
		[2272, 456, 180, 250],
		[2356, 1871, 162, 250],
		[439, 2644, 68, 83],
		[344, 2665, 90, 71],
		[189, 2644, 150, 73],
		[0, 2644, 184, 95],
		[2169, 2126, 182, 105],
		[2169, 1761, 188, 105],
		[698, 2545, 210, 113],
		[913, 2545, 206, 115],
		[1124, 2545, 202, 117],
		[1968, 1885, 196, 210],
		[1968, 1670, 196, 210],
		[1968, 1455, 196, 210],
		[1876, 860, 196, 210],
		[1876, 645, 196, 210],
		[1876, 430, 196, 210],
		[1968, 2315, 196, 210],
		[1968, 2100, 196, 210],
		[1787, 0, 196, 210],
		[1767, 2530, 196, 210],
		[1767, 2315, 196, 210],
		[1767, 2100, 196, 210],
		[1767, 1885, 196, 210],
		[1767, 1670, 196, 210],
		[1767, 1455, 196, 210],
		[1876, 215, 196, 210],
		[512, 2665, 62, 72],
		[579, 2667, 62, 72],
		[522, 317, 62, 72],
		[713, 2667, 62, 72],
		[589, 317, 62, 72],
		[646, 2663, 62, 72],
		[2077, 746, 190, 140],
		[2077, 891, 190, 140],
		[2166, 2530, 190, 140],
		[2168, 1036, 190, 140],
		[2168, 1181, 190, 140],
		[2169, 1326, 190, 140],
		[2077, 456, 190, 140],
		[2169, 1616, 190, 140],
		[2077, 601, 190, 140],
		[2169, 1471, 190, 140],
		[1331, 2545, 190, 140],
		[351, 317, 166, 102],
		[0, 145, 358, 132],
		[0, 0, 364, 140],
		[0, 282, 346, 138],
		[2364, 1376, 150, 150],
		[2364, 1221, 150, 150],
		[2364, 1531, 150, 150],
		[2364, 1686, 150, 150],
		[2361, 2491, 150, 150],
		[2456, 0, 150, 150],
		[2456, 155, 150, 150],
		[2186, 0, 193, 147],
		[2077, 152, 193, 147],
		[2077, 304, 193, 147],
		[1970, 1227, 193, 147],
		[1970, 1075, 193, 147],
		[1968, 2530, 193, 147],
		[1988, 0, 193, 147]
	];

	self.init = function() {
		self.effectatlas = new Hilo.TextureAtlas({
			image: game.getImg('effect'),
			width: 2745,
			height: 2745,
			frames: self.effectframes,
			sprites: {
				//buhua: { from: 0, to: 26 },
				buhua: { from: 20, to: 26 },
				beikeguang: { from: 27, to: 42 },
				dianpao: { from: 43, to: 67 },
				changdianguang: { from: 68, to: 78 },
				dianquan: { from: 79, to: 87 },
				zhuanmj: { from: 88, to: 103 },
				sezi: { from: 104, to: 109 },
				sezidonghua: { from: 110, to: 120 },
				shanguang: { from: 121, to: 124 },
				goldflash: { from: 125, to: 131 },
				zimo: { from: 132, to: 138 },
			},
		});
	};

	self.createEffect = function(effectname, x, y, intervaltime, isonce) {
		var f = this.effectatlas.getSprite(effectname);
		if(!intervaltime) {
			intervaltime = 6;
		}
		var effect = new Hilo.Sprite({
			interval: intervaltime,
			loop: true,
			frames: f,
			x: x,
			y: y,
		});
		var lastframe = effect.getNumFrames() - 1;
		if(isonce) {
			effect.setFrameCallback(lastframe, function() {
				this.stop();
				this.removeFromParent();
			});
		}

		return effect;
	};

	self.getChiQueue = function(mjid, chipos) {
		var itemtmp = mjid.split('_');
		var head = itemtmp[0];
		var order = parseInt(itemtmp[1]);
		var t1, t2;

		var mjteam = null;
		if(chipos == 0) {
			t1 = head + '_' + (order + 1).toString();
			t2 = head + '_' + (order + 2).toString();
			mjteam = [mjid, t1, t2];
		}
		if(chipos == 1) {
			t1 = head + '_' + (order - 1).toString();
			t2 = head + '_' + (order - 2).toString();
			mjteam = [t2, t1, mjid];
		}
		if(chipos == 2) {
			t1 = head + '_' + (order - 1).toString();
			t2 = head + '_' + (order + 1).toString();
			mjteam = [t1, mjid, t2];
		}
		return mjteam;
	};

	self.getChiTypeCount = function(chiresult) {
		var n = 0;
		for(var i in chiresult) {
			if(chiresult[i])
				n++;
		}
		return n;
	};
	self.getChiPos = function(chiresult) {
		var pos = 0;
		if(chiresult[0])
			pos = 0;
		if(chiresult[1])
			pos = 1;
		if(chiresult[2])
			pos = 2;
		return pos;
	};
};

//玩家配置数据
game.userdata = new function() {
	var self = this;

	self.usersDir = ['down', 'left', 'up', 'right'];

	self.userInfo = {
		down: null,
		left: null,
		up: null,
		right: null,
	};

	self.oneself = {
		idname: '麻将不输钱',
		cardnums: 6,
	};

	self.init = function() {
		self.userInfo['down'] = new game.PlayerInfo({
			direct: 'down',
			idname: '麻将不输钱',
			score: 891,
			isbank: true,
			cardnums: 6,
		});
		self.userInfo['left'] = new game.PlayerInfo({
			direct: 'left',
			idname: '￥@_@￥',
			score: -11,
			isbank: false,
			cardnums: 20,
		});
		self.userInfo['up'] = new game.PlayerInfo({
			direct: 'up',
			idname: 'MARY',
			score: 21,
			cardnums: 33,
			isbank: false,
		});
		self.userInfo['right'] = new game.PlayerInfo({
			direct: 'right',
			idname: '常常渐渐默默',
			score: -411,
			cardnums: 1,
			isbank: false,
		});
	};

};

//房间配置数据
game.roominfo = new function() {
	var self = this;

	self.PAYTYPES = ['放胡单赔', '放胡双倍单赔', '放胡全赔'];
	self.COUNTDOWN_TIME = 10;
	self.LASTMJNUM = 4;
	self.id = '000000';
	self.paytype = 0;
	self.paytypeSt = '';
	self.playerNums = 0;
	self.isCreate = false;
	self.isStart = false;
	self.lastmj = self.LASTMJNUM; //黄庄的剩余张
	self.totalCount = 0; //局数
	self.whopay = 0; //谁支付房卡    房主 雀神

	self.countdown = self.COUNTDOWN_TIME; //创建倒计时

	self.sumtime = 0;

	self.setData = function(roomid, paytype, playerNums, whopay, count) {
		self.id = roomid;
		self.paytype = paytype;
		self.playerNums = playerNums;
		self.paytypeSt = self.PAYTYPES[self.paytype];
		self.totalCount = count;
		self.whopay = whopay;
	};
	//清零
	self.resetDefault = function() {
		self.id = '000000';
		self.paytype = 0;
		self.paytypeSt = '';
		self.playerNums = 0;
		self.isCreate = false;
		self.countdown = self.COUNTDOWN_TIME; //创建倒计时
		self.isStart = false;
		self.lastmj = self.LASTMJNUM;
	};

	self.getData = function() {
		return {
			roomid: self.id,
			playerNums: self.playerNums,
			paytype: self.paytypeSt,
			countdown: self.countdown,
		};
	};

	self.tick = function() {
		if(self.isCreate && !self.isStart) {
			self.sumtime += game.clock.getTick();
			if(self.sumtime > 1000 || Math.abs(self.sumtime - 1000) < 10) {
				console.log(self.sumtime);
				self.sumtime = 0;
				self.countdown--;
				if(self.countdown < 0) {
					self.countdown = 0;
					game.sendMsg(this, game.currentScene, game.networker.msg.DISBANDROOM, true);
					console.log('发出解散房间消息-->%s', game.currentScene.name);
					self.resetDefault();
				}
			}
		}
	};
};

//活动配置数据
game.InviteData = new function() {
	var self = this;

	self.rulenote = '1.邀请好友下载并登录朋朋政和麻将，在邀请码处输入您发送的邀请码，你的好友可以登录并领取房卡奖励。\n2.被邀请的好友玩4局之后，您可以获得房卡奖励。';

	self.PAYTYPES = ['放胡单赔', '放胡双倍单赔', '放胡全赔'];
	self.id = '000000';
	self.paytype = 0;
	self.paytypeSt = '';
	self.playerNums = 0;
	self.isCreate = false;

	self.setData = function(roomid, paytype, playerNums) {
		self.id = roomid;
		self.paytype = paytype;
		self.playerNums = playerNums;
		self.paytypeSt = self.PAYTYPES[self.paytype];
	};

	self.getData = function() {
		return {
			roomid: self.id,
			playerNums: self.playerNums,
			paytype: self.paytypeSt
		};
	}
};

//麻将界面配置数据
game.playsceneUidata = new function() {
	var self = this;
	this.width = 0;
	this.height = 0;
	this.mjselfW = 76;
	this.mjselfH = 114;
	this.shmjW = 40;
	this.shmjH = 53;
	this.svmjW = 49;
	this.svmjH = 50;
	this.slideMjWidth = 21;
	this.slideMjHeight = 52;
	this.initPostion = null;

	this.init = function(width, height) {
		this.width = width;
		this.height = height;
		this.initPostion = {
			down: {
				dealX: Math.floor(this.width * 0.02),
				dealY: Math.floor(this.height - 10 - this.mjselfH * game.scalefact),
				throwX: Math.floor(this.width * 0.3),
				throwY: Math.floor(this.height * 0.68),
				huaX: Math.floor(this.width * 0.3),
				huaY: Math.floor(this.height * 0.78),
				huaCount: 0,
				userX: this.width * 0.01,
				userY: this.height * 0.625,
				showX: this.width / 2 - this.mjselfW / 2 * game.scalefact,
				showY: this.height / 2 - this.mjselfH / 2 * game.scalefact + this.mjselfH * game.scalefact,
			},
			up: {
				dealX: Math.floor(this.width * 0.3),
				dealY: Math.floor(this.height * 0.125),
				throwX: Math.floor(this.width * 0.3),
				throwY: Math.floor(this.height * 0.28),
				huaX: Math.floor(this.width * 0.3),
				huaY: Math.floor(this.height * 0.20),
				huaCount: 0,
				userX: this.width * 0.67,
				userY: this.height * 0.07,
				showX: this.width / 2 - this.mjselfW / 2 * game.scalefact,
				showY: this.height / 2 - this.mjselfH / 2 * game.scalefact - this.mjselfH * game.scalefact,
			},
			left: {
				dealX: Math.floor(this.width * 0.125), // - this.slideMjWidth * game.scalefact),
				dealY: Math.floor(this.height * 0.11),
				throwX: Math.floor(this.width * 0.24 - this.svmjH),
				throwY: Math.floor(this.height * 0.25),
				huaX: Math.floor(this.width * 0.145),
				huaY: Math.floor(this.height * 0.11),
				huaCount: 0,
				userX: this.width * 0.01,
				userY: this.height * 0.25,
				showX: this.width / 2 - this.mjselfW / 2 * game.scalefact - this.mjselfW * game.scalefact,
				showY: this.height / 2 - this.mjselfH / 2 * game.scalefact,
			},
			right: {
				dealX: Math.floor(this.width * 0.86),
				dealY: Math.floor(this.height * 0.20),
				throwX: Math.floor(this.width * 0.77),
				throwY: Math.floor(this.height * 0.25),
				huaX: Math.floor(this.width * 0.82),
				huaY: Math.floor(this.height * 0.25),
				huaCount: 0,
				userX: this.width * 0.88,
				userY: this.height * 0.5,
				showX: this.width / 2 - this.mjselfW / 2 * game.scalefact + this.mjselfW * game.scalefact,
				showY: this.height / 2 - this.mjselfH / 2 * game.scalefact,
			}
		};
	};
};