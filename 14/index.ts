import fs from 'fs';

const test = fs.readFileSync('./14/test.txt').toString().split('\n')
const input = fs.readFileSync('./14/input.txt').toString().split('\n')
test.pop()
input.pop()

interface Coordinate {
    x: number
    y: number
}

interface Line {
    start: Coordinate
    end: Coordinate
}

type Path = Line[]

function part1(input: string[]): any {
    let blocked = []
    let abyss = 0
    input.forEach((line) => {
        const points: Coordinate[] = line.split('->').map((coord) => {
            const [x, y] = coord.split(',')
            if(parseInt(y) > abyss) abyss = parseInt(y)
            return {
                x: parseInt(x),
                y: parseInt(y)
            }
        } )
        let current = points.shift()
        blocked.push(JSON.stringify(current))
        points.forEach((point) => {
            while(point.x != current.x) {
                current.x += point.x > current.x? 1 : -1
                blocked.push(JSON.stringify(current))
            }
            while(point.y != current.y) {
                current.y += point.y > current.y? 1 : -1
                blocked.push(JSON.stringify(current))
            }
        })
    })
    function isBlocked(c: Coordinate) {
        return blocked.includes(JSON.stringify(c).toString())
    }
    function canMove(c: Coordinate) {
        return [isBlocked({x: c.x, y: c.y + 1}), isBlocked({x: c.x + 1, y: c.y + 1}), isBlocked({x: c.x -1, y: c.y + 1})].includes(false)
    }
    let sand: Coordinate = {x: 500, y: 0};
    let count = 0
    console.log(abyss)
    blocked = [...new Set(blocked)]
    while (sand.y <= abyss) {
        sand = {x: 500, y:0}
        count++;
        while(canMove(sand)) {
            sand.y++
            if (sand.y >= abyss) return count -1
            if(isBlocked(sand)) sand.x--
            if(isBlocked(sand)) sand.x += 2
        }
        blocked.push(JSON.stringify(sand))
    }
    return count -1
}

function part2(input: string[]): any {
    let blocked = []
    let abyss = 0
    input.forEach((line) => {
        const points: Coordinate[] = line.split('->').map((coord) => {
            const [x, y] = coord.split(',')
            if(parseInt(y) > abyss) abyss = parseInt(y)
            return {
                x: parseInt(x),
                y: parseInt(y)
            }
        } )
        let current = points.shift()
        blocked.push(JSON.stringify(current))
        points.forEach((point) => {
            while(point.x != current.x) {
                current.x += point.x > current.x? 1 : -1
                blocked.push(JSON.stringify(current))
            }
            while(point.y != current.y) {
                current.y += point.y > current.y? 1 : -1
                blocked.push(JSON.stringify(current))
            }
        })
    })

    function isBlocked(c: Coordinate) {
        return blocked.includes(JSON.stringify(c))
    }
    function canMove(c: Coordinate) {
        if (c.y == abyss - 1) return false
        return [isBlocked({x: c.x, y: c.y + 1}), isBlocked({x: c.x + 1, y: c.y + 1}), isBlocked({x: c.x -1, y: c.y + 1})].includes(false)
    }
    let sand: Coordinate = {x: 500, y: 0};
    let count = 0
    abyss += 2
    blocked = [...new Set(blocked)]

    while (!isBlocked({x: 500, y:0})) {
        // console.log(blocked.length)
        sand = {x: 500, y:0}
        // console.log(count)
        count++;
        const can = canMove(sand)
        while(canMove(sand)) {
            sand.y++
            if (sand.y >= abyss) return count -1
            if(isBlocked(sand)) sand.x--
            if(isBlocked(sand)) sand.x += 2
        }
        blocked.unshift(JSON.stringify(sand))
    }
    return count -1
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
