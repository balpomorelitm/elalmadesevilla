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
    initializeEmojiToggle();

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
    
    // Reset previous classes
    resultadoDiv.classList.remove('perfect', 'good', 'needs-improvement', 'show');
    
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
}
