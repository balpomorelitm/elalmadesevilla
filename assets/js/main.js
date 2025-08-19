function initializeGlossary() {
    const terminos = document.querySelectorAll('.glosa');

    terminos.forEach(termino => {
        // Remove existing tooltip if any
        const existingTooltip = termino.querySelector('.glosa-tooltip');
        if (existingTooltip) existingTooltip.remove();

        const tooltip = document.createElement('span');
        tooltip.classList.add('glosa-tooltip');
        tooltip.textContent = termino.getAttribute('data-definicion');
        termino.appendChild(tooltip);

        // Add click support for mobile
        termino.addEventListener('click', function(e) {
            e.preventDefault();
            const allTooltips = document.querySelectorAll('.glosa-tooltip');
            allTooltips.forEach(t => t.style.visibility = 'hidden');
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';

            // Hide after 3 seconds on mobile
            setTimeout(() => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }, 3000);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA EL GLOSARIO INTERACTIVO ---
    initializeGlossary();

    // --- LÓGICA PARA MOSTRAR/OCULTAR EMOJIS ---
    const emojiToggleButton = document.getElementById('emoji-toggle');
    if (emojiToggleButton) {
        let emojisVisibles = false;

        emojiToggleButton.addEventListener('click', function() {
            emojisVisibles = !emojisVisibles;
            const palabrasConEmoji = document.querySelectorAll('.emoji-word');

            if (emojisVisibles) {
                palabrasConEmoji.forEach(palabra => {
                    // Evita añadir emojis duplicados
                    if (!palabra.nextElementSibling || !palabra.nextElementSibling.classList.contains('emoji-icono')) {
                        const emoji = palabra.getAttribute('data-emoji');
                        const emojiSpan = document.createElement('span');
                        emojiSpan.classList.add('emoji-icono');
                        emojiSpan.textContent = emoji;
                        palabra.insertAdjacentElement('afterend', emojiSpan);
                    }
                });
            } else {
                document.querySelectorAll('.emoji-icono').forEach(icono => icono.remove());
            }
            
            this.textContent = emojisVisibles ? 'Ocultar Emojis 🙈' : 'Mostrar Emojis 💡';
        });
    }

    // --- LÓGICA GENÉRICA PARA TODOS LOS QUIZZES ---
    const quizForms = document.querySelectorAll('.quiz-form');
    quizForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let correctas = 0;
            const preguntas = form.querySelectorAll('.pregunta');
            
            preguntas.forEach((pregunta, index) => {
                const inputSeleccionado = pregunta.querySelector(`input[name="q${index + 1}"]:checked`);
                // Limpia estilos previos
                pregunta.querySelectorAll('label').forEach(label => label.style.color = 'inherit');

                if (inputSeleccionado) {
                    const labelSeleccionada = inputSeleccionado.parentElement;
                    if (inputSeleccionado.hasAttribute('data-correcta')) {
                        correctas++;
                        labelSeleccionada.style.color = 'green';
                    } else {
                        labelSeleccionada.style.color = 'red';
                    }
                }
            });

            const resultadoDiv = form.nextElementSibling;
            resultadoDiv.textContent = `Has acertado ${correctas} de ${preguntas.length} preguntas.`;
        });
    });
});
