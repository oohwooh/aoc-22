import fs from 'fs';

const test = fs.readFileSync('./DAY/test.txt').toString().split('\n')
const input = fs.readFileSync('./DAY/input.txt').toString().split('\n')


function part1(input: string[]): any {
}

function part2(input: string[]): any {
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
