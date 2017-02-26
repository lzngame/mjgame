(function(ns) {
	var PlayMainscene = ns.PlayMainscene = Hilo.Class.create({
		Extends: game.BaseScene,
		name: game.configdata.SCENE_NAMES.play,
		items:null,
		
		constructor: function(properties) {
			PlayMainscene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
			this.width = game.configdata.mainStageSize.width;
			this.height = game.configdata.mainStageSize.height;
			this.items = {};
		},
		executeMsg:function(sendobj,msgtype,msgdata){
			var self = this;
			switch(msgtype){
				case '':
					break;
			}
		},
		active:function(data) {
			console.log('%s active:', this.name);
			this.addTo(game.stage);
			var bg = new Hilo.Bitmap({
				width:this.width,
				height:this.height,
				image:game.getImg('bgs'),
				rect:game.configdata.getPngRect('battlebg','bg')
			}).addTo(this);
			
			
			game.layoutUi.drawStepLine(game.screenWidth,game.screenHeight,this);
			game.layoutUi.layoutPanelData(game.sceneuidata.playscene_uidata[0],game.screenWidth,game.screenHeight,1,this);
		},
		
		createPointoutWindow:function(data,title,text){
			var self = this;
			var txt = game.configdata.createTitletext(text,'18px 黑体','black','yellow',0,0,300);
			var panel = game.configdata.createBgPanel(data,'login_bg35',true,true,self,'login_13','login_14','ui',55,'login_bg111',title);
			txt.x = panel.width * game.scalefact /2 -150;
			txt.y = panel.height * game.scalefact /2 - txt._fontHeight/2;
			
			txt.addTo(panel);
			return panel;
		},
		
		createPromptpanel:function(bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel(game.sceneuidata.main_uidata[3],bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','login_bg42');
			var btn = new game.RoomSurebtn({
				itemurlvalue:'login_10',
				defaultNum:5,
				caricon:'chuangqian',
				sureicon:'login_bg72',
				btndown:'login_11',
				imgsource:'ui',
				scaleX:game.scalefact,
				scaleY:game.scalefact,
			}).addTo(panel);
			btn.x = (panel.width - btn.width) *game.scalefact/2;
			btn.y = panel.height * game.scalefact - btn.height * game.scalefact - 20;
			return panel;
		},
		
		createPromptpanel2:function(data,bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel(data,bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','login_bg43');
			var numpanel = new game.InputNumpanel({numcount:6,x:350,y:10,scaleX:game.scalefact,scaleY:game.scalefact}).addTo(panel);
			numpanel.x = (panel.width - numpanel.width)*game.scalefact/2;
			numpanel.y = panel.height * game.scalefact -numpanel.height * game.scalefact - panel.height * game.scalefact * 0.05;
			numpanel.inceptHandle = this.inceptNum;
			panel.numpanel = numpanel;
			return panel;
		},
		
		createPromptpanel3:function(data,bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel(data,bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','fenxiang');
			return panel;
		},
		createPromptpanel4:function(data,bgname,ishalf,ismodal,theparent){
			var panel = game.configdata.createBgPanel([],bgname,ishalf,ismodal,theparent,'login_13','login_14','ui',55,'login_bg111','login_bg63');
			var scrollwin = new game.Scrollwindow({
				width:panel.width * game.scalefact * 6/8,
				height:panel.height * game.scalefact * 6/8,
				x:panel.width* game.scalefact/8,
				y:panel.height* game.scalefact/8,
			}).addTo(panel);
			var txt = new Hilo.Text({
				text:"",
				font:'14px  黑体',
				color:'black',
				background:'rgba(0,0,0,0)',
				width:scrollwin.width,
				maxWidth:scrollwin.width-60,
				textAlign:'left',
				height:1850,
				lineSpacing:5,
				x:30,
				y:10,
				textVAlign:'top',
			});
			scrollwin.addContent(txt,1850);
			this.slideList.push(scrollwin);
			
			
			$.ajax({
				type:'GET',
				url:'../phone/txtdata/test.txt',
				timeout:100,
				success:function(data){
					console.log(data);
					txt.text = data;
				},
				error:function(xhr,type){
					console.log(type);
					console.log(xhr);
				}
			})
			
			return panel;
		},
		inceptNum:function(numst){
			console.log(numst);
			if(numst.length >= 6 && !isNaN(numst)){
				var scene = this.parent.parent;
				scene.showLoadgif(true);
				game.sendMsg(scene,game.networker,'testmsg_num',numst);
			}
		},
		
		deactive: function() {
			var scene = this;
			this.off();
			Hilo.Tween.to(this, {
					y: -this.height,
				}, {
					duration: 500,
					ease: Hilo.Ease.Back.EaseIn,
					onComplete: function() {
						console.log('main scene destory');
						scene.destory();
					}
				});
		},
		destory: function() {
			console.log('%s destory', this.name);
			this.removeAllChildren();
			this.removeFromParent();
		},
		onUpdate:function(){
			
		},
	});
})(window.game);