class SubStatPreview {
    #attributeName = null;
    #attributeValue = 0;

    constructor(attributeName, attributeValue) {
        if (typeof attributeName === 'string' && typeof attributeValue === 'number') {
            this.#attributeName = attributeName;
            this.#attributeValue = attributeValue;
        }
    }

    getAttributeName() {
        return this.#attributeName;
    }

    getAttributeValue() {
        return this.#attributeValue;
    }

    equals(o) {
        // Check if the object is compared with itself
        if (this === o) return true;
        // Check if the object is an instance of SubStatPreview
        if (!(o instanceof SubStatPreview)) return false;
        // Compare the relevant fields for equality
        return Object.is(this.#attributeValue, o.getAttributeValue()) && 
                Object.is(this.#attributeName, o.getAttributeName());
    }

    toString() {
        return `SubStatPreview{attributeName='${this.getAttributeName()}', attributeValue=${this.getAttributeValue()}}`;
    }
}