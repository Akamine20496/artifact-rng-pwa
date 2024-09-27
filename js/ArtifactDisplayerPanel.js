// Class ArtifactDisplayerPanel
class ArtifactDisplayerPanel {
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
	#isMax = false;
	#slotNumber = 0;
	#upgradeCounter = 0;
	#totalUpgrade = 0;
	#maxUpgrade = 0;
	#skipMode = false;

	// class methods
	generateStats() {
		if (this.#mainAttribute !== null) {
			this.#displayStats();
			return;
		}

		// Start time
		const startTime = performance.now();
		
		this.#mainAttribute = this.#artifact.generateMainAttribute(this.#artifactPiece);
		this.#maxUpgrade = this.#artifact.generateMaxUpgrade();

		this.#att1 = this.#artifact.generateSubAttribute(this.#mainAttribute);
		this.#att2 = this.#artifact.generateSubAttribute(this.#mainAttribute, this.#att1);
		this.#att3 = this.#artifact.generateSubAttribute(this.#mainAttribute, this.#att1, this.#att2);
		this.#att4 = this.#maxUpgrade === 4 ? null : this.#artifact.generateSubAttribute(this.#mainAttribute, this.#att1, this.#att2, this.#att3);

		this.#iValue1 = this.#value1 = this.#artifact.generateValue(this.#att1);
		this.#iValue2 = this.#value2 = this.#artifact.generateValue(this.#att2);
		this.#iValue3 = this.#value3 = this.#artifact.generateValue(this.#att3);
		this.#iValue4 = this.#value4 = this.#maxUpgrade === 4 ? 0 : this.#artifact.generateValue(this.#att4);

		this.#displayStats();

		// End time
		const endTime = performance.now();

		// Calculate elapsed time in milliseconds
		const elapsedTime = (endTime - startTime) / 1000;
		console.log(`\n\nElapsed time: ${elapsedTime.toFixed(4)} seconds\n\n`);
	}

	generateRandomCustomSubStats() {
		// Start time
		const startTime = performance.now();

		this.#maxUpgrade = this.#artifact.generateMaxUpgrade();

		this.#att3 = this.#artifact.generateSubAttribute(this.#mainAttribute, this.#att1, this.#att2);
		this.#att4 = this.#maxUpgrade === 4 ? null : this.#artifact.generateSubAttribute(this.#mainAttribute, this.#att1, this.#att2, this.#att3);
		
		if (this.#iValue1 === 0 && this.#iValue2 === 0) {
			this.#iValue1 = this.#value1 = this.#artifact.generateValue(this.#att1);
			this.#iValue2 = this.#value2 = this.#artifact.generateValue(this.#att2);
		}

		this.#iValue3 = this.#value3 = this.#artifact.generateValue(this.#att3);
		this.#iValue4 = this.#value4 = this.#maxUpgrade === 4 ? 0 : this.#artifact.generateValue(this.#att4);

		this.#displayStats();

		// End time
		const endTime = performance.now();

		// Calculate elapsed time in milliseconds
		const elapsedTime = (endTime - startTime) / 1000;
		console.log(`\n\nElapsed time: ${elapsedTime.toFixed(4)} seconds\n\n`);
	}

	#displayStats() {
		this.#lblArtifactPiece.innerText = this.#artifactPiece;
		this.#lblMainAttribute.innerText = this.#mainAttribute;

		this.#lblSlot1.innerText = this.#displayText(this.#att1, this.#value1);
		this.#lblSlot2.innerText = this.#displayText(this.#att2, this.#value2);
		this.#lblSlot3.innerText = this.#displayText(this.#att3, this.#value3);
		this.#lblSlot4.innerText = this.#maxUpgrade !== 4 ? 
			this.#displayText(this.#att4, this.#value4) : this.#displayNoneSubStat();

