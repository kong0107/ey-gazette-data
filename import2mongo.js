var util = require('util');
var fs = require('fs');
var xml2js = require('xml2js');
var mongodb = require('mongodb');

var coll;

mongodb.MongoClient.connect('mongodb://localhost:27017/ey-gazette', function(err, db) {
	//if(err) return console.error('Error: cannot connect database');
	fs.readdir('./data', function(err, dirs) {
		if(err) return console.error('Error: no `data` directory to import');
		//coll = db.collection('records');
		dirs.forEach(parseByDate);
	});
});

function parseByDate(dateStr) {
	var split = dateStr.split('-').map(function(num) {return parseInt(num, 10);});
	if(split.length != 3 || split.some(isNaN))
		return console.error('Warning: skipped unknown date format %s', dateStr);
	split[0] += 1911;
	
	/// 西元紀年的日期字串，用於存進資料庫。
	var dateCEStr = (new Date(split.join('-'))).toISOString().substr(0, 10);
	var xml = fs.readFileSync(util.format('./data/%s/%s.xml', dateStr, dateStr), 'utf8');
	xml2js.parseString(xml, function(err, res) {
		/*if(err) return console.error('Error: XML parsing error of ' + dateStr);
		var records = res.Gazette.Record;*/
		try{
			res.Gazette.Record.forEach(function(record) {
				record.gazetteDate = dateCEStr;
				//parseRecord(record, dateCEStr);
			});
		} catch(err) {
			console.error('Error: XML parsing error of ' + dateStr);
		}
	});
}

function parseRecord(record, dateCEStr) {
	console.log(++counter);
}
