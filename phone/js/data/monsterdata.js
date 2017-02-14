game = window.game || {};

game.sceneuidata = new function(){
	var self = this;
	
	self.init = function(){
		console.log('scene ui data init');
	};
	
	self.weixinlogin_uidata = [
	        [
				{
					itemid:'id_weixinlogbg_girl_bmp',
					itemtype:'bmp',
					itemurlvalue:'login_girl',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'pct',
					aligny:'top_5'
				},
	        ],
			[
				{
					itemid:'id_weixinlogin_btn',
					itemtype:'btn',
					itemurlvalue:'login_10',
					btnup:'login_11',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_agreeweixinlogin_selectbox',
					itemtype:'selectbox',
					itemurlvalue:'login_bg48',
					selectvalue:'login_4',
					layouttype_x:'pct',
					alignx:'left_36',
					layouttype_y:'pct',
					aligny:'bottom_10'
				},
				{
					itemid:'id_weixinlogin_txt',
					itemtype:'bmp',
					itemurlvalue:'login_5',
					layouttype_x:'follow',
					alignx:'id_agreeweixinlogin_selectbox&45',
					layouttype_y:'follow',
					aligny:'id_agreeweixinlogin_selectbox&15'
				}
			]
		];
	
	self.initAtlas = function(){
		var img = game.getImg('boyaction');
		self.animal_atlas = new Hilo.TextureAtlas({
			image:'img/loadimgs/animalatlas.png',
			width:343,
			height:380,
			frames:[[216, 285, 37, 38], [216, 325, 37, 38], [108, 285, 106, 93], [108, 190, 106, 93], [108, 95, 106, 93], [108, 0, 106, 93], [216, 190, 106, 93], [216, 95, 106, 93], [216, 0, 106, 93], [216, 95, 106, 93], [0, 285, 106, 93], [0, 190, 106, 93], [0, 95, 106, 93], [0, 0, 106, 93], [314, 331, 27, 46], [285, 331, 27, 46], [285, 285, 28, 44], [255, 285, 28, 44], [255, 331, 28, 44]],
			sprites:{
				bee:[0,1],
				dogidle:[10,11,12,13],
				dogeat:[6,7,8,9],
				dogangry:[2,3,4,5],
			}
		});
		self.soliderhero_atlas = new Hilo.TextureAtlas({
				image: img,
				width: 1206,
				height: 1372,
				frames:[[402, 196, 132, 194], [402, 0, 132, 194], [268, 1176, 132, 194], [268, 980, 132, 194], [938, 392, 132, 194], [938, 196, 132, 194], [938, 0, 132, 194], [804, 1176, 132, 194], [804, 980, 132, 194], [804, 784, 132, 194], [536, 392, 132, 194], [1072, 784, 132, 194], [1072, 588, 132, 194], [1072, 392, 132, 194], [1072, 196, 132, 194], [804, 588, 132, 194], [804, 392, 132, 194], [804, 196, 132, 194], [804, 0, 132, 194], [670, 1176, 132, 194], [670, 980, 132, 194], [670, 784, 132, 194], [670, 588, 132, 194], [0, 784, 132, 194], [0, 588, 132, 194], [0, 392, 132, 194], [0, 196, 132, 194], [0, 0, 132, 194], [536, 196, 132, 194], [536, 0, 132, 194], [402, 1176, 132, 194], [402, 980, 132, 194], [1072, 0, 132, 194], [938, 1176, 132, 194], [938, 980, 132, 194], [938, 784, 132, 194], [938, 588, 132, 194], [536, 1176, 132, 194], [536, 980, 132, 194], [536, 784, 132, 194], [536, 588, 132, 194], [1072, 980, 132, 194], [134, 392, 132, 194], [134, 196, 132, 194], [134, 0, 132, 194], [0, 1176, 132, 194], [0, 980, 132, 194], [268, 784, 132, 194], [268, 588, 132, 194], [268, 392, 132, 194], [402, 784, 132, 194], [402, 588, 132, 194], [402, 392, 132, 194], [670, 392, 132, 194], [670, 196, 132, 194], [670, 0, 132, 194], [268, 196, 132, 194], [268, 0, 132, 194], [134, 1176, 132, 194], [134, 980, 132, 194], [134, 784, 132, 194], [134, 588, 132, 194]],
				sprites: {
					idle: [10,11,12,13,14],
					walk:{from:56,to:61},
					turn180:[10,47,48,49],
					backpick:[0,1,2,3],
					idleback:[49,49],
					handup:[6,6],
					knockladder:[15,16,17,18],
					onTopladder:[23,24,25,26,27],
					downTopladder:[23,24,25,26,27],
					upladder:[4,5,6,7,8,9],
					downladder:[4,5,6,7,8,9],
					fallladder:[19,20,21,22],
					prybox:[37,38,39,40,41],
					takeRightobj:[50,51,52],
					takebackput:[0,1,2,3],
					takebackputjack:[0,1,2,3],
					upjack:[53,54,55],
					nocan:[28,28,28,29,30,31],
				}
			});
			
			//----------------------------
			var img = game.getImg('actiontk');
		self.tkaction_atlas=	new Hilo.TextureAtlas({
		image: 'img/public/actiontk.png',
		width: 1340,
		height: 1568,
		frames:[[402, 1176, 132, 194], [402, 980, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 980, 132, 194], [402, 980, 132, 194], [402, 1176, 132, 194], [402, 1176, 132, 194], [536, 1372, 132, 194], [1206, 1176, 132, 194], [1206, 980, 132, 194], [1206, 784, 132, 194], [1206, 588, 132, 194], [1206, 392, 132, 194], [1206, 196, 132, 194], [1206, 0, 132, 194], [1206, 196, 132, 194], [1072, 1372, 132, 194], [1072, 1176, 132, 194], [1072, 980, 132, 194], [1072, 1176, 132, 194], [1072, 1176, 132, 194], [1072, 980, 132, 194], [1072, 1176, 132, 194], [1072, 784, 132, 194], [1206, 392, 132, 194], [1072, 588, 132, 194], [1206, 392, 132, 194], [1072, 392, 132, 194], [1072, 196, 132, 194], [1072, 0, 132, 194], [938, 1372, 132, 194], [938, 1176, 132, 194], [938, 980, 132, 194], [938, 784, 132, 194], [938, 588, 132, 194], [938, 392, 132, 194], [938, 784, 132, 194], [938, 1176, 132, 194], [804, 1372, 132, 194], [804, 1176, 132, 194], [804, 980, 132, 194], [804, 784, 132, 194], [804, 588, 132, 194], [804, 392, 132, 194], [804, 196, 132, 194], [804, 0, 132, 194], [670, 1372, 132, 194], [670, 1176, 132, 194], [804, 588, 132, 194], [670, 980, 132, 194], [670, 784, 132, 194], [670, 588, 132, 194], [670, 392, 132, 194], [670, 196, 132, 194], [670, 196, 132, 194], [670, 196, 132, 194], [670, 784, 132, 194], [536, 392, 132, 194], [536, 196, 132, 194], [536, 0, 132, 194], [402, 1372, 132, 194], [536, 0, 132, 194], [536, 0, 132, 194], [536, 196, 132, 194], [536, 392, 132, 194], [402, 1176, 132, 194], [402, 980, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 980, 132, 194], [402, 980, 132, 194], [402, 1176, 132, 194], [402, 1176, 132, 194], [670, 0, 132, 194], [1206, 1372, 132, 194], [536, 1176, 132, 194], [536, 980, 132, 194], [536, 784, 132, 194], [536, 588, 132, 194], [268, 1176, 132, 194], [268, 980, 132, 194], [268, 784, 132, 194], [268, 588, 132, 194], [402, 1176, 132, 194], [402, 588, 132, 194], [402, 392, 132, 194], [402, 196, 132, 194], [402, 0, 132, 194], [402, 1176, 132, 194], [804, 588, 132, 194], [804, 392, 132, 194], [804, 196, 132, 194], [268, 1372, 132, 194], [804, 588, 132, 194], [268, 392, 132, 194], [268, 196, 132, 194], [268, 0, 132, 194], [134, 1372, 132, 194], [134, 1372, 132, 194], [938, 1176, 132, 194], [938, 1176, 132, 194], [938, 980, 132, 194], [938, 784, 132, 194], [938, 588, 132, 194], [938, 392, 132, 194], [938, 784, 132, 194], [938, 196, 132, 194], [938, 0, 132, 194], [938, 196, 132, 194], [268, 1176, 132, 194], [268, 980, 132, 194], [134, 1176, 132, 194], [402, 784, 132, 194], [402, 1176, 132, 194], [134, 980, 132, 194], [134, 784, 132, 194], [134, 588, 132, 194], [134, 392, 132, 194], [134, 196, 132, 194], [134, 0, 132, 194], [134, 0, 132, 194], [134, 0, 132, 194], [0, 1372, 132, 194], [536, 392, 132, 194], [536, 196, 132, 194], [536, 0, 132, 194], [402, 1372, 132, 194], [536, 0, 132, 194], [536, 0, 132, 194], [536, 196, 132, 194], [536, 392, 132, 194], [0, 1176, 132, 194], [0, 980, 132, 194], [0, 784, 132, 194], [0, 588, 132, 194], [0, 784, 132, 194], [0, 980, 132, 194], [0, 1176, 132, 194], [0, 392, 132, 194], [0, 392, 132, 194], [0, 392, 132, 194], [0, 392, 132, 194], [0, 196, 132, 194], [0, 196, 132, 194], [0, 196, 132, 194], [0, 196, 132, 194], [0, 0, 132, 194], [0, 0, 132, 194], [0, 0, 132, 194], [0, 0, 132, 194]],
		sprites:{
			climbeladder:{from:9,to:14},
			cut:[15,18,19,20,21,22,23,24,25,16,17],
			getbattery:{from:26,to:28},
			hammering:{from:29,to:32},
			lift:{from:33,to:39},
			unlift:[39,38,37,36,35,34,33],
			liftandputthewall:[102,104,105,106,107,108,109,110,111,103],
			open:{from:40,to:43},
			pickupphone:{from:44,to:50},
			pour:{from:51,to:58},
			pourwater:{from:76,to:81},
			press:{from:59,to:66},
			pullandplug:{from:67,to:75},
			putwashbasintotable:{from:87,to:91},
			remove:{from:92,to:96},
			rightclick:{from:0,to:8},
			rightputthetowel:{from:82,to:86},
			sweep:{from:97,to:101},
			taketowel:{from:112,to:116},
			takewateranddrink:{from:117,to:125},
			tear:{from:126,to:133},
			wipepanel:{from:134,to:140},
			wrench:[141,143,145,147,149,151],
        	takewater:{from:117,to:119},
        	drinkwater:{from:120,to:125},
        	holdwater:[119],
        	downtake:[102,104,105,106,107,108,109],
			putthewall:[109,110,111,103],
			downladder:{from:9,to:14},
			onladder:[11],
			wipeonladder:[134],

		},
		});
			
			
			//--------  TK
			
			var effectimg = game.getImg('effect2');
			self.effect_atlas = new Hilo.TextureAtlas({
				image: effectimg,
				width: 2048,
				height: 2048,
				frames: [
					[1000,1224,156,403],
                	[1000,408,156,403],
                	[1000,0,156,403],
                	[1000,1632,156,403],
                	[1000,816,156,403],      //0-4   corridor fire
					
					[0, 650, 995, 320], 
					[0, 1300, 995, 320], 
					[0, 975, 995, 320], 
					[0, 1625, 995, 320], 
					[0, 325, 995, 320], 
					[0, 0, 995, 320],    //5-10  smokewall
					
					[1161,528,154,171],
					[1161,0,154,171],
					[1161,176,154,171],
					[1161,352,154,171],  //11-14 gas effect
				],
				sprites: {
					corridorfireeffect:[0,1,2,3,4],
					smokewalleffect:[5,6,7,8,9,10],
					gaseffect:[11,12,13,14]
				}
			});
	};
	
	self.createAtlas = function(data){
		var atlas = new Hilo.TextureAtlas({
			image: game.getImg(data.name),
			width: data.w,
			height: data.h,
			frames:data.frames,
			sprites:data.sprites,
		});
		return atlas;
	};
};


