// Class Stat
class Stat {
    // private variables
    #attribute = null;
    #probability = 0.00;
    #values = new Array();

    // constructor method
    constructor(arg1, arg2) {
        // accepts string and number (double)
        if (typeof arg1 === 'string' && typeof arg2 === 'number') {
            this.#attribute = arg1;
            this.#probability = arg2;
        } 
        // accepts string and array
        else if (typeof arg1 === 'string' && Array.isArray(arg2)) {
            this.#attribute = arg1;
            this.#values = arg2;
        }
    }

    // get methods
    getAttribute() {
        return this.#attribute;
    }

    getProbability() {
        return this.#probability;
    }

    getValues() {
        return this.#values;
    }
}