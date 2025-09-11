class ArtifactSubStat {
    #attributeName = null;
    #initialAttributeValue = 0;
    #attributeValue = 0;
    #prevAttributeValue = 0;
    #isInitialValueEmpty = false;

    #artifact = new Artifact();

    #subStatPreview = null;

    constructor(attributeName, attributeValue) {
        if ((typeof attributeName === 'string' || attributeName === null) && typeof attributeValue === 'number') {
            this.#attributeName = this.#artifact.isSubAttribute(attributeName);
            this.#initialAttributeValue = this.#attributeValue = this.#artifact.isSubAttributeValue(attributeName, attributeValue);
            this.#isInitialValueEmpty = (this.#initialAttributeValue === 0);
        }
    }

    setAttributeName(attributeName) {
        this.#attributeName = attributeName;
    }

    setSubStatPreview(subStatPreview) {
        if ((subStatPreview instanceof SubStatPreview) || subStatPreview === null) {
            this.#subStatPreview = subStatPreview;
        } else {
            throw new TypeError("Not an instance of SubStatPreview Class");
        }
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

    getSubStatPreview() {
        return this.#subStatPreview;
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

    applySubStatPreviewToActualSubStat() {
        const attributeNamePreview = this.#subStatPreview.getAttributeName();
        const attributeValuePreview = this.#subStatPreview.getAttributeValue();

        this.#attributeName = this.#artifact.isSubAttribute(attributeNamePreview);
        this.#initialAttributeValue = this.#attributeValue = this.#artifact.isSubAttributeValue(attributeNamePreview, attributeValuePreview)
        this.#isInitialValueEmpty = (this.#initialAttributeValue === 0);

        this.#subStatPreview = null;
    }

    addAttributeValue(attributeValue) {
        this.#prevAttributeValue = this.#attributeValue;
        this.#attributeValue += attributeValue;
    }

    getSubStat() {
        if (this.#attributeName === null && this.#subStatPreview === null) {
            return 'None';
        } else {
            if (this.#subStatPreview !== null) {
                return this.#artifact.formatSubStat(this.#subStatPreview.getAttributeName(), this.#subStatPreview.getAttributeValue());
            } else {
                return this.#artifact.formatSubStat(this.#attributeName, this.#attributeValue);
            }
        }
    }

    toString() {
        return 'ArtifactSubStat{' +
                "attributeName='" + this.#attributeName + "', " +
                'initialAttributeValue=' + this.#initialAttributeValue + ', ' +
                'attributeValue=' + this.#attributeValue + ', ' +
                'prevAttributeValue=' + this.#prevAttributeValue + ', ' +
                'isInitialValueEmpty=' + this.#isInitialValueEmpty + 
                "subStatPreview=" + (this.#subStatPreview !== null ? this.#subStatPreview.toString() : 'null') +
                '}';
    }

    equals(o) {
        // Check if the object is compared with itself
        if (this == o) return true;
        // Check if the object is an instance of ArtifactSubStat
        if (!(o instanceof ArtifactSubStat)) return false;
        // Compare the relevant fields for equality
        return Object.is(this.#attributeName, o.getAttributeName()) &&
                Object.is(this.#initialAttributeValue, o.getInitialAttributeValue()) &&
                Object.is(this.#attributeValue, o.getAttributeValue()) &&
                Object.is(this.#prevAttributeValue, o.getPrevAttributeValue()) &&
                this.#isInitialValueEmpty === o.getIsInitialValueEmpty() &&
                ((this.#subStatPreview === null && o.getSubStatPreview() === null) ||
                (this.#subStatPreview !== null && o.getSubStatPreview() !== null &&
                this.#subStatPreview.equals(o.getSubStatPreview())));
    }
}