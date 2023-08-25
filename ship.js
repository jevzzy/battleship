 export const types = {
    carrier:5,
    battleShip:4,
    cruiser:3,
    submarine:3,
    destroyer:2
}


 export function createShip(num){
    const shipType = Object.keys(types)[num]
    let length = Object.values(types)[num]
    const type = shipType
    let damages = 0
    const hit =()=>{damages++}
    const hits =()=> {return damages}
    const isSunk =()=> (damages >= length?true:false)
    return {
        type,
        hits,
        hit,
        isSunk,
        length
    }
}


   
 const coordinateArr = []
function createCoordinates(){
    
    for(let i=0;i<100;i++){
        coordinateArr.push(i)
    }
    
}

createCoordinates()

 export function gameBoard(player){
    const board = [...coordinateArr]
    const missed = []
    const ships = []

return {
    board,
    missed,
 placeShip:(coordinates,ship,rotate)=>{
        const myShip = createShip(ship)
        
        function firstLaw(index,length){
    const arr = [9,19,29,39,49,59,69,79,89,99];
    const num = index + length-1
    
    return arr.some(arr=>{
      return index <= arr && num > arr
    }) 
    
    }
        if(typeof board[coordinates] !== 'number'  || firstLaw(coordinates,myShip.length) && !rotate || rotate && coordinates >= 90 ){
            return 'cannot placeship'
        }
            if(rotate){
                let counter = coordinates
                if(10*myShip.length + counter > 99){return 'cannot placeship'}
                for(let i = counter;i<coordinates + myShip.length;i++){
                   
                        board[counter] = myShip
                        counter =  counter + 10
                    
              }
              ships.push(myShip)
            }
            else{
                for(let i = coordinates; i< coordinates + myShip.length;i++)
                {
                   board[i] = myShip
                 
                 
              }
              ships.push(myShip)
                }

}  
,
 receiveAttack:(coordinates)=>{

            if(board[coordinates] == coordinates){
        
            missed.push(coordinates)
            board[coordinates] = 'hit'
            }
            else if(typeof board[coordinates] == 'object'){ 
              let hitship = board[coordinates].type
          console.log(hitship)
          ships.forEach(ship=>{
            if(ship.type = hitship){
                ship.hit()
            }
          })
          
            board[coordinates] = 'destroyed'
        }
     else if(board[coordinates] == 'hit' || board[coordinates]== 'destroyed'){
            return 'cannot attack'
        }
            
            console.log(board)
},
checkShip:()=>{
   return ships.every(ship=>{
    return ship.isSunk() === true
   })
},
missed:()=> missed,
ships:()=>ships

}
}

