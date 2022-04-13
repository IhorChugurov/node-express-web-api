import dbConfig from "../config/db.config.js"
import mongoose from "mongoose";
import fs from "fs";
import { URL } from 'url';
import { dirname } from 'path'
const dn = dirname(new URL(import.meta.url).pathname)
// remove the leading slash on Windows
const __dirname = process.platform === 'win32' ? dn.substr(1) : dn
const db = {...dbConfig};
db.mongoose = mongoose;
fs.readdirSync(__dirname ).forEach( async (file) => {
    if(file!=='index.js'){
        let name = file.split('.')[0]
        const { default: initModel } = await import('./' + file)
        db[name]=initModel
    }
});
export default db;