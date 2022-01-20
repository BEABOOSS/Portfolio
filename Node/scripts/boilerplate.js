const fs = require("fs");

const folderName = process.argv[2] || 'project'

// fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
//     if (err) throw err;
// });
try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, "Hello node.js", "utf8")
    fs.writeFileSync(`${folderName}/app.js`, "Hello node.js", "utf8")
    fs.writeFileSync(`${folderName}/style.css`, "Hello node.js", "utf8")
} catch (e) {
    console.log("SOMETHING WENT WRONG");
    console.log(e);
}  