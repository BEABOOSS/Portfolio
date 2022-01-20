import { franc, francAll } from 'franc'
const langs = require("langs")
const input = process.argv[2]

const decypher = francAll(input);
if (decypher === "und") {
    console.log("SORRY CAN'T READ THAT!!");
} else {
    const language = langs.where("3", decypher);
    console.log(language.name);
}