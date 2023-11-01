//Элементы интерфейса
let game_get_task = document.querySelector('.game_get_task');
let game_user_answer = document.querySelector('.game_user_answer');
let game_user_button = document.querySelector('.game_user_button');
let timerView = document.querySelector('.timer');
let counter = document.querySelector('.counter');
let hearts = document.querySelector('.hearts');

let level_duration = 90;

//Данные игры
let currentQuestion = 0;
let timer;
let timeLeft = level_duration;
let errors = 0;

function showQuestion() {
    game_get_task.textContent = tasks[currentQuestion].task;
    game_user_answer.value = "";
    counter.textContent = `${currentQuestion + 1} / 10`
    resetTimer();
}

function checkAnswer(){
    
    const userAnswer = Number(game_user_answer.value);

    if (userAnswer === tasks[currentQuestion].answer) {
        nextQuestion();
    } else {
        errors++;
        hearts.removeChild(hearts.lastElementChild);

        if (errors >= 5) {
            window.location.href = "lose.html"; // Переход на страницу проигрыша
        } else {
            resetTimer();
            nextQuestion();
        }
    }

}

function nextQuestion() {
    if (currentQuestion >= tasks.length - 1) {
        window.location.href = "win.html"; // Переход на страницу победы
        return;
    }

    currentQuestion += 1;
    showQuestion();
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = level_duration; // Сброс таймера обратно до 2 минут 30 секунд
    updateTimerDisplay();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
        errors++;
        if (errors >= 5) {
            clearInterval(timer); // Остановка таймера при проигрыше
            window.location.href = "lose.html"; // Переход на страницу проигрыша
            return;
        }

        if (hearts.childElementCount > 0) {
            hearts.removeChild(hearts.lastElementChild);
        }
        
        nextQuestion();
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerView.textContent = `${minutes} мин. ${seconds < 10 ? '0' : ''}${seconds} сек.`;
}

game_user_button.addEventListener("click", checkAnswer);

window.onload = showQuestion;
