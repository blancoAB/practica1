const express = require('express');
const app = express();
const PORT = 2000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises'},
    {id: 2 , nombre: 'Exodo', autor: 'Moises'},
    {id: 3 , nombre: 'Levitico', autor: 'Moises'},
    {id: 4 , nombre: 'Efesios', autor: 'Pablo'},
    {id: 5 , nombre: 'Juan', autor: 'Juan'},
    {id: 6 , nombre: 'Hebreos', autor: 'Juan'},
    {id: 7 , nombre: 'Romanos', autor: 'Pablo'},    
];

//manejo de JSON
app.use(express.json());

//edpoint1 bienvenida con su nombre y su profesion actual
app.get('/practica',(req,res)=>{ 
    bienvenida="Bienvenid@, Est Alvaro Blanco Nina, Profesor"
    res.json(bienvenida);
}); 
//edpoint2 Obtener libros por autor
app.get('/practica/:autor',(req, res) => {
    const autorCapturado = req.params.autor;
    console.log(autorCapturado);
    const libroEncontrado = librosBiblicos.filter((libro) => libro.autor === autorCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});

//edpoint3 Obtener la cantidad total de libros
app.get('/cantidad',(req,res)=>{ 
    const cantidad = parseInt(librosBiblicos.length);
    res.json(cantidad);
}); 

//edpoint4 Obtener libros por nombre que contenga el texto "Juan"
app.get('/consulta-juan',(req, res) => {
    const libroEncontrado = librosBiblicos.filter((libro) => libro.nombre === "Juan");
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});

//edpoint5 Ordenar libros por nombre
app.get('/ordenar-nombre',(req,res)=>{ 
    librosBiblicos.sort((a, b) => a.value - b.value);

    // ordenar por nombre
    librosBiblicos.sort((a, b) => {
      const nombreA = a.nombre.toUpperCase(); 
      const nombreB = b.nombre.toUpperCase(); 
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    res.json(librosBiblicos);
}); 

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});