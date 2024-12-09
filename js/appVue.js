var appVue = new Vue({
    el: "#appVue",
    data: {
        nombre: '',
        email: '',
        telefono: '',
        twitter: '',
        // Contactos por defecto
        contactos: [
            {
                nombre: "Elon Musk",
                email: "info@spacex.com",
                telefono: 90346628,
                twitter: "elonmusk"
            },
            {
                nombre: "Gukesh D",
                email: "contact@gukeshchess.com",
                telefono: 987654323,
                twitter: "DGukesh"
            }
        ],
        invertido: false
    },
    methods: {
        guardarContacto: function(event) {
            if (this.invertido) {
                // Añadir el contacto al principio de la lista y vaciar los inputs
                this.contactos.unshift( { nombre: this.nombre, email: this.email, telefono: this.telefono, twitter: this.twitter} );
            } else {
                // Añadir el contacto al final y vaciar los inputs
                this.contactos.push( { nombre: this.nombre, email: this.email, telefono: this.telefono, twitter: this.twitter} );
            }
            this.nombre = '';
            this.email = '';
            this.telefono = '';
            this.twitter = '';
            this.actualizarJSONLD();
        },
        borrarContacto: function(pos) {
            this.contactos.splice(pos, 1);
            this.actualizarJSONLD();
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
            this.actualizarJSONLD();
        },
        texto() {
            return this.invertido ? "Por Antigüedad" : "Por Reciente"; 
        },
        // Método para actualizar JSON-LD con los contactos de la agenda:
        actualizarJSONLD() {
            // Generar el JSON-LD con la lista de contactos
            const jsonLdData = {
                "@context": "http://schema.org",
                "@type": "WebPage",
                "name": "AgendaVue",
                "description": "Agenda básica en Vue",
                "author": {
                    "@type": "Organization",
                    "name": "iwbi14",
                    "email": "info@iwbi14.com"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "AgendaVue",
                    "url": "http://IW-BI-14.com"
                },
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": this.contactos.map(contacto => ({
                        "@type": "Person",
                        "name": contacto.nombre,
                        "email": contacto.email,
                        "telephone": contacto.telefono,
                        "sameAs": `https://twitter.com/${contacto.twitter}`
                    }))
                }
            };

            // Actualizar el JSON-LD en el DOM
            const script = document.querySelector('script[type="application/ld+json"]');
            script.textContent = JSON.stringify(jsonLdData, null, 2); // Actualizar el script
        }
    },
    computed: {
        isInvalid() { // El twitter da igual, es opcional
            return this.nombre.length === 0 || this.email.length === 0 || !this.telValido(this.telefono);
        }
    },
    // Cuando se monte la agenda
    mounted() {
        this.actualizarJSONLD(); //Inicializar el JSON-LD
    }
})