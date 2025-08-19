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

    // --- LÓGICA AVANZADA PARA QUIZZES ---
    initializeQuizzes();
});

function initializeQuizzes() {
    const quizForms = document.querySelectorAll('.quiz-form');
    
    quizForms.forEach((form, formIndex) => {
        // Add submit button class
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('quiz-submit-btn');
        }
        
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            handleQuizSubmission(form, formIndex);
        });
    });
}

function handleQuizSubmission(form, formIndex) {
    let correctas = 0;
    const preguntas = form.querySelectorAll('.pregunta');
    const totalPreguntas = preguntas.length;
    
    // Reset previous styling
    form.querySelectorAll('label').forEach(label => {
        label.classList.remove('correct', 'incorrect', 'correct-answer');
    });
    
    preguntas.forEach((pregunta, index) => {
        const questionName = `q${index + 1}`;
        const inputSeleccionado = pregunta.querySelector(`input[name="${questionName}"]:checked`);
        const correctInput = pregunta.querySelector(`input[data-correcta="true"]`);
        const allInputs = pregunta.querySelectorAll(`input[name="${questionName}"]`);
        
        if (inputSeleccionado) {
            const labelSeleccionada = inputSeleccionado.parentElement;
            
            if (inputSeleccionado.hasAttribute('data-correcta')) {
                correctas++;
                labelSeleccionada.classList.add('correct');
            } else {
                labelSeleccionada.classList.add('incorrect');
                // Show correct answer
                if (correctInput) {
                    correctInput.parentElement.classList.add('correct-answer');
                }
            }
        } else {
            // No answer selected, show correct answer
            if (correctInput) {
                correctInput.parentElement.classList.add('correct-answer');
            }
        }
    });
    
    // Show results with animation and feedback
    showQuizResults(form, correctas, totalPreguntas);
}

function showQuizResults(form, correctas, total) {
    const resultadoDiv = form.nextElementSibling;
    const percentage = (correctas / total) * 100;
    
    let message = `Has acertado ${correctas} de ${total} preguntas (${percentage.toFixed(0)}%)`;
    let feedback = '';
    let cssClass = '';
    
    if (percentage === 100) {
        feedback = ' ¡Perfecto! 🎉';
        cssClass = 'perfect';
    } else if (percentage >= 70) {
        feedback = ' ¡Muy bien! 👏';
        cssClass = 'good';
    } else if (percentage >= 50) {
        feedback = ' Bien, pero puedes mejorar 📚';
        cssClass = 'good';
    } else {
        feedback = ' Necesitas repasar más 💪';
        cssClass = 'needs-improvement';
    }
    
    resultadoDiv.textContent = message + feedback;
    resultadoDiv.className = `resultado-quiz ${cssClass}`;
    
    // Trigger animation
    setTimeout(() => {
        resultadoDiv.classList.add('show');
    }, 100);
    
    // Scroll to results
    resultadoDiv.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}
