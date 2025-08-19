document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA PARA EL GLOSARIO INTERACTIVO ---
    const terminos = document.querySelectorAll('.glosa');
    terminos.forEach(termino => {
        const tooltip = document.createElement('span');
        tooltip.classList.add('glosa-tooltip');
        tooltip.textContent = termino.getAttribute('data-definicion');
        termino.appendChild(tooltip);
    });

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
                const labels = pregunta.querySelectorAll('label');
                // Limpia estilos previos
                labels.forEach(label => {
                    label.classList.remove('correct', 'incorrect', 'correct-answer');
                });

                if (inputSeleccionado) {
                    const labelSeleccionada = inputSeleccionado.parentElement;
                    if (inputSeleccionado.hasAttribute('data-correcta')) {
                        correctas++;
                        labelSeleccionada.classList.add('correct');
                    } else {
                        labelSeleccionada.classList.add('incorrect');
                        const correcta = pregunta.querySelector('input[data-correcta]');
                        if (correcta) {
                            correcta.parentElement.classList.add('correct-answer');
                        }
                    }
                }
            });

            const resultadoDiv = form.nextElementSibling;
            const total = preguntas.length;
            resultadoDiv.classList.remove('perfect', 'good', 'needs-improvement', 'show');

            let mensaje = `Has acertado ${correctas} de ${total} preguntas.`;
            if (correctas === total) {
                resultadoDiv.classList.add('perfect');
                mensaje = '¡Perfecto! Has acertado todas las preguntas.';
            } else if (correctas >= total / 2) {
                resultadoDiv.classList.add('good');
            } else {
                resultadoDiv.classList.add('needs-improvement');
            }

            resultadoDiv.textContent = mensaje;
            resultadoDiv.classList.add('show');
        });
    });
});
