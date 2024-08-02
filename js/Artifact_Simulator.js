// Class Artifact_Simulator
class Artifact_Simulator {
    #artifactPiece = new Artifact_Piece();
    #customStat = new Custom_Stat();
    #cboArtifactPiece = document.getElementById('cboArtifactPiece1');
    #btnGenerate = document.getElementById('btnGenerate');
    #btnSkip = document.getElementById('btnSkip');
    #btnRoll = document.getElementById('btnRoll');
    #btnReroll = document.getElementById('btnReroll');
    #btnReset = document.getElementById('btnReset');
    #btnLock = document.getElementById('btnLock');
    #btnCustomStat = document.getElementById('btnCustomStat');
    #chkRandomStat = document.getElementById('chkRandomStat');
    #chkFullUpgrade = document.getElementById('chkFullUpgrade');
    #pMaxUpgradeValue = document.getElementById('pMaxUpgradeValue');
    #rollCounter = 1;
    #isNewAttribute = true;
    #isLock = true;
    #oneTime = true;

    constructor() {
        if (this.#oneTime) {
            this.#oneTime = false;
            // array of artifact pieces
            const arrArtifactPiece = new Artifact().getPiece();

            // create an option label
            const optionGroup = document.createElement('optgroup');
            optionGroup.label = '-- Select a Piece --';

            for (const artifactPiece of arrArtifactPiece) {
                const option = document.createElement('option');
                option.setAttribute('class', 'text');
                option.value = artifactPiece;
                option.innerText = artifactPiece;
                optionGroup.appendChild(option);
            }

            this.#cboArtifactPiece.appendChild(optionGroup);
        }

        // btnLock
        this.#btnLock.addEventListener('click', () => {
            if (this.#isLock) {
                this.#btnCustomStat.disabled = false;
                this.#cboArtifactPiece.disabled = true;

                if (this.#chkRandomStat.checked) {
                    this.#chkRandomStat.disabled = true;
                    this.#chkFullUpgrade.disabled = true;
                } else {
                    this.#chkRandomStat.disabled = true;
                }

                this.#isLock = false;
                this.#btnLock.innerText = 'Unlock';
            } else {
                this.#btnCustomStat.disabled = true;
                this.#cboArtifactPiece.disabled = false;

                if (this.#chkRandomStat.checked) {
                    this.#chkRandomStat.disabled = false;
                    this.#chkFullUpgrade.disabled = false;
                } else {
                    this.#chkRandomStat.disabled = false;
                }

                this.#isLock = true;
                this.#btnLock.innerText = 'Lock';
            }
        });

        // btnGenerate
        this.#btnGenerate.addEventListener('click', () => {
            if (this.#isLock && this.#chkRandomStat.checked) {
                const selectedPiece = new Artifact().generateRandomPiece();
                this.#artifactPiece.setArtifactPiece(selectedPiece);
                this.#artifactPiece.generateStat();

                this.#pMaxUpgradeValue.innerText = this.#artifactPiece.getMaxUpgrade();

                this.#cboArtifactPiece.disabled = true;
                this.#btnGenerate.disabled = true;
                this.#btnLock.disabled = true;
                this.#btnSkip.disabled = false;
                this.#btnRoll.disabled = false;
                this.#btnReset.disabled = false;
                this.#btnCustomStat.disabled = true;

                this.#chkRandomStat.disabled = true;
                this.#chkFullUpgrade.disabled = true;

                if (this.#chkRandomStat.checked && this.#chkFullUpgrade.checked) {
                    this.#btnSkip.dispatchEvent(new Event('click'));
                } else {
                    this.#btnRoll.focus();
                    Dialog.showMessageDialog('Artifact RNG', 'Stats has been generated!');
                }
            } else if (this.#isLock) {
                Dialog.showMessageDialog('Artifact RNG', 'Click the \'Lock\' first.');
            } else {
                const selectedPiece = this.#cboArtifactPiece.value;
                this.#artifactPiece.setArtifactPiece(selectedPiece);
                this.#artifactPiece.generateStat();

                this.#pMaxUpgradeValue.innerText = this.#artifactPiece.getMaxUpgrade();

                this.#btnGenerate.disabled = true;
                this.#btnLock.disabled = true;
                this.#btnSkip.disabled = false;
                this.#btnRoll.disabled = false;
                this.#btnReset.disabled = false;
                this.#btnCustomStat.disabled = true;
                this.#btnRoll.focus();

                Dialog.showMessageDialog('Artifact RNG', 'Stats has been generated!');
            }
        });

        // btnSkip
        this.#btnSkip.addEventListener('click', () => {
            this.#btnSkip.disabled = true;
            this.#btnRoll.disabled = true;
            this.#btnReroll.disabled = false;
            this.#btnReroll.focus();

            this.#artifactPiece.setSkipMode(true);
            this.#artifactPiece.displaySkippedStats();
        });

        // btnRoll
        this.#btnRoll.addEventListener('click', () => {
            this.#artifactPiece.setSkipMode(false);
            this.#btnSkip.disabled = true;

            const maxUpgradeValue = Number(this.#pMaxUpgradeValue.innerText);

            if (maxUpgradeValue === 4 && this.#isNewAttribute) {
                this.#artifactPiece.upgradeValue();
                this.#isNewAttribute = false;
            } else if (this.#rollCounter <= maxUpgradeValue) {
                this.#artifactPiece.upgradeValue();
                this.#rollCounter++;

                if (this.#rollCounter === maxUpgradeValue + 1) {
                    this.#btnRoll.disabled = true;
                    this.#btnReroll.focus();
                }
            }

            this.#btnReroll.disabled = false;
        });

        // btnReroll
        this.#btnReroll.addEventListener('click', () => {
            this.#artifactPiece.rerollStat();
            this.#btnSkip.disabled = false;
            this.#btnRoll.disabled = false;
            this.#btnReroll.disabled = true;
            this.#btnReset.disabled = false;
            this.#isNewAttribute = true;

            this.#rollCounter = 1;

            this.#btnRoll.focus();
        });

        // btnReset
        this.#btnReset.addEventListener('click', () => {
            if (!this.#isLock) {
                this.#btnCustomStat.disabled = false;
            }

            if (this.#isLock && this.#chkRandomStat.checked) {
                this.#cboArtifactPiece.disabled = false;

                this.#chkRandomStat.disabled = false;
                this.#chkFullUpgrade.disabled = false;
            }

            this.#pMaxUpgradeValue.innerText = 0;
            this.#rollCounter = 1;

            this.#btnLock.disabled = false;
            this.#btnGenerate.disabled = false;
            this.#btnSkip.disabled = true;
            this.#btnRoll.disabled = true;
            this.#btnReroll.disabled = true;
            this.#btnReset.disabled = true;
            this.#btnCustomStat.disabled = false;
            this.#isNewAttribute = true;

            this.#artifactPiece.resetStat();
            this.#btnGenerate.focus();

            Dialog.showMessageDialog('Artifact RNG', 'Stats are removed!');
        });

        // btnCustomStat
        this.#btnCustomStat.addEventListener('click', () => {
            this.#customStat.setAsMemoryAddress(this.#artifactPiece);
        });

        // chkRandomStat
        this.#chkRandomStat.addEventListener('click', () => {
            if (this.#chkRandomStat.checked) {
                this.#chkFullUpgrade.disabled = false;
            } else {
                this.#chkFullUpgrade.disabled = true;
                this.#chkFullUpgrade.checked = false;
            }
        });
    }
}