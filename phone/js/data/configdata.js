game = window.game || {};


game.configdata = new function(){
	var self = this;
	// 配置信息    只读属性
	self.CANVASID = 'CANVAS_ID';
	self.NOLINE = true;
	self.BGCOLOR ='#000000';
	self.FPS = 60;
	self.RESOURCE_BASEDIR = 'img';
	
	self.MUTE = false;
	
	self.MAXSIZE = {maxWidth:736.0,maxHeight:414.0};
	self.GAME_COLORS = {
		btntxtclr:'#FED28B'
	};
	self.STORESIZE = 15;
	
	self.DEFAULTHEROHP = 4;
	
	
	
	self.SCENE_NAMES ={
		load:'LOAD_SCENE_NAME',
		login:'LOGIN_SCENE_NAME',
		main:'MAIN_SCENE_NAME',
		over:'GAME_SCENE_NAME',
		shop:'SHOP_SCENE_NAME',
		
	};
	
	self.LAYOUTTYPE = {
		img:'IMAGE_TYPE',
		activeobj:'ACTIVEOBJECT_TYPE',
	},
	
	self.MSAGE_TYPE ={
		
	},
	
	
	

	self.mainStageSize ={width:320,height:480};
	
	
	self.getObjectSize = function(pngname){
		var rect = self.IMAGEDATA_3[pngname];
		if(rect == null){
			console.log('Error 1:-------------------------------- %s is not exist',pngname);
			return [0,0,0,0];
		}else{
			return rect;
		}
	}
	
	self.createSelectbox = function(imgbg,imgcheck,x,y){
		return new game.MjSelectbox({
			imgbg:imgbg,
			imgcheck:imgcheck,
			x:x,y:
			y});
	}
	
	self.createButton = function(uprectname,downrectname,x,y){
		var uprect = game.configdata.getPngRect(uprectname);
		var downrect = game.configdata.getPngRect(downrectname);
		var xp = 0;
		var yp = 0;
		if(x){
			xp = x;
		}
		if(y){
			yp = y;
		}
		return new Hilo.Button({
				image:game.getImg('ui'),
				upState: {rect:uprect},
  				overState: {rect:downrect},
  				downState: {rect:downrect},
   				disabledState: {rect:downrect},
   				x:xp,
   				y:yp
			});
	}
	
	self.creatRectImg = function(imgType,pngname,x,y,scalefact){
		var rect_data = null;
		var imgsource = null;
		switch(imgType){
			case 'ui':
				rect_data = game.loaddata.IMAGEDATA_1[pngname];
				imgsource = game.getImg('ui');
				break;
			case 'mj':
				rect_data = game.loaddata.IMAGEDATA_2[pngname];
				imgsource = game.getImg('mjbattle');
				break;
			default:
				rect_data = game.loaddata.IMAGEDATA_1[pngname];
				imgsource = game.getImg('ui');
				break;
		}
		
		if(rect_data == null){
			console.log('ErrorMj 1:-------------------------------- %s is not exist',pngname);
			rect_data = [0,0,0,0];
		}
		var xp = 0;
		var yp = 0;
		var w_size = rect_data[2];
		var h_size = rect_data[3];
		if(x)
		    xp = x;
		if(y)
			yp = y;
		if(scalefact)
			w_size = Math.floor(w_size * scalefact);
		if(scalefact)
			h_size = Math.floor(h_size * scalefact);
		return new Hilo.Bitmap({
				image:imgsource,
				rect:rect_data,
				x:xp,
				y:yp,
				width:w_size,
				height:h_size
			});
	}
	
	self.getPngRect = function(pngname,sourcePng){
		var rect = null;
		switch(sourcePng){
			case 'ui':  //objects
				rect = game.loaddata.IMAGEDATA_1[pngname];
				break;
			case 'mj': //effects
				rect = game.loaddata.IMAGEDATA_2[pngname];
				break;
			case 'action': //actions
				rect = game.loaddata.IMAGEDATA_3[pngname];
				break;
			default:
				rect = game.loaddata.IMAGEDATA_1[pngname];
				break;
		}
		if(rect == null){
			console.log('Error 1:-------------------------------- %s is not exist',pngname);
			return [0,0,0,0];
		}else{
			return rect;
		}
	}
	
	
	self.getRectList = function(names){
		var list = _.map(names,function(item){
			return self.getPngSize();
		});
		return list;
	}
	
	self.getList = function(names){
		var list = [];
		for(var i=0;i<names.length;i++){
			rect = self.getPngSize2(names[i]);
			list.push(rect);
		}
	}
	
	self.testuidata =[
				{
					itemid:'id_bg_girl1',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'left',
					layouttype_y:'txt',
					aligny:'top'
				},
				{
					itemid:'id_bg_girl2',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'txt',
					aligny:'top'
				},
				{
					itemid:'id_bg_girl3',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'right',
					layouttype_y:'txt',
					aligny:'top'
				},
				{
					itemid:'id_bg_girl4',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'left',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_bg_girl5',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'tuiguang16',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_bg_girl6',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'right',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_bg_girl7',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'left',
					layouttype_y:'txt',
					aligny:'bottom'
				},
				{
					itemid:'id_bg_girl8',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'txt',
					aligny:'bottom'
				},
				{
					itemid:'id_bg_girl9',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'right',
					layouttype_y:'txt',
					aligny:'bottom'
				},
				{
					itemid:'id_bg_girl11',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'pct',
					alignx:'center_-5',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_bg_girl12',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'pct',
					alignx:'center_5',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_bg_girl13',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'pct',
					aligny:'center_-10',
				},
				{
					itemid:'id_bg_girl14',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'pct',
					aligny:'center_10',
				},
				{
					itemid:'id_bg_girl15',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'pct',
					alignx:'left_15',
					layouttype_y:'txt',
					aligny:'center',
				},
				{
					itemid:'id_bg_girl16',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'pct',
					alignx:'right_15',
					layouttype_y:'txt',
					aligny:'center',
				},
				{
					itemid:'id_bg_girl17',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'pct',
					alignx:'left_25',
					layouttype_y:'pct',
					aligny:'top_25',
				},
				{
					itemid:'id_bg_girl18',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'pct',
					alignx:'right_25',
					layouttype_y:'pct',
					aligny:'bottom_25',
				},
			];
};


