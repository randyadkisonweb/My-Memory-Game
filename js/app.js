/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Code based largely on a Udacity Tutorial By: Mike Wales



var cards = ['fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];





function initGame() {

    var deck = document.querySelector('.deck');
    var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
    sec = 0;
    timer;
    match = 0;
    moves = 0;
    timerStart();



}

initGame();


var allCards = document.querySelectorAll('.card');
var openCards = [];
var moves;
var sec = 0;
var timer;
var restartBtn = document.querySelector('.restart');
var modalRestartBtn = document.querySelector('div.modal div.restart');
var modal = document.getElementsByClassName('modal')[0];
var match;
//var star1 = document.getElementsByClassName('.star1')
//var star2 = document.getElementByClassName('.star2')
//var star3 = document.getElementByClassName('.star3')



// creates cards

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}" ></i></li>`
}






// adds click and compares
// move and match counter

allCards.forEach(function(card) {
    card.addEventListener('click', function(e) {


        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');

            if (openCards.length == 2) {
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    openCards[0].classList.add('match');
                    openCards[0].classList.add('open');
                    openCards[0].classList.add('show');


                    openCards[1].classList.add('match');
                    openCards[1].classList.add('open');
                    openCards[1].classList.add('show');

                    match = match + 1;

                    if (match === 8) {
                        timerStop();
                        displayModal();
                        console.log('you got them all');
                    }






                    openCards = [];

                    moves++;
                    console.log(match);
                    console.log(moves);

                    moveCounter();






                } else {


                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show')
                        });


                        openCards = [];

                    }, 1000);

                    moves++;

                    console.log(moves);

                    moveCounter();



                }

            }
        }
    });
});


//restart
restartBtn.addEventListener('click', initGame);
modalRestartBtn.addEventListener('click', initGame);

restartBtn.addEventListener('click', reloadWindow);
modalRestartBtn.addEventListener('click', reloadWindow);

function reloadWindow() {
    window.location.reload(true);
}



//timer start / stop for main html and modal



function timerStart() {
    timer = setInterval(function() {
        document.querySelector('.timer').innerHTML = `${sec} Seconds`;
        document.querySelector('.modal .timer').innerHTML = `${sec} Seconds`;

        sec++;

    }, 1000);
}

function timerStop() {
    //document.querySelector('.timer').innerHTML = `${sec} Seconds`;
    //document.querySelector('.modal .timer').innerHTML = `${sec} Seconds`;
    clearInterval(timer);
    console.log('Is timer stopping');
}



// Move Counter

function moveCounter() {
    document.querySelector('.modal .moves').innerHTML = `${moves}`;
    document.querySelector('.moves').innerHTML = `${moves}`;
    rating();



}

// displays modal resets automatically


function displayModal() {

    modal.setAttribute("style", "display: block");

}
// Star rating
function rating() {
    if (moves < 8) {} else if (moves > 9 && moves < 15) {
        $('.star1').remove();

    } else if (moves > 15) {
        $('.star1').remove();
        $('.star2').remove();
    }
}