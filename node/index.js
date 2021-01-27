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

const createTable = `create table if not exists people (name VARCHAR(255))`
connection.query(createTable)

app.listen(3000, () => {
	console.log(`Server running`)
})

app.get('/', async (req, res) => {
    const createPerson = `insert into people (name) values ('Anderson')`
    await connection.query(createPerson)
    const query = `select * from people`
    await connection.query(query, (error, results) => {
        for(let result of results) {
            res.end(`
                <h1>FullCycle Rocks!!</h1>
                <p>${result["name"]}</p>
            `)
        }
    });
    connection.end()
})
