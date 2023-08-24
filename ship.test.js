import { createShip } from "./ship";
import { types } from "./ship";
import { gameBoard } from "./ship";

describe("ship methods",()=>{
const myShip = createShip(types.cruiser)
test("myship hits should increase when hit",()=>{
    myShip.hit()
    myShip.hit()
    expect(myShip.hits()).toBe(2)
})

test("myship should sink when the hits is equal to the lengths",()=>{
    myShip.hit()
    myShip.hit()
    myShip.hit()
  expect(myShip.isSunk()).toBe(true)
})
describe("ship types",()=>{
   
    test("submarine length is 3",()=>{
        const aShip = createShip(types.cruiser)
        expect(aShip.length).toEqual(3)

    })
    test("carrier length is 5",()=>{
        const bShip = createShip(0)
        expect(bShip.length).toEqual(5)
    })
    test("battleShip length is 4",()=>{
        const cShip = createShip(1)
        expect(cShip.length).toEqual(4)
    })
    test("destroyer length is 2",()=>{
        const dShip = createShip(4)
        expect(dShip.length).toEqual(2)
    })
    test("cruiser length is 5",()=>{
        const eShip = createShip(types.cruiser)
        expect(eShip.length).toEqual(3)
    })
})
})

describe("gameboard method",()=>{
const playerone = gameBoard()
playerone.placeShip(0,3)
test("check coordinates should have a ship ",()=>{


    expect(playerone.board[0]).not.toBe(1)
   
})

test("ship at coordinates shoud have length",()=>{
    expect(playerone.board[0].hasOwnProperty('length')).toBeTruthy()
})
test("recieve attack ship at coordinate should receive hit",()=>{
    playerone.receiveAttack(0)
expect(playerone.ships()[0].hits()).toBe(1)
})
test("missed attack: keep record of missed attack",()=>{
    playerone.receiveAttack(10)
    //playerone.board
    expect(playerone.missed()).toContain(10)
})
})