const express = require("express");
const app = express();
const mysql = require("mysql");
require("dotenv").config();

const {InsertUsuario,Login, InsertGenero,GetsGenero,GetsIdioma,InsertIdioma} = require("./operations");

const cors=require("cors");
const corsOptions ={
   origin:'*',
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const connection = mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBDATABASE,
});

connection.connect((err) =>{
  if (err) throw err;
  console.log("Connected to database");
});


app.use(express.json());

app.get("/", (req, res) => {
 res.send("Hello World");
});


//USUARIO

app.get("/Login", (req, res) => {
  const body = {Usuario: "lj@gmail.com", Password:"lrivel" }
  Login(connection,body,result =>{
    res.json(result);
  });
 });

app.get("/InsertUsuario", (req, res) => {
  const body = {TipoUsuario:1 ,Cedula:"23",Nombre:"Luis", Apellido1:"Rivel", Apellido2:"Oviedo", FechaNacimiento:'2002-10-16 0:0:0',Edad:20, Email:"lj@gmail.com", Password:"lrivel", EsquemaVacunacion:2}
  InsertUsuario(connection,body,result =>{
    res.json(result);
  });
 });

 //GENERO

 app.get("/insertgenero", (req, res) => {
  const body = "Comedia"
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
  const body = "Ingles"
  InsertIdioma(connection,body,result =>{
    res.json(result);
  });
 });


 app.get("/getsidioma", (req, res) => {
  GetsIdioma(connection,result =>{
    res.json(result);
  });
 });



app.listen(3000, () => {
  console.log("Servidor en puerto 3000 ... ");
});
