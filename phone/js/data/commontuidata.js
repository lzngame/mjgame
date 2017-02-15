game = window.game || {};

game.commontuidata = new function(){
	var self = this;
	
	self.init = function(){
		console.log('scene ui data init');
	};
	
	self.radiobox_uidata = [
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
	
	self.main_uidata = [
	        [
				{
					itemid:'id_weixinlogbg_girl_bmp',
					itemtype:'bmp',
					itemurlvalue:'tuiguang15',
					layouttype_x:'pct',
					alignx:'right_42',
					layouttype_y:'pct',
					aligny:'top_5'
				},
	        ],
			[
				{
					itemid:'id_mainscene_expandable_btn',
					itemtype:'btn',
					itemurlvalue:'tuiguang15',
					btnup:'tuiguang15',
					layouttype_x:'pct',
					alignx:'right_34',
					layouttype_y:'pct',
					aligny:'top_2'
				},
				{
					itemid:'id_mainscene_share_btn',
					itemtype:'btn',
					itemurlvalue:'1',
					btnup:'1',
					layouttype_x:'pct',
					alignx:'right_26',
					layouttype_y:'pct',
					aligny:'top_2'
				},
				{
					itemid:'id_mainscene_score_btn',
					itemtype:'btn',
					itemurlvalue:'login_bg14',
					btnup:'login_bg14',
					layouttype_x:'pct',
					alignx:'right_18',
					layouttype_y:'pct',
					aligny:'top_2'
				},
				{
					itemid:'id_mainscene_help_btn',
					itemtype:'btn',
					itemurlvalue:'battle_5',
					btnup:'battle_5',
					layouttype_x:'pct',
					alignx:'right_10',
					layouttype_y:'pct',
					aligny:'top_2'
				},
				{
					itemid:'id_mainscene_setting_btn',
					itemtype:'btn',
					itemurlvalue:'battle_2',
					btnup:'battle_2',
					layouttype_x:'pct',
					alignx:'right_2',
					layouttype_y:'pct',
					aligny:'top_2'
				},
				{
					itemid:'id_mainscene_enterroom_btn',
					itemtype:'btn',
					itemurlvalue:'5',
					btnup:'6',
					layouttype_x:'pct',
					alignx:'left_25',
					layouttype_y:'pct',
					aligny:'top_25'
				},
				{
					itemid:'id_mainscene_createroom_btn',
					itemtype:'btn',
					itemurlvalue:'6',
					btnup:'5',
					layouttype_x:'pct',
					alignx:'left_63',
					layouttype_y:'pct',
					aligny:'top_25'
				},
				{
					itemid:'id_mainscene_merrygoround_bottom',
					itemtype:'merrygoround',
					headimg:'login_bg16',
					itemurlvalue:'login_bg17',
					layouttype_x:'pct',
					alignx:'left_20',
					layouttype_y:'pct',
					aligny:'top_90'
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

