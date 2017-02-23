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
					itemurlvalue:'login_bg',
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
					itemurlvalue:'login_1',
					btnup:'login_2',
					layouttype_x:'txt',
					alignx:'center',
					layouttype_y:'pct',
					aligny:'top_62'
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
					itemtype:'scalebtn',
					itemurlvalue:'tuiguang15',
					btnup:'tuiguang15',
					layouttype_x:'pct',
					alignx:'right_34',
					layouttype_y:'pct',
					aligny:'top_8'
				},
				{
					itemid:'id_mainscene_share_btn',
					itemtype:'scalebtn',
					itemurlvalue:'1',
					layouttype_x:'pct',
					alignx:'right_26',
					layouttype_y:'pct',
					aligny:'top_8'
				},
				{
					itemid:'id_mainscene_score_btn',
					itemtype:'scalebtn',
					itemurlvalue:'login_bg14',
					layouttype_x:'pct',
					alignx:'right_18',
					layouttype_y:'pct',
					aligny:'top_8'
				},
				{
					itemid:'id_mainscene_help_btn',
					itemtype:'scalebtn',
					itemurlvalue:'login_bg14',
					layouttype_x:'pct',
					alignx:'right_10',
					layouttype_y:'pct',
					aligny:'top_8'
				},
				{
					itemid:'id_mainscene_setting_btn',
					itemtype:'scalebtn',
					itemurlvalue:'login_bg14',
					layouttype_x:'pct',
					alignx:'right_2',
					layouttype_y:'pct',
					aligny:'top_8'
				},
				{
					itemid:'id_mainscene_createroom_btn',
					itemtype:'scalebtn',
					itemurlvalue:'5',
					layouttype_x:'pct',
					alignx:'left_45',
					layouttype_y:'pct',
					aligny:'top_50'
				},
				{
					itemid:'id_mainscene_enterroom_btn',
					itemtype:'scalebtn',
					itemurlvalue:'6',
					layouttype_x:'pct',
					alignx:'left_80',
					layouttype_y:'pct',
					aligny:'top_50'
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
			],
			//---------- 2：分享按钮弹出窗口  朋友圈分享按钮  微信分享按钮
			[
				{
					itemid:'id_shareweixin_btn',
					itemtype:'scalebtn',
					itemurlvalue:'fenxiang2',
					btnup:'fenxiang2',
					layouttype_x:'pct',
					alignx:'left_38',
					layouttype_y:'pct',
					aligny:'top_45'
				},
				{
					itemid:'id_shareweixin_text',
					itemtype:'texttitle',
					itemurlvalue:'fenxiang2',
					textvalue:'微信',
					color:'#333333',
					font:'16px 黑体',
					bg:'rgba(0,0,0,0)',
					layouttype_x:'pct',
					alignx:'left_38',
					layouttype_y:'pct',
					aligny:'bottom_55'
				},
				{
					itemid:'id_sharepenyouquan_btn',
					itemtype:'scalebtn',
					itemurlvalue:'fenxiang3',
					btnup:'fenxiang3',
					layouttype_x:'pct',
					alignx:'left_63',
					layouttype_y:'pct',
					aligny:'top_45'
				},
				{
					itemid:'id_shareweixin_text',
					itemtype:'texttitle',
					itemurlvalue:'fenxiang2',
					textvalue:'朋友圈',
					color:'#333333',
					font:'16px 黑体',
					bg:'rgba(0,0,0,0)',
					layouttype_x:'pct',
					alignx:'left_63',
					layouttype_y:'pct',
					aligny:'bottom_55'
				},
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

