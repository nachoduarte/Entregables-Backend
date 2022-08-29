const os = require('os')
const logger = require ('../services/logger.js')
const { fork } = require('child_process')
const path = require('path')


const nCpus = os.cpus().length
const args = process.argv

const informacion = async (req, res) => {
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
}


const numerosRandom = (req , res) => {
    logger.info('generando los numeros ramdom')
    const cant = Number(req.params.cant) || 100000000
    const computo = fork(path.resolve(process.cwd(), '../utils/pruebas/calculoRandom.js'))

    computo.on('message', result => {
        if (result == 'listo') {
            computo.send(cant)
        } else {
            res.send(result)
        }
    })
}

module.exports = {
    informacion,
    numerosRandom
}