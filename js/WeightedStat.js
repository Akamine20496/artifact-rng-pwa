// Class WeightedStat
class WeightedStat extends AttributeStat {
    // private variables
    #weight = 0;

    // constructor method
    constructor(attribute, weight) {
        if (typeof attribute === 'string' && typeof weight === 'number') {
            super(attribute);
            this.#weight = weight;
        }
    }

    getWeight() {
        return this.#weight;
    }

    toString() {
        return `WeightedStat{attribute='${this.getAttribute()}', weight=${this.#weight}}`;
    }

    equals(o) {
        if (this == o) return true;                     // Check if both references point to the same object
        if (!(o instanceof WeightedStat)) return false; // Check if the object is of the same type
        return this.#weight === o.getWeight() &&
                this.getAttribute === o.getAttribute(); // Compare weight and attribute for equality
    }
}