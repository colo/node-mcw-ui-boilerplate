//pouchdb-server --level-backend sqldown --level-prefix ~/projects/pouchdb/

var PouchDB = require('pouchdb'),
		path = require('path'),
		jsonfile = require('jsonfile');
		//websql = require('pouchdb/extras/websql');

//var db = new PouchDB(path.join(__dirname,'../../../pouchdb/dashboard'), {adapter: 'websql'});
//var db = new PouchDB(path.join(__dirname,'../../../pouchdb/dashboard'), {db: require('sqldown')});
//var db = new PouchDB(path.join(__dirname,'../../../pouchdb/dashboard_read'), {db: require('sqldown')});
//var db = new PouchDB(path.join(__dirname,'../../../pouchdb/dashboard'));
var cradle = require('cradle-pouchdb-server');
		
//db.info().then(function (info) {
	//console.log(info);
//})
		
// create a design doc
var ddoc = {
  _id: '_design/info',
  views: {
		by_date: {
      map: function info(doc) {
				if (doc.metadata.type == 'info') {
					//var id = doc._id.split('@');//get host.path | timestamp
					//var host = doc.metadata.domain +'.'+doc.metadata.host;
					//var date = parseInt(id[1]);
					//var date = new Date();
					//date.setTime(id[1]);
					
					//var date_arr = [
						//date.getFullYear(),
						//date.getMonth() + 1,
						//date.getDate(),
						//date.getHours(),
						//date.getMinutes(),
						//date.getSeconds()
					//];
					var host = doc.metadata.domain +'.'+doc.metadata.host;
					var date = 0;
					
					if(!doc.metadata.timestamp){
						var id = doc._id.split('@');//get host.path | timestamp
						date = parseInt(id[1]);
					}
					else{
						date = parseInt(doc.metadata.timestamp);
					}
					
					emit([date, host], null);
				}
      }.toString()
    },
    by_host: {
      map: function info(doc) {
				if (doc.metadata.type == 'info') {
					//var id = doc._id.split('@');//get host.path | timestamp
					//var host = id[0];
					//var date = parseInt(id[1]);
					var host = doc.metadata.domain +'.'+doc.metadata.host;
					var date = 0;
					
					if(!doc.metadata.timestamp){
						var id = doc._id.split('@');//get host.path | timestamp
						date = parseInt(id[1]);
					}
					else{
						date = parseInt(doc.metadata.timestamp);
					}
					
					emit([host, date], null);
				}
      }.toString()
    },
    by_path_host: {
      map: function info(doc) {
				if (doc.metadata.type == 'info') {
					//var id = doc._id.split('@');//get host.path | timestamp
					//var host = id[0];
					//var date = parseInt(id[1]);
					var host = doc.metadata.domain +'.'+doc.metadata.host;
					var date = 0;
					
					if(!doc.metadata.timestamp){
						var id = doc._id.split('@');//get host.path | timestamp
						date = parseInt(id[1]);
					}
					else{
						date = parseInt(doc.metadata.timestamp);
					}
					
					emit([doc.metadata.path, host, date], null);
				}
      }.toString()
    }
  }
}

var ddoc_status = {
  _id: '_design/status',
  views: {
		by_date: {
      map: function status(doc) {
				if (doc.metadata.type == 'status') {
					//var id = doc._id.split('@');//get host.path | timestamp
					//var host = id[0];
					//var date = parseInt(id[1]);
					var host = doc.metadata.domain +'.'+doc.metadata.host;
					var date = 0;
					
					if(!doc.metadata.timestamp){
						var id = doc._id.split('@');//get host.path | timestamp
						date = parseInt(id[1]);
					}
					else{
						date = parseInt(doc.metadata.timestamp);
					}
					
					emit([date, host], null);
				}
      }.toString()
    },
    by_host: {
      map: function status(doc) {
				if (doc.metadata.type == 'status') {
					//var id = doc._id.split('@');//get host.path | timestamp
					//var host = id[0];
					//var date = parseInt(id[1]);
					var host = doc.metadata.domain +'.'+doc.metadata.host;
					var date = 0;
					
					if(!doc.metadata.timestamp){
						var id = doc._id.split('@');//get host.path | timestamp
						date = parseInt(id[1]);
					}
					else{
						date = parseInt(doc.metadata.timestamp);
					}
					
					emit([host, date], null);
				}
      }.toString()
    },
    by_path_host: {
      map: function info(doc) {
				if (doc.metadata.type == 'status') {
					//var id = doc._id.split('@');//get host.path | timestamp
					//var host = id[0];
					//var date = parseInt(id[1]);
					var host = doc.metadata.domain +'.'+doc.metadata.host;
					var date = 0;
					
					if(!doc.metadata.timestamp){
						var id = doc._id.split('@');//get host.path | timestamp
						date = parseInt(id[1]);
					}
					else{
						date = parseInt(doc.metadata.timestamp);
					}
					
					emit([doc.metadata.path, host, date], null);
				}
      }.toString()
    }
  }
}

