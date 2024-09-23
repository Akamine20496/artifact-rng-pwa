// Class ProbabilityStat
class ProbabilityStat extends AttributeStat {
    #probability = 0;

    // constructor method
    constructor(attribute, probability) {
        if (typeof attribute === 'string' && typeof probability === 'number') {
            super(attribute);
            this.#probability = this.#validateProbability(probability);
        }
    }

    #validateProbability(probability) {
        if (probability < 0 || probability > 100) {
            throw new Error('Probability must be between 0 and 100.');
        }

        return probability;
    }

    getProbability() {
        return this.#probability;
    }

    toString() {
        return `ProbabilityStat{attribute='${this.getAttribute()}',probability=${this.#probability}}`;
    }

    equals(o) {
        if (this == o) return true;                         // Check if both references point to the same object
        if (!(o instanceof ProbabilityStat)) return false;  // Check if the object is of the same type
        return this.#probability === o.getProbability() &&
                this.getAttribute === o.getAttribute();     // Compare probability and attribute for equality
    }
}