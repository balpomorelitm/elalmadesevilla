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
    initializeEmojiToggle();

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

function initializeEmojiToggle() {
    const emojiToggleButton = document.getElementById('emoji-toggle');
    if (!emojiToggleButton) return;

    let emojisVisibles = false;

    emojiToggleButton.addEventListener('click', function() {
        emojisVisibles = !emojisVisibles;
        const palabrasConEmoji = document.querySelectorAll('.emoji-word');

        if (emojisVisibles) {
            showEmojis(palabrasConEmoji);
            this.innerHTML = 'Ocultar Emojis 🙈';
        } else {
            hideEmojis();
            this.innerHTML = 'Mostrar Emojis 💡';
        }
    });
}

function showEmojis(palabrasConEmoji) {
    palabrasConEmoji.forEach((palabra, index) => {
        // Avoid duplicate emojis
        if (palabra.nextElementSibling && palabra.nextElementSibling.classList.contains('emoji-icono')) {
            return;
        }

        const emoji = palabra.getAttribute('data-emoji');
        if (emoji) {
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji-icono');
            emojiSpan.textContent = emoji;

            // Add staggered animation delay
            emojiSpan.style.animationDelay = `${index * 0.1}s`;

            palabra.insertAdjacentElement('afterend', emojiSpan);
        }
    });
}

function hideEmojis() {
    const emojis = document.querySelectorAll('.emoji-icono');
    emojis.forEach((emoji, index) => {
        emoji.classList.add('removing');
        emoji.style.animationDelay = `${index * 0.05}s`;

        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.remove();
            }
        }, 300 + (index * 50));
    });
}
