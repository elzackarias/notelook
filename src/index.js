const express = require('express');
const path = require('path');
const jimp = require('jimp');
const morgan = require('morgan');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const regxs = {
    "lower": /^[a-z0-9 ]+$/,
    "upper": /^[A-Z0-9 ]+$/
}
  

//Initialization
const app = express();

//Middlewares
app.use(express.json());
app.use('/pics',express.static(__dirname+'/images'));
app.use('/css',express.static(__dirname+'/public/css'));
app.use(morgan('dev'));
app.use('/js',express.static(__dirname+'/public/js'));
app.use('/public',express.static(__dirname+'/public'));

const urlencodedParser = bodyParser.urlencoded({extended:false});

//Settings
//app.set('port', 3000);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/test', (req, res) => {
  res.render('test');
})

app.get('/about', (req, res) => {
    res.render('about')
});

app.get('/download/:id', (req, res) => {
  const  { id } = req.params;
  res.download(path.join(__dirname, '/images/'+id+'.png'));
});

app.get('/image/:id', (req, res)  => {
  const  { id } = req.params;
  res.render('imagen', { id });
});

app.get('/upload', (req, res) => {
  res.render('error');
});

app.post('/upload', urlencodedParser, (req, res) => {
    let obj = req.body;
    let texto = obj.texto;
    let uri;
    let id = crypto.randomBytes(15).toString('hex');
    var arr = texto.split("");

    var images = ['src/images/base.jpg'];

    for (var i = 0; i < arr.length; i++){
      console.log(arr[i].toString())
      if (arr[i] == " "){
        images.push('src/images/espacio.png');
      }else if(regxs.upper.test(arr[i]) == 1){
        images.push('src/images/'+arr[i]+'.png');
      }else if(arr[i] == "."){
        images.push('src/images/punto.png');
      }else if(arr[i] == ":"){
        images.push('src/images/dospuntos.png');
      }else if(arr[i] == ";"){
        images.push('src/images/puntocoma.png');
      }else if(arr[i] == "?"){
        images.push('src/images/¿¿.png');
      }else if(arr[i] == "¿"){
        images.push('src/images/¿.png');
      }else if(arr[i] == '"'){
        images.push('src/images/comillas.png');
      }else if(arr[i] == '<'){
        images.push('src/images/mayorque.png');
      }else if(arr[i] == '>'){
        images.push('src/images/menorque.png');
      }else if(arr[i] == '/'){
        images.push('src/images/diagonal.png');
      }else if(arr[i] == '*'){
        images.push('src/images/astedisco.png');
      }else if(arr[i] == '0'){
        images.push('src/images/0.png');
      }else if(arr[i] == '1'){
        images.push('src/images/1.png');
      }else if(arr[i] == '2'){
        images.push('src/images/2.png');
      }else if(arr[i] == '3'){
        images.push('src/images/3.png');
      }else if(arr[i] == '4'){
        images.push('src/images/4.png');
      }else if(arr[i] == '5'){
        images.push('src/images/5.png');
      }else if(arr[i] == '6'){
        images.push('src/images/6.png');
      }else if(arr[i] == '7'){
        images.push('src/images/7.png');
      }else if(arr[i] == '8'){
        images.push('src/images/8.png');
      }else if(arr[i] == '9'){
        images.push('src/images/9.png');
      }else if(arr[i] == 'Á'){
        images.push('src/images/Á.png');
      }else if(arr[i] == 'É'){
        images.push('src/images/É.png');
      }else if(arr[i] == 'Í'){
        images.push('src/images/Í.png');
      }else if(arr[i] == 'Ó'){
        images.push('src/images/Ó.png');
      }else if(arr[i] == 'Ú'){
        images.push('src/images/Ú.png');
      }else if(arr[i] == "\n"){
        console.log('Espacio')
      }else if(arr[i] == "\r"){
        console.log('Return')
      }else{
        images.push('src/images/'+arr[i].toUpperCase()+arr[i]+'.png');
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
         if(images[i] == 'src/images/Yy.png'){
          data[0].composite(data[i],coords,vertical+28);
         }else if(images[i] == 'src/images/Jj.png'){
          data[0].composite(data[i],coords,vertical+23);
         }else if(images[i] == 'src/images/Gg.png'){
          data[0].composite(data[i],coords,vertical+20);
         }else if(images[i] == 'src/images/Pp.png'){
          data[0].composite(data[i],coords,vertical+20);
         }else if(images[i] == 'src/images/Qq.png'){
          data[0].composite(data[i],coords,vertical+20);
         }else{
          data[0].composite(data[i],coords,vertical);
         }
         //console.log(coords)
       }
       //data[0].composite(data[1],2186,390);
       data[0].write('src/images/'+id+'.png', function(){
         uri = 'pics/'+id+'.png';
         //res.render('imagen', { uri });
         res.redirect(302,'/image/'+id);
       });
     })

});

app.listen(app.get('port'), () => {
    console.log('Hola Mundo')
});
