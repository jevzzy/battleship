import { gameBoard,types } from "./ship.js";
 let frame = document.querySelector('.frame');
 let container = document.querySelector('.container');
 let container_2 = document.querySelector('.container-2')
 let option = document.getElementsByName('select');
 const rotateBtn = document.querySelector('.rotate-btn');
 const doneBtn = document.querySelector('.doneBtn');
 const start = document.querySelector('#enter-game')
const homepage = document.querySelector('.home-page');
const instruction = document.querySelector('.place-ship');
 let rotate = false;
let counter = 0;
let playerBoard;
let enemyBoard;
const player = gameBoard()
const ai = gameBoard()
let currentPlayer = player;
let waitingPlayer = ai;



//rotate ship button
rotateBtn.addEventListener('click',()=>{

  if(rotate){
    rotate = false
  }else{
    rotate = true
  }
});

//create player gameboard
function createBoard(){
    console.log('working')
    for(let index = 1;index<= 100;index++){
        const div = document.createElement('div');
        container.appendChild(div);
          div.setAttribute('data-index', index);
      div.style.border = '1px solid grey';
      div.style.borderBottom = 'none';
    };
};
//create ai board
 function  AttackBoard(){
  for(let index = 1;index<= 100;index++){
      const div = document.createElement('div');
      container_2.appendChild(div);
        div.setAttribute('data-index', index);
        div.style.border = '2px solid grey';
  };

};

//display ship placed on player game board
 function display(){
for(let i = 0;i < player.board.length;i++){
  let num = i
  playerBoard[i].style.backgroundColor = 'white'
  if(typeof player.board[num] !== 'number'){
playerBoard[num].style.backgroundColor = 'black'
  }
  
}
}
//after pressing start button link to page where u place ship
function placeShipPage(){
  homepage.style.display = 'none';
  frame.style.display = 'flex';
  instruction.style.display = 'block';
  rotateBtn.style.display = 'block';
  
}

//place ship eventlistener
function placeShips(){
playerBoard.forEach(board=>{
  
    board.addEventListener('click',(e)=>{
      const index = e.target.dataset.index-1;
      if(player.placeShip(index,counter,rotate) == 'cannot placeship' || player.placeShip(index,counter,rotate) == 'ship exist'){
        e.preventDefault()
      }else{
        player.placeShip(index,counter,rotate)
        if(player.ships().length == 5){
          doneBtn.style.display = 'block';
        }
        display()
        counter++;
      }
     
    })
    board.addEventListener('mouseenter',(e)=>{
      const index = e.target.dataset.index-1;
      if(board.style.backgroundColor == 'black'){
        e.preventDefault()
      }
      else{
        playerBoard[index].style.backgroundColor = 'grey'
      }
   
    })
  
    board.addEventListener('mouseleave',(e)=>{
      const index = e.target.dataset.index-1;
      if(board.style.backgroundColor == 'black'){
        e.preventDefault()
      }
      else{
        playerBoard[index].style.backgroundColor = 'white';
      }
      
    })
  })
}

//place ai ships
function computerships(){
  let counter = 0
  let arr = []
while(counter < 6){
  let random = Math.floor(Math.random()*99)
  let rtate = Math.random() > 0.5
  arr.push(random)
  if(ai.placeShip(random,counter,rtate) == 'cannot placeship'){
    counter--
  }
  counter++
}
}

// begin game
start.addEventListener('click',()=>{
placeShipPage();
  createBoard();
  playerBoard = Array.from(container.childNodes)
  placeShips()

  });

//after placing ship
doneBtn.addEventListener('click',()=>{
  computerships()
AttackBoard();
rotateBtn.style.display = 'none';
doneBtn.style.display = 'none';

instruction.innerText = 'ATTACK'
container_2.style.display = 'grid';
enemyBoard = Array.from( container_2.childNodes)
playerAttack()

})

//display bomb placed on board
function displayBomb(board){
  for(let i = 0; i < board.length; i++){
    const bomb = document.createElement('div');
bomb.style.borderRadius ='20px';
bomb.style.width = '20px';
bomb.style.height = '20px';
bomb.style.margin = '10px auto';
   let num = i;
   if(waitingPlayer.board[num] == 'destroyed'){
    bomb.style.backgroundColor = 'red';
    //console.log(`hey ---${num}`)
    if(board[num].hasChildNodes()){
    console.log('do nthiin')
    }
    else{
      board[num].appendChild(bomb)
    }
  }
    if(waitingPlayer.board[num] == 'hit'){
      bomb.style.backgroundColor = 'black'
      if(board[num].hasChildNodes()){
        console.log('do nthiin')
        }
        else{
          board[num].appendChild(bomb)
        }
   
  }
   }
   
  }

//attack ai board
function playerAttack(){
 
  enemyBoard.forEach(board=>{
    board.addEventListener('click',(event)=>{
  
  let index = event.target.dataset.index-1;
  if(ai.receiveAttack(index) == 'cannot attack'){
event.preventDefault()
  }
  else {
    ai.receiveAttack(index)
    displayBomb(enemyBoard)
    waitingPlayer = player
    currentPlayer = ai
    setTimeout(()=>{
      aiAttack()
    },3000);
    checkWinner(player,ai)

  }



    })
  })
}

function aiAttack(){
  let index = Math.floor(Math.random() * 99);
if(currentPlayer == player){
  console.log('waiting')
}
else if(currentPlayer == ai){
  player.receiveAttack(index)
  displayBomb(playerBoard)
  waitingPlayer = ai
  currentPlayer = player
}

}



function checkWinner(player,ai){
  if(player.checkShip() == true){
    console.log('computer is the winner')
  }
  if(ai.checkShip() == true){
    console.log('playerone won')
  }
}

