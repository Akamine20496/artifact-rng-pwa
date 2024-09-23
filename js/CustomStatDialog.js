// Class CustomStatDialog
class CustomStatDialog {
    #modalOverlay = document.getElementById('modalOverlay');
    #artifact = new Artifact();
    #objArtifactPiece = null;
    #cboArtifactPiece = document.getElementById('cboArtifactPiece2');
    #cboMainStat = document.getElementById('cboMainStat');
    #subStatList = document.getElementById('subStatList');
    #chkDefinedAffixMode = document.getElementById('chkDefinedAffixMode');
    #cboValue1 = document.getElementById('cboValue1');
    #cboValue2 = document.getElementById('cboValue2');
    #cboValue3 = document.getElementById('cboValue3');
    #cboValue4 = document.getElementById('cboValue4');
    #listHeader = document.getElementById('listHeader');
    #lblAttr1 = document.getElementById('lblAttr1');
    #lblAttr2 = document.getElementById('lblAttr2');
    #lblAttr3 = document.getElementById('lblAttr3');
    #lblAttr4 = document.getElementById('lblAttr4');
    #btnAddSubStat = document.getElementById('btnAddSubStat');
    #btnRemoveAll = document.getElementById('btnRemoveAll');
    #btnRemoveSubStat = document.getElementById('btnRemoveSubStat');
    #btnDisplayStat = document.getElementById('btnDisplayStat');
    #definedAffixMode = false;

    // elements from the control-panel
    #btnSkip = document.getElementById('btnSkip');
    #btnRoll = document.getElementById('btnRoll');
    #btnReset = document.getElementById('btnReset');
    #btnCustomStat = document.getElementById('btnCustomStat');
    #btnGenerate = document.getElementById('btnGenerate');
    #btnLock = document.getElementById('btnLock');
    #pMaxUpgradeValue = document.getElementById('pMaxUpgradeValue');

    constructor() {
        // array of artifact pieces
        const arrArtifactPiece = this.#artifact.getPiece();

        // create an option label
        const optionGroup = document.createElement('optgroup');
        optionGroup.label = 'Select Artifact Piece';
        
        // adds the artifact pieces to the <select> element
        for (const artifactPiece of arrArtifactPiece) {
            const option = document.createElement('option');
            option.value = artifactPiece;
            option.innerText = artifactPiece;
            option.setAttribute('class', 'text');
            optionGroup.appendChild(option);
        }

        this.#cboArtifactPiece.appendChild(optionGroup);

        this.#setMainStatList(this.#artifact.getFlower());
        this.#defaultValue(
            this.#cboValue1, this.#cboValue2,
            this.#cboValue3, this.#cboValue4
        );

        // cboArtifactPiece
        this.#cboArtifactPiece.addEventListener('change', () => {
            const selectedValue = this.#cboArtifactPiece.value;

