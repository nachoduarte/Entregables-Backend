const {Router} = require('express')
const router = Router()
const args = process.argv
const { fork } = require('child_process')
const path = require('path')
const os = require('os')
const compression = require('compression')
const logger = require('../utils/logger.js')

const nCpus = os.cpus().length


//RUTA DE LA INFORMACION 

router.get('/info', async (req, res) => {
    logger.info('Accediendo a la informacion sin comprimir')
    res.render('info' , 
    {argumentoEntrada : args,
        sistemaOperativo: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage.rss(),
        pathEjecucion: process.execPath,
        processID: process.pid,
        CarpetaProyecto: args[1].split("/").pop(),
        procesadores: nCpus,
    })
})

router.get('/infozip', compression(), async (req, res) => {
    logger.info('Accediendo a la informacion comprimida')
    res.render('info' , 
    {argumentoEntrada : args,
        sistemaOperativo: process.platform,
        nodeVersion: process.version,
        rss: process.memoryUsage.rss(),
        pathEjecucion: process.execPath,
        processID: process.pid,
        CarpetaProyecto: args[1].split("/").pop(),
        procesadores: nCpus,
    })
})

//RUTA DE LA API RANDOM

router.get('/api/randoms/:cant?', (req , res) => {
    logger.info('generando los numeros ramdom sin comprimir')
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

router.get('/api/randomszip/:cant?', compression(), (req , res) => {
    logger.info('generando los numeros ramdom comprimidos')
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