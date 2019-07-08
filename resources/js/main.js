const words = [
    [
        'soda',
        'full',
        'bottle',
        'vast',
        'glue',
        'close',
        'next',
        'short',
        'nice',
        'hurry',
        'robin',
        'trace',
        'rock',
        'absent',
        'cover',
        'note',
        'burst',
        'relax',
        'group',
        'sad',
        'mix',
        'fix',
        'hot',
        'pin',
        'rob',
        'yell',
        'pop',
        'hill',
        'wiry',
        'dirt',
    ],
    [
        'belief',
        'slippery',
        'bizarre',
        'learned',
        'vivacious',
        'paddle',
        'answer',
        'awesome',
        'distance',
        'fertile',
        'wakeful',
        'grandmother',
        'illegal',
        'thirsty',
        'skillful',
        'deteriorate',
        'poised',
        'adjoining',
        'interesting',
        'stranger',
        'polite',
        'wholesale',
        'tenuous',
        'scissors',
        'brainy',
        'interrogation',
        'humorous',
        'scrape',
        'replace',
        'languid',
    ],
];

// Globals
let time = 5;
let score = 0;
let lvl = 0;
let wordIndex = 0;
let highscore = 0;
let isPlaying = false;
let currWord;
let hsl = 120;
const arrayLength = words[lvl].length;

// DOM Elements
const wordInput = document.querySelector('.row__input');
const scoreSpan = document.querySelector('#score');
const highscoreSpan = document.querySelector('#highscore');
const currentWord = document.querySelector('.row__word');
const countdownTime = document.querySelector('.row__countdown--time');
const level = document.querySelector('.row__level');
const circle = document.querySelector('.row__circle');

function nextWord(wordsArray) {
    hsl = hsl < 4 ? 120 : hsl;
    hsl -= 120 / arrayLength;
    circle.style.border = `2px solid hsl(${hsl}, 100%, 50%)`;
    currWord = wordsArray[lvl][wordIndex];
    currentWord.textContent = currWord;
    level.textContent = `Level ${lvl}`;
    wordIndex += 1;
    time = 5;

    if (wordIndex > Math.floor(arrayLength * 0.66)) time = 3;
    else if (wordIndex > Math.floor(arrayLength * 0.33)) time = 4;

    if (wordIndex === arrayLength) {
        lvl = 1;
        wordIndex = 0;
    }
}

function reset(wordsArray) {
    if (highscore < score) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
        highscoreSpan.textContent = highscore;
    }

    time = 5;
    hsl = 120;
    score = 0;
    wordIndex = 1;
    lvl = 0;
    isPlaying = false;

    circle.style.border = `2px solid hsl(${hsl}, 100%, 50%)`;
    level.textContent = `Level ${lvl}`;
    scoreSpan.textContent = score;
    currWord = wordsArray[lvl][wordIndex - 1];
    currentWord.textContent = currWord;
    countdownTime.textContent = time;
}

function countdown() {
    if (isPlaying) {
        countdownTime.textContent = time;
        if (time > 0) {
            time -= 1;
        } else if (time === 0) {
            reset(words);
        }
    }
}

function startMatch() {
    if (wordInput.value.toUpperCase() === currWord.toUpperCase()) {
        isPlaying = true;
        nextWord(words);
        wordInput.value = '';
        score += 1;
        scoreSpan.textContent = score;
        countdown();
    }
}

function init() {
    highscore = localStorage.getItem('highscore') === null ? highscore : parseInt(localStorage.getItem('highscore'));
    highscoreSpan.textContent =
        localStorage.getItem('highscore') === null ? highscore : localStorage.getItem('highscore');
    countdownTime.textContent = time;
    nextWord(words);
    wordInput.addEventListener('input', startMatch);
    setInterval(countdown, 1000);
}

init();
