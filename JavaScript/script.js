let firstClick;
let secondClick;
let cardsClickedsArray = [];
let roundOfClicks = 0;
let score = 0;
let wrongClicksInARow = 0;
let tableHTML;

function listenForCLicks( ){
    let cardID;
    $('td').on('click', function ({ element = this }) {
        $(element).addClass('show-card');
        cardID = $(this).attr('id');
        
        if(roundOfClicks == 0){
            firstClick = cardID;
        }
        else if(roundOfClicks == 1){
            secondClick = cardID;
        }
        
        roundOfClicks++;
        cardsClickedsArray.push(cardID);
        
        if (roundOfClicks == 2 && (firstClick != secondClick)) {
            wrongCombination( );
            unflipCards( );
        }
        else if(roundOfClicks == 2 && (firstClick == secondClick)){
            delete firstClick;
            delete secondClick;
            roundOfClicks = 0;
            cardsClickedsArray = [];      
            score++;      
            
            if(score == 8) alert('Fim de Jogo');
        }
    });
}

function wrongCombination( ){
    setTimeout(function(){
        for (let i = 0; i < cardsClickedsArray.length; i++) {
            $(`.card-${cardsClickedsArray[i]}`).addClass('wrong-combination');
        }
    }, 250);
}

function unflipCards( ) {

    $('.tabuleiro').css('pointer-events', 'none');
    
    setTimeout(function () {
        for (let i = 0; i < cardsClickedsArray.length; i++) {
            $(`.card-${cardsClickedsArray[i]}`).removeClass('show-card');
            $(`.card-${cardsClickedsArray[i]}`).removeClass('wrong-combination');
        }
        cardsClickedsArray = [];
        roundOfClicks = 0;
        $('.tabuleiro').css('pointer-events', 'all');
    }, 1500);
}

function generateTable( ) {

    var randomNumber;
    let tableHTML;
    
    let classesArray = [
        { className: 'card-1', cardID: 1, numberOfUsages: 0 },
        { className: 'card-2', cardID: 2, numberOfUsages: 0 },
        { className: 'card-3', cardID: 3, numberOfUsages: 0 },
        { className: 'card-4', cardID: 4, numberOfUsages: 0 },
        { className: 'card-5', cardID: 5, numberOfUsages: 0 },
        { className: 'card-6', cardID: 6, numberOfUsages: 0 },
        { className: 'card-7', cardID: 7, numberOfUsages: 0 },
        { className: 'card-8', cardID: 8, numberOfUsages: 0 }
    ];

    tableHTML = '<table>';
    
    for (let height = 0; height < 4; height++) {
        tableHTML = tableHTML + '<tr>';
        for (let width = 0; width < 4; width++) {
            (function appendClassToTD( ) {
                randomNumber = generateRandomNumber(0, 7);
                if (classesArray[randomNumber].numberOfUsages < 2) {
                    tableHTML = tableHTML + `
                        <td class="${classesArray[randomNumber].className} 
                        ${classesArray[randomNumber].className}-unflipped unflipped"
                        id="${ classesArray[randomNumber].cardID}">
                        </td>`;

                    classesArray[randomNumber].numberOfUsages++;
                }
                else {
                    appendClassToTD();
                }
            })( );
        }
        tableHTML = tableHTML + '</tr>';
    }
    tableHTML = tableHTML + '</table>';
    
    return tableHTML;
}

function createInitialTable( ){
    return initialTable = `
    <table class="initial-table">
        <tr>
            <td class="initial-card-1">
            <td class="initial-card-1">
            <td class="initial-card-2">
            <td class="initial-card-2">
        </tr>
        <tr>
            <td class="initial-card-3">
            <td class="initial-card-3">
            <td class="initial-card-4">
            <td class="initial-card-4">
        </tr>
        <tr>
            <td class="initial-card-5">
            <td class="initial-card-5">
            <td class="initial-card-6">
            <td class="initial-card-6">
        </tr>
        <tr>
            <td class="initial-card-7">
            <td class="initial-card-7">
            <td class="initial-card-8">
            <td class="initial-card-8">
        </tr>
    </table>`
}

function flipCards( ){
    setInterval(function( ){
        $('.unflipped').removeClass('card-1-unflipped');
        $('.unflipped').removeClass('card-2-unflipped');
        $('.unflipped').removeClass('card-3-unflipped');
        $('.unflipped').removeClass('card-4-unflipped');
        $('.unflipped').removeClass('card-5-unflipped');
        $('.unflipped').removeClass('card-6-unflipped');
        $('.unflipped').removeClass('card-7-unflipped');
        $('.unflipped').removeClass('card-8-unflipped');
        $('.unflipped').removeClass('unflipped');
    }, 3000);
}

function renderTable(tableHTML){ 
    $('.tabuleiro').html(tableHTML);
}

function generateRandomNumber(min, max){
    return Math.round(Math.random() * ((max - min) + min));
}

function resetGlobalVariables( ){
    roundOfClicks = 0;
    score = 0;
    wrongClicksInARow = 0;
    cardsClickedsArray = [];
}

function startNewGame( ){
    $('.restart').on('click', ( ) => {
        tableHTML = generateTable();
        renderTable(tableHTML);
        flipCards( );
        listenForCLicks( );
        resetGlobalVariables( );
    });
}

$(document).ready(( ) => {
    tableHTML = createInitialTable( );
    renderTable(tableHTML);
    startNewGame( );
});