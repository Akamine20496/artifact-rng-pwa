// Class Attribute
class Attribute {
    // Private static variable to hold the single instance
    static #instance = null;

    // static variables
    static #HP_FLAT_VALUE = [ 209.13, 239.00, 268.88, 298.75 ];
    static #ATK_FLAT_VALUE = [ 13.62, 15.56, 17.51, 19.45 ];
    static #DEF_FLAT_VALUE = [ 16.20, 18.52, 20.83, 23.15 ];
    static #HP_PER_VALUE = [ 4.08, 4.66, 5.25, 5.83 ];
    static #ATK_PER_VALUE = [ 4.08, 4.66, 5.25, 5.83 ];
    static #DEF_PER_VALUE = [ 5.10, 5.83, 6.56, 7.29 ];
    static #ENERGY_RECHARGE_VALUE = [ 4.53, 5.18, 5.83, 6.48 ];
    static #ELEMENTAL_MASTERY_VALUE = [ 16.32, 18.65, 20.98, 23.31 ];
	static #CRIT_RATE_VALUE = [ 2.72, 3.11, 3.50, 3.89 ];
	static #CRIT_DMG_VALUE = [ 5.44, 6.22, 6.99, 7.77 ];

    static HP_FLAT = 'HP';
	static ATK_FLAT = 'ATK';
	static DEF_FLAT = 'DEF';
	static HP_PER = 'HP%';
	static ATK_PER = 'ATK%';
	static DEF_PER = 'DEF%';
	static ENERGY_RECHARGE = 'Energy Recharge%';
	static ELEMENTAL_MASTERY = 'Elemental Mastery';
	static CRIT_RATE = 'CRIT Rate%';
	static CRIT_DMG = 'CRIT DMG%';
	static PYRO_DMG_BONUS = 'Pyro DMG Bonus%';
	static ELECTRO_DMG_BONUS = 'Electro DMG Bonus%';
	static CRYO_DMG_BONUS = 'Cryo DMG Bonus%';
	static HYDRO_DMG_BONUS = 'Hydro DMG Bonus%';
	static DENDRO_DMG_BONUS = 'Dendro DMG Bonus%';
	static ANEMO_DMG_BONUS = 'Anemo DMG Bonus%';
	static GEO_DMG_BONUS = 'Geo DMG Bonus%';
	static PHYSICAL_DMG_BONUS = 'Physical DMG Bonus%';
	static HEALING_BONUS = 'Healing Bonus%';
    
    // static array variables
    static VALUE_STATS = [
        new AttributeValueStat(this.HP_FLAT, this.#HP_FLAT_VALUE),
        new AttributeValueStat(this.ATK_FLAT, this.#ATK_FLAT_VALUE),
        new AttributeValueStat(this.DEF_FLAT, this.#DEF_FLAT_VALUE),
        new AttributeValueStat(this.HP_PER, this.#HP_PER_VALUE),
        new AttributeValueStat(this.ATK_PER, this.#ATK_PER_VALUE),
        new AttributeValueStat(this.DEF_PER, this.#DEF_PER_VALUE),
        new AttributeValueStat(this.ENERGY_RECHARGE, this.#ENERGY_RECHARGE_VALUE),
        new AttributeValueStat(this.ELEMENTAL_MASTERY, this.#ELEMENTAL_MASTERY_VALUE),
        new AttributeValueStat(this.CRIT_RATE, this.#CRIT_RATE_VALUE),
        new AttributeValueStat(this.CRIT_DMG, this.#CRIT_DMG_VALUE)
    ];
    static ATTRIBUTES_NAMES = [
        this.HP_FLAT, 
        this.ATK_FLAT, 
        this.DEF_FLAT,
        this.HP_PER, 
        this.ATK_PER, 
        this.DEF_PER,
        this.ENERGY_RECHARGE, 
        this.ELEMENTAL_MASTERY,
        this.CRIT_RATE, 
        this.CRIT_DMG
    ];
    static SPECIAL_ATTRIBUTE_NAMES = [
        this.PYRO_DMG_BONUS, 
        this.ELECTRO_DMG_BONUS, 
        this.CRYO_DMG_BONUS,
        this.HYDRO_DMG_BONUS, 
        this.DENDRO_DMG_BONUS, 
        this.ANEMO_DMG_BONUS,
        this.GEO_DMG_BONUS, 
        this.PHYSICAL_DMG_BONUS, 
        this.HEALING_BONUS
    ];

    constructor() {
        if (Attribute.#instance) {
            throw new Error("Use getInstance() to get the Singleton instance.");
        }
    }

    static getInstance() {
        if (!Attribute.#instance) {
            Attribute.#instance = new Attribute();
        }

        return Attribute.#instance;
    }

    getAttributeValues(attributeName) {
        if (typeof attributeName !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        let retrievedValueStat = null;

        for (const currValueStat of Attribute.VALUE_STATS) {
            if (currValueStat.getAttributeName() === attributeName) {
                retrievedValueStat = currValueStat;
                break;
            }
        }

        if (retrievedValueStat === null) {
            throw new Error("Invalid attributeName: " + attributeName);
        } else {
            return retrievedValueStat.getAttributeValues();
        }
    }

    isNotSpecialAttribute(attributeName) {
        // checks if the type is not string
        if (typeof attributeName !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        // returns a boolean if the attributeName matched
        return Attribute.ATTRIBUTES_NAMES.includes(attributeName);
    }

    getHpPer() {
        return Attribute.#HP_PER_VALUE;
    }

    getAtkPer() {
        return Attribute.#ATK_PER_VALUE;
    }

    getDefPer() {
        return Attribute.#DEF_PER_VALUE;
    }

    getHpFlat() {
        return Attribute.#HP_FLAT_VALUE;
    }

    getAtkFlat() {
        return Attribute.#ATK_FLAT_VALUE;
    }

    getDefFlat() {
        return Attribute.#DEF_FLAT_VALUE;
    }

    getEnergyRecharge() {
        return Attribute.#ENERGY_RECHARGE_VALUE;
    }

    getElementalMastery() {
        return Attribute.#ELEMENTAL_MASTERY_VALUE;
    }

    getCritRate() {
        return Attribute.#CRIT_RATE_VALUE;
    }

    getCritDamage() {
        return Attribute.#CRIT_DMG_VALUE;
    }
}