            switch (selectedValue) {
                case Artifact.FLOWER:
                    this.#setMainStatList(this.#artifact.getFlower());
                    break;
                case Artifact.FEATHER:
                    this.#setMainStatList(this.#artifact.getFeather());
                    break;
                case Artifact.SANDS:
                    this.#setMainStatList(this.#artifact.getSands());
                    break;
                case Artifact.GOBLET:
                    this.#setMainStatList(this.#artifact.getGoblet());
                    break;
                case Artifact.CIRCLET:
                    this.#setMainStatList(this.#artifact.getCirclet());
                    break;
            }
        });

        // cboMainStat
        // change event listener
        this.#cboMainStat.addEventListener('change', () => {
            let arrAttributes = [];
            const selectedValue = this.#cboMainStat.value;

            // empty the list
            $(this.#subStatList).empty();

            if (this.#artifact.isNotSpecialAttribute(selectedValue)) {
                arrAttributes = Attribute.ATTRIBUTES.filter(element => element !== selectedValue);
            } else {
                Attribute.ATTRIBUTES.forEach(element => arrAttributes.push(element));
            }

            this.#listHeader.innerText = `SUB-STAT LIST (${selectedValue})`;
            this.#setSubStatList(arrAttributes);
        });

        // click event listener
        this.#cboMainStat.addEventListener('click', () => {
            this.#cboMainStat.dispatchEvent(new Event('change'));
        });

        // shortcut to open the btnAddSubStat (desktop)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && this.#subStatList.children.length !== 0 &&
                $(this.#subStatList).children().hasClass('selected')) {
                    this.#btnAddSubStat.dispatchEvent(new Event('click'));
            }
        });

        // shortcut to open the btnAddSubStat (desktop and mobile)
        $(this.#subStatList).on('dblclick', 'li.selected', () => {
            this.#btnAddSubStat.dispatchEvent(new Event('click'));
        });

        this.#chkDefinedAffixMode.addEventListener('click', () => {
            if (this.#chkDefinedAffixMode.checked) {
                this.#definedAffixMode = true;
                this.#lblAttr3.style.visibility = 'hidden';
                this.#lblAttr4.style.visibility = 'hidden';
                this.#cboValue1.disabled = true;
                this.#cboValue2.disabled = true;

                this.#cboValue3.disabled = true;
                this.#cboValue4.disabled = true;
                this.#cboValue3.style.visibility = 'hidden';
                this.#cboValue4.style.visibility = 'hidden';

                this.#lblAttr3.innerText = 'None';
                this.#lblAttr4.innerText = 'None';

                this.#defaultValue(
                    this.#cboValue1, this.#cboValue2,
                    this.#cboValue3, this.#cboValue4
                );
            } else {
                this.#definedAffixMode = false;
                this.#lblAttr3.style.visibility = 'visible';
                this.#lblAttr4.style.visibility = 'visible';
                this.#cboValue1.disabled = false;
                this.#cboValue2.disabled = false;

                this.#cboValue3.disabled = false;
                this.#cboValue4.disabled = false;
                this.#cboValue3.style.visibility = 'visible';
                this.#cboValue4.style.visibility = 'visible';

                if (!this.#isNone(this.#lblAttr1.innerText)) {
                    this.#setValue(this.#lblAttr1, this.#cboValue1);
                }

                if (!this.#isNone(this.#lblAttr2.innerText)) {
                    this.#setValue(this.#lblAttr2, this.#cboValue2);
                }
            }
        });

        // btnAddSubStat
        this.#btnAddSubStat.addEventListener('click', () => this.#addSubStat());

        // btnRemoveSubStat
        this.#btnRemoveSubStat.addEventListener('click', () => this.#removeSubStat());

        // btnRemoveAll
        this.#btnRemoveAll.addEventListener('click', () => this.#removeAllSubStat());

        // btnSave (btnDisplayStat)
        this.#btnDisplayStat.addEventListener('click', () => this.#validateDisplayStats());
    }

    async #addSubStat() {
        if (this.#subStatList.children.length === 0) {
            await Dialog.showMessageDialog('Artifact RNG', 'List is empty!');
        } else {
            if (this.#getSelectedIndex() >= 0) {
                let isAdded = false;

                // retrieve the element of the selected attribute
                const element = $(this.#subStatList).find('li.selected:first');
                // store the selected attribute
                const selectedAttribute = element.text();
                // remove the class name 'selected'
                element.removeClass('selected');

                // Do-While Loop
                do {
                    // text of the prompt
                    const message1 = `
                        <p>
                            Enter the number to add a sub-stat and click 
                            <b>'OK'</b>
                            
                            <br><br>

                            Selected Sub-Stat: <b>${selectedAttribute}</b>
                        </p>
                        <p><b>[1]</b> Slot 1 (${this.#lblAttr1.innerText})</p>
                        <p><b>[2]</b> Slot 2 (${this.#lblAttr2.innerText})</p>
                        <p><b>[3]</b> Slot 3 (${this.#lblAttr3.innerText})</p>
                        <p><b>[4]</b> Slot 4 (${this.#lblAttr4.innerText})</p>
                    `;

                    const message2 = `
                        <p>
                            Enter the number to add a sub-stat and click 
                            <b>'OK'</b>
                            
                            <br><br>

                            Selected Sub-Stat: <b>${selectedAttribute}</b>
                        </p>
                        <p><b>[1]</b> Slot 1 (${this.#lblAttr1.innerText})</p>
                        <p><b>[2]</b> Slot 2 (${this.#lblAttr2.innerText})</p>
                    `;

                    const response = await Dialog.showInputDialog('Add Sub-Stat', this.#definedAffixMode ? message2 : message1);

                    if ((response.output !== null) && (response.outputLength > 0)) {
                        if (this.#equals(selectedAttribute, this.#lblAttr1, this.#lblAttr2, this.#lblAttr3, this.#lblAttr4)) {
                            await Dialog.showMessageDialog('Artifact RNG', `${selectedAttribute} is already been added!`);
                        } else {
                            switch (response.output) {
                                case '1':
                                    this.#addStat(this.#lblAttr1, selectedAttribute, this.#cboValue1);
                                    isAdded = true;
                                    break;
                                case '2':
                                    this.#addStat(this.#lblAttr2, selectedAttribute, this.#cboValue2);
                                    isAdded = true;
                                    break;
                                case '3':
                                    if (!this.#definedAffixMode) {
                                        this.#addStat(this.#lblAttr3, selectedAttribute, this.#cboValue3);
                                        isAdded = true;
                                        break;
                                    }
                                case '4':
                                    if (!this.#definedAffixMode) {
                                        this.#addStat(this.#lblAttr4, selectedAttribute, this.#cboValue4);
                                        isAdded = true;
                                        break;
                                    }
                                default:
                                    await Dialog.showMessageDialog('Artifact RNG', 
                                        `Enter a number only ${this.#definedAffixMode ? '1 and 2' : 'from 1 to 4'}!`);
                            }
                        }
                    } else if (response.operation === Dialog.CANCEL_OPTION) {
                        break; // stop loop
                    } else {
                        await Dialog.showMessageDialog('Artifact RNG', 'Enter the slot number to remove the stat!');
                    }
                } while (!isAdded);
            } else {
                await Dialog.showMessageDialog('Artifact RNG', 'Select a sub-stat to add!');
            }
        }
    }

    async #removeSubStat() {
        // remove selected attribute if there is
        $(this.#subStatList).find('li.selected:first').removeClass('selected');

        let isRemoved = false;

        if (this.#isNone(this.#lblAttr1.innerText) && this.#isNone(this.#lblAttr2.innerText)
            && this.#isNone(this.#lblAttr3.innerText) && this.#isNone(this.#lblAttr4.innerText)) {
                await Dialog.showMessageDialog('Artifact RNG', 'Slots are empty!');
        } else {
            do {
                const message1 = `
                    <p>
                        Enter the number to remove a sub-stat and click 
                        <b>'OK'</b>
                    </p>
                    <p><b>[1]</b> Slot 1 (${this.#lblAttr1.innerText})</p>
                    <p><b>[2]</b> Slot 2 (${this.#lblAttr2.innerText})</p>
                    <p><b>[3]</b> Slot 3 (${this.#lblAttr3.innerText})</p>
                    <p><b>[4]</b> Slot 4 (${this.#lblAttr4.innerText})</p>
                `;

                const message2 = `
                    <p>Enter the number to remove a sub-stat and click 
                        <b>'OK'</b>
                    </p>
                    <p><b>[1]</b> Slot 1 (${this.#lblAttr1.innerText})</p>
                    <p><b>[2]</b> Slot 2 (${this.#lblAttr2.innerText})</p>
                `;

                const response = await Dialog.showInputDialog('Remove Sub-Stat', this.#definedAffixMode ? message2 : message1);

                if ((response.output !== null) && (response.outputLength > 0)) {
                    switch (response.output) {
                        case "1":
                            this.#removeStat(this.#lblAttr1, this.#cboValue1);
                            isRemoved = true;
                            break;
                        case "2":
                            this.#removeStat(this.#lblAttr2, this.#cboValue2);
                            isRemoved = true;
                            break;
                        case "3":
                            if (!this.#definedAffixMode) {
                                this.#removeStat(this.#lblAttr3, this.#cboValue3);
                                isRemoved = true;
                                break;
                            }
                        case "4":
                            if (!this.#definedAffixMode) {
                                this.#removeStat(this.#lblAttr4, this.#cboValue4);
                                isRemoved = true;
                                break;
                            }
                        default:
                            await Dialog.showMessageDialog('Artifact RNG', 
                                `Enter a number only ${this.#definedAffixMode ? '1 and 2' : 'from 1 to 4'}!`);
                    }
                } else if (response.operation === Dialog.CANCEL_OPTION) {
                    break; // stop the loop
                } else {
                    await Dialog.showMessageDialog('Artifact RNG', 'Enter the slot number to remove the stat!');
                }
            } while (!isRemoved);
        }
    }

    async #removeAllSubStat() {
        if (this.#isNone(this.#lblAttr1.innerText) && this.#isNone(this.#lblAttr2.innerText) 
            && this.#isNone(this.#lblAttr3.innerText) && this.#isNone(this.#lblAttr4.innerText)) {
                await Dialog.showMessageDialog('Artifact RNG', 'There are no sub-stats!');
        } else {
            const response = await Dialog.showConfirmDialog('Select an option', 'Remove all sub-stats?');

            if (response === Dialog.YES_OPTION) {
                if (this.#definedAffixMode) {
                    this.#lblAttr1.innerText = 'None';
                    this.#lblAttr2.innerText = 'None';
                } else {
                    this.#lblAttr1.innerText = 'None';
                    this.#lblAttr2.innerText = 'None';
                    this.#lblAttr3.innerText = 'None';
                    this.#lblAttr4.innerText = 'None';

                    this.#defaultValue(
                        this.#cboValue1, this.#cboValue2,
                        this.#cboValue3, this.#cboValue4
                    );
                }

                await Dialog.showMessageDialog('Artifact RNG', 'Sub-stats are removed!');
            }
        }
    }

    async #validateDisplayStats() {
        const attribute = this.#cboMainStat.value;

        if ((this.#isNone(this.#lblAttr1.innerText) || this.#isNone(this.#lblAttr2.innerText)) 
            || (!this.#isNone(this.#lblAttr1.innerText) && !this.#isNone(this.#lblAttr2.innerText) 
                && this.#isNone(this.#lblAttr3.innerText) && !this.#isNone(this.#lblAttr4.innerText))) {
                    const message = `
                        <style>
                            .indent {
                                text-indent: 1rem;
                            }
                        </style>
                        <p>
                            <b>Can display stats if</b>
                            <p class='indent'>Slot 1 and Slot 2 are filled</p>
                            <p class='indent'>Slot 1 to 3 are filled or Slot 1 to 4 are filled</p>
                        </p>
                        <p>
                            <b>Cannot display stats if</b>
                            <p class='indent'>All Slots are empty</p>
                            <p class='indent'>Slot 1 and Slot 2 are empty but Slot 3 and Slot 4 are filled</p>
                        </p>
                    `;

                    await Dialog.showMessageDialog('Artifact RNG', message);
        } else if (this.#equals(attribute, this.#lblAttr1, this.#lblAttr2, this.#lblAttr3, this.#lblAttr4)) {
            await Dialog.showMessageDialog('Artifact RNG', 'A sub-stat cannot be the same as the main stat!');
        } else {
            const response = await Dialog.showConfirmDialog('Select an option', 'Display the stats?');

            if (response === Dialog.YES_OPTION) {
                this.#displayStats();
                $(this.#modalOverlay).hide();
                await Dialog.showMessageDialog('Artifact RNG', 'Stats has been displayed!');
            }
        }
    }

    #defaultValue(...cboValues) {
        for (const cboValue of cboValues) {
            // empty the list
            $(cboValue).empty();

            // create an option label
            const optionGroup = document.createElement('optgroup');
            optionGroup.label = 'Select a Value';

            // zero value
            const value = document.createElement('option');
            value.value = 0;
            value.innerText = 0;
            value.setAttribute('class', 'text');

            optionGroup.appendChild(value);
            cboValue.appendChild(optionGroup);
        }
    }

    async #addStat(lblAttr, selectedAttribute, cboValue) {
        lblAttr.innerText = selectedAttribute;
        
        if (!this.#definedAffixMode) {
            this.#setValue(lblAttr, cboValue);
        }

        await Dialog.showMessageDialog('Artifact RNG', `${selectedAttribute} is added!`);
    }

    async #removeStat(lblAttr, cboValue) {
        let temp = null;

        if (this.#isNone(lblAttr.innerText)) {
            await Dialog.showMessageDialog('Artifact RNG', `The slot is empty!`);
            temp = lblAttr.innerText;
        } else {
            temp = lblAttr.innerText;
            lblAttr.innerText = 'None';
            this.#defaultValue(cboValue);
        }

        if (temp !== 'None') {
            await Dialog.showMessageDialog('Artifact RNG', `${temp} is removed!`);
        }
    }

    #displayStats() {
        const artifactPiece = this.#cboArtifactPiece.value;
        const mainAttribute = this.#cboMainStat.value;

        const att1 = this.#lblAttr1.innerText;
        const att2 = this.#lblAttr2.innerText;
        const att3 = this.#lblAttr3.innerText == 'None' ? null : this.#lblAttr3.innerText;
        const att4 = this.#lblAttr4.innerText == 'None' ? null : this.#lblAttr4.innerText;

        const value1 = +this.#cboValue1.value;
        const value2 = +this.#cboValue2.value;
        const value3 = +this.#cboValue3.value;
        const value4 = +this.#cboValue4.value;

        this.#objArtifactPiece.setArtifactPiece(artifactPiece);
        this.#objArtifactPiece.setMainAttribute(mainAttribute);
        this.#objArtifactPiece.setAttribute(att1, att2, att3, att4);
        this.#objArtifactPiece.setValue(value1, value2, value3, value4);

        if ((att1 !== null && att2 !== null) && (att3 === null || this.#definedAffixMode)) {
            console.log('Generating Random Sub-Stats');

            // Start time
            const startTime = performance.now();

            this.#objArtifactPiece.generateRandomCustomSubStats();

            // End time
            const endTime = performance.now();

            // Calculate elapsed time in milliseconds
            const elapsedTime = (endTime - startTime) / 1000;
            console.log(`\n\nElapsed time: ${elapsedTime.toFixed(4)} seconds\n\n`);
        } else {
            if (att4 === null) {
                this.#objArtifactPiece.setMaxUpgrade(4);
            } else {
                this.#objArtifactPiece.setMaxUpgrade(5);
            }
            this.#objArtifactPiece.generateStats();
        }

        this.#pMaxUpgradeValue.innerText = this.#objArtifactPiece.getMaxUpgrade();
        this.#btnLock.disabled = true;
        this.#btnGenerate.disabled = true;

        this.#btnSkip.disabled = false;
        this.#btnRoll.disabled = false;
        this.#btnReset.disabled = false;
        this.#btnCustomStat.disabled = true;
        this.#btnRoll.focus();
    }

    // method to get the index of the selected sub stat list
    #getSelectedIndex() {
        return $(this.#subStatList).children('.selected').index();
    }

    #isNone(attribute) {
        return attribute === 'None';
    }

    #equals(attribute, ...lblAttributes) {
        return lblAttributes.some(lblAttr => attribute === lblAttr.innerText);
    }

    #setStatValue(cboValue, arrValues) {
        // empty the list
        $(cboValue).empty();

        // create an option label
        const optionGroup = document.createElement('optgroup');
        optionGroup.label = 'Select a Value';
        
        // adds the artifact pieces to the <select> element
        for (const value of arrValues) {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = value;
            option.setAttribute('class', 'text');
            optionGroup.appendChild(option);
        }

        cboValue.appendChild(optionGroup);
    }

    #setValue(lblAttr, cboValue) {
        let isMatch = false;
        
        for (let i = 0; i < Attribute.VALUE_STATS.length; i++) {
            const attributes = Attribute.VALUE_STATS[i];
            if (lblAttr.innerText === attributes.getAttribute()) {
                this.#setStatValue(cboValue, attributes.getValues());
                isMatch = true;
                break;
            }
        }
    
        if (!isMatch) {
            throw new Error(`Invalid Attribute: ${lblAttr.innerText}`);
        }
    }

    #setMainStatList(artifactPiece) {
        // empty the list
        $(this.#cboMainStat).empty();

        // create an option label
        const optionGroup = document.createElement('optgroup');
        optionGroup.label = 'Select Main Stat';

        // adds the artifact pieces to the <select> element
        for (const piece of artifactPiece) {
            const option = document.createElement('option');
            option.value = piece;
            option.innerText = piece;
            option.setAttribute('class', 'text');
            optionGroup.appendChild(option);
        }

        this.#cboMainStat.appendChild(optionGroup);
    }

    #setSubStatList(listAttribute) {
        // adds the artifact pieces to the <select> element
        for (const attribute of listAttribute) {
            const li = document.createElement('li');
            li.innerText = attribute;
            this.#subStatList.appendChild(li);
        }
    }

    setAsMemoryAddress(objArtifactPiece) {
        if (objArtifactPiece instanceof ArtifactDisplayerPanel) {
            this.#objArtifactPiece = objArtifactPiece;
        } else {
            throw new TypeError("Not an instance of ArtifactDisplayerPanel Class");
        }
    }
}