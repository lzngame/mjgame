 (function(ns) {
	var DepotCar = ns.DepotCar = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'DepotCar',
		carimg:null,
		tyreimg:null,
		isDescend:false,
		isUp:false,
		isTop:false,
		sumtime:0,
		delay:0,
		index:0,
		isTyreOncar:false,
		constructor: function(properties) {
			DepotCar.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			this.carimg = new Hilo.Container({
				pivotY:265,
				pivotX:80,
				y:265,
				x:80,
			}).addTo(this);
			new Hilo.Bitmap({
				image:'img/traffic/car.png',
			}).addTo(this.carimg);
			this.tyreimg = new Hilo.Bitmap({
				image:game.getImg('uimap'),
				rect:game.configdata.getPngRect('tyreoncar','uimap'),
				y:72,
				x:223,
				visible:false,
			}).addTo(this.carimg);
		},
		onUpdate:function(){
			this.autoUp();
			this.autoDescend();
		},
		autoUp:function(){
			if(this.isUp){
				if(this.index < 8){
					this.sumtime++;
					if(this.sumtime >35){
						this.sumtime = 0;
						this.carimg.rotation -= 0.5;
						this.index++;
					}
				}else{
					this.isUp = false;
					this.isTop = true;
				}
			}
		},
		autoDescend:function(){
			if(this.isDescend){
				this.delay++;
				if(this.delay >80){
					if(this.carimg.rotation < 0){
						this.carimg.rotation += 0.5;
					}else{
						this.carimg.rotation = 0;
						this.isDescend = false;
						this.delay = 0;
						this.index = 0;
						this.isTop = false;
					}
				}
			}
		},
	});
	var JackBoxCover = ns.JackBoxCover = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'jackbox',
		img:null,
		isOpen:false,
		data:null,
		index:0,
		sumtime:0,
		constructor: function(properties) {
			JackBoxCover.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			this.data = [['jackboxcover1',0,0],['jackboxcover2',0,0],['jackboxcover3',0,0],['jackboxcover4',0,-90],['jackboxcover5',84,0]];
			this.img = new Hilo.Bitmap({
				image:game.getImg('uimap'),
				rect:game.configdata.getPngRect(this.data[0][0],'uimap'),
			}).addTo(this);
		},
		onUpdate:function(){
			if(this.isOpen){
				this.sumtime++;
				if(this.sumtime > 100){
					this.index++;
					if(this.index >= this.data.length){
						this.index = this.data.length -1;
						this.isOpen = false;
					}
					var item = this.data[this.index];
					this.img.setImage(game.getImg('uimap'),game.configdata.getPngRect(item[0],'uimap'));
					this.img.x = item[1];
					this.img.y = item[2];
				}
			}
		},
	});
	var WorkJack = ns.WorkJack = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'workjack',
		jackbody:null,
		pillar:null,
		index:0,
		isUp:false,
		sumtime:0,
		constructor: function(properties) {
			WorkJack.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			this.jackbody = new Hilo.Bitmap({
				image:game.getImg('uimap'),
				rect:game.configdata.getPngRect('jackonfloor','uimap'),
			}).addTo(this);
			this.pillar = new Hilo.Bitmap({
				image:game.getImg('uimap'),
				rect:game.configdata.getPngRect('pillar01','uimap'),
				x:53,
				y:-32
			}).addTo(this);
		},
		setDown:function(){
			this.pillar.setImage(game.getImg('uimap'),game.configdata.getPngRect('pillar01','uimap'));
		},
		onUpdate:function(){
			if(this.isUp){
				this.sumtime++;
				if(this.sumtime >35){
					if(this.index <8){
						this.index++;
						this.sumtime = 0;
						var name = 'pillar0'+this.index.toString();
						this.pillar.setImage(game.getImg('uimap'),game.configdata.getPngRect(name,'uimap'));
					}else{
						this.isUp = false;
					}
				}
			}
		},
	});
	
	var Ropebone = ns.Ropebone = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'Ropebone',
		downbone:null,
		rope:null,
		step:false,
		addbee:false,
		bee:null,
		steptime:0,
		isfall:false,
		index:0,
		data:null,
		data2:null,
		floor:678,
		onfloor:false,
		change:false,
		sumtime:0,
		constructor: function(properties) {
			Ropebone.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			this.data = [21,25,26,38,33,45,53];
			this.data2 = [43,47,48,60,55,67,74],
			this.downbone = new Hilo.Bitmap({
				image:game.getImg('uimap'),
				rect:game.configdata.getPngRect('bone','uimap'),
				y:21,
				x:-25,
			}).addTo(this);
			this.rope = new Hilo.Bitmap({
				image:game.getImg('uimap'),
				rect:game.configdata.getPngRect('rope01','uimap'),
			}).addTo(this);
			this.bee = new Hilo.Bitmap({
				image:game.getImg('animalatlas'),
				rect:[216, 285, 37, 38],
				x:-30,
				y:43,
				visible:false,
			}).addTo(this);
			this.bee.scaleX = -1;
			this.bee.x += 61;
		},
		onUpdate:function(){
			if(this.addbee){
				this.steptime++;
				if(this.steptime > 80){
					this.step = true;
					this.addbee = false;
				}
			}
			if(this.step){
				this.change = true;
				this.sumtime++;
				if(this.sumtime >5){
					this.sumtime = 0;
					this.index++;
					if(this.index <= 6){
						this.rope.setImage(game.getImg('uimap'),game.configdata.getPngRect('rope0'+(this.index+1).toString(),'uimap'));
						this.downbone.y = this.data[this.index];
						this.bee.y = this.data2[this.index];
					}else{
						this.step = false;
						this.isfall = true;
					}
				}
			}
			if(this.isfall){
				this.y += 6;
				if(this.y >= this.floor){
					this.bee.visible = false;
					this.isfall = false;
					this.x = 453;
					this.y = this.floor;
					this.rope.setImage(game.getImg('uimap'),game.configdata.getPngRect('boneonfloor','uimap'));
					this.downbone.visible = false;
					this.isfall = false;
					this.onfloor = true;
				}
			}
		},
	});
	
	
	var PasslampBtn = ns.PasslampBtn = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'PasslampBtn',
		img:null,
		index:0,
		data:null,
		constructor: function(properties) {
			PasslampBtn.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init:function(properties) {
			this.data = ['img/traffic/yellowbtn.png','img/traffic/greenbtn.png','img/traffic/redbtn.png'];
			this.img = new Hilo.Bitmap({
				image:this.data[0],
			}).addTo(this);
			
			this.img.on(Hilo.event.POINTER_START, function(e) {
				this.parent.clickFunc();
			});
			
			this.setIndexImg(this.index);
		},
		clickFunc:function(){
			this.index++;
			if(this.index > this.data.length-1){
				this.index  = 0;
			}
			//this.img.setImage(game.getImg('uimap'),game.configdata.getPngRect(this.data[this.index],'uimap'));
			this.img.setImage(this.data[this.index]);
		},
		setIndexImg:function(index){
			this.index = index;
			if(this.index > this.data.length-1){
				this.index  = 0;
			}
			if(this.index < 0){
				this.index  = 0;
			}
			//this.img.setImage(game.getImg('uimap'),game.configdata.getPngRect(this.data[this.index],'uimap'));
			this.img.setImage(this.data[this.index]);
			
		},
	});
})(window.game);