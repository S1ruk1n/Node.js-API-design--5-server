const dayjs = require("dayjs")
const { text } = require("express")
const express = require('express')
const app = express()
const port = 5500

let counter = 0 

app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.all('/*', (req,res,next) => {
    counter++
    log(req)
    next()
})

// Variablen


let device = [ 
    {
        deviceID:"D23A11K",
        Bezeichnung: "Steckdose",
        Groups: ["G2312A", "G63SL","G47KM"]
    },
    {
        deviceID:"D74AQQW",
        Bezeichnung: "Steckdose",
        Groups: ["G2312A", "G18LH"]
    },
    {
        deviceID: "Apple14",
        Bezeichnung: "Smartphone",
        Groups: ["S0145A"]
    }

    ]
//let deviceID = deviceID
let devID = [
    device['0'].deviceID,
    device['1'].deviceID,
    device['2'].deviceID
]

let GroupsID = [
    device['0'].Groups,
    device['1'].Groups,
    device['2'].Groups
]

app.get("/", (req, res) => { 
    res.send("Hello World")
})

app.get("/devices", (req, res) => { 
    res.send(device)
})

app.get("/device/*", (req, res) => { 
    res.send({deviceID: devID});
  })

app.post("/device/*", (req, res) => { 
    const newDev={
        deviceID : parseInt(req.body.deviceID),
        Bezeichnung : parseInt(req.body.Bezeichnung),
        Groups : req.body.Groups
    }
    device.push(newDev)
    res.send(device)

})  

app.put("/device/:id", (req, res) => { 
    const idx= device.findIndex(device => device.deviceID == req.params.devID)
    if(idx >= 0){
        const updated = {
            deviceID : req.params.devID,
            Bezeichnung : req.body.Bezeichnung,
            Groups : req.body.Groups
        }
        device.splice(idx,1,updated)
        res.send(device)
    }else{
        res.status(400).send(`Ändere die Daten eines Gerätes : ${req.params.devID}`)
    
    }
})

//löschen
app.delete("/device/*", (req, res) => { 
    res.send(devID)
})
  
app.delete("/devices", (req, res) => { 
    res.send("<h1> Alle geräte löschen <h1>")
})
  
// Groups

app.get("/groups", (req,res) =>{
    res.send(GroupsID)
})

app.get("/group/*", (req,res) =>{
    res.send(GroupsID)
})

app.post("/group", (req,res)=>{
    const newGroups={
        Groups : parseInt(req.body.Groups)
    }
    GroupsID.push(newGroups)
    res.send(GroupsID)
})

app.delete("/group/groupID", (req,res) =>{
    
    res.send(GroupsID)
})

app.delete("/groups", (req,res) =>{
    
    res.send(`${req.body.Groups}, wurde gelöscht`)
})

console.log(`läuft auf port, ${port}`)



app.listen(port, () => {
    console.log(`Express gestart, Port ${port}`)
  })
  
  
  
  
  
  
  app.all('/*', (req, res) => {  
    let time = dayjs().format('HH:mm:ss');
    let msg = `[REQUEST ${counter}] ${time} 
    HOST: ${req.headers.host}
    HTTP-Method: ${req.method} 
    URL:  ${req.originalUrl}
    Querry: ${ JSON.stringify( req.query)}
    Body: ${JSON.stringify(req.body)}\n`
  
    res.send( msg)
  })

  let log = (req) =>{
    let day = dayjs().format('DD.MM.YYYY')
    let time = dayjs().format('HH:mm:ss');
  
    let msg = `[AUFRUF ${counter}] ${time} 
    HTTP-Method: ${req.method} 
    URL:  ${req.originalUrl}
    Body: ${JSON.stringify(req.body)}\n`
    
    
    console.log(msg);
  }