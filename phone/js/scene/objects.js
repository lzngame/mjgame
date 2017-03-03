(function(ns) {
	//selectbox --- 多选按钮
	var MjSelectbox = ns.MjSelectbox = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'FwmCheckradio',
		imgbg: null,
		imgcheck: null,
		isSelected: false,
		value: null,

		constructor: function(properties) {
			MjSelectbox.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			game.configdata.createRectImg('ui', this.imgbg, 0, 0, 1).addTo(this);
			var bgrect = game.configdata.getPngRect(this.imgbg);
			var checkrect = game.configdata.getPngRect(this.imgcheck);
			this.imgcheck = game.configdata.createRectImg('ui', this.imgcheck, bgrect[2] / 2 - checkrect[2] / 2, bgrect[3] / 2 - checkrect[3] / 2, 1).addTo(this);
			this.imgcheck.visible = this.isSelected;
			var self = this;
			this.on(Hilo.event.POINTER_START, function(e) {
				self.isSelected = !self.isSelected;
				self.imgcheck.visible = self.isSelected;
			});
		},
		onUpdate: function() {

		},
	});

	//radiobox ---- 单选按钮
	var MjRadioBox = ns.MjRadioBox = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'MjRadioBox',
		groupid: null,
		itemurlvalue: null,
		imgcheck: null,
		isSelected: false,
		txtlabel: null,
		textlabel: 'radio box',
		value: null,
		defaultLabelClr: 'black',
		selectLabelClr: 'green',
		items: null,
		iscurrent: false,

		constructor: function(properties) {
			MjRadioBox.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			game.configdata.createRectImg('ui', this.itemurlvalue, 0, 0, 1).addTo(this);
			var bgrect = game.configdata.getPngRect(this.itemurlvalue);
			var checkrect = game.configdata.getPngRect(this.imgcheck);
			this.imgcheck = game.configdata.createRectImg('ui', this.imgcheck, bgrect[2] / 2 - checkrect[2] / 2, bgrect[3] / 2 - checkrect[3] / 2, 1).addTo(this);
			this.imgcheck.visible = this.isSelected;
			var self = this;
			var font = "28px 黑体";
			this.txtlabel = new Hilo.Text({
				font: font,
				text: this.textlabel,
				color: '#FFF200',
				x: bgrect[2] + 2,
			}).addTo(this);
			var y = bgrect[3] / 2 - this.txtlabel._fontHeight / 2;
			this.txtlabel.y = y;
			this.setLabelColor();
			this.on(Hilo.event.POINTER_START, function(e) {
				if(self.isSelected) {
					return;
				} else {
					self.isSelected = true;
					self.imgcheck.visible = self.isSelected;
					self.setLabelColor();
					self.groupExe();

				}
			});

		},
		groupExe: function() {
			this.iscurrent = true;
			var currentgroup = this.groupid;
			for(var itemid in this.items) {
				var radio = this.items[itemid];
				if(radio.groupid && radio.groupid == currentgroup && !radio.iscurrent) {
					this.items[itemid].noCheck();
				}
			}
			this.iscurrent = false;
		},
		noCheck: function() {
			this.isSelected = false;
			this.imgcheck.visible = self.isSelected;
			this.setLabelColor();
		},
		setLabelColor: function() {
			if(this.isSelected) {
				this.txtlabel.color = this.selectLabelClr;
			} else {
				this.txtlabel.color = this.defaultLabelClr;
			}
		},
		onUpdate: function() {

		},
	});

	//RoomSurebtn ---- 带房卡图标和数字的按钮
	var RoomSurebtn = ns.RoomSurebtn = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'RoomSurebtn',
		itemurlvalue: null,
		defaultNum: 0,
		numlabel: null,
		caricon: null,
		sureicon: null,
		btndown: null,
		imgsource: null,
		btnbody: null,
		constructor: function(properties) {
			MjRadioBox.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var uprect = game.configdata.getPngRect(this.itemurlvalue, this.imgsource);
			var downrect = game.configdata.getPngRect(this.btndown, this.imgsource);
			this.btnbody = new Hilo.Button({
				image: game.getImg(this.imgsource),
				upState: { rect: uprect },
				overState: { rect: downrect },
				downState: { rect: downrect },
				disabledState: { rect: downrect },
			}).addTo(this);

			this.caricon = game.configdata.createRectImg(this.imgsource, this.caricon, 23, 0, 1).addTo(this);
			this.caricon.y = (uprect[3] - this.caricon.height) / 2;
			this.sureicon = game.configdata.createRectImg(this.imgsource, this.sureicon, this.caricon.x + this.caricon.width + 15, 0, 1).addTo(this);
			this.sureicon.y = (uprect[3] - this.caricon.height) / 2;

			var self = this;
			var font = "15px arial";
			this.numlabel = new Hilo.Text({
				font: font,
				text: this.defaultNum.toString(),
				color: '#FFF200',
				x: this.caricon.x + 28,
			}).addTo(this);
			var y = uprect[3] / 2 - this.numlabel._fontHeight / 2 + 2;
			this.numlabel.y = y;
			this.caricon.pointerEnabled = false;
			this.sureicon.pointerEnabled = false;
			this.numlabel.pointerEnabled = false;
			var self = this;
			this.width = uprect[2];
			this.height = uprect[3];
			this.btnbody.on(Hilo.event.POINTER_START, function(e) {
				console.log('car num btn');
				self.setLabelNum(Math.floor(Math.random() * 10));
			});
		},
		setLabelNum: function(num) {
			this.numberValue = num;
			this.numlabel.text = num.toString();
		},
		onUpdate: function() {

		},
	});

	//Merrygoround  ---- 走马灯字条
	var Merrygoround = ns.Merrygoround = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Merrygoround',
		headimg: null,
		itemurlvalue: null,
		txt: null,
		speed: 3,
		font:"20px 黑体",
		constructor: function(properties) {
			Merrygoround.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var head = game.configdata.createRectImg('ui', this.headimg, 0, 0, 1).addTo(this);
			var bg = game.configdata.createRectImg('ui', this.itemurlvalue, head.width, 0, 1).addTo(this);
			var mask = game.drawdata.drawItemRect(1, 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', bg.x, bg.y, bg.width, bg.height, this);
			//var font = "18px arial";
			this.txt = new Hilo.Text({
				font: this.font,
				text: '欢迎来到靠谱云办公室,福州麻将欢迎您！',
				color: '#FFF200',
				x: 300,
				maxWidth: 500,
			}).addTo(this);
			var y = bg.height / 2 - this.txt._fontHeight / 2;
			this.txt.y = y;
			this.txt.mask = mask;
		},
		onUpdate: function() {
			this.txt.x -= 0.8;
			if(this.txt.x < -150) {
				this.txt.x = 300;
			}
		},
	});
	//ScrollBmpwindow ---- 滑动图片滚动窗口
	var ScrollBmpwindow = ns.ScrollBmpwindow = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'ScrollBmpwindow',
		imgs: 0,
		imgpanel: null,
		roundmask: null,
		currentIndex: 0,
		tapstart: false,
		tapstartx: 0,
		tapstarty: 0,
		tapx: 0,
		tapy: 0,
		disx: 0,
		disy: 0,
		slidedisx: 0,
		space: 5,
		itemwidth: 0,
		pointlayer: null,
		pointimg: null,
		pointspace: 40,

		autoSumtime: 0,
		autoInterval: 0,
		autoDirect: false,
		constructor: function(properties) {
			ScrollBmpwindow.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		addImgs: function(imglist, w, h) {
			this.itemwidth = this.space + w;
			this.imgs = imglist.length;

			for(var i = 0; i < imglist.length; i++) {
				var imgurl = imglist[i];
				var img = new Hilo.Bitmap({
					image: imgurl,
					x: i * (this.itemwidth),
					y: this.height / 2 - h / 2,
				}).addTo(this.imgpanel);
				var btn = game.configdata.createButton('ui', 'login_13', 'login_14', img.x, img.y).addTo(this.imgpanel);
				btn.pointerEnabled = true;
				img.pointerEnabled = false;
				btn.on(Hilo.event.POINTER_END, function(e) {
					console.log(this.x);
				});
			}
			for(var i = 0; i < imglist.length; i++) {
				var imgurl = game.getImg('ui');
				var img = new Hilo.Bitmap({
					image: imgurl,
					rect: game.configdata.getPngRect('11', 'ui'),
					x: i * this.pointspace,
				}).addTo(this.pointlayer);
			}
			this.pointimg = new Hilo.Bitmap({
				image: imgurl,
				rect: game.configdata.getPngRect('10', 'ui'),
				x: this.currentIndex * this.pointspace
			}).addTo(this.pointlayer);

			this.pointlayer.width = (this.imgs - 1) * this.pointspace;
			this.pointlayer.x = (this.width - this.pointlayer.width) / 2;
			this.pointlayer.y = this.height - 10;
		},
		init: function(properties) {
			console.log('scroll init');
			var bg = game.drawdata.drawItemRoundrect(1, 'red', 'rgba(0,0,0,0)', 0, 0, this.width, this.height, 5, this);
			this.roundmask = game.drawdata.drawItemRoundrect(1, 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', (this.width - 272) / 2, (this.height - 414) / 2, 272, 424, 5, this);
			this.imgpanel = new Hilo.Container().addTo(this);
			//this.imgpanel.pointerEnabled = false;
			this.imgpanel.mask = this.roundmask;
			this.pointlayer = new Hilo.Container().addTo(this);
			this.on(Hilo.event.POINTER_START, function(e) {
				this.tapstart = true;
				this.tapstartx = e.stageX;
				this.tapstarty = e.stageY;
				this.tapstart = true;
				this.disx = e.stageX - this.x - this.imgpanel.x;
				this.disy = e.stageY - this.y - this.imgpanel.y;
			});
			this.on(Hilo.event.POINTER_MOVE, function(e) {
				if(this.tapstart) {
					var x = e.stageX - this.x;
					var y = e.stageY - this.y;
					this.imgpanel.x = x - this.disx;
					this.slidedisx = e.stageX - this.tapstartx;
					console.log(this.slidedisx);
				}
			});
			this.on(Hilo.event.POINTER_END, function(e) {
				console.log('end **************************************');
				this.slideEnd();
			});
			this.on('touchout', function(e) {
				this.slideEnd();
				console.log('000000000000000000***********************************');
			});
		},
		slideEnd: function() {
			if(Math.abs(this.slidedisx) > 60) {
				if(this.slidedisx < 0) {
					this.currentIndex++;
					if(this.currentIndex > this.imgs - 1) {
						this.currentIndex = this.imgs - 1;
					}
				} else {
					this.currentIndex--;
					if(this.currentIndex < 0) {
						this.currentIndex = 0;
					}
				}
			}
			this.autoSlideTo(-this.itemwidth * this.currentIndex, 200);
			this.tapstart = false;
			this.disx = 0;
			this.slidedisx = 0;
			this.pointimg.x = this.currentIndex * this.pointspace;
		},
		autoSlideTo: function(targetx, durationtime) {
			var self = this;
			new Hilo.Tween.to(self.imgpanel, {
				x: targetx
			}, {
				duration: durationtime,
			});
		},
		//如果使用自己创建的全局方法,在Basescene 里面注册启用,这是一个滑出事件 ,等同于 touchout
		onSlideOut(x1, y1, x2, y2) {
			if(this.parent) {
				console.log('out x:%s y:%s  --- x:%s y:%s', x1, y1, x2, y2);
			}
		},
		onSlide(directx, directy) {
			if(this.parent) {
				console.log('slide-h:%s v:%s', directx, directy);
			}
		},
		onUpdate: function() {
			this.autoInterval++;
			if(this.autoInterval > 300) {
				this.autoInterval = 0;
				if(this.currentIndex == 0 || this.currentIndex == this.imgs - 1) {
					this.autoDirect = !this.autoDirect;
				}

				if(this.autoDirect) {
					this.slidedisx = 65;
				} else {
					this.slidedisx = -65;
				}
				this.slideEnd();
			}
		}
	});

	//Scrollwindow ---- 滑动滚动窗口
	var Scrollwindow = ns.Scrollwindow = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Scrollwindow',
		contentpanel: null,
		panelheight: 0,
		roundmask: null,
		currentposy: 0,
		tapstart: false,
		tapstartx: 0,
		tapstarty: 0,
		tapx: 0,
		tapy: 0,
		disx: 0,
		disy: 0,
		slidedisx: 0,
		space: 5,
		itemwidth: 0,

		autoSumtime: 0,
		autoInterval: 0,
		autoDirect: false,
		constructor: function(properties) {
			Scrollwindow.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		addContent: function(contentlayer, layerheight) {
			contentlayer.addTo(this.contentpanel);
			this.panelheight = layerheight;
		},

		init: function(properties) {
			console.log('scroll init');
			var bg = game.drawdata.drawItemRect(1, 'green', 'rgba(0,0,0,0)', 0, 0, this.width, this.height, this);
			this.roundmask = game.drawdata.drawItemRect(1, 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 0, 0, this.width, this.height, this);

			this.contentpanel = new Hilo.Container().addTo(this);
			this.contentpanel.pointerEnabled = false;

			this.contentpanel.mask = this.roundmask;
			this.on(Hilo.event.POINTER_START, function(e) {
				this.tapstart = true;
				this.tapstartx = e.stageX;
				this.tapstarty = e.stageY;
				this.tapstart = true;
				this.disx = e.stageX - this.x - this.contentpanel.x;
				this.disy = e.stageY - this.y - this.contentpanel.y;
			});
			this.on(Hilo.event.POINTER_MOVE, function(e) {
				if(this.tapstart) {
					var x = e.stageX - this.x;
					var y = e.stageY - this.y;
					//this.contentpanel.x = x - this.disx;
					//this.slidedisx = e.stageX - this.tapstartx;
					this.contentpanel.y = y - this.disy;
					this.slidedisy = e.stageY - this.tapstarty;
					console.log(this.slidedisy);
				}
			});
			this.on(Hilo.event.POINTER_END, function(e) {
				console.log('end **************************************');
				this.slideEnd();
			});
			this.on('touchout', function(e) {
				this.slideEnd();
				console.log('000000000000000000***********************************');
			});
		},
		slideEnd: function() {
			var self = this;
			if(this.contentpanel.y > 0) {
				new Hilo.Tween.to(self.contentpanel, {
					y: 0
				}, {
					duration: 200,
				});
			}
			if(this.contentpanel.y < self.height - self.panelheight) {
				var y = self.height - self.panelheight;
				console.log(y);
				new Hilo.Tween.to(self.contentpanel, {
					y: y
				}, {
					duration: 200,
				});
			}
		},
		autoSlideTo: function(targetx, durationtime) {
			var self = this;
			new Hilo.Tween.to(self.imgpanel, {
				x: targetx
			}, {
				duration: durationtime,
			});
		},
		//如果使用自己创建的全局方法,在Basescene 里面注册启用,这是一个滑出事件 ,等同于 touchout
		onSlideOut(x1, y1, x2, y2) {
			if(this.parent) {
				console.log('out x:%s y:%s  --- x:%s y:%s', x1, y1, x2, y2);
			}
		},
		onSlide(directx, directy) {
			if(this.parent) {
				console.log('slide-h:%s v:%s', directx, directy);
			}
			if(directy != 0) {
				var dis = 1;
				if(directy == 2) {
					dis = -1;
				}
				var self = this;
				var space = 200;
				var dur = 1000;
				var currenty = self.contentpanel.y;
				var disTop = 0 - currenty;
				var disBottom = currenty - (self.height - self.panelheight);
				if(directy == 1 && disTop < 200) {
					space = 50;
					dur = 400;
					console.log('+000000000');
				}
				if(directy == 2 && disBottom < 200) {
					space = 50;
					console.log('-000000000');
					dur = 400;
				}

				Hilo.Tween.to(self.contentpanel, {
					y: currenty + dis * space,
				}, {
					duration: dur,
					ease: Hilo.Ease.Quart.EaseOut,
					onComplete: function() {
						console.log('complete');
						self.slideEnd();
					}
				});
			}
		},
		onUpdate: function() {

		}
	});

	//AlphaButton ---- 透明度改变效果的按钮
	var AlphaButton = ns.AlphaButton = Hilo.Class.create({
		Extends: Hilo.Bitmap,
		name: 'AlphaButton',
		handler: null,
		buttondata: null,
		constructor: function(properties) {
			AlphaButton.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			this.on(Hilo.event.POINTER_START, function(e) {
				this.alpha = 0.7;
			});
			this.on(Hilo.event.POINTER_MOVE, function(e) {

			});
			this.on(Hilo.event.POINTER_END, function(e) {
				this.alpha = 1;

				if(this.handler) {
					this.handler(this.buttondata);
				}
			});
			this.on('touchout', function(e) {
				this.alpha = 1;
			});
		},

	});

	//ScaleButton ---- Scale改变效果的按钮
	var ScaleButton = ns.ScaleButton = Hilo.Class.create({
		Extends: Hilo.Bitmap,
		name: 'ScaleButton',
		handler: null,
		addscale: 0.2,
		currentScale: 1,
		buttondata: null,

		constructor: function(properties) {
			ScaleButton.superclass.constructor.call(this, properties);
			this.init(properties);
			this.currentScale = this.scaleX;
			console.log(this.currentScale);
		},

		init: function(properties) {
			this.pivotX = this.width / 2;
			this.pivotY = this.height / 2;

			this.on(Hilo.event.POINTER_START, function(e) {
				this.scaleX = (this.currentScale + this.addscale);
				this.scaleY = (this.currentScale + this.addscale);
			});
			this.on(Hilo.event.POINTER_MOVE, function(e) {

			});
			this.on(Hilo.event.POINTER_END, function(e) {
				this.scaleX = this.currentScale;
				this.scaleY = this.currentScale;
				if(this.handler) {
					this.handler(this.buttondata);
				}
			});
			this.on('touchout', function(e) {
				this.scaleX = this.currentScale;
				this.scaleY = this.currentScale;
			});
		},
	});

	//IconButton ---- 普通按钮上面居中一个Icon
	var IconButton = ns.IconButton = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'IconButton',
		imgsource: null,
		btnupimg: null,
		btndownimg: null,
		iconimg: null,
		bgbtn: null,
		handler: null,
		buttondata: null,

		constructor: function(properties) {
			IconButton.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			var img = game.getImg(this.imgsource);
			var uprect = game.configdata.getPngRect(this.btnupimg, this.imgsource);
			var downrect = game.configdata.getPngRect(this.btndownimg, this.imgsource);
			this.width = uprect[2];
			this.height = uprect[3];
			this.bgbtn = new Hilo.Button({
				image: img,
				upState: { rect: uprect },
				overState: { rect: downrect },
				downState: { rect: downrect },
				disabledState: { rect: downrect },
			}).addTo(this);
			var imgrect = game.configdata.getPngRect(this.iconimg, this.imgsource);
			var frontimg = new Hilo.Bitmap({
				image: img,
				rect: imgrect,
				x: (uprect[2] - imgrect[2]) / 2,
				y: (uprect[3] - imgrect[3]) / 2,
			}).addTo(this);
			frontimg.pointerEnabled = false;
			var self = this;
			this.bgbtn.on(Hilo.event.POINTER_END, function(e) {
				if(self.handler) {
					self.handler(self.buttondata);
				}
			});
		},
	});

	//IconNumber ---- 有背景的数字Icon
	var IconNumber = ns.IconNumber = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'IconNumber',
		imgsource: null,
		bgimg: null,
		numimg: null,
		defaultvalue: -1,
		numsimglist: null,

		constructor: function(properties) {
			IconNumber.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			var img = game.getImg(this.imgsource);
			rect = game.configdata.getPngRect(this.bgimg, this.imgsource);
			this.width = rect[2];
			this.height = rect[3];

			new Hilo.Bitmap({
				image: img,
				rect: rect,
			}).addTo(this);
			this.numimg = new Hilo.Bitmap().addTo(this);
		},
		setNum: function(n) {
			this.defaultvalue = n;
			var item = this.numsimglist[n];
			var img = game.getImg(this.imgsource);
			rect = game.configdata.getPngRect(item, this.imgsource);
			this.numimg.setImage(img, rect);
			this.numimg.visible = true;
			this.numimg.x = (this.width - rect[2]) / 2;
			this.numimg.y = (this.height - rect[3]) / 2;
		},
		clear: function() {
			this.numimg.visible = false;
			this.defaultvalue = -1;
		}
	});

	//DoubleIcon ---- 	前层居中背景的Icon
	var DoubleIcon = ns.DoubleIcon = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'DoubleIcon',
		imgsource: null,
		bgimg: null,
		frontimg: null,

		constructor: function(properties) {
			DoubleIcon.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			var img = game.getImg(this.imgsource);
			var rect = game.configdata.getPngRect(this.bgimg, this.imgsource);
			var rectfront = game.configdata.getPngRect(this.frontimg, this.imgsource);
			this.width = rect[2];
			this.height = rect[3];

			new Hilo.Bitmap({
				image: img,
				rect: rect,
			}).addTo(this);
			new Hilo.Bitmap({
				image: img,
				rect: rectfront,
				x: (rect[2] - rectfront[2]) / 2,
				y: (rect[3] - rectfront[3]) / 2,
			}).addTo(this);
		},
	});

	//麻将牌 --- 自己的
	var MjSelf = ns.MjSelf = Hilo.Class.create({
		Extends: Hilo.Container,
		mjid: 'w_1',
		name: 'MjSelf',
		imgsource: 'mj',
		bgimg: null,
		frontimg: null,
		goldimg: null,
		rectfront: null,
		bgrects: ['self_30', 'self_22', 'selfmj_23'],
		bgrect: 0,
		state: 0, //0 正常 1放下（吃/碰/明杠）2暗杠
		swidth: 0,
		sheight: 0,
		putdownOffsety: 7,

		currentposy: 0,
		currentposx: 0,
		tapstart: false,
		tapstartx: 0,
		tapstarty: 0,
		tapx: 0,
		tapy: 0,
		disx: 0,
		disy: 0,
		tempindex: null,
		hadmove: false,

		initx: 0,
		inity: 0,

		isSelected:false,
		isGold:false,

		constructor: function(properties) {
			MjSelf.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			var img = game.getImg(this.imgsource);
			this.bgrect = game.configdata.getPngRect(this.bgrects[this.state], this.imgsource);
			var offsety = this.putdownOffsety;
			if(this.state != 0) {
				offsety = 0;
			}
			var frontname = game.mjdata.mj[this.mjid][1];
			this.rectfront = game.configdata.getPngRect(frontname, this.imgsource);
			this.width = this.bgrect[2];
			this.height = this.bgrect[3];
			this.swidth = this.width * game.scalefact;
			this.sheight = this.height * game.scalefact;
			this.bgimg = new Hilo.Bitmap({
				image: img,
				rect: this.bgrect,
			}).addTo(this);
			this.frontimg = new Hilo.Bitmap({
				image: img,
				rect: this.rectfront,
				x: (this.bgrect[2] - this.rectfront[2]) / 2,
				y: (this.bgrect[3] - this.rectfront[3]) / 2 + offsety,
			}).addTo(this);

			this.initx = this.x;
			this.inity = this.y;
			this.initTouch();
		},
		setGold:function(){
			this.isGold = true;
			var rect = game.configdata.getPngRect('18','ui');
			var gold = new Hilo.Bitmap({image:game.getImg('ui'),rect:rect}).addTo(this);
			gold.x = this.width - rect[2];
			gold.y = this.height - rect[3];
		},
		initTouch: function() {
			this.on(Hilo.event.POINTER_START, function(e) {
				this.tapstart = true;
				this.tapstartx = e.stageX;
				this.tapstarty = e.stageY;
				this.tapstart = true;
				this.disx = e.stageX - this.x;
				this.disy = e.stageY - this.y;
				this.tempindex = this.parent.children[this.parent.getNumChildren() - 1];
				this.parent.swapChildren(this.tempindex, this);
			});
			this.on(Hilo.event.POINTER_MOVE, function(e) {
				if(this.tapstart) {
					var x = e.stageX - this.disx;
					var y = e.stageY - this.disy;
					this.x = x;
					this.y = y;
					this.hadmove = true;
				}
			});
			this.on(Hilo.event.POINTER_END, this._endTouchHandle);
			this.on('touchout', this._endTouchHandle);
		},
		_endTouchHandle: function(e) {
			this.tapstart = false;

			if(!this.hadmove) {
				if(this.isSelected) {
					this.bethrow();
				} else {
					this.beselected();
				}
			} else {
				var dis = this.inity - this.y;
				if(dis < 40) {
					if(this.isSelected) {
						this.bethrow();
					} else {
						this.beselected();
					}
				} else {
					this.bethrow();
				}
			}
			this.hadmove = false;
		},
		bethrow:function(){
			game.sendMsg(this, game.scenes[game.configdata.SCENE_NAMES.play], game.mjdata.msg.BETHROW, this.mjid);
		},
		beselected:function(){
			this.y = this.inity - 20;
			this.x = this.initx;
			this.isSelected = true;
			game.sendMsg(this, game.scenes[game.configdata.SCENE_NAMES.play], game.mjdata.msg.BESELECT, this.mjid);
		},
		backQueue: function() {
			this.y = this.inity;
			this.x = this.initx;
			this.isSelected = false;
		},
		setState: function(state) {
			this.state = state;
			if(this.state != 0) {
				this.frontimg.y = 0;
			}
			if(this.state == 2) {
				this.frontimg.visible = false;
			} else {
				this.frontimg.visible = true;
			}
			this.bgrect = game.configdata.getPngRect(this.bgrects[this.state], this.imgsource);
			this.bgimg.setImage(game.getImg(this.imgsource), this.bgrect);
		},
		
	});

	//麻将牌 --- 其他
	var MjScene = ns.MjScene = Hilo.Class.create({
		Extends: Hilo.Container,
		mjid: 'w_1-1', //w_1:麻将  1:方向  (1:正常 2:左倒 3:右倒)
		name: 'MjScene',
		imgsource: 'mj',
		mjimg: null,
		rectfront: null,
		direct: 1, //1:正常 2:左倒 3:右倒
		swidth: 0,
		sheight: 0,

		constructor: function(properties) {
			MjScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			var img = game.getImg(this.imgsource);
			var mjdata = this.mjid.split('-');
			var frontname = game.mjdata.smallmj[mjdata[0]][parseInt(mjdata[1])];
			this.rectfront = game.configdata.getPngRect(frontname, this.imgsource);
			this.width = this.rectfront[2];
			this.height = this.rectfront[3];
			this.swidth = this.width * game.scalefact;
			this.sheight = this.height * game.scalefact;
			this.mjimg = new Hilo.Bitmap({
				image: img,
				rect: this.rectfront,
			}).addTo(this);
		},
	});
	
	
	//Pointermj --- 打出的牌的指示
	var Pointermj = ns.Pointermj = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Pointermj',
		imgsource:null,
		rectname: null,
		imgbody:null,
		speed:0.3,
		ischange:false,
		sumtime:0,

		constructor: function(properties) {
			Pointermj.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var bodyrect = game.configdata.getPngRect(this.rectname,this.imgsource);
			this.width = bodyrect[2];
			this.imgbody = game.configdata.createRectImg(this.imgsource, this.rectname, 0, 0, 1).addTo(this);
		},

		onUpdate: function() {
			this.sumtime++;
			if(this.sumtime > 10){
				this.sumtime = 0;
				this.ischange = !this.ischange;
				this.imgbody.y = 0;
			}
			if(this.ischange){
				this.imgbody.y -= this.speed;
			}else{
				this.imgbody.y += this.speed;
			}
		},
	});
	
	//Pointeruser--- 出牌的玩家的指示
	var Pointeruser = ns.Pointeruser = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Pointeruser',
		imgsource:null,
		rectname: null,
		imgbody:null,
		speed:0.3,
		ischange:false,
		sumtime:0,
		numlabel:null,
		currentNum:0,
		reTime:false,
		startTime:0,
		pivotx:24,
		pivoty:24,

		constructor: function(properties) {
			Pointeruser.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var bodyrect = game.configdata.getPngRect(this.rectname,this.imgsource);
			this.width = bodyrect[2];
			this.imgbody = game.configdata.createRectImg(this.imgsource, this.rectname, 0, 0, 1).addTo(this);
			this.imgbody.pivotX = this.pivotx;
			this.imgbody.pivotY = this.pivoty;
			this.numlabel = game.configdata.createTitletext('0','24px 黑体','white','rgba(0,0,0,0)',-20,0,40).addTo(this);
			this.numlabel.y = -this.numlabel._fontHeight/2;
		},
		
		setDirect:function(direct){
			var d = 0;
			console.log(direct);
			this.resetTime();
			switch(direct){
				case 'left':
					d = 90;
					break;
				case 'dwon':
					d = 0;
					break;
				case 'up':
					d = 180;
					break;
				case 'right':
					d = 270;
					break;
			}
			new Hilo.Tween.to(this.imgbody,{
				rotation:d
			},{
				duration:200,
			});
		},
		resetTime:function(){
			this.currentNum = 0;
			this.sumtime = 0;
			this.numlabel.text = this.currentNum.toString();
		},
		
		onUpdate:function(){
			this.sumtime += game.clock.getTick();
			if(this.sumtime > 1000){
				this.sumtime = 0;  
				this.currentNum += 1;
				this.numlabel.text = this.currentNum.toString();
			}
		}
	});
	
	//Goldmj--- 金牌
	var Goldmj = ns.Goldmj = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Goldmj',
		imgsource:null,
		bgrectname: null,
		mjid:null,

		constructor: function(properties) {
			Goldmj.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var bgrect = game.configdata.getPngRect(this.bgrectname,this.imgsource);
			this.width = bgrect[2];
			this.height = bgrect[3];
			game.configdata.createRectImg(this.imgsource, this.bgrectname, 0, 0, 1).addTo(this);
			//var mj = new game.MjSelf({mjid:this.mjid,scaleX:0.6,scaleY:0.6}).addTo(this);
			var idname = this.mjid + '-1';
			var mj = new game.MjScene({mjid:idname}).addTo(this);
			mj.x = this.width/2 - mj.width/2;
			mj.y = this.height/2 - mj.height/2 + 10;
			mj.pointerEnabled = false;
		},
	});
})(window.game);