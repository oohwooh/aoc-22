import fs from 'fs';

const test = fs.readFileSync('./3/test.txt').toString().split('\n')
const input = fs.readFileSync('./3/input.txt').toString().split('\n')

test.pop()
input.pop()

interface Compartment {
    contents: number[]
}

type Rucksack = {
    compartments: Compartment[]
    allItems: number[]
}

function itemToValue(item: string) {
    const lowercaseStart = 97
    const uppercaseStart = 65
    let value = item.charCodeAt(0)
    if(value >= lowercaseStart) {
        value -= lowercaseStart - 1
    } else {
        value -= uppercaseStart - 27
    }
    return value
}

function stringToRucksack(string: string): Rucksack {
    const firstHalf = string.slice(0, string.length / 2).split('')
    const secondHalf = string.slice(string.length / 2, string.length).split('')
    return {
        compartments: [
            {
                contents: firstHalf.map((item) => itemToValue(item))
            },
            {
                contents: secondHalf.map((item) => itemToValue(item))
            }
        ],
        allItems: string.split('').map((item) => itemToValue(item))
    }
}

function part1(input: string[]): any {
    const rucksacks = input.map((line) => {
        return stringToRucksack(line)
    })
    return rucksacks.map((rucksack) => {
        return rucksack.compartments[0].contents.filter((item) => {
            return rucksack.compartments[1].contents.includes(item)
        })
    }).reduce((p, v) => {
        return p + v[0]
    }, 0)
}

function part2(input: string[]): any {
    let sum = 0
    for (let i = 0; i < input.length / 3 ; i++) {
        const rucksacks = input.slice(i * 3, i * 3 + 3).map((r) => stringToRucksack(r))
        sum += rucksacks[0].allItems.filter((item) => {
            return rucksacks[1].allItems.includes(item) && rucksacks[2].allItems.includes(item)
        })[0]
    }
    return sum
}

console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)
console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
