// Class Artifact
class Artifact {
    static FLOWER = 'Flower of Life';
	static FEATHER = 'Plume of Death';
	static SANDS = 'Sands of Eon';
	static GOBLET = 'Goblet of Eonothem';
	static CIRCLET = 'Circlet of Logos';

    static MAIN_ATTRIBUTE_NAMES = [
        Attribute.HP_FLAT, 
        Attribute.ATK_FLAT, 
        Attribute.HP_PER, 
        Attribute.ATK_PER, 
        Attribute.DEF_PER, 
        Attribute.ENERGY_RECHARGE, 
        Attribute.ELEMENTAL_MASTERY,
        Attribute.CRIT_RATE, 
        Attribute.CRIT_DMG,
        Attribute.PYRO_DMG_BONUS, 
        Attribute.ELECTRO_DMG_BONUS, 
        Attribute.CRYO_DMG_BONUS,
        Attribute.HYDRO_DMG_BONUS, 
        Attribute.DENDRO_DMG_BONUS, 
        Attribute.ANEMO_DMG_BONUS,
        Attribute.GEO_DMG_BONUS, 
        Attribute.PHYSICAL_DMG_BONUS, 
        Attribute.HEALING_BONUS
    ];

	static #ARTIFACT_PIECES = [
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
        new AttributeProbabilityStat(Attribute.HP_PER, 26.68),
        new AttributeProbabilityStat(Attribute.ATK_PER, 26.66),
		new AttributeProbabilityStat(Attribute.DEF_PER, 26.66),
		new AttributeProbabilityStat(Attribute.ENERGY_RECHARGE, 10.00),
		new AttributeProbabilityStat(Attribute.ELEMENTAL_MASTERY, 10.00)
    ];
	#LIST_GOBLET_STATS = [
		new AttributeProbabilityStat(Attribute.HP_PER, 19.25),
		new AttributeProbabilityStat(Attribute.ATK_PER, 19.25),
		new AttributeProbabilityStat(Attribute.DEF_PER, 19.00),
		new AttributeProbabilityStat(Attribute.PYRO_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.ELECTRO_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.CRYO_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.HYDRO_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.DENDRO_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.ANEMO_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.GEO_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.PHYSICAL_DMG_BONUS, 5.00),
		new AttributeProbabilityStat(Attribute.ELEMENTAL_MASTERY, 2.50)
    ];
	#LIST_CIRCLET_STATS = [
		new AttributeProbabilityStat(Attribute.HP_PER, 22.00),
		new AttributeProbabilityStat(Attribute.ATK_PER, 22.00),
		new AttributeProbabilityStat(Attribute.DEF_PER, 22.00),
		new AttributeProbabilityStat(Attribute.CRIT_RATE, 10.00),
		new AttributeProbabilityStat(Attribute.CRIT_DMG, 10.00),
		new AttributeProbabilityStat(Attribute.HEALING_BONUS, 10.00),
		new AttributeProbabilityStat(Attribute.ELEMENTAL_MASTERY, 4.00)
    ];

    #LIST_WEIGHT_STATS = [
        new AttributeWeightStat(Attribute.HP_FLAT, 6),
        new AttributeWeightStat(Attribute.ATK_FLAT, 6),
        new AttributeWeightStat(Attribute.DEF_FLAT, 6),
        new AttributeWeightStat(Attribute.HP_PER, 4),
        new AttributeWeightStat(Attribute.ATK_PER, 4),
        new AttributeWeightStat(Attribute.DEF_PER, 4),
        new AttributeWeightStat(Attribute.ENERGY_RECHARGE, 4),
        new AttributeWeightStat(Attribute.ELEMENTAL_MASTERY, 4),
        new AttributeWeightStat(Attribute.CRIT_RATE, 3),
        new AttributeWeightStat(Attribute.CRIT_DMG, 3)
    ];

    #attribute = Attribute.getInstance();
    
    getPiece() {
        return Artifact.#ARTIFACT_PIECES;
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
        const randomIndex = Math.floor(this.generateNumber(Artifact.#ARTIFACT_PIECES.length));
        return Artifact.#ARTIFACT_PIECES[randomIndex];
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
                return this.#generateAttributeName(this.#LIST_SANDS_STATS);
            case Artifact.GOBLET:
                return this.#generateAttributeName(this.#LIST_GOBLET_STATS);
            case Artifact.CIRCLET:
                return this.#generateAttributeName(this.#LIST_CIRCLET_STATS);
            default:
                throw new Error(`Invalid artifact piece: ${artifactPiece}`);
        }
    }

    generateSubAttribute(...attributeNames) {
        const notSpecialAttributes = [];

        for (const attributeName of attributeNames) {
            if (typeof attributeName !== 'string') {
                throw new TypeError('Invalid Data Type: attributeName must be a string.');
            } else if (attributeName === null) {
                throw new Error('attributeName must not be null.');
            }

            if (this.#attribute.isNotSpecialAttribute(attributeName)) {
                notSpecialAttributes.push(attributeName);
            }
        }

        const listStats = this.#getStatProbabilityList(notSpecialAttributes);

        // for debugging purposes
        this.#checkIfHundredPercent(listStats);

        return this.#generateAttributeName(listStats);
    }

    generateSubStat(...attributeNames) {
        const notSpecialAttributes = [];

        for (const attributeName of attributeNames) {
            if (typeof attributeName !== 'string') {
                throw new TypeError('Invalid Data Type: attributeName must be a string.');
            } else if (attributeName === null) {
                throw new Error('attributeName must not be null.');
            }

            if (this.#attribute.isNotSpecialAttribute(attributeName)) {
                notSpecialAttributes.push(attributeName);
            }
        }

        const listStats = this.#getStatProbabilityList(notSpecialAttributes);

        // for debugging purposes
        this.#checkIfHundredPercent(listStats);

        const generatedAttributeName = this.#generateAttributeName(listStats);
        const generatedAttributeValue = this.generateSubAttributeValue(generatedAttributeName);

        return new ArtifactSubStat(generatedAttributeName, generatedAttributeValue);
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

    generateUpgradeTimes() {
        const upgradeChance = this.generateNumber(99.99);
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

    generateRandomSlot(definedAffixMode = false) {
        if (typeof definedAffixMode !== 'boolean') {
            return new Error('truthy or falsy is only allowed.');
        }
        
		const slotChance = this.generateNumber();

        const AFFIXED_SLOTS = [1, 2];
        const ALL_SLOTS = [1, 2, 3, 4];

		const slots = definedAffixMode ? AFFIXED_SLOTS : ALL_SLOTS;
		const probabilities = this.#generateEqualProbabilities(slots.length);
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

    #generateEqualProbabilities(length) {
        const probabilities = new Array(length);
        const value = 100.0 / length;

        probabilities.fill(value);

        return probabilities;
    }

    generateSubAttributeValue(attributeName) {
        // checks if the type is not string
        if (typeof attributeName !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        // "ATK%", "HP%", "DEF%", "ATK", "HP", "DEF", "Energy Recharge", "Elemental Mastery", "Crit Rate", "Crit Damage"

        /*
		 * Possibilities for initial values and upgrades of sub-stats:
		 * 
		 * 25% chance 100% value of the max stat
		 * 25% chance 90% value of the max stat
		 * 25% chance 80% value of the max stat
		 * 25% chance 70% value of the max stat
		 */

		return this.#generateAttributeValue(this.#attribute.getAttributeValues(attributeName));
    }

    #checkIfHundredPercent(listStats) {
        let totalProbability = 0;

        if (!Array.isArray(listStats)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        }

        for (const currentStat of listStats) {
            if (currentStat instanceof AttributeProbabilityStat) {
                totalProbability += currentStat.getAttributeProbability();
            } else {
                throw new TypeError('must be an instance of AttributeProbabilityStat class');
            }
        }

        console.log(`\n${listStats}\n\nTotal Probability is ${totalProbability}\n\n`);
    }

    #getStatProbabilityList(listAttributeNames) {
        if (!Array.isArray(listAttributeNames)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        }
        
        const selectedStats = [];

        for (const currentWeightStat of this.#LIST_WEIGHT_STATS) {
            if (!listAttributeNames.includes(currentWeightStat.getAttributeName())) {
                const attributeProbabilityStat = this.#calculateStatProbability(currentWeightStat, listAttributeNames);
                selectedStats.push(attributeProbabilityStat);
            }
        }

        return selectedStats;
    }

    #calculateStatProbability(targetWeightStat, listAttributeNames) {
        if (targetWeightStat === null || listAttributeNames === null) {
            throw new Error('Requires non-null object');
        }

        if (!(targetWeightStat instanceof AttributeWeightStat)) {
            throw new TypeError('Invalid Data Type: must be an instance of WeightedStat.');
        }

        if (!Array.isArray(listAttributeNames)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        }

        let totalWeight = 0;

        if (!Attribute.ATTRIBUTES_NAMES.includes(targetWeightStat.getAttributeName())) {
            throw new Error(`Invalid attribute: ${targetWeightStat.getAttributeName()}`);
        }

        // Calculate the total weight of available sub-stats (excluding the ones already existing)
        for (const currentWeightStat of this.#LIST_WEIGHT_STATS) {
            if (!listAttributeNames.includes(currentWeightStat.getAttributeName())) {
                totalWeight += currentWeightStat.getAttributeWeight();
            }
        }

        const probability = targetWeightStat.getAttributeWeight() / totalWeight * 100;

        return new AttributeProbabilityStat(targetWeightStat.getAttributeName(), probability);
    }

    isAttributeNamePercentage(attributeName) {
        if (typeof attributeName !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        return attributeName.endsWith('%');
    }

    isArtifactPiece(artifactPieceName) {
        if (artifactPieceName === null) {
            return artifactPieceName;
        }

        if (typeof artifactPieceName !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        let isArtifactPiece = false;

        for (const currArtifactPiece of Artifact.#ARTIFACT_PIECES) {
            if (currArtifactPiece === artifactPieceName) {
                isArtifactPiece = true;
                break;
            }
        }

        if (isArtifactPiece) {
            return artifactPieceName;
        } else {
            throw new Error("Invalid artifactPieceName: " + artifactPieceName);
        }
    }

    isMainAttribute(mainAttributeName) {
        if (mainAttributeName === null) {
            return mainAttributeName;
        }

        if (typeof mainAttributeName !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        let isMainAttribute = false;

        for (const currMainAttribute of Artifact.MAIN_ATTRIBUTE_NAMES) {
            if (currMainAttribute === mainAttributeName) {
                isMainAttribute = true;
                break;
            }
        }

        if (isMainAttribute) {
            return mainAttributeName;
        } else {
            throw new Error("Invalid mainAttributeName: " + mainAttributeName);
        }
    }

    isSubAttribute(subAttributeName) {
        if (subAttributeName === null) {
            return subAttributeName;
        }

        if (typeof subAttributeName !== 'string') {
            throw new TypeError('Invalid Data Type: must be a string.');
        }

        let isSubAttribute = false;

        for (const currSubAttribute of Attribute.ATTRIBUTES_NAMES) {
            if (currSubAttribute === subAttributeName) {
                isSubAttribute = true;
                break;
            }
        }

        if (isSubAttribute) {
            return subAttributeName;
        } else {
            const template = `
                Invalid subAttributeName: ${subAttributeName}. If this is valid, It's case sensitive and must be exact name to the game.
                Valid Sub Attribute Name: ${Attribute.ATTRIBUTES_NAMES.map(attributeName => attributeName).join(', ')}
            `;

            throw new Error(template);
        }
    }

    isSubAttributeValue(subAttributeName, subAttributeValue) {
        if (subAttributeName === null || subAttributeValue === 0) {
            return subAttributeValue;
        }

        if (typeof subAttributeName !== 'string' || typeof subAttributeValue !== 'number') {
            throw new TypeError('Invalid Data Type: subAttributeName must be a string and subAttributeValue must be a number');
        }

        let isSubAttributeValue = false;

        const attributeValues = this.#attribute.getAttributeValues(subAttributeName);

        for (const attributeValue of attributeValues) {
            if (attributeValue === subAttributeValue) {
                isSubAttributeValue = true;
                break;
            }
        }

        if (isSubAttributeValue) {
            return subAttributeValue;
        } else {
            const template = `
                Invalid subAttributeValue: ${subAttributeValue}, it's not a value from ${subAttributeName}.
                Valid values of ${subAttributeName}: ${attributeValues.map(attributeValue => attributeValue).join(', ')}
            `;

            throw new Error(template);
        }
    }

    /**
     * Formats Sub-Stat by Mode
     * @param {number} mode 0 = new, 1 = displaying, 2 = upgrade, 3 = skip upgrade
     * @param {ArtifactSubStat} artifactSubStat ArtifactSubStat class
     */
    formatSubStatByMode(mode, artifactSubStat) {
        if (typeof mode !== 'number') {
            throw new TypeError('Invalid Data Type: mode must be a number.');
        }

        if (!(artifactSubStat instanceof ArtifactSubStat)) {
            throw new Error('artifactSubStat must be an instance of ArtifactSubStat Class');
        }

        switch (mode) {
            case 0:
                return this.formatNewSubStat(artifactSubStat.getAttributeName(), artifactSubStat.getAttributeValue());
            case 1:
                return this.formatSubStat(artifactSubStat.getAttributeName(), artifactSubStat.getAttributeValue());
            case 2:
                return this.formatSubStat(artifactSubStat.getAttributeName(), artifactSubStat.getPrevAttributeValue(), artifactSubStat.getAttributeValue());
            case 3:
                return this.formatSubStat(artifactSubStat.getAttributeName(), artifactSubStat.getInitialAttributeValue(), artifactSubStat.getAttributeValue());
            default:
                throw new Error("Invalid mode: " + mode);
        }
    }

    formatSubStat(attributeName, attributeValue1, attributeValue2) {
        let formattedSubStat = null;

        // for 1 parameter
        if (arguments.length === 1) {
            // checks if the type is not string
            if (typeof attributeName !== 'string') {
                throw new TypeError('Invalid Data Type: must be a string.');
            }

            // checks if the attribute is percentage
            if (this.isAttributeNamePercentage(attributeName)) {
                formattedSubStat = attributeName.substring(0, attributeName.length - 1);
            } else {
                // return the flat attribute
                formattedSubStat = attributeName;
            }
        }
        // for 2 parameters
        else if (arguments.length === 2) {
            // checks if the type is not string and number respectively
            if (typeof attributeName !== 'string' && typeof attributeValue1 !== 'number') {
                throw new TypeError('Invalid Data Type: attributeName must be a string,' + 
                                    ' and attributeValue1 must be a number.');
            }

            // checks if the attribute is percentage
            if (this.isAttributeNamePercentage(attributeName)) {
                formattedSubStat = `${this.formatSubStat(attributeName)}+${attributeValue1.toFixed(1)}%`;
            } else {
                // return the flat attribute
                formattedSubStat = `${attributeName}+${Math.round(attributeValue1)}`;
            }
        }
        // for 3 parameters
        else if (arguments.length === 3) {
            // checks if the type is not string, number, and number respectively
            if (typeof attributeName !== 'string' && typeof attributeValue1 !== 'number' && typeof attributeValue2 !== 'number') {
                throw new TypeError('Invalid Data Type: attributeName must be a string,' + 
                                    ' attributeValue1 must be a number, and' + 
                                    ' attributeValue2 must be a number.');
            }

            // checks if the attribute is percentage
            if (this.isAttributeNamePercentage(attributeName)) {
                formattedSubStat = `${this.formatSubStat(attributeName)} ${attributeValue1.toFixed(1)}% --> ${attributeValue2.toFixed(1)}%`;
            } else {
                // return the flat attribute
                formattedSubStat = `${attributeName} ${Math.round(attributeValue1)} ---> ${Math.round(attributeValue2)}`;
            }
        }

        return formattedSubStat;
    }

    formatNewSubStat(attributeName, attributeValue) {
        if (typeof attributeName !== 'string' && typeof attributeValue !== 'number') {
            throw new TypeError('Invalid Data Type: attributeName must be a string and attributeValue must be a number');
        }

        if (this.isAttributeNamePercentage(attributeName)) {
            return `${this.formatSubStat(attributeName)} ----- ${attributeValue.toFixed(1)}%`;
        }

        return `${attributeName} ----- ${Math.round(attributeValue)}`;
    }

    formatSubAttributeValue(attributeName, attributeValue) {
        // checks if the type is not string and number respectively
        if (typeof attributeName !== 'string' && typeof attributeValue !== 'number') {
            throw new TypeError('Invalid Data Type: attributeName must be a string and attributeValue must be a number.');
        }

        // checks if the attribute is percentage
        if (this.isAttributeNamePercentage(attributeName)) {
            return `${value.toFixed(1)}%`;
        }

        // return the flat attribute
        return Math.round(value).toString();
    }

    // GENERATING RANDOM ATTRIBUTE

    #generateAttributeName(listAttribute) {
        // checks if the type is not Array
        if (!Array.isArray(listAttribute)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        }

        // boolean variable
        let isNotProbabilityStatClass = false;
        // checks if the element inside the array is ProbabilityStat Class
        isNotProbabilityStatClass = listAttribute.every(attributeName => !(attributeName instanceof AttributeProbabilityStat));

        // checks if the array is not ProbabilityStat Class
        if (isNotProbabilityStatClass) {
            throw new Error('Invalid Data Type: the element must be a ProbabilityStat Class.');
        }

        const attributeChance = this.generateNumber();
        let cumulativeProbability = 0;

        for (let i = 0; i < listAttribute.length; i++) {
            cumulativeProbability += listAttribute[i].getAttributeProbability();

            if (attributeChance <= cumulativeProbability) {
                return listAttribute[i].getAttributeName();
            }
        }

        // If we reach here, something went wrong, just return the first element
		return listAttribute[i].getAttributeName();
    }

    // GENERATING ATTRIBUTE VALUE

    #generateAttributeValue(attributeValues) {
        // checks if the type is not Array
        if (!Array.isArray(attributeValues)) {
            throw new TypeError('Invalid Data Type: must be an array.');
        } 

        // boolean variable
        let isNotNumber = false;
        // checks if the element inside the array is a number
        isNotNumber = attributeValues.every(attributeValue => typeof attributeValue !== 'number');

        // checks if it is not a number
        if (isNotNumber) {
            throw new TypeError('Invalid Data Type: the element must be a number.');
        }

        const valueChance = this.generateNumber();
        const probabilities = [25.00, 25.00, 25.00, 25.00];
        let cumulativeProbability = 0;

        for (let i = 0; i < attributeValues.length; i++) {
            cumulativeProbability += probabilities[i];

            if (valueChance <= cumulativeProbability) {
                return attributeValues[i];
            }
        }

        // If we reach here, something went wrong, so just return the last element
		return attributeValues[0];
    }

    // NUMBER GENERATOR
    
    generateNumber(maxNumber) {
        let min = 0;
        let max = 0;
        let randomNumber = 0;

        if (arguments.length === 0) {
            max = 100;
        } else if (arguments.length === 1) {
            if (typeof maxNumber !== 'number') {
                throw new TypeError('Invalid Data Type: must be a number.');
            }

            if (maxNumber <= 0) {
                throw new Error("Number cannot go below starting at 0");
            }

            max = maxNumber;
        }

        randomNumber = Number(Math.random() * (max - min) + min).toFixed(2);

        return randomNumber;
    }
}