class Usuario{
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        console.log(`El usuario es ${this.nombre} ${this.apellido}`)
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        console.log(`El usuario posee ${this.mascotas.length} mascotas`)
    }

    addBook(libro, autor){
        this.libros.push({nombre: libro, autor: autor});
    }

    getBookNames(){
        return this.libros.map((libro) =>{
            return libro.nombre;
        });
    }

}

let usuario = new Usuario("Nacho", "Duarte", [{nombre: "Watchmen", autor:"Alan Moore"}, {nombre: "IT", autor: "Stephen King"}], ["Gato", "Perro", "Hamster"])

usuario.getFullName();
usuario.addMascota("Pato");
console.log(usuario.mascotas);
usuario.countMascotas();
usuario.addBook("Maus", "Art Spiegelman");
console.log(usuario.getBookNames());
