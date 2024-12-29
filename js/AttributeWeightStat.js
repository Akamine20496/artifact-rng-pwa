// Class WeightedStat
class AttributeWeightStat extends AttributeStat {
    // private variables
    #attributeWeight = 0;

    // constructor method
    constructor(attributeName, attributeWeight) {
        if (typeof attributeName === 'string' && typeof attributeWeight === 'number') {
            super(attributeName);
            this.#attributeWeight = attributeWeight;
        }
    }

    getAttributeWeight() {
        return this.#attributeWeight;
    }

    toString() {
        return `AttributeWeightStat{attributeName='${this.getAttributeName()}', attributeWeight=${this.#attributeWeight}}`;
    }

    equals(o) {
        if (this == o) return true;                                 // Check if both references point to the same object
        if (!(o instanceof AttributeWeightStat)) return false;      // Check if the object is of the same type
        return this.#attributeWeight === o.getAttributeWeight() &&
                this.getAttributeName() === o.getAttributeName();   // Compare weight and attribute for equality
    }
}