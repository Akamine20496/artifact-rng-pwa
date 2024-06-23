// Class Stat
class Stat {
    // private variables
    #attribute = null;
    #probability = 0.00;
    #values = [];

    // constructor method
    constructor(attName, attValue) {
        // accepts string and number (double)
        if (typeof attName === 'string' && typeof attValue === 'number') {
            this.#attribute = attName;
            this.#probability = attValue;
        } 
        // accepts string and array
        else if (typeof attName === 'string' && Array.isArray(attValue)) {
            this.#attribute = attName;
            this.#values = attValue;
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