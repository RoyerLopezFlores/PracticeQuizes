#PracticeQuizes
Es un proyecto donde se usa los generadores de texto para crear un quiz, que sera renderizado en este proyect, para ello podemos usar ChatGPT pasando el siguiente prompt

``` 
Realiza un cuestionario, con preguntas y respuestas  donde, no se enumere las preguntas, ni las alternativas, evita que las alternativas se repitan y se presente en el siguiente formato:
# ¿Cuánto es 1 + 1 ?
> 0
> 1
< 2
> 3
Donde, el # reprenta la pregunta , el > representa las alternativas y el < representa una alternativa que es respuesta de la pregunta realizada, coloca en un bloque para copiar todas las preguntas a un .txt. Genera preguntas sobre cultura general 
```
Revisa que no exista alternativas iguales, los modeleos generadores de texto pueden tender errores lo mejor es que se verifique si las respuestas concuerdan con la pregunta.
