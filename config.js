module.exports = {

    database: {
        host: process.env.DBHOST || "localhost",
        user: process.env.DBUSER || "root",
        password: process.env.DBPASSWORD || "root",
        database: process.env.DBDATABASE || "cinepolis"
    }

}