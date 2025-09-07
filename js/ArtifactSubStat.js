class ArtifactSubStat {
    #attributeName = null;
    #previewAttributeName = null;
    #initialAttributeValue = 0;
    #attributeValue = 0;
    #prevAttributeValue = 0;
    #isInitialValueEmpty = false;

    #artifact = new Artifact();

    constructor(attributeName, attributeValue) {
        if ((typeof attributeName === 'string' || attributeName === null) && typeof attributeValue === 'number') {
            this.#attributeName = this.#artifact.isSubAttribute(attributeName);
            this.#initialAttributeValue = this.#attributeValue = this.#artifact.isSubAttributeValue(attributeName, attributeValue);
            this.#isInitialValueEmpty = (attributeName === null);
        }
    }

    setAttributeName(attributeName) {
        this.#attributeName = attributeName;
    }

    setPreviewAttributeName(attributeName) {
        this.#previewAttributeName = this.#artifact.isSubAttribute(attributeName);
    }

    setInitialAttributeValue(initialAttributeValue) {
        this.#initialAttributeValue = this.#attributeValue = initialAttributeValue;
        this.#isInitialValueEmpty = (initialAttributeValue === 0);
    }

    setAttributeValue(attributeValue) {
        this.#attributeValue = attributeValue;
    }

    setPrevAttributeValue(currAttributeValue) {
        this.#prevAttributeValue = currAttributeValue;
    }

    getAttributeName() {
        return this.#attributeName;
    }

    getPreviewAttributeName() {
        return this.#previewAttributeName;
    }

    getInitialAttributeValue() {
        return this.#initialAttributeValue;
    }

    getAttributeValue() {
        return this.#attributeValue;
    }

    getPrevAttributeValue() {
        return this.#prevAttributeValue;
    }

    getIsInitialValueEmpty() {
        return this.#isInitialValueEmpty;
    }

    applyPreviewAttributeNameToSubStat() {
        this.#attributeName = this.#previewAttributeName;
        this.#initialAttributeValue = this.#attributeValue = this.#artifact.generateSubAttributeValue(this.#attributeName);
        this.#isInitialValueEmpty = false;

        this.#previewAttributeName = null;
    }

    addAttributeValue(attributeValue) {
        this.#prevAttributeValue = this.#attributeValue;
        this.#attributeValue += attributeValue;
    }

    getSubStat() {
        if (this.#attributeName === null && this.#previewAttributeName === null) {
            return 'None';
        } else {
            if (this.#previewAttributeName !== null) {
                return `(${this.#previewAttributeName})`;
            } else {
                return this.#artifact.formatSubStat(this.#attributeName, this.#attributeValue);
            }
        }
    }

    toString() {
        return 'ArtifactSubStat{' +
                "attributeName='" + this.#attributeName + "', " +
                "previewAttributeName='" + this.#previewAttributeName + "', " +
                'initialAttributeValue=' + this.#initialAttributeValue + ', ' +
                'attributeValue=' + this.#attributeValue + ', ' +
                'prevAttributeValue=' + this.#prevAttributeValue + ', ' +
                'isInitialValueEmpty=' + this.#isInitialValueEmpty + 
                '}';
    }

    equals(o) {
        // Check if the object is compared with itself
        if (this == o) return true;
        // Check if the object is an instance of ArtifactSubStat
        if (!(o instanceof ArtifactSubStat)) return false;
        // Compare the relevant fields for equality
        return (this.#attributeName === null ? o.getAttributeName() === null :
                this.#attributeName === o.getAttributeName()) && 
                (this.#previewAttributeName === null ? o.getPreviewAttributeName() === null :
                this.#previewAttributeName === o.getPreviewAttributeName()) && 
                this.#initialAttributeValue === o.getInitialAttributeValue() && 
                this.#attributeValue === o.getAttributeValue() && 
                this.#prevAttributeValue === o.getPrevAttributeValue() && 
                this.#isInitialValueEmpty === o.getIsInitialValueEmpty();
    }
}