const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: "data",
    user: "root",
    password: "root",
    database: "database"
})

connection.connect(() => {
    const createTable = `create table if not exists people (name VARCHAR(255))`
    connection.query(createTable)
})

const createPerson = `insert into people (name) values ('Anderson')`

connection.query(createPerson)

app.get('/', (req, res) => {
    const query = `select * from people`
    connection.query(query, (error, results) => {
        for(let result of results) {
            res.send(`
                <h1>FullCycle Rocks!!</h1>
                <p>${result["name"]}</p>
            `)
        }
    });
    connection.end()
})

app.listen(3000, () => {
    console.log('Server Running.')
})
