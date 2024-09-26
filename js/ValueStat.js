// Class ValueStat
class ValueStat extends AttributeStat {
    // private variables
    #values = [];

    // constructor method
    constructor(attribute, values) {
        if (typeof attribute === 'string' && Array.isArray(values)) {
            super(attribute);
            this.#values = values !== null ? [...values] : [];
        }
    }

    getValues() {
        return [...this.#values];
    }

    toString() {
        return `ValueStat{attribute='${this.getAttribute()}', values=${this.#values}}`;
    }

    equals(o) {
        if (this == o) return true;                             // Check if both references point to the same object
        if (!(o instanceof ValueStat)) return false;            // Check if the object is of the same type
        return this.#values.length === o.getValues().length &&
                this.#values.every((value, index) => {
                    value === o.getValues()[index]
                }) && this.getAttribute() === o.getAttribute(); // Compare values array and attribute for equality
    }
}