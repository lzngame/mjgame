game = window.game || {};

game.configdata = new function() {
	var self = this;
	// 配置信息    只读属性
	self.CANVASID = 'CANVAS_ID';
	self.NOLINE = true;
	self.BGCOLOR = '#000000';
	self.FPS = 60;
	self.RESOURCE_BASEDIR = 'img';

	self.MUTE = false;

	self.MAXSIZE = { maxWidth: 736.0, maxHeight: 414.0 };
	self.GAME_COLORS = {
		btntxtclr: '#FED28B'
	};
	self.STORESIZE = 15;

	self.DEFAULTHEROHP = 4;

	self.SCENE_NAMES = {
		load: 'LOAD_SCENE_NAME',
		login: 'LOGIN_SCENE_NAME',
		weixinlogin: 'WEIXIN_LOGIN_SCENENAME',
		main: 'MAIN_SCENE_NAME',
		play: 'PLAY_SCENE_NAME',
		invite: 'INVITE_SCENE_NAME',
		over: 'GAME_SCENE_NAME',
		shop: 'SHOP_SCENE_NAME',
	};

	self.LAYOUTTYPE = {
			img: 'IMAGE_TYPE',
			activeobj: 'ACTIVEOBJECT_TYPE',
	};


	self.mainStageSize = { width: 320, height: 480 };

	self.getObjectSize = function(pngname) {
		var rect = self.IMAGEDATA_3[pngname];
		if(rect == null) {
			console.log('Error 1:-------------------------------- %s is not exist', pngname);
			return [0, 0, 0, 0];
		} else {
			return rect;
		}
	};

	self.createSelectbox = function(imgbg, imgcheck, isSelected,x, y) {
		var result = new game.MjSelectbox({
			imgbg: imgbg,
			imgcheck: imgcheck,
			isSelected:isSelected,
			x: x,
			y: y
		});
		result.scaleX = game.scalefact;
		result.scaleY = game.scalefact;
		return result;
	};

	self.createRadiotbox = function(itemurlvalue,imgcheck, x, y, lbtext, groupid, ischeck, selectvalue, items) {
		var result = new game.MjRadioBox({
			itemurlvalue: itemurlvalue,
			imgcheck: imgcheck,
			textlabel: lbtext,
			groupid: groupid,
			isSelected: ischeck,
			value:selectvalue,
			x: x,
			y: y,
			items: items,
		});
		result.scaleX = game.scalefact;
		result.scaleY = game.scalefact;
		return result;
	};

	self.createScalebutton = function(imgsource, rectname, x, y) {
		var rect = game.configdata.getPngRect(rectname, imgsource);
		return new game.ScaleButton({
			image: game.getImg(imgsource),
			rect: rect,
			x: x,
			y: y,
			scaleX: game.scalefact,
			scaleY: game.scalefact,
			width:rect[2],
			height:rect[3],
		});
	};

	self.createButton = function(imgsource, uprectname, downrectname, x, y) {
		var uprect = game.configdata.getPngRect(uprectname);
		var downrect = game.configdata.getPngRect(downrectname);
		var xp = 0;
		var yp = 0;
		if(x) {
			xp = x;
		}
		if(y) {
			yp = y;
		}
		return new Hilo.Button({
			image: game.getImg(imgsource),
			upState: { rect: uprect },
			overState: { rect: downrect },
			downState: { rect: downrect },
			disabledState: { rect: downrect },
			x: xp,
			y: yp,
			width: uprect[2],
			height: uprect[3],
			scaleX: game.scalefact,
			scaleY: game.scalefact,
		});
	};

	self.createRectImg = function(imgType, pngname, x, y, scalefact) {
		var obj = this._getRectInfo(imgType, pngname);
		var rect_data = obj.rectinfo;
		var imgsource = obj.imagesource;

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
			image: imgsource,
			rect: rect_data,
			x: xp,
			y: yp,
			width: w_size,
			height: h_size
		});
	};
	
	self.createRectImg2 = function(imgType, pngname, w,h) {
		var obj = this._getRectInfo(imgType, pngname);
		var rect_data = obj.rectinfo;
		var imgsource = obj.imagesource;
		
		return new Hilo.Bitmap({
			image: imgsource,
			rect: rect_data,
			width: w,
			height: h
		});
	};
	
	self._getRectInfo = function(imgType, pngname){
		var rect_data = null;
		var imgsource = null;
		switch(imgType) {
			case 'ui':
				rect_data = game.loaddata.IMAGEDATA_1[pngname];
				imgsource = game.getImg('ui');
				break;
			case 'mj':
				rect_data = game.loaddata.IMAGEDATA_2[pngname];
				imgsource = game.getImg('mj');
				break;
			case 'bg':
				rect_data = game.loaddata.IMAGEDATA_3[pngname];
				imgsource = game.getImg('bg');
				break;
			case 'brows':
				rect_data = game.loaddata.IMAGEDATA_4[pngname];
				imgsource = game.getImg('brows');
				break;
			default:
				rect_data = game.loaddata.IMAGEDATA_1[pngname];
				imgsource = game.getImg('ui');
				break;
		}
		if(rect_data == null) {
			console.log('ErrorMj 1:-------------------------------- %s is not exist', pngname);
			rect_data = [0, 0, 0, 0];
		}
		return {rectinfo:rect_data,imagesource:imgsource};
	};
	

	self.creatDoubleImg = function(imgType, bgname, pngname, x, y, scalefact) {
		return new game.DoubleIcon({
			imgsource: imgType,
			x: x,
			y: y,
			bgimg: bgname,
			frontimg: pngname,
			scaleX: scalefact,
			scaleY: scalefact
		});
	};
	
	self.createSimpletext = function(textvalue, font, color, bg, x, y, w) {
		return new Hilo.Text({
			text: textvalue,
			font: font,
			color: color,
			x: x,
			y: y,
			background: bg,
			width: w,
			maxWidth: w,
			textAlign: 'left',
			scaleX:game.scalefact,
			scaleY:game.scalefact
		});
	};

	self.createTitletext = function(textvalue, font, color, bg, x, y, w) {
		return new Hilo.Text({
			text: textvalue,
			font: font,
			color: color,
			x: x,
			y: y,
			background: bg,
			width: w,
			maxWidth: w,
			textAlign: 'center',
		});
	};

	self.createBgTitletext = function(textvalue, font, color, imgsource, rectname,align,x) {
		var obj = new Hilo.Container();
		var bg = game.configdata.createRectImg(imgsource, rectname, 0, 0, 1).addTo(obj);
		var bgrect = game.configdata.getPngRect(rectname, imgsource);
		var w = bgrect[2];
		var h = bgrect[3];
		var txt = new Hilo.Text({
			text: textvalue,
			font: font,
			color: color,
			background: 'rgba(0,0,0,0)',
			width: w,
			height: h,
			maxWidth: w,
			textAlign: align,
		}).addTo(obj);
		txt.y = h / 2 - txt._fontHeight / 2;
		if(x){
			txt.x = x;
		}
		obj.txt = txt;
		obj.width = w;
		obj.height = h;
		return obj;
	};

	self.createMerrygoround = function(headimg, itemurlvalue, x, y) {
		return new game.Merrygoround({
			x: x,
			y: y,
			headimg: headimg,
			itemurlvalue: itemurlvalue,
		});
	};

	self.createBg = function(imgType, pngname, x, y, scalefact) {
		var bgpanel = new Hilo.Container({
			x: x,
			y: y
		});
		var leftimg = this.createRectImg(imgType, pngname, 0, 0, scalefact).addTo(bgpanel);
		var rightimg = this.createRectImg(imgType, pngname, leftimg.width * 2, 0, scalefact).addTo(bgpanel);
		rightimg.scaleX = -1;
		return bgpanel;
	};

	self.createBgPanel = function(data, bgname, ishalf, ismodal, theparent, close_uprect, close_downrect, close_imgsource, close_offsetx, titlebg, titlefront) {
			var panel = new Hilo.Container();
			panel.iscurrent = false;
			var rect = game.configdata.getPngRect(bgname, 'bg');
			var panelwidth = rect[2];
			var panelheight = rect[3];
			if(ishalf) {
				panelwidth = rect[2] * 2;
				game.configdata.createBg('bg', bgname, 0, 0, game.scalefact).addTo(panel);
			} else {
				game.configdata.createRectImg('bg', bgname, 0, 0, game.scalefact).addTo(panel);
			}
			panel.width = panelwidth;
			panel.height = panelheight;
			panel.x = theparent.width / 2 - panel.width * game.scalefact / 2;
			panel.y = theparent.height / 2 - panel.height * game.scalefact / 2;
			panel.hide = function() {
				var self = this;
				new Hilo.Tween.to(self,{
					alpha:0.1,
					y:0,//self.height,
				},{
					duration:200,
					onComplete:function(){
						if(self.iscurrent) {
							self.parent.currentpanel = null;
						}
						self.removeAllChildren();
						self.removeFromParent();
					}
				});
			};

			if(ismodal) {
				panel.modalmask = new Hilo.Bitmap({
					width: theparent.width,
					height: theparent.height,
					image: game.getImg('loginbg'),
					alpha: 0.7,
					x: -panel.x,
					y: -panel.y,
				}).addTo(panel);
			}
			
			game.layoutUi.drawStepLine(panel.width, panel.height, panel, game.scalefact);

			if(!close_offsetx) {
				close_offsetx = 0;
			}
			panel.closebtn = game.configdata.createButton(close_imgsource, close_uprect, close_downrect, 0, 0).addTo(panel);
			panel.closebtn.x = panelwidth * game.scalefact - panel.closebtn.width * game.scalefact - close_offsetx * game.scalefact;
			panel.closebtn.on(Hilo.event.POINTER_END, function(e) {
				panel.hide();
			});

			var titleIcon = new game.DoubleIcon({ imgsource: 'ui', bgimg: titlebg, frontimg: titlefront, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(panel);
			titleIcon.x = (panel.width - titleIcon.width) * game.scalefact / 2;
			panel.items = {};
			game.layoutUi.layoutPanelData(data, panel.width, panel.height, game.scalefact, panel);
			
			panel.rx = panel.x /theparent.width;
			panel.ry = panel.y /theparent.height;
			panel.rwidht = panel.width/theparent.width;
			panel.rheight = panel.height/theparent.height;
			return panel;
	};

		self.createLoadgif = function() {
			var atlas = new Hilo.TextureAtlas({
				image: game.getImg('loadgif'),
				width: 144,
				height: 144,
				frames: {
					frameWidth: 48,
					frameHeight: 48,
					numFrames: 9
				},
				sprites: {
					loading: { from: 0, to: 7 }
				}
			});
			return new Hilo.Sprite({
				frames: atlas.getSprite('loading'),
				interval: 8,
				width: 48,
				height: 48
			});
		},

		self.createLoadpanel = function() {
			var panel = new Hilo.Container();
			var w = game.stage.width;
			var h = game.stage.height;
			var bg = game.configdata.createRectImg2('bg', 'battle_bg', w,h).addTo(panel);
			bg.alpha = 0.5;
			var loadgif = game.configdata.createLoadgif().addTo(panel);
			loadgif.x = w / 2 - loadgif.width / 2;
			loadgif.y = h / 2 - loadgif.height / 2;
			return panel;
		},

		self.getPngRect = function(pngname, sourcePng) {
			var rect = null;
			switch(sourcePng) {
				case 'ui': //
					rect = game.loaddata.IMAGEDATA_1[pngname];
					break;
				case 'mj': //
					rect = game.loaddata.IMAGEDATA_2[pngname];
					break;
				case 'bg': //
					rect = game.loaddata.IMAGEDATA_3[pngname];
					break;
				case 'brows': //
					rect = game.loaddata.IMAGEDATA_4[pngname];
					break;
				default:
					rect = game.loaddata.IMAGEDATA_1[pngname];
					break;
			}
			if(rect == null) {
				console.log('Error 1:-------------------------------- %s is not exist', pngname);
				return [0, 0, 0, 0];
			} else {
				return rect;
			}
		}

	self.getRectList = function(names) {
		var list = _.map(names, function(item) {
			return self.getPngSize();
		});
		return list;
	}

	self.getList = function(names) {
		var list = [];
		for(var i = 0; i < names.length; i++) {
			rect = self.getPngSize2(names[i]);
			list.push(rect);
		}
	}
	
	self.createRandomMjid = function(){
			var s = ['t','b','w'];
			var sn = Math.floor(Math.random() * 3);
			var n = Math.floor(Math.random() * 9)+1;
			var mjid = s[sn]+'_'+n.toString();
			return mjid;
	}

};



game.sounds = new function() {
	var self = this;
	this.sounds_url = [
		'bg01.mp3', //0

	];
	this.play = function(index, loop) {
		if(game.configdata.MUTE)
			return;
		if(loop == null)
			loop = false;
		audio = Hilo.WebSound.getAudio({
			src: 'sound/' + this.sounds_url[index],
			loop: loop
		}).play();
	};
	this.playMj = function(mjid){
		if(game.configdata.MUTE)
			return;
		var	loop = false;
		var basedir = 'sound/putonghua/woman/';
		if(game.mjdata.smallmj[mjid] == null){
				debugger;
			}
		var audioSrc = game.mjdata.smallmj[mjid][4];
		var tmp = game.mjdata.smallmj[mjid];
		audio = Hilo.WebSound.getAudio({
			src: basedir + audioSrc,
			loop: loop
		}).play();
	},
	// 0:audio_card 1:chi 2:peng 3:gang 4:hu
	this.playMjEffect = function(index){
		if(game.configdata.MUTE)
			return;
		var	loop = false;
		var basedir = 'sound/gongyong/';
		var s = ['audio_card_click','huang','Win']
		var audioSrc = s[index]+'.mp3';
		var t = basedir+audioSrc;
		audio = Hilo.WebSound.getAudio({
			src: basedir + audioSrc,
			loop: loop
		}).play();
	},
	// 0:chi 1:peng 2:gang 
	this.playMjAction = function(index){
		if(game.configdata.MUTE)
			return;
		var	loop = false;
		var basedir = 'sound/putonghua/woman/';
		var s = ['chi','peng','gang',]
		var audioSrc = s[index]+'.mp3';
		var t = basedir+audioSrc;
		audio = Hilo.WebSound.getAudio({
			src: basedir + audioSrc,
			loop: loop
		}).play();
	},
	
	this.playTalk = function(talk){
		if(game.configdata.MUTE)
			return;
		var	loop = false;
		var basedir = 'sound/putonghua/woman/';
		var audioSrc = talk+'.mp3';
		var t = basedir+audioSrc;
		audio = Hilo.WebSound.getAudio({
			src: basedir + audioSrc,
			loop: loop
		}).play();
	},
	this.stop = function(index) {
		var src = 'sound/' + this.sounds_url[index];
		Hilo.WebSound.removeAudio(src);
	};
};

game.clock = new function() {
	var self = this;
	self.fpstick = 0;
	self.lasttime = 0;
	self.systemtime = 0;
	self.framecount = 0;
	self.fps = 0;

	self.tick = function() {
		var now = +new Date;
		self.fpstick = now - self.lasttime;
		self.framecount++;
		self.systemtime += self.fpstick;
		self.lasttime = now;
		//self.fps = Math.floor(1000/self.fpstick);
	};
	self.getSystemtime = function() {
		return self.systemtime;
	};
	self.getFrame = function() {
		return self.framecount;
	};
	self.getTick = function(){
		return self.fpstick;
	};
	self.getfps = function(){
		var fps1 = Math.floor(1000/self.fpstick);
		if(fps1 != self.fps){
			self.fps = fps1;
			return fps1;
		}else{
			return self.fps;
		}
	};
}

game.drawdata = new function() {
	var self = this;

	this.drawItemTxt = function(txt, font, clr, x, y, parent) {
		return new Hilo.Text({
			text: txt,
			font: font,
			color: clr,
			x: x,
			y: y,
		}).addTo(parent);
	};
	this.drawItemRect = function(linesize, lineclr, fillclr, x, y, w, h, parent) {
		var g1 = new Hilo.Graphics({ x: x, y: y });
		g1.lineStyle(linesize, lineclr).beginFill(fillclr).drawRect(0, 0, w, h).endFill().addTo(parent);
		return g1;
	};
	this.drawSingleRect = function(linesize, lineclr, fillclr, x, y, w, h) {
		var g1 = new Hilo.Graphics({ x: x, y: y });
		g1.lineStyle(linesize, lineclr).beginFill(fillclr).drawRect(0, 0, w, h).endFill();
		return g1;
	};
	this.drawItemRoundrect = function(linesize, lineclr, fillclr, x, y, w, h, r, parent) {
		var g1 = new Hilo.Graphics({ x: x, y: y });
		g1.lineStyle(linesize, lineclr).beginFill(fillclr).drawRoundRect(0, 0, w, h, r).endFill().addTo(parent);
		return g1;
	};
	this.drawItemCircle = function(linesize, lineclr, fillclr, x, y, r, parent) {
		var g1 = new Hilo.Graphics({ x: x, y: y });
		g1.lineStyle(linesize, lineclr).beginFill(fillclr).drawCircle(0, 0, r).endFill().addTo(parent);
		return g1;
	};
};