		console.info(this.toString());
	}

	rerollSubStats() {
		if (this.#maxUpgrade === 4) {
			this.#att4 = null;
		}

		this.#value1 = this.#iValue1;
		this.#value2 = this.#iValue2;
		this.#value3 = this.#iValue3;
		this.#value4 = this.#iValue4;

		this.#lblSlot1.innerText = this.#displayText(this.#att1, this.#value1);
		this.#lblSlot2.innerText = this.#displayText(this.#att2, this.#value2);
		this.#lblSlot3.innerText = this.#displayText(this.#att3, this.#value3);
		this.#lblSlot4.innerText = this.#maxUpgrade !== 4 ? 
			this.#displayText(this.#att4, this.#value4) : this.#displayNoneSubStat();

		this.#slotNumber = 0;
		this.#upgradeCounter = 0;
		this.#totalUpgrade = 0;
		this.#isMax = false;
	}

	upgradeSubStatValue() {
		if (this.#att4 === null) {
			this.#generateFourthSubStat();
		} else {
			if (!this.#isMax) {								    						// if the total upgrades of 5 is reached
				if (this.#upgradeCounter === 0) {						    			// if the counter is 0, it will loop
					while (this.#upgradeCounter === 0) {				    			// until the upgrade counter is not 0
						this.#slotNumber = this.#artifact.generateRandomSlot();
						this.#upgradeCounter = this.#artifact.generateNoOfUpgrade();
						this.#totalUpgrade += this.#upgradeCounter;
					}

					if (this.#totalUpgrade === this.#maxUpgrade) {						// if the total upgrade reaches 5, set the isMax to true
						this.#isMax = true;							        			// and upgrade the value
						this.#selectSlot(this.#slotNumber);
					} else if (this.#totalUpgrade > this.#maxUpgrade) {					// if the total upgrade exceeds 5, deduct it from counter
						this.#totalUpgrade -= this.#upgradeCounter;						// and set the counter to 0, then retry the process
						this.#upgradeCounter = 0;
						this.upgradeSubStatValue();
					} else {
						this.#selectSlot(this.#slotNumber);								// if the total upgrade is not 5
					}
				} else {										            			// if the counter is not 0
					this.#selectSlot(this.#slotNumber);
				}
			} else {											            			// if the isMax is true
				this.#selectSlot(this.#slotNumber);
			}
		}
	}

	#selectSlot(slotNumber) {
		switch (slotNumber) {
			case 1:
				this.#prevValue1 = this.#value1;
				this.#value1 += this.#artifact.generateValue(this.#att1);
				this.#displaySubStatUpgrade(this.#lblSlot1, this.#att1, this.#prevValue1, this.#value1);
				break;
			case 2:
				this.#prevValue2 = this.#value2;
				this.#value2 += this.#artifact.generateValue(this.#att2);
				this.#displaySubStatUpgrade(this.#lblSlot2, this.#att2, this.#prevValue2, this.#value2);
				break;
			case 3:
				this.#prevValue3 = this.#value3;
				this.#value3 += this.#artifact.generateValue(this.#att3);
				this.#displaySubStatUpgrade(this.#lblSlot3, this.#att3, this.#prevValue3, this.#value3);
				break;
			case 4:
				this.#prevValue4 = this.#value4;
				this.#value4 += this.#artifact.generateValue(this.#att4);
				this.#displaySubStatUpgrade(this.#lblSlot4, this.#att4, this.#prevValue4, this.#value4);
				break;
		}
		this.#upgradeCounter--;
	}

	#displaySubStatUpgrade(lblSlot, att, prevValue, currValue) {
		lblSlot.innerText = this.#displayText(att, currValue);
		
		if (!this.#skipMode) {
			Dialog.showMessageDialog('Sub-Stat Upgrade', this.#artifact.formatText(att, prevValue, currValue));
		}

		console.info('ArtifactDisplayerPanel::displaySubStatUpgrade()\n\n' + this.toString());
	}

	#generateFourthSubStat() {
		// Start time
		const startTime = performance.now();

		this.#att4 = this.#artifact.generateSubAttribute(this.#mainAttribute, this.#att1, this.#att2, this.#att3);
		
		this.#value4 = this.#artifact.generateValue(this.#att4);
		
		this.#lblSlot4.innerText = this.#displayText(this.#att4, this.#value4);

		if (!this.#skipMode) {
			const message = this.#artifact.formatText(this.#att4) 
				+ '     ----     ' + this.#artifact.formatValue(this.#att4, this.#value4);
			Dialog.showMessageDialog('New Sub-Stat', message);
		}

		// End time
		const endTime = performance.now();

		// Calculate elapsed time in milliseconds
		const elapsedTime = (endTime - startTime) / 1000;
		console.log(`\n\nElapsed time: ${elapsedTime.toFixed(4)} seconds\n\n`);

		console.info('ArtifactDisplayerPanel::generateFourthSubStat()\n\n' + this.toString());
	}

	resetStats() {
		this.#lblArtifactPiece.innerText = 'None';
		this.#lblMainAttribute.innerText = 'None';

		this.#lblSlot1.innerText = this.#displayNoneSubStat();
		this.#lblSlot2.innerText = this.#displayNoneSubStat();
		this.#lblSlot3.innerText = this.#displayNoneSubStat();
		this.#lblSlot4.innerText = this.#displayNoneSubStat();

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

		this.#iValue1 = this.#value1 = 0;
		this.#iValue2 = this.#value2 = 0;
		this.#iValue3 = this.#value3 = 0;
		this.#iValue4 = this.#value4 = 0;
	}

	#displayNoneSubStat() {
		return "· None";
	}

	#displayText(attribute, value) {
		return '· %s'.replace('%s', this.#artifact.formatText(attribute, value));
	}

	displaySkippedStats() {
		if (this.#skipMode) {
			let s1, s2, s3, s4;

			for (let counter = 1; counter <= 5; counter++) {
				this.upgradeSubStatValue();
			}

			s1 = this.#artifact.formatText(this.#att1, this.#iValue1, this.#value1);
			s2 = this.#artifact.formatText(this.#att2, this.#iValue2, this.#value2);
			s3 = this.#artifact.formatText(this.#att3, this.#iValue3, this.#value3);
			s4 = this.#maxUpgrade !== 4 ? this.#artifact.formatText(this.#att4, this.#iValue4, this.#value4) : 
				'%s   ---------   %f'.replace('%s', this.#artifact.formatText(this.#att4))
									  .replace('%f', this.#artifact.formatValue(this.#att4, this.#value4));

			const message = `
				<p>${s1}</p>
				<p>${s2}</p>
				<p>${s3}</p>
				<p>${s4}</p>
			`;

			Dialog.showMessageDialog('Final Stats', message);
		} else {
			Dialog.showMessageDialog('Artifact RNG', 'Skip Mode is False');
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
		if (typeof mode === 'boolean' && mode) {
			this.#skipMode = true;
		} else if (typeof mode === 'boolean' && !mode) {
			this.#skipMode = false;
		} else {
			throw new TypeError('Invalid Argument: only boolean is accepted!');
		}
	}

	setAttribute(att1, att2, att3, att4) {
		this.#att1 = att1;
		this.#att2 = att2;
		this.#att3 = att3;
		this.#att4 = att4;
	}

	setValue(value1, value2, value3, value4) {
		this.#iValue1 = this.#value1 = value1;
		this.#iValue2 = this.#value2 = value2;
		this.#iValue3 = this.#value3 = value3;
		this.#iValue4 = this.#value4 = value4;
	}

	getMaxUpgrade() {
		return this.#maxUpgrade;
	}

	toString() {
        return `
            ArtifactDisplayerPanel {
                artifactPiece	= '${this.#artifactPiece}'
                mainAttribute	= '${this.#mainAttribute}'
                maxUpgrade		= '${this.#maxUpgrade}'
                att1 = '${this.#att1}' [iValue1 = ${this.#iValue1}, value1 = ${this.#value1}]
                att2 = '${this.#att2}' [iValue2 = ${this.#iValue2}, value2 = ${this.#value2}]
                att3 = '${this.#att3}' [iValue3 = ${this.#iValue3}, value3 = ${this.#value3}]
                att4 = '${this.#att4}' [iValue4 = ${this.#iValue4}, value4 = ${this.#value4}]
            }
        `;
    }
}