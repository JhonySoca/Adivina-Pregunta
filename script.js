//total de preguntas del juego
const TOTAL_PREGUNTAS=10;
//variable que me lleva la cantidad de respuestas acertadas
var cantidadAcertadas=0;
//variable que controla la pregunta actual. comienza en -1,pq la primera pregunta es la 0
var numPreguntaActual=-1;
//voy a necesitar una estructura para saber que pregunta se ha respondido y cual no
//lo vamos a mantener en un arreglo ,i:0 indica que no se ha respondido, 1 indica que si
//coloco la cantidad de preguntas que hay , en este caso puse 10  
var estaPregunta=[0,0,0,0,0,0,0,0,0,0];


//creamos la base de datos de preguntas
const bd_juego=[
    {
        id:'A',
        pregunta:"Empresa reconocida que se dedica a los servidores",
        respuesta:"amazon"
    },
    {
        id:'B',
        pregunta:"Termino en ingles que hace referencia a una copia de seguridad ",
        respuesta:"backup"
    },
    {
        id:'C',
        pregunta:"Nombre de la memoria que almacena temporalmente los datos de la computadora ",
        respuesta:"cache"
    },
    {
        id:'D',
        pregunta:"Archivo que controla los perifericos que conectan a las computadoras ",
        respuesta:"driver"
    },
    {
        id:'E',
        pregunta:"Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir",
        respuesta:"encriptar"
    },
    {
        id:'F',
        pregunta:"Famosa red social creada por Marck Zuckerberg",
        respuesta:"facebook"
    },
    {
        id:'G',
        pregunta:"Lenguaje de programacion creado por google",
        respuesta:"go"
    },
    {
        id:'H',
        pregunta:"Lenguaje utilizado para la estructura de paginas web",
        respuesta:"html"
    },
    {
        id:'I',
        pregunta:"Aspecto que presentan los programas tras su ejecucion mediante el cual ejercemos ",
        respuesta:"interfaz"
    },
    {
        id:'J',
        pregunta:"Lenguaje de programacion con el cual se diseña el sistema operativo Android",
        respuesta:"java"
    },
]

//variables para controlar el tiempo
const timer=document.getElementById("tiempo");
//tiempo del juego en segundos
const TIEMPO_DEL_JUEGO=60;
//variable que indica el tiempo restante
let timeleft=TIEMPO_DEL_JUEGO;
//variable que manje el contador
var countdown;

//creamos las letras de la A-J de forma circular
const container=document.querySelector(".container");
for(let i=1;i <= TOTAL_PREGUNTAS;i++){
    const circle =document.createElement("div");
    circle.classList.add("circle");
    circle.textContent=String.fromCharCode(i+96);
    circle.id=String.fromCharCode(i+96).toUpperCase();
    container.appendChild(circle);

    const angle=((i-1)/TOTAL_PREGUNTAS)* Math.PI*2-(Math.PI/2);
    const x=Math.round(95+120*Math.cos(angle));
    const y=Math.round(95+120*Math.sin(angle));
    circle.style.left=`${x}px`;
    circle.style.top=`${y}px`;
}
//boton comenzar
var comenzar=document.getElementById("comenzar");
comenzar.addEventListener("click",function(event){
    document.getElementById("pantalla-inicial").style.display="none";
    document.getElementById("pantalla-juego").style.display="block";

    //largamos el tiempo
    largarTiempo();
    cargarPregunta();
})
function largarTiempo(){
    countdown=setInterval(()=>{
        //restar un segundo al tiempo restante
        timeleft--;
        //actualizamos el texto del cronometro con el tiempo restante 
        timer.innerText=timeleft;
        //si el tiempo llega a 0, detener el cronometro
        if(timeleft<0){
            clearInterval(countdown);
            alert
            
            //alert("se acabo el tiempo");
            mostrarPantallaFinal();
        }
    },1000);
}

//funcion que carga la pregunta
function cargarPregunta(){
    numPreguntaActual++;
    //controlo si he llegado al final de las preguntas , para iniciar de nuevo
    if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
    }

    //debo controlar que todavia hallan preguntas para contestar 
    //es decir ver si en el arreglo estadoPregunta existe algun 0
    if(estaPregunta.indexOf(0)>=0){
        //ahora debo buscar cual de todas es la que esta sin responder, es decir buscar el primer 0 del arreglo
        while(estaPregunta[numPreguntaActual]==1){
            numPreguntaActual++;
            if(numPreguntaActual>=TOTAL_PREGUNTAS){
                numPreguntaActual=0;
            }
        }
        //ahora si busco la pregunta en la base de datos de las preguntas
        document.getElementById("letra-pregunta").textContent=bd_juego[numPreguntaActual].id;
        document.getElementById("pregunta").textContent=bd_juego[numPreguntaActual].pregunta;
        var letra =bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.add("pregunta-actual");

    }else{//significa que ya se han respondido todas las preguntas
        clearInterval(countdown);
        mostrarPantallaFinal()
    }
}


//detectamos cada vez que haya un cambio en el input para ver cuando se presione enter 
//y controlar si lo que ingreso es correcto o no
var respuesta=document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event){
    //detecto si se presiono enter 
    if(event.keyCode===13){
        if(respuesta.value==""){
            alert("Debe ingresar un valor");
            return;
        }
        //obtengo la respuesta ingresada
        var txtRespuesta=respuesta.value;
        controlarRespuesta(txtRespuesta.toLowerCase());
    }
    
})

function controlarRespuesta(txtRespuesta){
    //controlo si la respuesta es correcta
    if(txtRespuesta==bd_juego[numPreguntaActual].respuesta){
        //alert("respuesta correcta");
        cantidadAcertadas++;
    //actualizo el estado de la pregunta actual a 1, para indicar que ya esta respondida
    estaPregunta[numPreguntaActual]=1;

    var letra=bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");
    }else{
        estaPregunta[numPreguntaActual]=1;
        var letra=bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("mal-respondida");
    }

    //limpiamos el inpu
    respuesta.value="";
    //cargamos la proxima pregunta
    cargarPregunta();
}

//boton para pregunta sin contestar
var pasar=document.getElementById("pasar");
pasar.addEventListener("click",function(event){
    var letra=bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");

    cargarPregunta()
})

//muestro la pantalla final

function mostrarPantallaFinal(){
    document.getElementById("acertadas").textContent=cantidadAcertadas;
    document.getElementById("score").textContent=(cantidadAcertadas*100)/10+"% de acierto";
    document.getElementById("pantalla-juego").style.display="none";
    document.getElementById("pantalla-final").style.display="block";
}

//boton para recomenzar el juego

var recomenzar=document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event){
    numPreguntaActual=-1;
    timeleft=TIEMPO_DEL_JUEGO;
    timer.innerText=timeleft;
    cantidadAcertadas=0;
    estaPregunta=[0,0,0,0,0,0,0,0,0,0];
    //quito las clases de los circulos
    var circulos=document.getElementsByClassName("circle");
    for(i=0;i<circulos.length;i++){
        circulos[i].classList.remove("pregunta-actual");
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
    }
    document.getElementById("pantalla-final").style.display="none";
    document.getElementById("pantalla-juego").style.display="block";
    respuesta.value="";
    largarTiempo();
    cargarPregunta();
})