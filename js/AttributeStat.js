// Class AttributeStat
class AttributeStat {
    #attribute = null;

    // constructor method
    constructor(attribute) {
        if (new.target === AttributeStat) {
            throw new Error("Cannot instantiate AttributeStat Class directly.");
        }

        if (typeof attribute === 'string') {
            this.#attribute = attribute;
        }
    }

    getAttribute() {
        return this.#attribute;
    }

    toString() {
        return `AttributeStat{attribute='${this.#attribute}'}`;
    }

    equals(o) {
        if (this == o) return true;                         // Check if both references point to the same object
        if (!(o instanceof AttributeStat)) return false;    // Check if the object is of the same type
        return this.#attribute === o.getAttribute();        // Compare attribute for equality
    }
}