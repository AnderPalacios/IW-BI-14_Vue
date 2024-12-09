var appVue = new Vue({
    el: "#appVue",
    data: {
        nombre: '',
        email: '',
        telefono: '',
        contactos: [
            {
                nombre: "Elon Musk",
                email: "info@spacex.com",
                telefono: 90346628
            },
            {
                nombre: "Gukesh D",
                email: "contact@gukeshchess.com",
                telefono: 987654323
            }
        ],
        invertido: false
    },
    methods: {
        guardarContacto: function(event) {
            if (this.invertido) {
                // Añadir el contacto al principio de la lista y vaciar los inputs
                this.contactos.unshift( { nombre: this.nombre, email: this.email, telefono: this.telefono} );
                this.nombre = '';
                this.email = '';
                this.telefono = '';
            } else {
                // Añadir el contacto al final y vaciar los inputs
                this.contactos.push( { nombre: this.nombre, email: this.email, telefono: this.telefono} );
                this.nombre = '';
                this.email = '';
                this.telefono = '';
            }
        },
        borrarContacto: function(pos) {
            this.contactos.splice(pos, 1);
        },
        telValido(phone) {
            // Para comprobar que es un número y no está vacío (para guardar el Contacto)
            return !isNaN(phone) && phone.toString().trim().length > 0;
        },
        // Métodos para ordenar:
        porAntiguedad() { //Al añadir un nuevo contacto se coloca al final de la lista de contactos
            if (this.invertido) {
            this.contactos.reverse();  // Volver al estado original
            } else {
                this.contactos.reverse();  // Invertir el array de contactos
            }
            this.invertido = !this.invertido;  // Cambiar el estado de la bandera
        },
        texto() {
            return this.invertido ? "Por Antigüedad" : "Por Reciente"; 
        },
        porNombre() {
            this.contactos.sort((a, b) => a.nombre.localeCompare(b.nombre));  // Ordenar por nombre alfabéticamente
        }
    },
    computed: {
        isInvalid() {
            return this.nombre.length === 0 || this.email.length === 0 || !this.telValido(this.telefono);
        }
    }
})