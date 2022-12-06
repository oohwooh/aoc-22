import fs from 'fs';

const test = fs.readFileSync('./5/test.txt').toString().split('\n')
const input = fs.readFileSync('./5/input.txt').toString().split('\n')
test.pop()
input.pop()

interface Crate {
    contents: string
}

interface Cargo {
    stacks: Crate[][]
}


function line_to_crates(line: string) {
    if(line.includes('[')) {
        return line.match(/.{1,4}/g).map((crate): Crate | undefined => {
            crate = crate.trim()
            const match = /\[(.)]/.exec(crate)
            if(match) {
                return { contents: match[1] }
            } else {
                return undefined
            }
        })
    } else {
        return false
    }
}

function part1(input: string[]): any {
    let cargo: Cargo = {stacks: [[]]}
    input.forEach((line) => {
        let crates = line_to_crates(line)
        if(crates) {
            crates.forEach((crate, idx) => {
                if (cargo.stacks.length <= idx + 1) {
                    cargo.stacks.push([])
                }
                if(crate) {
                    cargo.stacks[idx + 1].push(crate)
                }
            })
        } else if(line.includes('move')) {
            const instructions = line.split(' ')
            const count = parseInt(instructions[1])
            const from = parseInt(instructions[3])
            const to = parseInt(instructions[5])
            for (let i = 0; i < count; i++) {
                cargo.stacks[to].unshift(cargo.stacks[from].shift())
            }
        }
    })
    cargo.stacks.shift()
    return cargo.stacks.map((stack) => {
        return stack[0].contents
    }).join('')
}

function part2(input: string[]): any {
    let cargo: Cargo = {stacks: [[]]}
    input.forEach((line) => {
        let crates = line_to_crates(line)
        if(crates) {
            crates.forEach((crate, idx) => {
                if (cargo.stacks.length <= idx + 1) {
                    cargo.stacks.push([])
                }
                if(crate) {
                    cargo.stacks[idx + 1].push(crate)
                }
            })
        } else if(line.includes('move')) {
            const instructions = line.split(' ')
            const count = parseInt(instructions[1])
            const from = parseInt(instructions[3])
            const to = parseInt(instructions[5])
            const stack = []
            for (let i = 0; i < count; i++) {
                stack.push(cargo.stacks[from].shift())
            }
            cargo.stacks[to].unshift(...stack)
        }
    })
    cargo.stacks.shift()
    return cargo.stacks.map((stack) => {
        return stack[0].contents
    }).join('')
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
