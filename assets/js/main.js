document.addEventListener('DOMContentLoaded', function() {
    initializeEmojiToggle();
    initializeGlossaryClick(); // Nueva función corregida
    initializeQuizzes();
    initializeReactions();
    createGlossarySection(); // Crear sección de glosario al pie
});

// NUEVA FUNCIONALIDAD: Glosas que aparecen al pie del texto
function initializeGlossaryClick() {
    const terminos = document.querySelectorAll('.glosa');
    
    terminos.forEach(termino => {
        termino.addEventListener('click', function(e) {
            e.preventDefault();
            
            const word = this.textContent.trim();
            const definition = this.getAttribute('data-definicion');
            
            // Toggle visual state
            this.classList.toggle('clicked');
            
            if (this.classList.contains('clicked')) {
                addToGlossary(word, definition);
            } else {
                removeFromGlossary(word);
            }
        });
    });
}

// Crear sección de glosario al pie del capítulo
function createGlossarySection() {
    // Buscar dónde insertar el glosario (antes del quiz)
    const quizSection = document.querySelector('.quiz');
    const container = document.querySelector('.chapter-content');
    
    if (!container) return;
    
    const glossarySection = document.createElement('div');
    glossarySection.classList.add('glossary-section', 'empty');
    glossarySection.innerHTML = `
        <h3>📖 Glosario de palabras seleccionadas</h3>
        <div class="glossary-list"></div>
        <button class="clear-glossary" onclick="clearAllGlossary()">Limpiar glosario</button>
    `;
    
    // Insertar después del contenido del capítulo, antes del quiz
    if (quizSection) {
        quizSection.parentNode.insertBefore(glossarySection, quizSection);
    } else {
        container.parentNode.appendChild(glossarySection);
    }
}

// Añadir palabra al glosario
function addToGlossary(word, definition) {
    const glossarySection = document.querySelector('.glossary-section');
    const glossaryList = document.querySelector('.glossary-list');
    
    // Verificar si la palabra ya existe
    const existingItem = glossaryList.querySelector(`[data-word="${word}"]`);
    if (existingItem) return;
    
    // Crear nuevo item del glosario
    const glossaryItem = document.createElement('div');
    glossaryItem.classList.add('glossary-item');
    glossaryItem.setAttribute('data-word', word);
    glossaryItem.innerHTML = `
        <div class="glossary-word">${word}</div>
        <div class="glossary-definition">${definition}</div>
    `;
    
    // Añadir con efecto de aparición
    glossaryList.appendChild(glossaryItem);
    
    // Mostrar la sección si estaba oculta
    if (glossarySection.classList.contains('empty')) {
        glossarySection.classList.remove('empty');
        glossarySection.classList.add('has-definitions');
    }
    
    // Scroll suave al glosario si es la primera palabra
    if (glossaryList.children.length === 1) {
        setTimeout(() => {
            glossarySection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 300);
    }
}

// Remover palabra del glosario
function removeFromGlossary(word) {
    const glossaryList = document.querySelector('.glossary-list');
    const glossarySection = document.querySelector('.glossary-section');
    const item = glossaryList.querySelector(`[data-word="${word}"]`);
    
    if (item) {
        // Animación de salida
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            item.remove();
            
            // Ocultar sección si no hay más palabras
            if (glossaryList.children.length === 0) {
                glossarySection.classList.add('empty');
                glossarySection.classList.remove('has-definitions');
            }
        }, 300);
    }
}

// Limpiar todo el glosario
function clearAllGlossary() {
    const glossaryList = document.querySelector('.glossary-list');
    const glossarySection = document.querySelector('.glossary-section');
    const clickedGlosas = document.querySelectorAll('.glosa.clicked');
    
    // Remover estado clicked de todas las glosas
    clickedGlosas.forEach(glosa => {
        glosa.classList.remove('clicked');
    });
    
    // Animar salida de todos los items
    const items = glossaryList.querySelectorAll('.glossary-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
        }, index * 100);
    });
    
    // Limpiar y ocultar sección
    setTimeout(() => {
        glossaryList.innerHTML = '';
        glossarySection.classList.add('empty');
        glossarySection.classList.remove('has-definitions');
    }, items.length * 100 + 300);
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

// SISTEMA DE QUIZZES
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
window.clearAllGlossary = clearAllGlossary;

// Call optimization on load
window.addEventListener('load', optimizeLoading);
