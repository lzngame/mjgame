(function(ns) {
	var Hero = ns.Hero = Hilo.Class.create({
		Extends: Hilo.Container,
		body:null,
		name: '',
		nametxt:null,
		atlas: null,
		initx: 0,
		isActionFirst:true,    //动作可能持续好多帧，每帧还会持续多个循环，这个值指示在动作的第一次发生 防止消息粘包
		framename: '',
		
		
		offsetx:0,
		offsety:0,
		offsetxRight:0,
		offsetxLeft:0,
		posx:0,
		posy:0,
		
		speed:5.0,
		speedx:0,
		speedy:0,
		targetx:0,
		targety:0,
		
		
		prop:null,
		hand:null,
		inProp:false,
		
		currentHealth:5,
		isFirstcirle:false,
		preFrame:-1,
		
		constructor: function(properties) {
			Hero.superclass.constructor.call(this, properties);
			this.init(properties);
			this.initx = this.x;
		},
		init: function(properties) {
			console.log('%s init', this);
			this.pivotX = 76;
			this.pivotY = 175;
			this.body = new Hilo.Sprite().addTo(this);
			this.body._frames = this.atlas.getSprite('idle');
			this.body.interval = 10;
			this.nametxt = new Hilo.Text({
				text: '',
				color: '#FF00FF',
				y:-20,
			}).addTo(this);
			var img = game.getImg('uimap');
			this.prop = new Hilo.Bitmap({
				image:img,
				rect:game.configdata.getPngRect('empty','uimap'),
			}).addTo(this);
			this.hand = new Hilo.Bitmap({
				x:32,
				y:178,
				image:img,
				visible:false,
				rect:game.configdata.getPngRect('coverhand','uimap'),
			}).addTo(this);
		},
		receiveMsg: function(msg) {
			
		},
		putProp:function(){
			this.prop.visible = this.hand.visible = this.inProp = false;
		},
		takeProp:function(propname,x,y){
			this.hand.visible = this.prop.visible = this.inProp = true;
			this.prop.x = x;
			this.prop.y = y;
			this.prop.setImage(game.getImg('uimap'),game.configdata.getPngRect(propname,'uimap'));
		},
		
		blockStop:function(){
			this.speedx = 0;
			this.speedy = 0;
			this.targetx = this.hero.posx;
			this.targety = this.hero.posy;
			//this.switchState('idle',6);
		},
		onUpdate: function() {
			if(this.preFrame != this.body.currentFrame){
				this.preFrame = this.body.currentFrame;
				this.isFirstcirle = true;
			}else{
				this.isFirstcirle = false;
			}
			
			
			this.atLastFrame();
			if(this.framename =='upladder'){
				if(this.isFirstcirle){
					if(this.body.currentFrame == 2 || this.body.currentFrame ==5){
						//this.posy -= 40;
					}
				}
			}
			if(this.framename =='downladder'){
				if(this.isFirstcirle){
					if(this.body.currentFrame == 2 || this.body.currentFrame ==5){
						//this.posy += 40;
					}
				}
			}
			
			if(Math.abs(this.posx -this.targetx) <5 && Math.abs(this.posy-this.targety) <5 && (this.speedx != 0 || this.speedy != 0)){
				this.posx = this.targetx;
				this.posy = this.targety;
				this.speedx = 0;
				this.speedy = 0;
				if(this.framename != 'idle' && this.framename != 'handup'){
					if(this.ispillow){
						this.switchState('handup',5);
					}else{
						this.switchState('idle',5);
					}
				}
					
			}else{
				this.posx += this.speedx;
				this.posy += this.speedy;
			}
			this.x = this.posx + this.offsetx ;
			this.y = this.posy + this.offsety;
		},
		sendMsg: function(target, msgtype, msgdata) {
			target.receiveMsg({
				msgtype: msgtype,
				msgdata: msgdata
			});
		},
		switchState: function(name, interval) {
			this.framename = name;
			this.body._frames = this.atlas.getSprite(name);
			this.body.interval = interval;
			this.body.currentFrame = 0;
		},
		atLastFrame: function() {
			if (this.body.currentFrame == this.body.getNumFrames() - 1) {
				switch (this.framename) {
					case 'fallladder':
						this.regainIdle();
						break;
					case 'onTopladder':
						this.regainIdle();
						this.posy -= 90;
						break;
					case 'nocan':
						this.regainIdle();
						break;
					case 'downTopladder':
						this.switchState('downladder',6);
						this.speedy = 1.5;
						break;
					case 'takebackput':
						this.regainIdle();
						break;
					case 'takebackputjack':
						this.regainIdle();
						break;
					case 'handon':
						this.regainIdle();
						break;
					case 'pick':
						this.regainIdle();
						break;
				}
			}
		},
		
		regainIdle: function() {
			this.switchState('idle',6);
			
			this.body.interval = 5;
			this.x = this.initx;
		},
	});

})(window.game);

