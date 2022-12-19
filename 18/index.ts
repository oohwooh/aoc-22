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
        if(x >= maxX || y >= maxY || z >= maxZ || x <= minX || y <= minY || z <= minZ) return false
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
    function doesHitLavaInDirection([x, y, z]: number[], [dx, dy, dz]: number[]) {
        const [ox, oy, oz] = [x,y,z]
        while(!(x > maxX || y > maxY || z > maxZ || x < minX || y < minY || z < minZ)) {
            x += dx
            y += dy
            z += dz
            try {
                if(dropletsGrid[x][y][z] == true && isAirPocket([x-dx,y-dy,z-dz])) {
                    if(!allAirPockets.includes([x-dx,y-dy,z-dz].toString())) {
                        allAirPockets.push([x-dx,y-dy,z-dz].toString())
                    }
                    return true
                }
            } catch {}
        }
        return false
    }
    function doesHitWrongAirPocketInDirection([x, y, z]: number[], [dx, dy, dz]: number[]) {
        while(!(x > maxX || y > maxY || z > maxZ || x < minX || y < minY || z < minZ)) {
            x += dx
            y += dy
            z += dz
            try {
                if(dropletsGrid[x][y][z] == true) {
                    return false
                }
                if(wrongAirPockets.includes([x,y,z].toString())) {
                    // if(!allAirPockets.includes([x-dx,y-dy,z-dz].toString())) {
                    //     allAirPockets.push([x-dx,y-dy,z-dz].toString())
                    // }
                    return true
                }
            } catch {}
        }
        return false
    }
    // console.log(dropletsList.map(d => '[' + [d.x, d.y, d.z].join(',') + '],').join(''))
    dropletsList.forEach(d => {
        // console.log(`<point>point="${d.x}, ${d.y}, ${d.z}" color="rgb(255,0,0)" size="10" visible="true"</point>`)
    })
    const allAirPockets = []
    const countedFaces = []
    dropletsList.forEach(droplet => {
        const airNeighbors = cubeNeighbors.filter(n => {
            try {
                return !dropletsGrid[n[0] + droplet.x][n[1] + droplet.y][n[2] + droplet.z] == true
            }
            catch {
                return true
            }
        })
        surfaceArea += airNeighbors.filter((an) => {
            if(!doesHitLavaInDirection([droplet.x, droplet.y, droplet.z], an)) {
                countedFaces.push([droplet.x, droplet.y, droplet.z, an[0], an[1], an[2]].toString())
                return true
            }
        }).length
        // surfaceArea += tempCount
    })
    console.log(surfaceArea)

    const wrongAirPockets = []
    allAirPockets.forEach(pocket => {
        const [x, y, z] = pocket.split(',').map(n => parseInt(n))
        if(cubeNeighbors.filter(n => doesHitLavaInDirection([x, y, z], n)).length != 6) {
            // this has been miscalculated as an air pocket
            // console.log(x,y,z)
            if(!wrongAirPockets.includes([x,y,z].toString())) wrongAirPockets.push([x,y,z].toString())
            surfaceArea += cubeNeighbors.filter(n => {
                try {
                    if(dropletsGrid[n[0] + x][n[1] + y][n[2] + z] == true) {
                        countedFaces.push([x,y,z, n[0], n[1], n[2]].toString())
                         return true
                    }
                }
                catch {
                    return false
                }
            }).length
        }
    })
    console.log(surfaceArea)
    allAirPockets.filter(p => !wrongAirPockets.includes(p)).forEach(pocket => {
        const [x, y, z] = pocket.split(',').map(n => parseInt(n))
        if(cubeNeighbors.filter(n => doesHitWrongAirPocketInDirection([x, y, z], n)).length != 0) {
            // this has been miscalculated as an air pocket
            // console.log(x,y,z)
            // if(!wrongAirPockets.includes([x,y,z].toString())) wrongAirPockets.push([x,y,z].toString())
            surfaceArea += cubeNeighbors.filter(n => {
                try {
                    if(dropletsGrid[n[0] + x][n[1] + y][n[2] + z] == true) {
                        countedFaces.push([x,y,z, n[0], n[1], n[2]].toString())
                        return true
                    }
                }
                catch {
                    return false
                }
            }).length
        }
    })
    // console.log(dropletsList.map(d => '[' + d  + '],').join(''))
    // console.log('')
    // console.log(allAirPockets.map(d => '[' + d  + '],').join(''))
    // console.log('')
    // console.log(wrongAirPockets.map(d => '[' + d  + '],').join(''))
    console.log(countedFaces)
    console.log([...new Set(countedFaces)].length)
    return surfaceArea
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
// console.log(`Input: ${part2(input)}`)
