const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')

//Config Template
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

//body parser

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home',{posts: posts})
    })
})

app.get('/cad', function(req, res){
    res.render('formulario')
})

app.post('/add', function(req, res){
   Post.create({
       titulo: req.body.titulo,
       conteudo: req.body.conteudo
   }).then(function(){
       res.redirect('/')
   }).catch(function(erro){
       res.send("Falha ao enviar!" + erro)
   })
});


app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
    res.send("Deletada com sucesso!")
        }).catch(function(erro){
         res.send("Este post não existe... tente novamente! ")
    })
})

app.listen(8081, function(){
    console.log('Servidor Online!')
})