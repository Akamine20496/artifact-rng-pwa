// Class Artifact
class Artifact extends Attribute {
    // Array of Stats (Attribute and Probability)
    #listFlower = [new Stat(Attribute.HP_FLAT, 100.00)];
	#listFeather = [new Stat(Attribute.ATK_FLAT, 100.00)];
	#listSands = [
			new Stat(Attribute.HP_PER, 26.68),
			new Stat(Attribute.ATK_PER, 26.66),
			new Stat(Attribute.DEF_PER, 26.66),
			new Stat(Attribute.ENERGY_RECHARGE, 10.00),
			new Stat(Attribute.ELEMENTAL_MASTERY, 10.00)
    ];
	#listGoblet = [
			new Stat(Attribute.HP_PER, 19.25),
			new Stat(Attribute.ATK_PER, 19.25),
			new Stat(Attribute.DEF_PER, 19.00),
			new Stat(Attribute.PYRO_DMG_BONUS, 5.00),
			new Stat(Attribute.ELECTRO_DMG_BONUS, 5.00),
			new Stat(Attribute.CRYO_DMG_BONUS, 5.00),
			new Stat(Attribute.HYDRO_DMG_BONUS, 5.00),
			new Stat(Attribute.DENDRO_DMG_BONUS, 5.00),
			new Stat(Attribute.ANEMO_DMG_BONUS, 5.00),
			new Stat(Attribute.GEO_DMG_BONUS, 5.00),
			new Stat(Attribute.PHYSICAL_DMG_BONUS, 5.00),
			new Stat(Attribute.ELEMENTAL_MASTERY, 2.50)
    ];
	#listCirclet = [
			new Stat(Attribute.HP_PER, 22.00),
			new Stat(Attribute.ATK_PER, 22.00),
			new Stat(Attribute.DEF_PER, 22.00),
			new Stat(Attribute.CRIT_RATE, 10.00),
			new Stat(Attribute.CRIT_DMG, 10.00),
			new Stat(Attribute.HEALING_BONUS, 10.00),
			new Stat(Attribute.ELEMENTAL_MASTERY, 4.00)
    ];
	#listHpFlat = [
			new Stat(Attribute.ATK_FLAT, 15.79),
			new Stat(Attribute.DEF_FLAT, 15.79),
			new Stat(Attribute.HP_PER, 10.53),
			new Stat(Attribute.ATK_PER, 10.53),
			new Stat(Attribute.DEF_PER, 10.53),
			new Stat(Attribute.ENERGY_RECHARGE, 10.53),
			new Stat(Attribute.ELEMENTAL_MASTERY, 10.53),
			new Stat(Attribute.CRIT_RATE, 7.89),
			new Stat(Attribute.CRIT_DMG, 7.89)
    ];
	#listAtkFlat = [
			new Stat(Attribute.HP_FLAT, 15.79),
			new Stat(Attribute.DEF_FLAT, 15.79),
			new Stat(Attribute.HP_PER, 10.53),
			new Stat(Attribute.ATK_PER, 10.53),
			new Stat(Attribute.DEF_PER, 10.53),
			new Stat(Attribute.ENERGY_RECHARGE, 10.53),
			new Stat(Attribute.ELEMENTAL_MASTERY, 10.53),
			new Stat(Attribute.CRIT_RATE, 7.89),
			new Stat(Attribute.CRIT_DMG, 7.89)
    ];
	#listHpPer = [
			new Stat(Attribute.HP_FLAT, 15.00),
			new Stat(Attribute.ATK_FLAT, 15.00),
			new Stat(Attribute.DEF_FLAT, 15.00),
			new Stat(Attribute.ATK_PER, 10.00),
			new Stat(Attribute.DEF_PER, 10.00),
			new Stat(Attribute.ENERGY_RECHARGE, 10.00),
			new Stat(Attribute.ELEMENTAL_MASTERY, 10.00),
			new Stat(Attribute.CRIT_RATE, 7.50),
			new Stat(Attribute.CRIT_DMG, 7.50)
    ];
	#listAtkPer = [
			new Stat(Attribute.HP_FLAT, 15.00),
			new Stat(Attribute.ATK_FLAT, 15.00),
			new Stat(Attribute.DEF_FLAT, 15.00),
			new Stat(Attribute.HP_PER, 10.00),
			new Stat(Attribute.DEF_PER, 10.00),
			new Stat(Attribute.ENERGY_RECHARGE, 10.00),
			new Stat(Attribute.ELEMENTAL_MASTERY, 10.00),
			new Stat(Attribute.CRIT_RATE, 7.50),
			new Stat(Attribute.CRIT_DMG, 7.50)
    ];
	#listDefPer = [
			new Stat(Attribute.HP_FLAT, 15.00),
			new Stat(Attribute.ATK_FLAT, 15.00),
			new Stat(Attribute.DEF_FLAT, 15.00),
			new Stat(Attribute.HP_PER, 10.00),
			new Stat(Attribute.ATK_PER, 10.00),
			new Stat(Attribute.ENERGY_RECHARGE, 10.00),
			new Stat(Attribute.ELEMENTAL_MASTERY, 10.00),
			new Stat(Attribute.CRIT_RATE, 7.50),
			new Stat(Attribute.CRIT_DMG, 7.50)
    ];
	#listEnergyRecharge = [
			new Stat(Attribute.HP_FLAT, 15.00),
			new Stat(Attribute.ATK_FLAT, 15.00),
			new Stat(Attribute.DEF_FLAT, 15.00),
			new Stat(Attribute.HP_PER, 10.00),
			new Stat(Attribute.ATK_PER, 10.00),
			new Stat(Attribute.DEF_PER, 10.00),
			new Stat(Attribute.ELEMENTAL_MASTERY, 10.00),
			new Stat(Attribute.CRIT_RATE, 7.50),
			new Stat(Attribute.CRIT_DMG, 7.50)
    ];
	#listElementalMastery = [
			new Stat(Attribute.HP_FLAT, 15.00),
			new Stat(Attribute.ATK_FLAT, 15.00),
			new Stat(Attribute.DEF_FLAT, 15.00),
			new Stat(Attribute.HP_PER, 10.00),
			new Stat(Attribute.ATK_PER, 10.00),
			new Stat(Attribute.DEF_PER, 10.00),
			new Stat(Attribute.ENERGY_RECHARGE, 10.00),
			new Stat(Attribute.CRIT_RATE, 7.50),
			new Stat(Attribute.CRIT_DMG, 7.50)
    ];
	#listCritRate = [
			new Stat(Attribute.HP_FLAT, 14.63),
			new Stat(Attribute.ATK_FLAT, 14.63),
			new Stat(Attribute.DEF_FLAT, 14.63),
			new Stat(Attribute.HP_PER, 9.76),
			new Stat(Attribute.ATK_PER, 9.76),
			new Stat(Attribute.DEF_PER, 9.76),
			new Stat(Attribute.ENERGY_RECHARGE, 9.76),
			new Stat(Attribute.ELEMENTAL_MASTERY, 9.76),
			new Stat(Attribute.CRIT_DMG, 7.32)
    ];
	#listCritDmg = [
			new Stat(Attribute.HP_FLAT, 14.63),
			new Stat(Attribute.ATK_FLAT, 14.63),
			new Stat(Attribute.DEF_FLAT, 14.63),
			new Stat(Attribute.HP_PER, 9.76),
			new Stat(Attribute.ATK_PER, 9.76),
			new Stat(Attribute.DEF_PER, 9.76),
			new Stat(Attribute.ENERGY_RECHARGE, 9.76),
			new Stat(Attribute.ELEMENTAL_MASTERY, 9.76),
			new Stat(Attribute.CRIT_RATE, 7.32)
    ];
	#listSpecialAtt = [
			new Stat(Attribute.HP_FLAT, 13.64),
			new Stat(Attribute.ATK_FLAT, 13.64),
			new Stat(Attribute.DEF_FLAT, 13.64),
			new Stat(Attribute.HP_PER, 9.09),
			new Stat(Attribute.ATK_PER, 9.09),
			new Stat(Attribute.DEF_PER, 9.09),
			new Stat(Attribute.ENERGY_RECHARGE, 9.09),
			new Stat(Attribute.ELEMENTAL_MASTERY, 9.09),
			new Stat(Attribute.CRIT_RATE, 6.82),
			new Stat(Attribute.CRIT_DMG, 6.82)
    ];

    // artifact piece and their sub stats

    #FLOWER = 'Flower of Life';
	#FEATHER = 'Plume of Death';
	#SANDS = 'Sands of Eon';
	#GOBLET = 'Goblet of Eonothem';
	#CIRCLET = 'Circlet of Logos';
	#PIECE = [
        'Flower of Life', 'Plume of Death', 
        'Sands of Eon', 'Goblet of Eonothem',
		'Circlet of Logos'
    ];
	#FLOWER_OF_LIFE = ['HP'];
	#PLUME_OF_DEATH = ['ATK'];
	#SANDS_OF_EON = [
        'HP%', 'ATK%', 'DEF%', 
        'Energy Recharge%', 'Elemental Mastery'
    ];
	#GOBLET_OF_EONOTHEM = [
        'HP%', 'ATK%', 'DEF%', 'Pyro DMG Bonus%', 
        'Electro DMG Bonus%', 'Cryo DMG Bonus%', 'Hydro DMG Bonus%', 
        'Dendro DMG Bonus%', 'Anemo DMG Bonus%', 'Geo DMG Bonus%',
		'Physical DMG Bonus%', 'Elemental Mastery'
    ];
	#CIRCLET_OF_LOGOS = [
        'HP%', 'ATK%', 'DEF%', 'Healing Bonus%', 
        'Elemental Mastery', 'CRIT Rate%', 'CRIT DMG%'
    ];

    // get methods

    get flower() {
        return this.#FLOWER;
    }

    get feather() {
        return this.#FEATHER;
    }

    get sands() {
        return this.#SANDS;
    }

    get goblet() {
        return this.#GOBLET;
    }

    get circlet() {
        return this.#CIRCLET;
    }

    getPiece() {
        return this.#PIECE;
    }

    getFlower() {
        return this.#FLOWER_OF_LIFE;
    }

    getFeather() {
        return this.#PLUME_OF_DEATH;
    }

    getSands() {
        return this.#SANDS_OF_EON;
    }

    getGoblet() {
        return this.#GOBLET_OF_EONOTHEM;
    }

    getCirclet() {
        return this.#CIRCLET_OF_LOGOS;
    }

    // class methods

    generateMainAttribute(artifactPiece) {
        // checks if the type is not string
        if (typeof artifactPiece !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        switch (artifactPiece) {
            case this.#FLOWER:
                return this.#listFlower[0].getAttribute();
            case this.#FEATHER:
                return this.#listFeather[0].getAttribute();
            case this.#SANDS:
                return this.#generatedAttribute(this.#listSands);
            case this.#GOBLET:
                return this.#generatedAttribute(this.#listGoblet);
            case this.#CIRCLET:
                return this.#generatedAttribute(this.#listCirclet);
        }

        // Throw an exception if none of the cases is met
		throw new Error("Invalid artifact piece: " + artifactPiece);
    }

    generateSubAttribute(mainAttribute) {
        // checks if the type is not string
        if (typeof mainAttribute !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        if (this.isNotSpecial(mainAttribute)) {
            switch (mainAttribute) {
	    		case Attribute.HP_FLAT:
	    			return this.#generatedAttribute(this.#listHpFlat);
	    		case Attribute.ATK_FLAT:
	    			return this.#generatedAttribute(this.#listAtkFlat);
	            case Attribute.HP_PER:
	                return this.#generatedAttribute(this.#listHpPer);
	            case Attribute.ATK_PER:
	                return this.#generatedAttribute(this.#listAtkPer);
	            case Attribute.DEF_PER:
	                return this.#generatedAttribute(this.#listDefPer);
	            case Attribute.ENERGY_RECHARGE:
	            	return this.#generatedAttribute(this.#listEnergyRecharge);
	            case Attribute.ELEMENTAL_MASTERY:
	                return this.#generatedAttribute(this.#listElementalMastery);
	            case Attribute.CRIT_RATE:
	            	return this.#generatedAttribute(this.#listCritRate);
	            case Attribute.CRIT_DMG:
	            	return this.#generatedAttribute(this.#listCritDmg);
	        }
        } else {
            return this.#generatedAttribute(this.#listSpecialAtt);
        }

        // Throw an exception if none of the cases or the isNotSpecial condition is met
	    throw new Error("Invalid attribute: " + mainAttribute);
    }

    noOfMaxUpgrade() {
		const noOfSubStatChance = this.generateNumber();
		const maxUpgrades = [4, 5];
		const probabilities = [50.00, 50.00];
		let cumulativeProbability = 0;
		
		for (let i = 0; i < maxUpgrades.length; i++) {
			cumulativeProbability += probabilities[i];
			if (noOfSubStatChance < cumulativeProbability) {
				return maxUpgrades[i];
			}
		}
		
		// If we reach here, something went wrong, just return the first element
		return maxUpgrades[0];
	}

    noOfUpgrade() {
        const upgradeChance = this.generateNumber();
        const upgradeTimes = [0, 1, 2, 3, 4, 5];
        const probabilities = [23.73, 39.55, 26.37, 8.79, 1.46, 0.10];
        let cumulativeProbability = 0;

        for (let i = 0; i < upgradeTimes.length; i++) {
            cumulativeProbability += probabilities[i];
            if (upgradeChance < cumulativeProbability) {
                return upgradeTimes[i];
            }
        }

        // If we reach here, something went wrong, just return the first element
		return upgradeTimes[0];
    }

    generateValue(attribute) {
        // checks if the type is not string
        if (typeof attribute !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        // "ATK%", "HP%", "DEF%", "ATK", "HP", "DEF", 
        // "Energy Recharge", "Elemental Mastery", "Crit Rate", "Crit Damage"


        /*
		 * Possibilities for initial values and upgrades of sub-stats:
		 * 
		 * 25% chance 100% value of the max stat
		 * 25% chance 90% value of the max stat
		 * 25% chance 80% value of the max stat
		 * 25% chance 70% value of the max stat
		 */

        for (const stats of Attribute.STATS) {
            if (stats.getAttribute() === attribute) {
                return this.#generatedValue(stats.getValues());
            }
        }

        // Throw an exception if we reach here meaning 
        // that the attribute is not in the array of stats
		throw new Error("Invalid attribute: " + attribute);
    }

    formatText(attribute, value1, value2) {
        // for 1 parameter
        if (arguments.length === 1) {
            // checks if the type is not string
            if (typeof attribute !== 'string') {
                throw new TypeError('Invalid Data Type: must be a string.');
            }

            // checks if the attribute is percentage
            if ((attribute.substring(attribute.length - 1)) === '%') {
                return attribute.substring(0, attribute.length - 1);
            }

            // return the flat attribute
            return attribute;
        }
        // for 2 parameters
        else if (arguments.length === 2) {
            // checks if the type is not string and number respectively
            if (typeof attribute !== 'string' && typeof value1 !== 'number') {
                throw new TypeError('Invalid Data Type: 1st Argument must be a string, and\n'
                                    + '2nd Argument must be a number.');
            }

            // checks if the attribute is percentage
            if ((attribute.substring(attribute.length - 1)) === '%') {
                const modifiedAtt = attribute.substring(0, attribute.length - 1);
                return '%s+%f%'.replace('%s', modifiedAtt)
                               .replace('%f', value1.toFixed(1));
            }

            // return the flat attribute
            return '%s+%d'.replace('%s', attribute)
                          .replace('%d', Math.round(value1));
        }
        // for 3 parameters
        else if (arguments.length === 3) {
            // checks if the type is not string, number, and number respectively
            if (typeof attribute !== 'string' && typeof value1 !== 'number' && typeof value2 !== 'number') {
                throw new TypeError('Invalid Data Type: 1st Argument must be a string,\n'
                                    + '2nd Argument must be a number, and\n'
                                    + '3rd Argument must be a number.');
            }

            // checks if the attribute is percentage
            if ((attribute.substring(attribute.length - 1)) === '%') {
                const modifiedAtt = attribute.substring(0, attribute.length - 1);
                return '%s    %f1% ---> %f2%'.replace('%s', modifiedAtt)
                                             .replace('%f1', value1.toFixed(1))
                                             .replace('%f2', value2.toFixed(1));
            }

            // return the flat attribute
            return '%s    %d1 ---> %d2'.replace('%s', attribute)
                                       .replace('%d1', Math.round(value1))
                                       .replace('%d2', Math.round(value2));
        }
    }

    formatValue(attribute, value) {
        // checks if the type is not string and number respectively
        if (typeof attribute !== 'string' && typeof value !== 'number') {
            throw new TypeError('Invalid Data Type: 1st Argument must be a string, and\n'
                                + '2nd Argument must be a number.');
        }

        // checks if the attribute is percentage
        if ((attribute.substring(attribute.length - 1)) === '%') {
            return `${value.toFixed(1)}%`.toString();
        }

        // return the flat attribute
        return Math.round(value).toString();
    }

    isUnique(att1, att2, att3, att4) {
        // checks if the type of all parameters are not string
        if (typeof att1 !== 'string' && typeof att2 !== 'string' && typeof att3 !== 'string' && typeof att4 !== 'string') {
            throw new TypeError('Invalid Data Type: All Arguments must be a string.');
        }

        const map = new Map();
        map.set(att1, 1);
        map.set(att2, 1);
        map.set(att3, 1);
        map.set(att4, 1);

        // If map size is equal to 4, all attributes are unique
        return map.size === 4;
    }

    // GENERATING RANDOM ATTRIBUTE

    #generatedAttribute(listAttribute) {
        // boolean variable
        let isStatClass = false;
        // checks if the element inside the array is Stat Class
        for (const stats of listAttribute) {
            if (stats.constructor.name === 'Stat') {
                isStatClass = true;
                break;
            }
        }

        // checks if the type is not Array
        if (!Array.isArray(listAttribute)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        } 
        // checks if the array is not Stat Class
        else if (!isStatClass) {
            throw new Error('Invalid Data Type: the element must be a Stat Class.');
        }

        const attributeChance = this.generateNumber();
        let cumulativeProbability = 0;

        for (let i = 0; i < listAttribute.length; i++) {
            cumulativeProbability += listAttribute[i].getProbability();
            if (attributeChance < cumulativeProbability) {
                return listAttribute[i].getAttribute();
            }
        }

        // If we reach here, something went wrong, just return the first element
		return listAttribute[i].getAttribute();
    }

    // GENERATING ATTRIBUTE VALUE

    #generatedValue(attributeValue) {
        // boolean variable
        let isNumber = false;
        // checks if the element inside the array is a number
        for (const values of attributeValue) {
            if (Number(values)) {
                isNumber = true;
                break;
            }
        }

        // checks if the type is not Array
        if (!Array.isArray(attributeValue)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        } 
        // checks if it is not a number
        else if (!isNumber) {
            throw new TypeError('Invalid Data Type: the element must be a number.');
        }

        const valueChance = this.generateNumber();
        const probabilities = [25.00, 25.00, 25.00, 25.00];
        let cumulativeProbability = 0;

        for (let i = 0; i < attributeValue.length; i++) {
            cumulativeProbability += probabilities[i];
            if (valueChance < cumulativeProbability) {
                return attributeValue[i];
            }
        }

        // If we reach here, something went wrong, so just return the last element
		return attributeValue[0];
    }

    // NUMBER GENERATOR
    // Generates number from 0.0... to 99.9...
    generateNumber() {
        return Math.random() * 100;
    }
}