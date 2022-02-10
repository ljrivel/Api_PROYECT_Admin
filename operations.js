const mysql = require('mysql');



//----------------------------|
//                            |
// Funciones de tabla Usuario |
//                            |
//----------------------------|
function InsertUsuario(connection,data,callback){
    
    let insertQuery =
        "INSERT INTO Usuario (TipoUsuario,NumeroCedula,Nombre,Apellido1,Apellido2,FechaNacimiento,Edad,Email,Password,EsquemaVacunacion) VALUES (?,?,?,?,?,?,?,?,?,?)"
        let queryusers = mysql.format(insertQuery,[data.TipoUsuario,data.Cedula,data.Nombre,data.Apellido1,data.Apellido2,data.FechaNacimiento,data.Edad,data.Email,data.Password,data.EsquemaVacunacion]);

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

//-----------------------------|
//                             |
// Funciones de tabla Pelicula |
//                             |
//-----------------------------|

function InsertPelicula(connection,data,callback){
    let insertQuery =
        "INSERT INTO Pelicula (Titulo,Director,YearPublicacion,EdadRequerida) VALUES (?,?,?,?)"
        let queryPeli = mysql.format(insertQuery,[data.Titulo,data.Director,data.Year,data.Edad]);

        connection.query(queryPeli,function(err,result){
            if(err) throw err;
            callback(result);
        })

}

//----------------------------|
//                            |
// Funciones de tabla Genero  |
//                            |
//----------------------------|

function InsertGenero(connection,Nombre,callback){
    let insertQuery = "INSERT INTO Genero(Nombre) Values (?)"
        let queryGenero = mysql.format(insertQuery,[Nombre])

        connection.query(queryGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}

function GetsGenero(connection,callback){
    let insertQuery = "Select * from Genero"
        let queryGenero = mysql.format(insertQuery)

        connection.query(queryGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}

//----------------------------|
//                            |
// Funciones de tabla Idioma  |
//                            |
//----------------------------|

function InsertIdioma(connection,Nombre,callback){
    let insertQuery = "INSERT INTO Idioma(Nombre) Values (?)"
        let queryGenero = mysql.format(insertQuery,[Nombre])

        connection.query(queryGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}

function GetsIdioma(connection,callback){
    let insertQuery = "Select * from Idioma"
        let queryGenero = mysql.format(insertQuery)

        connection.query(queryGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}

//----------------------------|
//                            |
// Funciones de tabla Actor   |
//                            |
//----------------------------|

function InsertActor(connection,Nombre,callback){
    let insertQuery = "INSERT INTO Actor(Nombre) Values (?)"
        let queryGenero = mysql.format(insertQuery,[Nombre])

        connection.query(queryGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}

function GetsActor(connection,callback){
    let insertQuery = "Select * from Actor"
        let queryGenero = mysql.format(insertQuery)

        connection.query(queryGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}




//------------------------------------|
//                                    |
// Funciones de tabla PeliculaxGenero |
//                                    |
//------------------------------------|

function InsertPeliculaxGenero(connection,data,callback){
    let insertQuery = "INSERT INTO Genero(Nombre) Values (?)"
}


module.exports = {Login,InsertUsuario,InsertPelicula,InsertPeliculaxGenero,InsertGenero,GetsGenero,InsertIdioma,GetsIdioma}
