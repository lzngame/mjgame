 (function(ns) {
 	//数字键盘面板  3×4 布局
	var NumbersKeyPanel = ns.NumbersKeyPanel = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'NumbersKeyPanel',
		imgsource:null,
		btnupimg:null,
		btndownimg:null,
		btns:null,
		hspace:5,
		vspace:2,
		btnhandle:null,
		
		constructor: function(properties) {
			NumbersKeyPanel.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var rect = game.configdata.getPngRect(this.btnupimg,this.imgsource);
			this.width = rect[2] * 3 + this.hspace * 2;
			this.height =rect[3] * 4 + this.vspace * 3;
			game.drawdata.drawItemRect(1,'black','red',0,0,this.width,this.height,this);
			
			for(var i=0;i<this.btns.length;i++){
				var item = this.btns[i];
				var btn = new game.IconButton({
					imgsource:this.imgsource,
					btnupimg:this.btnupimg,
					btndownimg:this.btndownimg,
					iconimg:item[0],
					buttondata:item[1],
					x:(i%3)* (rect[2]+this.hspace),
					y:Math.floor(i/3)*(rect[3]+this.vspace),
					handler:this.btnhandle,
				}).addTo(this);
			}
		},
		
		onUpdate:function(){
			
		},
	});
	
	//数字面板  1×6 布局
	var NumbersPanel = ns.NumbersPanel = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'NumbersPanel',
		numcount:6,
		currentindex:-1,
		nums:null,
		hspace:5,
		imgsource:null,
		bgimg:null,
		numsimglist:null,
		
		constructor: function(properties) {
			NumbersPanel.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var rect = game.configdata.getPngRect(this.bgimg,this.imgsource);
			this.width = rect[2] * this.numcount + this.hspace * (this.numcount-1);
			this.height =rect[3];
			this.nums = [];
			for(var i=0;i<this.numcount;i++){
				var num = new game.IconNumber({
					imgsource:this.imgsource,
					x:i * (rect[2]+this.hspace),
					bgimg:this.bgimg,
					numsimglist:this.numsimglist
			    }).addTo(this);
			    this.nums.push(num);
			}
			console.log('----------------------');
			console.log(this.nums.length);
			console.log('----------------------');
		},
		clearAll:function(){
			for(var i=0;i<this.nums.length;i++){
				this.nums[i].clear();
			}
			this.currentindex = -1;
		},
		addNum:function(n){
			if(this.currentindex >= this.nums.length -1){
				
			}else{
				this.currentindex ++;
				this.nums[this.currentindex].setNum(n);
			}
		},
		delNum:function(){
			if(this.currentindex == -1){
				
			}else{
				this.nums[this.currentindex].clear();
				this.currentindex--;
			}
		},
		getNumsValue:function(){
			var result = '';
			for(var i=0;i<this.nums.length;i++){
				result += this.nums[i].defaultvalue.toString();
			}
			return result;
		},
		onUpdate:function(){
			
		},
	});
	
	//复合上面两个组件 组成的面板，可以操作
	var InputNumpanel = ns.InputNumpanel = Hilo.Class.create({
		Extends: Hilo.Container,
		name:'InputNumpanel',
		numpanel:null,
		inputpanel:null,
		vspace:5,
		numcount:6,
		inceptHandle:null,
		constructor: function(properties) {
			InputNumpanel.superclass.constructor.call(this, properties);
			this.init(properties);
		},
		init: function(properties) {
			var btns = [
			['login_bg53',1],['login_bg54',2],['login_bg55',3],
			['login_bg56',4],['login_bg57',5],['login_bg58',6],
			['login_bg59',7],['login_bg60',8],['login_bg61',9],
			['login_bg51',100],['login_bg62',0],['login_bg52',200],
				];
			this.numpanel = new game.NumbersPanel({
				imgsource:'ui',
				numcount:this.numcount,
				bgimg:'login_bg48',
				numsimglist:['whiteNum0','whiteNum1','whiteNum2','whiteNum3','whiteNum4','whiteNum5','whiteNum6','whiteNum7','whiteNum8','whiteNum9'],
			}).addTo(this);
			this.inputpanel = new game.NumbersKeyPanel({
				imgsource:'ui',
				btnupimg:'login_bg49',
				btndownimg:'login_bg50',
				btns:btns,
				btnhandle:this.inputSingleNum,
				y:this.vspace+this.numpanel.height,
				
			}).addTo(this);
			if(this.inputpanel.width > this.numpanel.width){
				this.width = this.inputpanel.width;
			}else{
				this.width = this.numpanel.width;
			}
			this.height = this.inputpanel.height + this.vspace +this.numpanel.height;
			this.inputpanel.x = (this.width - this.inputpanel.width)/2;
			this.numpanel.x = (this.width - this.numpanel.width)/2;
		},
		inputSingleNum:function(n){
			var panel = this.parent.parent;
			if(n == 200){
				panel.numpanel.delNum();
			}else if(n == 100){
				panel.numpanel.clearAll();
			}else{
				panel.numpanel.addNum(n);
			}
			panel.inceptHandle(panel.numpanel.getNumsValue());
		},
		
		onUpdate:function(){
			
		},
	});
	
})(window.game);