document.addEventListener('DOMContentLoaded', function() {
    fetch('countries.json')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('prefix');
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.phoneCode;
                option.textContent = `${country.nameES} (+${country.phoneCode})`;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar los países:', error);
        });

    const phoneNumberInput = document.getElementById('whatsapp-number');

    phoneNumberInput.addEventListener('input', function(event) {
        let inputValue = this.value;

        // Verificar si se ha ingresado el símbolo "+"
        if (inputValue.includes('+')) {
            alert('El prefijo de país debe ingresarse en el campo de selección de país.');
            inputValue = inputValue.replace(/\+/g, ''); // Eliminar el símbolo "+" del input
        }

        // Permitir solo números y espacios en el input
        this.value = inputValue.replace(/[^\d\s]/g, '');
    });
});

function generateLink() {
    const prefix = document.getElementById('prefix').value;
    let number = document.getElementById('whatsapp-number').value;
    const message = encodeURIComponent(document.getElementById('message').value);

    // Sanitizar el número eliminando todos los espacios
    const sanitizedNumber = number.replace(/\D/g, '');

    // Actualizar el campo de entrada con el número sanitizado
    document.getElementById('whatsapp-number').value = sanitizedNumber;

    if (prefix && sanitizedNumber) {
        const waLink = `https://wa.me/${prefix}${sanitizedNumber}?text=${message}`;
        const resultDiv = document.getElementById('result');
        const waLinkInput = document.getElementById('waLink');
        waLinkInput.value = waLink;
        resultDiv.style.display = 'block';
    } else {
        alert('Por favor, complete el código de país y el número de teléfono.');
    }
}

function copyLink() {
    const waLinkInput = document.getElementById('waLink');
    waLinkInput.select();
    waLinkInput.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('¡Enlace copiado al portapapeles!');
}

function openLink() {
    const waLink = document.getElementById('waLink').value;
    window.open(waLink, '_blank');
}
