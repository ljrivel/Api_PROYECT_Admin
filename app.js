
require("dotenv").config();
const express = require('express');
const app = express();
const connection = require('./mysql');
const port = process.env.PORT || 3000



const {InsertUsuario,Login, InsertGenero,GetsGenero,GetsIdioma,InsertIdioma,GetsActor,InsertActor,InsertPeliculaxGenero,InsertPelicula,GetsPelicula,GetsPeliculasxGenero,getUser} = require("./operations");

const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());



app.get("/", (req, res) => {
 res.send("Hello World");
});


//USUARIO

app.post("/Login", (req, res) => {
  const body = req.body
  Login(connection,body,result =>{
    res.json(result);
  });
 });

 app.post("/GetUser", (req, res) => {
  const body = req.body
  getUser(connection,body,result =>{
    res.json(result);
  });
 });

 app.post("/InsertUsuario", (req, res) => {
  const body = req.body
  InsertUsuario(connection,body,result =>{
    res.json(result);
  });
 });


 //GENERO

 app.get("/insertgenero", (req, res) => {
  const body = "Suspenso"
  InsertGenero(connection,body,result =>{
    res.json(result);
  });
 });


 app.get("/getsgenero", (req, res) => {
  GetsGenero(connection,result =>{
    res.json(result);
  });
 });


 //IDIOMA

 app.get("/insertidioma", (req, res) => {
  const body = "Espanol"
  InsertIdioma(connection,body,result =>{
    res.json(result);
  });
 });


 app.get("/getsidioma", (req, res) => {
  GetsIdioma(connection,result =>{
    res.json(result);
  });
 });


 //Pelicula

 app.get("/insertpelicula", (req, res) => {
  const body = {Titulo:"F&F9",Director:"William",Year:"2002",Edad:18}
  InsertPelicula(connection,body,result =>{
    res.json(result);
  });
 });


 app.get("/getspelicula", (req, res) => {
  GetsPelicula(connection,result =>{
    res.json(result);
  });
 });



 //Actores

 app.get("/insertactor", (req, res) => {
  const body = "William"
  InsertActor(connection,body,result =>{
    res.json(result);
  });
 });


 app.get("/getsactor", (req, res) => {
  GetsActor(connection,result =>{
    res.json(result);
  });
 });

 app.get("/insertPxG", (req, res) => {
   const data = {idP:1,idG:1}
  InsertPeliculaxGenero(connection,data,result =>{
    res.json(result);
  });
 });

 app.get("/getsPxG", (req, res) => {
  const data = "Accion"
 GetsPeliculasxGenero(connection,data,result =>{
   res.json(result);
 });
});

app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
