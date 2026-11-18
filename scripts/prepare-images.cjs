const fs=require('fs'),path=require('path'),cp=require('child_process');
const records=JSON.parse(fs.readFileSync('scripts/image-manifest.json','utf8'));
for(const r of records){if(fs.existsSync(r.dest))continue;fs.mkdirSync(path.dirname(r.dest),{recursive:true});cp.execFileSync('magick',[r.source,'-resize',r.id===0?'1400x1000>':'800x800>','-quality','82',r.dest]);}
console.log('Optimized',records.length,'original images');
