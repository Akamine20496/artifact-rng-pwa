// Class ValueStat
class AttributeValueStat extends AttributeStat {
    // private variables
    #attributeValues = [];

    // constructor method
    constructor(attributeName, attributeValues) {
        if (typeof attributeName === 'string' && Array.isArray(attributeValues)) {
            super(attributeName);
            this.#attributeValues = attributeValues !== null ? [...attributeValues] : [];
        }
    }

    getAttributeValues() {
        return [...this.#attributeValues];
    }

    toString() {
        return `AttributeValueStat{attributeName='${this.getAttributeName()}', attributeValues=${this.#attributeValues}}`;
    }

    equals(o) {
        if (this == o) return true;                                     // Check if both references point to the same object
        if (!(o instanceof AttributeValueStat)) return false;           // Check if the object is of the same type
        return this.#attributeValues.length === o.getAttributeValues().length &&
                this.#attributeValues.every((value, index) => {
                    value === o.getAttributeValues()[index]
                }) && this.getAttributeName() === o.getAttributeName(); // Compare attributeValues array and attributeName for equality
    }
}