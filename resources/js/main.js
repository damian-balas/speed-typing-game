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

// DOM Elements
const wordInput = document.querySelector('.row__input');
const scoreSpan = document.querySelector('#score');
const highscoreSpan = document.querySelector('#highscore');
const currentWord = document.querySelector('.row__word');
const countdownTime = document.querySelector('.row__countdown--time');
const level = document.querySelector('.row__level');
const circle = document.querySelector('.row__circle');

function nextWord(wordsArray) {
    hsl = hsl < 1 ? 120 : hsl;
    hsl -= 120 / wordsArray[lvl].length;
    circle.style.border = `2px solid hsl(${hsl}, 100%, 50%)`;
    currWord = wordsArray[lvl][wordIndex];
    currentWord.innerHTML = currWord;
    wordIndex += 1;
    time = 5;
    if (wordIndex > 10) time = 4;
    if (wordIndex > 20) time = 3;

    if (wordIndex === wordsArray[lvl].length) {
        lvl = 1;
        level.textContent = `Level ${lvl}`;
        wordIndex = 0;
    }
}

function reset(wordsArray) {
    time = 5;
    hsl = 120;
    if (highscore < score) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
        highscoreSpan.textContent =
            localStorage.getItem('highscore') === null ? highscore : localStorage.getItem('highscore');
    }
    score = 0;
    scoreSpan.textContent = score;
    wordIndex = 0;
    lvl = 0;
    level.textContent = `Level ${lvl}`;
    countdownTime.textContent = time;
    currWord = wordsArray[lvl][wordIndex];
    currentWord.textContent = currWord;
    wordIndex += 1;
    isPlaying = false;
}

function countdown() {
    if (isPlaying) {
        if (time > 0) {
            time -= 1;
        } else if (time === 0) {
            reset(words);
        }
        countdownTime.textContent = time;
    }
}

function startMatch() {
    if (wordInput.value === currWord) {
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
