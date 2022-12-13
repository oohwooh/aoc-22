import fs from 'fs';

const test = fs.readFileSync('./12/test.txt').toString().split('\n')
const input = fs.readFileSync('./12/input.txt').toString().split('\n')
test.pop()
input.pop()


function part1(input: string[]): any {
    let startPos;
    let goalPos;
    const mountain = input.map((line, y) => line.split('').map((char, x) => {
        let elev = char.charCodeAt(0) - 96
        if(elev == -13) {
            startPos = [y, x]
            elev = 1
        }
        if(elev == -27) {
            goalPos = [y, x]
            elev = 26
        }
        return elev
    }))

    const queue = []
    const explored = []
    const parents = {}
    explored.push(startPos.toString())
    queue.push(startPos.toString())
    while (queue.length > 0) {
        const candidate = queue.shift()
        if(candidate == goalPos.toString()) {
        }
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach((n) => {
            let [y, x] = candidate.split(',')
            y = parseInt(y)
            x = parseInt(x)
            let ny = y + n[0]
            let nx = x +n[1]
            let t;
            try {
                t = mountain[ny][nx]
            } catch {}
            if(t) {
                if(mountain[ny][nx] - mountain[y][x] <= 1 && !explored.includes([ny, nx].toString())) {
                    queue.push([ny, nx].toString())
                    explored.push([ny, nx].toString())
                    parents[[ny,nx].toString()] = [y,x].toString()
                }
            }
        })
    }
    function find_parents(coord: string) {
        if(!Object.keys(parents).includes(coord)) return []
        return [coord, ...find_parents(parents[coord])]
    }
    const chain = find_parents([goalPos[0], goalPos[1]].toString())
    return chain.length
}

function part2(input: string[]): any {
    let allStartPos = [];
    let goalPos;
    const mountain = input.map((line, y) => line.split('').map((char, x) => {
        let elev = char.charCodeAt(0) - 96
        if(elev == -13 || elev == 1) {
            allStartPos.push([y, x])
            elev = 1
        }
        if(elev == -27) {
            goalPos = [y, x]
            elev = 26
        }
        return elev
    }))
    function distance(startPos) {
        const queue = []
        const explored = []
        const parents = {}
        explored.push(startPos.toString())
        queue.push(startPos.toString())
        while (queue.length > 0) {
            const candidate = queue.shift()
            if (candidate == goalPos.toString()) {}

            [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach((n) => {
                let [y, x] = candidate.split(',')
                y = parseInt(y)
                x = parseInt(x)
                let ny = y + n[0]
                let nx = x + n[1]
                let t;
                try {
                    t = mountain[ny][nx]
                } catch {
                }
                if (t) {
                    if (mountain[ny][nx] - mountain[y][x] <= 1 && !explored.includes([ny, nx].toString())) {
                        queue.push([ny, nx].toString())
                        explored.push([ny, nx].toString())
                        parents[[ny, nx].toString()] = [y, x].toString()
                    }
                }
            })
        }

        function find_parents(coord: string) {
            if (!Object.keys(parents).includes(coord)) return []
            return [coord, ...find_parents(parents[coord])]
        }

        const chain = find_parents([goalPos[0], goalPos[1]].toString())
        return chain.length
    }
    return Math.min(...allStartPos.map((p,i) => {
        const d = distance(p)
        // I don't understand why this is required, but it is. Otherwise min returns 0
        return d >= 26? d : 99999999999
    }))
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
