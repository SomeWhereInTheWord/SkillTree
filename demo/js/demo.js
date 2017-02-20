var _jm = null;
function load_jsmind(){
    var mind = {
        meta:{
            name:'demo',
            author:'wangle@163.com',
            version:'1.0'
        },
        format:'node_array',
        data:[
            {"id":"Node1", "parentid":"root", "topic":"JavaScript原型"},
            {"id":"node11", "parentid":"Node1", "topic":"ECMAScript5"},
            {"id":"root", "isroot":true, "topic":"JavaScript技术栈"},


           

            {"id":"Node2", "parentid":"root", "topic":"JavaScript原理"},
            {"id":"Node21", "parentid":"Node2", "topic":"原型(Prototype)"},
            {"id":"Node22", "parentid":"Node2", "topic":"原型继承"},
            {"id":"Node23", "parentid":"Node2", "topic":"作用域链"},
            {"id":"Node24", "parentid":"Node2", "topic":"闭包"},
            {"id":"Node25", "parentid":"Node2", "topic":"基础语法"},

            {"id":"Node3", "parentid":"root", "topic":"框架(传统)"},
            {"id":"Node31", "parentid":"Node3", "topic":"jQuery"},
            {"id":"Node32", "parentid":"Node3", "topic":"jQuery UI"},
            {"id":"Node33", "parentid":"Node3", "topic":"jQuery Mobile"},

            {"id":"Node4", "parentid":"root", "topic":"Ajax"},

            {"id":"Node5", "parentid":"root", "topic":"框架(新)"},
            {"id":"Node51", "parentid":"Node5", "topic":"AngularJs"},
            {"id":"Node52", "parentid":"Node5", "topic":"Vue.js"},
            
            {"id":"Node6", "parentid":"root", "topic":"新概念"},
            {"id":"Node61", "parentid":"Node6", "topic":"MVVM模型"},
            {"id":"Node62", "parentid":"Node6", "topic":"数据双向绑定"},
            {"id":"Node63", "parentid":"Node6", "topic":"虚拟DOM"},
            {"id":"Node64", "parentid":"Node6", "topic":"Hybird App"},
            {"id":"Node65", "parentid":"Node6", "topic":"TypeScript"},

            {"id":"Node7", "parentid":"root", "topic":"JavaScript服务端框架"},
            {"id":"Node71", "parentid":"Node7", "topic":"Node.js"},
            {"id":"Node711", "parentid":"Node71", "topic":"核心模块"},
            {"id":"Node7111", "parentid":"Node711", "topic":"http"},
            {"id":"Node7112", "parentid":"Node711", "topic":"fs"},
            {"id":"Node7113", "parentid":"Node711", "topic":"..."},
            {"id":"Node712", "parentid":"Node71", "topic":"第三方模块"},
            {"id":"Node7121", "parentid":"Node712", "topic":"socket.io"},
            {"id":"Node7122", "parentid":"Node712", "topic":"mysql"},
            {"id":"Node7123", "parentid":"Node712", "topic":"mongoose"},
            {"id":"Node7124", "parentid":"Node712", "topic":"redis"},
            {"id":"Node7125", "parentid":"Node712", "topic":"..."},
            {"id":"Node713", "parentid":"Node71", "topic":"Express"},
            {"id":"Node714", "parentid":"Node71", "topic":"Koa"},
            {"id":"Node715", "parentid":"Node71", "topic":"npm"},
            {"id":"Node716", "parentid":"Node71", "topic":"bower"},
            {"id":"Node717", "parentid":"Node71", "topic":"webpack"},
            {"id":"Node718", "parentid":"Node71", "topic":"babel"},

            {"id":"Node8", "parentid":"root", "topic":"前沿技术"},
            {"id":"Node81", "parentid":"Node8", "topic":"React.js"},
            {"id":"Node82", "parentid":"Node8", "topic":"React Native"},
            {"id":"Node83", "parentid":"Node8", "topic":"Ionic+Cordova"},
            {"id":"Node84", "parentid":"Node8", "topic":"ECMAScript6"}
        ]
    };
    var options = {
        container:'jsmind_container',
        editable:true,
        theme:'primary',
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
    }
    _jm = jsMind.show(options,mind);
    _jm.add_event_listener(function (type, data){
        console.log('------IN METHOD add_event_listener------');
        console.log(type);
        console.log(data);
        console.log(data.evt);
    });
    // jm.set_readonly(true);
    // var mind_data = jm.get_data();
    // alert(mind_data);
}

function load_file(fi){
    var files = fi.files;
    if(files.length > 0){
        var file_data = files[0];
        jsMind.util.file.read(file_data, function(freemind_data, jsmind_name){
            var mind = jsmind_data;
            if(!!mind){
                _jm.show(mind);
            }else{
                console.error('can not open this file as mindmap');
            }
        });
    }
}

function save_nodetree(){
    var mind_data = _jm.get_data('node_tree');
    console.log(mind_data);
}

function replay(){
    var shell = _jm.shell;
    if(!!shell){
        shell.replay();
    }
}

load_jsmind();