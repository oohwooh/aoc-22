import fs from 'fs';

const test = fs.readFileSync('./6/test.txt').toString().split('\n')
const input = fs.readFileSync('./6/input.txt').toString().split('\n')


function part1(input: string[]): any {
    const line = input[0]
    for (let i = 0; i < line.length - 4; i++) {
        if(line.slice(i, i+4).split('').filter(((value, index, self) => {
            return self.indexOf(value) === index
        } )).length == 4) return i + 4
    }
}

function part2(input: string[]): any {
    const line = input[0]
    for (let i = 0; i < line.length - 14; i++) {
        if(line.slice(i, i+14).split('').filter(((value, index, self) => {
            return self.indexOf(value) === index
        } )).length == 14) return i + 14
    }
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
