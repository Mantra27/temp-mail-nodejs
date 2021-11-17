const {getEmailAdd, getEmailMsg} = require('./back-end')
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.get('/', (req, res)=>{
    res.send({server:"live", apis:["https://temp-email-api.mantragohil.repl.co/v1/gen", "https://temp-email-api.mantragohil.repl.co/v1/mailbox"]})
})

app.get('/v1/gen', (req,res)=>{
  res.send({msg:"this api is listening to requests, resolving with random emails"})
})

app.get('/v1/', (req,res)=>{
  res.send({msg:["/v1/gen","/v1/mailbox"]})
})

app.get('/v1/mailbox', (req,res)=>{
  res.send({msg:"this api is listening to your given email's mailbox"})
})

app.get('*/', (req,res)=>{
  res.send({msg:"wrong page"})
})

app.post('/v1/gen', async  (req, res)=>{
    getEmailAdd().then((msg)=>{
        msg = msg.replace(`"`, "")
        msg = msg.replace(`"`, "")
        console.log(msg);
        return res.json({data:msg});
    })
})

app.post('/v1/mailbox', async  (req, res)=>{
   let [username, domain] = [req.body.username, req.body.domain];
   await getEmailMsg(username, domain).then(async (msg)=>{
       console.log(msg)
       return res.json({mails:msg});
   })
  
})

app.listen(4000, ()=>{
    console.log('listening to Port: 4000')
})
