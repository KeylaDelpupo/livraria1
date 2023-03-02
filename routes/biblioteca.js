var express = require('express');
var router = express.Router();
const fs = require ('fs');
const path = require ('path'); 
const livrosPath = path.resolve(__dirname, '../database/livros.json');

const getLivros = ()=> {
  return JSON.parse(fs.readFileSync(livrosPath));
}

function saveLivros(livros) {
   fs.writeFileSync(livrosPath, JSON.stringify(livros, null,4));
}



  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('biblioteca',{livros: getLivros()});
});

router.get('/adicionar',(req,res)=>{
  res.render('adicionar-livro')
});

router.post('/',(req,res)=>{
  const livros = getLivros();
  livros.push(
    {id:livros.at(-1).id+1,
      ...req.body
    });
     //método at() é usado para acessar o último elemento do array livros,push() no array de livros, que adiciona um ou mais elementos ao final do array.
     saveLivros(livros);
     res.redirect('/biblioteca');
});

router.delete('/deletar/:id',(req,res) => {
  const id = req.params.id;
let livros = getLivros();
  livros = livros.filter(livro => livro.id != id);
  saveLivros(livros);
  res.redirect('/biblioteca');
 

})

module.exports = router;