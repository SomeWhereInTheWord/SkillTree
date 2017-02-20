/**
 * SkillTree类库
 * 
 * FUNCTION:对接node.js后台和jsMind前台框架的适配器
 * 由于mongodb中的文档结构和jsMind要求的格式不一致，故需要SkillTree进行转换。
 *
 * VERSION:0.1
 *
 * QUESTION:现在SkillTree中还有一些功能类似于工具类的方法，挂在SkillTree根对象下。
 * 以后把这些方法都分离掉。
 *
 * TEST:
 * var st = new SkillTree({url:'url',type:'type'data:'data'});
 * SkillTree.init(st);
 */
var _jm = null;
function SkillTree (initParam){
	this.initParam = initParam || {};
};
SkillTree.TreeDBId = null;
SkillTree.userId = null;

/**
 * 初始化方法
 * @return null [description]
 */
SkillTree.init = function (st){
	if('url' in st.initParam && 'type' in st.initParam && 'data' in st.initParam){
		SkillTree._getDB_Obj(st.initParam.url, st.initParam.type, st.initParam.data);
	}else{
		console.log('error occured! initParam is illegal!');
	}
};

/**
 * 说明：
 * 在jsmind.js中，有
 * jm.event_type = {show:1,resize:2,edit:3,select:4};
 * 所以新增，修改，删除，拖动节点都归为edit事件
 * 具体区分新增，修改，删除，拖动事件用一个object的Evt属性
 * Evt具体取值：'add_node','update_node','remove_node','move_node'
 * 
 * 处理节点变更事件的方法
 * @return {[type]} [description]
 */
SkillTree.handleEditEvent = function (){
	_jm.add_event_listener(function (type, data){
		//edit事件时
		if(type == 3 && 'evt' in data){
			if(data['evt'] == 'add_node'){
				SkillTree.addNode("/skillTreeData/new","POST");
			}else if(data['evt'] == 'update_node'){
				SkillTree.updateNode("/skillTreeData/update","POST");
			}else if(data['evt'] == 'move_node'){
				SkillTree.updateNode("/skillTreeData/update","POST");
			}else if(data['evt'] == 'remove_node'){
				SkillTree.deleteNode("/skillTreeData/delete","POST");
			}
		}
	});
}

/**
 * 获取数据库的数据
 * @param  String url  [description]
 * @param  String type [description]
 * @param  String data [description]
 * @return null      [description]
 */
SkillTree._getDB_Obj = function (url, type, data){
	var successHandler = function(data){
		var treeDataObj = SkillTree._parseDB_Obj(data);
		var treeConfObj = SkillTree._createTreeConfig(data);
		if(treeDataObj != null && treeConfObj != null){
			_jm = jsMind.show(treeConfObj,treeDataObj);
			SkillTree.handleEditEvent();
		}else{
			console.log('error occured!');
		}
	} 
	var errorHandler = function(err){
		console.log('error occured!');
	}
	jsMind.util.ajax.request(url, data, type, successHandler, errorHandler);
}

/**
 * 解析数据库对象，并组装树的数据实体
 * @param  {[type]} DB_Obj [description]
 * @return {[type]}        [description]
 */
SkillTree._parseDB_Obj = function (DB_Obj){
	if('skillTree' in DB_Obj && 'skillTreeData' in DB_Obj){
		var skillTree = DB_Obj['skillTree'];
		SkillTree.TreeDBId = skillTree._id;
		SkillTree.userId = skillTree.userId;
		var skillTreeData = DB_Obj['skillTreeData'];
		if(Object.prototype.toString.call(skillTreeData) == '[object Array]'){
			var jsMindDataObj = skillTreeData.map(function (item, index, array){
				var NodeObj = {
					id : item.nodeId,
					parentid : item.parentNodeId,
					topic : item.topic,
					isroot : item.isRoot,
					direction : item.direction,
					"background-color" : item['backgroundColor'],
					"foreground-color" : item['foregroundColor']
				}
				if(NodeObj.isroot == true){
					delete NodeObj.parentId;
				}else if(NodeObj.isroot == false){
					delete NodeObj.isroot;
				}
				return NodeObj;
			});
			var JSTreeObj = {
				meta : {
					name : skillTree.treeName,
					author : skillTree.userId,
					version : skillTree.version
				},
				format : skillTree.format,
				data: jsMindDataObj
			};
			return JSTreeObj;
		}
	}
	return null;
}

/**
 * 创建树的配置实体
 * @param  {[type]} DB_Obj [description]
 * @return {[type]}        [description]
 */