game.sounds = new function(){
	var self = this;
	this.sounds_url =[
	'bg01.mp3',   //0
	'di01.mp3',   //1
	'di02.mp3',   //2
	'deadth.mp3',  //3
	'firewarn.mp3', //4
	'turn.mp3', //5
	'uplv.mp3',//6
	'opendoor.mp3',//7
	'warn01.mp3',//8
	'fail.mp3',//9
	'break.mp3',//10
	'laugh.mp3',//11
	'ting.mp3',//12
	'shake.mp3',//13
	'music_logo.mp3',//14
	'verygood.mp3',//15
	'elec.mp3',//16
	'annihilator.mp3',//17
	'sayno.mp3',//18
	'ting.mp3',//19
	'passbg.mp3',//20
	'dang.mp3',//21
	
	'dog.mp3',//22,  
	'knock.mp3',//23
	'fallbone.mp3',//24
	'aiyou.mp3',//25 哎呦喂
	'upjack.mp3',//压千斤顶 26
	'bee.mp3',//蜜蜂 27
	'carstart.mp3',//汽车发动 28
	'opencardoor.mp3',//开车门 29
	'grybox.mp3',//撬箱子 30
	'busrun.mp3',//开汽车 31
	'busbump.mp3',//车碰撞 32
	'openbusdoor.mp3',//气动阀门放气33
	'duanqiao.mp3',//一下敲击 34
	'water3.mp3',//水龙头35
	'dididi.mp3',//滴滴警报36
	];
	this.play = function(index,loop){
		if(game.configdata.MUTE)
			return;
		if(loop == null)
			loop = false;
		audio = Hilo.WebSound.getAudio({
			src:'sound/'+this.sounds_url[index],
			loop:loop
		}).play();
	};
	this.stop = function(index){
		var src = 'sound/'+this.sounds_url[index];
		Hilo.WebSound.removeAudio(src);
	};
};

