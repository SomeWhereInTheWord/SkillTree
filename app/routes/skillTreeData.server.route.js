var skillTreeDataController = require('../controllers/skillTreeData.server.controller');
var skillTreeController = require('../controllers/skillTree.server.controller');

module.exports = function(app){
	app.route('/skillTreeData/showTree/:treeid')
		.get(skillTreeDataController.showTree);

	app.param('treeid',skillTreeController.getById);

	app.route('/skillTreeData/new')
		.post(skillTreeDataController.createNode);

	app.route('/skillTreeData/update')
		.post(skillTreeDataController.updateNode);
		
	app.route('/skillTreeData/delete')
		.post(skillTreeDataController.deleteNode);
	console.log('load skillTreeData route');
} 