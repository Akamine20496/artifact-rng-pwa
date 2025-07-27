class ReshapeResultDialog {
    #artifactStat = null;
    #reshapeConfig = null;
    #dialog = null;

    #lblSlot1Before = null;
    #lblSlot2Before = null;
    #lblSlot3Before = null;
    #lblSlot4Before = null;

    #lblSlot1After = null;
    #lblSlot2After = null;
    #lblSlot3After = null;
    #lblSlot4After = null;

    constructor(artifactStat, reshapeConfig) {
        if (artifactStat instanceof ArtifactStat) {
            this.#artifactStat = artifactStat;
        } else {
            throw new TypeError("Not an instance of ArtifactStat Class");
        }

        if (reshapeConfig instanceof ReshapeConfig) {
            this.#reshapeConfig = reshapeConfig;
        } else {
            throw new TypeError("Not an instance of ReshapeConfig Class");
        }

        this.#dialog = document.createElement('div');
        this.#dialog.className = 'dialog';
        this.#dialog.innerHTML = /*html*/`
            <div class="dialog-title">Reshape Result</div>
            <div class="sub-stat-panels">
                <div class="panel before-panel">
                    <div class="panel-title">Before</div>
                    <div class="slot" id="slot1-before"></div>
                    <div class="slot" id="slot2-before"></div>
                    <div class="slot" id="slot3-before"></div>
                    <div class="slot" id="slot4-before"></div>
                </div>
                <div class="panel-indicator">&#62;</div>
                <div class="panel after-panel">
                    <div class="panel-title">After</div>
                    <div class="slot" id="slot1-after"></div>
                    <div class="slot" id="slot2-after"></div>
                    <div class="slot" id="slot3-after"></div>
                    <div class="slot" id="slot4-after"></div>
                </div>
            </div>
            <div class="bottom-row">
                <div class="guaranteed-rolls">Guaranteed Rolls: ${this.#reshapeConfig.getGuaranteedRollLimit()}</div>
                <div class="button-container">
                    <button id="btn-redo">Redo</button>
                    <button id="btn-close">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.#dialog);

        document.getElementById('btn-redo').addEventListener('click', () => this.displayAfterStat());
        document.getElementById('btn-close').addEventListener('click', () => this.setVisible(false));

        this.#lblSlot1Before = this.#dialog.querySelector('#slot1-before');
        this.#lblSlot2Before = this.#dialog.querySelector('#slot2-before');
        this.#lblSlot3Before = this.#dialog.querySelector('#slot3-before');
        this.#lblSlot4Before = this.#dialog.querySelector('#slot4-before');

        this.#lblSlot1After = this.#dialog.querySelector('#slot1-after');
        this.#lblSlot2After = this.#dialog.querySelector('#slot2-after');
        this.#lblSlot3After = this.#dialog.querySelector('#slot3-after');
        this.#lblSlot4After = this.#dialog.querySelector('#slot4-after');

        this.displayBeforeStat();
        this.displayAfterStat();
        this.applyHighlightToSelectedSlot();

        const style = document.createElement('style');
        style.id = 'reshape-result-dialog-style';
        style.textContent = /*css*/`
            .dialog {
                position: fixed;
                width: 90%;
                max-width: 600px;
                min-width: unset;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgb(235, 235, 235);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0,0,0,0.2);
                z-index: 9999;
                box-sizing: border-box;
            }

            .dialog * {
                font-family: 'Segoe UI', Tahoma, Arial, Verdana, sans-serif;
                font-weight: bold;
            }

            .dialog-title {
                font-size: 18px;
                padding-bottom: 10px;
                margin-bottom: 10px;
                text-align: center;
            }

            .sub-stat-panels {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-bottom: 15px;
            }

            .panel {
                display: flex;
                flex-direction: column;
                flex: 1;
                background: rgb(255, 255, 225);
                padding: 10px;
                border: 1px solid black;
                border-radius: 2px;
                gap: 4px;
                min-height: 160px;
                box-sizing: border-box;
            }

            .panel-title {
                padding: 0;
                font-size: 18px;
                margin-bottom: 5px;
                text-align: center;
            }

            .panel-indicator {
                font-size: 35px;
                font-weight: bold;
                align-self: center;
            }

            .slot {
                padding: 6px 8px;
                font-size: 14px;
                border-radius: 6px;
            }

            .bottom-row {
                display: flex;
                flex-direction: column;
                align-items: stretch;
                gap: 10px;
                margin-top: 10px;
            }

            .guaranteed-rolls {
                font-size: 12px;
                padding: 5px 10px;
                text-align: center;
            }

            .button-container {
                display: flex;
                justify-content: center;
                gap: 10px;
                flex-wrap: wrap;
            }

            #btn-redo, #btn-close {
                padding: 6px 12px;
                cursor: pointer;
            }

            /* Tablet layout */
            @media (min-width: 600px) {
                .dialog {
                    width: 80%;
                }
                .dialog-title {
                    font-size: 20px;
                }
                .sub-stat-panels {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: stretch;
                }
                .panel-indicator {
                    font-size: 40px;
                }
                .bottom-row {
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                }
                .guaranteed-rolls {
                    text-align: left;
                }
            }

            /* Desktop layout */
            @media (min-width: 992px) {
                .dialog {
                    width: 50vw;
                    max-width: 800px;
                }
                .dialog-title {
                    font-size: 22px;
                }
                .panel {
                    min-height: 180px;
                }
                .panel-indicator {
                    font-size: 45px;
                }
            }
        `;
        document.head.appendChild(style);
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
            document.getElementById('reshape-result-dialog-style').remove();
        }
    }

    displayBeforeStat() {
        this.#lblSlot1Before.innerText = this.#artifactStat.getSubStatAt(0).getSubStat();
        this.#lblSlot2Before.innerText = this.#artifactStat.getSubStatAt(1).getSubStat();
        this.#lblSlot3Before.innerText = this.#artifactStat.getSubStatAt(2).getSubStat();
        this.#lblSlot4Before.innerText = this.#artifactStat.getSubStatAt(3).getSubStat();
    }

    displayAfterStat() {
        try {
            const subStat1 = this.#artifactStat.getSubStatAt(0);
            const subStat2 = this.#artifactStat.getSubStatAt(1);
            const subStat3 = this.#artifactStat.getSubStatAt(2);
            const subStat4 = this.#artifactStat.getSubStatAt(3);

            const reshapedArtifactStat = new ArtifactStat(
                this.#artifactStat.getArtifactPiece(),
                this.#artifactStat.getMainAttribute(),
                new ArtifactSubStat(subStat1.getAttributeName(), subStat1.getInitialAttributeValue()),
                new ArtifactSubStat(subStat2.getAttributeName(), subStat2.getInitialAttributeValue()),
                new ArtifactSubStat(subStat3.getAttributeName(), subStat3.getInitialAttributeValue()),
                new ArtifactSubStat(subStat4.getAttributeName(), subStat4.getInitialAttributeValue())
            );
            reshapedArtifactStat.setMaxUpgrade(this.#artifactStat.getMaxUpgrade());
            reshapedArtifactStat.setReshapeConfig(this.#reshapeConfig);

            for (let i = 0; i < reshapedArtifactStat.getMaxUpgrade(); i++) {
                reshapedArtifactStat.upgradeSubStatValue();
            }

            this.#lblSlot1After.innerText = reshapedArtifactStat.getSubStatAt(0).getSubStat();
            this.#lblSlot2After.innerText = reshapedArtifactStat.getSubStatAt(1).getSubStat();
            this.#lblSlot3After.innerText = reshapedArtifactStat.getSubStatAt(2).getSubStat();
            this.#lblSlot4After.innerText = reshapedArtifactStat.getSubStatAt(3).getSubStat();
        } catch (error) {
            Dialog.showMessageDialog("Artifact RNG", "Something went wrong!");
            console.error(error);
        }
    }

    applyHighlightToSelectedSlot() {
        const beforeLabels = [ this.#lblSlot1Before, this.#lblSlot2Before, this.#lblSlot3Before, this.#lblSlot4Before ];
        const afterLabels = [ this.#lblSlot1After, this.#lblSlot2After, this.#lblSlot3After, this.#lblSlot4After ];

        for (let index = 0; index < 4; index++) {
            const subStat = this.#artifactStat.getSubStatAt(index);
            const attr = subStat.getAttributeName();
            if (this.#reshapeConfig.getSubStatUpgradeCounts().hasOwnProperty(attr)) {
                this.highlightLabel(beforeLabels[index]);
                this.highlightLabel(afterLabels[index]);
            }
        }
    }

    highlightLabel(labelElement) {
        labelElement.style.backgroundColor = 'rgb(249, 249, 92)';
    }
}