game.layoutUi = new function(){
	var self = this;
	this.getItemPos = function(itemdata){
			if(itemdata.layouttype_x === 'txt'){
						var aligntype = itemdata.alignx;
						if(aligntype === 'center'){
							aligntype = 'center_x';
						}
						var x= this.getItemTxtPos(aligntype,itemdata.itemurlvalue);
				}
			if(itemdata.layouttype_y === 'txt'){
						aligntype = itemdata.aligny;
						if(aligntype === 'center'){
							aligntype = 'center_y';
						}
						var y= this.getItemTxtPos(aligntype,itemdata.itemurlvalue);
				}
			if(itemdata.layouttype_x === 'pct'){
						var aligntype = itemdata.alignx;
						var tm = aligntype.split('_');
						var value = parseInt(tm[1]);
						if(tm[0] === 'center'){
							aligntype = 'center_x';
						}else{
							aligntype = tm[0];
						}
						var x= this.getItemPctPos(aligntype,value,itemdata.itemurlvalue);
					}
			if(itemdata.layouttype_y === 'pct'){
						aligntype = itemdata.aligny;
						var tm = aligntype.split('_');
						var value = parseInt(tm[1]);
						if(tm[0] === 'center'){
							aligntype = 'center_y';
						}else{
							aligntype = tm[0];
						}
						var y= this.getItemPctPos(aligntype,value,itemdata.itemurlvalue);
					}
			return [x,y];
		};
		
	this.getItemPctPos = function(relativepos,pctvalue,namevalue){
			var rect = game.configdata.getPngRect(namevalue);
			var result = 0;
			var w = rect[2] * game.scalefact;
			var h = rect[3] * game.scalefact;
			var dis = 0;
			switch(relativepos){
				case 'center_x':
					if(pctvalue > 0){
						dis = (game.screenWidth/100.0) * pctvalue;
					}else{
						dis = (game.screenWidth/100.0) * pctvalue - w;
					}
					result =  game.screenWidth/2 + dis ;
					break;
				case 'center_y':
					if(pctvalue > 0){
						dis = (game.screenHeight/100.0) * pctvalue;
					}else{
						dis = (game.screenHeight/100.0) * pctvalue - h;
					}
					result =  game.screenHeight/2 + dis ;
					break;
				case 'top':
					result = (game.screenHeight/100.0) * pctvalue;
					break;
				case 'bottom':
					result = game.screenHeight - (game.screenHeight/100.0) * pctvalue -h;
					break;
				case 'left':
					result = (game.screenWidth/100.0) * pctvalue;
					break;
				case 'right':
					result = game.screenWidth - (game.screenWidth/100.0) * pctvalue - w;
					break;
			}
			return result;
		};
		
	this.getItemTxtPos = function(txtvalue,namevalue){
			var rect = game.configdata.getPngRect(namevalue);
			var result = 0;
			var w = rect[2] * game.scalefact;
			var h = rect[3] * game.scalefact;
			switch(txtvalue){
				case 'center_x':
					result =  Math.floor((game.screenWidth - w)/2.0);
					break;
				case 'center_y':
					result = Math.floor((game.screenHeight - h)/2.0);
					break;
				case 'bottom':
					result = game.screenHeight - h;
					break;
				case 'top':
					result = 0;
					break;
				case 'left':
					result = 0;
					break;
				case 'right':
					result = game.screenWidth - w;
					break;
			}
			return result;
	};
		
	this.layoutUiData = function(uidata,parentScene){
			for(var i=0;i<uidata.length;i++){
				var itemdata = uidata[i];
				if(itemdata.itemtype === 'bmp'){
					var posxy = this.getItemPos(itemdata);
					var x = posxy[0];
					var y = posxy[1];
					var rect = game.configdata.getPngRect(itemdata.itemurlvalue,'uimap');
					var w = rect[2] * game.scalefact;
					var h = rect[3] * game.scalefact;
					this.items[itemdata.id] = game.configdata.creatRectImg('ui',itemdata.itemurlvalue,x,y,game.scalefact).addTo(parentScene);
				}
			}
	};
}

game.clock = new function(){
	var self = this;
	self.fpstick = 0;
	self.lasttime = 0;
	self.systemtime = 0;
	self.framecount = 0;
	
	self.tick = function(){
		var now =+ new Date;
		self.fpstick = now - self.lasttime;
		self.framecount++;
		self.systemtime += self.fpstick;
		self.lasttime = now;
	};
	self.getSystemtime = function(){
		return self.systemtime;
	};
	self.getFrame = function(){
		return self.framecount;
	};
}

game.drawdata = new function(){
	var self = this;
	
	
	this.drawItemTxt = function(txt,font,clr,x,y,parent){
		return new Hilo.Text({
			text:txt,
			font:font,
			color:clr,
			x: x,
			y: y,
		}).addTo(parent);
	};
	this.drawItemRect = function(linesize,lineclr,fillclr,x,y,w,h,parent){
		 var g1 = new Hilo.Graphics({x:x, y:y});
         g1.lineStyle(linesize,lineclr).beginFill(fillclr).drawRect(0, 0, w, h).endFill().addTo(parent);
         return g1;
	};
	this.drawItemRoundrect = function(linesize,lineclr,fillclr,x,y,w,h,r,parent){
		 var g1 = new Hilo.Graphics({x:x, y:y});
         g1.lineStyle(linesize,lineclr).beginFill(fillclr).drawRoundRect(0, 0, w, h,r).endFill().addTo(parent);
         return g1;
	};
	this.drawItemCircle = function(linesize,lineclr,fillclr,x,y,r,parent){
		var g1 = new Hilo.Graphics({x:x, y:y});
		g1.lineStyle(linesize, lineclr).beginFill(fillclr).drawCircle(0, 0, r).endFill().addTo(parent);
        return g1;
	};
};


function addfps(x,y,parent){
	var fps = new game.FpsPanel({x:x,y:y});
	parent.addChild(fps);
}

function setLeft(viewojb){
	var parent = viewojb.parent;
	viewojb.x = parent.width/2 - viewojb.width/2;
	viewojb.y = parent.height/2 - viewojb.height/2;
}


