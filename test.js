var jimp = require('jimp');
const crypto = require('crypto');

let texto = "Texto cualquieraa";
var id = crypto.randomBytes(15).toString('hex');
const regxs = {
  "lower": /^[a-z0-9 ]+$/,
  "upper": /^[A-Z0-9 ]+$/
}

var arr = texto.split("");

var images = ['src/images/base.jpg'];

for (var i = 0; i < arr.length; i++){
  //console.log(arr[i])
  if (arr[i] == " "){
    images.push('src/images/espacio.png');
  }else if(regxs.upper.test(arr[i]) == 1){
    images.push('src/images/'+arr[i]+'.png');
  }else{
    images.push('src/images/'+arr[i]+arr[i]+'.png');
  }
}


 var jimps = [];
 var letras = images.length;

 for (var i = 0; i < images.length; i++){
   jimps.push(jimp.read(images[i]));
 }

 Promise.all(jimps).then(function(data){
   return Promise.all(jimps);
 }).then(function(data){

   var coords = 0;
   var vertical = 0;
   for (var i = 1, coords = 210, vertical = 302; i < letras; i++, coords += 52){
     if(coords > 2186){
       vertical += 88;
       coords = 210;
     }
     if(images[i] == 'src/images/yy.png'){
      data[0].composite(data[i],coords,vertical+28);
     }else if(images[i] == 'src/images/jj.png'){
      data[0].composite(data[i],coords,vertical+23);
     }else if(images[i] == 'src/images/gg.png'){
      data[0].composite(data[i],coords,vertical+20);
     }else if(images[i] == 'src/images/pp.png'){
      data[0].composite(data[i],coords,vertical+20);
     }else if(images[i] == 'src/images/qq.png'){
      data[0].composite(data[i],coords,vertical+20);
     }else{
      data[0].composite(data[i],coords,vertical);
     }
     //console.log(coords)
   }
   //data[0].composite(data[1],2186,390);
   data[0].write(id+'.png', function(){
     console.log("Wrote xd");
   });
 })