import fs from 'fs';

const test = fs.readFileSync('./1/test.txt').toString().split('\n')
const input = fs.readFileSync('./1/input.txt').toString().split('\n')

type Snack = {
  calories: number
}

type Elf = {
  carrying: Snack[]
}

function part1(input: string[]): any {
  let carrying: Snack[] = []
  let elves: Elf[] = []
  input.forEach((line) => {
    if (line == '') {
      elves.push({carrying})
      carrying = []
    } else {
      carrying.push({calories: parseInt(line)})
    }

  })
  return Math.max(...elves.map((elf) => elf.carrying.reduce((previousValue, currentValue): number => previousValue + currentValue.calories, 0)
  ))
}

function part2(input: string[]): any {
  let carrying: Snack[] = []
  let elves: Elf[] = []
  input.forEach((line) => {
    if (line == '') {
      elves.push({carrying})
      carrying = []
    } else {
      carrying.push({calories: parseInt(line)})
    }

  })
  return elves.map((elf) => elf.carrying.reduce((previousValue, currentValue): number => previousValue + currentValue.calories, 0)).sort((a, b) => {return b - a}).slice(0, 3).reduce((p, c) => p + c, 0)
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
