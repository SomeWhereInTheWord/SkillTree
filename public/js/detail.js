var curUrlParam = getRequestParam();
var url = '';
var type ='';
var data = {};
/*if('treeId' in curUrlParam){
	url = '/skillTree/'+curUrlParam.treeId;
	type = 'GET';
}else{
	console.log('current treeId is null');
}
var st = new SkillTree(
	{
		url:url,
		type:type,
		data:data
	});
*/
var st = new SkillTree(
	{
		url:'/skillTree/589820537973e2301ab91966',
		type:'GET',
		data:data
	});
SkillTree.init(st);