// Class Artifact_Simulator
class Artifact_Simulator {
    #artifactPiece = new Artifact_Piece();
    #customStat = new Custom_Stat();
    #cboArtifactPiece = document.getElementById('cboArtifactPiece1');
    #btnGenerate = document.getElementById('btnGenerate');
    #btnRoll = document.getElementById('btnRoll');
    #btnReroll = document.getElementById('btnReroll');
    #btnReset = document.getElementById('btnReset');
    #btnLock = document.getElementById('btnLock');
    #btnCustomStat = document.getElementById('btnCustomStat');
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
            const optionLabel = document.createElement('option');
            optionLabel.disabled = true;
            optionLabel.innerText = '-- Select a Piece --';
            optionLabel.setAttribute('class', 'text');

            // append the option label to the <select> element
            this.#cboArtifactPiece.appendChild(optionLabel);

            // adds the artifact pieces to the <select> element
            for (let i = 0; i < arrArtifactPiece.length; i++) {
                const option = document.createElement('option');
                option.setAttribute('class', 'text');
                option.value = arrArtifactPiece[i];
                option.innerText = arrArtifactPiece[i];
                this.#cboArtifactPiece.appendChild(option);
            }
        }

        // btnLock
        this.#btnLock.addEventListener('click', () => {
            if (this.#isLock) {
                this.#btnCustomStat.disabled = false;
                this.#cboArtifactPiece.disabled = true;
                this.#isLock = false;
                this.#btnLock.innerText = 'Unlock';
            } else {
                this.#btnCustomStat.disabled = true;
                this.#cboArtifactPiece.disabled = false;
                this.#isLock = true;
                this.#btnLock.innerText = 'Lock';
            }
        });

        // btnGenerate
        this.#btnGenerate.addEventListener('click', () => {
            if (this.#isLock) {
                Dialog.showMessageDialog('Artifact RNG', 'Click the \'Lock\' first.');
            } else {
                const selectedPiece = this.#cboArtifactPiece.value;
				this.#artifactPiece.setArtifactPiece(selectedPiece);
                this.#artifactPiece.generateStat();

                this.#pMaxUpgradeValue.innerText = this.#artifactPiece.getMaxUpgrade();
                
                this.#btnGenerate.disabled = true;
                this.#btnLock.disabled = true;
                this.#btnRoll.disabled = false;
                this.#btnReset.disabled = false;
                this.#btnCustomStat.disabled = true;
                this.#btnRoll.focus();
                Dialog.showMessageDialog('Artifact RNG', 'Stats has been generated!');
            }
        });

        // btnRoll
        this.#btnRoll.addEventListener('click', () => {
            if (Number(this.#pMaxUpgradeValue.innerText) === 4 && this.#isNewAttribute) {
                this.#artifactPiece.upgradeValue();
                this.#isNewAttribute = false;
            } else if (this.#rollCounter <= Number(this.#pMaxUpgradeValue.innerText)) {
                this.#artifactPiece.upgradeValue();
                this.#rollCounter++;
                
                if(this.#rollCounter === Number(this.#pMaxUpgradeValue.innerText) + 1) {
                    this.#btnRoll.disabled = true;
                    this.#btnReroll.focus();
                }
            }

            this.#btnReroll.disabled = false;
        });

        // btnReroll
        this.#btnReroll.addEventListener('click', () => {
            this.#artifactPiece.rerollStat();
            this.#btnRoll.disabled = false;
            this.#btnReroll.disabled = true;
            this.#btnReset.disabled = false;
            this.#rollCounter = 1;
            this.#isNewAttribute = true;
            this.#btnRoll.focus();
        });

        // btnReset
        this.#btnReset.addEventListener('click', () => {
            this.#pMaxUpgradeValue.innerText = 0;
            this.#artifactPiece.resetStat();
            this.#btnLock.disabled = false;
            this.#btnGenerate.disabled = false;
            this.#btnRoll.disabled = true;
            this.#btnReroll.disabled = true;
            this.#btnReset.disabled = true;
            this.#btnCustomStat.disabled = false;
            this.#rollCounter = 1;
            this.#isNewAttribute = true;
            this.#pMaxUpgradeValue.innerText = 0;
            this.#btnGenerate.focus();
            Dialog.showMessageDialog('Artifact RNG', 'Stats are removed!');
        });

        // btnCustomStat
        this.#btnCustomStat.addEventListener('click', () => {
            this.#customStat.setAsMemoryAddress(this.#artifactPiece);
        });
    }
}