game.monsterdata = new function(){
	var self = this;
	
	self.soliderhero_atlas = null;
	self.animal_atlas = null,
	
	self.oldmannpc_atlas = null;
	self.effect_atlas = null;
	self.stive_atlas = null;
	self.updataFunc = [];
	
	self.init = function(){
		console.log('monster data init');
	};
	
	self.initAtlas = function(){
		var img = game.getImg('boyaction');
		self.animal_atlas = new Hilo.TextureAtlas({
			image:'img/loadimgs/animalatlas.png',
			width:343,
			height:380,
			frames:[[216, 285, 37, 38], [216, 325, 37, 38], [108, 285, 106, 93], [108, 190, 106, 93], [108, 95, 106, 93], [108, 0, 106, 93], [216, 190, 106, 93], [216, 95, 106, 93], [216, 0, 106, 93], [216, 95, 106, 93], [0, 285, 106, 93], [0, 190, 106, 93], [0, 95, 106, 93], [0, 0, 106, 93], [314, 331, 27, 46], [285, 331, 27, 46], [285, 285, 28, 44], [255, 285, 28, 44], [255, 331, 28, 44]],
			sprites:{
				bee:[0,1],
				dogidle:[10,11,12,13],
				dogeat:[6,7,8,9],
				dogangry:[2,3,4,5],
			}
		});
		self.soliderhero_atlas = new Hilo.TextureAtlas({
				image: img,
				width: 1206,
				height: 1372,
				frames:[[402, 196, 132, 194], [402, 0, 132, 194], [268, 1176, 132, 194], [268, 980, 132, 194], [938, 392, 132, 194], [938, 196, 132, 194], [938, 0, 132, 194], [804, 1176, 132, 194], [804, 980, 132, 194], [804, 784, 132, 194], [536, 392, 132, 194], [1072, 784, 132, 194], [1072, 588, 132, 194], [1072, 392, 132, 194], [1072, 196, 132, 194], [804, 588, 132, 194], [804, 392, 132, 194], [804, 196, 132, 194], [804, 0, 132, 194], [670, 1176, 132, 194], [670, 980, 132, 194], [670, 784, 132, 194], [670, 588, 132, 194], [0, 784, 132, 194], [0, 588, 132, 194], [0, 392, 132, 194], [0, 196, 132, 194], [0, 0, 132, 194], [536, 196, 132, 194], [536, 0, 132, 194], [402, 1176, 132, 194], [402, 980, 132, 194], [1072, 0, 132, 194], [938, 1176, 132, 194], [938, 980, 132, 194], [938, 784, 132, 194], [938, 588, 132, 194], [536, 1176, 132, 194], [536, 980, 132, 194], [536, 784, 132, 194], [536, 588, 132, 194], [1072, 980, 132, 194], [134, 392, 132, 194], [134, 196, 132, 194], [134, 0, 132, 194], [0, 1176, 132, 194], [0, 980, 132, 194], [268, 784, 132, 194], [268, 588, 132, 194], [268, 392, 132, 194], [402, 784, 132, 194], [402, 588, 132, 194], [402, 392, 132, 194], [670, 392, 132, 194], [670, 196, 132, 194], [670, 0, 132, 194], [268, 196, 132, 194], [268, 0, 132, 194], [134, 1176, 132, 194], [134, 980, 132, 194], [134, 784, 132, 194], [134, 588, 132, 194]],
				sprites: {
					idle: [10,11,12,13,14],
					walk:{from:56,to:61},
					turn180:[10,47,48,49],
					backpick:[0,1,2,3],
					idleback:[49,49],
					handup:[6,6],
					knockladder:[15,16,17,18],
					onTopladder:[23,24,25,26,27],
					downTopladder:[23,24,25,26,27],
					upladder:[4,5,6,7,8,9],
					downladder:[4,5,6,7,8,9],
					fallladder:[19,20,21,22],
					prybox:[37,38,39,40,41],
					takeRightobj:[50,51,52],
					takebackput:[0,1,2,3],
					takebackputjack:[0,1,2,3],
					upjack:[53,54,55],
					nocan:[28,28,28,29,30,31],
				}
			});
			
			//----------------------------
			var img = game.getImg('actiontk');
		self.tkaction_atlas=	new Hilo.TextureAtlas({
		image: 'img/public/actiontk.png',
		width: 1340,
		height: 1568,
		frames:[[402, 1176, 132, 194], [402, 980, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 980, 132, 194], [402, 980, 132, 194], [402, 1176, 132, 194], [402, 1176, 132, 194], [536, 1372, 132, 194], [1206, 1176, 132, 194], [1206, 980, 132, 194], [1206, 784, 132, 194], [1206, 588, 132, 194], [1206, 392, 132, 194], [1206, 196, 132, 194], [1206, 0, 132, 194], [1206, 196, 132, 194], [1072, 1372, 132, 194], [1072, 1176, 132, 194], [1072, 980, 132, 194], [1072, 1176, 132, 194], [1072, 1176, 132, 194], [1072, 980, 132, 194], [1072, 1176, 132, 194], [1072, 784, 132, 194], [1206, 392, 132, 194], [1072, 588, 132, 194], [1206, 392, 132, 194], [1072, 392, 132, 194], [1072, 196, 132, 194], [1072, 0, 132, 194], [938, 1372, 132, 194], [938, 1176, 132, 194], [938, 980, 132, 194], [938, 784, 132, 194], [938, 588, 132, 194], [938, 392, 132, 194], [938, 784, 132, 194], [938, 1176, 132, 194], [804, 1372, 132, 194], [804, 1176, 132, 194], [804, 980, 132, 194], [804, 784, 132, 194], [804, 588, 132, 194], [804, 392, 132, 194], [804, 196, 132, 194], [804, 0, 132, 194], [670, 1372, 132, 194], [670, 1176, 132, 194], [804, 588, 132, 194], [670, 980, 132, 194], [670, 784, 132, 194], [670, 588, 132, 194], [670, 392, 132, 194], [670, 196, 132, 194], [670, 196, 132, 194], [670, 196, 132, 194], [670, 784, 132, 194], [536, 392, 132, 194], [536, 196, 132, 194], [536, 0, 132, 194], [402, 1372, 132, 194], [536, 0, 132, 194], [536, 0, 132, 194], [536, 196, 132, 194], [536, 392, 132, 194], [402, 1176, 132, 194], [402, 980, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 784, 132, 194], [402, 980, 132, 194], [402, 980, 132, 194], [402, 1176, 132, 194], [402, 1176, 132, 194], [670, 0, 132, 194], [1206, 1372, 132, 194], [536, 1176, 132, 194], [536, 980, 132, 194], [536, 784, 132, 194], [536, 588, 132, 194], [268, 1176, 132, 194], [268, 980, 132, 194], [268, 784, 132, 194], [268, 588, 132, 194], [402, 1176, 132, 194], [402, 588, 132, 194], [402, 392, 132, 194], [402, 196, 132, 194], [402, 0, 132, 194], [402, 1176, 132, 194], [804, 588, 132, 194], [804, 392, 132, 194], [804, 196, 132, 194], [268, 1372, 132, 194], [804, 588, 132, 194], [268, 392, 132, 194], [268, 196, 132, 194], [268, 0, 132, 194], [134, 1372, 132, 194], [134, 1372, 132, 194], [938, 1176, 132, 194], [938, 1176, 132, 194], [938, 980, 132, 194], [938, 784, 132, 194], [938, 588, 132, 194], [938, 392, 132, 194], [938, 784, 132, 194], [938, 196, 132, 194], [938, 0, 132, 194], [938, 196, 132, 194], [268, 1176, 132, 194], [268, 980, 132, 194], [134, 1176, 132, 194], [402, 784, 132, 194], [402, 1176, 132, 194], [134, 980, 132, 194], [134, 784, 132, 194], [134, 588, 132, 194], [134, 392, 132, 194], [134, 196, 132, 194], [134, 0, 132, 194], [134, 0, 132, 194], [134, 0, 132, 194], [0, 1372, 132, 194], [536, 392, 132, 194], [536, 196, 132, 194], [536, 0, 132, 194], [402, 1372, 132, 194], [536, 0, 132, 194], [536, 0, 132, 194], [536, 196, 132, 194], [536, 392, 132, 194], [0, 1176, 132, 194], [0, 980, 132, 194], [0, 784, 132, 194], [0, 588, 132, 194], [0, 784, 132, 194], [0, 980, 132, 194], [0, 1176, 132, 194], [0, 392, 132, 194], [0, 392, 132, 194], [0, 392, 132, 194], [0, 392, 132, 194], [0, 196, 132, 194], [0, 196, 132, 194], [0, 196, 132, 194], [0, 196, 132, 194], [0, 0, 132, 194], [0, 0, 132, 194], [0, 0, 132, 194], [0, 0, 132, 194]],
		sprites:{
			climbeladder:{from:9,to:14},
			cut:[15,18,19,20,21,22,23,24,25,16,17],
			getbattery:{from:26,to:28},
			hammering:{from:29,to:32},
			lift:{from:33,to:39},
			unlift:[39,38,37,36,35,34,33],
			liftandputthewall:[102,104,105,106,107,108,109,110,111,103],
			open:{from:40,to:43},
			pickupphone:{from:44,to:50},
			pour:{from:51,to:58},
			pourwater:{from:76,to:81},
			press:{from:59,to:66},
			pullandplug:{from:67,to:75},
			putwashbasintotable:{from:87,to:91},
			remove:{from:92,to:96},
			rightclick:{from:0,to:8},
			rightputthetowel:{from:82,to:86},
			sweep:{from:97,to:101},
			taketowel:{from:112,to:116},
			takewateranddrink:{from:117,to:125},
			tear:{from:126,to:133},
			wipepanel:{from:134,to:140},
			wrench:[141,143,145,147,149,151],
        	takewater:{from:117,to:119},
        	drinkwater:{from:120,to:125},
        	holdwater:[119],
        	downtake:[102,104,105,106,107,108,109],
			putthewall:[109,110,111,103],
			downladder:{from:9,to:14},
			onladder:[11],
			wipeonladder:[134],

		},
		});
			
			
			//--------  TK
			
			var effectimg = game.getImg('effect2');
			self.effect_atlas = new Hilo.TextureAtlas({
				image: effectimg,
				width: 2048,
				height: 2048,
				frames: [
					[1000,1224,156,403],
                	[1000,408,156,403],
                	[1000,0,156,403],
                	[1000,1632,156,403],
                	[1000,816,156,403],      //0-4   corridor fire
					
					[0, 650, 995, 320], 
					[0, 1300, 995, 320], 
					[0, 975, 995, 320], 
					[0, 1625, 995, 320], 
					[0, 325, 995, 320], 
					[0, 0, 995, 320],    //5-10  smokewall
					
					[1161,528,154,171],
					[1161,0,154,171],
					[1161,176,154,171],
					[1161,352,154,171],  //11-14 gas effect
				],
				sprites: {
					corridorfireeffect:[0,1,2,3,4],
					smokewalleffect:[5,6,7,8,9,10],
					gaseffect:[11,12,13,14]
				}
			});
	};
	
	self.createAtlas = function(data){
		var atlas = new Hilo.TextureAtlas({
			image: game.getImg(data.name),
			width: data.w,
			height: data.h,
			frames:data.frames,
			sprites:data.sprites,
		});
		return atlas;
	};
};

