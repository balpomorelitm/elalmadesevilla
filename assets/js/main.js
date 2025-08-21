// Variables globales para flashcards
let flashcardsData = [];
let currentCardIndex = 0;
let correctAnswers = 0;
let totalAnswered = 0;
let sessionStartTime = 0;
let isCardFlipped = false;
let reviewPile = [];

// Palabras del glosario de cada capítulo
const CHAPTER_GLOSSARY = {
    1: [
        { word: "llamo", definition: "I call myself (from LLAMARSE)" },
        { word: "tengo", definition: "I have (from TENER)" },
        { word: "años", definition: "years" },
        { word: "soy", definition: "I am (from SER)" },
        { word: "ahora", definition: "now" },
        { word: "estoy", definition: "I am (from ESTAR)" },
        { word: "estudiar", definition: "to study" },
        { word: "avión", definition: "airplane, plane" },
        { word: "llega", definition: "arrives (from LLEGAR)" },
        { word: "mes", definition: "month" },
        { word: "abril", definition: "April" },
        { word: "hace buen tiempo", definition: "the weather is good" },
        { word: "cielo", definition: "sky" },
        { word: "azul", definition: "blue (color)" },
        { word: "hay mucha luz", definition: "there is a lot of light" },
        { word: "taxi", definition: "taxi, cab" },
        { word: "dirección", definition: "address" },
        { word: "barrio", definition: "neighborhood" },
        { word: "mujer mayor", definition: "older woman, elderly lady" },
        { word: "abre", definition: "opens (from ABRIR)" },
        { word: "puerta", definition: "door" },
        { word: "dice", definition: "says (from DECIR)" },
        { word: "mujer", definition: "woman" },
        { word: "digo", definition: "I say (from DECIR)" },
        { word: "amable", definition: "kind" },
        { word: "sonríe", definition: "smiles (from SONREÍR)" },
        { word: "habla", definition: "speaks (from HABLAR)" },
        { word: "despacito", definition: "very slowly" },
        { word: "entiendo", definition: "I understand (from ENTENDER)" },
        { word: "un poco", definition: "a little bit" },
        { word: "está bien", definition: "it's okay, alright" },
        { word: "piso", definition: "apartment, flat" },
        { word: "grande", definition: "big" },
        { word: "bonito", definition: "pretty" },
        { word: "habitación", definition: "room" },
        { word: "pequeña", definition: "small" },
        { word: "cama", definition: "bed" },
        { word: "mesa", definition: "table" },
        { word: "armario", definition: "wardrobe / closet" },
        { word: "ventana", definition: "window" },
        { word: "veo", definition: "I see (from VER)" },
        { word: "puente", definition: "bridge" },
        { word: "tengo la", definition: "I have (from TENER)" },
        { word: "maleta", definition: "suitcase, luggage" },
        { word: "cansado", definition: "tired" },
        { word: "por el viaje", definition: "because of the trip" },
        { word: "feliz", definition: "happy" }
    ]
    // Añadir más capítulos aquí...
};

// INICIALIZACIÓN PRINCIPAL
document.addEventListener('DOMContentLoaded', function() {
    // Estilizar todas las glosas antes de inicializar otras funcionalidades
    const rootStyles = getComputedStyle(document.documentElement);
    const glosaColor = rootStyles.getPropertyValue('--glosa-color').trim();

    document.querySelectorAll('.glosa').forEach(glosa => {
        glosa.style.color = glosaColor;
        glosa.style.borderBottom = `1px dotted ${glosaColor}`;
    });

    initializeEmojiToggle();
    initializeGlossaryClick();
    initializeQuizzes();
    initializeReactions();
    createGlossarySection();
    
    // Inicializar flashcards después de que todo esté listo
    setTimeout(() => {
        initializeFlashcards();
        
        // Observar cambios en el glosario para flashcards
        const observer = new MutationObserver(() => {
            checkFlashcardsAvailability();
        });
        
        const glossarySection = document.querySelector('.glossary-section');
        if (glossarySection) {
            observer.observe(glossarySection, { 
                childList: true, 
                subtree: true 
            });
        }
    }, 500);
});

