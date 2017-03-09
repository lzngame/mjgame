game = window.game || {};

game.configdata = new function() {
	var self = this;
	// 配置信息    只读属性
	self.CANVASID = 'CANVAS_ID';
	self.NOLINE = false;
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
		},

		self.MSAGE_TYPE = {

		},

		self.mainStageSize = { width: 320, height: 480 };

	self.getObjectSize = function(pngname) {
		var rect = self.IMAGEDATA_3[pngname];
		if(rect == null) {
			console.log('Error 1:-------------------------------- %s is not exist', pngname);
			return [0, 0, 0, 0];
		} else {
			return rect;
		}
	}

	self.createSelectbox = function(imgbg, imgcheck, x, y) {
		var result = new game.MjSelectbox({
			imgbg: imgbg,
			imgcheck: imgcheck,
			x: x,
			y: y
		});
		result.scaleX = game.scalefact;
		result.scaleY = game.scalefact;
		return result;
	}

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
	}

	self.createScalebutton = function(imgsource, rectname, x, y) {
		var rect = game.configdata.getPngRect(rectname, imgsource);
		return new game.ScaleButton({
			image: game.getImg(imgsource),
			rect: rect,
			x: x,
			y: y,
			scaleX: game.scalefact,
			scaleY: game.scalefact,
		});
	}

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
	}

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
	}
	
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
	}
	
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
	}
	

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
	}
	
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
	}

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
	}

	self.createBgTitletext = function(textvalue, font, color, imgsource, rectname) {
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
			textAlign: 'center',
		}).addTo(obj);
		txt.y = h / 2 - txt._fontHeight / 2;
		obj.txt = txt;
		obj.width = w;
		obj.height = h;
		return obj;
	}

	self.createMerrygoround = function(headimg, itemurlvalue, x, y) {
		return new game.Merrygoround({
			x: x,
			y: y,
			headimg: headimg,
			itemurlvalue: itemurlvalue,
		});
	}

	self.createBg = function(imgType, pngname, x, y, scalefact) {
		var bgpanel = new Hilo.Container({
			x: x,
			y: y
		});
		var leftimg = this.createRectImg(imgType, pngname, 0, 0, scalefact).addTo(bgpanel);
		var rightimg = this.createRectImg(imgType, pngname, leftimg.width * 2, 0, scalefact).addTo(bgpanel);
		rightimg.scaleX = -1;
		return bgpanel;
	}

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
				if(this.iscurrent) {
					this.parent.currentpanel = null;
				}
				this.removeAllChildren();
				this.removeFromParent();
				console.log(this.getNumChildren());
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
			var closebtn = game.configdata.createButton(close_imgsource, close_uprect, close_downrect, 0, 0).addTo(panel);
			closebtn.x = panelwidth * game.scalefact - closebtn.width * game.scalefact - close_offsetx * game.scalefact;
			closebtn.on(Hilo.event.POINTER_END, function(e) {
				panel.hide();
			});

			var titleIcon = new game.DoubleIcon({ imgsource: 'ui', bgimg: titlebg, frontimg: titlefront, scaleX: game.scalefact, scaleY: game.scalefact }).addTo(panel);
			titleIcon.x = (panel.width - titleIcon.width) * game.scalefact / 2;
			panel.items = {};
			game.layoutUi.layoutPanelData(data, panel.width, panel.height, game.scalefact, panel);
			return panel;
		},

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
	this.stop = function(index) {
		var src = 'sound/' + this.sounds_url[index];
		Hilo.WebSound.removeAudio(src);
	};
};

