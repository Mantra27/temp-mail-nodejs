const {getEmailAdd, getEmailMsg} = require('./back-end')
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors);
app.use(express());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send({server:"live"})
})

app.post('/', (req, res)=>{
    console.log(req.body);
})

getEmailAdd().then((e)=>{
    console.log(e)
})

app.listen(3000, ()=>{
    console.log('listening to Port: 3000')
})
