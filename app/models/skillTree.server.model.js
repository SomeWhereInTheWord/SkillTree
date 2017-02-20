var mongoose = require('mongoose');

var SkillTreeSchema = new mongoose.Schema({
	treeName : String,
	userId : String,
	version : String,
	format : String, //possible value:node_tree,node_array
	container : String, //页面中div的name
	editable : Boolean, //节点是否可编辑
	theme : String, //节点的主题
	createDate : {type : Date, default : Date.now},
	lastModifiedDate : Date,
	createUserId : String,
	lastModifiedUserId : String,
	isDelete : Boolean
});
/**
 * mongoose.model('User', UserSchema);
 * mongoose在内部创建collection时将我们传递的collection名小写化，
 * 同时如果小写化的名称后面没有字母——s,则会在其后面添加一s,针对我们刚建的collection,则会命名为：users。
 * 可以通过下面两种方式更改collection的名字：
	1.xxschema = new Schema({…}, {collection: 'your collection name'});
	2.mongoose.model('User', UserSchema, 'your collection name');
 */
var skillTree = mongoose.model('SkillTree', SkillTreeSchema, 'SkillTree');