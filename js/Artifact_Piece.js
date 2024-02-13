// Class Artifact_Piece
class Artifact_Piece {
    // variables
    #artifact = new Artifact();
    #lblArtifactPiece = document.getElementById('lblArtifactPiece');
    #lblMainAttribute = document.getElementById('lblMainAttribute');
    #lblSlot1 = document.getElementById('lblSlot1');
    #lblSlot2 = document.getElementById('lblSlot2');
    #lblSlot3 = document.getElementById('lblSlot3');
    #lblSlot4 = document.getElementById('lblSlot4');
    #artifactPiece = null;
    #mainAttribute = null;
    #att1 = null; 
    #att2 = null;
    #att3 = null;
    #att4 = null;
    #value1 = 0;
    #value2 = 0;
    #value3 = 0;
    #value4 = 0;
    #iValue1 = 0;
    #iValue2 = 0;
    #iValue3 = 0;
    #iValue4 = 0;
    #prevValue1 = 0;
    #prevValue2 = 0;
    #prevValue3 = 0;
    #prevValue4 = 0;
    #isGenerated = false;
    #isMax = false;
    #slotNumber = 0;
    #upgradeCounter = 0;
    #totalUpgrade = 0;
    #maxUpgrade = 0;
	#skipMode = false;

    // class methods
    generateStat() {
        if (this.#mainAttribute !== null) {
			this.#displayStat();
			return;
		}

        this.#mainAttribute = this.#artifact.generateMainAttribute(this.#artifactPiece);
		this.#maxUpgrade = this.#artifact.noOfMaxUpgrade();

		do {
			this.#att1 = this.#artifact.generateSubAttribute(this.#mainAttribute);
			this.#att2 = this.#artifact.generateSubAttribute(this.#mainAttribute);
			this.#att3 = this.#artifact.generateSubAttribute(this.#mainAttribute);
			this.#att4 = this.#maxUpgrade == 4 ? null : this.#artifact.generateSubAttribute(this.#mainAttribute);
			
			if (this.#artifact.isUnique(this.#att1, this.#att2, this.#att3, this.#att4)) {
				this.#value1 = this.#iValue1 = this.#artifact.generateValue(this.#att1);
				this.#value2 = this.#iValue2 = this.#artifact.generateValue(this.#att2);
				this.#value3 = this.#iValue3 = this.#artifact.generateValue(this.#att3);
				this.#value4 = this.#iValue4 = this.#maxUpgrade == 4 ? 0 : this.#artifact.generateValue(this.#att4);
				this.#isGenerated = true;
			}
		} while(!this.#isGenerated);

		this.#isGenerated = false;
        this.#displayStat();
    }

    #displayStat() {
		this.#lblArtifactPiece.innerText = this.#artifactPiece;
		this.#lblMainAttribute.innerText = this.#mainAttribute;
		
        this.#lblSlot1.innerText = this.#displayText(this.#att1, this.#value1);
        this.#lblSlot2.innerText = this.#displayText(this.#att2, this.#value2);
        this.#lblSlot3.innerText = this.#displayText(this.#att3, this.#value3);

		if (this.#att4 !== null) {
			this.#lblSlot4.innerText = this.#displayText(this.#att4, this.#value4);
		}
	}

    rerollStat() {
        this.#value1 = this.#iValue1;
		this.#value2 = this.#iValue2;
		this.#value3 = this.#iValue3;
		this.#value4 = this.#iValue4;
		
        this.#lblSlot1.innerText = this.#displayText(this.#att1, this.#value1);
        this.#lblSlot2.innerText = this.#displayText(this.#att2, this.#value2);
        this.#lblSlot3.innerText = this.#displayText(this.#att3, this.#value3);
		this.#lblSlot4.innerText = this.#displayText(this.#att4, this.#value4);
		
		if (this.#maxUpgrade === 4) {
			this.#att4 = null;
			this.#value4 = 0;
			this.#lblSlot4.innerText = '· None';
		}
		
		this.#slotNumber = 0;
		this.#upgradeCounter = 0;
		this.#totalUpgrade = 0;
		this.#isMax = false;
    }

