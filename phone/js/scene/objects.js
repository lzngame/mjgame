(function(ns) {
	//selectbox --- 多选按钮
	var MjSelectbox = ns.MjSelectbox = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'FwmCheckradio',
		imgbg:null,
		imgcheck:null,
		isSelected:false,
		value:null,
		
		constructor: function(properties) {
			MjSelectbox.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties){
			game.configdata.creatRectImg('ui',this.imgbg,0,0,1).addTo(this);
			var bgrect = game.configdata.getPngRect(this.imgbg);
			var checkrect = game.configdata.getPngRect(this.imgcheck);
			this.imgcheck = game.configdata.creatRectImg('ui',this.imgcheck,bgrect[2]/2-checkrect[2]/2,bgrect[3]/2-checkrect[3]/2,1).addTo(this);
			this.imgcheck.visible = this.isSelected;
			var self = this;
			this.on(Hilo.event.POINTER_START,function(e){
				self.isSelected = !self.isSelected;
				self.imgcheck.visible = self.isSelected;
			});
		},
		
		onUpdate:function(){
			
		},
	});
	
	
	//radiobox ---- 单选按钮
	var MjRadioBox = ns.MjRadioBox = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'MjRadioBox',
		groupid:null,
		itemurlvalue:null,
		imgcheck:null,
		isSelected:false,
		txtlabel:null,
		textlabel:'radio box',
		value:null,
		defaultLabelClr:'black',
		selectLabelClr:'green',
		items:null,
		iscurrent:false,
		
		constructor: function(properties) {
			MjRadioBox.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			game.configdata.creatRectImg('ui',this.itemurlvalue,0,0,1).addTo(this);
			var bgrect = game.configdata.getPngRect(this.itemurlvalue);
			var checkrect = game.configdata.getPngRect(this.imgcheck);
			this.imgcheck = game.configdata.creatRectImg('ui',this.imgcheck,bgrect[2]/2-checkrect[2]/2,bgrect[3]/2-checkrect[3]/2,1).addTo(this);
			this.imgcheck.visible = this.isSelected;
			var self = this;
			var font = "15px arial";
			this.txtlabel = new Hilo.Text({
				font:font,
				text: this.textlabel,
				color: '#FFF200',
				x:bgrect[2]+ 2,
			}).addTo(this);
			var y = bgrect[3]/2 - this.txtlabel._fontHeight/2;
			this.txtlabel.y = y;
			this.setLabelColor();
			this.on(Hilo.event.POINTER_START,function(e){
				if(self.isSelected){
					return;
				}else{
					self.isSelected = true;
					self.imgcheck.visible = self.isSelected;
					self.setLabelColor();
					self.groupExe();
					
				}
			});
			
		},
		groupExe:function(){
			this.iscurrent = true;
			var currentgroup = this.groupid;
			for(var itemid in this.items){
				var radio = this.items[itemid];
				if(radio.groupid && radio.groupid == currentgroup && !radio.iscurrent){
					this.items[itemid].noCheck();
				}
			}
			this.iscurrent = false;
		},
		noCheck:function(){
			this.isSelected = false;
			this.imgcheck.visible = self.isSelected;
			this.setLabelColor();
		},
		setLabelColor:function(){
			if(this.isSelected){
				this.txtlabel.color = this.defaultLabelClr;
			}else{
				this.txtlabel.color = this.selectLabelClr;
			}
		},
		onUpdate:function(){
			
		},
	});
	
	//RoomSurebtn ---- 带房卡图标和数字的按钮
	var RoomSurebtn = ns.RoomSurebtn = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'RoomSurebtn',
		itemurlvalue:null,
		defaultNum:0,
		numlabel:null,
		caricon:null,
		sureicon:null,
		btndown:null,
		imgsource:null,
		btnbody:null,
		constructor: function(properties) {
			MjRadioBox.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var uprect = game.configdata.getPngRect(this.itemurlvalue,this.imgsource);
			var downrect = game.configdata.getPngRect(this.btndown,this.imgsource);
		    this.btnbody = new Hilo.Button({
				image:game.getImg(this.imgsource),
				upState: {rect:uprect},
  				overState: {rect:downrect},
  				downState: {rect:downrect},
   				disabledState: {rect:downrect},
			}).addTo(this);
			
			this.caricon = game.configdata.creatRectImg(this.imgsource,this.caricon,23,0,1).addTo(this);
			this.caricon.y = (uprect[3] - this.caricon.height)/2; 
			this.sureicon = game.configdata.creatRectImg(this.imgsource,this.sureicon,this.caricon.x + this.caricon.width + 15,0,1).addTo(this);
			this.sureicon.y = (uprect[3] - this.caricon.height)/2; 
			
			var self = this;
			var font = "15px arial";
			this.numlabel = new Hilo.Text({
				font:font,
				text: this.defaultNum.toString(),
				color: '#FFF200',
				x:this.caricon.x + 28,
			}).addTo(this);
			var y = uprect[3]/2 - this.numlabel._fontHeight/2;
			this.numlabel.y = y;
			this.caricon.pointerEnabled = false;
			this.sureicon.pointerEnabled = false;
			this.numlabel.pointerEnabled = false;
			var self = this;
			this.btnbody.on(Hilo.event.POINTER_START,function(e){
				console.log('car num btn');
				self.setLabelNum(Math.floor(Math.random()*10));
			});
		},
		setLabelNum:function(num){
			this.numberValue = num;
			this.numlabel.text = num.toString();
		},
		onUpdate:function(){
			
		},
	});
	
	//Merrygoround  ---- 走马灯字条
	var Merrygoround = ns.Merrygoround = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'Merrygoround',
		headimg:null,
		itemurlvalue:null,
		txt:null,
		speed:3,
		constructor: function(properties) {
			Merrygoround.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var head = game.configdata.creatRectImg('ui',this.headimg,0,0,1).addTo(this);
			var bg  = game.configdata.creatRectImg('ui',this.itemurlvalue,head.width,0,1).addTo(this);
			var mask = 	game.drawdata.drawItemRect(1,'black','rgba(1,0,0,0)',bg.x,bg.y,bg.width,bg.height,this);
			var font = "14px arial";
			this.txt = new Hilo.Text({
				font:font,
				text: '欢迎来到靠谱云办公室,福州麻将欢迎您！',
				color: '#FFF200',
				x:300,
				maxWidth:500,
			}).addTo(this);
			var y = bg.height/2 - this.txt._fontHeight/2;
			this.txt.y = y;
			this.txt.mask = mask;
		},
		onUpdate:function(){
			this.txt.x -= 0.8;
			if(this.txt.x < -150){
				this.txt.x = 300;
			}
		},
	});
	
	//Scrollwindow ---- 滑动滚动窗口
	var Scrollwindow = ns.Scrollwindow = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'Scrollwindow',
		imgs:0,
		imgpanel:null,
		roundmask:null,
		currentIndex:0,
		tapstart:false,
		tapstartx:0,
		tapstarty:0,
		tapx:0,
		tapy:0,
		disx:0,
		disy:0,
		slidedisx:0,
		space:5,
		itemwidth:0,
		
		autoSumtime:0,
		autoInterval:0,
		autoDirect:false,
		constructor: function(properties) {
			Scrollwindow.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		addImgs:function(imglist,w,h){
			this.itemwidth = this.space + w;
			this.imgs = imglist.length;

			for(var i=0;i<imglist.length;i++){
				var imgurl = imglist[i];
				var img = new Hilo.Bitmap({
					image:imgurl,
					x:i*(this.itemwidth),
					y:this.height/2 - h/2,
				}).addTo(this.imgpanel);
				var btn = game.configdata.createButton('ui','login_13','login_14',img.x,img.y).addTo(this.imgpanel);
				btn.pointerEnabled = true;
				img.pointerEnabled = false;
				btn.on(Hilo.event.POINTER_END,function(e){
					console.log(this.x);
				});
			}
		},
		init: function(properties) {
			console.log('scroll init');
			var bg = 	game.drawdata.drawItemRoundrect(1,'red','rgba(0,0,0,0)',0,0,this.width,this.height,5,this);
			this.roundmask = 	game.drawdata.drawItemRoundrect(1,'rgba(0,0,0,0)','rgba(0,0,0,0)',(this.width-150)/2,(this.height-250)/2,150,250,5,this);
			this.imgpanel = new Hilo.Container().addTo(this);
			//this.imgpanel.pointerEnabled = false;
			this.imgpanel.mask = this.roundmask;
			this.on(Hilo.event.POINTER_START,function(e){
				this.tapstart = true;
				this.tapstartx = e.stageX;
				this.tapstarty = e.stageY;
				this.tapstart = true;
				this.disx = e.stageX - this.x - this.imgpanel.x;
				this.disy = e.stageY - this.y - this.imgpanel.y;
			});
			this.on(Hilo.event.POINTER_MOVE,function(e){
				/*if(this.imgpanel.x > 50){
					this.tapstart = false;
					this.autoSlideTo(0,200);
				}else{
					if(this.tapstart){
						var x = e.stageX - this.x;
						var y = e.stageY - this.y;
						this.imgpanel.x = x - this.disx;
					}
				}*/
				if(this.tapstart){
					var x = e.stageX - this.x;
					var y = e.stageY - this.y;
					this.imgpanel.x = x - this.disx;
					this.slidedisx = e.stageX - this.tapstartx;
					console.log(this.slidedisx);
				}
			});
			this.on(Hilo.event.POINTER_END,function(e){
				console.log('end **************************************');
				this.slideEnd();
			});
			this.on('touchout',function(e){
				this.slideEnd();
				console.log('000000000000000000***********************************');
			});
		},
		slideEnd:function(){
			if(Math.abs(this.slidedisx) > 60){
					if(this.slidedisx < 0){
						this.currentIndex++;
						if(this.currentIndex > this.imgs-1){
							this.currentIndex = this.imgs -1;
						}
					}else{
						this.currentIndex--;
						if(this.currentIndex < 0){
							this.currentIndex = 0;
						}
					}
				}
			this.autoSlideTo(-this.itemwidth * this.currentIndex,200);
			this.tapstart = false;
			this.disx = 0;
			this.slidedisx = 0;
		},
		autoSlideTo:function(targetx,durationtime){
			var self = this;
			new Hilo.Tween.to(self.imgpanel,{
				x:targetx
			},{
				duration:durationtime,
			});
		},
		//如果使用自己创建的全局方法,在Basescene 里面注册启用,这是一个滑出事件 ,等同于 touchout
		onSlideOut(x1,y1,x2,y2){
			if(this.parent){
				console.log('out x:%s y:%s  --- x:%s y:%s',x1,y1,x2,y2);
			}
		},
		onSlide(directx,directy){
			if(this.parent){
				console.log('slide-h:%s v:%s',directx,directy);
			}
		},
		onUpdate:function(){
			this.autoInterval++;
			if(this.autoInterval > 300){
				this.autoInterval = 0;
				if(this.currentIndex == 0 || this.currentIndex == this.imgs-1){
					this.autoDirect = !this.autoDirect;
				}
				
				if(this.autoDirect){
					this.slidedisx = 65;
				}else{
					this.slidedisx = -65;
				}
				this.slideEnd();
				console.log(this.autoDirect);
			}
		}
		
	});
	
	
})(window.game);