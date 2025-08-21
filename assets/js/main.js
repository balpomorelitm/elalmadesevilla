document.addEventListener('DOMContentLoaded', function() {
    initializeEmojiToggle();
    initializeGlossaryClick();
    initializeQuizzes();
    initializeReactions();
    createGlossarySection();
});

// FUNCIONALIDAD: Glosas que aparecen al pie del texto con bullet points
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
    const quizSection = document.querySelector('.quiz');
    const container = document.querySelector('.chapter-content');
    
    if (!container) return;
    
    const glossarySection = document.createElement('div');
    glossarySection.classList.add('glossary-section', 'empty');
    glossarySection.innerHTML = `
        <h3>📖 Glossary of Selected Words</h3>
        <div class="glossary-list"></div>
        <button class="clear-glossary" onclick="clearAllGlossary()">Clear glossary</button>
    `;
    
    if (quizSection) {
        quizSection.parentNode.insertBefore(glossarySection, quizSection);
    } else {
        container.parentNode.appendChild(glossarySection);
    }
}

// Añadir palabra al glosario - FORMATO BULLET POINTS
function addToGlossary(word, definition) {
    const glossarySection = document.querySelector('.glossary-section');
    const glossaryList = document.querySelector('.glossary-list');
    
    // Verificar si la palabra ya existe
    const existingItem = glossaryList.querySelector(`[data-word="${word}"]`);
    if (existingItem) return;
    
    // Crear nuevo item del glosario con formato bullet point
    const glossaryItem = document.createElement('div');
    glossaryItem.classList.add('glossary-item');
    glossaryItem.setAttribute('data-word', word);
    
    // Formato: • palabra: definición
    glossaryItem.innerHTML = `<span class="glossary-word">${word}</span>: <span class="glossary-definition">${definition}</span>`;
    
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
        item.style.transform = 'translateY(-10px)';
        
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
            item.style.transform = 'translateY(-10px)';
        }, index * 50);
    });
    
    // Limpiar y ocultar sección
    setTimeout(() => {
        glossaryList.innerHTML = '';
        glossarySection.classList.add('empty');
        glossarySection.classList.remove('has-definitions');
    }, items.length * 50 + 300);
}

// FUNCIONALIDAD: Emojis con click individual
// Actualizar estas funciones en main.js

// FUNCIONALIDAD RENOVADA: Palabras con EMOJI + GLOSA
function initializeEmojiToggle() {
    const emojiToggleButton = document.getElementById('emoji-toggle');
    if (!emojiToggleButton) return;
    
    let globalEmojiMode = false;
    
    // Funcionalidad del botón global
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
    
    // Click individual en palabras emoji (incluyendo las que tienen glosa)
    const palabrasConEmoji = document.querySelectorAll('.emoji-word');
    palabrasConEmoji.forEach(palabra => {
        palabra.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar conflictos con glosa
            
            // Toggle individual emoji
            const existingEmoji = this.nextElementSibling;
            if (existingEmoji && existingEmoji.classList.contains('emoji-icono')) {
                // Remover emoji existente
                this.classList.remove('emoji-active');
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
                    this.classList.add('emoji-active');
                    const emojiSpan = document.createElement('span');
                    emojiSpan.classList.add('emoji-icono');
                    emojiSpan.textContent = emoji;
                    this.insertAdjacentElement('afterend', emojiSpan);
                }
            }
        });
    });
}
// Click individual en palabras emoji (incluyendo las que tienen glosa)
    const palabrasConEmoji = document.querySelectorAll('.emoji-word');
    palabrasConEmoji.forEach(palabra => {
        palabra.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Evitar conflictos con glosa
            
            // Toggle individual emoji
            const existingEmoji = this.nextElementSibling;
            if (existingEmoji && existingEmoji.classList.contains('emoji-icono')) {
                // Remover emoji existente
                this.classList.remove('emoji-active');
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
                    this.classList.add('emoji-active');
                    const emojiSpan = document.createElement('span');
                    emojiSpan.classList.add('emoji-icono');
                    emojiSpan.textContent = emoji;
                    this.insertAdjacentElement('afterend', emojiSpan);
                }
            }
        });
    });
}
// GLOSAS actualizadas para trabajar con emoji+glosa
function initializeGlossaryClick() {
    const terminos = document.querySelectorAll('.glosa');
    
    terminos.forEach(termino => {
        termino.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Si también es una palabra emoji, no interferir con el emoji
            if (this.classList.contains('emoji-word')) {
                // Solo procesar glosa, no emoji
                e.stopPropagation();
            }
            
            // Remover clase clicked de otras glosas
            document.querySelectorAll('.glosa.clicked').forEach(g => {
                if (g !== this) g.classList.remove('clicked');
            });
            
            // Toggle clicked state para glosa
            this.classList.toggle('clicked');
            
            const word = this.textContent.trim();
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

// Mostrar todos los emojis (incluyendo los que tienen glosa) - VERSIÓN CORRECTA
function showAllEmojis(palabrasConEmoji) {
    palabrasConEmoji.forEach((palabra, index) => {
        // Evitar emojis duplicados
        if (palabra.nextElementSibling && palabra.nextElementSibling.classList.contains('emoji-icono')) {
            return;
        }
        
        const emoji = palabra.getAttribute('data-emoji');
        if (emoji) {
            palabra.classList.add('emoji-active'); // Usar emoji-active, no clicked
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji-icono');
            emojiSpan.textContent = emoji;
            
            // Animación escalonada
            emojiSpan.style.animationDelay = `${index * 0.1}s`;
            
            palabra.insertAdjacentElement('afterend', emojiSpan);
        }
    });
}

// Ocultar todos los emojis - VERSIÓN CORRECTA
function hideAllEmojis() {
    const emojis = document.querySelectorAll('.emoji-icono');
    const palabrasConEmoji = document.querySelectorAll('.emoji-word.emoji-active'); // Usar emoji-active
    
    // Remover clase emoji-active de las palabras
    palabrasConEmoji.forEach(palabra => {
        palabra.classList.remove('emoji-active');
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
    
    let message = `You answered ${correctas} out of ${total} questions correctly (${percentage.toFixed(0)}%)`;
    let feedback = '';
    let cssClass = '';
    
    if (percentage === 100) {
        feedback = ' Perfect! 🎉';
        cssClass = 'perfect';
    } else if (percentage >= 70) {
        feedback = ' Very good! 👏';
        cssClass = 'good';
    } else if (percentage >= 50) {
        feedback = ' Good, but you can improve 📚';
        cssClass = 'good';
    } else {
        feedback = ' You need to review more 💪';
        cssClass = 'needs-improvement';
    }
    
    resultadoDiv.textContent = message + feedback;
    resultadoDiv.className = `resultado-quiz ${cssClass}`;
    
    setTimeout(() => {
        resultadoDiv.classList.add('show');
    }, 100);
    
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
            
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 600);
            
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
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
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

// FUNCIONES GLOBALES
window.clearAllGlossary = clearAllGlossary;

// Optimización al cargar
window.addEventListener('load', optimizeLoading);
