(function(ns) {
	var LoginScene = ns.LoginScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name: game.configdata.SCENE_NAMES.login,
		
		constructor: function(properties) {
			LoginScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			console.log('%s init', this.name);
		},
		active: function(data){
			console.log('%s active:', this.name);
			var scene = this;
			this.addTo(game.stage);
			
			/*var bmp = new Hilo.Bitmap({
				image: 'img/fire7.png',
				x: 0,
				y: 0
			}).addTo(this);
			
			bmp.on(Hilo.event.POINTER_START,function(e){
				console.log('bmp');
				game.switchScene(game.configdata.SCENE_NAMES.load);
			});
			
			*/
            var blueRect = new Hilo.DOMElement({
                id: 'blueRect',
                element: Hilo.createElement('form', {
                	action:'tt',
                	method:'get',
                	innerHTML:'<input type="text" name="user_url" />',
                    style: {
                        backgroundColor: '#004eff',
                        position: 'absolute',
                    }
                }),
                width: 300,
                height: 300,
                x: 0,
                y: -game.screenHeight
            }).addTo(this);
            blueRect.on(Hilo.event.POINTER_START,function(e){
				console.log('bmp');
			});


            //dom element
            var redRect = new Hilo.DOMElement({
                id: 'redRect',
                element: Hilo.createElement('h1', {
                	innerHTML:'DOMElement:元素',
                    style: {
                        backgroundColor: '#f00',
                        position: 'absolute',
                        color:'white'
                    }
                }),
                width: 100,
                height: 100,
                x: 100,
                y: 100
            }).addTo(this);


		},
		deactive: function() {
			this.destory();
		},
		destory: function() {
			console.log('%s destory', this.name);
			this.removeAllChildren();
			this.removeFromParent();
		},
	});
})(window.game);