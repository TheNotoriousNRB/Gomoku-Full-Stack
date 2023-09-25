import { STATE } from "../constants/constants";
import { Position } from "../types";

function currentPlayer(
    size: number,
    position: Position,
    plays: Position[]
){
    const [x, y] = position

    if (x < 0 || x >= size || y < 0 || y>= size) return false
    const playIndex = plays.findIndex(
        (plays) => plays[0] === position[0] && 
        plays[1] === position[1]
    )
    if (playIndex === -1) return false
    return (plays.length -1 ) % 2 === playIndex % 2
}

function checkHorizontalRow(size: number, plays: Position[]) {
    const [x, y] = plays[plays.length - 1]

    let rowCount = 1
    let left = y
    while(rowCount < 5 && currentPlayer(size, [x, --left], plays)){
        rowCount++
    }
    if (rowCount === 5) return rowCount
    let right = y
    while (rowCount <5 && currentPlayer(size, [x, ++right], plays)){
        rowCount++
    }
    return rowCount
}

function checkVerticalRow(size: number, plays: Position[]) {
    const [x, y] = plays[plays.length - 1]
    let rowCount = 1
    let top = x
    while(rowCount < 5 && currentPlayer(size, [--top, y], plays)){
        rowCount++
    }
    if (rowCount === 5) return rowCount
    let bottom = x
    while (rowCount <5 && currentPlayer(size, [++bottom, y], plays)){
        rowCount++
    }
    return rowCount
}

function checkDiagonalTopLeft(size: number, plays: Position[]) {
    const [x, y] = plays[plays.length - 1]
    let rowCount = 1
    let [top, left] = [x, y]
    while(rowCount <5 && 
        currentPlayer(size, [--top, --left], plays))
        {
            rowCount++
        }
    if (rowCount === 5) return rowCount
    let [bottom, right] = [x, y]
    while(rowCount <5 && 
        currentPlayer(size, [++bottom, ++right], plays))
        {
            rowCount++
        }
    return rowCount
}

function checkDiagonalTopRight(size: number, plays: Position[]) {
    const [x, y] = plays[plays.length - 1]
    let rowCount = 1
    let [top, right] = [x, y]
    while(rowCount <5 && 
        currentPlayer(size, [--top, ++right], plays))
        {
            rowCount++
        }
    if (rowCount === 5) return rowCount
    let [bottom, left] = [x, y]
    while(rowCount <5 && 
        currentPlayer(size, [++bottom, --left], plays))
        {
            rowCount++
        }
    return rowCount
}

export function isGameTerminal(size: number, plays: Position[]){
    if (plays.length <5) return false
    if (
        checkHorizontalRow(size, plays) === 5 ||
        checkVerticalRow(size, plays) === 5 ||
        checkDiagonalTopLeft(size, plays) === 5 ||
        checkDiagonalTopRight(size, plays) === 5){
            return true
        }
    if (plays.length == size * size) return true
}

export function stonePositions(position: Position, plays: Position[]){
    const id = plays.findIndex(
        (play) => play[0] === position[0] && play[1] === position[1]
    ) + 1
    const state = id === 0 ? STATE.FREE : id % 2 ? STATE.PLAYER_ONE : STATE.PLAYER_TWO
    return {id, state}
}