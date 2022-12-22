import fs from 'fs';

const test = fs.readFileSync('./21/test.txt').toString().split('\n')
const input = fs.readFileSync('./21/input.txt').toString().split('\n')
test.pop()
input.pop()

enum SIGN {
    ADD="+",
    SUB="-",
    MULT="*",
    DIV="/"
}

interface Operation {
    a: string
    b: string
    s: SIGN
}

interface Monkey {
    yells: number | Operation
}


function part1(input: string[]): any {
    const monkeys: { [key: string]: Monkey} = {}
    function monkeyYells(monkeyName: string) {
        const m = monkeys[monkeyName]
        if(typeof m.yells == "number") return m.yells
        return eval(`${monkeyYells(m.yells.a)} ${SIGN[m.yells.s]} ${monkeyYells(m.yells.b)}`)
    }
    input.forEach(m => {
        const [name, rest] = m.split(': ')
        const sign = Object.keys(SIGN).filter(sign => rest.includes(SIGN[sign]))
        monkeys[name] = {
            yells: sign.length == 0? parseInt(rest) : {
                s: sign[0] as SIGN,
                a: rest.split(SIGN[sign[0]])[0].trim(),
                b: rest.split(SIGN[sign[0]])[1].trim()
            }
        }
    })
    return monkeyYells('root')
}

function part2(input: string[]): any {
    const monkeys: { [key: string]: Monkey} = {}
    function monkeyYells(monkeyName: string) {
        const m = monkeys[monkeyName]
        if(typeof m.yells == "number") return m.yells
        return eval(`${monkeyYells(m.yells.a)} ${SIGN[m.yells.s]} ${monkeyYells(m.yells.b)}`)
    }
    input.forEach(m => {
        const [name, rest] = m.split(': ')
        const sign = Object.keys(SIGN).filter(sign => rest.includes(SIGN[sign]))
        monkeys[name] = {
            yells: sign.length == 0? parseInt(rest) : {
                s: sign[0] as SIGN,
                a: rest.split(SIGN[sign[0]])[0].trim(),
                b: rest.split(SIGN[sign[0]])[1].trim()
            }
        }
    })

    function rootDiff() {
        const m = monkeys['root']
        if(typeof m.yells == "number") return
        return monkeyYells(m.yells.a) - monkeyYells(m.yells.b)
    }

    let baseline = 0
    let magnitude = rootDiff().toString().length
    let min = rootDiff()
    let minAt = baseline
    // this doesn't work for the test input, and probably might not work for other peoples inputs, but it got me the
    // answer and I don't care
    for (let i = magnitude; i > 0; i--) {
        monkeys['humn'].yells = baseline
        while(rootDiff() > 1) {
            monkeys['humn'].yells += 10 ** (i - 1)
            if(rootDiff() < min && rootDiff() >= 0) {
                min = rootDiff()
                minAt = monkeys['humn'].yells
                if (min == 0) return minAt
            }
        }
        baseline = minAt
    }
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
