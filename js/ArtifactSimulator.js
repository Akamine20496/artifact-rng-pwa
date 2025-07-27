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
    #btnReshape = document.getElementById('btnReshape');
    #btnReset = document.getElementById('btnReset');
    #btnLock = document.getElementById('btnLock');
    #btnCustomStat = document.getElementById('btnCustomStat');
    #chkRandomStat = document.getElementById('chkRandomStat');
    #chkFullUpgrade = document.getElementById('chkFullUpgrade');
    #pMaxUpgradeValue = document.getElementById('pMaxUpgradeValue');
    #rollCounter = 0;
    #isNewAttribute = true;
    #isLock = true;
    #isShowOnce = true;

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
            this.#btnReshape.disabled = false;
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
                    this.#btnReshape.disabled = false;
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
            this.#btnReshape.disabled = true;
            this.#btnReset.disabled = false;
            this.#isNewAttribute = true;

            this.#rollCounter = 0;

            this.#btnRoll.focus();
        });

        // btnReshape
        this.#btnReshape.addEventListener('click', () => {
            const reshapeConfig = new ReshapeConfigDialog(this.#artifactStat);
            reshapeConfig.setVisible(true);
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
            this.#btnReshape.disabled = true;
            this.#btnReset.disabled = true;
            this.#btnCustomStat.disabled = false;
            this.#rollCounter = 0;
            this.#isNewAttribute = true;

            this.#btnGenerate.focus();
        });

        // btnCustomStat
        this.#btnCustomStat.addEventListener('click', async () => {
            if (this.#isShowOnce) {
                this.#isShowOnce = false;

                await Dialog.showInstructionDialog('Artifact RNG - Custom Stat', this.#displayCustomStatMessage());
            }

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

        Dialog.showMessageDialog('Artifact RNG', this.#displayArtifactSimulatorMessage());
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

    #displayArtifactSimulatorMessage() {
        return /*html*/`
            <style>
                .center {
                    text-align: center;
                }

                .indent {
                    margin-left: 1rem;
                }

                .section {
                    margin-bottom: 1rem;
                    line-height: 1.5;
                    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 0.95rem;
                }

                .section b {
                    font-weight: bold;
                }
            </style>

            <div class="section center">
                This application is <b>exclusive</b> only for 5 star artifact
            </div>

            <div class="section"><b>Max Upgrade</b>: Displays the number of upgrades an artifact can have.</div>
            <div class="section"><b>Lock</b>: Locks the combo box and some buttons that are not needed.</div>
            <div class="section"><b>Generate</b>: Displays the artifact piece selected by the user and generates random main attribute (for sands, goblet, circlet piece) and sub-stats.</div>
            <div class="section"><b>Roll</b>: Upgrades a random value of a sub-stat.</div>
            <div class="section"><b>Reroll</b>: Removes the upgrades of the sub-stats.</div>
            <div class="section"><b>Reshape</b>: Upgrade rolls are guaranteed for two of the selected sub-stats.</div>
            <div class="section"><b>Reset</b>: Clears the artifact piece, main attribute, and sub-stats.</div>
            <div class="section"><b>Custom Stat</b>: Allows you to enter your own stat.</div>

            <div class="section">
                If the sub-stats are 3 only, it will have <b>1 New Sub-Stat and 4 Upgrades</b>.
                If the sub-stats are 4, it will have <b>5 Upgrades</b>.
            </div>

            <div class="section"><b>Flags</b></div>
            <div class="section indent"><b>Random Stat</b>: Generate random artifact piece stat.</div>
            <div class="section indent"><b>Full Upgrade</b>: Upgrades the value to the max upgrade. (Need 'Random Stat' to be selected first)</div>

            <div class="section">These flags only work if it's "Lock". Otherwise, it will not work when it's "Unlock".</div>
            <div class="section">Occasionally, it may display incorrect decimals due to rounding errors.</div>

            <div class="section center">Click <b>'OK'</b> to continue.</div>
        `;
    }

    #displayCustomStatMessage() {
        const contents = [
            /*html*/`
                <style>
                    .center {
                        text-align: center;
                    }

                    .indent {
                        margin-left: 1rem;
                    }

                    .section {
                        margin-bottom: 1rem;
                        line-height: 1.5;
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        font-size: 0.95rem;
                    }
                </style>

                <div class="section">
                    <b>Select an artifact piece and main attribute</b>.
                    After selecting the main attribute, the sub-stats will be displayed in the list.
                </div>

                <div class="section"><b>Adding Sub-Stat</b></div>
                <div class="section indent">Click the <b>'Add Sub-Stat'</b> button.</div>
                <div class="section indent">Select the slot where you want to add the sub-stat, then click <b>'OK'</b>.</div>

                <div class="section"><b>Removing Specific Sub-Stat</b></div>
                <div class="section indent">Click the <b>'Remove Sub-Stat'</b> button.</div>
                <div class="section indent">Select the slot where you want to remove the sub-stat, then click <b>'OK'</b>.</div>

                <div class="section"><b>Removing All Sub-Stats</b></div>
                <div class="section indent">Click the <b>'Remove All'</b> button.</div>

                <div class="section"><b>Displaying Stat</b></div>
                <div class="section indent">When you made up your mind, click <b>'Finalize Stat'</b> to display the stat.</div>
            `,
            /*html*/`
                <style>
                    .center {
                        text-align: center;
                    }

                    .indent {
                        margin-left: 1rem;
                    }

                    .section {
                        margin-bottom: 1rem;
                        line-height: 1.5;
                        font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        font-size: 0.95rem;
                    }
                </style>

                <div class="section">
                    You can place <b>first 2 sub-stats and first 3 or 4 sub-stats</b>.
                </div>

                <div class="section">
                    If you only placed first 2 sub-stats, the rest will automatically generate whether you will have 3 sub-stats or 4 sub-stats.
                </div>

                <div class="section"><b>Can display stats if</b></div>
                <div class="section indent">Slot 1 and Slot 2 are filled</div>
                <div class="section indent">Slot 1 to 3 are filled or Slot 1 to 4 are filled</div>

                <div class="section"><b>Cannot display stats if</b></div>
                <div class="section indent">All Slots are empty</div>
                <div class="section indent">Slot 1 and Slot 2 are empty but Slot 3 and Slot 4 are filled</div>

                <div class="section"><b>Defined Affix Mode</b></div>
                <div class="section">
                    This mode works like new gadget "Artifact Transmuter". You will have to choose <b>artifact piece (for sands, goblet, circlet piece)</b>, <b>main attribute</b>, and <b>2 sub-stats</b>. The rest will automatically generate.
                </div>
                <div class="section">The catch is that you can't choose initial value, it will be automatically generated as well.</div>
                <div class="section">Additionally, the sub-stats chosen will have at least <b>2</b> rolls when fully upgraded. These sub-stats will share this guaranteed roll.</div>

                <div class="section"><b>** TIP **</b></div>
                <div class="section indent"><b>For Desktop Users</b>: To quickly add a sub-stat, select it and press <b>"ENTER"</b> instead of clicking the button.</div>
                <div class="section indent"><b>For Mobile Users (also works for Desktop Users)</b>: Double tap/click the sub-stat to appear the dialog for adding sub-stat.</div>

                <div class="section center">Click <b>'OK'</b> to continue.</div>
            `
        ];

        return contents;
    }
}