    upgradeValue() {
		if (this.#att4 === null) {
			this.#generate();
		} else {
			if (!this.#isMax) {								    			// if the total upgrades of 5 is reached
				if (this.#upgradeCounter === 0) {						    // if the counter is 0, it will loop
					while (this.#upgradeCounter === 0) {				    // until the upgrade counter is not 0
						this.#slotNumber = this.#selectSlot();
						this.#upgradeCounter = this.#artifact.noOfUpgrade();
						this.#totalUpgrade += this.#upgradeCounter;
					}
					
					if (this.#totalUpgrade === this.#maxUpgrade) {			// if the total upgrade reaches 5, set the isMax to true
						this.#isMax = true;							        // and upgrade the value
						this.#slot(this.#slotNumber);
					} else if (this.#totalUpgrade > this.#maxUpgrade) {		// if the total upgrade exceeds 5, deduct it from counter
						this.#totalUpgrade -= this.#upgradeCounter;			// and set the counter to 0, then retry the process
						this.#upgradeCounter = 0;
						this.upgradeValue();
					} else {
						this.#slot(this.#slotNumber);						// if the total upgrade is not 5
					}
				} else {										            // if the counter is not 0
					this.#slot(this.#slotNumber);
				}
			} else {											            // if the isMax is true
				this.#slot(this.#slotNumber);
			}
		}
	}

    #selectSlot() {
		const slotChance = this.#artifact.generateNumber();
		const slots = [1, 2, 3, 4];
		const probabilities = [25.00, 25.00, 25.00, 25.00];
		let cumulativeProbability = 0;
		
		for (let i = 0; i < slots.length; i++) {
			cumulativeProbability += probabilities[i];
			if (slotChance < cumulativeProbability) {
				return slots[i];
			}
		}
		
