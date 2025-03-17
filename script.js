let music = new Audio("music.mp3")
let audioTing = new Audio("ting.mp3")
let gameOver = new Audio("gameover.mp3")
let turn = "X"
let isGameOver = false;
let myDiv = document.querySelector('.gameInfo');
let h2 = document.getElementsByTagName("h2");

//Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxText');
    element.addEventListener('click', () =>{
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTing.play();
            checkWin();
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    } )
})

//Change Turn
const changeTurn = ()=>{
    return turn === 'X' ? 'O' : 'X';
}

//Check Winner
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxText');
    let wins =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) &&
        (boxtext[e[0]].innerText !== ""))
            {
            let info = document.querySelector('.info');
            if (info) info.remove();
            // document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isGameOver = true;
            myDiv.classList.add('gameEnd');
            let winner = boxtext[e[0]].innerText;
            h2[0].innerText = `${winner} Wins`;
            gameOver.play();

            document.querySelector('.imgBox').getElementsByTagName('img')[0].style.width = "200px";
        }
    })

}

//reset
reset.addEventListener('click', ()=>{

    let boxtexts = document.querySelectorAll('.boxText');
    boxtexts.forEach(box => { 
        box.innerText = ""; // Clear text in boxes
    });

    turn = "X";
    isGameOver = false;

    //reset info
    h2[0].innerText = "Welcome to TIC TAC TOE";

    //reset gif width
    document.querySelector('.imgBox img').style.width = "0px";

    //reset info
    let gameInfoDiv = document.querySelector('.gameInfo div');
    let info = document.querySelector('.info');
    if (!info) {
        let newInfo = document.createElement('span');
        newInfo.classList.add('info');
        newInfo.innerText = "Turn for " + turn;
        gameInfoDiv.prepend(newInfo);
    } else {
        info.innerText = "Turn for " + turn;
    }
    myDiv.classList.remove('gameEnd');
})