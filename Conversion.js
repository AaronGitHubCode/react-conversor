class Conversion {
    input
    output
    type

    constructor(input, output, type) {
        this.input = input
        this.output = output
        this.type = type
    }

    get input() {
        return this.input
    }

    get output() {
        return this.output
    }

    get type() {
        return this.type
    }
}

export default Conversion