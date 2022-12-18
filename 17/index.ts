import fs from 'fs';

const test = fs.readFileSync('./17/test.txt').toString().split('\n')
const input = fs.readFileSync('./17/input.txt').toString().split('\n')
test.pop()
input.pop()

const shapes = [
    [
        '@@@@'
    ],
    [
        '.@.',
        '@@@',
        '.@.'
    ],
    [
        '..@',
        '..@',
        '@@@'
    ],
    [
        '@',
        '@',
        '@',
        '@'
    ],
    [
        '@@',
        '@@',
    ]
].map((s): Shape => {
    const grid: Grid = s.map((row, r) => row.split('').map((t) => t as TILES))
    return {
        grid
    }
})

enum TILES {
    EMPTY= '.',
    FALLING = '@',
    SETTLED = '#'
}

type Grid = TILES[][]

interface Shape {
    grid: Grid
}

const chamberWidth = 7

function printChamber(chamber: Grid) {
    console.log('')
    for (let i = Object.keys(chamber).length - 1; i >= 0; i--) {
        const tiles: TILES[] = []
        for (let j = 0; j < chamberWidth; j++) {
            tiles.push(chamber[i][j] || TILES.EMPTY)
        }
        console.log(`|${tiles.join('')}|`)
    }
    console.log(`+${'-'.repeat(chamberWidth)}+`)
}

enum DIRECTION {
    LEFT = '<',
    RIGHT = '>'
}

function part1(input: string[]): any {
    // Grid is y,x because it makes lateral translations and counting rows easier
    const chamber: Grid = [[], [], []]
    const directions: DIRECTION[] = input[0].split('').map((s): DIRECTION => { return s as DIRECTION })
    let dirIdx = 0
    let height = 0
    let rockAtRows: number[];
    function spawnRock(rock: Shape) {
        rockAtRows = []
        const spawnHeight = height + 3
        chamber[spawnHeight - 3] = []
        chamber[spawnHeight - 2] = []
        chamber[spawnHeight - 1] = []

        rock.grid.reverse().forEach((row, idx) => {
            chamber[spawnHeight + idx] = []
            rockAtRows.push(spawnHeight + idx)
            row.forEach((t, i) => {
                chamber[spawnHeight + idx][i + 2] = t
            })
        })
        rock.grid.reverse()
    }
    function pushDirection(dir: DIRECTION ) {
        const diff = dir == DIRECTION.LEFT? -1 : 1
        const allFallingIdxs = []
        for (const row of rockAtRows ) {
            const fallingIdxs = chamber[row].map((_, idx) => idx).filter((a) => chamber[row][a] == TILES.FALLING)
            if(Math.max(...fallingIdxs) >= 6 && dir == DIRECTION.RIGHT) return false
            if(Math.min(...fallingIdxs) <= 0 && dir == DIRECTION.LEFT) return false
            for (const idx of fallingIdxs) {
                if(chamber[row][idx + diff] == TILES.SETTLED) return false
            }
            allFallingIdxs.push(fallingIdxs)
        }
        rockAtRows.forEach((row, idx) => {
            allFallingIdxs[idx].forEach((i) => {
                chamber[row][i] = TILES.EMPTY
            })
            allFallingIdxs[idx].forEach((i) => {
                chamber[row][i + diff] = TILES.FALLING
            })
        })
        return true
    }
    function fall() {
        let doesSettle = false
        if(Math.min(...rockAtRows) == 0) doesSettle = true
        else {for (const row of rockAtRows) {
            const fallingIdxs = chamber[row].map((_, idx) => idx).filter((a) => chamber[row][a] == TILES.FALLING)
            for (const idx of fallingIdxs) {
                if(chamber[row - 1][idx] == TILES.SETTLED) doesSettle = true
            }
        }}
        if(doesSettle) {
            // rock settles
            rockAtRows.forEach((row) => {
                let _;
                while( (_ = chamber[row].indexOf(TILES.FALLING))!= -1) {
                    chamber[row][_] = TILES.SETTLED
                }
            })
            height = Math.max(Math.max(...rockAtRows) + 1, height)
            return true
        } else {
            rockAtRows.map((row) => (
                chamber[row].map((_, idx) => idx).filter((a) => chamber[row][a] == TILES.FALLING)
                    .forEach((idx) => {
                        chamber[row][idx] = TILES.EMPTY
                        chamber[row-1][idx] = TILES.FALLING
                        })
            ))
            rockAtRows = rockAtRows.map((r) => r-1)
        }
    }

    for (let count = 0; count < 2022; count++) {
        spawnRock(shapes[count % shapes.length])
        while (true) {
            if(!pushDirection(directions[dirIdx % (directions.length)])) {
            }
            dirIdx++;
            if(fall()) {
                break
            }
        }
    }
    return height
}

