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
		setSelect:function(isshow){
			this.isSelected = isshow;
			this.imgcheck.visible = this.isSelected;
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
		onhandle:null,

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
				if(this.onhandle){
					this.onhandle(this.textlabel);
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
			this.caricon.x = 20;
			this.caricon.y = (uprect[3] - this.caricon.height) / 2-4;
			this.sureicon = game.configdata.createRectImg(this.imgsource, this.sureicon, this.caricon.x + this.caricon.width + 45, 0, 1).addTo(this);
			this.sureicon.y = (uprect[3] - this.caricon.height) / 2;

			var self = this;
			var font = "28px 黑体";
			this.numlabel = new Hilo.Text({
				font: font,
				text: '5',//this.defaultNum.toString(),
				color: 'yellow',
				x: this.caricon.x + 48,
			}).addTo(this);
			var y = uprect[3] / 2 - this.numlabel._fontHeight / 2 + 4;
			this.numlabel.y = y;
			this.caricon.pointerEnabled = false;
			this.sureicon.pointerEnabled = false;
			this.numlabel.pointerEnabled = false;
			var self = this;
			this.width = uprect[2];
			this.height = uprect[3];
			this.btnbody.on(Hilo.event.POINTER_START, function(e) {
				console.log('car num btn');
				//self.setLabelNum(Math.floor(Math.random() * 10));
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
				
				img.pointerEnabled = false;
				//var btn = game.configdata.createButton('ui', 'login_13', 'login_14', img.x, img.y).addTo(this.imgpanel);
				//btn.pointerEnabled = true;
				//btn.on(Hilo.event.POINTER_END, function(e) {
				//	console.log(this.x);
				//});
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
				}
			});
			this.on(Hilo.event.POINTER_END, function(e) {
				console.log('end **************************************');
				this.slideEndH();
			});
			this.on('touchout', function(e) {
				this.slideEndH();
				console.log('000000000000000000***********************************');
			});
		},
		slideEndH: function() {
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
		onSlideOut:function(x1, y1, x2, y2) {
			if(this.parent) {
				console.log('out x:%s y:%s  --- x:%s y:%s', x1, y1, x2, y2);
			}
		},
		onSlide:function(directx, directy) {
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
				this.slideEndH();
			}
		}
	});

	//Scrollwindow ---- 滑动滚动窗口
	var Scrollwindow = ns.Scrollwindow = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Scrollwindow',
		direct:'H',
		bglayer:null,
		contentpanel: null,
		panelheight: 0,
		panelwidth:0,
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
		slidedisy: 0,
		space: 5,
		itemwidth: 0,

		autoSumtime: 0,
		autoInterval: 0,
		autoDirect: false,
		constructor: function(properties) {
			Scrollwindow.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		addContent: function(contentlayer, size) {
			contentlayer.addTo(this.contentpanel);
			if(this.direct == 'H')
				this.panelheight = size;
			else	
				this.panelwidth = size;
		},

		init: function(properties) {
			console.log('scroll init');
			var bg = game.drawdata.drawItemRect(1, 'green', 'rgba(0,0,0,0)', 0, 0, this.width, this.height, this);
			this.roundmask = game.drawdata.drawItemRect(1, 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 0, 0, this.width, this.height, this);
			this.bglayer = new Hilo.Container().addTo(this);
			this.contentpanel = new Hilo.Container({background:'yellow'}).addTo(this);
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
					
					if(this.direct == 'H'){
						this.contentpanel.y = y - this.disy;
						this.slidedisy = e.stageY - this.tapstarty;
					}else{
						this.contentpanel.x = x - this.disx;
						this.slidedisx = e.stageX - this.tapstartx;
					}
					console.log('slidedisx:%d,slidedisy:%d',this.slidedisx,this.slidedisy);
				}
			});
			this.on(Hilo.event.POINTER_END, function(e) {
				console.log('end **************************************');
				if(this.direct == 'H'){
					this.slideEndH();
					console.log(this.slidedisy);
				}else{
					this.slideEndV();
					console.log(this.slidedisx);
				}
				
				this.slidedisy = 0;
				this.slidedisx = 0;
			});
			this.on('touchout', function(e) {
				if(this.direct == 'H'){
					this.slideEndH();
				}else{
					this.slideEndV();
				}
				console.log('000000000000000000***********************************');
			});
		},
		slideEndH: function() {
			console.log('slideEndH');
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
		slideEndV: function() {
			console.log('slideEndV');
			var self = this;
			if(this.contentpanel.x > 0) {
				new Hilo.Tween.to(self.contentpanel, {
					x: 0
				}, {
					duration: 200,
				});
			}
			if(this.contentpanel.x < self.width - self.panelwidth) {
				var x = self.width - self.panelwidth;
				console.log(x);
				new Hilo.Tween.to(self.contentpanel, {
					x: x
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
		
		//方向  1：右 2：左     1：下  2：上
		//当有滑动事件产生时触发，需要注册到 scene 
		onSlide:function(directx, directy) {
			if(this.parent) {
				console.log('slide-h:%s v:%s', directx, directy);
			}
			if(directy != 0 && this.direct == 'H') {
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
						self.slideEndH();
					}
				});
			}
			if(directx != 0 && this.direct == 'V') {
				var dis = 1;
				if(directx == 2) {
					dis = -1;
				}
				var self = this;
				var space = 200;
				var dur = 1000;
				var currentx = self.contentpanel.x;
				var disTop = 0 - currentx;
				var disBottom = currentx - (self.width - self.panelwidth);
				if(directx == 1 && disTop < 200) {
					space = 50;
					dur = 400;
					console.log('+000000000');
				}
				if(directx == 2 && disBottom < 200) {
					space = 50;
					console.log('-000000000');
					dur = 400;
				}

				Hilo.Tween.to(self.contentpanel, {
					y: currentx + dis * space,
				}, {
					duration: dur,
					ease: Hilo.Ease.Quart.EaseOut,
					onComplete: function() {
						console.log('complete');
						self.slideEndV();
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
			if(game.mjdata.mj[this.mjid] == null){
				debugger;
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
			this.name = game.mjdata.smallmj[this.mjid][0];
			//console.log('SELF:%s,(%d,%d) bmp:(%d,%d)',this.name,this.width,this.height,this.bgimg.width,this.bgimg.height);
		},
		setInitPos:function(x,y){
			this.x = x;
			this.y = y;
			this.initx = this.x;
			this.inity = this.y;
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
			game.sendMsg(this, game.scenes[game.configdata.SCENE_NAMES.play], game.networker.msg.BETHROW, this.mjid);
		},
		beselected:function(){
			console.log('inity:%d',this.inity);
			this.y = this.inity - 20;
			this.x = this.initx;
			this.isSelected = true;
			game.sendMsg(this, game.scenes[game.configdata.SCENE_NAMES.play], game.networker.msg.BESELECT, this.mjid);
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
		idname:'w_1-1',//w_1:麻将  1:方向  (1:正常 2:左倒 3:右倒)
		mjid: 'w_1', 
		name: 'MjScene',
		imgsource: 'mj',
		mjimg: null,
		rectfront: null,
		direct: 1, //1:正常 2:左倒 3:右倒
		swidth: 0,
		sheight: 0,
		
		showback:0,

		constructor: function(properties) {
			MjScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},

		init: function(properties) {
			var img = game.getImg(this.imgsource);
			var mjdata = this.idname.split('-');
			var frontname = game.mjdata.smallmj[mjdata[0]][parseInt(mjdata[1])];
			if(this.showback == 1){
				frontname = 'self_80';
			}
			if(this.showback == 2){
				frontname = 'self_73';
			}
			if(this.showback == 3){
				frontname = 'self_83';
			}
			this.rectfront = game.configdata.getPngRect(frontname, this.imgsource);
			this.width = this.rectfront[2];
			this.height = this.rectfront[3];
			this.swidth = this.width * game.scalefact;
			this.sheight = this.height * game.scalefact;
			
			this.mjimg = new Hilo.Bitmap({
				image: img,
				rect: this.rectfront,
			}).addTo(this);
			this.mjid = mjdata[0];
			this.name = game.mjdata.smallmj[this.mjid][0];
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
			var idname = this.mjid + '-1';
			var mj = new game.MjScene({idname:idname}).addTo(this);
			mj.x = this.width/2 - mj.width/2;
			mj.y = this.height/2 - mj.height/2 + 10;
			mj.pointerEnabled = false;
			this.scaleX = game.scalefact;
			this.scaleY = game.scalefact;
		},
	});
	
	//HandleMjBtn --- 吃碰杠听胡 按钮
	var HandleMjBtn = ns.HandleMjBtn = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'HandleMjBtn',
		imgsource:'',
		img:null,
		handletype:0, //吃碰杠听胡过
		mjid:null, 
		handimg:null,

		constructor: function(properties) {
			HandleMjBtn.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var bgrect = game.configdata.getPngRect(this.bgrectname,this.imgsource);
			this.width = bgrect[2];
			this.height = bgrect[3];
			game.configdata.createRectImg(this.imgsource, this.bgrectname, 0, 0, 1).addTo(this);
			var idname = this.mjid + '-1';
			var mj = new game.MjScene({idname:idname}).addTo(this);
			mj.x = this.width/2 - mj.width/2;
			mj.y = this.height/2 - mj.height/2 + 10;
			mj.pointerEnabled = false;
			this.scaleX = game.scalefact;
			this.scaleY = game.scalefact;
		},
	});
	
	//MjPortrait--- 头像
	var MjPortrait = ns.MjPortrait = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'MjPortrait',
		username:'玩家',
		score:0,
		headimg:null,
		namelabel:null,
		scorelabel:null,
		scorebg:null,
		isbank:false,
		

		constructor: function(properties) {
			MjPortrait.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var headname = 'battle_100';
			this.headimg = game.configdata.createRectImg('ui',headname,0,0,1).addTo(this);
			var w = 160;
			this.headimg.x = w/2 - this.headimg.width/2;
			this.namelabel = game.configdata.createTitletext(this.username,'22px 黑体','white','rgba(0,0,0,0)',0,75,160).addTo(this);
			this.scorebg = game.configdata.createRectImg('ui','battle_9',0,96,1).addTo(this);
			this.scorebg.x = w/2 - this.scorebg.width/2;
			this.scorelabel = game.configdata.createTitletext(this.score.toString(),'22px 黑体','#AAF1AA','rgba(0,0,0,0)',w/2-36,100,100).addTo(this);
			if(this.isbank){
				var bankimg = game.configdata.createRectImg('ui','lsbattle_1',this.headimg.x,0,1).addTo(this);
				bankimg.y = -bankimg.height;
			}
			
			this.pointerEnabled = false;
			this.scaleX = game.scalefact;
			this.scaleY = game.scalefact;
		},
	});
	
	//TabButton--- 切换按钮
	var TabButton = ns.TabButton = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'TabButton',
		leftTab:null,
		rightTab:null,
		lefttxtUp:null,
		lefttxtDown:null,
		righttxtUp:null,
		righttxtDown:null,
		isLeft:true,
		leftfunc:null,
		rightfunc:null,
		parentscene:null,

		constructor: function(properties) {
			TabButton.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var leftImg  = 'login_bg84';
			var rightImg = 'login_bg85';
			var lefttxtUpImg    = 'login_bg86';
			var lefttxtDownImg  = 'login_bg88';
			var righttxtUpImg   = 'login_bg87';
			var righttxtDownImg = 'login_bg89';
			var bg = 'login_bg95';
			
			var bgImg = game.configdata.createRectImg('ui',bg,0,0,1).addTo(this);
			this.leftTab = game.configdata.createRectImg('ui',leftImg,2,0,1).addTo(this);
			this.rightTab = game.configdata.createRectImg('ui',rightImg,0,this.leftTab.y,1).addTo(this);
			this.rightTab.x = bgImg.width - this.rightTab.width-2;
			this.lefttxtUp = game.configdata.createRectImg('ui',lefttxtUpImg,0,0,1).addTo(this);
			this.lefttxtUp.y = bgImg.height/2 - this.lefttxtUp.height/2;
			this.lefttxtUp.x = bgImg.width * 0.1;
			this.lefttxtDown = game.configdata.createRectImg('ui',lefttxtDownImg,this.lefttxtUp.x,this.lefttxtUp.y,1).addTo(this);
			this.lefttxtUp.pointerEnabled = false;
			
			
			this.righttxtUp = game.configdata.createRectImg('ui',righttxtUpImg,0,this.lefttxtUp.y,1).addTo(this);
			this.righttxtUp.x = bgImg.width *0.9 - this.lefttxtDown.width;
			this.righttxtDown = game.configdata.createRectImg('ui',righttxtDownImg,this.righttxtUp.x,this.righttxtUp.y,1).addTo(this);
			this.righttxtUp.pointerEnabled = false;
			
			this.width = bgImg.width;
			this.height = bgImg.height;
			this.scaleX = game.scalefact;
			this.scaleY = game.scalefact;
			
			var self = this;
			this.leftTab.on(Hilo.event.POINTER_START,function(e){
				self.isLeft = true;
				self.setState();
				console.log('left tab');
				if(self.leftfunc){
					self.leftfunc(self.parentscene);
				}
			});
			this.rightTab.on(Hilo.event.POINTER_START,function(e){
				self.isLeft = false;
				self.setState();
				console.log('right tab');
				if(self.rightfunc){
					self.rightfunc(self.parentscene);
				}
			});
			this.setState();			
		},
		setState:function(){
			if(this.isLeft){
				this.leftTab.visible = false;
				this.lefttxtUp.visible = false;
				this.lefttxtDown.visible = true;
				this.rightTab.visible = true;
				this.righttxtUp.visible = true;
				this.righttxtDown.visible = false;
			}else{
				this.leftTab.visible = true;
				this.lefttxtUp.visible = true;
				this.lefttxtDown.visible = false;
				this.rightTab.visible = false;
				this.righttxtUp.visible = false;
				this.righttxtDown.visible = true;
			}
		},
	});
	
	
	
	//SwitchButton--- 纵向的切换按钮
	var SwitchButton = ns.SwitchButton = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'SwitchButton',
		downimg:null,
		upimg:null,
		front:null,
		isUp:true,
		func:null,

		constructor: function(properties) {
			SwitchButton.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var self = this;
			this.downimg = game.configdata.createRectImg('ui',this.downimg,0,0,1).addTo(this);
			this.upimg = game.configdata.createRectImg('ui',this.upimg,0,0,1).addTo(this);
			this.front = game.configdata.createRectImg('ui',this.front,0,0,1).addTo(this);
			this.front.x = this.downimg.width/2 - this.front.width/2;
			this.front.y = this.downimg.height/2 - this.front.height/2;
			this.width = this.downimg.width;
			this.height = this.downimg.height;
			this.on(Hilo.event.POINTER_END,function(e){
				if(!self.isUp){
					console.log('当前状态，不能点击');
				}else{
					self.isUp = !self.isUp;
					self.setState(this.isUp);
					if(self.func){
						self.func();
					}
				}
				
			});
			this.setState(this.isUp);			
		},
		setState:function(status){
			this.isUp = status;
			if(this.isUp){
				this.downimg.visible = false;
				this.upimg.visible = true;
			}else{
				this.downimg.visible = true;
				this.upimg.visible = false;
			}
		},
	});
	
	//RotateMjBtn --- 旋转麻将 返回房间
	var RotateMjBtn = ns.RotateMjBtn = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'RotateMjBtn',
		btnbg:null,

		constructor: function(properties) {
			RotateMjBtn.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			this.btnbg = game.configdata.createScalebutton('ui','7',0,0).addTo(this);
			this.btnbg.x = this.btnbg.width/2;
			this.btnbg.y = this.btnbg.height/2;
			var circlebgMj = game.configdata.createRectImg('ui','13',0,0,game.scalefact).addTo(this);
			circlebgMj.x = this.btnbg.x - circlebgMj.width/2;
			circlebgMj.y = this.btnbg.y - circlebgMj.height/2 - 80;
			var mj= game.mjdata.createEffect('zhuanmj', 0, 0, 6).addTo(this);
			var mjscale = game.scalefact*0.8;
			mj.scaleX = mj.scaleY = mjscale;
			mj.x = circlebgMj.x + circlebgMj.width/2 -  196*mjscale/2;
			mj.y = circlebgMj.y + circlebgMj.height/2 - 210*mjscale/2;
			this.on(Hilo.event.POINTER_END,function(e){
				console.log('返回房间');
			});
			this.width = this.btnbg.width;
			this.height = this.btnbg.height;
		},
	});
	
	//InvitefriendIcon --- 邀请房卡奖励图标
	var InvitefriendIcon = ns.InvitefriendIcon = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'InvitefriendIcon',
		bgicon:null,
		numimg:null,
		txt:null,
		txtnum:null,
		invitenum:10,
		cardnum:1,

		constructor: function(properties) {
			InvitefriendIcon.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			this.bgicon = game.configdata.createRectImg('ui','yaoqing5',0,0).addTo(this);
			this.width = this.bgicon.width;
			this.height = this.bgicon.height;
			this.txt = game.configdata.createTitletext('邀请'+this.invitenum.toString()+'人', '20px 黑体', 'black', 'rgba(0,0,0,0)', 0, this.bgicon.height, this.bgicon.width).addTo(this);
			this.txtnum = game.configdata.createSimpletext(this.cardnum.toString(), '28px 黑体', 'white', 'rgba(0,0,0,0)', this.bgicon.width-30, this.bgicon.height-30, this.bgicon.width).addTo(this);
		},
	});
	
	//InvitefriendPanel --- 邀请房卡奖励面板
	var InvitefriendPanel = ns.InvitefriendPanel = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'InvitefriendPanel',
		data:[[3,1],[5,3],[7,5],[10,8]],

		constructor: function(properties) {
			InvitefriendPanel.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var line = game.configdata.createRectImg('ui','yaoqing6',0,30,1).addTo(this);	
			this.width = line.width;
			//for(var i= 0;i<this.data.length;i++){
			for(var i=this.data.length-1;i>-1;i--){
				var item = this.data[i];
				var invitenum = item[1];
				var cardnum = item[0];
				var icon  = new game.InvitefriendIcon({invitenum:invitenum,cardnum:cardnum}).addTo(this);
				icon.x = this.width  - (this.data.length -i) * line.width/5 + 30;
			}
		},
	});
	
	//Rechargeablecard --- 充值卡
	var Rechargeablecard = ns.Rechargeablecard = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Rechargeablecard',
		isdouble:false,
		carimg:null,
		btn:null,

		constructor: function(properties) {
			Rechargeablecard.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var bg = game.configdata.createRectImg('ui','zhongzhiz11',0,0,1).addTo(this);
			this.width = bg.width;
			this.height = bg.height;
			this.carimg = game.configdata.createRectImg('ui',this.carimg,0,0,1).addTo(this);
			this.carimg.x = this.width/2 - this.carimg.width/2;
			this.carimg.y = this.height * 0.18;
			if(this.isdouble){
				game.configdata.createRectImg('ui','zhongzhiz19',0,0,1).addTo(this);
			}
			this.btn = new game.IconButton({imgsource:'ui',btnupimg: 'login_bg97',btndownimg: 'login_bg98',iconimg: 'zhongzhiz12'}).addTo(this);
			this.btn.x = this.width/2 - this.btn.width/2;
			this.btn.y = this.height*0.95 - this.btn.height;
			
			new game.RechargeablecardText({y:this.height* 0.6,value:300}).addTo(this);
		},
	});
	
	//RechargeablecardText --- 充值卡横幅字
	var RechargeablecardText = ns.RechargeablecardText = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'RechargeablecardText',
		isdouble:false,
		value:10,
		piceimg:null,
		btn:null,

		constructor: function(properties) {
			RechargeablecardText.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		
		init: function(properties) {
			var bg = game.configdata.createRectImg('ui','zeng',0,0,1).addTo(this);
			this.width = bg.width;
			this.height = bg.height;
			var piceimg = game.configdata.createRectImg('ui','zhang',0,0,1).addTo(this);
			var num = new game.ImgNumber({value:this.value}).addTo(this);
			var w = num.width + piceimg.width;
			num.x = bg.width/2 - w/2;
			num.y = bg.height/2 - num.height/2;
			piceimg.x = num.x + num.width;
			piceimg.y = bg.height/2 - piceimg.height/2;
		},
	});
	
	//ImgNumber --- 图片数字(不带符号的整数)
	var ImgNumber = ns.ImgNumber = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'ImgNumber',
		value:0,
		prefix:'zhongzhiz',
		initx:0,
		constructor: function(properties) {
			ImgNumber.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var nst = this.value.toString();
			var ar = [];
			for(var i=0;i<nst.length;i++){
				var dst = nst.charAt(i);
				var d = parseInt(dst);
				var dname = this.prefix + dst;
				var drect = game.configdata.getPngRect(dname);
				var img = game.configdata.createRectImg('ui',dname,this.initx,0,1).addTo(this);
				this.initx += drect[2];
				this.width += drect[2];
				this.height = drect[3];
			}
		},
	});
	
	
	//SignImgNumber --- 图片数字(带符号的整数)
	var SignImgNumber = ns.SignImgNumber = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'SignImgNumber',
		value:0,
		prefix:'shuizi',
		initx:0,
		signNegative:null,
		signPositive:null,
		constructor: function(properties) {
			SignImgNumber.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var n = Math.abs(this.value);
			var num = new game.ImgNumber({value:n,prefix:this.prefix}).addTo(this);
			var signName = '';
			if(this.value != 0){
				if(this.value > 0)
					signName = this.signPositive;
				else
					signName = this.signNegative;
				var sign = game.configdata.createRectImg('ui',signName,0,0,1).addTo(this);
				sign.y = num.height/2 - sign.height/2;
				num.x = sign.width;
				this.width = sign.width + num.width;
			}else{
				this.width = num.width;
				this.height = num.height;
			}
		},
	});
	
	//CardNumber --- 房卡数字
	var CardNumber = ns.CardNumber = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'CardNumber',
		value:50,
		constructor: function(properties) {
			CardNumber.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var bg = game.configdata.createRectImg('ui','chuangqian',0,0,1).addTo(this);
			this.width = bg.width;
			this.height = bg.height;
			var txt = game.configdata.createSimpletext(this.value.toString(), '24px 黑体', 'white', 'rgba(0,0,0,0)', 50, 20, this.width).addTo(this);
		},
	});
	
	//BalanceAccountCard --- 结算卡片
	var BalanceAccountCard = ns.BalanceAccountCard = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'BalanceAccountCard',
		score:0,
		isowner:false,   //是否为房主
		iswiner:false,   //是否为胜利方
		constructor: function(properties) {
			BalanceAccountCard.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var bg = game.configdata.createRectImg('ui','jiesuanmianban',0,0,1).addTo(this);
			this.width = bg.width;
			this.height = bg.height;
			var scoreimg = new SignImgNumber({value:this.score,prefix:'shuzi',signNegative:'shuzijian',signPositive:'shuzijia'}).addTo(this);
			scoreimg.x = bg.width/2 - scoreimg.width/2;
			scoreimg.y = bg.height * 0.62;
			if(this.isowner){
				game.configdata.createRectImg('ui','login_bg74',0,0,1).addTo(this);
			}
			if(this.iswiner){
				var winimg = game.configdata.createRectImg('ui','login_bg77',0,0,1).addTo(this);
				winimg.x = bg.width/2 - winimg.width/2;
				winimg.y = bg.height *0.25;
			}
		},
	});
	
	
	//CountDown --- 倒计时
	var CountDown = ns.CountDown = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'CountDown',
		totaltime:600,   //秒为单位
		sumtime:0,
		txt:null,
		iszero:false,
		txtwidth:200,
		stop:false,
		func:null,
		fontclr:'black',
		fontsize:'28px 黑体',
		fontbg:'rgba(0,0,0,0)',
		constructor: function(properties) {
			CountDown.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			this.txt = game.configdata.createTitletext(this.getShowString(this.totaltime), this.fontsize, this.fontclr, this.fontbg, 0, 0, this.txtwidth).addTo(this);
		},
		onUpdate:function(){
			if(!this.stop){
				this.sumtime += game.clock.getTick();
				if(this.sumtime > 1000 || Math.abs(this.sumtime - 1000) < 10){
					console.log(this.sumtime);
					this.sumtime = 0;
					this.totaltime--;
					if(this.totaltime < 0){
						this.totaltime = 0;
						this.stop = true;
						if(this.func){
							this.func();
						}
					}
					this.txt.text = this.getShowString(this.totaltime);
				}
			}
		},
		getShowString:function(tmp){
			var temp = tmp;
			var second = temp % 60;
			temp = (temp - second)/60;
			var minute = temp % 60;
			temp = (temp - minute)/60;
			var hour = temp % 24;
			var day = (temp - hour)/24;
			
			var dayst = '';
			if(day != 0)
				dayst = day +':天';
			var hourst = '';
			if(hour != 0)
				hourst = hour+':时';
			
			var showtxt = day + ':天:'+hour+'时:'+minute+'分:'+second+'秒';
			if(this.iszero)
				showtxt = dayst+hourst+minute+'分:'+second+'秒';
			return showtxt;
		},
	});
	
	
	
	//Chatbubble --- 聊天泡泡
	var Chatbubble = ns.Chatbubble = Hilo.Class.create({
		Extends: Hilo.Container,
		name: 'Chatbubble',
		placement:0,   //摆放方式 0:左上 1：右上 2：左下 3：右下
		txt:'聊天泡泡',
		rectname:null,
		delaytime:1800,
		alphaduration:500,

		constructor: function(properties) {
			Chatbubble.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var self = this;
			var showlayer = new Hilo.Container().addTo(this);
			var bg = game.configdata.createRectImg('ui','login_bg99',0,0,1).addTo(showlayer);
			this.width = bg.width;
			this.height = bg.height;
			var brows = game.configdata.createRectImg('brows',this.rectname,0,0,1).addTo(this);
			var talktxt = game.configdata.createTitletext(this.txt,'24px 黑体','#46485f','rgba(0,0,0,0)',0,20,362).addTo(showlayer);
			if(this.placement == 0){
				showlayer.y = -bg.height;
				brows.y = -bg.height;
			}else if(this.placement == 1){
				bg.scaleX = -1;
				bg.x = bg.width;
				showlayer.y = -bg.height;
				showlayer.x = -bg.width;
				brows.y = -bg.height;
				brows.x = -bg.width;
			}else if(this.placement == 2){
				bg.scaleY = -1;
				bg.y = bg.height;
				talktxt.y += 20;
				brows.y += 20;
			}else if(this.placement == 3){
				bg.scaleX = -1;
				bg.x = bg.width;
				bg.scaleY = -1;
				bg.y = bg.height;
				talktxt.y += 20;
				showlayer.x = -bg.width;
				showlayer.x = -bg.width;
			}
			if(this.rectname != null){
				talktxt.visible = false;
			}
			/*var panel = this.getChildById(this.panelid);
			panel.hide();
			this.panelid = null;
			if(sound)
				game.sounds.playTalk(sound);
			*/
			new Hilo.Tween.to(self,{
				alpha:0.1,
			},{
				duration:self.alphaduration,
				delay:self.delaytime,
				onComplete:function(){
					self.removeFromParent();
				}
			});
		},
	});
	
	
	//玩家信息 PlayerInfo
	var PlayerInfo = ns.PlayerInfo = Hilo.Class.create({
		Extends: Object,//Hilo.View,
		name: 'PlayerInfo',
		idname:'玩家',
		score:0,
		isbank:false,
		direct:'down',

		constructor: function(properties) {
			//PlayerInfo.superclass.constructor.call(this, properties);
			//debugger;
			this.init(properties);
		},
		init: function(properties) {
			this.idname = properties.idname;
			this.score  = properties.score;
			this.direct = properties.direct;
			this.isbank = properties.isbank;
		},
	});
	
})(window.game);