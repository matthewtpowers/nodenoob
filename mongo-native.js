var util = require('util');
var mongo = require('mongodb'), dbHost = '127.0.0.1', dbPort = 27017;


var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server;
var db = new Db ('local', new Server(dbHost, dbPort))

db.open(function(error,dbConnection){
	if(error)
	{
		console.error(error);
		process.exit(1);
	}
	console.log(db._state);

	//Open the collection, find one, chnage the item, save the item
	dbConnection.collection('messages').findOne({},function(error,item)
	{
		if(error)
		{
			console.error(error);
			process.exit(1);
		}
		console.info('findOne: ' + JSON.stringify(item));
		
		item.text = 'changed';
		var id = item._id.toString();//store the ID in a string
		console.info('before saving: ' + JSON.stringify(item));
		dbConnection.collection('messages').save(item, function(error,item){
			console.info('after save: ' + JSON.stringify(item));
			if(!error)
			{
				console.info("there is no error saving");
			}else
			{
				console.info("error saving");
				console.info(error);
			}
			
		dbConnection.collection('messages').find({_id: new mongo.ObjectID(id)}).toArray(function(error,items){
			console.info('find: ', JSON.stringify(items));
		
		db.close();
		process.exit(0);
		});
	});
});
});