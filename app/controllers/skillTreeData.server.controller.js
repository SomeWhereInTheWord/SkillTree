var mongoose = require('mongoose');
var skillTreeData = mongoose.model('SkillTreeData');

module.exports = {
	createNode : function(req, res, next){
		var newNodeConfig = JSON.parse(req.body.treeData);
		var newNode = new skillTreeData(newNodeConfig);
		newNode.save(function (err){
			if(err){
				return next(err);
			}
		});
	},
	updateNode : function(req, res, next){
		var nodeId = req.nodeId;
		var dataObj = JSON.parse(req.body.treeData);
		skillTreeData
			.findOne({'nodeId' : nodeId})
			.exec(function (err,docs){
				for(attr in dataObj){
					if(typeof dataObj[attr] != 'function' && typeof docs[attr] != 'undefined'){
						docs[attr] = dataObj[attr];
					}
					docs['lastModifiedDate'] = new Date();
					docs['lastModifiedUserId'] = req.body.userId;
					docs.save(function (err){
						if(err){
							return next(err);
						}
					});
				}
			});
	},
	deleteNode : function(req, res, next){
		var nodeId = req.nodeId;
		skillTreeData
			.findOne({'nodeId' : nodeId})
			.exec(function (err, docs){
				docs['isDelete'] = true;
				docs.save(function (err){
					if(err){
						return next(err);
					}
				});
			});
	},
	showTree : function(req, res, next){
		var treeId = req.treeId;
		skillTreeData
			.find({treeId : treeId})
			.where('isDelete').eq(false)
			.exec(function (err, data){
				if(err){
					return next(err);
				}
				return res.json({
					skillTree : req.skillTree,
					skillTreeData : data
				});
			});
	}
}