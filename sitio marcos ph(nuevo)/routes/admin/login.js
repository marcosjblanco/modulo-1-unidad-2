var express = require('express');
const { post } = require('../../app');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');


router.get('/', function(req, res, next) {
  res.render('admin/login', { // login.hbs
      layout: 'admin/layout'
    
  });
});

router.get('/logout', function (req, res, next) {
    req.session.destroy(); //destruir las variables de session (id y usuario)
    res.render('admin/login', {
        layout: 'admin/layout'
    });
}); //cierro logout

router.post('/', async (req, res, next) => {
    try {
        var usuario = req.body.usuario;
        var password = req.body.password;
        console.log(req.body);

        var data = await usuariosModel.getUserByUsernameAndPassword(usuario,password);

        if (data != undefined) {

            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;

            
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login', {
                layout: 'admin/login',
                error: true
            });
        }
    } catch (error) {
        console.log(error);
    }//cierro catch
}); //cierro router post

module.exports = router;

 