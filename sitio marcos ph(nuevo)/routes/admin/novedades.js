var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

//para listar las novedades
router.get('/', async function (req, res, next) {

  //var novedades = await novedadesModel.getNovedades();

  var novedades
  if (req.query.q === undefined) {
      novedades = await novedadesModel.getNovedades();
  } else {
      novedades = await novedadesModel.buscarNovedades(req.query.q);
  }

  res.render('admin/novedades', {
      layout: 'admin/layout',
      usuario: req.session.nombre,
      novedades,
      is_search: req.query.q !== undefined,
      q: req.query.q

  });
});  //cierre inicial

//para eliminar las novedades
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  await novedadesModel.deleteNovedadesById(id);
  res.redirect('/admin/novedades');

}); //cierra get eliminar 


/*vista para agregar novedades*/

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  }); //cierra render//

}); //cierra get

//*insertar la novedad de la tabla*//

router.post('/agregar', async (req, res, next) => {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: 'Todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true,
      message: 'No se cargo la novedad'
    })

  }
})


/*para listar una sola novedad by id - modificar*/

router.get('/modificar/:id' , async (req, res, next) => {
    
    //console.log(req.params.id);
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);

  
    res.render('admin/modificar', {
        layout: 'admin/layout',
        novedad
    })
});

//modificar la novedad//

router.post('/modificar', async (req, res, next) => {
  try {

    //console.log(obj)

    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
   

    await novedadesModel.modificarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');


  } catch (error) {
      console.log(error)
      res.render('admin/modificar', {
         layout: 'admin/layout',
         error: true,
         message: 'No se modifico la novedad'
    })

  }
})



module.exports = router;