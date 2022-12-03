import fs from 'fs';

const test = fs.readFileSync('./2/test.txt').toString().split('\n')
const input = fs.readFileSync('./2/input.txt').toString().split('\n')
test.pop()
input.pop()

enum Move {
    ROCK= 1,
    PAPER,
    SCISSORS,
}

type Round = {
    opponentMove: Move
    myMove: Move
}

function scoreFromRound(round: Round): number {
    // console.log(JSON.stringify(round))
    var score: number = round.myMove
    if (round.opponentMove == round.myMove) {
        // Draw
        score += 3
    } else if (((round.myMove ) % 3) + 1 != round.opponentMove ) {
        // We won! (provided my algorithm works)
        score += 6
    }
    // console.debug(`We played ${round.myMove`)
    return score
}

function part1(input: string[]): any {
    const rounds = input.map((line): Round => {
        const [opponentMove, myMove] = line.split(' ').map((char) => {
            if(char == 'A' || char == 'X') return Move.ROCK
            if(char == 'B' || char == 'Y') return Move.PAPER
            if(char == 'C' || char == 'Z') return Move.SCISSORS
        })
        return {
            opponentMove,
            myMove
        }
    })
    return rounds.reduce((p, v): number => {
        return p + scoreFromRound(v)
    },0)
}

function part2(input: string[]): any {
    const rounds = input.map((line): Round => {
        var lastOpponentMove: Move;
        const [opponentMove, myMove] = line.split(' ').map((char) => {
            if(char == 'A') return lastOpponentMove = Move.ROCK
            if(char == 'B') return lastOpponentMove = Move.PAPER
            if(char == 'C') return lastOpponentMove = Move.SCISSORS
            if(char == 'X') return ((lastOpponentMove + 1 ) % 3) + 1
            if(char == 'Y') return lastOpponentMove
            if(char == 'Z') return (lastOpponentMove  % 3) + 1
        })
        return {
            opponentMove,
            myMove
        }
    })
    return rounds.reduce((p, v): number => {
        return p + scoreFromRound(v)
    },0)
}


console.log('Part 1:')
console.log(`Test: ${part1(test)}`)
console.log(`Input: ${part1(input)}`)

console.log('Part 2:')
console.log(`Test: ${part2(test)}`)
console.log(`Input: ${part2(input)}`)
