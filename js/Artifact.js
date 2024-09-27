// Class Artifact
class Artifact extends Attribute {
    static FLOWER = 'Flower of Life';
	static FEATHER = 'Plume of Death';
	static SANDS = 'Sands of Eon';
	static GOBLET = 'Goblet of Eonothem';
	static CIRCLET = 'Circlet of Logos';

	static #PIECE = [
        this.FLOWER,
        this.FEATHER,
        this.SANDS,
        this.GOBLET,
        this.CIRCLET
    ];
	static #FLOWER_OF_LIFE = [ Attribute.HP_FLAT ];
	static #PLUME_OF_DEATH = [ Attribute.ATK_FLAT ];
	static #SANDS_OF_EON = [
        Attribute.HP_PER,
        Attribute.ATK_PER,
        Attribute.DEF_PER,
        Attribute.ENERGY_RECHARGE,
        Attribute.ELEMENTAL_MASTERY
    ];
	static #GOBLET_OF_EONOTHEM = [
        Attribute.HP_PER,
        Attribute.ATK_PER,
        Attribute.DEF_PER,
        Attribute.PYRO_DMG_BONUS,
        Attribute.ELECTRO_DMG_BONUS,
        Attribute.CRYO_DMG_BONUS,
        Attribute.HYDRO_DMG_BONUS,
        Attribute.DENDRO_DMG_BONUS,
        Attribute.ANEMO_DMG_BONUS,
        Attribute.GEO_DMG_BONUS,
        Attribute.PHYSICAL_DMG_BONUS,
        Attribute.ELEMENTAL_MASTERY
    ];
	static #CIRCLET_OF_LOGOS = [
        Attribute.HP_PER,
        Attribute.ATK_PER,
        Attribute.DEF_PER,
        Attribute.HEALING_BONUS,
        Attribute.ELEMENTAL_MASTERY,
        Attribute.CRIT_RATE,
        Attribute.CRIT_DMG
    ];

    #FLOWER_STAT = Attribute.HP_FLAT;
	#FEATHER_STAT = Attribute.ATK_FLAT;

	#LIST_SANDS_STATS = [
        new ProbabilityStat(Attribute.HP_PER, 26.68),
        new ProbabilityStat(Attribute.ATK_PER, 26.66),
		new ProbabilityStat(Attribute.DEF_PER, 26.66),
		new ProbabilityStat(Attribute.ENERGY_RECHARGE, 10.00),
		new ProbabilityStat(Attribute.ELEMENTAL_MASTERY, 10.00)
    ];
	#LIST_GOBLET_STATS = [
		new ProbabilityStat(Attribute.HP_PER, 19.25),
		new ProbabilityStat(Attribute.ATK_PER, 19.25),
		new ProbabilityStat(Attribute.DEF_PER, 19.00),
		new ProbabilityStat(Attribute.PYRO_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.ELECTRO_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.CRYO_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.HYDRO_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.DENDRO_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.ANEMO_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.GEO_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.PHYSICAL_DMG_BONUS, 5.00),
		new ProbabilityStat(Attribute.ELEMENTAL_MASTERY, 2.50)
    ];
	#LIST_CIRCLET_STATS = [
		new ProbabilityStat(Attribute.HP_PER, 22.00),
		new ProbabilityStat(Attribute.ATK_PER, 22.00),
		new ProbabilityStat(Attribute.DEF_PER, 22.00),
		new ProbabilityStat(Attribute.CRIT_RATE, 10.00),
		new ProbabilityStat(Attribute.CRIT_DMG, 10.00),
		new ProbabilityStat(Attribute.HEALING_BONUS, 10.00),
		new ProbabilityStat(Attribute.ELEMENTAL_MASTERY, 4.00)
    ];

    #LIST_STATS_WEIGHTS = [
        new WeightedStat(Attribute.HP_FLAT, 6),
        new WeightedStat(Attribute.ATK_FLAT, 6),
        new WeightedStat(Attribute.DEF_FLAT, 6),
        new WeightedStat(Attribute.HP_PER, 4),
        new WeightedStat(Attribute.ATK_PER, 4),
        new WeightedStat(Attribute.DEF_PER, 4),
        new WeightedStat(Attribute.ENERGY_RECHARGE, 4),
        new WeightedStat(Attribute.ELEMENTAL_MASTERY, 4),
        new WeightedStat(Attribute.CRIT_RATE, 3),
        new WeightedStat(Attribute.CRIT_DMG, 3)
    ];
    
    getPiece() {
        return Artifact.#PIECE;
    }
    
    getFlower() {
        return Artifact.#FLOWER_OF_LIFE;
    }

    getFeather() {
        return Artifact.#PLUME_OF_DEATH;
    }
    
    getSands() {
        return Artifact.#SANDS_OF_EON;
    }
    
    getGoblet() {
        return Artifact.#GOBLET_OF_EONOTHEM;
    }
    
    getCirclet() {
        return Artifact.#CIRCLET_OF_LOGOS;
    }
    
    generateRandomPiece() {
        const randomIndex = Math.floor(Math.random() * Artifact.#PIECE.length);
        return Artifact.#PIECE[randomIndex];
    }

    generateMainAttribute(artifactPiece) {
        // checks if the type is not string
        if (typeof artifactPiece !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        switch (artifactPiece) {
            case Artifact.FLOWER:
                return this.#FLOWER_STAT;
            case Artifact.FEATHER:
                return this.#FEATHER_STAT;
            case Artifact.SANDS:
                return this.#generatedAttribute(this.#LIST_SANDS_STATS);
            case Artifact.GOBLET:
                return this.#generatedAttribute(this.#LIST_GOBLET_STATS);
            case Artifact.CIRCLET:
                return this.#generatedAttribute(this.#LIST_CIRCLET_STATS);
        }

        // Throw an exception if none of the cases is met
		throw new Error(`Invalid artifact piece: ${artifactPiece}`);
    }

    generateSubAttribute(...attributes) {
        const notSpecialAttributes = [];

        for (const attribute of attributes) {
            if (attribute === null) {
                throw new Error('Attribute must not be null.');
            }

            if (this.isNotSpecialAttribute(attribute)) {
                notSpecialAttributes.push(attribute);
            }
        }

        const statsList = this.#getStatProbabilityList(notSpecialAttributes);

        // for debugging purposes
        this.#checkIfHundredPercent(statsList);

        return this.#generatedAttribute(statsList);
    }

    generateMaxUpgrade() {
		const noOfSubStatChance = this.generateNumber();
		const maxUpgrades = [ 4, 5 ];
		
        if (noOfSubStatChance <= 66.00) {
            return maxUpgrades[0];
        } else {
            return maxUpgrades[1];
        }
	}

    generateNoOfUpgrade() {
        const upgradeChance = Number((this.generateNumber() - 0.01).toFixed(2));
        const upgradeTimes = [ 0, 1, 2, 3, 4, 5 ];
        const probabilities = [ 23.73, 39.55, 26.37, 8.79, 1.46, 0.09 ];
        let cumulativeProbability = 0;

        for (let i = 0; i < upgradeTimes.length; i++) {
            cumulativeProbability += probabilities[i];

            if (upgradeChance <= cumulativeProbability) {
                return upgradeTimes[i];
            }
        }

        // If we reach here, something went wrong, just return the first element
		return upgradeTimes[0];
    }

    generateRandomSlot() {
		const slotChance = this.generateNumber();
		const slots = [1, 2, 3, 4];
		const probabilities = [25.00, 25.00, 25.00, 25.00];
		let cumulativeProbability = 0;

		for (let i = 0; i < slots.length; i++) {
			cumulativeProbability += probabilities[i];
			if (slotChance <= cumulativeProbability) {
				return slots[i];
			}
		}

		// If we reach here, something went wrong, so just return the first element
		return slots[0];
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

        for (const currentStat of Attribute.VALUE_STATS) {
            if (currentStat.getAttribute() === attribute) {
                return this.#generatedValue(currentStat.getValues());
            }
        }

        // Throw an exception if we reach here meaning 
        // that the attribute is not in the array of stats
		throw new Error(`Invalid attribute: ${attribute}`);
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

    #checkIfHundredPercent(listStats) {
        let totalProbability = 0;

        if (!Array.isArray(listStats)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        }

        for (const currentStat of listStats) {
            totalProbability += currentStat.getProbability();
        }

        console.log(`\nFrom ${listStats}\n\nTotal Probability is ${totalProbability}\n\n`);
    }

    #getStatProbabilityList(attributes) {
        if (!Array.isArray(attributes)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        }
        
        const selectedStats = [];

        for (const currentStat of this.#LIST_STATS_WEIGHTS) {
            if (!attributes.includes(currentStat.getAttribute())) {
                const statProbability = this.#calculateStatProbability(currentStat, attributes);
                selectedStats.push(statProbability);
            }
        }

        return selectedStats;
    }

    #calculateStatProbability(targetWeightedStat, existingStats) {
        if (!(targetWeightedStat instanceof WeightedStat)) {
            throw new TypeError('Invalid Data Type: must be an instance of WeightedStat.');
        }

        if (!Array.isArray(existingStats)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        }

        if (targetWeightedStat === null || existingStats === null) {
            throw new Error('Requires non-null object');
        }

        let totalWeight = 0;

        if (!Attribute.ATTRIBUTES.includes(targetWeightedStat.getAttribute())) {
            throw new Error(`Invalid attribute: ${targetWeightedStat.getAttribute()}`);
        }

        // Calculate the total weight of available sub-stats (excluding the ones already existing)
        for (const currentStat of this.#LIST_STATS_WEIGHTS) {
            if (!existingStats.includes(currentStat.getAttribute())) {
                totalWeight += currentStat.getWeight();
            }
        }

        const probability = targetWeightedStat.getWeight() / totalWeight * 100;

        return new ProbabilityStat(targetWeightedStat.getAttribute(), probability);
    }

    // GENERATING RANDOM ATTRIBUTE

    #generatedAttribute(listAttribute) {
        // boolean variable
        let isNotProbabilityStatClass = false;
        // checks if the element inside the array is ProbabilityStat Class
        for (const stats of listAttribute) {
            if (!(stats instanceof ProbabilityStat)) {
                isNotProbabilityStatClass = true;
                break;
            }
        }

        // checks if the type is not Array
        if (!Array.isArray(listAttribute)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        } 
        // checks if the array is not ProbabilityStat Class
        else if (isNotProbabilityStatClass) {
            throw new Error('Invalid Data Type: the element must be a ProbabilityStat Class.');
        }

        const attributeChance = this.generateNumber();
        let cumulativeProbability = 0;

        for (let i = 0; i < listAttribute.length; i++) {
            cumulativeProbability += listAttribute[i].getProbability();

            if (attributeChance <= cumulativeProbability) {
                return listAttribute[i].getAttribute();
            }
        }

        // If we reach here, something went wrong, just return the first element
		return listAttribute[i].getAttribute();
    }

    // GENERATING ATTRIBUTE VALUE

    #generatedValue(attributeValue) {
        // boolean variable
        let isNotNumber = false;
        // checks if the element inside the array is a number
        for (const values of attributeValue) {
            if (typeof values !== 'number') {
                isNotNumber = true;
                break;
            }
        }

        // checks if the type is not Array
        if (!Array.isArray(attributeValue)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        } 
        // checks if it is not a number
        else if (isNotNumber) {
            throw new TypeError('Invalid Data Type: the element must be a number.');
        }

        const valueChance = this.generateNumber();
        const probabilities = [25.00, 25.00, 25.00, 25.00];
        let cumulativeProbability = 0;

        for (let i = 0; i < attributeValue.length; i++) {
            cumulativeProbability += probabilities[i];

            if (valueChance <= cumulativeProbability) {
                return attributeValue[i];
            }
        }

        // If we reach here, something went wrong, so just return the last element
		return attributeValue[0];
    }

    // NUMBER GENERATOR
    
    // Generates number from 0.0 to 100.00
    generateNumber() {
        const min = 0;
        const max = 100;
        return Number((Math.random() * (max - min) + min).toFixed(2));
    }
}