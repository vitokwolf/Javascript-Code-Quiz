// Questions and Answers Array
var questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        choiceA: '1. strings',
        choiceB: '2. booleans',
        choiceC: '3. alerts',
        choiceD: '4. numbers',
        correct: 'C'
    },
    {
        question: 'The condition in an if/else statement is enclosed with _____.',
        choiceA: '1. quotes',
        choiceB: '2. curly brackets',
        choiceC: '3. parentheses',
        choiceD: '4. square brackets',
        correct: 'C'
    },
    {
        question: 'Arrays in JavaScript can be used to store ______',
        choiceA: '1. numbers and strings',
        choiceB: '2. other arrays',
        choiceC: '3. booleans',
        choiceD: '4. all of the above',
        correct: 'D'
    },
    {
        question: 'String values must be enclosed with _____ when being assigned to variables.',
        choiceA: '1. commas',
        choiceB: '2. curly brackets',
        choiceC: '3. quotes',
        choiceD: '4. parentheses',
        correct: 'C'
    },
    {
        question: 'A very useful tool during development and debugging for printing content to the debugger is:',
        choiceA: '1. JavaScript',
        choiceB: '2. terminal/bash',
        choiceC: '3. for loops',
        choiceD: '4. console.log',
        correct: 'D'
    }
];

// Timer Countdown Function
var timerEl = document.getElementById('countdown');
var timeLeft = 60;

function countdown() {
    var timeInterval = setInterval(function () {
        if (timeLeft > 5) {
            timerEl.textContent = 'Time: ' + timeLeft + ' seconds';
            timeLeft--;
        }
        else if (timeLeft <= 5 && timeLeft > 1) {
            timerEl.textContent = 'Time: ' + timeLeft + ' seconds';
            timerEl.style.color = 'red';
            timeLeft--;
        }
        else if (timeLeft === 1) {
            timerEl.textContent = 'Time: ' + timeLeft + ' second';
            timeLeft--;
        }
        else if (timeLeft === 0) {
            timerEl.textContent = 'Time up!';
            clearInterval(timeInterval);
            alert('Time is up! Let us see how you did.');
            scoreRender();
        }
    }, 1000);
};



//Key Variables
var runningQuestion = 0;
var score = 0;

//Quiz and Questions
var question = document.getElementById('question');
var choiceA = document.getElementById('A');
var choiceB = document.getElementById('B');
var choiceC = document.getElementById('C');
var choiceD = document.getElementById('D');
var answerDisplay = document.getElementById('answer');

// Function to display quiz questions
function renderQuestion() {
    var q = questions[runningQuestion];
    question.innerHTML = q.question;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
};

// Function to Check Answers and Move onto Next Question
function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {
        score++;
        answerDisplay.innerHTML = 'Correct! Way to Go!';
    }
    else {
        answerDisplay.innerHTML = 'Wrong! UH OH..';
        timeLeft = timeLeft - 10;
    };
    if (runningQuestion < questions.length - 1) {
        runningQuestion ++;
        renderQuestion();
    }
    else {
        alert('Congratulations! There is still time left! Lets see your score!');
        scoreRender();
        timeLeft = 99999999;
        timerEl.style.display = 'none';
    }
};

// Start Timer and Quiz
var intro = document.getElementById('intro');
var quiz = document.getElementById('quiz');
var startBtn = document.getElementById('start');

function startQuiz() {
    countdown();
    intro.style.display = 'none';
    renderQuestion();
    quiz.style.display = 'block';
};

startBtn.addEventListener('click', startQuiz);

//Scoring Pages
var initials = document.getElementById('initials');
var scoreboard = document.getElementById('scoreboard');

// Function to Display Score/ End of Quiz
function scoreRender() {
    quiz.style.display = 'none';
    initials.style.display = 'block';
    var scorePercent = Math.round(100 * score / questions.length);
    document.getElementById('yourscore').innerHTML = 'Your final score is ' + scorePercent + '%.';
    localStorage.setItem('yourscore', JSON.stringify(scorePercent));
};

// Local Storage for Initials Input
var initialsInput = document.getElementById('inpName');
var submit = document.getElementById('submit');

// Submitting and Storing High Scores
submit.addEventListener('click', function (event) {
    localStorage.setItem('initials', initialsInput.value);
    highScores();
});

// Display Scoreboard Page Function
function highScores() {
    intro.style.display = 'none';
    quiz.style.display = 'none';
    initials.style.display = 'none';
    scoreboard.style.display = 'block';

    var userNameDisplay = localStorage.getItem('initials');
    var scorePercent = localStorage.getItem('yourscore');
    scorePercent = JSON.parse(scorePercent);
    document.getElementById('scorerender').innerHTML = userNameDisplay + ' - ' + scorePercent;
};

//View high scores header button
document.getElementById('view').addEventListener('click', highScores);


//Return Button on Scoreboard Screen
document.getElementById('back').addEventListener('click', goBack);

function goBack() {
    location.reload();
    return false;
}


// Clear High Scores Button
document.getElementById('clear').addEventListener('click', function () {
    localStorage.clear();
    alert('Scores have been cleared. Please refresh your page.')
});