var db = new(cradle.Connection)().database('dashboard');
var save_views = function(){
	db.save([ddoc, ddoc_status], function (err, res) {
		if(err){
			console.log('BULK SAVE ERR');
			console.log(err);
		}
		else{
			console.log('BULK SAVE RESP');
			console.log(res);
		}
	});
};
		
db.exists(function (err, exists) {
	if (err) {
		console.log('error', err);
	}
	else {
		if(!exists){
			db.create(function(err){
				if(!err){
					save_views();
				}
			});
			
		}
		else{
			save_views();
		}
		
	}
}.bind(this));
		

// save the design doc
//db.bulkDocs([ddoc, ddoc_status]).catch(function (err) {
  //if (err.name !== 'conflict') {
    //throw err;
  //}
  //// ignore if doc already exists
//}).then(function () {
	
	
	//return db.query('status/by_path_host', {
		//startkey: ["os.blockdevices", "localhost.colo\ufff0", 1470277762363],
		//endkey: ["os.blockdevices", "localhost.colo", 1470277760000],
		//limit: 1,
		//descending: true,
		//inclusive_end: true,
		////include_docs: true
	//});
  
  ////return db.query('info/by_path_host', {
		////startkey: ["os", "localhost.colo\ufff0"],
		////endkey: ["os", "localhost.colo"],
		////limit: 1,
		////descending: true,
		////inclusive_end: true,
		//////include_docs: true
  ////});
   
	////return db.query('info/by_date', {
		////startkey: [1469675114071, "localhost.server", "os"],
		////endkey: [1469675114071, "localhost.server\ufff0", "os.mounts\ufff0"],
		//////inclusive_end: true
		////include_docs: true
  ////});
	
	////return db.query('os/by_date', {
		//////startkey: [1469639314750, "com.example.server"],
		//////endkey: [99999999999999, "com.example.server"],
		//////inclusive_end: true
  ////});
  
  ////return db.query('os/by_host', {
		////startkey: "1469584391932",
		////endkey: "1469586311057",
		//////inclusive_end: true
  ////});
  
  ////return db.query('os/info', {
		////startkey     : ["", [2015,7,27,14,8,34]],
		////endkey       : [{}, "\uffff"],
  ////});
  ///**
   //* all from one host
   //* 
   //* */
  ////return db.query('os/info', {
		////startkey     : ['localhost.colo'],
		////endkey       : ['localhost.colo\uffff'],
  ////});
  ///** OR */
  ////return db.query('os/info', {
		////startkey     : ['localhost.colo'],
		////endkey       : ['localhost.colo', {}],
  ////});
  
  ///**
   //* last from one host (reverse star & end keys)
   //* 
   //* */
  ////return db.query('os/info', {
		////startkey     : ['localhost.colo\uffff'],
		////endkey       : ['localhost.colo'],
		////limit: 1,
		////descending: true
  ////});
  
  ///**
   //* one host - range from date
   //* 
   //* */
	////return db.query('os/info', {
		////startkey     : ["localhost.colo",[2016,7,27,14,8,0]],
		////endkey       : ["localhost.colo",[2016,7,27,14,8,34]],
		//////inclusive_end: true
    //////include_docs: true
  ////});
  
  
  ///**
   //* all from one domain
   //* 
   //* */
  ////return db.query('os/info', {
		////startkey     : ['localhost'],
		////endkey       : ['localhost\uffff'],
  ////});
  
  ///**
   //* one domain - range from date
   //* 
   //* */
	////return db.query('os/info', {
		////startkey     : ["localhost",[2016,7,27,14,8,34]],
		////endkey       : ["localhost\uffff",[2016,7,27,14,8, 0]],
		//////inclusive_end: true
    //////include_docs: true
  ////});
  
  ///**
   //* all domains - range from date
   //* 
   //* */
	////return db.query('os/info', {
		////startkey     : ["",[2016,7,26,0,0,0]],
		////endkey       : ["\uffff",[2016,7,27,23,59,59]],
		//////inclusive_end: true
    //////include_docs: true
  ////});
  
//}).then(function (result) {
	
	////console.log(result);
	////result.rows.forEach(function(row){
		////delete row.doc._rev;
		////jsonfile.writeFileSync(path.join(__dirname,'./test/info/',row.doc._id), row.doc);
		//////console.log(row.doc);
	////});
  
  //result.rows.forEach(function(row){
		//console.log(row.key);
		//console.log(row.doc);
	//});
//}).catch(function (err) {
  //console.log(err);
//});
