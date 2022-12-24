import fs from 'fs';

const test = fs.readFileSync('./23/test.txt').toString().split('\n')
const input = fs.readFileSync('./23/input.txt').toString().split('\n')
test.pop()
input.pop()

interface Elf {
    x: number
    y: number
}

interface Movement {
    elfKey: string
    newX: number
    newY: number
}

const DIRECTIONS = {
    N: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    E: { x: 1, y: 0 },
    W: { x: -1, y: 0 },
    NE: { x: 1, y: -1 },
    NW: { x: -1, y: -1 },
    SE: { x: 1, y: 1 },
    SW: { x: -1, y: 1 },
}

function printBoard(elves: ElfList) {
    for (let y = Math.min(...Object.keys(elves).map(e => elves[e].y)); y <= Math.max(...Object.keys(elves).map(e => elves[e].y)); y++) {
        let row = ''
        for (let x = Math.min(...Object.keys(elves).map(e => elves[e].x)); x <= Math.max(...Object.keys(elves).map(e => elves[e].x)); x++) {
            row += elves[[x, y].toString()] == undefined? '.' : '#'
        }
        console.debug(row)
    }
    console.log('')
}

type ElfList = {[key: string]: Elf}

function doesElfHaveNeighbors(elves: ElfList, elf: Elf) {
    const neighborPositions = Object.keys(DIRECTIONS).map(d => {
        return {
            x: DIRECTIONS[d].x + elf.x,
            y: DIRECTIONS[d].y + elf.y
        }
    })
    for (const p of neighborPositions) {
        if(elves[[p.x, p.y].toString()] != undefined) return true
    }
    return false
}

function part1(input: string[]): any {
    const start = performance.now()
    const elves: ElfList = {}
    const checks = [
        [DIRECTIONS.N, DIRECTIONS.NE, DIRECTIONS.NW],
        [DIRECTIONS.S, DIRECTIONS.SE, DIRECTIONS.SW],
        [DIRECTIONS.W, DIRECTIONS.NW, DIRECTIONS.SW],
        [DIRECTIONS.E, DIRECTIONS.NE, DIRECTIONS.SE]
    ]
    input.forEach((row, y) => {
        row.split('').forEach((col, x) => {
            if(col == '#') elves[[x, y].toString()] = {x, y}
        })
    })
    const timesPerStep = []
    for (let i = 0; i < 10; i++) {
        const stepStart = performance.now()
        const proposedMovements: Movement[] = []
        Object.keys(elves).forEach((elfKey, idx) => {
            const elf = elves[elfKey]
             {
                 if(doesElfHaveNeighbors(elves, elf)) {
                     checks.forEach(c => {
                         const checkPositions = c.map(d => {
                             return {
                                 x: d.x + elf.x,
                                 y: d.y + elf.y
                             }
                         })
                         const checkPass = checkPositions.filter(p => {
                             return elves[[p.x, p.y].toString()] != undefined
                         }).length == 0
                         if(checkPass && proposedMovements.findIndex(j => j.elfKey == elfKey) == -1) {
                             proposedMovements.push(
                                 {
                                     elfKey,
                                     newX: c[0].x + elf.x,
                                     newY: c[0].y + elf.y
                                 }
                             )
                         }
                     })
                 }
            }
        })
        const nonDuplicateMovements = proposedMovements.filter(m => {
            return proposedMovements.filter(o => m.newY == o.newY && m.newX == o.newX).length == 1
        })
        nonDuplicateMovements.forEach(m => {
            delete elves[m.elfKey]
            elves[[m.newX, m.newY].toString()] = { x: m.newX, y: m.newY }
        })
        checks.push(checks.shift())
        timesPerStep.push(performance.now() - stepStart)
    }
    let emptyGroundTiles = 0
    for (let y = Math.min(...Object.keys(elves).map(e => elves[e].y)); y <= Math.max(...Object.keys(elves).map(e => elves[e].y)); y++) {
        for (let x = Math.min(...Object.keys(elves).map(e => elves[e].x)); x <= Math.max(...Object.keys(elves).map(e => elves[e].x)); x++) {
            emptyGroundTiles += elves[[x, y].toString()] == undefined? 1 : 0
        }
    }
    console.log(`Calculation took ${((performance.now() - start) / 1000).toFixed(2)} seconds. Avg step length: ${((timesPerStep.reduce((a, b) => a + b, 0) / timesPerStep.length) / 1000).toFixed(2)}`)
    return emptyGroundTiles
}

function part2(input: string[]): any {
    const start = performance.now()
    const elves: ElfList = {}
    const checks = [
        [DIRECTIONS.N, DIRECTIONS.NE, DIRECTIONS.NW],
        [DIRECTIONS.S, DIRECTIONS.SE, DIRECTIONS.SW],
        [DIRECTIONS.W, DIRECTIONS.NW, DIRECTIONS.SW],
        [DIRECTIONS.E, DIRECTIONS.NE, DIRECTIONS.SE]
    ]
    input.forEach((row, y) => {
        row.split('').forEach((col, x) => {
            if(col == '#') elves[[x, y].toString()] = {x, y}
        })
    })
    let didElfMove = true
    let rIdx = 0
    const timesPerStep = []
    while (didElfMove) {
        const stepStart = performance.now()
        const proposedMovements: Movement[] = []
        Object.keys(elves).forEach((elfKey, idx) => {
            const elf = elves[elfKey]
            {
                if(doesElfHaveNeighbors(elves, elf)) {
                    checks.forEach(c => {
                        const checkPositions = c.map(d => {
                            return {
                                x: d.x + elf.x,
                                y: d.y + elf.y
                            }
                        })
                        const checkPass = checkPositions.filter(p => {
                            return elves[[p.x, p.y].toString()] != undefined
                        }).length == 0
                        if(checkPass && proposedMovements.findIndex(j => j.elfKey == elfKey) == -1) {
                            proposedMovements.push(
                                {
                                    elfKey,
                                    newX: c[0].x + elf.x,
                                    newY: c[0].y + elf.y
                                }
                            )
                        }
                    })
                }
            }
        })
        const nonDuplicateMovements = proposedMovements.filter(m => {
            return proposedMovements.filter(o => m.newY == o.newY && m.newX == o.newX).length == 1
        })
        nonDuplicateMovements.forEach(m => {
            delete elves[m.elfKey]
            elves[[m.newX, m.newY].toString()] = { x: m.newX, y: m.newY }
        })
        didElfMove = nonDuplicateMovements.length > 0
        checks.push(checks.shift())
        timesPerStep.push(performance.now() - stepStart)
        rIdx++
    }
    console.log(`Calculation took ${((performance.now() - start) / 1000).toFixed(2)} seconds. Avg step length: ${((timesPerStep.reduce((a, b) => a + b, 0) / timesPerStep.length) / 1000).toFixed(2)}`)
    return rIdx
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
