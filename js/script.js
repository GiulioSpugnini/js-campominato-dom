/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
     con difficoltà 1 => tra 1 e 100
     con difficoltà 2 => tra 1 e 81
     con difficoltà 3 => tra 1 e 49
     Quando l 'utente clicca su ogni cella, la cella cliccata si colora di azzurro.
     Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
    I numeri nella lista delle bombe non possono essere duplicati.
    In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
    BONUS:
        1- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
        2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
*/
// #ELEMENTI DA UTILIZZARE
const grid = document.getElementById('grid');
const difficulty = document.getElementById('difficulty');
const playButton = document.getElementById('play');
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
//#FUNZIONE PLAY
function play() {
    playButton.innerText = 'RICOMINCIA';
    grid.innerText = '';

    let attempts = 0;
    const totalBombs = 16;
    let column;
    switch (difficulty.value) {
        case "":
            break;
        case "Easy":
            // generateGrid(100, setLevel(100), generateBombs(totalBombs, 100));
            column = 10;
            break;
        case "Hard":
            // generateGrid(49, setLevel(49), generateBombs(totalBombs, 49));
            column = 7;
            break;
        default:
            // generateGrid(81, setLevel(81), generateBombs(totalBombs, 81));
            column = 9;

    }
    const totalCells = column * column;
    const maxAttempts = totalCells - totalBombs;
    // #FUNZIONI
    //Creo la cella
    function createCell(index, cellsPerRow) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
        const wh = `calc(100% / ${cellsPerRow})`;
        cell.style.height = wh;
        cell.style.width = wh;
        cell.setAttribute('id', index);
        cell.innerText = cell.id;
        return cell;
    }
    //Genero la griglia
    function generateGrid(totalCells, cellsPerRow, bombs) {
        for (let i = 0; i < totalCells; i++) {
            const cell = createCell(i + 1, cellsPerRow);
            // cell.classList.add(level);
            cell.addEventListener('click', onCellClick);
            grid.appendChild(cell);
        }
    }
    //Imposto il livello
    // function setLevel(diff) {
    //     let result;
    //     if (diff <= 50) return result = 'cellHard';
    //     else if (diff > 50 && diff < 100) return result = 'cellNormal';
    //     else return result = 'cellEasy';
    // }
    //Genero una bomba
    function generateBombs(totalBombs, totalNumber) {
        const bombs = [];
        while (bombs.length < totalBombs) { // il numero di bombe è inferiore a 16
            const randNumber = getRandomNumber(1, totalNumber);
            if (!bombs.includes(randNumber)) { // Controllo se c'è nell'array di bombe
                bombs.push(randNumber);
            }
        }
        bombs.sort();
        return bombs;
    }
    //Gestisco l'evento al click
    function onCellClick(event) {
        const cell = event.target;
        cell.removeEventListener('click', onCellClick);
        console.log('ok');

        // Controllo se è una bomba
        let number = parseInt(cell.id);
        if (bombs.includes(number)) {
            gameOver(bombs, attempts, true);
        } else {
            cell.classList.add("bg-lightblue")
            attempts++;
            if (attempts === maxAttempts) {
                gameOver(bombs, attempts, false);
            }
        }
    }
    //Fine partita
    function gameOver(bombs, attempts, hasLost) {
        const allCells = grid.querySelectorAll('.cell');

        for (let i = 0; i < allCells.length; i++) {
            allCells[i].removeEventListener('click', onCellClick);
        }

        showBombs(bombs);

        const message = document.createElement('h2');
        message.className = 'message';

        const messageText = hasLost ? `HAI PERSO! (Questo è il tuo punteggio: ${attempts})` : `HAI VINTO!!!!!!!!`
        message.innerText = messageText;
        grid.appendChild(message);

    }

    function showBombs(bombs) {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < totalCells; i++) {
            const cell = cells[i];
            const cellNumber = parseInt(cell.innerText);
            cell.removeEventListener('click', onCellClick);
            if (bombs.includes(cellNumber)) cell.classList.add('bomb');
        }
    }

    // !PROGRAMMA
    bombs = generateBombs(totalBombs, totalCells);
    generateGrid(totalCells, column, bombs);
    console.log('le bombe sono' + bombs);

}
playButton.addEventListener('click', () => play());