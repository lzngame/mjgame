game = window.game || {};

game.sceneuidata = new function(){
	var self = this;
	
	self.init = function(){
		console.log('scene ui data init');
	};
	
	self.weixinlogin_uidata = [
	        [
				{
					itemid:'id_weixinlogbg_girl_bmp',
					itemtype:'bmp',
					itemurlvalue:'login_girl',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'pct',
					aligny:'top_5'
				},
	        ],
			[
				{
					itemid:'id_weixinlogin_btn',
					itemtype:'btn',
					itemurlvalue:'login_10',
					btnup:'login_11',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'txt',
					aligny:'center'
				},
				{
					itemid:'id_agreeweixinlogin_selectbox',
					itemtype:'selectbox',
					itemurlvalue:'login_bg48',
					selectvalue:'login_4',
					layouttype_x:'pct',
					alignx:'left_36',
					layouttype_y:'pct',
					aligny:'bottom_10'
				},
				{
					itemid:'id_weixinlogin_txt',
					itemtype:'bmp',
					itemurlvalue:'login_5',
					layouttype_x:'follow',
					alignx:'id_agreeweixinlogin_selectbox&45',
					layouttype_y:'follow',
					aligny:'id_agreeweixinlogin_selectbox&15'
				}
			]
		];
	
	
	
	self.createAtlas = function(data){
		var atlas = new Hilo.TextureAtlas({
			image: game.getImg(data.name),
			width: data.w,
			height: data.h,
			frames:data.frames,
			sprites:data.sprites,
		});
		return atlas;
	};
};

