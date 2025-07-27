class ReshapeConfigDialog {
    #artifactStat = null;
    #dialog = null;
    #cbGuaranteedRolls = null;
    #checkboxes = null;

    constructor(artifactStat) {
        if (artifactStat instanceof ArtifactStat) {
            this.#artifactStat = artifactStat;
        } else {
            throw new TypeError("Not an instance of ArtifactStat Class");
        }

        this.#dialog = document.createElement('div');
        this.#dialog.className = 'dialog';
        this.#dialog.innerHTML = /*html*/`
            <div class="content-panel">
                <div id="dialog-title-container">
                    <p id="dialog-title">Reshape Configuration</p>
                </div>
                <div id="combobox-container">
                    <label>Guaranteed Rolls</label>
                    <select id="cbGuaranteedRolls">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <p class="instruction">Select 2 sub-stats that will receive guaranteed enhancements.</p>
                <div class="checkboxes">
                    ${[0, 1, 2, 3].map(i => `
                        <label><input type="checkbox" class="chkSlot" data-index="${i}"> ${artifactStat.getSubStatAt(i).getSubStat()}</label>
                    `).join('')}
                </div>
                <div class="buttons">
                    <button id="btnReshape">Reshape</button>
                    <button id="btnCancel">Cancel</button>
                </div>
            </div>
        `;
        this.#dialog.style.display = 'none';
        document.body.appendChild(this.#dialog);

        this.#cbGuaranteedRolls = this.#dialog.querySelector('#cbGuaranteedRolls');
        this.#checkboxes = Array.from(this.#dialog.querySelectorAll('.chkSlot'));

        this.#dialog.querySelector('#btnReshape').addEventListener('click', () => this.onReshape());
        this.#dialog.querySelector('#btnCancel').addEventListener('click', () => this.setVisible(false));
        this.#checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateCheckboxStates());
        });

        const style = document.createElement('style');
        style.id = 'reshape-config-dialog-style';
        style.textContent = /*css*/`
            .dialog {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgb(235, 235, 235);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.2);
                z-index: 9999;
                width: 90%;
                max-width: 500px;
                box-sizing: border-box;
            }

            .dialog * {
                font-family: 'Segoe UI', Tahoma, Arial, Verdana, sans-serif;
                font-weight: bold;
            }

            .content-panel {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            #dialog-title-container {
                display: flex;
                justify-content: flex-start;
                padding-bottom: 10px;
            }

            #dialog-title-container #dialog-title {
                font-size: 18px;
            }

            #combobox-container {
                display: flex;
                align-items: center;
                gap: 5px;
                flex-wrap: wrap;
            }

            #combobox-container #cbGuaranteedRolls {
                width: 60px;
            }

            .instruction {
                background: #fff;
                font-weight: bold;
                padding: 5px;
            }

            .checkboxes {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin: 5px 0;
                gap: 2px;
            }

            .checkboxes label {
                padding: 4px 5px;
                width: 100%;
                background: #ccc;
                font-weight: bold;
                border-radius: 4px;
                box-sizing: border-box;
            }

            .buttons {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                flex-wrap: wrap;
            }

            /* Tablet View */
            @media (min-width: 600px) {
                .dialog {
                    width: 80%;
                }
                #dialog-title-container #dialog-title {
                    font-size: 20px;
                }
                .checkboxes label {
                    width: 75%;
                }
            }

            /* Desktop View */
            @media (min-width: 992px) {
                .dialog {
                    width: 55vw;
                    max-width: 600px;
                }
                #dialog-title-container #dialog-title {
                    font-size: 22px;
                }
                .checkboxes label {
                    width: 65%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    getCheckedIndexes() {
        return this.#checkboxes
            .map((cb, i) => cb.checked ? i : -1)
            .filter(i => i !== -1);
    }

    updateCheckboxStates() {
        const selectedCount = this.getCheckedIndexes().length;
        const shouldDisable = selectedCount >= 2;
        this.#checkboxes.forEach(cb => {
            if (!cb.checked) {
                cb.disabled = shouldDisable;
            }
        });
    }

    onReshape() {
        const selectedIndexes = this.getCheckedIndexes();

        if (selectedIndexes.length === 2) {
            const slotObj = {};

            selectedIndexes.forEach(i => {
                const attrName = this.#artifactStat.getSubStatAt(i).getAttributeName();
                slotObj[attrName] = 0;
            });

            const reshapeResult = new ReshapeResultDialog(
                this.#artifactStat,
                new ReshapeConfig(slotObj, parseInt(this.#cbGuaranteedRolls.value))
            );

            this.setVisible(false);
            reshapeResult.setVisible(true);
        } else {
            Dialog.showMessageDialog("Artifact RNG", "Select exactly 2 slots!");
        }
    }

    setVisible(isVisible) {
        if (typeof isVisible !== 'boolean') {
            throw new Error('Input must be only true or false.');
        }

        if (isVisible) {
            $(this.#dialog).fadeIn(300);
        } else {
            $(this.#dialog).hide();
            this.#dialog.remove();
            document.getElementById('reshape-config-dialog-style').remove();
        }
    }
}
