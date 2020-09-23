// this support node version > 11
const fs = require('fs');
const readline = require('readline');

const inputPath = String(process.argv[2]);
const outputPath = String(process.argv[3]);

console.log(`inputPath: ${inputPath}`);
console.log(`outputPath: ${outputPath}`);

const headerSet = new Set()
const columnDataArray = new Array()
var columnCount = 0
var columnCountDone = false
async function processLineByLine() {
  const fileStream = fs.createReadStream(inputPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
	
	
	var eachColumn = line.split("\t")
	// console.log(eachColumn);
	columnDataArray.push(eachColumn)
	
  }
  
  // console.log(headerSet)
  // console.log(columnDataArray)
  var outputString = ""

  
  for(var i =1; i <= columnDataArray.length ; i++)
  {
	  var data = columnDataArray[i]
	  // console.log(data)
	  if(!!data){
		  		var rule_id=i
		var digest=columnDataArray[i][4]
		
	    var template = `
		  {
				rule_id=${rule_id} 
				active=1 
				username="databank-ro" 
				digest=${digest}
				destination_hostgroup=0 
				apply=1 
				schemaname="hktvmall"
		  },`
	  }
	  
	  outputString = outputString + template + "\r\n"
	
  }
  
  fs.writeFile(outputPath, outputString, function (err) {
	if (err) throw err;
	  console.log('Saved! : ' + outputPath);
	});
  
}

processLineByLine();
