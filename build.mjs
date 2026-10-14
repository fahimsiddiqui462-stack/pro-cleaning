import fs from 'node:fs';import path from 'node:path';fs.rmSync('dist',{recursive:true,force:true});fs.mkdirSync('dist');for(const n of fs.readdirSync('.')){if(/\.(html|css|js|svg)$/.test(n))fs.copyFileSync(n,path.join('dist',n));}fs.cpSync('images','dist/images',{recursive:true});console.log('Built static site in dist/');
if(fs.existsSync('_headers'))fs.copyFileSync('_headers','dist/_headers');
