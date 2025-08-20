<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capítulo 9: El último día de clase</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <a href="index.html" class="back-link">← Volver al índice</a>
        
        <h1>Capítulo 9: El último día de clase</h1>
        
        <button id="emoji-toggle" class="emoji-toggle-button">Mostrar Emojis 💡</button>
        
        <div class="audio-player">
            <audio controls>
                <source src="assets/audio/capitulo-9.mp3" type="audio/mpeg">
                Tu navegador no soporta audio HTML5.
            </audio>
        </div>
        
        <div class="chapter-content">
            <p>Hoy es el <span class="glosa" data-definicion="last day">último día</span> de clase. Todos estamos un poco <span class="emoji-word" data-emoji="😢">tristes</span>.</p>

            <p>Isabel nos pregunta:</p>

            <p>—¿Qué es lo que <span class="glosa" data-definicion="what you like the most">más os gusta</span> de Sevilla?</p>

            <p>Carmen dice:</p>

            <p>—A mí me gusta el <span class="emoji-word" data-emoji="☀️">sol</span> y la gente.</p>

            <p>Yo digo:</p>

            <p>—A mí me gusta la comida y la historia.</p>

            <p><span class="glosa" data-definicion="it's the turn">Llega el turno</span> de Panda. —A mí me gusta la gente y el flamenco. ¡Y ya no estoy embarazado!</p>

            <p><span class="glosa" data-definicion="we all laugh">Todos nos reímos</span> <span class="emoji-word" data-emoji="😂"></span>.</p>

            <p><span class="glosa" data-definicion="at the end of the class">Al final de la clase</span>, nos <span class="glosa" data-definicion="we say goodbye (from DESPEDIRSE)">despedimos</span>.</p>

            <p>—<span class="glosa" data-definicion="good luck">Buena suerte</span> —dice Isabel. <span class="glosa" data-definicion="we exchange (from INTERCAMBIAR)">Intercambiamos</span> nuestros números de <span class="emoji-word" data-emoji="📱">teléfono</span>.</p>

            <p>—<span class="glosa" data-definicion="we are going to keep in touch">Vamos a mantener el contacto</span> —dice Carmen.</p>

            <p>—Tenemos que <span class="glosa" data-definicion="to repeat">repetir</span> otro año —dice Panda.</p>

            <p>Es una despedida, pero no es triste. Son mis <span class="glosa" data-definicion="new friends">nuevos amigos</span> del español.</p>
        </div>

        <div class="quiz">
            <h3>Comprensión - Capítulo 9</h3>
            <form class="quiz-form">
                <div class="pregunta">
                    <p>1. ¿Cómo se sienten todos en el último día de clase?</p>
                    <label><input type="radio" name="q1" value="a"> Muy contentos</label>
                    <label><input type="radio" name="q1" value="b" data-correcta="true"> Un poco tristes</label>
                    <label><input type="radio" name="q1" value="c"> Muy nerviosos</label>
                </div>

                <div class="pregunta">
                    <p>2. ¿Qué le gusta más a Carmen de Sevilla?</p>
                    <label><input type="radio" name="q2" value="a" data-correcta="true"> El sol y la gente</label>
                    <label><input type="radio" name="q2" value="b"> La comida y la historia</label>
                    <label><input type="radio" name="q2" value="c"> El flamenco y los churros</label>
                </div>

                <div class="pregunta">
                    <p>3. ¿Qué le gusta más a Leo de Sevilla?</p>
                    <label><input type="radio" name="q3" value="a"> El sol y la gente</label>
                    <label><input type="radio" name="q3" value="b" data-correcta="true"> La comida y la historia</label>
                    <label><input type="radio" name="q3" value="c"> La gente y el flamenco</label>
                </div>

                <div class="pregunta">
                    <p>4. ¿Qué dice Panda sobre estar "embarazado"?</p>
                    <label><input type="radio" name="q4" value="a"> Que todavía está embarazado</label>
                    <label><input type="radio" name="q4" value="b" data-correcta="true"> Que ya no está embarazado</label>
                    <label><input type="radio" name="q4" value="c"> Que no entiende la palabra</label>
                </div>

                <div class="pregunta">
                    <p>5. ¿Qué intercambian los estudiantes?</p>
                    <label><input type="radio" name="q5" value="a"> Direcciones de email</label>
                    <label><input type="radio" name="q5" value="b" data-correcta="true"> Números de teléfono</label>
                    <label><input type="radio" name="q5" value="c"> Fotos</label>
                </div>

                <div class="pregunta">
                    <p>6. ¿Qué quiere hacer Panda el año que viene?</p>
                    <label><input type="radio" name="q6" value="a"> Irse a Hong Kong</label>
                    <label><input type="radio" name="q6" value="b" data-correcta="true"> Repetir otro año en Sevilla</label>
                    <label><input type="radio" name="q6" value="c"> Estudiar en Italia</label>
                </div>

                <button type="submit">Comprobar respuestas</button>
            </form>
            <div class="resultado-quiz"></div>
        </div>

        <div class="reacciones">
            <p>¿Cómo te ha parecido este capítulo?</p>
            <button>😍</button>
            <button>😊</button>
            <button>😐</button>
            <button>😕</button>
            <button>🤔</button>
        </div>

        <nav class="chapter-nav">
            <a href="capitulo-8.html" class="prev-chapter">← Anterior: Capítulo 8</a>
            <a href="capitulo-10.html" class="next-chapter">Siguiente: Capítulo 10 →</a>
        </nav>
    </div>

    <script src="main.js"></script>
</body>
</html>
