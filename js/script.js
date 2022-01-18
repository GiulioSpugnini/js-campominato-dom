console.log('JS OK!');
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

    let attemps = 0;
    const totalBombs = 16;
    let column;
    switch (difficulty.value) {
        case "":
            break;
        case "Easy":
            selectedCell(100, setLevel(100));
            break;
        case "Hard":
            selectedCell(49, setLevel(49));
            break;
        default:
            selectedCell(81, setLevel(81));

    }
    const totalCells = column * column;
    const maxAttempts = totalCells - totalBombs;
    // #FUNZIONI
    function createCell(index) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        grid.appendChild(cell);
        cell.setAttribute('id', index + 1);
        cell.innerText = cell.id;
        return cell;
    }

    function selectedCell(totalCells, level) {
        for (let i = 0; i < totalCells; i++) {
            const cell = createCell(i);
            cell.classList.add(level);
            cell.addEventListener('click', function() {
                cell.classList.toggle('bg-lightblue');
            })
        }
    }

    function setLevel(diff) {
        let result;
        if (diff <= 50) return result = 'cellHard';
        else if (diff > 50 && diff < 100) return result = 'cellNormal';
        else return result = 'cellEasy';
    }




    // !PROGRAMMA


}
playButton.addEventListener('click', () => play());