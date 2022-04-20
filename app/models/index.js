// Importing config creating earlier
import dbConfig from "../config/db.config.js";
// Earlier we installed the external module mongoose and wrote it in dependencies in the package.json file
import mongoose from "mongoose";
// Fs - standard Node.js API that provides asynchronous file system methods that return promises
import fs from "fs";
// Url - standard Node.js module provides utilities for URL resolution and parsing
import { URL } from 'url';
// Path - standard Node.js module that provides utilities for working with file and directory paths
import { dirname } from 'path';
// Getting path to models folder
const dn = dirname(new URL(import.meta.url).pathname);
// Removing the leading slash on Windows
const __dirname = process.platform === 'win32' ? dn.substr(1) : dn ;
// Creating general db object and add configurations in it
const db = {...dbConfig};
db.mongoose = mongoose;
// Reading all files with models from __dirname and writing in db {}
// #1 in diagram
fs.readdirSync(__dirname ).forEach( async (file) => {
    if(file!=='index.js'){
        let name = file.split('.')[0];
        // Dynamic module import
        const { default: initModel } = await import('./' + file);
        db[name]=initModel;
    };
});
export default db;