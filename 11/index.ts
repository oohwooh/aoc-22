import fs from 'fs';

const test = fs.readFileSync('./11/test.txt').toString().split('\n')
const input = fs.readFileSync('./11/input.txt').toString().split('\n')
test.pop()
input.pop()


interface Monkey {
    startingItems: number[]
    operation: (old: number) => number
    test: (val: number) => boolean
    testNum: number
    ifTrue: number
    ifFalse: number
    inspectCount: number
}

function part1(input: string[]): any {
    const monkeys: Monkey[] = []
    for (let i = 0; i < input.length; i+= 7) {
        const [starting, operation, test, ifTrue, ifFalse] = input.slice(i+1, i+6)
        monkeys.push({
            startingItems: starting.split(':')[1].split(',').map((v) => parseInt(v)),
            operation: (old) => {return eval(operation.split('=')[1].trim())},
            test: (val) => {return val % parseInt(test.split('by')[1].trim()) == 0},
            testNum: parseInt(test.split('by')[1].trim()),
            ifTrue: parseInt(ifTrue.split('monkey')[1].trim()),
            ifFalse: parseInt(ifFalse.split('monkey')[1].trim()),
            inspectCount: 0
        })
    }
    for (let i = 0; i < 20; i++) {
        monkeys.forEach((monkey) => {
            monkey.startingItems.forEach((item, idx) => {
                monkey.inspectCount++
                const n = Math.floor(monkey.operation(item) / 3)
                if(monkey.test(n)) {
                    monkeys[monkey.ifTrue].startingItems.push(n)
                } else {
                    monkeys[monkey.ifFalse].startingItems.push(n)
                }
            })
            monkey.startingItems = []
        })
    }
    const m = monkeys.map((m) => m.inspectCount).sort((a, b) => b - a)
    return m[0] * m[1]
}

function part2(input: string[]): any {
    const monkeys: Monkey[] = []

    for (let i = 0; i < input.length; i+= 7) {
        const [starting, operation, test, ifTrue, ifFalse] = input.slice(i+1, i+6)
        monkeys.push({
            startingItems: starting.split(':')[1].split(',').map((v) => parseInt(v)),
            operation: (old) => {return eval(operation.split('=')[1].trim())},
            test: (val) => {return val % parseInt(test.split('by')[1].trim()) == 0},
            testNum: parseInt(test.split('by')[1].trim()),
            ifTrue: parseInt(ifTrue.split('monkey')[1].trim()),
            ifFalse: parseInt(ifFalse.split('monkey')[1].trim()),
            inspectCount: 0
        })
    }
    for (let i = 0; i < 10000; i++) {
        monkeys.forEach((monkey, idx) => {
            monkey.startingItems.forEach((item) => {
                monkey.inspectCount++
                let n = monkey.operation(item)
                n = n % monkeys.map((m) => m.testNum).reduce((p, v) => p * v, 1)
                const throwTo = monkey.test(n) ? monkeys[monkey.ifTrue] : monkeys[monkey.ifFalse]
                throwTo.startingItems.push(n)
            })
            monkey.startingItems = []
        })
    }
    const m = monkeys.map((m) => m.inspectCount).sort((a, b) => b - a)
    return m[0] * m[1]
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