game.layoutUi = new function() {
	var self = this;
	this.layoutPanelData = function(uidata, panelwidth, panelheight, scalefact, theparent) {
		var tmpposdic = {};
		panelwidth = panelwidth * scalefact;
		panelheight = panelheight * scalefact;
		for(var i = 0; i < uidata.length; i++) {
			var itemdata = uidata[i];
			var imgsource = itemdata.imgsource;
			if(!imgsource) {
				imgsource = 'ui';
			}
			var posxy = game.layoutUi.getItemPos(itemdata, panelwidth, panelheight, imgsource, tmpposdic);
			var rect = game.configdata.getPngRect(itemdata.itemurlvalue, imgsource);
			var x = posxy[0];
			var y = posxy[1];
			var w = rect[2] * game.scalefact;
			var h = rect[3] * game.scalefact;
			tmpposdic[itemdata.itemid] = [x, y, w, h];
			if(itemdata.itemtype == 'simpletext') {
				theparent.items[itemdata.itemid] = game.configdata.createSimpletext(itemdata.textvalue, itemdata.font, itemdata.color, itemdata.bg, x, y,itemdata.width).addTo(theparent);
			}
			if(itemdata.itemtype == 'texttitle') {
				theparent.items[itemdata.itemid] = game.configdata.createTitletext(itemdata.textvalue, itemdata.font, itemdata.color, itemdata.bg, x, y, w).addTo(theparent);
			}
			if(itemdata.itemtype === 'bmp') {
				theparent.items[itemdata.itemid] = game.configdata.createRectImg(imgsource, itemdata.itemurlvalue, x, y, game.scalefact).addTo(theparent);
			}
			if(itemdata.itemtype === 'doublebmp') {
				theparent.items[itemdata.itemid] = game.configdata.creatDoubleImg(imgsource, itemdata.itemurlvalue, itemdata.frontimg, x, y, game.scalefact).addTo(theparent);
			}
			if(itemdata.itemtype === 'btn') {
				theparent.items[itemdata.itemid] = game.configdata.createButton('ui', itemdata.itemurlvalue, itemdata.btnup, x, y).addTo(theparent);
			}
			if(itemdata.itemtype === 'scalebtn') {
				theparent.items[itemdata.itemid] = game.configdata.createScalebutton('ui', itemdata.itemurlvalue, x + w / 2, y + h / 2).addTo(theparent);
			}
			if(itemdata.itemtype === 'selectbox') {
				theparent.items[itemdata.itemid] = game.configdata.createSelectbox(itemdata.itemurlvalue, itemdata.selectvalue, x, y).addTo(theparent);
			}
			if(itemdata.itemtype === 'radiobox') {
				theparent.items[itemdata.itemid] = game.configdata.createRadiotbox(itemdata.itemurlvalue, itemdata.selectvalue, x, y, itemdata.lbtext, itemdata.groupid, itemdata.ischeck, itemdata.value,theparent.items).addTo(theparent);
			}
			if(itemdata.itemtype == 'merrygoround') {
				theparent.items[itemdata.itemid] = game.configdata.createMerrygoround(itemdata.headimg, itemdata.itemurlvalue, x, y).addTo(theparent);
			}
		}
	};

	this.getItemPos = function(itemdata, panelwidth, panelheight, imgsource, tmpposdic) {
		if(itemdata.layouttype_x === 'txt') {
			var aligntype = itemdata.alignx;
			if(aligntype === 'center') {
				aligntype = 'center_x';
			}
			var x = this.getItemTxtPos(aligntype, itemdata.itemurlvalue, panelwidth, panelheight, imgsource);
		}
		if(itemdata.layouttype_y === 'txt') {
			aligntype = itemdata.aligny;
			if(aligntype === 'center') {
				aligntype = 'center_y';
			}
			var y = this.getItemTxtPos(aligntype, itemdata.itemurlvalue, panelwidth, panelheight, imgsource);
		}
		if(itemdata.layouttype_x === 'pct') {
			var aligntype = itemdata.alignx;
			var tm = aligntype.split('_');
			var value = parseInt(tm[1]);
			if(tm[0] === 'center') {
				aligntype = 'center_x';
			} else {
				aligntype = tm[0];
			}
			var x = this.getItemPctPos(aligntype, value, itemdata.itemurlvalue, panelwidth, panelheight, imgsource);
		}
		if(itemdata.layouttype_y === 'pct') {
			aligntype = itemdata.aligny;
			var tm = aligntype.split('_');
			var value = parseInt(tm[1]);
			if(tm[0] === 'center') {
				aligntype = 'center_y';
			} else {
				aligntype = tm[0];
			}
			var y = this.getItemPctPos(aligntype, value, itemdata.itemurlvalue, panelwidth, panelheight, imgsource);
		}
		if(itemdata.layouttype_x === 'follow') {
			var aligntype = itemdata.alignx;
			var tm = aligntype.split('&');
			var targetItemid = tm[0];
			var value = parseInt(tm[1]);
			var x = this.getItemFollowPos(targetItemid, value, 'horizontal', tmpposdic);
		}
		if(itemdata.layouttype_y === 'follow') {
			var aligntype = itemdata.aligny;
			var tm = aligntype.split('&');
			var targetItemid = tm[0];
			var value = parseInt(tm[1]);
			var y = this.getItemFollowPos(targetItemid, value, 'vertical', tmpposdic);
		}
		return [x, y];
	};

	this.getItemPctPos = function(relativepos, pctvalue, namevalue, panelwidth, panelheight, imgsource) {
		var rect = game.configdata.getPngRect(namevalue, imgsource);
		var result = 0;
		var w = rect[2] * game.scalefact;
		var h = rect[3] * game.scalefact;
		var dis = 0;
		switch(relativepos) {
			case 'center_x':
				if(pctvalue > 0) {
					dis = (panelwidth / 100.0) * pctvalue;
				} else {
					dis = (panelwidth / 100.0) * pctvalue - w;
				}
				result = panelwidth / 2 + dis;
				break;
			case 'center_y':
				if(pctvalue > 0) {
					dis = (panelheight / 100.0) * pctvalue;
				} else {
					dis = (panelheight / 100.0) * pctvalue - h;
				}
				result = panelheight / 2 + dis;
				break;
			case 'top':
				result = (panelheight / 100.0) * pctvalue;
				break;
			case 'bottom':
				result = panelheight - (panelheight / 100.0) * pctvalue - h;
				break;
			case 'left':
				result = (panelwidth / 100.0) * pctvalue;
				break;
			case 'right':
				result = panelwidth - (panelwidth / 100.0) * pctvalue - w;
				break;
		}
		return result;
	};

	this.getItemTxtPos = function(txtvalue, namevalue, panelwidth, panelheight, imgsource) {
		var rect = game.configdata.getPngRect(namevalue, imgsource);
		var result = 0;
		var w = rect[2] * game.scalefact;
		var h = rect[3] * game.scalefact;
		switch(txtvalue) {
			case 'center_x':
				result = Math.floor((panelwidth - w) / 2.0);
				break;
			case 'center_y':
				result = Math.floor((panelheight - h) / 2.0);
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

	this.getItemFollowPos = function(itemid, followvalue, directtype, tmpposDic) {
		var referenceX = tmpposDic[itemid][0];
		var referenceY = tmpposDic[itemid][1];
		switch(directtype) {
			case 'vertical':
				result = referenceY + followvalue;
				break;
			case 'horizontal':
				result = referenceX + followvalue;
				break;
		}
		return result;
	};

	this.drawStepLine = function(panelwidth, panelheight, panel, scalefact) {
		if(game.configdata.NOLINE) {
			if(!scalefact) {
				scalefact = 1.0;
			}
			var w = panelwidth / 4 * scalefact;
			var h = panelheight / 4 * scalefact;
			for(var i = 0; i < 16; i++) {
				var x = i % 4 * w;
				var y = Math.floor(i / 4) * h;
				this.drawLine(x, y, w, h, panel);
			}
		}
	};

	this.drawLine = function(initx, inity, w, h, panel) {
		for(var i = 0; i < 4; i++) {
			game.drawdata.drawItemRect(1, 'white', 'rgba(0,0,0,0)', initx + i % 2 * w / 2, inity + Math.floor(i / 2) * h / 2, w / 2, h / 2, panel);
		}
	};
}

game.clock = new function() {
	var self = this;
	self.fpstick = 0;
	self.lasttime = 0;
	self.systemtime = 0;
	self.framecount = 0;

	self.tick = function() {
		var now = +new Date;
		self.fpstick = now - self.lasttime;
		self.framecount++;
		self.systemtime += self.fpstick;
		self.lasttime = now;
	};
	self.getSystemtime = function() {
		return self.systemtime;
	};
	self.getFrame = function() {
		return self.framecount;
	};
	self.getTick = function(){
		return self.fpstick;
	}
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

function addfps(x, y, parent) {
	var fps = new game.FpsPanel({ x: x, y: y });
	parent.addChild(fps);
}

function setLeft(viewojb) {
	var parent = viewojb.parent;
	viewojb.x = parent.width / 2 - viewojb.width / 2;
	viewojb.y = parent.height / 2 - viewojb.height / 2;
}