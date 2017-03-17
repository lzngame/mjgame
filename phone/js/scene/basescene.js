(function(ns) {
	var BaseScene = ns.BaseScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'',
		isHandleSlide:true,
		tapstarttime:0,
		tapendtime:0,
		tapstartx:0,
		tapstarty:0,
		tapx:0,
		tapy:0,
		
		bg:null,
		
		loadgif:null,
		currentpanel:null,
		
		slideList:[],
		funcs:null,
		
		
		constructor: function(properties) {
			BaseScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init:function(){
			
		},
		initBtnHandle:function(){
			var self = this;
			for(var idname in this.funcs){
				this.items[idname].idname = idname;
				this.target = self;
				this.items[idname].on(Hilo.event.POINTER_END, function(e){
					console.log('注意这里不要出现重复调用');
					self.funcs[this.idname](self);
				});
			}
		},
		createPointoutWindow: function(data, title, text,isTitle) {
			var self = this;
			var txt = game.configdata.createTitletext(text, '28px 黑体', 'black', 'rgba(0,0,0,0)', 0, 0, 600);
			var panel = game.configdata.createBgPanel(data, 'login_bg35', true, true, self, 'login_13', 'login_14', 'ui', 55, 'login_bg111', title);
			txt.x = panel.width * game.scalefact / 2 - 300;
			txt.y = panel.height * game.scalefact / 2 - txt._fontHeight / 2;
			console.log('x:%f -- y:%f',panel.x,panel.y);
			txt.addTo(panel);
			return panel;
		},
		disBtnHandle:function(){
			var self = this;
			for(var idname in this.funcs){
				this.items[idname].off();
			}
		},
		initBg:function(imgsource,bgname){
			if(bgname){
				this.bg = game.configdata.createRectImg(imgsource,bgname,0,0,1).addTo(this);
			}else{
				this.bg = new Hilo.Bitmap({image:game.getImg(imgsource),}).addTo(this);
			}
			this.bg.width = this.width;
			this.bg.height = this.height;
			game.layoutUi.drawStepLine(game.stage.width,game.stage.height,this);
		},
		
		initSlideEvent: function() {
			var self = this;
			
			this.on(Hilo.event.POINTER_START,function(e){
				self.tapstarttime = game.clock.getSystemtime();
				self.tapstartx = e.stageX;
				self.tapstarty = e.stageY;
			});
			this.on(Hilo.event.POINTER_MOVE,function(e){
				self.tapx = e.stageX;
				self.tapy = e.stageY;
				//self.handleSlideoutList(e.stageX,e.stageY);
			});
			this.on(Hilo.event.POINTER_END,this.onSlideHandle);
		},
		onSlideHandle:function(e){
			var self = this;
			self.tapendtime = game.clock.getSystemtime();
			var delay = self.tapendtime - self.tapstarttime;
			var dis_x = e.stageX - self.tapstartx;
			var dis_y = e.stageY - self.tapstarty;
			if(delay < 300 && this.isHandleSlide){
					var directx = 0;
					if(Math.abs(dis_x) > 20){
						var directH = '向右滑动';
						if(dis_x > 0){
							directx = 1;
							self.onSlideRight(self.tapstartx,self.tapstarty,e.stageX,e.stageY);
						}else{
							directH = '向左滑动';
							directx = 2;
							self.onSlideLeft(self.tapstartx,self.tapstarty,e.stageX,e.stageY);
						}
						console.log(directH);
					}
					var directy = 0;
					if(Math.abs(dis_y) > 20){
						var directV = '向下滑动';
						if(dis_y > 0){
							directy = 1;
							self.onSlideDown(self.tapstartx,self.tapstarty,e.stageX,e.stageY);
						}else{
							directV = '向上滑动';
							directy = 2;
							self.onSlideUp(self.tapstartx,self.tapstarty,e.stageX,e.stageY);
						}
						console.log(directV);
					}
					if(directx + directy > 0){
						self.handleSlideList(directx,directy);
					}
			} 
			self.resetSlidePoint();
		},
		resetSlidePoint:function(){
			this.tapstartx = -1;
			this.tapstarty = -1;
			this.tapx = -1;
			this.tapy = -1;
			this.tapstarttime = 0;
			this.tapendtime = 0;
		},
		
		fitPhonesize:function(){
			
		},
		handleSlideList:function(directx,directy){
			var self = this;
			for(var i=0;i<this.slideList.length;i++){
				var target = this.slideList[i];
				if(target.hitTestPoint(this.tapstartx,this.tapstarty)){
					if(target.onSlide){
						target.onSlide(directx,directy);
					}
				}
			}
		},
		
		onSlideLeft:function(x1,y1,x2,y2){
			
		},
		onSlideRight:function(x1,y1,x2,y2){
			
		},
		onSlideUp:function(x1,y1,x2,y2){
			
		},
		onSlideDown:function(x1,y1,x2,y2){
			
		},
		
		showLoadgif:function(isshow){
			if(isshow){
				if(!this.loadgif){
					this.loadgif = game.configdata.createLoadpanel();
					this.loadgif.addTo(this);
				}
			}else{
				console.log('remove loadgif');
				this.loadgif.removeFromParent();
				this.loadgif = null;
			}
		},
		
		executeMsg:function(sendobj,inceptobj,msgtype,msgdata){
			console.log('pring msg ----------------------');
			console.log(sendobj);
			console.log(inceptobj);
			console.log(msgtype);
			console.log(msgdata);
			console.log('pring msg ----------------------');
		},
		
		deactive: function() {
			this.destory();
		},
		destory: function() {
			this.removeAllChildren();
			this.removeFromParent();
			game.stage.off();
		},
		onTouchMove:function(e){
			
		},
		onTouchEnd:function(e){
			
		},
		onTouchStart:function(e){
			
		},
	});
})(window.game);