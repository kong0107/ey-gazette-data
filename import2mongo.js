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

		//dirs.forEach(parseByDate);

		parseByDate(dirs, 0, function() {
			console.log('Finish');
		});
	});
});

function parseByDate(dates, index, callback) {
	if(index == dates.length) return setImmediate(callback);
	var next = function(msg, err){
		if(msg) console[err ? 'error' : 'log'](msg);
		setImmediate(parseByDate, dates, index + 1, callback);
	};
	var dateStr = dates[index];
	var split = dateStr.split('-').map(function(num) {return parseInt(num, 10);});
	if(split.length != 3 || split.some(isNaN))
		return next('Warning: skipped unknown date format ' + dateStr, true);
	split[0] += 1911;
	var dateCEStr = (new Date(split.join('-'))).toISOString().substr(0, 10);
	fs.readFile(
		util.format('./data/%s/%s.xml', dateStr, dateStr),
		'utf8',
		function(err, xml) {
			if(err) return next('Error: error on file reading', err);
			xml2js.parseString(xml, function(err, res) {
				if(err) return next('Error: XML parsing error of ' + dateStr, err);
				try {
					var records = res.Gazette.Record;
					records.forEach(function(rec) {
						for(var i in rec) {
							if(!Array.isArray(rec[i])
								|| rec[i].length != 1
							) return console.error('Error: uknown format of a record of ' + dateStr);
							var val = rec[i][0];
							if(val) rec[i] = val;
							else delete rec[i];
						}
						rec.gazetteDate = dateCEStr;
					});
				}
				catch(err) {return next('Error: xmlDoc with wrong structure ' + dateStr, err);}
				//next(dateStr + ' ' + records.length);
				fs.writeFile('test.json', JSON.stringify(records, null, '\t'), function(err) {
					if(err) console.error(err);
					else console.log('Success!');
				});
			});
		}
	);
}
