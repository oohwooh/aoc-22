import fs, {stat} from 'fs';

const test = fs.readFileSync('./24/test.txt').toString().split('\n')
const input = fs.readFileSync('./24/input.txt').toString().split('\n')
test.pop()
input.pop()

interface Direction {
    x: number
    y: number
}
const DIRECTIONS: {[key: string]: Direction} = {
    '^': {x: 0, y: -1},
    'v': {x: 0, y: 1},
    '>': {x: 1, y: 0},
    '<': {x: -1, y: 0},
    'wait': {x: 0, y: 0},
}

interface Blizzard {
    direction: string
    x: number
    y: number
}

interface State {
    minute: number
    posX: number
    posY: number
}

function printValley(blizzards: Blizzard[], w: number, h: number) {
    console.log('#.'+'#'.repeat(w - 2))
    for (let y = 1; y < h - 1; y++) {
        let row = '#'
        for (let x = 1; x < w - 1; x++) {
            const b = blizzards.filter(b => b.x == x && b.y == y)
            row += b.length == 0? '.' : b.length > 1? b.length : b[0].direction
        }
        row += '#'
        console.log(row)
    }
    console.log('#'.repeat(w - 2) +'.#')
}

function part1(input: string[]): any {
    const width = input[0].length
    const height = input.length
    console.log(width, height)
    const blizzards: Blizzard[] = []
    const blizzardsAtMinute: Blizzard[][] = []
    input.forEach((line, y) => {
        line.split('').forEach((t, x) => {
            if(t != '.' && t != '#') {
                blizzards.push({
                    x,
                    y,
                    direction: t
                })
            }
        })
    })
    blizzardsAtMinute.push(JSON.parse(JSON.stringify(blizzards)))
    for (let i = 0; i < 500; i++) {
        blizzards.forEach(b => {
            let nx = b.x + DIRECTIONS[b.direction].x
            let ny = b.y + DIRECTIONS[b.direction].y
            if(nx > width - 2) {
                nx = 1
            }
            if (nx <  1) {
                nx = width - 2
            }
            if(ny > height - 2) {
                ny = 1
            }
            if (ny <  1) {
                ny = height - 2
            }
            b.x = nx
            b.y = ny
        })
        blizzardsAtMinute.push(JSON.parse(JSON.stringify(blizzards)))
    }

    function getOptions(state: State) {
        return Object.keys(DIRECTIONS).filter(d => {
            const nx = state.posX + DIRECTIONS[d].x
            const ny = state.posY + DIRECTIONS[d].y
            if(nx < 1) return false
            if(nx > width -2) return false
            if(ny < 0) return false
            if(ny < 1 && nx != 1) return false
            if(ny > height - 1) return false
            if(ny > height - 2 && nx != width - 2) return false
            return blizzardsAtMinute[state.minute + 1].filter(b => b.x == nx && b.y == ny).length == 0
        })
    }
    const queue: State[] = [{minute: 0, posX: 1, posY: 0}]
    const explored = [[0,0,1].toString()]
    while (queue.length > 0) {
        const v = queue.shift()
        if(v.posY == height - 1 && v.posX == width - 2) return v.minute
        const options = getOptions(v)
        if(!explored.includes([v.minute, v.posX, v.posY].toString())) {
            explored.unshift([v.minute, v.posX, v.posY].toString())
            options.forEach(o => {
                const nx = DIRECTIONS[o].x + v.posX
                const ny = DIRECTIONS[o].y + v.posY
                queue.push({minute: v.minute + 1, posX: nx, posY: ny})
            })
        }
    }
}

function part2(input: string[]): any {
    const width = input[0].length
    const height = input.length
    console.log(width, height)
    const blizzards: Blizzard[] = []
    const blizzardsAtMinute: Blizzard[][] = []
    input.forEach((line, y) => {
        line.split('').forEach((t, x) => {
            if(t != '.' && t != '#') {
                blizzards.push({
                    x,
                    y,
                    direction: t
                })
            }
        })
    })
    blizzardsAtMinute.push(JSON.parse(JSON.stringify(blizzards)))
    for (let i = 0; i < 2000; i++) {
        blizzards.forEach(b => {
            let nx = b.x + DIRECTIONS[b.direction].x
            let ny = b.y + DIRECTIONS[b.direction].y
            if(nx > width - 2) {
                nx = 1
            }
            if (nx <  1) {
                nx = width - 2
            }
            if(ny > height - 2) {
                ny = 1
            }
            if (ny <  1) {
                ny = height - 2
            }
            b.x = nx
            b.y = ny
        })
        blizzardsAtMinute.push(JSON.parse(JSON.stringify(blizzards)))
    }

    function getOptions(state: State) {
        return Object.keys(DIRECTIONS).filter(d => {
            const nx = state.posX + DIRECTIONS[d].x
            const ny = state.posY + DIRECTIONS[d].y
            if(nx < 1) return false
            if(nx > width -2) return false
            if(ny < 0) return false
            if(ny < 1 && nx != 1) return false
            if(ny > height - 1) return false
            if(ny > height - 2 && nx != width - 2) return false
            return blizzardsAtMinute[state.minute + 1].filter(b => b.x == nx && b.y == ny).length == 0
        })
    }
    let queue: State[] = [{minute: 0, posX: 1, posY: 0}]
    const explored = [[0,0,1].toString()]
    // start -> goal
    while (queue.length > 0) {
        const v = queue.shift()
        if(v.posY == height - 1 && v.posX == width - 2) {
            queue = [v]
            break
        }
        const options = getOptions(v)
        if(!explored.includes([v.minute, v.posX, v.posY].toString())) {
            explored.unshift([v.minute, v.posX, v.posY].toString())
            options.forEach(o => {
                const nx = DIRECTIONS[o].x + v.posX
                const ny = DIRECTIONS[o].y + v.posY
                queue.push({minute: v.minute + 1, posX: nx, posY: ny})
            })
        }
    }
    console.log(`start -> goal @ ${queue[0].minute}`)
    // goal -> start
    while (queue.length > 0) {
        const v = queue.shift()
        if(v.posY == 0 && v.posX == 1) {
            queue = [v]
            break
        }
        const options = getOptions(v)
        if(!explored.includes([v.minute, v.posX, v.posY].toString())) {
            explored.unshift([v.minute, v.posX, v.posY].toString())
            options.forEach(o => {
                const nx = DIRECTIONS[o].x + v.posX
                const ny = DIRECTIONS[o].y + v.posY
                queue.push({minute: v.minute + 1, posX: nx, posY: ny})
            })
        }
    }
    console.log(`start -> goal -> start @ ${queue[0].minute}`)
    while (queue.length > 0) {
        const v = queue.shift()
        if(v.posY == height - 1 && v.posX == width - 2) {
            queue = [v]
            break
        }
        const options = getOptions(v)
        if(!explored.includes([v.minute, v.posX, v.posY].toString())) {
            explored.unshift([v.minute, v.posX, v.posY].toString())
            options.forEach(o => {
                const nx = DIRECTIONS[o].x + v.posX
                const ny = DIRECTIONS[o].y + v.posY
                queue.push({minute: v.minute + 1, posX: nx, posY: ny})
            })
        }
    }
    console.log(`start -> goal -> start -> goal @ ${queue[0].minute}`)
    return queue[0].minute
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
// console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
