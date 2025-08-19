document.addEventListener('DOMContentLoaded', function() {
    initializeGlossary();
    initializeEmojiToggle();
    initializeQuizzes();
    initializeReactions();
});

function initializeGlossary() {
    const terminos = document.querySelectorAll('.glosa');

    terminos.forEach(termino => {
        const existingTooltip = termino.querySelector('.glosa-tooltip');
        if (existingTooltip) existingTooltip.remove();

        const tooltip = document.createElement('span');
        tooltip.classList.add('glosa-tooltip');
        tooltip.textContent = termino.getAttribute('data-definicion');
        termino.appendChild(tooltip);

        termino.addEventListener('click', function(e) {
            e.preventDefault();
            const allTooltips = document.querySelectorAll('.glosa-tooltip');
            allTooltips.forEach(t => {
                t.style.visibility = 'hidden';
                t.style.opacity = '0';
            });
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            setTimeout(() => {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }, 3000);
        });
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
        if (palabra.nextElementSibling && palabra.nextElementSibling.classList.contains('emoji-icono')) {
            return;
        }

        const emoji = palabra.getAttribute('data-emoji');
        if (emoji) {
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji-icono');
            emojiSpan.textContent = emoji;

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

function initializeQuizzes() {
    const quizForms = document.querySelectorAll('.quiz-form');

    quizForms.forEach((form, formIndex) => {
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
                if (correctInput) {
                    correctInput.parentElement.classList.add('correct-answer');
                }
            }
        } else {
            if (correctInput) {
                correctInput.parentElement.classList.add('correct-answer');
            }
        }
    });

    showQuizResults(form, correctas, totalPreguntas);
}

function showQuizResults(form, correctas, total) {
    const resultadoDiv = form.nextElementSibling;
    const percentage = (correctas / total) * 100;

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

    setTimeout(() => {
        resultadoDiv.classList.add('show');
    }, 100);
    
    // Scroll to results
    resultadoDiv.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

function initializeReactions() {
    const reactionButtons = document.querySelectorAll('.reacciones button');

    reactionButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('clicked');

            // Remove animation class after animation completes
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);

            // Optional: Save reaction to localStorage
            const chapter = document.querySelector('h1').textContent;
            const reaction = this.textContent;
            saveReaction(chapter, reaction);
        });
    });
}

function saveReaction(chapter, reaction) {
    const reactions = JSON.parse(localStorage.getItem('bookReactions') || '{}');
    if (!reactions[chapter]) {
        reactions[chapter] = [];
    }
    reactions[chapter].push({
        reaction: reaction,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('bookReactions', JSON.stringify(reactions));
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


    resultadoDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

function initializeReactions() {
    const reactionContainers = document.querySelectorAll('.reacciones');
    reactionContainers.forEach(container => {
        const buttons = container.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
    });
}
