const mysql = require('mysql');
const {facturaPeliculas,facturaComida} = require("./pdf");
const nodemailer = require('nodemailer');
const fonts = require("./fonts");
const PdfPrinter = require("pdfmake");
var fs = require('fs');
const Handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: "587",
    auth:{
        user: "thanosmoraproject@gmail.com",
        pass: "qhasodoqjzikiysn"
    },
})


//----------------------------|
//                            |
// Funciones crear pdf        |
//                            |
//----------------------------|

function pdfComida(data){

    const printer2 = new PdfPrinter(fonts);
    let pdfDoc2 = printer2.createPdfKitDocument(facturaComida(data.Nombre,data.Cantidad,data.Precio));
    pdfDoc2.pipe(fs.createWriteStream("pdfComida.pdf"));
    pdfDoc2.end();

    transporter.sendMail({
        form: "Cinepolis",
        to: data.Email,
        subject: "Factura de  Comida",
        attachments: [
            {filename: "pdfComida.pdf", path:"pdfComida.pdf"}
        ]
    });
}

function pdfBoletos(data){
    const printer = new PdfPrinter(fonts);
    let pdfDoc = printer.createPdfKitDocument(facturaPeliculas(data.EntradaAdultos,data.EntradaMayores,data.EntradaNinos,data.Asientos,data.PrecioTotal));
    pdfDoc.pipe(fs.createWriteStream("pdfPelicula.pdf"));
    pdfDoc.end();

    transporter.sendMail({
        form: "Cinepolis",
        to: data.Email,
        subject: "Factura de Boletos",
        attachments: [
            {filename: "pdfPelicula.pdf", path:"pdfPelicula.pdf"}
        ]
    });

}




//----------------------------|
//                            |
// Funciones de tabla Usuario |
//                            |
//----------------------------|




function emailPassword(data){
    var name = data.Nombre + " " + data.Apellido1

    let hmtl = fs.readFileSync('password.html','utf8');
    let template = Handlebars.compile(hmtl);
    let information = {
        Name: name,
        password: data.Password
    };
    let htmlSend = template(information);

    transporter.sendMail({
        form: "Cinepolis",
        to: data.Email,
        subject: "Password account Cinepolis",
        html: htmlSend
    });

}

function registerUsuario(connection,data,callback){
    let insertQuery =   
        "INSERT INTO Usuario (TipoUsuario,NumeroCedula,Nombre,Apellido1,Apellido2,FechaNacimiento,Edad,Email,Password,EsquemaVacunacion,Activo) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
        let queryusers = mysql.format(insertQuery,[data.TipoUsuario,data.Cedula,data.Nombre,data.Apellido1,data.Apellido2,data.FechaNacimiento,data.Edad,data.Email,data.Password,data.EsquemaVacunacion,data.Activo]);

    connection.query(queryusers,function(err,result){
        if(err) throw err;
        emailPassword(data);
        callback(result);
    })
}


function InsertUsuario(connection,data,callback){
    let insertQuery =   
    "INSERT INTO Usuario (TipoUsuario,NumeroCedula,Nombre,Apellido1,Apellido2,FechaNacimiento,Edad,Email,Password,EsquemaVacunacion,Activo) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    let queryusers = mysql.format(insertQuery,[data.TipoUsuario,data.Cedula,data.Nombre,data.Apellido1,data.Apellido2,data.FechaNacimiento,data.Edad,data.Email,data.Password,data.EsquemaVacunacion,data.Activo]);

    connection.query(queryusers,function(err,result){
        if(err) throw err;
        callback(result);
    })
}

function Login(connection,data,callback){ 
    const user = data.Usuario;
    const pass = data.Password;
    let loginQuery = "SELECT * FROM usuario WHERE Email =?"
    let querylogin = mysql.format(loginQuery,[user]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        if(result[0] == null){
            callback(false);
        }
        else{

            if (result[0].Password == pass){
                callback(true);
            }
            else{
                callback(false);
            }
        }
    })
}

