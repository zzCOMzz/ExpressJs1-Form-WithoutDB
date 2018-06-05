const express   = require('express');
const app       = express()
const path      = require('path')
const Joi       = require('joi')
const bodyParser= require('body-parser')

const users = [{"id":"1", "nama":"irvan"}];
app.use(bodyParser())
app.use(express.json())

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname+'/index.html'))
})
//?#############################################################################################
//* formUser
app.get('/form/user',(req,res)=>{
  res.status(200).sendFile(path.join(__dirname+'/public/form.html'));
})

app.get('/data/users',(req,res)=>{
  res.status(200).send(users)
})

app.post('/data/users',(req,res)=>{
  const {error} = validateUsers(req.body)

  if(error) return res.status(404).send(error.details[0].message)

  const user = {
    id : users.length + 1,
    nama : req.body.nama
  }

  users.push(user)
  res.send("<h3>Data Berhasil diinput</h3>");
  
})

function validateUsers(user){
  const Valid= {
    nama : Joi.string().min(6).required()
  }
  return Joi.validate(user, Valid)
}
//?##############################################################################################
app.get(/^(.+)$/,(req,res)=>{
  res.status(404).sendFile(__dirname+'/404.html')
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
  console.log(`Running on http://127.0.0.1:${port}`)
})