export const types = {
    carrier:5,
    battleShip:4,
    cruiser:3,
    submarine:3,
    destroyer:2
}

export function createShip(num){
    const length = num
    let damages = 0
    const hit =()=>{damages++}
    const hits =()=> {return damages}
    const isSunk =()=> (damages >= length?true:false)
    return {
        hits,
        hit,
        isSunk,
        length
    }
}

function firstLaw(index,length){
    const arr = [9,19,29,39,49,59,69,79,89,99];
    const num = index + length-1
    
    return arr.some(arr=>{
      return index <= arr && num > arr
    }) 
    
    }
   function law(coordinate,ship){
    for(let i= coordinate; i< coordinate + ship.length;i++){
        if(typeof board[i] !== 'number'){
            return true
        }
        else{
            return false
        }
    }
   }
export const coordinateArr = []
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
        if(typeof board[coordinates] !== 'number'  || firstLaw(coordinates,myShip.length) && !rotate || rotate && coordinates >= 90 ){
            return 'cannot placeship'
        }
            if(rotate){
                let counter = coordinates
                for(let i = counter;i<coordinates + myShip.length;i++){
                        board[counter] = myShip
                        counter =  counter + 10
                    
              }
              
            }
            else{
                for(let i = coordinates; i< coordinates + myShip.length;i++)
                {
                 if(typeof board[i] !='number'){
                    console.log(false)
                    
                    return 'cannot placeship'
                 }
                 else{
                    console.log(true)
                    board[i] = myShip
                 }
                 
              }
                }
 ships.push(myShip)
}  
,
 receiveAttack:(coordinates)=>{

            if(board[coordinates] == coordinates){
        
            missed.push(coordinates)
            board[coordinates] = 'hit'
            return false
            }
            else if(board[coordinates] !== coordinates){

                board[coordinates].hit()
                board[coordinates] = 'hit'
    
               return true
            }
            console.log(board)
},
checkShip:()=>{
   return ships.every(ship=>{
    return ship.isSunk() === true
   })
},
missed:()=>missed,
ships:()=>ships

}
}

const jde = gameBoard()



