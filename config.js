module.exports = {

    database: {
        host: process.env.DBHOST || "us-cdbr-east-05.cleardb.net",
        user: process.env.DBUSER || "b7af72ef51bc8c",
        password: process.env.DBPASSWORD || "bb6d67f2",
        database: process.env.DBDATABASE || "heroku_d23e98632d70552"
    }

}