//-----------
(function(ns) {
	var BoyData = ns.BoyData = Hilo.Class.create({
		currentHp:0,
		bagdata:[],
		bedroomData:null,
		passdata:null,
		constructor: function(properties) {
			this.init(properties);
		},
		init: function(properties) {
			console.log('user data init');
			this.reset();
		},
		reset:function(){
			this.bagdata = [];
			this.bedroomData = {
				isshake:{used:false},
				pillow:{status:1,used:false},
				phone:{status:1,used:false},
				glim:{status:1,used:false},
				drink:{status:1,used:false},
				medicalkit:{state:0,used:false},
				plug:{status:0,used:false},
			};
			this.cookieroomData ={
				panused:false,
				boxkeyused:false,
				spannerused:false,
				pipswitchused:false,
				annihilatorused:false,
				breadused:false,
				toasterused:false,  
				dooropenused:false,
			};
			this.shakecorridordata = {
				warnpaper:false,
				halfpic:false,
			};
			this.firecorridordata ={
				wallpaper:false,
				warnbox:false,
				tel:false,
				stone:false,
			};
			this.washroomdata ={
				annihilator:false,
				towel:false,
			};
			
			this.depotdata = {
				pass:false,
				tyreonline:false,
				tyreonfloor:false,
				canused:false,
				canfull:false,
				tyreoncar:false,
			},
			this.incardata = {
				clipperused:false,
			},
			//-1 No start 0:doing -1:finished
			//calamity
			this.passdata = [
			[0,'chehuo',game.configdata.SCENE_NAMES.traffic_repaircar],
			[0,'planecabin',game.configdata.SCENE_NAMES.fire_gallery],
			[0,'planeout',game.configdata.SCENE_NAMES.earthquake_lobby],
			[0,'typhoon',game.configdata.SCENE_NAMES.typhoon_cave],
			[0,'confusion',game.configdata.SCENE_NAMES.confusion_switchbox],
			[0,'plane',game.configdata.SCENE_NAMES.plane_board],
			];
			//ecosystem
			this.passdata2 = [
			[0,'intopipe',game.configdata.SCENE_NAMES.water_intopipe],
			[0,'repair',game.configdata.SCENE_NAMES.sky_knockshrew],
			[0,'planeout',game.configdata.SCENE_NAMES.earth_roadbattery],
			[0,'typhoon',game.configdata.SCENE_NAMES.quiet_enterfactory],
			];
		},
		addHp:function(){
			if(this.currentHp < game.configdata.DEFAULTHEROHP){
				this.currentHp++;
			}
		},
	});
})(window.game);


