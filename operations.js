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

function getUser(connection,data,callback){ 
    const user = data.Usuario;
    let loginQuery = "SELECT * FROM usuario WHERE Email =?"
    let querylogin = mysql.format(loginQuery,[user]);
    
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
        "INSERT INTO Pelicula (Titulo,Director,YearPublicacion,EdadRequeridad) VALUES (?,?,?,?)"
        let queryPeli = mysql.format(insertQuery,[data.Titulo,data.Director,data.Year,data.Edad]);

        connection.query(queryPeli,function(err,result){
            if(err) throw err;
            callback(result);
        })

}

function GetsPelicula(connection,callback){
    let insertQuery = "Select * from Pelicula"
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
    let insertQuery = "INSERT INTO GenerosXPelicula(idPelicula,idGenero) Values (?,?)"
        let queryPxG = mysql.format(insertQuery,[data.idP,data.idG])

        connection.query(queryPxG,function(err,result){
            if(err) throw err;
            callback(result);
        })
}


//funcion en veremos:
function GetsPeliculasxGenero(connection,data,callback){
    //callback(data)
    let GetsQuery = "Select * from GenerosxPelicula INNER JOIN Genero ON GenerosxPelicula.idGenero = Genero.idGenero"
        let queryPeliculaxGenero = mysql.format(GetsQuery,[data])

        connection.query(queryPeliculaxGenero,function(err,result){
            if(err) throw err;
            callback(result);
        })
}


module.exports = {Login,InsertUsuario,InsertPelicula,InsertPeliculaxGenero,InsertGenero,GetsGenero,InsertIdioma,GetsIdioma,InsertActor,
    GetsActor,InsertPeliculaxGenero,GetsPelicula,GetsPeliculasxGenero,getUser,GetPelicula}
