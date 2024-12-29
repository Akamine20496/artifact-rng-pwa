// ArtifactStat Class
class ArtifactStat {
    #artifact = new Artifact();

    #artifactSubStats = [];

    #artifactPiece = null;
    #mainAttribute = null;
    #isMax = false;
    #slotNumber = 0;
    #upgradeCounter = 0;
    #totalUpgrade = 0;
    #maxUpgrade = 0;

    #currentNewSubStat = null;
    #currentUpgradedSubStat = null;

    constructor(artifactPiece, mainAttribute, ...artifactSubStats) {
        if (arguments.length === 0) {
            this.#artifactPiece = this.#artifact.generateRandomPiece();
            this.#mainAttribute = null;
            this.#initializeSubStats();
        } else if (arguments.length === 1) {
            if (typeof artifactPiece !== 'string') {
                throw new TypeError('Invalid Data Type: must be a string.');
            }

            this.#artifactPiece = this.#artifact.isArtifactPiece(artifactPiece);
            this.#mainAttribute = null;
            this.#initializeSubStats();
        } else if (arguments.length === 2) {
            if (typeof artifactPiece !== 'string' && typeof mainAttribute !== 'string') {
                throw new TypeError('Invalid Data Type: artifactPiece must be a string and mainAttribute must be a string.');
            }

            this.#artifactPiece = this.#artifact.isArtifactPiece(artifactPiece);
            this.#mainAttribute = this.#artifact.isMainAttribute(mainAttribute);
            this.#initializeSubStats();
        } else if (arguments.length === 3) {
            if (typeof artifactPiece !== 'string' && typeof mainAttribute !== 'string') {
                throw new TypeError('Invalid Data Type: artifactPiece must be a string and mainAttribute must be a string.');
            }

            if (!Array.isArray(artifactSubStats)) {
                throw new TypeError('Invalid Data Type: artifactSubStats must be a array.');
            }

            for (const artifactSubStat of artifactSubStats) {
                if (!(artifactSubStat instanceof ArtifactSubStat)) {
                    throw new TypeError('must be an instance of ArtifactSubStat class.');
                }
            }

            this.#artifactPiece = this.#artifact.isArtifactPiece(artifactPiece);
            this.#mainAttribute = this.#artifact.isMainAttribute(mainAttribute);
            this.#initializeSubStats(artifactSubStats);
        }
    }

    setArtifactPiece(artifactPiece) {
		this.#artifactPiece = this.#artifact.isArtifactPiece(artifactPiece);
	}

	setMainAttribute(mainAttribute) {
		this.#mainAttribute = this.#artifact.isMainAttribute(mainAttribute);
	}

	setMaxUpgrade(maxUpgrade) {
		if (maxUpgrade === 4 || maxUpgrade === 5) {
            this.#maxUpgrade = maxUpgrade;
		} else {
			throw new Error("Max Upgrade is either 4 or 5");
        }
	}

	getArtifactPiece() {
		return this.#artifactPiece;
	}
	
	getMainAttribute() {
		return this.#mainAttribute;
	}

	getMaxUpgrade() {
		return this.#maxUpgrade;
	}
	
	getCurrentNewSubStat() {
		return this.#currentNewSubStat;
	}
	
	getCurrentUpgradedSubStat() {
		return this.#currentUpgradedSubStat;
	}
	
	getArraySubStatsLength() {
		return this.#artifactSubStats.length;
	}

