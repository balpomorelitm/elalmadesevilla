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
                    const emoji = palabra.getAttribute('data-emoji');
                    const emojiSpan = document.createElement('span');
                    emojiSpan.classList.add('emoji-icono');
                    emojiSpan.textContent = emoji;
                    palabra.insertAdjacentElement('afterend', emojiSpan);
                });
            } else {
                document.querySelectorAll('.emoji-icono').forEach(icono => icono.remove());
            }
            
            this.textContent = emojisVisibles ? 'Ocultar Emojis 🙈' : 'Mostrar Emojis 💡';
        });
    }

    // --- LÓGICA PARA EL QUIZ DE COMPRENSIÓN ---
    const quizForm = document.getElementById('quiz-capitulo-1');
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let correctas = 0;
            const preguntas = quizForm.querySelectorAll('.pregunta');
            
            preguntas.forEach((pregunta, index) => {
                const inputSeleccionado = pregunta.querySelector(`input[name="q${index + 1}"]:checked`);
                if (inputSeleccionado && inputSeleccionado.hasAttribute('data-correcta')) {
                    correctas++;
                }
            });

            const resultadoDiv = document.getElementById('resultado-quiz-1');
            resultadoDiv.textContent = `Has acertado ${correctas} de ${preguntas.length} preguntas.`;
        });
    }
});
