var mongoose = require('mongoose');

var SkillTreeDataSchema = new mongoose.Schema({
	treeId : String,//所属树Id
	nodeId : String,//节点Id
	topic : String,//节点的内容
	type : String,//节点类型 text
	direction : String,
	parentNodeId : String,
	isRoot : Boolean,
	level : Number,
	backgroundColor : String,
	foregroundColor : String,
	createDate : {type : Date, default : Date.now},
	lastModifiedDate : Date,
	createUserId : String,
	lastModifiedUserId : String,
	isDelete : Boolean
});

var skillTreeData = mongoose.model('SkillTreeData',SkillTreeDataSchema, 'SkillTreeData');