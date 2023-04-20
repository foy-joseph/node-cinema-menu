import express from 'express';
const app = express()
import handlebars from 'express-handlebars';

app.listen(3000)



app.use(express.static("views/images"));

app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars')

app.get('/', function(req, res){
    movies.readAllMovies()
        .then(function(data) {
            res.render('movie', {name: 'movie', movie: data});
        })
        .catch(function(){
            res.render('error');
        })
})

app.post()