function getUser(connection,data,callback){ 
    const user = data.Usuario;
    let loginQuery = "SELECT * FROM usuario WHERE idUsuario =?"
    let querylogin = mysql.format(loginQuery,[user]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}
function getUserLogin(connection,data,callback){ 
    const user = data.Usuario;
    let loginQuery = "SELECT * FROM usuario WHERE Email =?"
    let querylogin = mysql.format(loginQuery,[user]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function getUsers(connection,callback){ 

    let loginQuery = "SELECT * FROM usuario WHERE TipoUsuario=1 and Activo=1"
    let querylogin = mysql.format(loginQuery);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function deleteUser(connection,data,callback){
    const user = data.id;
    let loginQuery = "UPDATE usuario set Activo=0 WHERE idUsuario =?"
    let querylogin = mysql.format(loginQuery,[user]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function changeUser(connection,data,callback){
    const user = data.idUsuario;
    let loginQuery = "UPDATE usuario SET TipoUsuario=?,NumeroCedula=?,Nombre=?,Apellido1=?,Apellido2=?,FechaNacimiento=?,Edad=?,Email=?,Password=?,EsquemaVacunacion=?,Activo=? WHERE idUsuario =? "
    let querylogin = mysql.format(loginQuery,[data.TipoUsuario,data.NumeroCedula,data.Nombre,data.Apellido1,data.Apellido2,data.FechaNacimiento,
        data.Edad,data.Email,data.Password,data.EsquemaVacunacion,data.Activo,user]);
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

//-----------------------------|
//                             |
// Funciones de tabla Pelicula |
//                             |
//-----------------------------|

function InsertPelicula(connection,data,callback){
    let insertQuery =
        "INSERT INTO Pelicula (Titulo,Director,YearPublicacion,EdadRequerida,URL,Generos,Actores,Duracion,Activo,Idiomas) VALUES (?,?,?,?,?,?,?,?,?,?)"
        let queryPeli = mysql.format(insertQuery,[data.Titulo,data.Director,data.YearPublicacion,data.EdadRequerida,data.URL,data.Generos,data.Actores,data.Duracion,data.Activo,data.Idiomas]);
        connection.query(queryPeli,function(err,result){
            if(err) throw err;
            callback(result);
        })

}

function GetsPelicula(connection,callback){
    let insertQuery = "Select * from Pelicula where Activo=1"
        let queryGenero = mysql.format(insertQuery)

        connection.query(queryGenero,function(err,result){
            if(err) throw err; 
            callback(result);
        })
}

function GetPelicula(connection,data,callback){
        let id = data.id;
        let insertQuery = "Select * from Pelicula where idPelicula=?"
        let queryGenero = mysql.format(insertQuery,[id])

        connection.query(queryGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}




function changePelicula(connection,data,callback){
    const user = data.idPelicula;
    let loginQuery = "UPDATE pelicula SET Titulo=?,Director=?,YearPublicacion=?,EdadRequerida=?,URL=? WHERE idPelicula =? "
    let querylogin = mysql.format(loginQuery,[data.Titulo,data.Director,data.YearPublicacion,data.EdadRequerida,data.URL,user]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}


function deletePelicula(connection,data,callback){
    const user = data.id;
    let loginQuery = "Update pelicula set Activo=0 WHERE idPelicula =?"
    let querylogin = mysql.format(loginQuery,[user]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}


//-----------------------------|
//                             |
// Funciones de tabla producto |
//                             |
//-----------------------------|



function InsertProducto(connection,data,callback){
    let insertQuery =   
    "INSERT INTO Producto (Activo,TipoProducto,Nombre,Precio,CantidadEnStock,URL) VALUES (?,?,?,?,?,?)"
    let queryusers = mysql.format(insertQuery,[data.Activo,data.TipoProducto,data.Nombre,data.Precio,data.CantidadEnStock,data.URL]);

    connection.query(queryusers,function(err,result){
        if(err) throw err;
        callback(result);
    })
}

function changeProducto(connection,data,callback){
    let insertQuery =   
    "Update Producto set TipoProducto=?,Nombre=?,Precio=?,CantidadEnStock=?,URL=? where idProducto=?"
    let queryusers = mysql.format(insertQuery,[data.TipoProducto,data.Nombre,data.Precio,data.CantidadEnStock,data.URL,data.idProducto]);

    connection.query(queryusers,function(err,result){
        if(err) throw err;
        callback(result);
    })
}


function getsProducto(connection,callback){ 
    let loginQuery = "SELECT * FROM Producto WHERE Activo=1"
    let querylogin = mysql.format(loginQuery);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function getProducto(connection,data,callback){ 
    let loginQuery = "SELECT * FROM Producto WHERE Activo=1 and idProducto=?"
    let querylogin = mysql.format(loginQuery,[data.Usuario]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function getProductoCombo(connection,callback){ 
    let loginQuery = "SELECT * FROM Producto WHERE Activo=1 and TipoProducto=0"
    let querylogin = mysql.format(loginQuery);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function getProductoBebida(connection,callback){ 
    let loginQuery = "SELECT * FROM Producto WHERE Activo=1 and TipoProducto=1"
    let querylogin = mysql.format(loginQuery);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function getProductoComida(connection,callback){ 
    let loginQuery = "SELECT * FROM Producto WHERE Activo=1 and TipoProducto=2"
    let querylogin = mysql.format(loginQuery,);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function deleteProducto(connection,data,callback){ 
    const user = data.Usuario;
    let loginQuery = "Update  Producto set Activo=0 WHERE idProducto=?"
    let querylogin = mysql.format(loginQuery,[user]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}


//-----------------------------|
//                             |
// Funciones de tabla Cartelera|
//                             |
//-----------------------------|


function GetCartelera(connection,callback){
    let insertQuery = "SELECT C.idCartelera,P.Titulo,P.idPelicula,P.Generos,P.URL FROM Cartelera C INNER JOIN Pelicula P ON P.idPelicula = C.idPelicula WHERE TIMESTAMPDIFF(MINUTE, NOW(), C.Inicio) > 0"
    let queryGenero = mysql.format(insertQuery)

    connection.query(queryGenero,function(err,result){
        if(err) throw err;
        callback(result);
    })
}

function addCartelera(connection,data,callback){
    let loginQuery = "call AgregarCartelera(?,?,?)"
    let querylogin = mysql.format(loginQuery,[data.id,data.sala,data.fecha]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function asientosLibres(connection,data,callback){
    let loginQuery = "call ObtenerCantidadDeAsientosLibres(?)"
    let querylogin = mysql.format(loginQuery,[data.id]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function asientosCartelera(connection,data,callback){
    let loginQuery = "call ObtenerAsientosXCartelera(?)"
    let querylogin = mysql.format(loginQuery,[data.id]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
   
}

//-----------------------------|
//                             |
// Funciones de Compra         |
//                             |
//-----------------------------|

function compraProductos(connection,data,callback){
    
    let loginQuery = "call AgregarCompraProductos(?,?,?,?)"
    let querylogin = mysql.format(loginQuery,[data.id,data.precio,data.productos,data.cantidad]);
 
    connection.query(querylogin,function(err,result){
        if(err) throw err;


        if(result[0][0]['Mensaje'] == 'Se agregó exitosamente'){
            pdfComida(data.pdf);
        }
        
        callback(result);

    })
}

function compraBoletos(connection,data,callback){
    let loginQuery = "call AgregarCompraBoletos(?,?,?,?,?)"
    let querylogin = mysql.format(loginQuery,[data.idU,data.idC,data.precio,data.boletos,data.cantidad]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        if(result[0][0]['Mensaje'] == 'Se agregó correctamente'){
            pdfBoletos(data.pdf);
        }

        callback(result);

    })
}

function getHistorial(connection,data,callback){
    let loginQuery = "call  GetHistorialCompras(?)"
    let querylogin = mysql.format(loginQuery,[data.id]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}

function getCompra(connection,data,callback){
    let loginQuery = "call  GetDetallesCompra(?)"
    let querylogin = mysql.format(loginQuery,[data.id]);
    
    connection.query(querylogin,function(err,result){
        if(err) throw err;

        callback(result);

    })
}


module.exports = {Login,InsertUsuario,InsertPelicula,GetsPelicula,getUser,GetPelicula,changePelicula,getUsers,getUserLogin,changeUser,
    deleteUser,deletePelicula,registerUsuario,getsProducto,deleteProducto,getProductoBebida,getProductoCombo,getProductoComida,InsertProducto,
    changeProducto,getProducto,GetCartelera,addCartelera,asientosLibres,asientosCartelera,compraBoletos,compraProductos,getHistorial,
    getCompra,pdfBoletos,pdfComida}
