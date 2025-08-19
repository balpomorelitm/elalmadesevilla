document.addEventListener('DOMContentLoaded', function() {
    initializeGlossary();
    initializeEmojiToggle();
    initializeQuizzes();
    initializeReactions();
});

function initializeGlossary() {
    const terminos = document.querySelectorAll('.glosa');
    terminos.forEach(termino => {
        const tooltip = document.createElement('span');
        tooltip.classList.add('glosa-tooltip');
        tooltip.textContent = termino.getAttribute('data-definicion');
        termino.appendChild(tooltip);
    });
}

function initializeEmojiToggle() {
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
}

function initializeQuizzes() {
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
}

function initializeReactions() {
    const reactionButtons = document.querySelectorAll('.reacciones button');
    reactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            let countSpan = button.querySelector('.reaction-count');
            if (!countSpan) {
                countSpan = document.createElement('span');
                countSpan.classList.add('reaction-count');
                countSpan.textContent = '1';
                button.appendChild(document.createTextNode(' '));
                button.appendChild(countSpan);
            } else {
                countSpan.textContent = parseInt(countSpan.textContent, 10) + 1;
            }
        });
    });
}