    /**
	 * Generates random Main Attribute, Max Upgrade, and Sub-Stats.
	 * 
	 * Use this when there is no sub-stats. When sub-stat is already defined but used this function, 
	 * this will replace the already defined ones.
	 */
	generateStat() {
		if (this.#mainAttribute !== null && this.#maxUpgrade !== 0) {
			return;
		}
		
		this.#mainAttribute = this.#artifact.generateMainAttribute(this.#artifactPiece);
		this.#maxUpgrade = this.#artifact.generateMaxUpgrade();

		this.#artifactSubStats[0] = this.#artifact.generateSubStat(this.#mainAttribute);
		this.#artifactSubStats[1] = this.#artifact.generateSubStat(this.#mainAttribute, this.#artifactSubStats[0].getAttributeName());
		this.#artifactSubStats[2] = 
            this.#artifact.generateSubStat(this.#mainAttribute, this.#artifactSubStats[0].getAttributeName(), this.#artifactSubStats[1].getAttributeName());
		this.#artifactSubStats[3] = this.#maxUpgrade == 4 ? new ArtifactSubStat(null, 0) : 
            this.#artifact.generateSubStat(this.#mainAttribute, 
                                            this.#artifactSubStats[0].getAttributeName(), 
                                            this.#artifactSubStats[1].getAttributeName(), 
                                            this.#artifactSubStats[2].getAttributeName());
	}
	
	#generateFourthSubStat() {
		if (this.#mainAttribute === null && this.#maxUpgrade === 0) {
			throw new Error("mainAttribute is null and maxUpgrade is 0");
		}
		
		this.#artifactSubStats[3] = this.#artifact.generateSubStat(this.#mainAttribute, 
                                                                    this.#artifactSubStats[0].getAttributeName(), 
                                                                    this.#artifactSubStats[1].getAttributeName(), 
                                                                    this.#artifactSubStats[2].getAttributeName());
		
