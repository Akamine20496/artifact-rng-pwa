// Class ArtifactSimulator
class ArtifactSimulator {
    #artifactStat = new ArtifactStat();
    #artifactDisplayerPanel = new ArtifactDisplayerPanel(this.#artifactStat);
    #customStatDialog = new CustomStatDialog();
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
    #rollCounter = 0;
    #isNewAttribute = true;
    #isLock = true;

    constructor() {
        // array of artifact pieces
        const arrArtifactPiece = new Artifact().getPiece();

        // create an option label
        const optionGroup = document.createElement('optgroup');
        optionGroup.label = 'Select Artifact Piece';

        for (const artifactPiece of arrArtifactPiece) {
            const option = document.createElement('option');
            option.setAttribute('class', 'text');
            option.value = artifactPiece;
            option.innerText = artifactPiece;
            optionGroup.appendChild(option);
        }

        this.#cboArtifactPiece.appendChild(optionGroup);

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
        this.#btnGenerate.addEventListener('click', async () => {
            if (this.#isLock) {
                if (this.#chkRandomStat.checked) {
                    this.#handleRandomStatGeneration();
                } else {
                    await Dialog.showMessageDialog('Artifact RNG', 'Click the \'Lock\' first.');
                }
            } else {
                this.#handleStatGeneration();
            }
        });

        // btnSkip
        this.#btnSkip.addEventListener('click', async () => {
            const subStats = this.#artifactStat.skipUpgradeSubStats();
            this.#artifactDisplayerPanel.displayStat();

            let template = '';

            for (const subStat of subStats) {
                template += subStat + '\n';
            }

            await Dialog.showMessageDialog('Final Sub-Stats', template);

            this.#btnSkip.disabled = true;
            this.#btnRoll.disabled = true;
            this.#btnReroll.disabled = false;
            this.#btnReroll.focus();
        });

        // btnRoll
        this.#btnRoll.addEventListener('click', async () => {
            let dialogTitle = '';
            let dialogMessage = '';

            this.#btnSkip.disabled = true;

            const maxUpgradeValue = Number(this.#pMaxUpgradeValue.innerText);

            if (maxUpgradeValue === 4 && this.#isNewAttribute) {
                this.#artifactStat.upgradeSubStatValue();
                this.#isNewAttribute = false;

                dialogTitle = 'New Sub-Stat';
                dialogMessage = this.#artifactStat.getCurrentNewSubStat();
            } else if (this.#rollCounter < maxUpgradeValue) {
                this.#artifactStat.upgradeSubStatValue();
                this.#rollCounter++;

                if (this.#rollCounter === maxUpgradeValue) {
                    this.#btnRoll.disabled = true;
                    this.#btnReroll.focus();
                }

                dialogTitle = 'Sub-Stat Upgrade';
                dialogMessage = this.#artifactStat.getCurrentUpgradedSubStat();
            }

            this.#artifactDisplayerPanel.displayStat();

            await Dialog.showMessageDialog(dialogTitle, dialogMessage);

            this.#btnReroll.disabled = false;
        });

        // btnReroll
        this.#btnReroll.addEventListener('click', () => {
            this.#artifactStat.rerollStat();
            this.#artifactDisplayerPanel.displayStat();

            this.#btnSkip.disabled = false;
            this.#btnRoll.disabled = false;
            this.#btnReroll.disabled = true;
            this.#btnReset.disabled = false;
            this.#isNewAttribute = true;

            this.#rollCounter = 0;

            this.#btnRoll.focus();
        });

        // btnReset
        this.#btnReset.addEventListener('click', async () => {
            if (!this.#isLock) {
                this.#btnCustomStat.disabled = false;
            }

            if (this.#isLock && this.#chkRandomStat.checked) {
                this.#cboArtifactPiece.disabled = false;

                this.#chkRandomStat.disabled = false;
                this.#chkFullUpgrade.disabled = false;
            }

            this.#pMaxUpgradeValue.innerText = 0;
            this.#artifactStat.resetStat();
            this.#artifactStat.setArtifactPiece(null);
            this.#artifactDisplayerPanel.displayStat();

            await Dialog.showMessageDialog('Artifact RNG', 'Stat is removed!');
            
            this.#btnLock.disabled = false;
            this.#btnGenerate.disabled = false;
            this.#btnSkip.disabled = true;
            this.#btnRoll.disabled = true;
            this.#btnReroll.disabled = true;
            this.#btnReset.disabled = true;
            this.#btnCustomStat.disabled = false;
            this.#rollCounter = 0;
            this.#isNewAttribute = true;

            this.#btnGenerate.focus();
        });

        // btnCustomStat
        this.#btnCustomStat.addEventListener('click', () => {
            this.#customStatDialog.setAsMemoryAddress(this.#artifactStat);
            this.#customStatDialog.setVisible(true);

            // Im lazy to convert this CustomStatWindow into dynamic.
            // So i will just use this function to default the state to false
            // everytime this click event is invoked
            CustomStatDialog.setIsCustomStatDisplayedToFalse();

            // wait for the custom stat operation to finish
            const promise = new Promise(resolve => {
                const checkReady = setInterval(() => {
                    if (CustomStatDialog.getIsCustomStatDisplayed() && !$('#modalOverlay').is(':visible')) {
                        clearInterval(checkReady);
                        resolve('success');
                    } else if (!CustomStatDialog.getIsCustomStatDisplayed() && !$('#modalOverlay').is(':visible')) {
                        clearInterval(checkReady);
                        resolve('cancelled');
                    }
                }, 100); // check every 100 milliseconds
            });

            // display the custom stat to the panel
            promise.then(async (message) => {
                if (message === 'success') {
                    this.#pMaxUpgradeValue.innerText = this.#artifactStat.getMaxUpgrade();
                    this.#artifactDisplayerPanel.displayStat();

                    await Dialog.showMessageDialog('Artifact RNG', 'Custom Stat is now displayed!');

                    this.#btnLock.disabled = true;
                    this.#btnGenerate.disabled = true;
                    this.#btnSkip.disabled = false;
                    this.#btnRoll.disabled = false;
                    this.#btnReset.disabled = false;
                    this.#btnCustomStat.disabled = true;
                    this.#btnRoll.focus();
                }

                console.log(message);
            });
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

    #handleRandomStatGeneration() {
        this.#artifactStat.setArtifactPiece(new Artifact().generateRandomPiece());

        this.#generateStatAndUpdatePanel();

        if (this.#chkFullUpgrade.checked) {
            this.#invokeSkipAction();
        } else {
            this.#showStatGeneratedMessage();
        }
    }

    #handleStatGeneration() {
        this.#artifactStat.setArtifactPiece(this.#cboArtifactPiece.value);
        this.#generateStatAndUpdatePanel();
        this.#showStatGeneratedMessage();
    }

    #generateStatAndUpdatePanel() {
        this.#artifactStat.generateStat();
        this.#pMaxUpgradeValue.innerText = this.#artifactStat.getMaxUpgrade();
        this.#artifactDisplayerPanel.displayStat();
        this.#updateButtonStates();
    }

    #updateButtonStates() {
        this.#cboArtifactPiece.disabled = true;
        this.#btnGenerate.disabled = true;
        this.#btnLock.disabled = true;
        this.#btnSkip.disabled = false;
        this.#btnRoll.disabled = false;
        this.#btnReset.disabled = false;
        this.#btnCustomStat.disabled = true;

        this.#chkRandomStat.disabled = true;
        this.#chkFullUpgrade.disabled = true;
    }

    #invokeSkipAction() {
        this.#btnSkip.dispatchEvent(new Event('click'));
    }

    async #showStatGeneratedMessage() {
        await Dialog.showMessageDialog('Artifact RNG', 'Stat is generated.');
        this.#btnRoll.focus();
    }
}