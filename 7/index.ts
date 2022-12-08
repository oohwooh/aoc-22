import fs from 'fs';
import dot from 'dot-object';

const test = fs.readFileSync('./7/test.txt').toString().split('\n')
const input = fs.readFileSync('./7/input.txt').toString().split('\n')
test.pop()
input.pop()


// interface Directory {
//     parent: Directory | null
//     children: Array<Directory | File>
//     name: string
// }

// interface File {
//     parent: Directory
//     name: string
//     size: number
// }

interface Directory {
    [key: string]: Directory | FileGood
}

interface FileGood {
    [key: string]: number
}



function part1(input: string[]): any {
    const sums = []
    function calc_directory_size(directory: Directory) {

        let sum = 0
        for (let name of Object.keys(directory)) {
            // console.log(JSON.stringify(directory[name]))
            // const value = directory[name][Object.keys(directory[name])[0]]
            if (typeof directory[name] == "number") {
                // @ts-ignore
                sum += directory[name]
            } else {
                // @ts-ignore
                sum += calc_directory_size(directory[name])
            }
        }
        sums.push(sum)
        return sum
    }
    const filesystem: Directory = {}
    let path: string[] = ['/']
    input.forEach((line) => {
        if(line.startsWith('$ cd')) {
            const arg = line.split(' ')[2]
            if(arg == '/') {
                path = ['/']
            } else if(arg == '..') {
                path.pop()
            } else {
                path.push(arg)
            }
            return
        }
        if(line.startsWith('$ ls')) return
        if(line.startsWith('dir')) return
        const [size, filename] = line.split(' ')
        try {
            dot.str(path.join('.') + '.' + filename.replace('.', '-'), parseInt(size), filesystem)

        } catch {

        }
    })
    // @ts-ignore
    calc_directory_size(filesystem["/"])
    console.log(sums)
    return sums.filter((s) => s <= 100_000).reduce((p, v) => p + v, 0)
}

function part2(input: string[]): any {
    const sums = []
    function calc_directory_size(directory: Directory) {

        let sum = 0
        for (let name of Object.keys(directory)) {
            // console.log(JSON.stringify(directory[name]))
            // const value = directory[name][Object.keys(directory[name])[0]]
            if (typeof directory[name] == "number") {
                // @ts-ignore
                sum += directory[name]
            } else {
                // @ts-ignore
                sum += calc_directory_size(directory[name])
            }
        }
        sums.push(sum)
        return sum
    }
    const filesystem: Directory = {}
    let path: string[] = ['/']
    input.forEach((line) => {
        if(line.startsWith('$ cd')) {
            const arg = line.split(' ')[2]
            if(arg == '/') {
                path = ['/']
            } else if(arg == '..') {
                path.pop()
            } else {
                path.push(arg)
            }
            return
        }
        if(line.startsWith('$ ls')) return
        if(line.startsWith('dir')) return
        const [size, filename] = line.split(' ')
        try {
            dot.str(path.join('.') + '.' + filename.replace('.', '-'), parseInt(size), filesystem)

        } catch {

        }
    })
    // @ts-ignore
    calc_directory_size(filesystem["/"])
    const NEEDED_SPACE = 30000000
    const TOTAL_SPACE = 70000000
    const SPACE_REMAINING = TOTAL_SPACE - sums[sums.length -1]
    const NEED_TO_DELETE = NEEDED_SPACE - SPACE_REMAINING
    console.log(NEED_TO_DELETE)
    let delete_size = sums[sums.length -1]
    sums.forEach((sum) => {
        if(sum > NEED_TO_DELETE && sum < delete_size) delete_size = sum
    })
    return delete_size
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