// ===== SISTEMA DE GLOSARIO =====

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
    
    // Verificar disponibilidad de flashcards
    checkFlashcardsAvailability();
    
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
            
            // Verificar disponibilidad de flashcards
            checkFlashcardsAvailability();
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
        
        // Verificar disponibilidad de flashcards
        checkFlashcardsAvailability();
    }, items.length * 50 + 300);
}

// ===== SISTEMA DE FLASHCARDS =====

// Inicializar sistema de flashcards
function initializeFlashcards() {
    // Solo crear si no existe ya
    if (!document.querySelector('.flashcards-game')) {
        createFlashcardsSection();
        checkFlashcardsAvailability();
    }
}

// Crear sección de flashcards
function createFlashcardsSection() {
    const glossarySection = document.querySelector('.glossary-section');
    const quizSection = document.querySelector('.quiz');
    
    if (!glossarySection || !quizSection) return;
    
    const flashcardsSection = document.createElement('div');
    flashcardsSection.classList.add('flashcards-game', 'hidden');
    flashcardsSection.innerHTML = `
        <h3>🃏 Flashcard Practice</h3>
        <p id="flashcards-description">Practice vocabulary with interactive flashcards!</p>
        
        <div class="flashcards-controls">
            <button class="flashcards-btn" onclick="startFlashcards('glossary')">
                📖 Practice Selected Words
            </button>
            <button class="flashcards-btn" onclick="startFlashcards('all')">
                📚 Practice All Chapter Words
            </button>
        </div>
        
        <div id="flashcards-content" class="hidden">
            <!-- Estadísticas -->
            <div class="flashcards-stats">
                <div class="stat-item">
                    <span class="stat-number" id="cards-mastered">0</span>
                    <span class="stat-label">Mastered</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="cards-remaining">0</span>
                    <span class="stat-label">Remaining</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="accuracy-percent">0%</span>
                    <span class="stat-label">Accuracy</span>
                </div>
            </div>
            
            <!-- Barra de progreso -->
            <div class="flashcards-progress">
                <div class="progress-bar" id="progress-bar"></div>
            </div>
            
            <!-- Tarjeta -->
            <div class="flashcard-container">
                <div class="flashcard" id="flashcard" onclick="flipCard()">
                    <div class="flashcard-face flashcard-front">
                        <div class="flashcard-content">
                            <div class="flashcard-word" id="card-word">Click to start</div>
                            <button class="flashcard-audio" onclick="playPronunciation(event)" title="Listen">🔊</button>
                        </div>
                    </div>
                    <div class="flashcard-face flashcard-back">
                        <div class="flashcard-content">
                            <div class="flashcard-definition" id="card-definition">Definition will appear here</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Acciones -->
            <div class="flashcard-actions">
                <button class="action-btn correct" onclick="markCard(true)" id="correct-btn">
                    ✓ I knew it <span class="key-hint">SPACE</span>
                </button>
                <button class="action-btn incorrect" onclick="markCard(false)" id="incorrect-btn">
                    ✗ Need practice <span class="key-hint">X</span>
                </button>
            </div>
        </div>
        
        <!-- Pantalla de finalización -->
        <div id="flashcards-complete" class="flashcards-complete hidden">
            <h4>🎉 Session Complete!</h4>
            <p id="completion-message">Great job practicing!</p>
            
            <div class="complete-stats" id="complete-stats">
                <!-- Se llena dinámicamente -->
            </div>
            
            <div class="flashcards-controls">
                <button class="flashcards-btn" onclick="restartDifficultCards()">
                    🔄 Review Difficult Words
                </button>
                <button class="flashcards-btn primary" onclick="resetFlashcards()">
                    🆕 New Session
                </button>
            </div>
        </div>
    `;
    
    // Insertar antes del quiz
    quizSection.parentNode.insertBefore(flashcardsSection, quizSection);
}

