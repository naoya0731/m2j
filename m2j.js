//require libraries
var fs = require("fs");

//load markdown file
var text = fs.readFileSync("original_md/activeadmin.md", "utf8")

//fetch title
var title_reg = /title: .*/;
var title = text.match(title_reg)[0].replace("title: ", "")

//fetch category
var category_reg = /category: .*/
var category = null

if(text.match(category_reg)){
  category = text.match(category_reg)[0].replace("category: ", "")
}

//fetch body
var lines = text.split("\n")
var section = 0
var headings = []
var bodies = []

for (var i = 0; i < lines.length; i++) {
  var line = lines[i]

  if(line.indexOf("###") == 0){
    section += 1
    headings.push(line.replace("### ", ""))
  }else{
    if(bodies[section] == undefined){
      bodies[section] = ""  
    }else{
      bodies[section] = bodies[section] + line.replace(/^\s\s\s\s/,"") + "\n"
    }
  }
};

//make json
var output = {title: title, category: category, headings: headings, bodies: bodies.slice(1,bodies.length)}

//write json data to file
fs.writeFile("parsed_data.json", JSON.stringify(output, null, "    "));