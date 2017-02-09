var skillNums = 7;
var lockConfigdata =
[
    {
        "category": "EQUIP", 
        "index": "0", 
        "description": "生命保护粉红色剑柄", 
        "price": "10", 
        "remark ": "武器", 
        "skilltype": "0", 
        "skillid": "1000", 
        "thumbnail": "small_icon005", 
        "name": "生命保护"
    }, 
    {
        "category": "EQUIP", 
        "index": "1", 
        "description": "魔法保护红色剑柄", 
        "price": "15", 
        "remark ": "武器", 
        "skilltype": "0", 
        "skillid": "1001", 
        "thumbnail": "small_icon074", 
        "name": "魔法保护"
    }, 
    {
        "category": "EQUIP", 
        "index": "2", 
        "description": "迅猛出击蓝色断剑", 
        "price": "25", 
        "remark ": "武器", 
        "skilltype": "0", 
        "skillid": "1002", 
        "thumbnail": "small_icon075", 
        "name": "迅猛出击"
    }, 
    {
        "category": "EQUIP", 
        "index": "3", 
        "description": "宽斜刀", 
        "price": "50", 
        "remark ": "武器", 
        "skilltype": "0", 
        "skillid": "1003", 
        "thumbnail": "small_icon039", 
        "name": "铁血之心"
    }, 
    {
        "category": "EQUIP", 
        "index": "4", 
        "description": "双弯角头盔", 
        "price": "15", 
        "remark ": "护甲", 
        "skilltype": "0", 
        "skillid": "1004", 
        "thumbnail": "small_icon010", 
        "name": "圣剑出击"
    }, 
    {
        "category": "EQUIP", 
        "index": "5", 
        "description": "绿色铠甲", 
        "price": "30", 
        "remark ": "护甲", 
        "skilltype": "0", 
        "skillid": "1005", 
        "thumbnail": "small_icon081", 
        "name": "堪培拉的保护"
    }, 
    {
        "category": "EQUIP", 
        "index": "6", 
        "description": "褐色内甲", 
        "price": "20", 
        "remark ": "护甲", 
        "skilltype": "0", 
        "skillid": "1006", 
        "thumbnail": "small_icon067", 
        "name": "皮卡丘"
    }, 
    {
        "category": "EQUIP", 
        "index": "7", 
        "description": "红色指环", 
        "price": "25", 
        "remark ": "饰品", 
        "skilltype": "1", 
        "skillid": "1007", 
        "thumbnail": "small_icon007", 
        "name": "红指环之恋"
    }, 
    {
        "category": "EQUIP", 
        "index": "8", 
        "description": "蓝色指环", 
        "price": "25", 
        "remark ": "饰品", 
        "skilltype": "1", 
        "skillid": "1008", 
        "thumbnail": "small_icon006", 
        "name": "蓝指环之恋"
    }, 
    {
        "category": "EQUIP", 
        "index": "9", 
        "description": "红色符文", 
        "price": "40", 
        "remark ": "饰品", 
        "skilltype": "1", 
        "skillid": "1009", 
        "thumbnail": "small_icon011", 
        "name": "符文之恋"
    }, 
    {
        "category": "ITEM", 
        "index": "10", 
        "description": "恢复2点生命", 
        "price": "10", 
        "remark ": "生命恢复剂", 
        "skilltype": "1", 
        "skillid": "1010", 
        "thumbnail": "small_icon001", 
        "name": "调制药水"
    }, 
    {
        "category": "ITEM", 
        "index": "11", 
        "description": "恢复5点生命", 
        "price": "50", 
        "remark ": "生命恢复剂", 
        "skilltype": "1", 
        "skillid": "1011", 
        "thumbnail": "small_icon016", 
        "name": "调制恢复剂"
    }, 
    {
        "category": "ITEM", 
        "index": "12", 
        "description": "恢复1点魔法", 
        "price": "10", 
        "remark ": "魔法恢复剂", 
        "skilltype": "1", 
        "skillid": "1012", 
        "thumbnail": "small_icon002", 
        "name": "卡卡魔药"
    }, 
    {
        "category": "ITEM", 
        "index": "13", 
        "description": "恢复5点魔法", 
        "price": "50", 
        "remark ": "魔法恢复剂", 
        "skilltype": "1", 
        "skillid": "1013", 
        "thumbnail": "small_icon040", 
        "name": "大卡卡魔药"
    }, 
    {
        "category": "ITEM", 
        "index": "14", 
        "description": "生命恢复剂", 
        "price": "25", 
        "remark ": "魔法恢复剂", 
        "skilltype": "2", 
        "skillid": "1014", 
        "thumbnail": "small_icon030", 
        "name": "痛苦之源"
    }, 
    {
        "category": "ITEM", 
        "index": "15", 
        "description": "旋风攻击生命恢复剂", 
        "price": "40", 
        "remark ": "魔法恢复剂", 
        "skilltype": "2", 
        "skillid": "1015", 
        "thumbnail": "small_icon031", 
        "name": "旋风攻击"
    }, 
    {
        "category": "ITEM", 
        "index": "16", 
        "description": "魔法恢复剂", 
        "price": "10", 
        "remark ": "魔法恢复剂", 
        "skilltype": "2", 
        "skillid": "1016", 
        "thumbnail": "small_icon032", 
        "name": "复活"
    }, 
    {
        "category": "ITEM", 
        "index": "17", 
        "description": "魔法免疫", 
        "price": "50", 
        "remark ": "魔法恢复剂", 
        "skilltype": "2", 
        "skillid": "1017", 
        "thumbnail": "small_icon033", 
        "name": "无视僵尸"
    }, 
    {
        "category": "ITEM", 
        "index": "18", 
        "description": "毒药恢复剂", 
        "price": "10", 
        "remark ": "魔法恢复剂", 
        "skilltype": "2", 
        "skillid": "1018", 
        "thumbnail": "small_icon034", 
        "name": "毒药免疫"
    }, 
    {
        "category": "ITEM", 
        "index": "19", 
        "description": "落石免疫魔法恢复剂", 
        "price": "50", 
        "remark ": "魔法恢复剂", 
        "skilltype": "2", 
        "skillid": "1019", 
        "thumbnail": "small_icon035", 
        "name": "落石免疫"
    }, 
    {
        "category": "ITEM", 
        "index": "20", 
        "description": "增加暴击概率", 
        "price": "122", 
        "remark ": "魔法恢复剂", 
        "skilltype": "2", 
        "skillid": "1020", 
        "thumbnail": "small_icon036", 
        "name": "终极闪电"
    }
];