        this.#currentNewSubStat = this.#artifact.formatSubStatByMode(0, this.#artifactSubStats[3]);
	}
	
	/**
	 * Generates random Max Upgrade, Sub-Stat 1 and Sub-Stat 2 values (If Sub Attribute Name is present), and Sub-Stat 3 and Sub-Stat 4.
	 * 
	 * Use this when Sub-Stat 1 and Sub-Stat 2's attribute name is defined but no values (or 0, 0.0, 0.00),
	 * but Sub-Stat 3, and Sub-Stat 4 has no value yet like ArtifactSubStat(null, 0).
	 */
	generateDefinedAffixModeSubStats() {
		if (this.#mainAttribute === null) {
			throw new Error("mainAttribute is null");
		}
		
		this.#maxUpgrade = this.#artifact.generateMaxUpgrade();

		if (this.#artifactSubStats[0].getIsInitialValueEmpty() && this.#artifactSubStats[1].getIsInitialValueEmpty()) {
			this.#artifactSubStats[0].setInitialAttributeValue(this.#artifact.generateSubAttributeValue(this.#artifactSubStats[0].getAttributeName()));
			this.#artifactSubStats[1].setInitialAttributeValue(this.#artifact.generateSubAttributeValue(this.#artifactSubStats[1].getAttributeName()));
		}

		this.#artifactSubStats[2] = this.#artifact.generateSubStat(this.#mainAttribute, this.#artifactSubStats[0].getAttributeName(), this.#artifactSubStats[1].getAttributeName());
		this.#artifactSubStats[3] = this.#maxUpgrade == 4 ? new ArtifactSubStat(null, 0) : 
            this.#artifact.generateSubStat(this.#mainAttribute, 
                                            this.#artifactSubStats[0].getAttributeName(), 
                                            this.#artifactSubStats[1].getAttributeName(), 
                                            this.#artifactSubStats[2].getAttributeName());
	}
	
	rerollStat() {
		this.#removeSubStatUpgrades();
		
		this.#slotNumber = 0;
		this.#upgradeCounter = 0;
		this.#totalUpgrade = 0;
		this.#isMax = false;
	}
	
	resetStat() {
		this.#resetSubStats();
		
		this.#mainAttribute = null;
		
		this.#slotNumber = 0;
		this.#upgradeCounter = 0;
		this.#maxUpgrade = 0;
		this.#totalUpgrade = 0;
		this.#isMax = false;
	}
	
	upgradeSubStatValue() {
		if (this.#mainAttribute === null) {
			throw new Error("mainAttribute is null");
		}
		
		if (this.#artifactSubStats[3].getAttributeName() === null) {
			this.#generateFourthSubStat();
		} else {
			if (!this.#isMax) { 													    // if the total upgrades of 5 or 4 is reached
				if (this.#upgradeCounter === 0) { 									    // if the counter is 0, it will loop
					while (this.#upgradeCounter === 0) { 							    // until the upgrade counter is not 0
						this.#slotNumber = this.#artifact.generateRandomSlot();
						this.#upgradeCounter = this.#artifact.generateUpgradeTimes();
						this.#totalUpgrade += this.#upgradeCounter;
					}

					if (this.#totalUpgrade === this.#maxUpgrade) { 						// if the total upgrade reaches 5 or 4, set the isMax to true
						this.#isMax = true; 										    // and upgrade the value
						this.#selectSlot(this.#slotNumber);
					} else if (this.#totalUpgrade > this.#maxUpgrade) { 				// if the total upgrade exceeds 5 or 4, deduct it from counter
						this.#totalUpgrade -= this.#upgradeCounter; 					// and set the counter to 0, then retry the process
						this.#upgradeCounter = 0;
						this.upgradeSubStatValue();
					} else {
						this.#selectSlot(this.#slotNumber); 							// if the total upgrade is not 5
					}
				} else {
					this.#selectSlot(this.#slotNumber); 								// if the counter is not 0
				}
			} else {
				this.#selectSlot(this.#slotNumber); 									// if the isMax is true
			}
		}
	}
	
	#selectSlot(slotNumber) {
		if (this.#mainAttribute == null) {
			throw new Error("mainAttribute is null");
		}
		
		switch (slotNumber) {
			case 1:
				this.#artifactSubStats[0].addAttributeValue(this.#artifact.generateSubAttributeValue(this.#artifactSubStats[0].getAttributeName()));
				this.#currentUpgradedSubStat = this.#artifact.formatSubStatByMode(2, this.#artifactSubStats[0]);
                break;
			case 2:
				this.#artifactSubStats[1].addAttributeValue(this.#artifact.generateSubAttributeValue(this.#artifactSubStats[1].getAttributeName()));
				this.#currentUpgradedSubStat = this.#artifact.formatSubStatByMode(2, this.#artifactSubStats[1]);
                break;
			case 3:
				this.#artifactSubStats[2].addAttributeValue(this.#artifact.generateSubAttributeValue(this.#artifactSubStats[2].getAttributeName()));
				this.#currentUpgradedSubStat = this.#artifact.formatSubStatByMode(2, this.#artifactSubStats[2]);
                break;
			case 4:
				this.#artifactSubStats[3].addAttributeValue(this.#artifact.generateSubAttributeValue(this.#artifactSubStats[3].getAttributeName()));
				this.#currentUpgradedSubStat = this.#artifact.formatSubStatByMode(2, this.#artifactSubStats[3]);
                break;
		}

		this.#upgradeCounter--;
	}
	
	/**
	 * Skips upgrading by one and directly upgrades to what ArtifactStat.maxUpgrade is set.
     * 
	 * Must generate stat first from ArtifactStat.generateStat() or ArtifactStat.generateDefinedAffixModeSubStats().
	 * @returns {...string} array of the final sub-stats
	 */
	skipUpgradeSubStats() {
		if (this.#mainAttribute == null) {
			throw new Error("mainAttribute is null");
		}
		
		let s1 = null, 
            s2 = null, 
            s3 = null, 
            s4 = null;

		for (let counter = 1; counter <= 5; counter++) {
			this.upgradeSubStatValue();
		}

		s1 = this.#artifact.formatSubStatByMode(3, this.#artifactSubStats[0]);
		s2 = this.#artifact.formatSubStatByMode(3, this.#artifactSubStats[1]);
		s3 = this.#artifact.formatSubStatByMode(3, this.#artifactSubStats[2]);
		s4 = this.#maxUpgrade == 4 ? this.#artifact.formatSubStatByMode(0, this.#artifactSubStats[3]) : this.#artifact.formatSubStatByMode(3, this.#artifactSubStats[3]);
		
		return [s1, s2, s3, s4];
	}
	
	/**
	 * Updates the specific array property from ArtifactStat.artifactSubStats.
     * 
	 * Index 0 -> Sub-Stat 1
     * 
     * Index 1 -> Sub-Stat 2
     * 
     * Index 2 -> Sub-Stat 3
     * 
     * Index 3 -> Sub-Stat 4
	 * @param {number} index Their index position of ArtifactStat.artifactSubStats
	 * @param {ArtifactSubStat} artifactSubStat New ArtifactSubStat object
	 */
	updateArtifactSubStatAt(index, artifactSubStat) {
	    if (index < 0 || index >= this.#artifactSubStats.length) {
	        throw new Error("Index out of bounds: " + index);
	    }
	    
	    if (artifactSubStat === null) {
	        throw new Error("The artifactSubStat must not be null");
	    }
	    
	    if (this.#hasDuplicateSubStat(artifactSubStat)) {
			throw new Error("There is duplicate sub-stat found");
		}
	    
	    const retrivedArtifactSubStat = this.#artifactSubStats[index];

	    retrivedArtifactSubStat.setAttributeName(artifactSubStat.getAttributeName());
	    
	    if (retrivedArtifactSubStat.getIsInitialValueEmpty()) {
	    	retrivedArtifactSubStat.setInitialAttributeValue(artifactSubStat.getInitialAttributeValue());
	    	retrivedArtifactSubStat.setPrevAttributeValue(artifactSubStat.getAttributeValue());
		} else {
			retrivedArtifactSubStat.setAttributeValue(artifactSubStat.getAttributeValue());
			retrivedArtifactSubStat.setPrevAttributeValue(artifactSubStat.getPrevAttributeValue());
		}
	}
	
	/**
	 * Updates the array properties from ArtifactStat.artifactSubStats.
     * 
	 * Index 0 -> Sub-Stat 1
     * 
	 * Index 1 -> Sub-Stat 2
     * 
	 * Index 2 -> Sub-Stat 3
     * 
	 * Index 3 -> Sub-Stat 4
	 * @param {...ArtifactSubStat} artifactSubStats ArtifactSubStat objects
	 */
	updateArtifactSubStats(...artifactSubStats) {
		if (!Array.isArray(artifactSubStats)) {
			throw new TypeError("Invalid Data Type: must be a array.");
		}
		
		if (artifactSubStats.length > this.#artifactSubStats.length) {
			throw new Error("The array's length exceeds the defined array's length");
		}
		
		if (this.#hasDuplicateSubStat([...artifactSubStats])) {
			throw new Error("There is duplicate sub-stat found");
		}
		
		for (let index = 0; index < artifactSubStats.length; index++) {
			this.updateArtifactSubStatAt(index, artifactSubStats[index]);
		}
	}
	
	/**
	 * Gets a specific sub-stat at index.
     * 
	 * Index 0 -> Sub-Stat 1
     * 
	 * Index 1 -> Sub-Stat 2
     * 
	 * Index 2 -> Sub-Stat 3
     * 
	 * Index 3 -> Sub-Stat 4
	 * @param {number} index index of the ArtifactSubStat from ArtifactStat.artifactSubStats
	 * @returns {ArtifactSubStat} ArtifactSubStat object
	 */
	getSubStatAt(index) {
        if (typeof index !== 'number') {
            throw new TypeError('Invalid Data Type: must be a number.');
        }

		if (index < 0 || index >= this.#artifactSubStats.length) {
			throw new Error("Index out of bounds: " + index);
		}
		
		return this.#artifactSubStats[index];
	}
	
	#removeSubStatUpgrades() {
		for (let index = 0; index < this.#artifactSubStats.length; index++) {
			const artifactSubStat = this.#artifactSubStats[index];
			
			if (artifactSubStat === this.#artifactSubStats[3] && this.#maxUpgrade === 4) {
				artifactSubStat.setAttributeName(null);
				artifactSubStat.setInitialAttributeValue(0);
				artifactSubStat.setPrevAttributeValue(artifactSubStat.getAttributeValue());
			} else {
				artifactSubStat.setAttributeValue(artifactSubStat.getInitialAttributeValue());
				artifactSubStat.setPrevAttributeValue(artifactSubStat.getAttributeValue());
			}
		}
	}
	
	#resetSubStats() {
		for (let index = 0; index < this.#artifactSubStats.length; index++) {
			const artifactSubStat = this.#artifactSubStats[index];
			
			artifactSubStat.setAttributeName(null);
			artifactSubStat.setInitialAttributeValue(0);
			artifactSubStat.setPrevAttributeValue(artifactSubStat.getAttributeValue());
		}
	}
	
	// for the artifactSubStats defined property and artifactSubStats parameter
	#hasDuplicateSubStat(artifactSubStat) {
		let isDuplicate = false;
		
        if (Array.isArray(artifactSubStat)) {
            for (let index = 1; index < this.#artifactSubStats.length; index++) {
                const baseSubStat = this.#artifactSubStats[0];
                const nextSubStat = this.#artifactSubStats[index];
                
                try {
                    if (baseSubStat === nextSubStat) {
                        isDuplicate = true;
                        break;
                    }
                } catch {
                    continue;
                }
            }
        } else {
            for (let index = 0; index < this.#artifactSubStats.length; index++) {
                const subStat = this.#artifactSubStats[index];
                
                try {
                    if (subStat.getAttributeName() !== null && subStat === artifactSubStat) {
                        isDuplicate = true;
                        break;
                    }
                } catch {
                    continue;
                }
            }
        }
		
		return isDuplicate;
	}
	
    #initializeSubStats(artifactSubStats) {
        const arrayLength = 4;

        if (arguments.length === 1 && Array.isArray(artifactSubStats)) {
            if (artifactSubStats.length > arrayLength) {
                throw new Error('Array length cannot go more than 4.');
            }
    
            for (const artifactSubStat of artifactSubStats) {
                if (!(artifactSubStat instanceof ArtifactSubStat)) {
                    throw new TypeError('must be an instance of ArtifactSubStat class.');
                }
            }

            const incomingArtifactSubStatsLength = artifactSubStats.length;

            if (incomingArtifactSubStatsLength === 1) {
                throw new Error("Cannot generate stat with only 1 sub-stat");
            }

            for (let index = 0; index < arrayLength; index++) {
                this.#artifactSubStats[index] = new ArtifactSubStat(null, 0);
                
                if (index < incomingArtifactSubStatsLength) {
                    this.updateArtifactSubStatAt(index, artifactSubStats[index]);
                }
            }
        } else if (arguments.length === 0 && !Array.isArray(artifactSubStats)) {
            for (let index = 0; index < arrayLength; index++) {
                this.#artifactSubStats[index] = new ArtifactSubStat(null, 0);
            }
        }
    }
	
	#addContainerToText(str) {
	    // Define a minimum width for the container
	    const minWidth = 20; // Minimum width for the container
	    const lines = str.split('\n'); // Split the input into lines
	    let maxLineLength = 0;

	    // Determine the maximum line length
	    for (const line of lines) {
	        maxLineLength = Math.max(maxLineLength, line.length);
	    }

	    // Calculate the width of the container
	    let width = Math.max(minWidth, maxLineLength + 4); // +4 for borders and padding

	    let template = '';

	    // Create the top border
	    const topBorder = "+" + "-".repeat(width - 2) + "+";
        template += '\n' + topBorder + '\n';

	    // Print each line within the container
	    for (const line of lines) {
	        const contentLine = "| " + line + " ".repeat(width - line.length - 4) + " |"; // -4 for the borders and space
            template += contentLine + '\n';
	    }

	    // Print the bottom border
        template += topBorder + '\n';

	    // Return the final string
	    return template;
	}
	
	toString() {
		let template = '';
		
        template += 'Artifact Piece: ' + this.#artifactPiece + '\n';
        template += 'Main Attribute: ' + this.#mainAttribute + '\n';
        template += 'Max Upgrade: ' + this.#maxUpgrade + '\n\n';
        template += 'Sub-Stats:\n';
        
        for (const subStat of this.#artifactSubStats) {
            template += subStat.getSubStat() + '\n';
        }
        
		return this.#addContainerToText(template);
	}
}