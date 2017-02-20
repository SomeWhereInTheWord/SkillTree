var mongoose = require('mongoose');
var skillTree = mongoose.model('SkillTree');

module.exports = {
	/**
	 * 新增一个技能树
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	create : function(req, res, next){
		var newSkillTree = new skillTree(req.body);
		newSkillTree.save(function (err){
			if(err){
				return next(err);
			}
			return res.json(newSkillTree);
		});
	},
	/**
	 * 获取所有技能树
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	list : function(req, res, next){
		var pageSize = parseInt(req.query.pagesize, 10) || 10;
		var pagestart = parseInt(req.query.pagestart, 10) || 1;
		skillTree
			.find()
			.skip((pagestart - 1) * pageSize)
			.limit(pageSize)
			.exec(function (err, data){
				//console.log(data);
				if(err){
					next(err);
				}
				return res.json(data);
			});
	},
	get : function(req, res, next){
		return res.json(req.skillTree);
	},
	/**
	 * 通过Id查询技能树
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @param  {[type]}   id   [description]
	 * @return {[type]}        [description]
	 */
	getById : function(req, res, next ,id){
		if(!id){
			return next(new Error('Skill Tree Id Not Found!'));
		}
		var sid = '';
		if(mongoose.Types.ObjectId.isValid(id)){
			sid = mongoose.Types.ObjectId(id);
		}else{
			return next(new Error('Skill Tree Id id invalid'));
		}
		//console.log(sid);
		skillTree
			.findOne({_id:sid})
			.exec(function (err, data){
				if(err){
					return next(err);
				}
				if(!data){
					return next(new Error('Skill Tree Data Not Found!'));
				}
				req.skillTree = data;
				req.treeId = sid;
				//console.log(req.treeId);
				return next();
			});
	}

}