// Verificar disponibilidad de flashcards
function checkFlashcardsAvailability() {
    const glossarySection = document.querySelector('.glossary-section');
    const flashcardsGame = document.querySelector('.flashcards-game');
    const description = document.getElementById('flashcards-description');
    
    if (!glossarySection || !flashcardsGame) return;
    
    const glossaryWords = document.querySelectorAll('.glossary-item').length;
    const chapterNumber = getCurrentChapterNumber();
    const totalChapterWords = CHAPTER_GLOSSARY[chapterNumber]?.length || 0;
    
    if (glossaryWords >= 3 || totalChapterWords > 0) {
        flashcardsGame.classList.remove('hidden');
        
        if (glossaryWords >= 3) {
            description.textContent = `You have ${glossaryWords} words in your glossary. Practice them with flashcards!`;
        } else {
            description.textContent = `Practice vocabulary from this chapter with flashcards!`;
        }
    } else {
        flashcardsGame.classList.add('hidden');
    }
}

// Obtener número de capítulo actual
function getCurrentChapterNumber() {
    const path = window.location.pathname;
    const match = path.match(/capitulo-(\d+)/);
    return match ? parseInt(match[1]) : 1;
}

// Iniciar flashcards
function startFlashcards(mode) {
    sessionStartTime = Date.now();
    flashcardsData = [];
    
    if (mode === 'glossary') {
        // Obtener palabras del glosario actual
        const glossaryItems = document.querySelectorAll('.glossary-item');
        glossaryItems.forEach(item => {
            const word = item.querySelector('.glossary-word').textContent;
            const definition = item.querySelector('.glossary-definition').textContent;
            flashcardsData.push({ word, definition });
        });
    } else if (mode === 'all') {
        // Obtener todas las palabras del capítulo
        const chapterNumber = getCurrentChapterNumber();
        flashcardsData = [...(CHAPTER_GLOSSARY[chapterNumber] || [])];
    }
    
    if (flashcardsData.length === 0) {
        alert('No words available for practice!');
        return;
    }
    
    // Barajar tarjetas
    shuffleArray(flashcardsData);
    
    // Inicializar variables
    currentCardIndex = 0;
    correctAnswers = 0;
    totalAnswered = 0;
    reviewPile = [];
    isCardFlipped = false;
    
    // Mostrar interfaz de juego
    document.querySelector('.flashcards-controls').classList.add('hidden');
    document.getElementById('flashcards-content').classList.remove('hidden');
    
    // Mostrar primera tarjeta
    showCurrentCard();
    updateStats();
    
    // Activar controles de teclado
    document.addEventListener('keydown', handleKeyPress);
}

// Mostrar tarjeta actual
function showCurrentCard() {
    if (currentCardIndex >= flashcardsData.length) {
        // Si hemos terminado, pero hay cartas para revisar
        if (reviewPile.length > 0) {
            flashcardsData = [...reviewPile];
            reviewPile = [];
            currentCardIndex = 0;
            shuffleArray(flashcardsData);
        } else {
            // Sesión completada
            completeSession();
            return;
        }
    }
    
    const currentCard = flashcardsData[currentCardIndex];
    const cardElement = document.getElementById('flashcard');
    const wordElement = document.getElementById('card-word');
    const definitionElement = document.getElementById('card-definition');
    
    // Resetear tarjeta
    cardElement.classList.remove('flipped', 'new-card', 'correct-feedback', 'incorrect-feedback');
    isCardFlipped = false;
    
    // Actualizar contenido
    wordElement.textContent = currentCard.word;
    definitionElement.textContent = currentCard.definition;
    
    // Animación de entrada
    setTimeout(() => {
        cardElement.classList.add('new-card');
    }, 50);
    
    updateStats();
}

// Voltear tarjeta
function flipCard() {
    const cardElement = document.getElementById('flashcard');
    cardElement.classList.toggle('flipped');
    isCardFlipped = !isCardFlipped;
}

// Marcar respuesta
function markCard(isCorrect) {
    if (!isCardFlipped) {
        flipCard();
        setTimeout(() => markCard(isCorrect), 300);
        return;
    }
    
    const cardElement = document.getElementById('flashcard');
    const currentCard = flashcardsData[currentCardIndex];
    
    totalAnswered++;
    
    if (isCorrect) {
        correctAnswers++;
        cardElement.classList.add('correct-feedback');
        playSound('correct');
    } else {
        // Añadir a pila de revisión
        reviewPile.push(currentCard);
        cardElement.classList.add('incorrect-feedback');
        playSound('incorrect');
    }
    
    // Guardar estadística en localStorage
    saveCardResult(currentCard.word, isCorrect);
    
    // Continuar después de animación
    setTimeout(() => {
        currentCardIndex++;
        showCurrentCard();
    }, 800);
}

