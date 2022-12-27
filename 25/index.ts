import fs from 'fs';

const test = fs.readFileSync('./25/test.txt').toString().split('\n')
const input = fs.readFileSync('./25/input.txt').toString().split('\n')
test.pop()
input.pop()

const FRIGITS = {
    '=': -2,
    '-': -1,
    '0': 0,
    '1': 1,
    '2': 2
}

type SNAFU = string[]

function SNAFU_TO_DECIMAL(s: SNAFU): number {
    s = s.reverse() // so that we can use index as power of 5
    return s.reduce((a, b, idx) => a + FRIGITS[b] * 5**idx, 0)
}

// function ADD_SNAFU(a: SNAFU, b: SNAFU): SNAFU {
//     const c = []
//     let carry = 0
//     for (let i = 0; i < Math.max(a.length, b.length); i++) {
//         if(FRIGITS[a[i]] + FRIGITS[b[i]] + carry)
//     }
// }

console.log(SNAFU_TO_DECIMAL('2-=102--02--=1-12=22'.split('')))

function part1(input: string[]): any {
    const snafuNums: SNAFU[] = input.map(line => line.split(''))
    const sum = snafuNums.map(s => SNAFU_TO_DECIMAL(s)).reduce((a, b) => a + b, 0)
    return sum
    // I straight up just did this by hand
}

function part2(input: string[]): any {
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