		// If we reach here, something went wrong, so just return the first element
		return slots[0];
	}

    #slot(slotNumber) {
		switch (slotNumber) {
			case 1:
				this.#prevValue1 = this.#value1;
				this.#value1 += this.#artifact.generateValue(this.#att1);
				this.#displayUpgrade(this.#lblSlot1, this.#att1, this.#prevValue1, this.#value1);
				break;
			case 2:
				this.#prevValue2 = this.#value2;
				this.#value2 += this.#artifact.generateValue(this.#att2);
				this.#displayUpgrade(this.#lblSlot2, this.#att2, this.#prevValue2, this.#value2);
				break;
			case 3:
				this.#prevValue3 = this.#value3;
				this.#value3 += this.#artifact.generateValue(this.#att3);
				this.#displayUpgrade(this.#lblSlot3, this.#att3, this.#prevValue3, this.#value3);
				break;
			case 4:
				this.#prevValue4 = this.#value4;
				this.#value4 += this.#artifact.generateValue(this.#att4);
				this.#displayUpgrade(this.#lblSlot4, this.#att4, this.#prevValue4, this.#value4);
				break;
		}
		this.#upgradeCounter--;
	}

    #displayUpgrade(lblSlot, att, prevValue, currValue) {
		lblSlot.innerText = this.#displayText(att, currValue);

		if (!this.#skipMode) {
			Dialog.showMessageDialog('Attribute Upgrade', this.#artifact.formatText(att, prevValue, currValue));
		}
	}

    #generate() {
		do {
			this.#att4 = this.#artifact.generateSubAttribute(this.#mainAttribute);
			
			if (this.#artifact.isUnique(this.#att1, this.#att2, this.#att3, this.#att4)) {
				this.#value4 = this.#artifact.generateValue(this.#att4);
				this.#lblSlot4.innerText = this.#displayText(this.#att4, this.#value4);
				
				if (!this.#skipMode) {
					Dialog.showMessageDialog('New Attribute', this.#artifact.formatText(this.#att4) 
											+ '     ----     ' 
											+ this.#artifact.formatValue(this.#att4, this.#value4));
				}
				
				this.#isGenerated = true;
			}
		} while(!this.#isGenerated);
		this.#isGenerated = false;
	}

    resetStat() {
		this.#lblArtifactPiece.innerText = 'None';
		this.#lblMainAttribute.innerText = 'None';
		
		this.#lblSlot1.innerText = '· None';
		this.#lblSlot2.innerText = '· None';
		this.#lblSlot3.innerText = '· None';
		this.#lblSlot4.innerText = '· None';
		
		this.#slotNumber = 0;
		this.#upgradeCounter = 0;
		this.#maxUpgrade = 0;
		this.#totalUpgrade = 0;
		this.#isMax = false;
		
		this.#mainAttribute = null;
		
		this.#att1 = null;
		this.#att2 = null;
		this.#att3 = null;
		this.#att4 = null;
	}

    #displayText(attribute, value) {
		return '· %s'.replace('%s', this.#artifact.formatText(attribute, value));
	}

	displaySkippedStats() {
		if (this.#skipMode) {
			const temp = {};

			if (this.#maxUpgrade === 4) {
				this.upgradeValue();

				for (let counter = 1; counter <= 4; counter++) {
					this.upgradeValue();
				}

				temp.s1 = `${this.#artifact.formatText(this.#att1, this.#iValue1, this.#value1)}`;
				temp.s2 = `${this.#artifact.formatText(this.#att2, this.#iValue2, this.#value2)}`;
				temp.s3 = `${this.#artifact.formatText(this.#att3, this.#iValue3, this.#value3)}`;
				temp.s4 = `${'%s   ---------   %f1'.replace('%s', this.#artifact.formatText(this.#att4))
												.replace('%f1', this.#artifact.formatValue(this.#att4, this.#value4))}`;
			} else {
				for (let counter = 1; counter <= 5; counter++) {
					this.upgradeValue();
				}

				temp.s1 = `${this.#artifact.formatText(this.#att1, this.#iValue1, this.#value1)}`;
				temp.s2 = `${this.#artifact.formatText(this.#att2, this.#iValue2, this.#value2)}`;
				temp.s3 = `${this.#artifact.formatText(this.#att3, this.#iValue3, this.#value3)}`;
				temp.s4 = `${this.#artifact.formatText(this.#att4, this.#iValue4, this.#value4)}`;
			}

			Dialog.showMessageDialog('Final Stats', `${temp.s1}\n${temp.s2}\n${temp.s3}\n${temp.s4}`);
		} else {
			throw new Error('Invalid Argument: must be boolean!');
		}
	}

	setArtifactPiece(artifactPiece) {
		this.#artifactPiece = artifactPiece;
	}
	
	setMainAttribute(mainAttribute) {
		this.#mainAttribute = mainAttribute;
	}
	
	setMaxUpgrade(maxUpgrade) {
		this.#maxUpgrade = maxUpgrade;
	}
	
	setSkipMode(mode) {
		if (String(mode) === 'true') {
			this.#skipMode = true;
		} else if (String(mode) === 'false') {
			this.#skipMode = false;
		} else {
			throw new Error('Invalid Argument: only true or false in string!');
		}
	}

	setSlot(att1, att2, att3, att4) {
		this.#att1 = att1;
		this.#att2 = att2;
		this.#att3 = att3;
		this.#att4 = att4;
	}
	
	setValue(value1, value2, value3, value4) {
		this.#value1 = this.#iValue1 = value1;
		this.#value2 = this.#iValue2 = value2;
		this.#value3 = this.#iValue3 = value3;
		this.#value4 = this.#iValue4 = value4;
	}

	getArtifactPiece() {
		return this.#artifactPiece;
	}
	
	getMaxUpgrade() {
		return this.#maxUpgrade;
	}
}