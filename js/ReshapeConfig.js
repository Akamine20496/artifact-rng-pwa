class ReshapeConfig {
    #subStatUpgradeCounts = {};
    #guaranteedRollLimit = 0;

	constructor(subStatUpgradeCounts = {}, guaranteedRollLimit = 0) {
        if (typeof subStatUpgradeCounts === 'object' && typeof guaranteedRollLimit === 'number') {
            this.#subStatUpgradeCounts = subStatUpgradeCounts;
            this.#guaranteedRollLimit = guaranteedRollLimit;
        }
	}

	getSubStatUpgradeCounts() {
		return this.#subStatUpgradeCounts;
	}

	getGuaranteedRollLimit() {
		return this.#guaranteedRollLimit;
	}
}