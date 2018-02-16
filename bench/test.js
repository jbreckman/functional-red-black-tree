"use strict"

var createTree = require("../rbtree.js")

var t = createTree()

function generate() {
  return "SOME BIG THINGS" + Math.random();
}

var s = Date.now()
for(var i=0; i<1000000; ++i) {
  t = t.insert(Math.random(), generate())
  if (i%5000 === 0) { 
    createTree.flush()
  }
}

setInterval(() => { 
  for (var j = 0; j < 100; j++) {
    for(var i=0; i<100000; ++i) {
      t = t.insert(Math.random(), generate());
      t = t.remove(t.begin.key);
      if (i%1000 === 0) { 
        createTree.flush()
      }
    }
    
    console.log(`${Math.round(process.memoryUsage().rss / 1024 / 1024)}MB`);
  }
},5000);

console.log(Date.now() - s)