// Variables globales para flashcards
let flashcardsData = [];
let currentCardIndex = 0;
let correctAnswers = 0;
let totalAnswered = 0;
let sessionStartTime = 0;
let isCardFlipped = false;
let reviewPile = [];
let currentMode = 'receptive'; // 'receptive' o 'productive

// Palabras del glosario de cada capítulo
const CHAPTER_GLOSSARY = {
    1: [
        // Tu glosario original del Capítulo 1 (manteniendo tu estructura base)
        { word: "me llamo", definition: "I call myself (from LLAMARSE)" },
        { word: "tengo", definition: "I have (from TENER)" },
        { word: "años", definition: "years" },
        { word: "soy", definition: "I am (from SER)" },
        { word: "ahora", definition: "now" },
        { word: "estoy", definition: "I am (from ESTAR)" },
        { word: "estudiar", definition: "to study 📚" },
        { word: "avión", definition: "airplane, plane ✈️" },
        { word: "llega", definition: "arrives (from LLEGAR)" },
        { word: "mes", definition: "month" },
        { word: "abril", definition: "April 🌸" },
        { word: "hace buen tiempo", definition: "the weather is good ☀️" },
        { word: "cielo", definition: "sky ☁️" },
        { word: "azul", definition: "blue (color) 🔵" },
        { word: "hay mucha luz", definition: "there is a lot of light" },
        { word: "taxi", definition: "taxi, cab 🚕" },
        { word: "dirección", definition: "address" },
        { word: "barrio", definition: "neighborhood 🏘️" },
        { word: "mujer mayor", definition: "older woman, elderly lady 👵" },
        { word: "abre", definition: "opens (from ABRIR)" },
        { word: "puerta", definition: "door 🚪" },
        { word: "dice", definition: "says (from DECIR)" },
        { word: "mujer", definition: "woman 👩" },
        { word: "digo", definition: "I say (from DECIR)" },
        { word: "amable", definition: "kind" },
        { word: "sonríe", definition: "smiles (from SONREÍR) 😊" },
        { word: "habla", definition: "speaks (from HABLAR)" },
        { word: "despacito", definition: "very slowly 🐌" },
        { word: "entiendo", definition: "I understand (from ENTENDER) 💡" },
        { word: "un poco", definition: "a little bit" },
        { word: "está bien", definition: "it's okay, alright ✅" },
        { word: "piso", definition: "apartment, flat 🏠" },
        { word: "grande", definition: "big" },
        { word: "bonito", definition: "pretty" },
        { word: "habitación", definition: "room" },
        { word: "pequeña", definition: "small" },
        { word: "cama", definition: "bed 🛏️" },
        { word: "mesa", definition: "table" },
        { word: "armario", definition: "wardrobe / closet" },
        { word: "ventana", definition: "window 🪟" },
        { word: "veo", definition: "I see (from VER) 👁️" },
        { word: "puente", definition: "bridge 🌉" },
        { word: "tengo la", definition: "I have (from TENER)" },
        { word: "maleta", definition: "suitcase, luggage 🧳" },
        { word: "cansado", definition: "tired 😴" },
        { word: "por el viaje", definition: "because of the trip" },
        { word: "feliz", definition: "happy 😊" }
    ],
    
    2: [
        { word: "a pie", definition: "on foot 🚶" },
        { word: "buenos días", definition: "good morning 🌅" },
        { word: "clase", definition: "class 🏫" },
        { word: "cómo te llamas", definition: "what is your name?" },
        { word: "compañera de clase", definition: "classmate (female)" },
        { word: "concurso", definition: "contest, competition 🏆" },
        { word: "descansar", definition: "to rest 😴" },
        { word: "dice", definition: "says (from DECIR)" },
        { word: "digo", definition: "I say (from DECIR)" },
        { word: "difícil", definition: "difficult" },
        { word: "durante la clase", definition: "during the class" },
        { word: "estudiantes", definition: "students 👨‍🎓👩‍🎓" },
        { word: "fantástico", definition: "fantastic" },
        { word: "fotografía", definition: "photography 📸" },
        { word: "ganar", definition: "to win 🏆" },
        { word: "guapa", definition: "pretty, beautiful" },
        { word: "habla", definition: "speaks (from HABLAR)" },
        { word: "hoy", definition: "today" },
        { word: "Italia", definition: "Italy 🇮🇹" },
        { word: "levanta la mano", definition: "raises his hand (from LEVANTAR) ✋" },
        { word: "nos reímos", definition: "we laugh (from REIRSE) 😂" },
        { word: "muy bien", definition: "very well" },
        { word: "participar", definition: "to participate" },
        { word: "póster", definition: "poster" },
        { word: "premio", definition: "prize, award 🏆" },
        { word: "primer día", definition: "first day" },
        { word: "profesora", definition: "teacher (female) 👩‍🏫" },
        { word: "quiero", definition: "I want (from QUERER)" },
        { word: "rato", definition: "a little while, a moment ⏰" },
        { word: "ríe", definition: "laughs (from REÍR) 😂" },
        { word: "simpática", definition: "nice, friendly" },
        { word: "simpática también", definition: "also nice" },
        { word: "veo", definition: "I see (from VER)" },
        { word: "voy", definition: "I go (from IR)" }
    ],
    
    3: [
        { word: "alma", definition: "soul" },
        { word: "bar", definition: "bar 🍺" },
        { word: "buenos", definition: "good, tasty" },
        { word: "calientes", definition: "hot 🔥" },
        { word: "camarero", definition: "waiter 👨‍🍳" },
        { word: "chica", definition: "girl 👧" },
        { word: "desayunar", definition: "to have breakfast 🥐" },
        { word: "diferente", definition: "different" },
        { word: "digo", definition: "I say (from DECIR)" },
        { word: "dulce", definition: "sweet 🍯" },
        { word: "en blanco y negro", definition: "in black and white ⚫⚪" },
        { word: "especial", definition: "special" },
        { word: "espero", definition: "I wait (from ESPERAR)" },
        { word: "famosos", definition: "famous ⭐" },
        { word: "feliz", definition: "happy" },
        { word: "fotos", definition: "photos 📸" },
        { word: "gente", definition: "people 👥" },
        { word: "hago una foto", definition: "I take a photo (from HACER) 📸" },
        { word: "hay", definition: "There is/There are" },
        { word: "joven", definition: "young" },
        { word: "lleva", definition: "wears (from LLEVAR)" },
        { word: "mientras", definition: "while" },
        { word: "miro", definition: "I look (from MIRAR) 👀" },
        { word: "misión", definition: "mission" },
        { word: "móvil", definition: "mobile phone 📱" },
        { word: "pero", definition: "but" },
        { word: "pienso", definition: "I think (from PENSAR) 💭" },
        { word: "por la mañana", definition: "in the morning 🌅" },
        { word: "pregunta", definition: "asks (from PREGUNTAR)" },
        { word: "qué quieres, chico", definition: "What do you want, kid? (colloquial)" },
        { word: "quién", definition: "who" },
        { word: "quiero probarlos", definition: "I want to try them" },
        { word: "saber", definition: "to know" },
        { word: "me siento", definition: "I sit (from SENTARSE)" },
        { word: "silla libre", definition: "free chair 💺" },
        { word: "solo pienso en", definition: "I only think about" },
        { word: "tengo", definition: "I have (from TENER)" },
        { word: "tradicional", definition: "traditional" },
        { word: "trae", definition: "brings (from TRAER)" },
        { word: "traje tradicional", definition: "traditional dress 👘" },
        { word: "voy", definition: "I go (from IR)" }
    ],
    
    4: [
        { word: "actividad", definition: "activity" },
        { word: "antiguo", definition: "old, antique" },
        { word: "ayuda", definition: "help 🆘" },
        { word: "baratas", definition: "cheap 💰" },
        { word: "caballo", definition: "horse 🐴" },
        { word: "cabello", definition: "hair (on the head)" },
        { word: "calamares", definition: "squid rings 🦑" },
        { word: "compartir", definition: "to share" },
        { word: "cuadro", definition: "painting, picture 🖼️" },
        { word: "cultural", definition: "cultural" },
        { word: "dice", definition: "says (from DECIR)" },
        { word: "ensaladilla rusa", definition: "'Russian salad', a popular potato salad tapa 🥗" },
        { word: "enseño", definition: "I show (from ENSEÑAR)" },
        { word: "están muy ricas", definition: "they are very tasty! 😋" },
        { word: "explica", definition: "explains (from EXPLICAR)" },
        { word: "feliz", definition: "happy" },
        { word: "Feria de Sevilla", definition: "Seville Fair 🎪" },
        { word: "hoy", definition: "today" },
        { word: "importante", definition: "important" },
        { word: "lección", definition: "lesson" },
        { word: "me encantan", definition: "I love (plural things) ❤️" },
        { word: "pelo de la cabeza", definition: "hair on the head" },
        { word: "pienso", definition: "I think (from PENSAR)" },
        { word: "profe", definition: "teacher (short form)" },
        { word: "qué foto más bonita", definition: "what a beautiful photo! 📸" },
        { word: "ríe", definition: "laughs (from REÍR)" },
        { word: "saco", definition: "I take out (from SACAR)" },
        { word: "todos", definition: "everyone" },
        { word: "tortilla de patatas", definition: "Spanish omelette 🥚" },
        { word: "trae", definition: "brings (from TRAER)" },
        { word: "traje de flamenca", definition: "flamenco dress 💃" },
        { word: "vamos", definition: "we go (from IR)" }
    ],
    
    5: [
        { word: "abren mucho los ojos", definition: "they open their eyes wide 👀" },
        { word: "al final de la clase", definition: "at the end of the class" },
        { word: "avergonzado", definition: "embarrassed 😳" },
        { word: "común", definition: "common" },
        { word: "dice", definition: "says (from DECIR)" },
        { word: "embarazado", definition: "pregnant 🤰" },
        { word: "error", definition: "mistake ❌" },
        { word: "escribe", definition: "writes (from ESCRIBIR) ✍️" },
        { word: "está muy nervioso", definition: "he is very nervous 😰" },
        { word: "genial", definition: "great, cool" },
        { word: "hacer fotos", definition: "to take photos 📸" },
        { word: "invito", definition: "I invite (from INVITAR)" },
        { word: "se levanta", definition: "gets up (from LEVANTARSE)" },
        { word: "muy bien", definition: "very well" },
        { word: "pizarra", definition: "blackboard, whiteboard" },
        { word: "por favor", definition: "please 🙏" },
        { word: "posible", definition: "possible" },
        { word: "todos nos reímos", definition: "we all laugh (from REÍRSE) 😂" },
        { word: "viernes", definition: "Friday" }
    ],
    
// Reemplaza la sección del capítulo 6 en CHAPTER_GLOSSARY con esto:

6: [
    { word: "antes de", definition: "before" },
    { word: "apodo", definition: "nickname" },
    { word: "calles", definition: "streets 🛣️" },
    { word: "claro", definition: "of course" },
    { word: "como", definition: "like, as" },
    { word: "con atención", definition: "carefully, with attention" },
    { word: "costumbre", definition: "custom, tradition" },
    { word: "de repente", definition: "suddenly" },
    { word: "decimos", definition: "we say (from DECIR)" },
    { word: "después", definition: "after" },
    { word: "derecha", definition: "right ➡️" },
    { word: "dónde", definition: "where" },
    { word: "eligen", definition: "they choose (from ELEGIR)" },
    { word: "enseño", definition: "I show (from ENSEÑAR)" },
    { word: "entiende", definition: "understands (from ENTENDER)" },
    { word: "estrechas", definition: "narrow" },
    { word: "Giralda", definition: "The Giralda (bell tower of the Seville Cathedral) 🏛️" },
    { word: "hablamos", definition: "we talk (from HABLAR)" },
    { word: "hay", definition: "there is / there are" },
    { word: "hay muchas flores", definition: "there are many flowers 🌸" },
    { word: "irnos", definition: "to leave (from IRSE)" },
    { word: "izquierda", definition: "left ⬅️" },
    { word: "lugar", definition: "place" },
    { word: "mayor", definition: "older" },
    { word: "muchas gracias", definition: "thank you very much 🙏" },
    { word: "nada", definition: "nothing" },
    { word: "no dice nada", definition: "she says nothing" },
    { word: "nombre", definition: "name" },
    { word: "padres", definition: "parents 👨‍👩‍👧‍👦" },
    { word: "países", definition: "countries 🌍" },
    { word: "paseamos", definition: "we walk (from PASEAR) 🚶" },
    { word: "nos perdemos", definition: "we get lost (from PERDERSE)" },
    { word: "perdón", definition: "sorry, excuse me" },
    { word: "posible", definition: "possible" },
    { word: "por qué", definition: "why" },
    { word: "pregunto", definition: "I ask (from PREGUNTAR)" },
    { word: "primero", definition: "first" },
    { word: "sabe", definition: "you know (formal) (from SABER)" },
    { word: "sabemos", definition: "we know (from SABER)" },
    { word: "señora", definition: "lady, Mrs." },
    { word: "silla", definition: "chair" },
    { word: "tenemos que", definition: "we have to" },
    { word: "todo recto", definition: "straight ahead ⬆️" },
    { word: "todos", definition: "everyone, all" },
    { word: "vemos", definition: "we see (from VER)" }
],
    
    7: [
        { word: "a la vez", definition: "at the same time" },
        { word: "alma", definition: "soul" },
        { word: "coge", definition: "she takes (from COGER)" },
        { word: "cuando llego", definition: "when I arrive" },
        { word: "dónde", definition: "where" },
        { word: "durante", definition: "during" },
        { word: "enseño", definition: "I show (from ENSEÑAR)" },
        { word: "estoy segura", definition: "I am sure (female)" },
        { word: "feliz", definition: "happy" },
        { word: "feria de abril", definition: "April Fair 🎪" },
        { word: "hace muchos años", definition: "many years ago" },
        { word: "hablar", definition: "to speak" },
        { word: "libro", definition: "book 📚" },
        { word: "misterio", definition: "mystery 🔍" },
        { word: "muy rápido", definition: "very fast ⚡" },
        { word: "necesito", definition: "I need (from NECESITAR)" },
        { word: "nervioso", definition: "nervous 😰" },
        { word: "ojos", definition: "eyes 👀" },
        { word: "qué pasa", definition: "what's up?" },
        { word: "saco", definition: "I take out (from SACAR)" },
        { word: "salón", definition: "living room 🛋️" },
        { word: "segundos", definition: "seconds ⏱️" },
        { word: "terminado", definition: "finished ✅" },
        { word: "triste", definition: "sad 😢" },
        { word: "vuelvo", definition: "I return (from VOLVER)" }
    ],
    
    8: [
        { word: "además", definition: "also, in addition" },
        { word: "al día siguiente", definition: "the next day" },
        { word: "alma", definition: "soul" },
        { word: "atención", definition: "attention" },
        { word: "buena suerte", definition: "good luck 🍀" },
        { word: "claro", definition: "of course" },
        { word: "envío", definition: "I send (from ENVIAR) 📧" },
        { word: "escucha", definition: "she listens (from ESCUCHAR) 👂" },
        { word: "está bien", definition: "okay, it's fine" },
        { word: "explico", definition: "I explain (from EXPLICAR)" },
        { word: "hacer tu foto otra vez", definition: "to take your photo again 📸" },
        { word: "hago la foto", definition: "I take the photo 📸" },
        { word: "idea", definition: "idea 💡" },
        { word: "juntos", definition: "together" },
        { word: "lugar exacto", definition: "exact place 📍" },
        { word: "manos", definition: "hands ✋" },
        { word: "necesito tu ayuda", definition: "I need your help 🆘" },
        { word: "perfecta", definition: "perfect" },
        { word: "recrear", definition: "to recreate" },
        { word: "sonríe", definition: "smiles (from SONREÍR)" },
        { word: "tiene", definition: "she has (from TENER)" },
        { word: "traje de flamenca", definition: "flamenco dress 💃" },
        { word: "vamos", definition: "Let's go! (from IR)" },
        { word: "vieja y fea", definition: "old and ugly" },
        { word: "viene", definition: "she comes (from VENIR)" }
    ],
    
    9: [
        { word: "al final de la clase", definition: "at the end of the class" },
        { word: "amigos", definition: "friends 👫" },
        { word: "buena suerte", definition: "good luck 🍀" },
        { word: "despedimos", definition: "we say goodbye (from DESPEDIRSE) 👋" },
        { word: "digo", definition: "I say (from DECIR)" },
        { word: "embarazado", definition: "pregnant 🤰" },
        { word: "empieza", definition: "begins (from EMPEZAR)" },
        { word: "estamos un poco", definition: "we are a little" },
        { word: "estoy muy contento", definition: "I am very happy 😊" },
        { word: "experiencia", definition: "experience" },
        { word: "hablar", definition: "to talk" },
        { word: "intercambiamos", definition: "we exchange (from INTERCAMBIAR)" },
        { word: "llega el turno", definition: "it's the turn" },
        { word: "mantener", definition: "to keep, maintain" },
        { word: "más os gusta", definition: "what you (plural) like the most" },
        { word: "me gusta", definition: "I like ❤️" },
        { word: "nuevos amigos", definition: "new friends 👫" },
        { word: "pasear", definition: "to walk, to stroll 🚶" },
        { word: "por supuesto", definition: "of course" },
        { word: "repetir", definition: "to repeat" },
        { word: "semana que viene", definition: "next week 📅" },
        { word: "tenemos que", definition: "we have to" },
        { word: "tiene una idea", definition: "has an idea (from TENER) 💡" },
        { word: "todos nos reímos", definition: "we all laugh 😂" },
        { word: "tristes", definition: "sad 😢" },
        { word: "último día", definition: "last day" },
        { word: "vuelvo", definition: "I return (from VOLVER)" }
    ],
    
    10: [
        { word: "abrazan", definition: "they hug (from ABRAZAR) 🤗" },
        { word: "abro", definition: "I open (from ABRIR)" },
        { word: "aeropuerto", definition: "airport ✈️" },
        { word: "buenos recuerdos", definition: "good memories 📷" },
        { word: "cultura", definition: "culture" },
        { word: "cuando", definition: "when" },
        { word: "desconocido", definition: "unknown" },
        { word: "desde el cielo", definition: "from the sky ☁️" },
        { word: "después", definition: "after" },
        { word: "enhorabuena", definition: "congratulations 🎉" },
        { word: "estoy triste", definition: "I am sad 😢" },
        { word: "feliz", definition: "happy" },
        { word: "foto ganadora", definition: "winning photo 🏆" },
        { word: "foto original", definition: "original photo 📸" },
        { word: "has ganado", definition: "you have won (from GANAR) 🏆" },
        { word: "muchas gracias por todo", definition: "thank you very much for everything 🙏" },
        { word: "ordenador", definition: "computer 💻" },
        { word: "pared", definition: "wall" },
        { word: "pienso en", definition: "I think about 💭" },
        { word: "pongo", definition: "I put (from PONER)" },
        { word: "por la tarde", definition: "in the afternoon 🌇" },
        { word: "preparo para escribir", definition: "I get ready to write ✍️" },
        { word: "quiero irme", definition: "I want to leave (from QUERER + IRSE)" },
        { word: "recuerdo", definition: "memory, souvenir 📷" },
        { word: "regalo", definition: "gift, present 🎁" },
        { word: "semanas", definition: "weeks" },
        { word: "tengo un email nuevo", definition: "I have a new email 📧" },
        { word: "una semana después", definition: "a week later" },
        { word: "viaje continúa", definition: "the journey continues" },
        { word: "vienen conmigo", definition: "they come with me (from VENIR)" },
        { word: "ya no es", definition: "is no longer" }
    ]
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

// Crear sección de flashcards con modo productivo
function createFlashcardsSection() {
    const glossarySection = document.querySelector('.glossary-section');
    const chapterNav = document.querySelector('.chapter-nav');
    
    if (!glossarySection || !chapterNav) return;
    
    const flashcardsSection = document.createElement('div');
    flashcardsSection.classList.add('flashcards-game', 'hidden');
    flashcardsSection.innerHTML = `
        <h3>🃏 Flashcard Practice</h3>
        <p id="flashcards-description">Practice vocabulary with interactive flashcards!</p>
        
        <div class="flashcards-controls">
            <div class="mode-section">
                <h4>📖 Receptive Mode (Spanish → English)</h4>
                <p class="mode-description">See Spanish words, recall English meanings</p>
                <div class="mode-buttons">
                    <button class="flashcards-btn" onclick="startFlashcards('glossary', 'receptive')">
                        Practice Selected Words
                    </button>
                    <button class="flashcards-btn" onclick="startFlashcards('all', 'receptive')">
                        Practice All Chapter Words
                    </button>
                </div>
            </div>
            
            <div class="mode-section productive-mode">
                <h4>🎯 Productive Mode (English → Spanish)</h4>
                <p class="mode-description">See English meanings, recall Spanish words</p>
                <div class="mode-buttons">
                    <button class="flashcards-btn productive" onclick="startProductiveFlashcards('glossary')">
                        Practice Selected Words
                    </button>
                    <button class="flashcards-btn productive" onclick="startProductiveFlashcards('all')">
                        Practice All Chapter Words
                    </button>
                </div>
            </div>
        </div>
        
        <div id="flashcards-content" class="hidden">
            <!-- Indicador de modo -->
            <div class="mode-indicator">
                <span id="current-mode-text">Receptive Mode</span>
                <span id="mode-arrow">🇪🇸 → 🇬🇧</span>
            </div>
            
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
                            <button class="flashcard-audio-back" onclick="playPronunciation(event)" title="Listen" style="display: none;">🔊</button>
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
    
    chapterNav.parentNode.insertBefore(flashcardsSection, chapterNav.nextSibling);
}

// Iniciar flashcards con modo específico - FUNCIÓN ÚNICA Y CORREGIDA
function startFlashcards(mode, studyMode = 'receptive') {
    sessionStartTime = Date.now();
    flashcardsData = [];
    currentMode = studyMode;
    
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
    
    // Actualizar interfaz según el modo
    updateModeInterface();
    
    // Mostrar interfaz de juego
    document.querySelector('.flashcards-controls').classList.add('hidden');
    document.getElementById('flashcards-content').classList.remove('hidden');
    
    // Mostrar primera tarjeta
    showCurrentCard();
    updateStats();
    
    // Activar controles de teclado
    document.addEventListener('keydown', handleKeyPress);
}

// Función auxiliar para iniciar directamente en modo productivo
function startProductiveFlashcards(mode) {
    startFlashcards(mode, 'productive');
}

// Actualizar interfaz según el modo
function updateModeInterface() {
    const modeText = document.getElementById('current-mode-text');
    const modeArrow = document.getElementById('mode-arrow');
    const cardElement = document.getElementById('flashcard');
    
    if (currentMode === 'productive') {
        modeText.textContent = 'Productive Mode';
        modeArrow.textContent = '🇬🇧 → 🇪🇸';
        cardElement.classList.add('productive-mode');
    } else {
        modeText.textContent = 'Receptive Mode';
        modeArrow.textContent = '🇪🇸 → 🇬🇧';
        cardElement.classList.remove('productive-mode');
    }
}

// Mostrar tarjeta actual según el modo - FUNCIÓN ÚNICA Y CORREGIDA
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
    const audioBtn = document.querySelector('.flashcard-audio');
    const audioBtnBack = document.querySelector('.flashcard-audio-back');
    
    // Resetear tarjeta
    cardElement.classList.remove('flipped', 'new-card', 'correct-feedback', 'incorrect-feedback');
    isCardFlipped = false;
    
    // Mostrar contenido según el modo
    if (currentMode === 'productive') {
        // Modo productivo: mostrar inglés → español
        wordElement.textContent = currentCard.definition.replace(/📚|✈️|🌸|☀️|🔵|🚕|🏘️|👵|🚪|👩|😊|🐌|💡|✅|🏠|🛏️|🪟|👁️|🌉|🧳|😴|😊/g, '').trim();
        definitionElement.textContent = currentCard.word;
        
        // Ocultar botón de audio en frente, mostrar en reverso
        if (audioBtn) audioBtn.style.display = 'none';
        if (audioBtnBack) audioBtnBack.style.display = 'block';
        
        // Aplicar estilos de modo productivo
        cardElement.classList.add('productive-mode');
    } else {
        // Modo receptivo: mostrar español → inglés
        wordElement.textContent = currentCard.word;
        definitionElement.textContent = currentCard.definition;
        
        // Mostrar botón de audio en frente, ocultar en reverso
        if (audioBtn) audioBtn.style.display = 'block';
        if (audioBtnBack) audioBtnBack.style.display = 'none';
        
        // Remover estilos de modo productivo
        cardElement.classList.remove('productive-mode');
    }
    
    // Animación de entrada
    setTimeout(() => {
        cardElement.classList.add('new-card');
        if (currentMode === 'productive') {
            cardElement.classList.add('productive-entry');
        }
    }, 50);
    
    updateStats();
}

// Reproducir pronunciación mejorada para ambos modos
function playPronunciation(event) {
    event.stopPropagation();
    
    let wordToPronounce;
    
    if (currentMode === 'productive') {
        // En modo productivo, pronunciar siempre la palabra española
        wordToPronounce = flashcardsData[currentCardIndex].word;
    } else {
        // En modo receptivo, pronunciar la palabra del frente
        wordToPronounce = document.getElementById('card-word').textContent;
    }
    
    // Limpiar emojis para pronunciación
    wordToPronounce = wordToPronounce.replace(/[^\w\s\-áéíóúñüÁÉÍÓÚÑÜ]/g, '').trim();
    
    if ('speechSynthesis' in window && wordToPronounce) {
        const utterance = new SpeechSynthesisUtterance(wordToPronounce);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
    }
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

// Iniciar flashcards (versión legacy preservada)
function legacyStartFlashcards(mode) {
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

// Mostrar tarjeta actual (versión legacy)
function legacyShowCurrentCard() {
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

// Reproducir pronunciación (versión legacy)
function legacyPlayPronunciation(event) {
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
window.startFlashcards = startFlashcards;
window.startProductiveFlashcards = startProductiveFlashcards;
window.clearAllGlossary = clearAllGlossary;
window.flipCard = flipCard;
window.markCard = markCard;
window.playPronunciation = playPronunciation;
window.restartDifficultCards = restartDifficultCards;
window.resetFlashcards = resetFlashcards;
window.addEventListener('load', optimizeLoading);
