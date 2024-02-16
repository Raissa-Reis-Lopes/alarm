const button = document.getElementById("start-stop-button");
const minutes = document.getElementById("time-selector");
const seconds = document.getElementById("seconds-selector");
const message = document.getElementById('status');
const timerUI = document.getElementById('countdown');


let timerInterval;
let totalTimeInSeconds;
let timeRemaining;
let alarmSound = new Audio('./audio/alarm.mp3');

//Criando as options que vão aparecer no select
for(let i=0; i<60;i++){
    const option = document.createElement("option");
    option.value = i;
    if(i===0){
        option.innerText = `${i}`;
    }else if(i ===1){
        option.innerText = `${i} minuto`;
    } else{
        option.innerText = `${i} minutos`;
    }
    minutes.appendChild(option);
}

for(let i=0; i<60;i++){
    const option = document.createElement("option");
    option.value = i;
    if(i===0){
        option.innerText = `${i}`;
    }else if(i ===1){
        option.innerText =  `${i} segundo`;
    } else{
        option.innerText =  `${i} segundos`;
    }
    seconds.appendChild(option);
}

//Adicionando o ouvinte no botão para começar ou parar o alarme
button.addEventListener("click", function(){
    //Vou verificar o que está escrito dentro do botão para decidir o que ele deve fazer
    if (button.textContent === 'Iniciar Contagem' || button.textContent === 'Armar Alarme' ) {
        startTimer();
        button.textContent = 'Desarmar Alarme';
    } else {
        stopTimer();
        button.textContent = 'Armar Alarme';
        alarmSound.pause();
        alarmSound.currentTime = 0; // Define o tempo do áudio de volta ao início
        timerUI.classList.remove("warning");
        message.classList.remove("warning");
        timerUI.textContent = "00:00"
    }
});

function startTimer() {
    //Pegando os valores dos minutos e segundos nessa variável local
    const minutesValue = Number(minutes.value);
    const secondsValue = Number(seconds.value);

    //Vou pegar o valor inicial para calcular depois os 5%
    totalTimeInSeconds = minutesValue * 60 + secondsValue;
    timeRemaining = totalTimeInSeconds;

    //Atualiza o timer que aparece na tela
    updateTimerUI();
    timerInterval = setInterval(updateTimer, 1000);
}

//Para atualizar os valores do timer na tela, criei essa função updateTimer
function updateTimer() {
    timeRemaining--;

    if (timeRemaining <= 0) {
        stopTimer();
        triggerAlarm();
    } else {
        updateTimerUI();

        //Verificando se o valor restante é menor do que 5%
        const percentRemaining = (timeRemaining / totalTimeInSeconds) * 100;

        if (percentRemaining < 5) {
            timerUI.classList.add("warning")
            message.classList.add("warning");
            message.textContent = 'Tempo está acabando!';

        }
    }
}

//Se parar o timer, limpa se tiver mensagem embaixo, 
function stopTimer() {
    clearInterval(timerInterval);
    updateTimerUI();
    message.textContent = '';
}

function updateTimerUI() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    //Formartar os números se for menos de 10 minutos ou segundos, colocar o 0 na frente
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    timerUI.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function triggerAlarm() {
    alarmSound.play();
    message.textContent = 'Tempo esgotado!';
    message.classList.add("warning")
}
