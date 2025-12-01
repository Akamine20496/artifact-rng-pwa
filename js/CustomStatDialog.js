// Class CustomStatDialog
class CustomStatDialog {
    static #isCustomStatDisplayed = false;

    #modalOverlay = document.getElementById('modalOverlay');
    #attribute = Attribute.getInstance();
    #artifact = new Artifact();
    #artifactStat = null;
    #btnClose = document.getElementById('btnClose');
    #cboArtifactPiece = document.getElementById('cboArtifactPiece2');
    #cboMainStat = document.getElementById('cboMainStat');
    #subStatList = document.getElementById('subStatList');
    #subStats = this.#subStatList.getElementsByTagName('li');
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
    #btnFinalizeStat = document.getElementById('btnFinalizeStat');
    #definedAffixMode = false;
    #enablePreviewSubStat = false;

    // initial selected index
    #selectedIndex = -1;

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
            option.className = 'text';
            optionGroup.appendChild(option);
        }

        this.#cboArtifactPiece.appendChild(optionGroup);

        this.#setMainStatList(this.#artifact.getFlower());
        this.#defaultValue(
            this.#cboValue1, this.#cboValue2,
            this.#cboValue3, this.#cboValue4
        );

        // When the user clicks on <span> (x), close the modal
        this.#btnClose.addEventListener('click', () => {
            this.setVisible(false);
            CustomStatDialog.#isCustomStatDisplayed = false;
        });

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

            if (this.#attribute.isNotSpecialAttribute(selectedValue)) {
                arrAttributes = Attribute.ATTRIBUTES_NAMES.filter(element => element !== selectedValue);
            } else {
                Attribute.ATTRIBUTES_NAMES.forEach(element => arrAttributes.push(element));
            }

            this.#listHeader.innerText = `SUB-STAT LIST (${selectedValue})`;
            this.#setSubStatList(arrAttributes);
        });

        // click event listener
        this.#cboMainStat.addEventListener('click', () => {
            this.#cboMainStat.dispatchEvent(new Event('change'));
        });

        // shortcut to open the btnAddSubStat (desktop)
        document.addEventListener('keyup', (e) => {
            if (e.key === 'Enter' && $(this.#subStatList).children().hasClass('selected')) {
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
                this.#cboValue3.style.visibility = 'hidden';
                this.#cboValue4.style.visibility = 'hidden';

                this.#cboValue1.disabled = true;
                this.#cboValue2.disabled = true;
                this.#cboValue3.disabled = true;
                this.#cboValue4.disabled = true;

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
                this.#cboValue3.style.visibility = 'visible';
                this.#cboValue4.style.visibility = 'visible';

                this.#cboValue1.disabled = false;
                this.#cboValue2.disabled = false;
                this.#cboValue3.disabled = false;
                this.#cboValue4.disabled = false;

                if (!this.#isNone(this.#lblAttr1.innerText)) {
                    this.#setValue(this.#lblAttr1, this.#cboValue1);
                }

                if (!this.#isNone(this.#lblAttr2.innerText)) {
                    this.#setValue(this.#lblAttr2, this.#cboValue2);
                }
            }
        });

        // btnAddSubStat
        this.#btnAddSubStat.addEventListener('click', async () => {
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
                        let dialogMessage = '';
    
                        if (this.#definedAffixMode) {
                            dialogMessage = `
                                <p>
                                    Enter the number to add a sub-stat and click 
                                    <b>'OK'</b>
                                    
                                    <br><br>
    
                                    Selected Sub-Stat: <b>${selectedAttribute}</b>
                                </p>
                                <p><b>[1]</b> Slot 1 (${this.#lblAttr1.innerText})</p>
                                <p><b>[2]</b> Slot 2 (${this.#lblAttr2.innerText})</p>
                            `;
                        } else {
                            dialogMessage = `
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
                        }
    
                        const response = await Dialog.showInputDialog('Add Sub-Stat', dialogMessage);
    
                        if (response.output !== null) {
                            if (this.#equals(selectedAttribute, this.#lblAttr1, this.#lblAttr2, this.#lblAttr3, this.#lblAttr4)) {
                                await Dialog.showMessageDialog('Artifact RNG', `${selectedAttribute} is already been added!`);
                            } else {
                                switch (response.output) {
                                    case '1':
                                        this.#addSubStat(this.#lblAttr1, selectedAttribute, this.#cboValue1);
                                        isAdded = true;
                                        break;
                                    case '2':
                                        this.#addSubStat(this.#lblAttr2, selectedAttribute, this.#cboValue2);
                                        isAdded = true;
                                        break;
                                    case '3':
                                        if (!this.#definedAffixMode) {
                                            this.#addSubStat(this.#lblAttr3, selectedAttribute, this.#cboValue3);
                                            isAdded = true;
                                            break;
                                        }
                                    case '4':
                                        if (!this.#definedAffixMode) {
                                            this.#addSubStat(this.#lblAttr4, selectedAttribute, this.#cboValue4);
                                            isAdded = true;
                                            break;
                                        }
                                    default:
                                        await Dialog.showMessageDialog('Artifact RNG', 
                                            `Enter a number only ${this.#definedAffixMode ? '1 and 2' : 'from 1 to 4'}!`);
                                }
                            }
                        } else if (response.option === Dialog.CANCEL_OPTION) {
                            break; // stop loop
                        } else {
                            await Dialog.showMessageDialog('Artifact RNG', 'Enter the slot number to add the sub-stat!');
                        }
                    } while (!isAdded);
                } else {
                    await Dialog.showMessageDialog('Artifact RNG', 'Select a sub-stat to add!');
                }
            }
        });

        // btnRemoveSubStat
        this.#btnRemoveSubStat.addEventListener('click', async () => {
            // remove selected attribute if there is
            $(this.#subStatList).find('li.selected:first').removeClass('selected');

            let isRemoved = false;

            if (this.#isNone(this.#lblAttr1.innerText) && this.#isNone(this.#lblAttr2.innerText)
                && this.#isNone(this.#lblAttr3.innerText) && this.#isNone(this.#lblAttr4.innerText)) {
                    await Dialog.showMessageDialog('Artifact RNG', 'Slots are empty!');
            } else {
                do {
                    let dialogMessage = '';

                    if (this.#definedAffixMode) {
                        dialogMessage = `
                            <p>Enter the number to remove a sub-stat and click 
                                <b>'OK'</b>
                            </p>
                            <p><b>[1]</b> Slot 1 (${this.#lblAttr1.innerText})</p>
                            <p><b>[2]</b> Slot 2 (${this.#lblAttr2.innerText})</p>
                        `;
                    } else {
                        dialogMessage = `
                            <p>
                                Enter the number to remove a sub-stat and click 
                                <b>'OK'</b>
                            </p>
                            <p><b>[1]</b> Slot 1 (${this.#lblAttr1.innerText})</p>
                            <p><b>[2]</b> Slot 2 (${this.#lblAttr2.innerText})</p>
                            <p><b>[3]</b> Slot 3 (${this.#lblAttr3.innerText})</p>
                            <p><b>[4]</b> Slot 4 (${this.#lblAttr4.innerText})</p>
                        `;
                    }

                    const response = await Dialog.showInputDialog('Remove Sub-Stat', dialogMessage);

                    if (response.output !== null) {
                        switch (response.output) {
                            case "1":
                                this.#removeSubStat(this.#lblAttr1, this.#cboValue1);
                                isRemoved = true;
                                break;
                            case "2":
                                this.#removeSubStat(this.#lblAttr2, this.#cboValue2);
                                isRemoved = true;
                                break;
                            case "3":
                                if (!this.#definedAffixMode) {
                                    this.#removeSubStat(this.#lblAttr3, this.#cboValue3);
                                    isRemoved = true;
                                    break;
                                }
                            case "4":
                                if (!this.#definedAffixMode) {
                                    this.#removeSubStat(this.#lblAttr4, this.#cboValue4);
                                    isRemoved = true;
                                    break;
                                }
                            default:
                                await Dialog.showMessageDialog('Artifact RNG', 
                                    `Enter a number only ${this.#definedAffixMode ? '1 and 2' : 'from 1 to 4'}!`);
                        }
                    } else if (response.option === Dialog.CANCEL_OPTION) {
                        break; // stop the loop
                    } else {
                        await Dialog.showMessageDialog('Artifact RNG', 'Enter the slot number to remove the sub-stat!');
                    }
                } while (!isRemoved);
            }
        });

        // btnRemoveAll
        this.#btnRemoveAll.addEventListener('click', async () => {
            if (this.#isNone(this.#lblAttr1.innerText) && this.#isNone(this.#lblAttr2.innerText) && 
                    this.#isNone(this.#lblAttr3.innerText) && this.#isNone(this.#lblAttr4.innerText)) {
                await Dialog.showMessageDialog('Artifact RNG', 'There are no sub-stat/s!');
            } else {
                const response = await Dialog.showConfirmDialog('Select an option', 'Remove all sub-stats?');

                if (response.option === Dialog.YES_OPTION) {
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
        });

        // btnSave (btnFinalizeStat)
        this.#btnFinalizeStat.addEventListener('click', async () => {
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
                const response1 = await Dialog.showConfirmDialog('Initial 4 sub-stats?', 
                    'Are these sub-stats initialized with 4 sub-stats? (not 3 sub-stats with preview sub-stat)');

                this.#enablePreviewSubStat = (response1.option === Dialog.NO_OPTION);

                const response2 = await Dialog.showConfirmDialog('Select an option', 'Finalize the stat?');

                if (response2.option === Dialog.YES_OPTION) {
                    this.#displayCustomStat();
                    $(this.#modalOverlay).hide();
                    CustomStatDialog.#isCustomStatDisplayed = true;
                }
            }
        });

        this.#subStatList.addEventListener('click', (event) => {
            if ($(this.#subStatList).children().length !== 0) {
                const clickedItem = event.target;
                setSelectedIndex(Array.from(this.#subStats).indexOf(clickedItem));
            }
        });
        
        document.addEventListener('keydown', (event) => {
            if (this.#selectedIndex !== -1) {
                if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                    event.preventDefault();
        
                    const hasClassSelected = this.#subStats[this.#selectedIndex].classList.contains('selected');
        
                    if (hasClassSelected) {
                        const direction = (event.key === 'ArrowUp') ? -1 : 1;
                        const targetIndex = this.#selectedIndex + direction;
                        if (targetIndex >= 0 && targetIndex < this.#subStats.length) {
                            setSelectedIndex(targetIndex);
                        }
        
                        this.#subStatList.scrollTop += (event.key === 'ArrowUp') ? -20 : 20;
                    }
                }
            }
        });
        
        const setSelectedIndex = (index) => {
            if (this.#selectedIndex !== -1) {
                this.#subStats[this.#selectedIndex].classList.remove('selected');
            }
        
            this.#selectedIndex = index;
            this.#subStats[this.#selectedIndex].classList.add('selected');
        };
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
            value.className = 'text';

            optionGroup.appendChild(value);
            cboValue.appendChild(optionGroup);
        }
    }

    async #addSubStat(lblAttr, selectedAttribute, cboValue) {
        lblAttr.innerText = selectedAttribute;
        
        if (!this.#definedAffixMode) {
            this.#setValue(lblAttr, cboValue);
        }

        await Dialog.showMessageDialog('Artifact RNG', `${selectedAttribute} is added!`);
    }

    async #removeSubStat(lblAttr, cboValue) {
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

    #displayCustomStat() {
        const artifactPiece = this.#cboArtifactPiece.value;
        const mainAttribute = this.#cboMainStat.value;

        const attr1 = this.#lblAttr1.innerText;
        const attr2 = this.#lblAttr2.innerText;
        const attr3 = this.#lblAttr3.textContent === 'None' ? null : this.#lblAttr3.innerText;
        const attr4 = this.#lblAttr4.textContent === 'None' ? null : this.#lblAttr4.innerText;

        const value1 = +this.#cboValue1.value;
        const value2 = +this.#cboValue2.value;
        const value3 = +this.#cboValue3.value;
        const value4 = +this.#cboValue4.value;

        const subStat4 = this.#enablePreviewSubStat ? new ArtifactSubStat(null, 0.0) : new ArtifactSubStat(attr4, value4);
        
        this.#artifactStat.setArtifactPiece(artifactPiece);
        this.#artifactStat.setMainAttribute(mainAttribute);
        this.#artifactStat.updateArtifactSubStats(
            new ArtifactSubStat(attr1, value1), 
            new ArtifactSubStat(attr2, value2),
            new ArtifactSubStat(attr3, value3), 
            subStat4
        );

        if ((attr1 !== null && attr2 !== null) && (attr3 === null || this.#definedAffixMode)) {
            this.#artifactStat.generateDefinedAffixModeSubStats();
        } else {
            if (attr4 === null) {
                this.#artifactStat.setMaxUpgrade(4);
                this.#artifactStat.generateSubStatPreviewForFourthSubStat();
            } else if (this.#enablePreviewSubStat) {
                this.#artifactStat.setMaxUpgrade(4);
                this.#artifactStat.getSubStatAt(3).setSubStatPreview(new SubStatPreview(attr4, value4));
            } else {
                this.#artifactStat.setMaxUpgrade(5);
            }
        }

        // clear the object
        this.#artifactStat = null;
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

    #setSubStatValue(cboValue, arrValues) {
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
            option.className = 'text';
            optionGroup.appendChild(option);
        }

        cboValue.appendChild(optionGroup);
    }

    #setValue(lblAttr, cboValue) {
        let isMatch = false;
        
        for (let i = 0; i < Attribute.VALUE_STATS.length; i++) {
            const valueStat = Attribute.VALUE_STATS[i];

            if (lblAttr.innerText === valueStat.getAttributeName()) {
                this.#setSubStatValue(cboValue, valueStat.getAttributeValues());
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
            option.className = 'text';
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

    static setIsCustomStatDisplayedToFalse() {
        this.#isCustomStatDisplayed = false;
    }

    static getIsCustomStatDisplayed() {
        return this.#isCustomStatDisplayed;
    }

    setAsMemoryAddress(artifactStat) {
        if (artifactStat instanceof ArtifactStat) {
            this.#artifactStat = artifactStat;
        } else {
            throw new TypeError("Not an instance of ArtifactStat Class");
        }
    }

    setVisible(isVisible) {
        // accept only true or false
        if (typeof isVisible !== 'boolean') {
            throw new Error('Input must be only true or false.');
        }

        if (isVisible) {
            $('#modalContent *').removeClass('disabled');
            $(modalOverlay).fadeIn(300).css('display', 'flex');
        } else {
            $('.selected:first').removeClass('selected');
            $('#modalContent *').addClass('disabled');
            $(modalOverlay).fadeOut(300);
        }
    }
}