---
layout: chapter
title: "Capítulo 1: Un piso en Sevilla"
chapter_number: 1
audio_file: /assets/audio/capitulo-1.mp3
---

<!-- Botón para mostrar/ocultar Emojis -->
<button id="emoji-toggle" class="emoji-toggle-button">Mostrar Emojis 💡</button>

<!-- Reproductor de Audio -->
<audio controls src="{{ page.audio_file }}">
    Tu navegador no soporta el audio.
</audio>

<hr>

<!-- Texto del Capítulo con Glosas y Emojis -->
<p>Me llamo Leo. Tengo 19 años y soy de Hong Kong. Ahora estoy en España. Estoy en Sevilla para estudiar español.</p>

<p>El <span class="emoji-word" data-emoji="✈️">avión</span> llega a Sevilla. Es el mes de abril y hace <strong><span class="glosa" data-definicion="good weather">buen tiempo</span></strong>. El <strong><span class="glosa" data-definicion="sky">cielo</span></strong> es muy azul. Hay mucha <strong><span class="glosa" data-definicion="light">luz</span></strong>.</p>

<p>Tomo un <span class="emoji-word" data-emoji="🚕">taxi</span>. El taxi me lleva a un <strong><span class="glosa" data-definicion="apartment / flat">piso</span></strong>. El piso está en el centro de Sevilla. Una mujer abre la <strong><span class="glosa" data-definicion="door">puerta</span></strong>.</p>

<p>—Hola —dice la mujer—. Yo soy Elena.<br>—Hola —digo yo—. Yo soy Leo.</p>

<p>Elena es una mujer mayor. Es muy amable y sonríe mucho. Habla despacio. Yo entiendo un poco, y eso me pone contento.</p>

<p>El piso es grande y bonito. Mi habitación es pequeña. Hay una <span class="emoji-word" data-emoji="🛏️">cama</span>, una <span class="emoji-word" data-emoji="🪑">mesa</span> y un <strong><span class="glosa" data-definicion="wardrobe / closet">armario</span></strong>. También hay una <strong><span class="glosa" data-definicion="window">ventana</span></strong> grande. Desde la ventana veo una torre muy alta y muy bonita.</p>

<p>—Es la Giralda —dice Elena.<br>—La Giralda —repito yo. Es una palabra nueva.</p>

<p>En la habitación, abro un <strong><span class="glosa" data-definicion="drawer">cajón</span></strong> de la mesa. Dentro del cajón hay una <span class="emoji-word" data-emoji="🖼️">foto</span>. Es una foto antigua, en blanco y negro. En la foto hay una chica. La chica lleva un vestido muy especial. La chica está delante de la Giralda.</p>

<p>Detrás de la foto hay una palabra: "Recuerdo". No entiendo la palabra. Guardo la foto. Es un secreto.</p>

<hr>

<!-- Sección de Reacciones con Emojis -->
<div class="reacciones">
    <p>¿Qué te ha parecido el capítulo?</p>
    <button>❤️</button>
    <button>😂</button>
    <button>😮</button>
    <button>🤔</button>
</div>

<hr>

<!-- Preguntas de Comprensión Lectora -->
    <div class="quiz">
        <h3>Preguntas de Comprensión</h3>
        <form id="quiz-capitulo-1" class="quiz-form">
            <div class="pregunta">
                <p><strong>1. ¿De dónde es Leo?</strong></p>
                <label><input type="radio" name="q1" value="a"> De Sevilla</label>
                <label><input type="radio" name="q1" value="b" data-correcta="true"> De Hong Kong</label>
                <label><input type="radio" name="q1" value="c"> De España</label>
            </div>
            <div class="pregunta">
                <p><strong>2. ¿Qué ve Leo desde la ventana de su habitación?</strong></p>
                <label><input type="radio" name="q2" value="a" data-correcta="true"> La Giralda</label>
                <label><input type="radio" name="q2" value="b"> El cielo azul</label>
                <label><input type="radio" name="q2" value="c"> Un taxi</label>
            </div>
            <button type="submit" class="quiz-submit-btn">Verificar Respuestas</button>
        </form>
        <div id="resultado-quiz-1" class="resultado-quiz"></div>
    </div>
