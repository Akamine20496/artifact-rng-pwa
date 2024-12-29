// Class ProbabilityStat
class AttributeProbabilityStat extends AttributeStat {
    #attributeProbability = 0;

    // constructor method
    constructor(attributeName, attributeProbability) {
        if (typeof attributeName === 'string' && typeof attributeProbability === 'number') {
            super(attributeName);
            this.#attributeProbability = this.#validateProbability(attributeProbability);
        }
    }

    #validateProbability(probability) {
        if (probability < 0 || probability > 100) {
            throw new Error('Probability must be between 0 and 100.');
        }

        return probability;
    }

    getAttributeProbability() {
        return this.#attributeProbability;
    }

    toString() {
        return `AttributeProbabilityStat{attributeName='${this.getAttributeName()}',attributeProbability=${this.#attributeProbability}}`;
    }

    equals(o) {
        if (this == o) return true;                                             // Check if both references point to the same object
        if (!(o instanceof AttributeProbabilityStat)) return false;             // Check if the object is of the same type
        return this.#attributeProbability === o.getAttributeProbability() &&
                this.getAttributeName() === o.getAttributeName();               // Compare attributeProbability and attributeName for equality
    }
}