document.addEventListener('DOMContentLoaded', function() {
    initializeEmojiToggle();
    initializeGlossaryClick(); // Nueva función para glosas con click
    initializeQuizzes();
    initializeReactions();
    createGlossaryPanel(); // Crear panel de glosas
});

// NUEVA FUNCIONALIDAD: Glosas con click en lugar de hover
function initializeGlossaryClick() {
    const terminos = document.querySelectorAll('.glosa');
    
    terminos.forEach(termino => {
        termino.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase clicked de otras glosas
            document.querySelectorAll('.glosa.clicked').forEach(g => {
                if (g !== this) g.classList.remove('clicked');
            });
            
            // Toggle clicked state
            this.classList.toggle('clicked');
            
            const word = this.textContent;
            const definition = this.getAttribute('data-definicion');
            
            if (this.classList.contains('clicked')) {
                showGlossaryDefinition(word, definition);
            } else {
                hideGlossaryDefinition();
            }
        });
    });
    
    // Cerrar glosa al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.glosa') && !e.target.closest('.glosa-panel')) {
            hideGlossaryDefinition();
            document.querySelectorAll('.glosa.clicked').forEach(g => {
                g.classList.remove('clicked');
            });
        }
    });
}

// Crear panel de glosas al pie
function createGlossaryPanel() {
    const panel = document.createElement('div');
    panel.classList.add('glosa-panel');
    panel.innerHTML = `
        <button class="close-btn" onclick="hideGlossaryDefinition()">&times;</button>
        <div class="glosa-word"></div>
        <div class="glosa-definition"></div>
    `;
    document.body.appendChild(panel);
}

// Mostrar definición en el panel
function showGlossaryDefinition(word, definition) {
    const panel = document.querySelector('.glosa-panel');
    const wordElement = panel.querySelector('.glosa-word');
    const definitionElement = panel.querySelector('.glosa-definition');
    
    wordElement.textContent = word;
    definitionElement.textContent = definition;
    
    panel.classList.add('show');
}

// Ocultar definición
function hideGlossaryDefinition() {
    const panel = document.querySelector('.glosa-panel');
    panel.classList.remove('show');
}

// FUNCIONALIDAD RENOVADA: Emojis con click en lugar de toggle global
function initializeEmojiToggle() {
    const emojiToggleButton = document.getElementById('emoji-toggle');
    if (!emojiToggleButton) return;
    
    let globalEmojiMode = false;
    
    // Funcionalidad del botón global (mantener para compatibilidad)
    emojiToggleButton.addEventListener('click', function() {
        globalEmojiMode = !globalEmojiMode;
        const palabrasConEmoji = document.querySelectorAll('.emoji-word');
        
        if (globalEmojiMode) {
            showAllEmojis(palabrasConEmoji);
            this.innerHTML = 'Ocultar Emojis 🙈';
        } else {
            hideAllEmojis();
            this.innerHTML = 'Mostrar Emojis 💡';
        }
    });
    
    // NUEVA FUNCIONALIDAD: Click individual en palabras emoji
    const palabrasConEmoji = document.querySelectorAll('.emoji-word');
    palabrasConEmoji.forEach(palabra => {
        palabra.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle individual emoji
            const existingEmoji = this.nextElementSibling;
            if (existingEmoji && existingEmoji.classList.contains('emoji-icono')) {
                // Remover emoji existente
                this.classList.remove('clicked');
                existingEmoji.classList.add('removing');
                setTimeout(() => {
                    if (existingEmoji.parentNode) {
                        existingEmoji.remove();
                    }
                }, 300);
            } else {
                // Añadir emoji
                const emoji = this.getAttribute('data-emoji');
                if (emoji) {
                    this.classList.add('clicked');
                    const emojiSpan = document.createElement('span');
                    emojiSpan.classList.add('emoji-icono');
                    emojiSpan.textContent = emoji;
                    this.insertAdjacentElement('afterend', emojiSpan);
                }
            }
        });
    });
}

// Mostrar todos los emojis (función del botón global)
function showAllEmojis(palabrasConEmoji) {
    palabrasConEmoji.forEach((palabra, index) => {
        // Evitar emojis duplicados
        if (palabra.nextElementSibling && palabra.nextElementSibling.classList.contains('emoji-icono')) {
            return;
        }
        
        const emoji = palabra.getAttribute('data-emoji');
        if (emoji) {
            palabra.classList.add('clicked');
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji-icono');
            emojiSpan.textContent = emoji;
            
            // Animación escalonada
            emojiSpan.style.animationDelay = `${index * 0.1}s`;
            
            palabra.insertAdjacentElement('afterend', emojiSpan);
        }
    });
}

// Ocultar todos los emojis
function hideAllEmojis() {
    const emojis = document.querySelectorAll('.emoji-icono');
    const palabrasConEmoji = document.querySelectorAll('.emoji-word.clicked');
    
    // Remover clase clicked de las palabras
    palabrasConEmoji.forEach(palabra => {
        palabra.classList.remove('clicked');
    });
    
    // Animar salida de emojis
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

// SISTEMA DE QUIZZES (sin cambios, pero limpio)
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

// SISTEMA DE REACCIONES
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

// OPTIMIZACIÓN DE RENDIMIENTO
function optimizeLoading() {
    // Lazy load images if any
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Preload next chapter
    const currentChapter = window.location.pathname.match(/capitulo-(\d+)/);
    if (currentChapter) {
        const nextChapter = parseInt(currentChapter[1]) + 1;
        if (nextChapter <= 10) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = `capitulo-${nextChapter}.html`;
            document.head.appendChild(link);
        }
    }
}

// FUNCIONES GLOBALES PARA USAR DESDE HTML
window.hideGlossaryDefinition = hideGlossaryDefinition;

// Call optimization on load
window.addEventListener('load', optimizeLoading);
