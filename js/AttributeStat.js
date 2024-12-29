// Class AttributeStat
class AttributeStat {
    #attributeName = null;

    // constructor method
    constructor(attributeName) {
        if (new.target === AttributeStat) {
            throw new Error("Cannot instantiate AttributeStat Class directly.");
        }

        if (typeof attributeName === 'string') {
            this.#attributeName = attributeName;
        }
    }

    getAttributeName() {
        return this.#attributeName;
    }

    toString() {
        return `AttributeStat{attributeName='${this.#attributeName}'}`;
    }

    equals(o) {
        if (this == o) return true;                         // Check if both references point to the same object
        if (!(o instanceof AttributeStat)) return false;    // Check if the object is of the same type
        return this.#attributeName === o.getAttributeName();// Compare attributeName for equality
    }
}