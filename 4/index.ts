import fs from 'fs';

const test = fs.readFileSync('./4/test.txt').toString().split('\n')
const input = fs.readFileSync('./4/input.txt').toString().split('\n')
test.pop()
input.pop()

interface Section {
    start: number
    end: number
}

function part1(input: string[]): any {
    const pairs = input.map((line) => {
        return line.split(',').map((assignment): Section => {
            return {
                start: parseInt(assignment.split('-')[0]),
                end: parseInt(assignment.split('-')[1])
            }
        })
    })
    return pairs.filter((pair) => {
        return (pair[0].start <= pair[1].start && pair[0].end >= pair[1].end) || (pair[1].start <= pair[0].start && pair[1].end >= pair[0].end)
    }).length

}

function part2(input: string[]): any {
    const pairs = input.map((line) => {
        return line.split(',').map((assignment): Section => {
            return {
                start: parseInt(assignment.split('-')[0]),
                end: parseInt(assignment.split('-')[1])
            }
        })
    })
    return pairs.filter((pair) => {
        return (pair[0].end >= pair[1].start && pair[0].start <= pair[1].start) || (pair[1].end >= pair[0].start && pair[1].start <= pair[0].start)}).length
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
