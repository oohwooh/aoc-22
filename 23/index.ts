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
    elfIdx: number
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

// const dc = {...DIRECTIONS}
// Object.keys(dc).forEach(d => {
//     Object.keys(dc).filter(i => i != d).forEach(j => {
//         DIRECTIONS[d+j] = { x: DIRECTIONS[d].x + DIRECTIONS[j].x, y: DIRECTIONS[d].y + DIRECTIONS[j].y }
//     })
// })

function printBoard(elves: Elf[]) {
    const width = Math.max(...elves.map(e => e.y)) - Math.min(...elves.map(e => e.y))
    const height = Math.max(...elves.map(e => e.x)) - Math.min(...elves.map(e => e.x))
    // console.log(elves)
    // console.log(width, height)
    for (let y = Math.min(...elves.map(e => e.y)); y <= Math.max(...elves.map(e => e.y)) ; y++) {
        let row = ''
        for (let x = Math.min(...elves.map(e => e.x)); x <= Math.max(...elves.map(e => e.x)) ; x++) {
            row += elves.findIndex(e => e.x == x && e.y == y) == -1? '.' : '#'
        }
        console.debug(row)
    }
    console.log('')
}
function part1(input: string[]): any {
    const elves: Elf[] = []
    const checks = [
        [DIRECTIONS.N, DIRECTIONS.NE, DIRECTIONS.NW],
        [DIRECTIONS.S, DIRECTIONS.SE, DIRECTIONS.SW],
        [DIRECTIONS.W, DIRECTIONS.NW, DIRECTIONS.SW],
        [DIRECTIONS.E, DIRECTIONS.NE, DIRECTIONS.SE]
    ]
    input.forEach((row, y) => {
        row.split('').forEach((col, x) => {
            if(col == '#') elves.push({x, y})
        })
    })
    printBoard(elves)

    for (let i = 0; i < 10; i++) {
        const proposedMovements: Movement[] = []
        elves.forEach((elf, idx) => {
            const neighborPositions = Object.keys(DIRECTIONS).map(d => {
                return {
                    x: DIRECTIONS[d].x + elf.x,
                    y: DIRECTIONS[d].y + elf.y
                }
            })
            const neighborElves = elves.filter(e => {
                return neighborPositions.filter(p => {
                    return e.x == p.x && e.y == p.y
                }).length > 0
            })
            if(neighborElves.length > 0) {
                checks.forEach(c => {
                    const checkPositions = c.map(d => {
                        return {
                            x: d.x + elf.x,
                            y: d.y + elf.y
                        }
                    })
                    const checkElves = elves.filter(e => {
                        return checkPositions.filter(p => {
                            return e.x == p.x && e.y == p.y
                        }).length > 0
                    })
                    if(checkElves.length == 0 && proposedMovements.findIndex(j => j.elfIdx == idx) == -1) {
                        proposedMovements.push(
                            {
                                elfIdx: idx,
                                newX: c[0].x + elf.x,
                                newY: c[0].y + elf.y
                            }
                        )
                    }
                })
            }
        })
        const nonDuplicateMovements = proposedMovements.filter(m => {
            return proposedMovements.filter(o => m.newY == o.newY && m.newX == o.newX).length == 1
        })
        nonDuplicateMovements.forEach(m => {
            elves[m.elfIdx].x = m.newX
            elves[m.elfIdx].y = m.newY
        })
        checks.push(checks.shift())
        console.log(`== End of Round ${i + 1} ==`)
        // printBoard(elves)
    }
    let emptyGroundTiles = 0
    for (let y = Math.min(...elves.map(e => e.y)); y <= Math.max(...elves.map(e => e.y)); y++) {
        for (let x = Math.min(...elves.map(e => e.x)); x <= Math.max(...elves.map(e => e.x)); x++) {
            emptyGroundTiles += elves.findIndex(e => e.x == x && e.y == y) == -1? 1 : 0
        }
    }
    return emptyGroundTiles
}

function part2(input: string[]): any {
    const elves: Elf[] = []
    const checks = [
        [DIRECTIONS.N, DIRECTIONS.NE, DIRECTIONS.NW],
        [DIRECTIONS.S, DIRECTIONS.SE, DIRECTIONS.SW],
        [DIRECTIONS.W, DIRECTIONS.NW, DIRECTIONS.SW],
        [DIRECTIONS.E, DIRECTIONS.NE, DIRECTIONS.SE]
    ]
    input.forEach((row, y) => {
        row.split('').forEach((col, x) => {
            if(col == '#') elves.push({x, y})
        })
    })
    let lastElves = ''
    let rIdx = 0
    while (lastElves != JSON.stringify(elves)) {
        lastElves = JSON.stringify(elves)
        const proposedMovements: Movement[] = []
        elves.forEach((elf, idx) => {
            const neighborPositions = Object.keys(DIRECTIONS).map(d => {
                return {
                    x: DIRECTIONS[d].x + elf.x,
                    y: DIRECTIONS[d].y + elf.y
                }
            })
            const neighborElves = elves.filter(e => {
                return neighborPositions.filter(p => {
                    return e.x == p.x && e.y == p.y
                }).length > 0
            })
            if(neighborElves.length > 0) {
                checks.forEach(c => {
                    const checkPositions = c.map(d => {
                        return {
                            x: d.x + elf.x,
                            y: d.y + elf.y
                        }
                    })
                    const checkElves = elves.filter(e => {
                        return checkPositions.filter(p => {
                            return e.x == p.x && e.y == p.y
                        }).length > 0
                    })
                    if(checkElves.length == 0 && proposedMovements.findIndex(j => j.elfIdx == idx) == -1) {
                        proposedMovements.push(
                            {
                                elfIdx: idx,
                                newX: c[0].x + elf.x,
                                newY: c[0].y + elf.y
                            }
                        )
                    }
                })
            }
        })
        const nonDuplicateMovements = proposedMovements.filter(m => {
            return proposedMovements.filter(o => m.newY == o.newY && m.newX == o.newX).length == 1
        })
        nonDuplicateMovements.forEach(m => {
            elves[m.elfIdx].x = m.newX
            elves[m.elfIdx].y = m.newY
        })
        checks.push(checks.shift())
        console.log(`== End of Round ${rIdx + 1} ==`)
        rIdx++
        // printBoard(elves)
    }
    return rIdx
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