function part2(input: string[]): any {
    // Grid is y,x because it makes lateral translations and counting rows easier
    const chamber: Grid = [[], [], []]
    const directions: DIRECTION[] = input[0].split('').map((s): DIRECTION => { return s as DIRECTION })
    let dirIdx = 0
    let height = 0
    let rockAtRows: number[];
    function spawnRock(rock: Shape) {
        rockAtRows = []
        const spawnHeight = height + 3
        chamber[spawnHeight - 3] = []
        chamber[spawnHeight - 2] = []
        chamber[spawnHeight - 1] = []

        rock.grid.reverse().forEach((row, idx) => {
            chamber[spawnHeight + idx] = []
            rockAtRows.push(spawnHeight + idx)
            row.forEach((t, i) => {
                chamber[spawnHeight + idx][i + 2] = t
            })
        })
        rock.grid.reverse()
    }
    function pushDirection(dir: DIRECTION ) {
        const diff = dir == DIRECTION.LEFT? -1 : 1
        const allFallingIdxs = []
        for (const row of rockAtRows ) {
            const fallingIdxs = chamber[row].map((_, idx) => idx).filter((a) => chamber[row][a] == TILES.FALLING)
            if(Math.max(...fallingIdxs) >= 6 && dir == DIRECTION.RIGHT) return false
            if(Math.min(...fallingIdxs) <= 0 && dir == DIRECTION.LEFT) return false
            for (const idx of fallingIdxs) {
                if(chamber[row][idx + diff] == TILES.SETTLED) return false
            }
            allFallingIdxs.push(fallingIdxs)
        }
        rockAtRows.forEach((row, idx) => {
            allFallingIdxs[idx].forEach((i) => {
                chamber[row][i] = TILES.EMPTY
            })
            allFallingIdxs[idx].forEach((i) => {
                chamber[row][i + diff] = TILES.FALLING
            })
        })
        return true
    }
    function fall() {
        let doesSettle = false
        if(Math.min(...rockAtRows) == 0) doesSettle = true
        else {for (const row of rockAtRows) {
            const fallingIdxs = chamber[row].map((_, idx) => idx).filter((a) => chamber[row][a] == TILES.FALLING)
            for (const idx of fallingIdxs) {
                if(chamber[row - 1][idx] == TILES.SETTLED) doesSettle = true
            }
        }}
        if(doesSettle) {
            // rock settles
            rockAtRows.forEach((row) => {
                let _;
                while( (_ = chamber[row].indexOf(TILES.FALLING))!= -1) {
                    chamber[row][_] = TILES.SETTLED
                }
            })
            height = Math.max(Math.max(...rockAtRows) + 1, height)
            return true
        } else {
            rockAtRows.map((row) => (
                chamber[row].map((_, idx) => idx).filter((a) => chamber[row][a] == TILES.FALLING)
                    .forEach((idx) => {
                        chamber[row][idx] = TILES.EMPTY
                        chamber[row-1][idx] = TILES.FALLING
                    })
            ))
            rockAtRows = rockAtRows.map((r) => r-1)
        }
    }

    let lastHeight = 0;
    let diffs = ''
    let pattern;
    const iters = 1000000000000
    for (let count = 0; count < iters; count++) {
        lastHeight = height
        spawnRock(shapes[count % shapes.length])
        while (true) {
            if(!pushDirection(directions[dirIdx % (directions.length)])) {
            }
            dirIdx++;
            if(fall()) {
                break
            }
        }
        if(count > 1000) {
            diffs += (height - lastHeight).toString()
            if(diffs.length % 2 == 0) {
                const [a, b] = [diffs.slice(0, diffs.length / 2), diffs.slice(diffs.length / 2, diffs.length)]
                if(a == b) {
                    const oldCount = count
                    pattern = diffs.split('').map((p) => parseInt(p))
                    const s = pattern.reduce((a, b) => a + b, 0)
                    const remaining = iters - count
                    const times = Math.floor(remaining / pattern.length)
                    height += s * times
                    count += pattern.length * times
                    while(count < iters) {
                        height += pattern[(count - oldCount) % pattern.length]
                        count++;
                    }
                    return height - 1
                }
            }
        }
    }
    return height
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
