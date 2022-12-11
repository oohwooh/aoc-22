import fs from 'fs';

const test = fs.readFileSync('./10/test.txt').toString().split('\n')
const input = fs.readFileSync('./10/input.txt').toString().split('\n')
test.pop()
input.pop()

type Instruction = {
    cycles: number
    exec: (string) => void
}




function part1(input: string[]): any {
    const instructions: {[key: string]: Instruction} = {
        'noop': {
            cycles: 1,
            exec: (_) => {}
        },
        'addx': {
            cycles: 2,
            exec: (line) => {
                registers['x'] += parseInt(line.split(' ')[1])
            }
        }
    }
    const registers: {[key: string]: number} = { 'x': 1 }
    let cycle = 1
    let strengths = 0

    input.forEach((line) => {
        const inst = instructions[line.split(' ')[0]];
        for(let i = 0; i < inst.cycles; i++) {
            if((cycle - 20) % 40 == 0) {
                strengths += (cycle * registers['x'])
            }
            cycle++;
        }
        inst.exec(line)
    })
    return strengths

}

function part2(input: string[]): any {
    const instructions: {[key: string]: Instruction} = {
        'noop': {
            cycles: 1,
            exec: (_) => {}
        },
        'addx': {
            cycles: 2,
            exec: (line) => {
                registers['x'] += parseInt(line.split(' ')[1])
            }
        }
    }
    const registers: {[key: string]: number} = { 'x': 1 }
    let cycle = 1
    let x = 0
    let row = ''

    input.forEach((line) => {
        const inst = instructions[line.split(' ')[0]];
        for(let i = 0; i < inst.cycles; i++) {
            if(x >= registers['x'] - 1 && x <= registers['x'] + 1) row += '#'
            else row += '.'
            x++;
            if(x == 40) {
                console.log(row)
                row = ''
                x = 0
            }
            cycle++;
        }
        inst.exec(line)
    })
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
