var urlApi = 'http://www.raydelto.org/agenda.php';

// Cargar contactos al abrir la pagina
window.onload = function() {
    cargarContactos();
};

// Funcion para obtener los contactos mediante HTTP GET
function cargarContactos() {
    fetch(urlApi)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            var tbody = document.getElementById('contact-list');
            tbody.innerHTML = '';

            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No hay contactos registrados</td></tr>';
                return;
            }

            for (var i = 0; i < data.length; i++) {
                var contacto = data[i];
                var fila = document.createElement('tr');
                
                fila.innerHTML = '<td>' + (contacto.nombre || '') + '</td>' +
                                 '<td>' + (contacto.apellido || '') + '</td>' +
                                 '<td>' + (contacto.telefono || '') + '</td>';
                
                tbody.appendChild(fila);
            }
        })
        .catch(function(error) {
            console.error('Error al obtener los contactos:', error);
        });
}

// Enviar nuevo contacto mediante HTTP POST
var formulario = document.getElementById('contact-form');
formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    var nombreInput = document.getElementById('nombre').value;
    var apellidoInput = document.getElementById('apellido').value;
    var telefonoInput = document.getElementById('telefono').value;

    var nuevoContacto = {
        nombre: nombreInput,
        apellido: apellidoInput,
        telefono: telefonoInput
    };

    fetch(urlApi, {
        method: 'POST',
        body: JSON.stringify(nuevoContacto)
    })
    .then(function(response) {
        return response.text();
    })
    .then(function() {
        formulario.reset();
        cargarContactos();
        alert('¡Contacto guardado exitosamente!');
    })
    .catch(function(error) {
        console.error('Error al guardar el contacto:', error);
        alert('Ocurrió un error al intentar guardar.');
    });
});