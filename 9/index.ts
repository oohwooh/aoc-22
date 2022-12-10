import fs from 'fs';

const test = fs.readFileSync('./9/test.txt').toString().split('\n')
const input = fs.readFileSync('./9/input.txt').toString().split('\n')
test.pop()
input.pop()


class Coordinate {
    x: number
    y: number

    constructor(x= 0, y=0) {
        this.x = x
        this.y = y
    }

    hash() {
        return `x${this.x}y${this.y}`
    }
    equals(c: Coordinate) {
        return c.x == this.x && c.y == this.y
    }
    copy() {
        return new Coordinate(this.x, this.y)
    }
    nonDiagonalNeighbors() {
        return [[0, 1], [1, 0], [0, -1], [-1, 0]].map((n) => {
            return new Coordinate(this.x + n[0], this.y + n[1])
        })
    }
    diagonalNeighbors() {
        return [[1, 1], [1, -1], [-1, 1], [-1, -1]].map((n) => {
            return new Coordinate(this.x + n[0], this.y + n[1])
        })
    }
}

function part1(input: string[]): any {
    const headPos = new Coordinate()
    const tailPos = new Coordinate()
    const visited = []
    visited.push(tailPos.hash())
    function doesTailNeedToMove() {
        if (headPos.equals(tailPos)) return false
        return [...tailPos.nonDiagonalNeighbors(), ...tailPos.diagonalNeighbors()].filter((n) => headPos.equals(n)).length == 0
    }

    input.forEach((line) => {
        const [direction, count] = line.split(' ')
        for (let i = 0; i < parseInt(count); i++) {
            switch(direction) {
                case "U":
                    headPos.y += 1
                    break
                case "D":
                    headPos.y -= 1
                    break
                case "L":
                    headPos.x -= 1
                    break
                case "R":
                    headPos.x += 1
                    break
            }
            if(doesTailNeedToMove()) {
                if(headPos.x > tailPos.x && headPos.y == tailPos.y) {
                    tailPos.x += 1
                }
                else if(headPos.x < tailPos.x && headPos.y == tailPos.y) {
                    tailPos.x -= 1
                }
                else if(headPos.y > tailPos.y && headPos.x == tailPos.x) {
                    tailPos.y += 1
                }
                else if(headPos.y < tailPos.y && headPos.x == tailPos.x) {
                    tailPos.y -= 1
                }
                else if (headPos.y > tailPos.y && headPos.x > tailPos.x) {
                    tailPos.y += 1
                    tailPos.x += 1
                }
                else if (headPos.y > tailPos.y && headPos.x < tailPos.x) {
                    tailPos.y += 1
                    tailPos.x -= 1
                }
                else if (headPos.y < tailPos.y && headPos.x > tailPos.x) {
                    tailPos.y -= 1
                    tailPos.x += 1
                }
                else if (headPos.y < tailPos.y && headPos.x < tailPos.x) {
                    tailPos.y -= 1
                    tailPos.x -= 1
                }
                if(doesTailNeedToMove()) console.error('cringe')
                if(!visited.includes(tailPos.hash()))
                    visited.push(tailPos.hash())
            }
        }
    })
    return visited.length
}

function part2(input: string[]): any {
    const tail = []
    for (let i = 0; i < 10; i++) {
        tail.push(new Coordinate())
    }
    const visited = []
    visited.push(tail[9].hash())
    function doesTailNeedToMove(idx: number) {
        if (tail[idx - 1].equals(tail[idx])) return false
        return [...tail[idx].nonDiagonalNeighbors(), ...tail[idx].diagonalNeighbors()].filter((n) => tail[idx - 1].equals(n)).length == 0
    }

    input.forEach((line) => {
        const [direction, count] = line.split(' ')
        for (let i = 0; i < parseInt(count); i++) {
            switch(direction) {
                case "U":
                    tail[0].y += 1
                    break
                case "D":
                    tail[0].y -= 1
                    break
                case "L":
                    tail[0].x -= 1
                    break
                case "R":
                    tail[0].x += 1
                    break
            }
            tail.slice(1, tail.length).forEach((tailPos, idx) => {
                idx += 1
                if(doesTailNeedToMove(idx)) {
                    const headPos = tail[idx-1]
                    if(headPos.x > tailPos.x && headPos.y == tailPos.y) {
                        tailPos.x += 1
                    }
                    else if(headPos.x < tailPos.x && headPos.y == tailPos.y) {
                        tailPos.x -= 1
                    }
                    else if(headPos.y > tailPos.y && headPos.x == tailPos.x) {
                        tailPos.y += 1
                    }
                    else if(headPos.y < tailPos.y && headPos.x == tailPos.x) {
                        tailPos.y -= 1
                    }
                    else if (headPos.y > tailPos.y && headPos.x > tailPos.x) {
                        tailPos.y += 1
                        tailPos.x += 1
                    }
                    else if (headPos.y > tailPos.y && headPos.x < tailPos.x) {
                        tailPos.y += 1
                        tailPos.x -= 1
                    }
                    else if (headPos.y < tailPos.y && headPos.x > tailPos.x) {
                        tailPos.y -= 1
                        tailPos.x += 1
                    }
                    else if (headPos.y < tailPos.y && headPos.x < tailPos.x) {
                        tailPos.y -= 1
                        tailPos.x -= 1
                    }
                }
            })
            if(!visited.includes(tail[tail.length - 1].hash()))
                visited.push(tail[tail.length - 1].hash())
        }
    })
    return visited.length
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
