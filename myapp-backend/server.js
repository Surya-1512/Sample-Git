const express = require ('express');
const cors= require('cors'); 
const bodyParser=require('body-parser');
const mysql=require('mysql2');

const app=express();
const port=5000;
app.use(cors());
app.use(bodyParser.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'nodereact'
});

db.connect((err)=>{
    if(err) throw err;
    console.log("Connected to nodereact database");
});

app.get('/users',(req,res)=>{
    db.query('SELECT * FROM users',(err,results)=>{
        if(err) throw err;
        res.json(results);
    });
});

app.post('/users',(req,res)=>{
    const user=req.body;
    db.query("INSERT INTO users set ?",user,(err,result)=>{
        if(err) throw err;
        res.json({id:result.insertId,...user});
    });
});

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});