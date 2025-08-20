<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capítulo 5: Un error en clase</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <a href="index.html" class="back-link">← Volver al índice</a>
        
        <h1>Capítulo 5: Un error en clase</h1>
        
        <button id="emoji-toggle" class="emoji-toggle-button">Mostrar Emojis 💡</button>
        
        <div class="audio-player">
            <audio controls>
                <source src="assets/audio/capitulo-5.mp3" type="audio/mpeg">
                Tu navegador no soporta audio HTML5.
            </audio>
        </div>
        
        <div class="chapter-content">
            <p>En la escuela, Isabel dice:</p>

            <p>—Panda, <span class="glosa" data-definicion="please">por favor</span>, <span class="glosa" data-definicion="read (command) (from LEER)">lee</span> el texto en la <span class="glosa" data-definicion="blackboard, whiteboard">pizarra</span>.</p>

            <p>Panda se <span class="glosa" data-definicion="gets up (from LEVANTARSE)">levanta</span>. Está muy <span class="emoji-word" data-emoji="😥">nervioso</span>.</p>

            <p>—Profesora... estoy muy <span class="emoji-word" data-emoji="😳">embarazado</span> —<span class="glosa" data-definicion="says (from DECIR)">dice</span> Panda.</p>

            <p>Isabel y Carmen <span class="emoji-word" data-emoji="👀">abren mucho los ojos</span>. Yo no entiendo.</p>

            <p>Isabel <span class="glosa" data-definicion="writes (from ESCRIBIR)">escribe</span> en la pizarra:</p>

            <div class="language-explanation">
                <p><strong>Embarazado</strong> (español) = <span class="emoji-word" data-emoji="🤰">Pregnant</span></p>
                <p><strong>Embarrassed</strong> (inglés) = <span class="emoji-word" data-emoji="😳">Avergonzado/a</span></p>
            </div>

            <p>—¡Oh! —dice Panda—. ¡Estoy muy <span class="glosa" data-definicion="embarrassed">avergonzado</span>!</p>

            <p><span class="glosa" data-definicion="we all laugh (from REÍRSE)">Todos nos reímos</span> <span class="emoji-word" data-emoji="😂"></span>.</p>

            <p>—<span class="glosa" data-definicion="very good">Muy bien</span>, Panda —dice Isabel—. Es un error muy <span class="glosa" data-definicion="common">común</span>.</p>

            <p><span class="glosa" data-definicion="at the end of the class">Al final de la clase</span>, <span class="glosa" data-definicion="I invite (from INVITAR)">invito</span> a Carmen y a Panda a pasear.</p>

            <p>—¿Vamos al barrio de Santa Cruz a <span class="glosa" data-definicion="to take photos">hacer fotos</span>? —pregunto.</p>

            <p>—¡Sí, <span class="glosa" data-definicion="great, cool">genial</span>! —dice Panda.</p>
        </div>

        <div class="quiz">
            <h3>Comprensión - Capítulo 5</h3>
            <form class="quiz-form">
                <div class="pregunta">
                    <p>1. ¿Qué le pide Isabel a Panda?</p>
                    <label><input type="radio" name="q1" value="a"> Que escriba en la pizarra</label>
                    <label><input type="radio" name="q1" value="b" data-correcta="true"> Que lea el texto en la pizarra</label>
                    <label><input type="radio" name="q1" value="c"> Que hable en inglés</label>
                </div>

                <div class="pregunta">
                    <p>2. ¿Cómo está Panda antes de leer?</p>
                    <label><input type="radio" name="q2" value="a" data-correcta="true"> Muy nervioso</label>
                    <label><input type="radio" name="q2" value="b"> Muy contento</label>
                    <label><input type="radio" name="q2" value="c"> Muy cansado</label>
                </div>

                <div class="pregunta">
                    <p>3. ¿Qué error comete Panda?</p>
                    <label><input type="radio" name="q3" value="a"> Dice "embarazado" en lugar de "avergonzado"</label>
                    <label><input type="radio" name="q3" value="b" data-correcta="true"> Confunde embarazado (pregnant) con embarrassed</label>
                    <label><input type="radio" name="q3" value="c"> No sabe leer</label>
                </div>

                <div class="pregunta">
                    <p>4. ¿Cómo reaccionan Isabel y Carmen?</p>
                    <label><input type="radio" name="q4" value="a" data-correcta="true"> Abren mucho los ojos</label>
                    <label><input type="radio" name="q4" value="b"> Se enfadan</label>
                    <label><input type="radio" name="q4" value="c"> No dicen nada</label>
                </div>

                <div class="pregunta">
                    <p>5. ¿Qué hace Isabel para explicar el error?</p>
                    <label><input type="radio" name="q5" value="a"> Habla muy rápido</label>
                    <label><input type="radio" name="q5" value="b" data-correcta="true"> Escribe la explicación en la pizarra</label>
                    <label><input type="radio" name="q5" value="c"> Le da un libro</label>
                </div>

                <div class="pregunta">
                    <p>6. ¿Adónde invita Leo a sus compañeros?</p>
                    <label><input type="radio" name="q6" value="a"> A su casa</label>
                    <label><input type="radio" name="q6" value="b" data-correcta="true"> Al barrio de Santa Cruz</label>
                    <label><input type="radio" name="q6" value="c"> A una churrería</label>
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
            <a href="capitulo-4.html" class="prev-chapter">← Anterior: Capítulo 4</a>
            <a href="capitulo-6.html" class="next-chapter">Siguiente: Capítulo 6 →</a>
        </nav>
    </div>

    <script src="main.js"></script>
</body>
</html>