(function(ns) {
	var Bee = ns.Bee = Hilo.Class.create({
		Extends: Hilo.Sprite,
		name: 'bee',
		atlas: null,
		offsetx:0,
		offsety:0,
		offsetxRight:0,
		offsetxLeft:0,
		posx:0,
		posy:0,
		speed:3.0,
		speedx:0,
		speedy:0,
		targetx:0,
		targety:0,
		
		constructor: function(properties) {
			Bee.superclass.constructor.call(this, properties);
			this.init(properties);
			this.initx = this.x;
		},
		init: function(properties) {
			console.log('%s init', this);
			this.pivotX = 30;
		},
		turnleft:function(){
			this.scaleX = 1;
			//this.offsetx = this.offsetxLeft;
		},
		turnright:function(){
			this.scaleX = -1;
			//this.offsetx = this.offsetxRight;
		},
		onUpdate: function() {
			if(Math.abs(this.posx -this.targetx) <5 && Math.abs(this.posy-this.targety) <5 && (this.speedx != 0 || this.speedy != 0)){
				this.posx = this.targetx;
				this.posy = this.targety;
				this.speedx = 0;
				this.speedy = 0;
			}else{
				this.posx += this.speedx;
				this.posy += this.speedy;
			}
			this.x = this.posx + this.offsetx ;
			this.y = this.posy + this.offsety;
		},
	});

})(window.game);



function sendMsg(target, msgtype, msgdata){
	target.receiveMsg({
				msgtype: msgtype,
				msgdata: msgdata
			});
	}

function addEffect(body,sttype) {
	var atlas = new Hilo.TextureAtlas({
		image: game.getImg('uimap2'),
		width:1024,
		height:512,
		frames: [
			[461,682,54,76],[198,727,58,76],[396,526,57,76],[458,862,54,76],   //d_effect
			[458,940,54,76],[401,940,55,76],[462,378,54,76],[462,66,54,76],    //b_effect
			[136,946,65,65],[130,134,66,65],[130,743,66,65],[130,201,66,65],   //effect_a
			[136,878,65,66],[130,539,66,66],[130,607,66,66],[130,675,66,66],   //effect_d
		],
		sprites: {
			sword: [0, 1, 2, 3],
			sword1: [4, 5, 6, 7],
			sword2: [8, 9, 10, 11],
			shield: [12, 13, 14, 15],
		}
	});
	var effect = new Hilo.Sprite({
		frames: atlas.getSprite(sttype),
		timeBased: false,
		onUpdate: function() {
			if (this.body.currentFrame == this.body.getNumFrames() - 1) {
				this.removeFromParent();
			}
		}
	});
	if(sttype == 'shield'){
		effect.x = body.x -effect.width/2  + body.shieldoffsetx;
		effect.y = body.y -effect.height/2 + body.shieldoffsety;
	}
	if(sttype == 'sword' || sttype == 'sword1' ||sttype == 'sword2'){
		effect.x = body.x -effect.width/2  + body.hitoffsetx;
		effect.y = body.y -effect.height/2 + body.hitoffsety;
	}
	effect.addTo(body.parent);
}