SkillTree._createTreeConfig = function (DB_Obj){
	if('skillTree' in DB_Obj){
		if(Object.prototype.toString.call(DB_Obj.skillTreeData) == '[object Array]'){
			var skillTree = DB_Obj['skillTree'];
			var options = {
				container:skillTree.container,
		        editable:skillTree.editable,
		        theme:skillTree.theme,
		        shortcut:{
		            handles:{
		                test:function(j,e){
		                    console.log(j);
		                }
		            },
		            mapping:{
		                test:89
		            }
		        }
			};
			return options
		}
	}
	return null;
}

/**
 * 添加节点
 * @param {[type]} url  [description]
 * @param {[type]} type [description]
 */
SkillTree.addNode = function(url, type){
	var selected_node = _jm.get_selected_node(); // as parent of new node
    if(!selected_node){
    	console.log('please select a node first.');
    }
    var nodeid = jsMind.util.uuid.newid();
    var topic = '* Node_'+nodeid.substr(0,5)+' *';
    var addedNode = _jm.add_node(selected_node, nodeid, topic);
    SkillTree._addNode2DB(url, type, addedNode);
}

/**
 * 修改节点
 * @param  {[type]} url  [description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
SkillTree.updateNode = function(url, type){
	var selected_node = _jm.get_selected_node(); // as parent of new node
    if(!selected_node){
    	console.log('please select a node first.');
    }
    SkillTree._addNode2DB(url, type, selected_node);
}

/**
 * 删除节点
 * @param  {[type]} url  [description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
SkillTree.deleteNode = function(url, type){
	var selected_id = get_selected_nodeid();
    if(!selected_id){
    	console.log('please select a node first.');
    }

    _jm.remove_node(selected_id);
    SkillTree._addNode2DB(url, type, selected_node);
}

/**
 * 将树节点入库
 * @param {[type]} url      [description]
 * @param {[type]} type     [description]
 * @param {[type]} treeNode [description]
 */
SkillTree._addNode2DB = function(url, type, treeNode){
	var DBDataObj = SkillTree._convert2DBTreeDataObj(treeNode);
	//var urlParam = SKillTree.urlEncode(DBDataObj);
	var jsonParam = JSON.stringify({userId : 'wl',treeData:DBDataObj});
	jsMind.util.ajax.request(url, jsonParam, type, function(data){
		console.log('insert success!');
	}, function(data){
		console.log('error occured when insert node!');
	});
}

/**
 * 将JS对象转为数据库实体
 * @param  {[type]} treeNode [description]
 * @return {[type]}          [description]
 */
SkillTree._convert2DBTreeDataObj = function (treeNode){
	var node_array = _jm.get_data('node_array');
	var levelNum = SkillTree._getNodeLevel(node_array, treeNode);
	var DBDataObj = {
		treeId : SkillTree.TreeDBId,
		nodeId : treeNode.id,
		topic : treeNode.topic,
		type : treeNode.type || 'text',
		direction : treeNode.direction || 'right',
		parentNodeId : treeNode.parentid || '',
		isRoot : treeNode.isRoot || false,
		level : levelNum,
		backgroundColor : treeNode['background-color'] || '',
		foregroundColor : treeNode['foreground-color'] || 'white',
		createUserId : SkillTree.userId
	}
	return DBDataObj;
}

/**
 * 获得节点的级别
 * @param  {[type]} nodeArray  [description]
 * @param  {[type]} SelectNode [description]
 * @return {[type]}            [description]
 */
SkillTree._getNodeLevel = function (nodeArray, SelectNode){
	var levelNum = 1;
	var needContinue = true;
	
	if(Object.prototype.toString.call(nodeArray) == '[object Array]'){
		var getParentNode = function(item, index, nodeArray){
			if(item.id == SelectNode.parentid){
				if(item.isroot != true){
					levelNum += 1;
				}else{
					needContinue = false;
				}
				return item;
			}
		}
		var curParentNode = nodeArray.filter(getParentNode);
		while(needContinue){
			curParentNode = curParentNode.filter(getParentNode);
		}
		return levelNum;
	}
}

/**
 * param 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 * 
 * return URL参数字符串
 */
SkillTree.urlEncode = function (param, key, encode){
	if(param == null){
		return '';
	}
	var paramStr = '';
	var t = typeof(param);
	if(t == 'string' || t == 'number' || t == boolean){
		paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
	}else{
		for(var i in param){
			var k = (key == null) ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
			paramStr += urlEncode(param[i], k, encode);
		}
	}
	return paramStr;
	/**
	 * test
	 */
	//var obj={name:'tom','class':{className:'class1'},classMates:[{name:'lily'}]};
	//console.log(urlEncode(obj));
	//output: &name=tom&class.className=class1&classMates[0].name=lily
	//console.log(urlEncode(obj,'stu'));
	//output: &stu.name=tom&stu.class.className=class1&stu.classMates[0].name=lily
}

