var mongoskin = require('mongoskin'), dbHost = '127.0.0.1', dbPort = '27017';

var db = mongoskin.db(dbHost + ':' + dbPort + '/local', {safe:true});

db.bind('messages', {
 findOneAndAddText : function(text, fn){
 	db.collection('messages').findOne({}, function(error, item){
		if(error)
		{
			console.info("There is an error finding on the collection");
			console.info(error);
		}
		console.info('findOne: ', JSON.stringify(item));
		item.text = text;
		var id = item._id.toString();
		console.info('before saving', item);
		db.collection('messages').save(item, function(error, count){
			console.info('save: ', count);
			return fn(count, id);
		});
	})
 }
});

db.collection('messages').findOneAndAddText('test',function(count,id){
	db.collection('messages').find({
		_id : db.collection('messages').id(id)
	}).toArray(function(error,items){
		console.info("find: " , JSON.stringify(items));
		db.close();
		process.exit(1);
	})
});