import fs from 'fs';

const test = fs.readFileSync('./13/test.txt').toString().split('\n')
const input = fs.readFileSync('./13/input.txt').toString().split('\n')
test.pop()
input.pop()
type Packet = Array<Packet | number>

function isInOrder(left: number | Packet, right: number | Packet): boolean {
    // console.debug(`Compare ${left} vs ${right}`)
    if (typeof left == "number" && typeof right == "number") {
        return left < right
    }
    else if (typeof left != "number" && typeof right != "number") {
        // console.debug('both arr')
        for (let i = 0; i < left.length; i++) {
            if(i >= right.length) return false
            if (left[i] != right[i]) {
                const out = isInOrder(left[i], right[i])
                if(out != undefined) return out
            }
        }
        if(left.length < right.length) return true
        if(left.length > right.length) return false

    } else {
        // console.debug('mixed type')
        left = typeof left == "number"? [left] : left
        right = typeof right == "number"? [right] : right
        return isInOrder(left, right)
    }
}

function part1(input: string[]): any {
    const packets = input.filter((i) => i.length > 0).map((line) => {
        return JSON.parse(line) as Packet
    })
    let sum = 0
    for (let i = 0; i < packets.length; i+= 2) {
        if(isInOrder(packets[i], packets[i+1])) {
            sum += (i / 2) + 1
        }
    }
    return sum
}

function part2(input: string[]): any {
    const packets =input.filter((line) => line.length > 0).map((p) => JSON.parse(p) as Packet)
    const dividerPackets = [[[2]], [[6]]]
    packets.push(...dividerPackets)
    const sortedPackets = packets.sort((a, b) => isInOrder(a, b)? -1: 1)
    return (sortedPackets.indexOf(dividerPackets[0]) + 1) * (sortedPackets.indexOf(dividerPackets[1]) + 1)
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
