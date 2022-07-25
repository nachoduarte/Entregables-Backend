function numerosRandom () {
    const numeroRandom = Math.floor(Math.random()*1000 + 1)
    return numeroRandom
}

let numeros = []
let arr = []
let handleArr = []
let cont = 1
let arrGenerado = []

const calculo = (num) => {
if (!isNaN(num)) {
    for (let i = 0; i < (num); i++) {
        numeros.push(numerosRandom())
}}

let arrNum = numeros.sort(function(a, b){return a - b})

for (let i = 0; i < arrNum.length; i++) {
    if (arrNum[i+1] == arrNum[i]){
        cont++
    } else {
        arr.push(arrNum[i])
        handleArr.push(cont)
        cont = 1
    }
}

for (let i = 0; i < arr.length; i++) {
    arrGenerado.push({Numero: arr[i], Repite: handleArr[i]})
}
    return arrGenerado
}

process.on('exit', () => {
    console.log(`worker #${process.pid} cerrado`)
})

process.on('message', msg => {
    console.log(`worker #${process.pid} iniciando su tarea`)
    const numeroRandom = calculo(msg)
    process.send(numeroRandom)
    console.log(`worker #${process.pid} finalizó su trabajo`)
    process.exit()
})

process.send('listo')