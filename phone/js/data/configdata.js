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
		weixinlogin:'WEIXIN_LOGIN_SCENENAME',
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
		var result = new game.MjSelectbox({
			imgbg:imgbg,
			imgcheck:imgcheck,
			x:x,
			y:y
		});
		result.scaleX = game.scalefact;
		result.scaleY = game.scalefact;
		return result;
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
   				y:yp,
   				scaleX:game.scalefact,
   				scaleY:game.scalefact,
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
			case 'bg':
				rect_data = game.loaddata.IMAGEDATA_3[pngname];
				imgsource = game.getImg('bgs');
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
			case 'ui':  //
				rect = game.loaddata.IMAGEDATA_1[pngname];
				break;
			case 'mj': //
				rect = game.loaddata.IMAGEDATA_2[pngname];
				break;
			case 'bg': //
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
					itemurlvalue:'battle_7',
					layouttype_x:'pct',
					alignx:'right_25',
					layouttype_y:'pct',
					aligny:'bottom_25',
				},
				{
					itemid:'id_bg_girl19',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'chibeijing1',
					layouttype_x:'follow',
					alignx:'id_bg_girl18&100',
					layouttype_y:'follow',
					aligny:'id_bg_girl18&-100',
				},
				{
					itemid:'id_bg_girl20',
					itemtype:'bmp',
					itemurltype:'rect',
					itemurlvalue:'battle_100',
					layouttype_x:'follow',
					alignx:'id_bg_girl18&100',
					layouttype_y:'follow',
					aligny:'id_bg_girl19&50',
				},
				/*{
					itemid:'id_weixinlogin_btn',
					itemtype:'btn',
					itemurltype:'rect',
					itemurlvalue:'login_10',
					btnup:'login_11',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'txt',
					aligny:'center'
				}*/
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
	this.layoutPanelData = function(uidata,panelwidth,panelheight,scalefact,imgsourcename,theparent){
			if(!imgsourcename){
				imgsourcename = 'ui';
			}
			var tmpposdic = {};
			panelwidth = panelwidth * scalefact;
			panelheight = panelheight * scalefact;
			for(var i=0;i<uidata.length;i++){
				var itemdata = uidata[i];
				var posxy = game.layoutUi.getItemPos(itemdata,panelwidth,panelheight,imgsourcename,tmpposdic);
				var rect = game.configdata.getPngRect(itemdata.itemurlvalue,imgsourcename);
				var x = posxy[0];
				var y = posxy[1];
				var w = rect[2] * game.scalefact;
				var h = rect[3] * game.scalefact;
				tmpposdic[itemdata.itemid] = [x,y,w,h];
				if(itemdata.itemtype === 'bmp'){ 
					theparent.items[itemdata.itemid] = game.configdata.creatRectImg(imgsourcename,itemdata.itemurlvalue,x,y,game.scalefact).addTo(theparent);
				}
				if(itemdata.itemtype === 'btn'){ 
					theparent.items[itemdata.itemid] = game.configdata.createButton(itemdata.itemurlvalue,itemdata.btnup,x,y).addTo(theparent);
				}
				if(itemdata.itemtype === 'selectbox'){ 
					theparent.items[itemdata.itemid] = game.configdata.createSelectbox(itemdata.itemurlvalue,itemdata.selectvalue,x,y).addTo(theparent);
				}
			}
	};
	
	this.getItemPos = function(itemdata,panelwidth,panelheight,imgsourcename,tmpposdic){
			if(itemdata.layouttype_x === 'txt'){
						var aligntype = itemdata.alignx;
						if(aligntype === 'center'){
							aligntype = 'center_x';
						}
						var x= this.getItemTxtPos(aligntype,itemdata.itemurlvalue,panelwidth,panelheight,imgsourcename);
				}
			if(itemdata.layouttype_y === 'txt'){
						aligntype = itemdata.aligny;
						if(aligntype === 'center'){
							aligntype = 'center_y';
						}
						var y= this.getItemTxtPos(aligntype,itemdata.itemurlvalue,panelwidth,panelheight,imgsourcename);
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
						var x= this.getItemPctPos(aligntype,value,itemdata.itemurlvalue,panelwidth,panelheight,imgsourcename);
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
						var y= this.getItemPctPos(aligntype,value,itemdata.itemurlvalue,panelwidth,panelheight,imgsourcename);
					}
			if(itemdata.layouttype_x === 'follow'){
						var aligntype = itemdata.alignx;
						var tm = aligntype.split('&');
						var targetItemid = tm[0];
						var value = parseInt(tm[1]);
						var x= this.getItemFollowPos(targetItemid,value,'horizontal',tmpposdic);
				}
			if(itemdata.layouttype_y === 'follow'){
						var aligntype = itemdata.aligny;
						var tm = aligntype.split('&');
						var targetItemid = tm[0];
						var value = parseInt(tm[1]);
						var y = this.getItemFollowPos(targetItemid,value,'vertical',tmpposdic);
				}		
			return [x,y];
		};
		
	this.getItemPctPos = function(relativepos,pctvalue,namevalue,panelwidth,panelheight,imgsourcename){
			var rect = game.configdata.getPngRect(namevalue,imgsourcename);
			var result = 0;
			var w = rect[2] * game.scalefact;
			var h = rect[3] * game.scalefact;
			var dis = 0;
			switch(relativepos){
				case 'center_x':
					if(pctvalue > 0){
						dis = (panelwidth/100.0) * pctvalue;
					}else{
						dis = (panelwidth/100.0) * pctvalue - w;
					}
					result =  panelwidth/2 + dis ;
					break;
				case 'center_y':
					if(pctvalue > 0){
						dis = (panelheight/100.0) * pctvalue;
					}else{
						dis = (panelheight/100.0) * pctvalue - h;
					}
					result =  panelheight/2 + dis ;
					break;
				case 'top':
					result = (panelheight/100.0) * pctvalue;
					break;
				case 'bottom':
					result = panelheight - (panelheight/100.0) * pctvalue -h;
					break;
				case 'left':
					result = (panelwidth/100.0) * pctvalue;
					break;
				case 'right':
					result = panelwidth - (panelwidth/100.0) * pctvalue - w;
					break;
			}
			return result;
		};
		
	this.getItemTxtPos = function(txtvalue,namevalue,panelwidth,panelheight,imgsourcename){
			var rect = game.configdata.getPngRect(namevalue,imgsourcename);
			var result = 0;
			var w = rect[2] * game.scalefact;
			var h = rect[3] * game.scalefact;
			switch(txtvalue){
				case 'center_x':
					result =  Math.floor((panelwidth - w)/2.0);
					break;
				case 'center_y':
					result = Math.floor((panelheight - h)/2.0);
					break;
				case 'bottom':
					result = panelheight - h;
					break;
				case 'top':
					result = 0;
					break;
				case 'left':
					result = 0;
					break;
				case 'right':
					result = panelwidth - w;
					break;
			}
			return result;
	};
		
	this.getItemFollowPos = function(itemid,followvalue,directtype,tmpposDic){
		var referenceX = tmpposDic[itemid][0];
		var referenceY = tmpposDic[itemid][1];
		switch(directtype){
			case 'vertical':
					result = referenceY + followvalue ;
					break;
			case 'horizontal':
					result = referenceX + followvalue;
					break;
			}
		return result;
	};
	
	
	this.drawStepLine = function(panelwidth,panelheight,panel,scalefact){
			if(!scalefact){
				scalefact = 1.0;
			}
			var w = panelwidth/4 * scalefact;
			var h = panelheight/4 * scalefact;
			for(var i=0;i<16;i++){
				var x = i%4 * w;
				var y = Math.floor(i/4) * h;
				this.drawLine(x,y,w,h,panel);
			}
	};
		
	this.drawLine = function(initx,inity,w,h,panel){
			for(var i=0;i<4;i++){
				game.drawdata.drawItemRect(1,'white','rgba(0,0,0,0)',initx+i%2 * w/2,inity+Math.floor(i/2)*h/2,w/2,h/2,panel);
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


