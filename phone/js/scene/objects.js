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
		theparent:null,
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
			for(var itemid in this.theparent.items){
				if(this.theparent.items[itemid].groupid && this.theparent.items[itemid].groupid == currentgroup && !this.theparent.items[itemid].iscurrent){
					this.theparent.items[itemid].noCheck();
				}
			}
			this.iscurrent = false;
		},
		noCheck:function(){
			this.isSelected = false;
			this.imgcheck.visible = self.isSelected;
			this.setLabelColor();
			console.log(this);
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
	
	
	
	
})(window.game);