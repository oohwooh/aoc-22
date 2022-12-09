import fs from 'fs';

const test = fs.readFileSync('./8/test.txt').toString().split('\n')
const input = fs.readFileSync('./8/input.txt').toString().split('\n')
test.pop()
input.pop()

interface Tree {
    height: number
}

interface Grid {
    [key: number]: Array<Tree>
}


function part1(input: string[]): any {
    const forest: Grid = {}
    input.forEach((line, idx) => {
        forest[idx] = line.split('').map((t): Tree => {
            return {
                height: parseInt(t)
            }
        })
    })

    function isTreeVisible(x: number, y: number) {
        const dirs = [true, true, true, true]
        const height = forest[x][y].height
        for (let i = x; i < Object.keys(forest).length - 1; i++) {
            if(forest[i + 1][y].height >= height) dirs[0] = false
        }
        for (let i = x; i > 0; i--) {
            if(forest[i - 1][y].height >= height) dirs[1] = false
        }
        for (let i = y; i < Object.keys(forest).length - 1; i++) {
            if(forest[x][i + 1].height >= height) dirs[2] = false
        }
        for (let i = y; i > 0; i--) {
            if(forest[x][i - 1].height >= height) dirs[3] = false
        }
        return dirs.includes(true)
    }
    let sum = 0
    let width = Object.keys(forest).length
    for (let x = 0; x < width; x++) {
        let line = ''
        for (let y = 0; y < width; y++) {
            if(isTreeVisible(x, y)) sum += 1
        }
    }
    return sum
    }

function part2(input: string[]): any {
    const forest: Grid = {}
    input.forEach((line, idx) => {
        forest[idx] = line.split('').map((t): Tree => {
            return {
                height: parseInt(t)
            }
        })
    })

    function calcScenicScore(x: number, y: number) {
        const dirs = [true, true, true, true]
        const scores = [0,0,0,0]
        const height = forest[x][y].height
        for (let i = x; i < Object.keys(forest).length - 1; i++) {
            if(dirs[0]) scores[0] += 1
            if(forest[i + 1][y].height >= height) dirs[0] = false
        }
        for (let i = x; i > 0; i--) {
            if (dirs[1]) scores[1] += 1
            if(forest[i - 1][y].height >= height) dirs[1] = false
        }
        for (let i = y; i < Object.keys(forest).length - 1; i++) {
            if (dirs[2]) scores[2] += 1
            if(forest[x][i + 1].height >= height) dirs[2] = false
        }
        for (let i = y; i > 0; i--) {
            if (dirs[3]) scores[3] += 1
            if(forest[x][i - 1].height >= height) dirs[3] = false
        }
        return scores.reduce((p, v) => p * v, 1)
    }
    let highest = 0
    let width = Object.keys(forest).length
    for (let x = 0; x < width; x++) {
        let line = ''
        for (let y = 0; y < width; y++) {
            const score = calcScenicScore(x, y)
            if (score > highest) highest = score
        }
    }
    return highest

}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
