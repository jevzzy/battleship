import { createShip,gameBoard,types } from "./ship.js";
export let frame = document.querySelector('.frame');
export let container = document.querySelector('.container');
export let container_2 = document.querySelector('.container-2')
export let option = document.getElementsByName('select');
export const rotateBtn = document.querySelector('.rotate-btn');
export const done = document.querySelector('.done');
export const start = document.querySelector('#enter-game')
export const homepage = document.querySelector('.home-page');
const instruction = document.querySelector('.place-ship')
export let rotate = false;
let playerBoard;
let enemyBoard;
const player = gameBoard()
const ai = gameBoard()

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
  done.style.display = 'block';
}
let counter = 0;
//place ship eventlistener
function placeShips(){
playerBoard.forEach(board=>{
  
    board.addEventListener('click',(e)=>{
      const index = e.target.dataset.index-1;
      const ship = Object.values(types)[counter]
      if(player.placeShip(index,ship,rotate) == 'cannot placeship' || player.placeShip(index,ship,rotate) == 'ship exist'){
        e.preventDefault()
      }else{
       
        player.placeShip(index,ship,rotate)
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

//rotate ship button
rotateBtn.addEventListener('click',()=>{

  if(rotate){
    rotate = false
  }else{
    rotate = true
  }
});

// begin game
start.addEventListener('click',()=>{
placeShipPage();
  createBoard();
  playerBoard = Array.from(container.childNodes)
console.log(playerBoard)
  placeShips()
  });

//after placing ship
done.addEventListener('click',()=>{
AttackBoard();
rotateBtn.style.display = 'none';
done.style.display = 'none';

instruction.innerText = 'ATTACK'
container_2.style.display = 'grid';
enemyBoard = Array.from( container_2.childNodes)
playerAttack()
computerships()

})
//place ai ships
function computerships(){
  const ship = Object.values(types);
  for(let i = 0;i< ship.length;i++){
let random = Math.floor(Math.random() * 99)

  ai.placeShip(random,ship[i])

  }
  console.log(ai.board)
}
//attack ai board
function playerAttack(e){
  
  enemyBoard.forEach(board=>{
    board.addEventListener('click',(e)=>{
  console.log('player one turn')
  let index = e.target.dataset.index-1
  let arr = [];
  if(checkBoards(index,ai,enemyBoard) == false){
e.preventDefault()
  }

board.removeEventListener('click', (e)=>{
  console.log(e)
})
setTimeout(()=>{
  aiAttack()
},3000);
    })
  })
}

//check attack on board
function checkBoards(index,ai,enemyBoard){
  const bomb = document.createElement('div');
  bomb.style.backgroundColor = 'red';
  bomb.style.borderRadius ='10px';
  bomb.style.width = '20px';
  bomb.style.height = '20px';
  bomb.style.margin = '10px auto'
if(ai.board[index] == 'hit'){
 
  return false
}
if(ai.receiveAttack(index) == true){


  enemyBoard[index].appendChild(bomb)
}
else{
 

  bomb.style.backgroundColor = 'black';
 enemyBoard[index].appendChild(bomb)
}
}

function aiAttack(){
  let random = Math.floor( Math.random() * 99)
 
  
  if(checkBoards(random,player,playerBoard) == false){
    return  aiAttack()
  }
  else{
    checkBoards(random,player,playerBoard)
  }

}






