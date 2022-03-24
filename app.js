
require("dotenv").config();
const express = require('express');
const app = express();
const connection = require('./mysql');
const port = process.env.PORT || 3000



const {InsertUsuario,Login, InsertPelicula,GetsPelicula,getUser,GetPelicula,
  changePelicula,getUsers,getUserLogin,changeUser,deleteUser,deletePelicula,
  registerUsuario,getsProducto,deleteProducto,getProductoBebida,getProductoCombo,
  getProductoComida,InsertProducto,changeProducto,getProducto,GetCartelera} = require("./operations");

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


 app.post("/GetUserLogin", (req, res) => {
  const body = req.body
  getUserLogin(connection,body,result =>{
    res.json(result);
  });
 });


 app.post("/GetUser", (req, res) => {
  const body = req.body
  getUser(connection,body,result =>{
    res.json(result);
  });
 });

 app.post("/changeUser", (req, res) => {
  const body = req.body
  changeUser(connection,body,result =>{
    res.json(result);
  });
 });

 app.post("/deleteUser", (req, res) => {
  const body = req.body
  deleteUser(connection,body,result =>{
    res.json(result);
  });
 });


 app.get("/GetUsers", (req, res) => {
  getUsers(connection,result =>{
    res.json(result);
  });
 });

 app.post("/InsertUsuario", (req, res) => {
  const body = req.body
  InsertUsuario(connection,body,result =>{
    res.json(result);
  });
 });

 app.post("/registerUsuario", (req, res) => {
  const body = req.body
  registerUsuario(connection,body,result =>{
    res.json(result);
  });
 });


 //Pelicula

 app.post("/insertpelicula", (req, res) => {
  const body = req.body
  InsertPelicula(connection,body,result =>{
    res.json(result);
  });
 });


 app.get("/getspelicula", (req, res) => {
  GetsPelicula(connection,result =>{
    res.json(result);
  });
 });

 app.get("/getcartelera", (req, res) => {
  GetCartelera(connection,result =>{
    res.json(result);
  });
 });

 app.post("/GetPelicula", (req, res) => {
  const body = req.body
  GetPelicula(connection,body,result =>{
    res.json(result);
  });
 });

 
app.post("/changePelicula", (req,res) => {
  const data = req.body
 changePelicula(connection,data,result =>{
   res.json(result);
 });
});
 
 app.post("/deletePelicula", (req, res) => {
  const body = req.body
  deletePelicula(connection,body,result =>{
    res.json(result);
  });
 });

 //Producto

 app.post("/insertproducto", (req, res) => {
  const body = req.body
  InsertProducto(connection,body,result =>{
    res.json(result);
  });
 });

 app.post("/changeproducto", (req, res) => {
  const body = req.body
  changeProducto(connection,body,result =>{
    res.json(result);
  });
 });

 app.post("/getproducto", (req, res) => {
   const body = req.body
  getProducto(connection,body,result =>{
    res.json(result);
  });
 });

 app.get("/getsproducto", (req, res) => {
 getsProducto(connection,result =>{
   res.json(result);
 });
});

 app.get("/getproductobebida", (req, res) => {
  getProductoBebida(connection,result =>{
    res.json(result);
  });
 });

 app.get("/getproductocomida", (req, res) => {
  getProductoComida(connection,result =>{
    res.json(result);
  });
 });

 app.get("/getproductocombo", (req, res) => {
  getProductoCombo(connection,result =>{
    res.json(result);
  });
 });
 
 app.post("/deleteproducto", (req, res) => {
  const body = req.body
  deleteProducto(connection,body,result =>{
    res.json(result);
  });
 });
 



app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});
