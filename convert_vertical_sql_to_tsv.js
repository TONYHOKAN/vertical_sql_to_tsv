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
	
	if(columnCount === 0 && line.startsWith("****") && !columnCountDone)
	{
		columnCount++
		console.log(`Process line from file: ${line}`);
	}
	else if(columnCount > 0 && line.startsWith("****") && !columnCountDone)
	{
		columnCount--
		columnCountDone = true
		console.log(`columnCountDone done: ${columnCount}`);
	}
	else if(line.startsWith("****"))
	{
		// skip not first seperator
	}
	else
	{
		if(!columnCountDone)
		{
			columnCount++
		}
		var header_data = line.split(":")
		if (header_data.length >= 2)
		{
			// console.log(header_data[0]);
			// console.log(header_data[1]);
		
			headerSet.add(header_data[0].trim())
			columnDataArray.push(header_data[1].trim())
		}
		
	}
  }
  
  // console.log(headerSet)
  // console.log(columnDataArray)
  var outputString = ""
  outputString  =  Array.from(headerSet).join("\t");
  outputString = outputString + "\r\n"
  
  for(var i =1; i <= columnDataArray.length ; i++)
  {
	  // console.log(columnDataArray[i])
	  outputString = outputString + '"' + columnDataArray[i-1] + '"' + "\t"
	  if(i%columnCount === 0)
	  {
		  outputString = outputString + "\r\n"
	  }
  }
  
  fs.writeFile(outputPath, outputString, function (err) {
	if (err) throw err;
	  console.log('Saved! : ' + outputPath);
	});
  
}

processLineByLine();
