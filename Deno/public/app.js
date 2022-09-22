const API_URL = 'http://localhost:8080/color';

window.addEventListener('DOMContentLoaded', () => {
    traerColores();
})

const traerColores = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(colores => {
        renderResult(colores)
    })
}

const colorList = document.getElementById('colorList')

const renderResult = (colores) => {
    let colorHTML = "";
    colores.forEach(color => {
        colorHTML += `<li style="background-color:black; color: ${color.color};"> ${color.color} </li>`
    });

    colorList.innerHTML = colorHTML;
}

const guardarColor = () => {
    const formData = document.getElementById("colorAdd")
    const col = {
        color: formData.value
    }

    fetch(API_URL, {
        method:'POST',
        body: JSON.stringify(col),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then(() => {
        traerColores()
    })
}