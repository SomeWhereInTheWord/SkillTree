var skillTreeContoller = require('../controllers/skillTree.server.controller');
var skillTreeDataController = require('../controllers/skillTreeData.server.controller');

module.exports = function(app){
	app.route('/skillTree')
		.get(skillTreeContoller.list);
	app.route('/skillTree/new')
		.post(skillTreeContoller.create);
	app.route('/skillTree/:treeId')
		.get(skillTreeDataController.showTree);
	
	app.param('treeId',skillTreeContoller.getById);
	console.log('load skillTree route');
}