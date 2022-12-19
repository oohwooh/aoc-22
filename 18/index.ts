import fs from 'fs';

const test = fs.readFileSync('./18/test.txt').toString().split('\n')
const input = fs.readFileSync('./18/input.txt').toString().split('\n')
test.pop()
input.pop()

const cubeNeighbors = [[1,0,0], [0,1,0], [0,0,1], [-1,0,0], [0,-1,0], [0,0,-1]]

function part1(input: string[]): any {
    let surfaceArea = 0
    // Shadow the hedgehog cameo
    const dropletsGrid: boolean[][][] = []
    const dropletsList = []
    input.forEach((line) => {
        const [x, y, z] = line.split(',').map(a => parseInt(a))
        if(dropletsGrid[x] == undefined) dropletsGrid[x] = []
        if(dropletsGrid[x][y] == undefined) dropletsGrid[x][y] = []
        dropletsGrid[x][y][z] = true
        dropletsList.push({ x, y, z })
    })
    dropletsList.forEach(droplet => {
        surfaceArea += cubeNeighbors.filter(n => {
            try {
                return !dropletsGrid[n[0] + droplet.x][n[1] + droplet.y][n[2] + droplet.z] == true
            }
            catch {
                return true
            }
        }).length
    })
    return surfaceArea
}

function part2(input: string[]): any {
    let surfaceArea = 0
    // Shadow the hedgehog cameo
    const dropletsGrid: boolean[][][] = []
    const dropletsList = []
    let [maxX, maxY, maxZ, minX, minY, minZ] = [0, 0, 0,1, 1,1]
    input.forEach((line) => {
        const [x, y, z] = line.split(',').map(a => parseInt(a))
        if(dropletsGrid[x] == undefined) dropletsGrid[x] = []
        if(dropletsGrid[x][y] == undefined) dropletsGrid[x][y] = []
        dropletsGrid[x][y][z] = true
        if(x > maxX) maxX = x
        if(y > maxY) maxY = y
        if(z > maxZ) maxZ = z
        if(x < minX) minX = x
        if(y < minY) minY = y
        if(z < minZ) minZ = z
        dropletsList.push({ x, y, z })
    })
    function isAirPocket([x, y, z]: number[], exclude: number[][] = []): boolean {
        if(x >= maxX || y >= maxY || z >= maxZ || x <= minX || y <= minY || z <= minZ ) return false
        const nonExcludedNeighbors = exclude.length > 0? cubeNeighbors.filter(n => exclude.map(e => e.toString()).includes([n[0] + x, n[1] + y, n[2] + z].toString())) : cubeNeighbors
        if(nonExcludedNeighbors.length == 0) return false
        const lavaNeighbors = nonExcludedNeighbors.filter(n => {
            try {
                return dropletsGrid[n[0] + x][n[1] + y][n[2] + z] == true
            } catch {
                return false
            }
        })
        const airNeighbors = nonExcludedNeighbors.filter(n => {
            try {
                return !dropletsGrid[n[0] + x][n[1] + y][n[2] + z] == true
            } catch {
                return true
            }
        })
        if(lavaNeighbors.length == nonExcludedNeighbors.length) {
            return true
        }
        return airNeighbors.map(n => {
            return !isAirPocket(n, [...exclude, [x, y, z]])
        }).includes(true)
    }

    dropletsList.forEach(d => {
        // console.log(`<point>point="${d.x}, ${d.y}, ${d.z}" color="rgb(255,0,0)" size="10" visible="true"</point>`)
    })
    dropletsList.forEach(droplet => {
        const airNeighbors = cubeNeighbors.filter(n => {
            try {
                return !dropletsGrid[n[0] + droplet.x][n[1] + droplet.y][n[2] + droplet.z] == true
            }
            catch {
                return true
            }
        })
        let tempCount = airNeighbors.length
        const allAirPockets = []
        airNeighbors.forEach((an) => {
            const [x, y, z] = [an[0] + droplet.x, an[1] + droplet.y, an[2] + droplet.z]
            if(isAirPocket([x, y, z])) {
                tempCount--
                if(!allAirPockets.includes([x, y, z].toString())) {
                    allAirPockets.push([x,y,z].toString())
                    console.log(`<point>point="${x}, ${y}, ${z}" color="rgb(0,255,0)" size="10" visible="true"</point>`)
                }
                // console.log([x, y, z], 'is an air pocket')
            }
        })
        surfaceArea += tempCount
    })
    return surfaceArea
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
// console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
