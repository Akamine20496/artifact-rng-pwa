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

	constructor(artifactStat) {
		if (artifactStat instanceof ArtifactStat) {
            this.#artifactStat = artifactStat;
        } else {
            throw new TypeError("Not an instance of ArtifactStat Class");
        }
	}

	displayStat() {
		console.log(this.#artifactStat.toString());

		const artifactPiece = this.#artifactStat.getArtifactPiece();
		const mainAttribute = this.#artifactStat.getMainAttribute();

		this.#lblArtifactPiece.innerText = artifactPiece !== null ? artifactPiece : 'None';
		this.#lblMainAttribute.innerText = mainAttribute !== null ? mainAttribute : 'None';

		const lblSlots = [this.#lblSlot1, this.#lblSlot2, this.#lblSlot3, this.#lblSlot4];

		for (let index = 0; index < lblSlots.length; index++) {
			lblSlots[index].innerText = this.#displaySubStat(this.#artifactStat.getSubStatAt(index).getSubStat());
		}
	}

	#displaySubStat(subStat) {
		return `· ${subStat}`;
	}
}