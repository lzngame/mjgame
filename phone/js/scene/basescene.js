(function(ns) {
	var BaseScene = ns.BaseScene = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'',
		
		constructor: function(properties) {
			BaseScene.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		fitPhonesize:function(){
			
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