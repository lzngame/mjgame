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
		speed:3,
		ismove:false,
		tapstart:false,
		movetime:0,
		endtime:0,
		dis:0,
		tapx:0,
		tapy:0,
		disx:0,
		disy:0,
		constructor: function(properties) {
			Scrollwindow.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var mask = 	game.drawdata.drawItemRect(1,'red','green',0,0,this.width,this.height,this);
			this.on(Hilo.event.POINTER_START,function(e){
				//console.log('tap');
				this.tapstart = true;
				this.movetime = game.clock.getSystemtime();
			});
			this.on(Hilo.event.POINTER_MOVE,function(e){
				//console.log('move');
				this.ismove = true;
				this.movetime = game.clock.getSystemtime();
				this.endtime = this.movetime;
				this.tapx = e.stageX;
				this.tapy = e.stageY;
				this.disx = (this.x + this.width) - this.tapx;
				this.disy = (this.y + this.height) - this.tapy;
				console.log('--------- %s:%s',this.disx,this.disy);
				//console.log(e);
				//console.log(this.hitTestPoint(e.stageX,e.stageY));
				
			});
			this.on(Hilo.event.POINTER_END,function(e){
				console.log('end **************************************');
				this.ismove = false;
				this.tapstart = false;
				this.movetime = game.clock.getSystemtime();
				this.endtime = this.movetime;
			});
		},
		onHandle:function(){
			//console.log('execute....');
		},
		onUpdate:function(){
			if(!this.tapstart){
				this.movetime = game.clock.getSystemtime();
				this.endtime = this.movetime;
				this.dis = this.movetime - this.endtime;
				//console.log(this.dis);
			}else{
				this.movetime = game.clock.getSystemtime();
				this.dis = this.movetime - this.endtime;
			}
			
			console.log(this.hitTestPoint(this.tapx,this.tapy));
			//console.log('%s -- %s:',this.tapstart,this.dis);
			
			if(Math.abs(this.dis) > 200 && this.disx < 20){
				console.log('end--------------------------------');
				this.ismove = false;
				this.tapstart = false;
				this.movetime = game.clock.getSystemtime();
				this.endtime = this.movetime;
			}
			//console.log('%s:%s',this.tapstart,this.ismove);
			if(this.tapstart && this.ismove){
				//debugger;
				//this.tapstart = false;
				//this.ismove = false;
				//console.log('end2');
			}
		},
	});
	
	
})(window.game);