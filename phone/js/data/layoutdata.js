
game.layoutUi = new function() {
	var self = this;
	this.layoutPanelData = function(uidata, panelwidth, panelheight, scalefact, theparent) {
		var tmpposdic = {};
		panelwidth = panelwidth * scalefact;
		panelheight = panelheight * scalefact;
		for(var i = 0; i < uidata.length; i++) {
			var itemdata = uidata[i];
			if(itemdata.itemtype == 'simpletext' || itemdata.itemtype == 'texttitle'){
				var w = itemdata.w * game.scalefact;
				var h = itemdata.h * game.scalefact;
				var posxy = game.layoutUi.getItemPos(itemdata, panelwidth, panelheight, w,h, tmpposdic);
			}else{
				var imgsource = itemdata.imgsource;
				var rect = game.configdata.getPngRect(itemdata.itemurlvalue, imgsource);
				var w = rect[2] * game.scalefact;
				var h = rect[3] * game.scalefact;
				var posxy = game.layoutUi.getItemPos(itemdata, panelwidth, panelheight, w,h, tmpposdic);
			}
			var x = posxy[0];
			var y = posxy[1];
			tmpposdic[itemdata.itemid] = [x, y, w, h];
			if(itemdata.itemtype == 'simpletext') {
				theparent.items[itemdata.itemid] = game.configdata.createSimpletext(itemdata.textvalue, itemdata.font, itemdata.color, itemdata.bg, x, y,itemdata.width).addTo(theparent);
			}
			if(itemdata.itemtype == 'texttitle') {
				theparent.items[itemdata.itemid] = game.configdata.createTitletext(itemdata.textvalue, itemdata.font, itemdata.color, itemdata.bg, x, y, w).addTo(theparent);
			}
			if(itemdata.itemtype === 'bmp') {
				theparent.items[itemdata.itemid] = game.configdata.createRectImg(imgsource, itemdata.itemurlvalue, x, y, game.scalefact).addTo(theparent);
			}
			if(itemdata.itemtype === 'doublebmp') {
				theparent.items[itemdata.itemid] = game.configdata.creatDoubleImg(imgsource, itemdata.itemurlvalue, itemdata.frontimg, x, y, game.scalefact).addTo(theparent);
			}
			if(itemdata.itemtype === 'btn') {
				theparent.items[itemdata.itemid] = game.configdata.createButton('ui', itemdata.itemurlvalue, itemdata.btnup, x, y).addTo(theparent);
			}
			if(itemdata.itemtype === 'scalebtn') {
				theparent.items[itemdata.itemid] = game.configdata.createScalebutton('ui', itemdata.itemurlvalue, x + w / 2, y + h / 2).addTo(theparent);
			}
			if(itemdata.itemtype === 'selectbox') {
				theparent.items[itemdata.itemid] = game.configdata.createSelectbox(itemdata.itemurlvalue, itemdata.selectvalue, itemdata.isSelected,x, y).addTo(theparent);
			}
			if(itemdata.itemtype === 'radiobox') {
				theparent.items[itemdata.itemid] = game.configdata.createRadiotbox(itemdata.itemurlvalue, itemdata.selectvalue, x, y, itemdata.lbtext, itemdata.groupid, itemdata.ischeck, itemdata.value,theparent.items).addTo(theparent);
			}
			if(itemdata.itemtype == 'merrygoround') {
				theparent.items[itemdata.itemid] = game.configdata.createMerrygoround(itemdata.headimg, itemdata.itemurlvalue, x, y).addTo(theparent);
			}
		}
	};

	this.getItemPos = function(itemdata, panelwidth, panelheight, w,h, tmpposdic) {
		
		if(itemdata.layouttype_x === 'txt') {
			var aligntype = itemdata.alignx;
			if(aligntype === 'center') {
				aligntype = 'center_x';
			}
			var x = this.getItemTxtPos(aligntype, itemdata.itemurlvalue, panelwidth, panelheight, w,h);
		}
		if(itemdata.layouttype_y === 'txt') {
			aligntype = itemdata.aligny;
			if(aligntype === 'center') {
				aligntype = 'center_y';
			}
			var y = this.getItemTxtPos(aligntype, itemdata.itemurlvalue, panelwidth, panelheight, w,h);
		}
		if(itemdata.layouttype_x === 'pct') {
			var aligntype = itemdata.alignx;
			var tm = aligntype.split('_');
			var value = parseFloat(tm[1]);
			if(tm[0] === 'center') {
				aligntype = 'center_x';
			} else {
				aligntype = tm[0];
			}
			var x = this.getItemPctPos(aligntype, value, itemdata.itemurlvalue, panelwidth, panelheight, w,h);
		}
		if(itemdata.layouttype_y === 'pct') {
			aligntype = itemdata.aligny;
			var tm = aligntype.split('_');
			var value = parseFloat(tm[1]);
			if(tm[0] === 'center') {
				aligntype = 'center_y';
			} else {
				aligntype = tm[0];
			}
			var y = this.getItemPctPos(aligntype, value, itemdata.itemurlvalue, panelwidth, panelheight, w,h);
		}
		if(itemdata.layouttype_x === 'follow') {
			var aligntype = itemdata.alignx;
			var tm = aligntype.split('&');
			var targetItemid = tm[0];
			var value = parseFloat(tm[1]);
			var x = this.getItemFollowPos(targetItemid, value, 'horizontal', tmpposdic);
		}
		if(itemdata.layouttype_y === 'follow') {
			var aligntype = itemdata.aligny;
			var tm = aligntype.split('&');
			var targetItemid = tm[0];
			var value = parseFloat(tm[1]);
			var y = this.getItemFollowPos(targetItemid, value, 'vertical', tmpposdic);
		}
		return [x, y];
	};

	this.getItemPctPos = function(relativepos, pctvalue, namevalue, panelwidth, panelheight, w,h) {
		var result = 0;
		var dis = 0;
		switch(relativepos) {
			case 'center_x':
				if(pctvalue > 0) {
					dis = (panelwidth / 100.0) * pctvalue;
				} else {
					dis = (panelwidth / 100.0) * pctvalue - w;
				}
				result = panelwidth / 2 + dis;
				break;
			case 'center_y':
				if(pctvalue > 0) {
					dis = (panelheight / 100.0) * pctvalue;
				} else {
					dis = (panelheight / 100.0) * pctvalue - h;
				}
				result = panelheight / 2 + dis;
				break;
			case 'top':
				result = (panelheight / 100.0) * pctvalue;
				break;
			case 'bottom':
				result = panelheight - (panelheight / 100.0) * pctvalue - h;
				break;
			case 'left':
				result = (panelwidth / 100.0) * pctvalue;
				break;
			case 'right':
				result = panelwidth - (panelwidth / 100.0) * pctvalue - w;
				break;
		}
		return result;
	};

	this.getItemTxtPos = function(txtvalue, namevalue, panelwidth, panelheight, w,h) {
		var result = 0;
		switch(txtvalue) {
			case 'center_x':
				result = Math.floor((panelwidth - w) / 2.0);
				break;
			case 'center_y':
				result = Math.floor((panelheight - h) / 2.0);
				break;
			case 'bottom':
				result = panelheight - h;
				break;
			case 'top':
				result = 0;
				break;
			case 'left':
				result = 0;
				break;
			case 'right':
				result = panelwidth - w;
				break;
		}
		return result;
	};

	this.getItemFollowPos = function(itemid, followvalue, directtype, tmpposDic) {
		var referenceX = tmpposDic[itemid][0];
		var referenceY = tmpposDic[itemid][1];
		switch(directtype) {
			case 'vertical':
				result = referenceY + followvalue;
				break;
			case 'horizontal':
				result = referenceX + followvalue;
				break;
		}
		return result;
	};

	this.drawStepLine = function(panelwidth, panelheight, panel, scalefact) {
		if(game.configdata.NOLINE) {
			if(!scalefact) {
				scalefact = 1.0;
			}
			var w = panelwidth / 4 * scalefact;
			var h = panelheight / 4 * scalefact;
			for(var i = 0; i < 16; i++) {
				var x = i % 4 * w;
				var y = Math.floor(i / 4) * h;
				this.drawLine(x, y, w, h, panel);
			}
		}
	};

	this.drawLine = function(initx, inity, w, h, panel) {
		for(var i = 0; i < 4; i++) {
			game.drawdata.drawItemRect(1, 'white', 'rgba(0,0,0,0)', initx + i % 2 * w / 2, inity + Math.floor(i / 2) * h / 2, w / 2, h / 2, panel);
		}
	};
}

