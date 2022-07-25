const {Router} = require('express')
const router = Router()
const args = process.argv
const { fork } = require('child_process')
const path = require('path')
const os = require('os')

const nCpus = os.cpus().length


//RUTA DE LA INFORMACION 

router.get('/info', async (req, res) => {
    res.render('info' , 
    {argumentoEntrada : args,
        sistemaOperativo: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage.rss(),
        pathEjecucion: process.execPath,
        processID: process.pid,
        CarpetaProyecto: args[1].split("/").pop(),
        procesadores: nCpus
    })
})

//RUTA DE LA API RANDOM

router.get('/api/randoms/:cant?', (req , res) => {

    const cant = Number(req.params.cant) || 100000000
    const computo = fork(path.resolve(process.cwd(), './api/calculoRandom.js'))

    computo.on('message', result => {
        if (result == 'listo') {
            computo.send(cant)
        } else {
            res.send(result)
        }
    })
})



module.exports = router;