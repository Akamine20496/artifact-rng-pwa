// Class Custom Stat
class Custom_Stat {
    #modalOverlay = document.getElementById('modalOverlay');
    #artifact = new Artifact();
    #artifact_piece = null;
    #cboArtifactPiece = document.getElementById('cboArtifactPiece2');
    #cboMainStat = document.getElementById('cboMainStat');
    #subStatList = document.getElementById('subStatList');
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
    #oneTime = true;
    // elements from the control-panel
    #btnSkip = document.getElementById('btnSkip');
    #btnRoll = document.getElementById('btnRoll');
    #btnReset = document.getElementById('btnReset');
    #btnCustomStat = document.getElementById('btnCustomStat');
    #btnGenerate = document.getElementById('btnGenerate');
    #btnLock = document.getElementById('btnLock');
    #pMaxUpgradeValue = document.getElementById('pMaxUpgradeValue');

    constructor() {
        if (this.#oneTime) {
            this.#oneTime = false;
            // array of artifact pieces
            const arrArtifactPiece = this.#artifact.getPiece();

            // create an option label
            const optionLabel = document.createElement('option');
            optionLabel.disabled = true;
            optionLabel.innerText = '-- Select a Piece --';
            optionLabel.setAttribute('class', 'text');

            // append the option label to the <select> element
            this.#cboArtifactPiece.appendChild(optionLabel);

            // adds the artifact pieces to the <select> element
            for (const artifactPiece of arrArtifactPiece) {
                const option = document.createElement('option');
                option.value = artifactPiece;
                option.innerText = artifactPiece;
                option.setAttribute('class', 'text');
                this.#cboArtifactPiece.appendChild(option);
            }

            this.#setMainStatList(this.#artifact.getFlower());
            this.#defaultValue(this.#cboValue1, this.#cboValue2,
                this.#cboValue3, this.#cboValue4);
        }

        // cboArtifactPiece
        this.#cboArtifactPiece.addEventListener('change', () => {
            const selectedValue = this.#cboArtifactPiece.value;

            switch (selectedValue) {
                case Artifact.FLOWER:
                    this.#setMainStatList(this.#artifact.getFlower());
                    break;
                case Artifact.FLOWER:
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
            let arrAttributes = new Array();
            const selectedValue = this.#cboMainStat.value;

            // empty the list
            $(this.#subStatList).empty();

            if (this.#artifact.isNotSpecial(selectedValue)) {
                arrAttributes = Attribute.ATTRIBUTES.filter(element => element !== selectedValue);
            } else {
                Attribute.ATTRIBUTES.forEach(element => arrAttributes.push(element));
            }

            this.#listHeader.innerText = `SUB STATS (${selectedValue})`;
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
        $('#subStatList').on('dblclick', 'li.selected', () => {
            this.#btnAddSubStat.dispatchEvent(new Event('click'));
        });

        // btnAddSubStat
        this.#btnAddSubStat.addEventListener('click', () => {
            this.#addSubStat();
        });

        // btnRemoveSubStat
        this.#btnRemoveSubStat.addEventListener('click', () => {
            this.#removeSubStat();
        });

        // btnRemoveAll
        this.#btnRemoveAll.addEventListener('click', () => {
            if (this.#isNone(this.#lblAttr1) && this.#isNone(this.#lblAttr2)
                && this.#isNone(this.#lblAttr3) && this.#isNone(this.#lblAttr4)) {
                Dialog.showMessageDialog('Artifact RNG', 'There are no sub-stats!');
            } else {
                this.#lblAttr1.innerText = 'None';
                this.#lblAttr2.innerText = 'None';
                this.#lblAttr3.innerText = 'None';
                this.#lblAttr4.innerText = 'None';

                this.#defaultValue(this.#cboValue1, this.#cboValue2,
                    this.#cboValue3, this.#cboValue4);

                Dialog.showMessageDialog('Artifact RNG', 'Sub-stats are removed!');
            }
        });

        // btnSave (btnDisplayStat)
        this.#btnDisplayStat.addEventListener('click', () => {
            const attribute = this.#cboMainStat.value;

            if (this.#isNone(this.#lblAttr1, this.#lblAttr2, this.#lblAttr3)) {
                Dialog.showMessageDialog('Artifact RNG', 'Add Sub-stats!');
            } else if (this.#equals(attribute, this.#lblAttr1, this.#lblAttr2, this.#lblAttr3, this.#lblAttr4)) {
                Dialog.showMessageDialog('Artifact RNG', 'A sub-stat cannot be the same as the main stat!');
            } else {
                this.#displayStats();
                $(this.#modalOverlay).hide();
                Dialog.showMessageDialog('Artifact RNG', 'Stats has been displayed!');
            }
        });
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
                    const message = `
                        <p>
                            Enter the number to add a sub-stat and click 
                            <b>'OK'</b>
                        </p>
                        <p><b>[1]</b> Slot 1</p>
                        <p><b>[2]</b> Slot 2</p>
                        <p><b>[3]</b> Slot 3</p>
                        <p><b>[4]</b> Slot 4</p>
                    `;

                    const response = await Dialog.showInputDialog('Add Sub-Stat', message);

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
                                    this.#addStat(this.#lblAttr3, selectedAttribute, this.#cboValue3);
                                    isAdded = true;
                                    break;
                                case '4':
                                    this.#addStat(this.#lblAttr4, selectedAttribute, this.#cboValue4);
                                    isAdded = true;
                                    break;
                                default:
                                    await Dialog.showMessageDialog('Artifact RNG', 'Enter a number only from 1 to 4!');
                            }
                        }
                    } else if (response.operation === Dialog.CANCEL) {
                        break; // stop loop
                    } else {
                        await Dialog.showMessageDialog('Artifact RNG', 'Enter the slot number to remove the stat!');
                    }
                } while (!isAdded);
            } else {
                await Dialog.showMessageDialog('Artifact RNG', 'Select a substat to add!');
            }
        }
    }

    async #removeSubStat() {
        let isRemoved = false;

        if (this.#isNone(this.#lblAttr1) && this.#isNone(this.#lblAttr2)
            && this.#isNone(this.#lblAttr3) && this.#isNone(this.#lblAttr4)) {
            await Dialog.showMessageDialog('Artifact RNG', 'Slots are empty!');
        } else {
            do {
                const message = `
                    <p>
                        Enter the number to remove a sub-stat and click 
                        <b>'OK'</b>
                    </p>
                    <p><b>[1]</b> Slot 1</p>
                    <p><b>[2]</b> Slot 2</p>
                    <p><b>[3]</b> Slot 3</p>
                    <p><b>[4]</b> Slot 4</p>
                `;

                const response = await Dialog.showInputDialog('Remove Sub-Stat', message);

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
                            this.#removeStat(this.#lblAttr3, this.#cboValue3);
                            isRemoved = true;
                            break;
                        case "4":
                            this.#removeStat(this.#lblAttr4, this.#cboValue4);
                            isRemoved = true;
                            break;
                        default:
                            await Dialog.showMessageDialog('Artifact RNG', 'Enter a number only from 1 to 4!');
                    }
                } else if (response.operation === Dialog.CANCEL) {
                    break; // stop the loop
                } else {
                    await Dialog.showMessageDialog('Artifact RNG', 'Enter the slot number to remove the stat!');
                }
            } while (!isRemoved);
        }
    }

    #defaultValue(...cboValues) {
        for (const cboValue of cboValues) {
            // empty the list
            $(cboValue).empty();

            // create an option label
            const optionLabel = document.createElement('option');
            optionLabel.disabled = true;
            optionLabel.innerText = '-- Select a Value --';
            optionLabel.setAttribute('class', 'text');

            // zero value
            const value = document.createElement('option');
            value.value = '0';
            value.innerText = 0;
            value.setAttribute('class', 'text');

            cboValue.append(optionLabel, value);
        }
    }

    #removeStat(lblAttr, cboValue) {
        let temp = null;

        if (this.#isNone(lblAttr)) {
            Dialog.showMessageDialog('Artifact RNG', `The slot is empty!`);
            temp = lblAttr.innerText;
        } else {
            temp = lblAttr.innerText;
            lblAttr.innerText = 'None';
            this.#defaultValue(cboValue);
        }

        if (temp !== 'None') {
            Dialog.showMessageDialog('Artifact RNG', `${temp} is removed!`);
        }
    }

    #displayStats() {
        const artifactPiece = this.#cboArtifactPiece.value;
        const mainAttribute = this.#cboMainStat.value;

        let att1 = this.#lblAttr1.innerText;
        let att2 = this.#lblAttr2.innerText;
        let att3 = this.#lblAttr3.innerText;
        let att4 = this.#lblAttr4.innerText;

        const value1 = Number(this.#cboValue1.value);
        const value2 = Number(this.#cboValue2.value);
        const value3 = Number(this.#cboValue3.value);
        const value4 = Number(this.#cboValue4.value);

        if (att4 === 'None') {
            att4 = null;
            this.#artifact_piece.setMaxUpgrade(4);
        } else {
            this.#artifact_piece.setMaxUpgrade(5);
        }

        this.#artifact_piece.setArtifactPiece(artifactPiece);
        this.#artifact_piece.setMainAttribute(mainAttribute);
        this.#artifact_piece.setSlot(att1, att2, att3, att4);
        this.#artifact_piece.setValue(value1, value2, value3, value4);

        this.#artifact_piece.generateStat();
        this.#pMaxUpgradeValue.innerText = this.#artifact_piece.getMaxUpgrade();
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


    #addStat(lblAttr, selectedAttribute, cboValue) {
        lblAttr.innerText = selectedAttribute;
        this.#setValue(lblAttr, cboValue);
        Dialog.showMessageDialog('Artifact RNG', `${selectedAttribute} is added!`);
    }

    #setValue(lblAttr, cboValue) {
        let isMatch = false;

        for (const attributes of Attribute.STATS) {
            if (lblAttr.innerText === attributes.getAttribute()) {
                this.#setStatValue(cboValue, attributes.getValues());
                isMatch = true;
                break;
            }
        }

        if (!isMatch) {
            throw new Error(`Invalid Attribute: ${attribute}`);
        }
    }

    #isNone(...lblAttributes) {
        let isNone = false;

        for (const lblAttr of lblAttributes) {
            if (lblAttr.innerText === 'None') {
                isNone = true;
                break;
            }
        }

        return isNone;
    }

    #equals(attribute, ...lblAttributes) {
        return lblAttributes.some(lblAttr => attribute === lblAttr.innerText);
    }

    #setStatValue(cboValue, listValue) {
        // empty the list
        $(cboValue).empty();

        // create an option label
        const optionLabel = document.createElement('option');
        optionLabel.disabled = true;
        optionLabel.innerText = '-- Select a Value --';
        optionLabel.setAttribute('class', 'text');

        cboValue.appendChild(optionLabel);

        // adds the artifact pieces to the <select> element
        for (const value of listValue) {
            const option = document.createElement('option');
            option.value = value;
            option.innerText = value;
            option.setAttribute('class', 'text');
            cboValue.appendChild(option);
        }
    }

    #setMainStatList(artifactPiece) {
        // empty the list
        $(this.#cboMainStat).empty();

        // create an option label
        const optionLabel = document.createElement('option');
        optionLabel.disabled = true;
        optionLabel.innerText = '-- Select Main Stat --';
        optionLabel.setAttribute('class', 'text');

        this.#cboMainStat.appendChild(optionLabel);

        // adds the artifact pieces to the <select> element
        for (const piece of artifactPiece) {
            const option = document.createElement('option');
            option.value = piece;
            option.innerText = piece;
            option.setAttribute('class', 'text');
            this.#cboMainStat.appendChild(option);
        }
    }

    #setSubStatList(listAttribute) {
        // adds the artifact pieces to the <select> element
        for (const attribute of listAttribute) {
            const li = document.createElement('li');
            li.innerText = attribute;
            this.#subStatList.appendChild(li);
        }
    }

    setAsMemoryAddress(artifact_piece) {
        this.#artifact_piece = artifact_piece;
    }
}