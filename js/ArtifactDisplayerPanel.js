// Class ArtifactDisplayerPanel
class ArtifactDisplayerPanel {
	// variables
	#artifactStat = null;
	#lblArtifactPiece = document.getElementById('lblArtifactPiece');
	#lblMainAttribute = document.getElementById('lblMainAttribute');
	#lblSlot1 = document.getElementById('lblSlot1');
	#lblSlot2 = document.getElementById('lblSlot2');
	#lblSlot3 = document.getElementById('lblSlot3');
	#lblSlot4 = document.getElementById('lblSlot4');

	#displayPanel = document.getElementById('displayPanel');
	#hoverPopup = document.getElementById('hoverPopup');

	constructor(artifactStat) {
		if (artifactStat instanceof ArtifactStat) {
			this.#artifactStat = artifactStat;
		} else {
			throw new TypeError("Not an instance of ArtifactStat Class");
		}

		// Desktop
		this.#displayPanel.addEventListener('mousemove', (e) => {
			if (!this.#artifactStat.getDefinedAffixMode()) {
				this.#hidePopup();
				return;
			}

			this.#showPopup(e.clientX, e.clientY);
		});

		this.#displayPanel.addEventListener('mouseleave', () => this.#hidePopup());

		// Mobile
		this.#displayPanel.addEventListener('touchstart', (e) => {
			if (!this.#artifactStat.getDefinedAffixMode()) return;
			const touch = e.touches[0];
			this.#showPopup(touch.clientX, touch.clientY);
		});

		// Hide popup on tap anywhere else
		document.addEventListener('touchstart', (e) => {
			if (!this.#displayPanel.contains(e.target)) {
				this.#hidePopup();
			}
		});

		// Hide popup on scroll (good UX on mobile)
		window.addEventListener('scroll', () => this.#hidePopup(), true);
	}

	displayStat() {
		console.log(this.#artifactStat.toString());

		const artifactPiece = this.#artifactStat.getArtifactPiece();
		const mainAttribute = this.#artifactStat.getMainAttribute();

		this.#lblArtifactPiece.innerText = artifactPiece !== null ? artifactPiece : 'None';
		this.#lblMainAttribute.innerText = mainAttribute !== null ? mainAttribute : 'None';

		const lblSlots = [this.#lblSlot1, this.#lblSlot2, this.#lblSlot3, this.#lblSlot4];

		const length = this.#artifactStat.getArraySubStatsLength();

		for (let index = 0; index < length; index++) {
			const subStat = this.#artifactStat.getSubStatAt(index);
			let text = this.#displaySubStat(subStat.getSubStat());
			let color = lblSlots[index].style.color;

			if (index === length - 1 && this.#artifactStat.getMaxUpgrade() === 4) {
				if (subStat.getIsInitialValueEmpty()) {
					text = `(${subStat.getSubStat()})`;
					color = 'rgba(88, 88, 88, 0.6)';
				} else {
					color = 'rgb(88, 88, 88)';
				}
			} else if (this.#artifactStat.getMaxUpgrade() === 0) {
				color = 'rgb(88, 88, 88)';
			}

			lblSlots[index].innerText = text;
			lblSlots[index].style.color = color;
		}
	}

	#displaySubStat(subStat) {
		return `· ${subStat}`;
	}

	#getPopupText() {
		let text = '<b>Defined Affix Mode</b><br>';
		text += `These sub-stats will share a guaranteed at least <b>2</b> rolls when fully upgraded.<br><br>`;
		text += `Chosen sub-stats:<br>`;

		for (const [key, value] of Object.entries(this.#artifactStat.getSubStatUpgradeCounts())) {
			text += `· ${key} (${value})<br>`;
		}

		return text;
	}

	#showPopup(x, y) {
		this.#hoverPopup.innerHTML = this.#getPopupText();
		this.#hoverPopup.style.display = 'block';

		const offsetX = 30;
		const offsetY = 30;
		const popupRect = this.#hoverPopup.getBoundingClientRect();
		const screenW = window.innerWidth;
		const screenH = window.innerHeight;

		let posX = x + offsetX;
		let posY = y + offsetY;

		if (posX + popupRect.width > screenW) {
			posX = x - popupRect.width - offsetX;
		}

		if (posY + popupRect.height > screenH) {
			posY = y - popupRect.height - offsetY;
		}

		posX = Math.max(0, Math.min(posX, screenW - popupRect.width));
		posY = Math.max(0, Math.min(posY, screenH - popupRect.height));


		this.#hoverPopup.style.left = `${posX}px`;
		this.#hoverPopup.style.top = `${posY}px`;
	}

	#hidePopup() {
		this.#hoverPopup.style.display = 'none';
	}
}