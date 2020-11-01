//IPO => Inout, Process, Output

//IIFE Immediately Invoked Function Expression
(function () {


    //Constants - data that does not change 

    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const LOOKUP = {
        '1': 'X',
        '-1': 'O',
        'null': ''
    };

    //Variables (Application State) - data that changes 
    let turn, winner, gameboard;

    //Cached element refrences 
    const messageEl = document.querySelector('h2');
    const gameboardEl = document.getElementById('gameboard');
    const squareEls = document.querySelectorAll('.square');
    const buttonEl = document.querySelector('button');

    //Event Listeners 
    gameboardEl.addEventListener('click', handleClick);
    buttonEl.addEventListener('click', init)

    //Functions
    // Start the game upon initial load and whenever the reset button is clicked 
    init();

    function init() {
        //pick and set the turn 
        turn = 1; //X will go first 
        //set winner to false
        winner = false
        //set up the in-memeory gameboard to empty
        //gameboard = [null, null, null, null, null, null, null, null, null,];
        gameboard = new Array(9).fill(null);
        //visualize a new game to the DOM
        render();
    }

    function checkWinner() {
        // loop over the combos array and check each collection of combination values 
        // against the corresponding values inside of the gameboard arrays
        for (let i = 0; i < COMBOS.length; i++) {
            if (Math.abs(gameboard[COMBOS[i][0]] +
                    gameboard[COMBOS[i][1]] +
                    gameboard[COMBOS[i][2]]) === 3) {
                return gameboard[COMBOS[i][0]];
            }
        }
        if (gameboard.includes(null)) return false;
        return 'T';

    }

    function handleClick(event) {
        const position = (event.target.dataset.index);
        if (winner || gameboard[position]) return; //exit function executioon
        gameboard[position] = turn;
        turn *= -1;
        winner = checkWinner();
        render();
    }


    function render() {
        //transfer the state of the game to the DOM
        squareEls.forEach(function (square, position) {
            square.textContent = LOOKUP[gameboard[position]];
        });
        if (!winner) {
            messageEl.textContent = `Player ${LOOKUP[turn]}'s turn`
        } else if (winner === 'T') {
            messageEl.textContent = 'Tie Game';
        } else {
            messageEl.textContent = `Player ${LOOKUP[winner]} Wins!`;
        }
    }
})()