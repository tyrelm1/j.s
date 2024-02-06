const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// Your existing JavaScript code here

// Add these variables at the top
let timer, timeLeft, score;


function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
    document.getElementById('question-counter').classList.remove('hide');
    document.getElementById('timer').classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60; // Set the initial time (in seconds)
    updateCounter();
    updateTimer();
    timer = setInterval(updateTimer, 1000); // Update timer every second
    resetState(); // Hide final score elements
    setNextQuestion();
}

function updateCounter() {
    const counterElement = document.getElementById('question-counter');
    counterElement.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
}

function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.innerText = `Time Left: ${timeLeft} seconds`;
    if (timeLeft <= 0 || currentQuestionIndex >= shuffledQuestions.length) {
        clearInterval(timer); // Stop the timer when it reaches 0 or the quiz is finished
        showFinalScore();
    } else {
        timeLeft--;
    }
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function showFinalScore() {
    const scoreContainer = document.getElementById('score-container');
    const finalScoreElement = document.getElementById('final-score');
    finalScoreElement.innerText = `Your Final Score: ${score}`;
    scoreContainer.classList.remove('hide');
}



const questions = [{
        question: 'In the movie The Matrix, what is Neos real name?',
        answers: [{
                text: 'Thomas Anderson',
                correct: true
            },
            {
                text: 'The One',
                correct: false
            }, {
                text: 'Morpheus',
                correct: false
            }, {
                text: 'Agent Smith',
                correct: false
            }
        ]
    },
    {
        question: 'Who is the leader of the Teenage Mutant Ninja Turtles?',
        answers: [{
                text: 'Donntello',
                correct: false
            },
            {
                text: 'Leonardo',
                correct: true
            },
            {
                text: 'Michelangelo',
                correct: false
            },
            {
                text: 'Raphael',
                correct: false
            }
        ]
    },
    {
        question: 'Who directed the 2017 film Get Out?',
        answers: [{
                text: 'Stephen King',
                correct: false
            },
            {
                text: 'Rob Zombie',
                correct: false
            },
            {
                text: 'Jordan Peele',
                correct: true
            },
            {
                text: 'Guillermo del Toro',
                correct: false
            }
        ]
    },
    {
        question: 'Who directed the 1994 film Pulp Fiction?',
        answers: [{
                text: 'Quentin Tarintino',
                correct: true
            },
            {
                text: 'Christopher Nolan',
                correct: false
            },
            {
                text: 'Martin Scorsese',
                correct: false
            },
            {
                text: 'James Cameron',
                correct: false
            },
        ]
    }
]