function clearData(){
	var storedata = game.userData.heroData.storedata;
	for(var i=0;i<storedata.length;i++){
		if(storedata[i] == -1){
			storedata.splice(i,1);
		}
	}
}

var shopdata =[
    {
        "itemid": "1001", 
        "index": "0", 
        "shoptype": "0", 
        "name": "风灵剑", 
        "img": "prop_icon_007", 
        "price": "10", 
        "remark ": "武器", 
        "category": "EQUIP", 
        "thumbnail": "small_icon005", 
        "description": "粉红色剑柄"
    }, 
    {
        "itemid": "1002", 
        "index": "1", 
        "shoptype": "0", 
        "name": "赤灵剑", 
        "img": "prop_icon_008", 
        "price": "1500", 
        "remark ": "武器", 
        "category": "EQUIP", 
        "thumbnail": "small_icon074", 
        "description": "红色剑柄"
    }, 
    {
        "itemid": "1003", 
        "index": "2", 
        "shoptype": "0", 
        "name": "断剑", 
        "img": "prop_icon_009", 
        "price": "250000", 
        "remark ": "武器", 
        "category": "EQUIP", 
        "thumbnail": "small_icon075", 
        "description": "蓝色断剑"
    }, 
    {
        "itemid": "1004", 
        "index": "3", 
        "shoptype": "0", 
        "name": "斜刀", 
        "img": "prop_icon_021", 
        "price": "50", 
        "remark ": "武器", 
        "category": "EQUIP", 
        "thumbnail": "small_icon039", 
        "description": "宽斜刀"
    }, 
    {
        "itemid": "1005", 
        "index": "4", 
        "shoptype": "1", 
        "name": "双角盔", 
        "img": "prop_icon_014", 
        "price": "15", 
        "remark ": "护甲", 
        "category": "EQUIP", 
        "thumbnail": "small_icon010", 
        "description": "双弯角头盔"
    }, 
    {
        "itemid": "1006", 
        "index": "5", 
        "shoptype": "1", 
        "name": "绿宝甲", 
        "img": "prop_icon_073", 
        "price": "30", 
        "remark ": "护甲", 
        "category": "EQUIP", 
        "thumbnail": "small_icon081", 
        "description": "绿色铠甲"
    }, 
    {
        "itemid": "1007", 
        "index": "6", 
        "shoptype": "1", 
        "name": "内甲", 
        "img": "prop_icon_074", 
        "price": "20", 
        "remark ": "护甲", 
        "category": "EQUIP", 
        "thumbnail": "small_icon067", 
        "description": "褐色内甲"
    }, 
    {
        "itemid": "1008", 
        "index": "7", 
        "shoptype": "2", 
        "name": "红指环", 
        "img": "prop_icon_010", 
        "price": "25", 
        "remark ": "饰品", 
        "category": "EQUIP", 
        "thumbnail": "small_icon007", 
        "description": "红色指环"
    }, 
    {
        "itemid": "1009", 
        "index": "8", 
        "shoptype": "2", 
        "name": "蓝指环", 
        "img": "prop_icon_011", 
        "price": "25", 
        "remark ": "饰品", 
        "category": "EQUIP", 
        "thumbnail": "small_icon006", 
        "description": "蓝色指环"
    }, 
    {
        "itemid": "1010", 
        "index": "9", 
        "shoptype": "2", 
        "name": "符文", 
        "img": "prop_icon_018", 
        "price": "40", 
        "remark ": "饰品", 
        "category": "EQUIP", 
        "thumbnail": "small_icon011", 
        "description": "红色符文"
    }, 
    {
        "itemid": "1011", 
        "index": "10", 
        "shoptype": "3", 
        "name": "普通药水", 
        "img": "prop_icon_002", 
        "price": "10", 
        "remark ": "生命恢复剂", 
        "category": "ITEM", 
        "thumbnail": "small_icon001", 
        "description": "恢复2点生命"
    }, 
    {
        "itemid": "1012", 
        "index": "11", 
        "shoptype": "3", 
        "name": "大瓶恢复剂", 
        "img": "prop_icon_087", 
        "price": "50", 
        "remark ": "生命恢复剂", 
        "category": "ITEM", 
        "thumbnail": "small_icon016", 
        "description": "恢复5点生命"
    }, 
    {
        "itemid": "1013", 
        "index": "12", 
        "shoptype": "3", 
        "name": "普通魔药", 
        "img": "prop_icon_003", 
        "price": "10", 
        "remark ": "魔法恢复剂", 
        "category": "ITEM", 
        "thumbnail": "small_icon002", 
        "description": "恢复1点魔法"
    }, 
    {
        "itemid": "1014", 
        "index": "13", 
        "shoptype": "3", 
        "name": "大瓶魔药", 
        "img": "prop_icon_042", 
        "price": "50", 
        "remark ": "魔法恢复剂", 
        "category": "ITEM", 
        "thumbnail": "small_icon040", 
        "description": "恢复5点魔法"
    }
];