// Actualizar estadísticas
function updateStats() {
    const mastered = correctAnswers;
    const remaining = flashcardsData.length - currentCardIndex + reviewPile.length;
    const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
    const progress = totalAnswered > 0 ? Math.min((currentCardIndex / flashcardsData.length) * 100, 100) : 0;
    
    document.getElementById('cards-mastered').textContent = mastered;
    document.getElementById('cards-remaining').textContent = remaining;
    document.getElementById('accuracy-percent').textContent = `${accuracy}%`;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

// Completar sesión
function completeSession() {
    const sessionTime = Math.round((Date.now() - sessionStartTime) / 1000);
    const avgTime = totalAnswered > 0 ? Math.round(sessionTime / totalAnswered) : 0;
    const accuracy = Math.round((correctAnswers / totalAnswered) * 100);
    
    // Ocultar contenido del juego
    document.getElementById('flashcards-content').classList.add('hidden');
    
    // Mostrar pantalla de finalización
    const completeSection = document.getElementById('flashcards-complete');
    completeSection.classList.remove('hidden');
    
    // Actualizar mensaje
    let message = '';
    if (accuracy >= 90) {
        message = '🏆 Outstanding! You\'ve mastered these words!';
    } else if (accuracy >= 70) {
        message = '👏 Great job! Keep practicing to improve!';
    } else {
        message = '📚 Good effort! Regular practice will help you improve!';
    }
    
    document.getElementById('completion-message').textContent = message;
    
    // Mostrar estadísticas finales
    const statsContainer = document.getElementById('complete-stats');
    statsContainer.innerHTML = `
        <div class="complete-stat">
            <span class="complete-stat-number">${accuracy}%</span>
            <span class="complete-stat-label">Accuracy</span>
        </div>
        <div class="complete-stat">
            <span class="complete-stat-number">${Math.round(sessionTime / 60)}m ${sessionTime % 60}s</span>
            <span class="complete-stat-label">Total Time</span>
        </div>
        <div class="complete-stat">
            <span class="complete-stat-number">${avgTime}s</span>
            <span class="complete-stat-label">Avg per Card</span>
        </div>
        <div class="complete-stat">
            <span class="complete-stat-number">${totalAnswered}</span>
            <span class="complete-stat-label">Cards Studied</span>
        </div>
    `;
    
    // Efecto de confetti si el rendimiento es bueno
    if (accuracy >= 80) {
        createConfetti();
    }
    
    // Guardar estadísticas de sesión
    saveSessionStats(accuracy, sessionTime, totalAnswered);
    
    // Desactivar controles de teclado
    document.removeEventListener('keydown', handleKeyPress);
}

// Manejar teclas
function handleKeyPress(event) {
    if (document.getElementById('flashcards-content').classList.contains('hidden')) return;
    
    switch(event.key.toLowerCase()) {
        case ' ':
            event.preventDefault();
            markCard(true);
            break;
        case 'x':
            event.preventDefault();
            markCard(false);
            break;
        case 'enter':
            if (!isCardFlipped) {
                flipCard();
            }
            break;
    }
}

// Reproducir pronunciación (Text-to-Speech)
function playPronunciation(event) {
    event.stopPropagation();
    const word = document.getElementById('card-word').textContent;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
}

// Sonidos del juego
function playSound(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'correct') {
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        } else {
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
            oscillator.frequency.setValueAtTime(185, audioContext.currentTime + 0.1); // F#3
        }
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Silenciosamente fallar si no hay soporte de audio
    }
}

