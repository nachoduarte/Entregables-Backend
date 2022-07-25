const socket = io.connect()

//SCHEMA DE DENORMALIZACION 

const author = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})

const mensajeria = new normalizr.schema.Entity('messages', {authores: author},{idAttribute: 'id'})

const schemaChat = new normalizr.schema.Entity('mensajes', {mensajes: [mensajeria]},{idAttribute: 'id'})

function addMessage(e) {
    //preventDefault(e)
    const fecha = new Date()
    const date = fecha.toLocaleDateString()
    const hour = fecha.toLocaleTimeString()
    const messages = {
        author:{
            email: document.getElementById("email").value,
            nombre: document.getElementById('nombreUsuario').value,
            apellido: document.getElementById('apellidoUsuario').value,
            edad: document.getElementById('edadUsuario').value,
            alias: document.getElementById('aliasUsuario').value,
            avatar: document.getElementById('fotoUsuario').value
        },
        date: date,
        hour: hour,
        message: document.getElementById("text").value
    }
    socket.emit("new-message", messages);
    return false
}

socket.on("messages", chatNormalizado => {

    const chatDesnormalizado = normalizr.denormalize(chatNormalizado.result, schemaChat, chatNormalizado.entities)

    const mensajes = chatDesnormalizado.mensajes

    const tamanoNormalizado = JSON.stringify(chatNormalizado).length
    const tamanoDesnormalizado = JSON.stringify(chatDesnormalizado).length

    const porcentaje = ((tamanoNormalizado-tamanoDesnormalizado)/tamanoDesnormalizado*100)

    const porcentajeChat = `<div>Porcentaje de comprimido: ${Math.round(porcentaje)} %</div>`

    document.getElementById("porcentajeNormalizado").innerHTML = porcentajeChat

    const html = mensajes.map((elem) => {
        return (`<div><spam class="fw-bolder text-primary m-2"> ${elem.author.email}</spam><spam style="color: brown;">[${elem.date}  ${elem.hour}]</spam> <spam class="fst-italic text-success m-2"> ${elem.message} </spam>  <spam class="m-2"><img width="50" src=${elem.author.avatar} alt="not found"></spam></div>`)
    })
            .join("  ")
        document.getElementById("messages").innerHTML = html
    })