//-----------
(function(ns) {
	var HeroData = ns.HeroData = Hilo.Class.create({
		hp:-1,
		totalhp:-1,
		lv:-1,
		power:-1,
		nimble:-1,
		buffer:-1,
		start:-1,
		magic:-1,
		attackCd:-1,
		storedata:null,
		bagdata:null,
		lockdata:null,
		doorsState:null,
		activePointIndex:-1,
		killMonsters:-1,
		winPoints:-1,
		critialRatio:-1,
		missRatio:-1,
		constructor: function(properties) {
			this.init(properties);
		},
		init: function(properties) {
			console.log('hero data init');
			this.storedata = [
   				 1,2,3,4,5,0,
  				 2,10,11,3,4,5,
				];

 			this.bagdata = [
 				[1,4,12,13],[1,3]
			];

			this.lockdata = [
				0,0,0,0,0,0,0,
				0,0,0,0,0,0,0,
				0,0,0,0,0,0,0
			];
			this.doorsState  = [
				  {open:true, state:0,doorIndex:0},
				  {open:false,state:0,doorIndex:1},
				  {open:false,state:0,doorIndex:2},
				  {open:false,state:0,doorIndex:3},
				  {open:false,state:0,doorIndex:4},
				  {open:false,state:0,doorIndex:5},
				  {open:false,state:0,doorIndex:6},
				  {open:false,state:0,doorIndex:7},
			];
			
			this.totalhp = 100;
			this.hp = this.totalhp;
			this.star = 0;
			this.power= 20;
			this.nimble=2;
			this.exp=200;
			this.lv=5;
			this.magic=4;
			this.attackCd=1000;
			this.activeDoorIndex = 0;
			this.killMonsters = 0;
			this.killBosses = 0;
			this.winPoints =0;
			this.critialRatio = 0.99;
			this.missRatio = 0.4;
		},
		unlock:function(kind,index){
			if(kind >2)
				kind = 2;
			if(index > 6)
				index = 6;
			var arrayIndex = kind * 3 + index;
			this.lockdata[arrayIndex] = 1;
			game.userData.saveHeroDataJsonSt();
		},
		reset: function() {
			this.data.hp = 8;
		},
	});
})(window.game);