// Crear efecto confetti
function createConfetti() {
    const colors = ['#f39c12', '#e74c3c', '#9b59b6', '#3498db', '#2ecc71'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

// Funciones de utilidad
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Reiniciar palabras difíciles
function restartDifficultCards() {
    if (reviewPile.length === 0) {
        alert('No difficult words to review!');
        return;
    }
    
    flashcardsData = [...reviewPile];
    reviewPile = [];
    currentCardIndex = 0;
    correctAnswers = 0;
    totalAnswered = 0;
    isCardFlipped = false;
    sessionStartTime = Date.now();
    
    shuffleArray(flashcardsData);
    
    document.getElementById('flashcards-complete').classList.add('hidden');
    document.getElementById('flashcards-content').classList.remove('hidden');
    
    showCurrentCard();
    document.addEventListener('keydown', handleKeyPress);
}

// Resetear flashcards
function resetFlashcards() {
    document.getElementById('flashcards-complete').classList.add('hidden');
    document.getElementById('flashcards-content').classList.add('hidden');
    document.querySelector('.flashcards-controls').classList.remove('hidden');
    
    document.removeEventListener('keydown', handleKeyPress);
}

// Guardar resultado de tarjeta
function saveCardResult(word, isCorrect) {
    const chapterNumber = getCurrentChapterNumber();
    const key = `flashcards_chapter_${chapterNumber}`;
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    
    if (!data[word]) {
        data[word] = { correct: 0, incorrect: 0, lastStudied: Date.now() };
    }
    
    if (isCorrect) {
        data[word].correct++;
    } else {
        data[word].incorrect++;
    }
    
    data[word].lastStudied = Date.now();
    localStorage.setItem(key, JSON.stringify(data));
}

// Guardar estadísticas de sesión
function saveSessionStats(accuracy, sessionTime, cardsStudied) {
    const stats = JSON.parse(localStorage.getItem('flashcards_global_stats') || '{}');
    const today = new Date().toDateString();
    
    if (!stats[today]) {
        stats[today] = { sessions: 0, totalTime: 0, totalCards: 0, bestAccuracy: 0 };
    }
    
    stats[today].sessions++;
    stats[today].totalTime += sessionTime;
    stats[today].totalCards += cardsStudied;
    stats[today].bestAccuracy = Math.max(stats[today].bestAccuracy, accuracy);
    
    // Mantener solo los últimos 30 días
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    Object.keys(stats).forEach(date => {
        if (new Date(date) < thirtyDaysAgo) {
            delete stats[date];
        }
    });
    
    localStorage.setItem('flashcards_global_stats', JSON.stringify(stats));
}

// ===== SISTEMA DE EMOJIS =====

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
            this.innerHTML = 'Hide Emojis 🙈';
        } else {
            hideAllEmojis();
            this.innerHTML = 'Show Emojis 💡';
        }
    });
    
    // Click individual en palabras emoji
    const palabrasConEmoji = document.querySelectorAll('.emoji-word');
    palabrasConEmoji.forEach(palabra => {
        palabra.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle individual emoji
            const existingEmoji = this.nextElementSibling;
            if (existingEmoji && existingEmoji.classList.contains('emoji-icono')) {
                this.classList.remove('emoji-active');
                existingEmoji.classList.add('removing');
                setTimeout(() => {
                    if (existingEmoji.parentNode) {
                        existingEmoji.remove();
                    }
                }, 300);
            } else {
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

// Mostrar todos los emojis
function showAllEmojis(palabrasConEmoji) {
    palabrasConEmoji.forEach((palabra, index) => {
        // Evitar emojis duplicados
        if (palabra.nextElementSibling && palabra.nextElementSibling.classList.contains('emoji-icono')) {
            return;
        }
        
        const emoji = palabra.getAttribute('data-emoji');
        if (emoji) {
            palabra.classList.add('emoji-active');
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
    const palabrasConEmoji = document.querySelectorAll('.emoji-word.emoji-active');
    
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

// ===== SISTEMA DE QUIZZES =====

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

// ===== SISTEMA DE REACCIONES =====

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

// ===== OPTIMIZACIÓN DE RENDIMIENTO =====

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

// ===== FUNCIONES GLOBALES PARA HTML =====

window.clearAllGlossary = clearAllGlossary;
window.startFlashcards = startFlashcards;
window.flipCard = flipCard;
window.markCard = markCard;
window.playPronunciation = playPronunciation;
window.restartDifficultCards = restartDifficultCards;
window.resetFlashcards = resetFlashcards;

// Optimización al cargar
window.addEventListener('load', optimizeLoading);
