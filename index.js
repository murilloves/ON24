/*
    You are on a ferry heading towards an island, but a storm has come in faster than anyone expected. The ferry needs to take evasive actions!

    Unfortunately, the ship's navigation computer seems to be malfunctioning; rather than giving a route directly to safety, it produced
    extremely circuitous instructions. When the captain uses the PA system to ask if anyone can help, you quickly volunteer.

    The navigation instructions (your puzzle input) consists of a sequence of single-character actions paired with integer input values.
    After staring at them for a few minutes, you work out what they probably mean:

    Action N means to move north by the given value.
    Action S means to move south by the given value.
    Action E means to move east by the given value.
    Action W means to move west by the given value.
    Action L means to turn left the given number of degrees.
    Action R means to turn right the given number of degrees.
    Action F means to move forward by the given value in the direction the ship is currently facing.

    The ship starts by facing east. Only the L and R actions change the direction the ship is facing. (That is, if the ship is facing east and
    the next instruction is N10, the ship would move north 10 units, but would still move east if the following action were F.)

    For example:
    F10
    N3
    F7
    R90
    F11

    These instructions would be handled as follows:

    F10 would move the ship 10 units east (because the ship starts by facing east) to east 10, north 0.
    N3 would move the ship 3 units north to east 10, north 3.
    F7 would move the ship another 7 units east (because the ship is still facing east) to east 17, north 3.
    R90 would cause the ship to turn right by 90 degrees and face south; it remains at east 17, north 3.
    F11 would move the ship 11 units south to east 17, south 8.

    At the end of these instructions, the ship's Manhattan distance (sum of the absolute values of its east/west position
    and its north/south position) from its starting position is 17 + 8 = 25.

    Figure out where the navigation instructions lead. What is the Manhattan distance between that location and the ship's starting position?
*/


/*

    {
        north: 0,
        west: 90,
        south: 180,
        east: 270,
        heading: 'east',
        LEFT: ?deg,
        RIGHT: ?deg,
    }

        N
    E       W
        S

    [0, 90, 180, 270]

    R180 -> from east to west
    E1 -> 1 unit to east
    (in this case, the ship is heading west, and it will move 1 unit to its east relative position)
    N1 -> 1 unit to north

*/

const inputs = require('./inputs');

const testInputs = {
  coordinatesArray: [
    'F10',
    'N3',
    'F7',
    'R90',
    'F11'
  ]
}

const coordinates = {
    '0': 0, // NORTH
    '90': 0, // EAST
    '180': 0, // SOUTH
    '270': 0, // WEST
    heading: 90, // that means EAST
}

const GEO_COORDINATES = [0, 90, 180, 270]

/*
        0
        N
270             90
 E              W
       180
        S
*/

const whereIsItHeading = (newCoordinate) => {
    const toWhere = newCoordinate.charAt(0)
    const units = Number(newCoordinate.substring(1))

    if (toWhere === 'R') {
        coordinates.heading = (coordinates.heading + units) % 360
        return
    }
    if (toWhere === 'L') {
        coordinates.heading = (360 + coordinates.heading - units) % 360
        return
    }

    if (toWhere === 'F') {
        coordinates[coordinates.heading] += units
        return
    }

    if (toWhere === 'N') {
        coordinates[0] += units
        return
    }
    if (toWhere === 'E') {
        coordinates[90] += units
        return
    }
    if (toWhere === 'S') {
        coordinates[180] += units
        return
    }
    if (toWhere === 'W') {
        coordinates[270] += units
        return
    }

    return coordinates.heading
}

const getAbsoluteValues = () => {
    const vertical = Math.abs(coordinates[0] - coordinates[180])
    const horizontal = Math.abs(coordinates[270] - coordinates[90])

    return [vertical, horizontal]
}

const finalPositionSum = (vertical, horizontal) => {
    return vertical + horizontal
}

const main = () => {
    inputs.coordinatesArray.forEach(item => {
        whereIsItHeading(item)
    })
    const [vertical, horizontal] = getAbsoluteValues()

    const finalPositionAbs = finalPositionSum(vertical, horizontal)

    console.log('coordinates:')
    console.table(coordinates)

    console.log(' vertical: ', vertical, '\n', 'horizontal: ', horizontal)
    console.log('\n Ferry distance between Manhattan: ', finalPositionAbs)

    return finalPositionAbs
}

main()
