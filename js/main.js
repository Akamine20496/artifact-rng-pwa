// ready function
$(document).ready(() => {
    // Credits
    console.log('%cArtifact RNG by AKAMiNE', 'font-family: SegoeUI; color: red; font-size: 20px; font-weight: bold;');
    console.log('%cCredits to Genshin Impact Wiki for the data', 'font-family: SegoeUI; color: red; font-size: 20px; font-weight: bold;');
    console.log('%chttps://genshin-impact.fandom.com/wiki/Artifact/Distribution', 'font-family: SegoeUI; text-decoration: underline; cursor: pointer;');

    const messages = {
        artifactSimulatorMsg: `
            <style>
                .center {
                    text-align: center;
                }

                .indent {
                    text-indent: 1rem;
                }
            </style>
            <p class='center'>
				This application is <b>exclusive</b> only for 5 star artifact
			</p> <br>
			<p>
				<b>Max Upgrade</b>: Displays the number of upgrades an artifact can have.
			</p>
			<p>
				<b>Lock</b>: Locks the combo box and some buttons that are not needed.
			</p>
		    <p>
				<b>Generate</b>: Displays the main stat selected by the user, artifact piece, 
                and generates random sub-stats and their values.
			</p>
			<p>
			    <b>Roll</b>: Upgrades a random value of a sub-stat.
			</p>
			<p>
				<b>Reroll</b>: Removes the upgrades of the sub-stats.
			</p>
			<p>
				<b>Reset</b>: Clears the main stat, sub-stats, and their values.
			</p>
			<p>
				<b>Custom Stat</b>: Allows you to enter your own stats.
			</p> <br>
			<p>
				If the sub-stats are 3 only, it will have <b>1 New Sub-Stat and 4 Upgrades</b>. 
				If the sub-stats are 4, it will have <b>5 Upgrades</b>.
			</p> <br>
			<p>
				<b>Flags</b>
            </p>
            <p class='indent'>
                <b>Random Stat</b>: Generate random artifact piece with random values.
            </p>
            <p class='indent'>
                <b>Full Upgrade</b>: Upgrades the value to the max upgrade. 
                (Need 'Random Stat' to be selected first)
            </p> <br>
            <p>
                These flags only works if it's "Unlock". Otherwise, it will not work when it's "Lock".
            </p> <br>
            <p>
                Occasionally, it may display incorrect decimals due to rounding errors.
            </p> <br>
            <p class='center'>
                Click <b>'OK'</b> to continue.
            </p>
        `,
        customStatMsg: `
            <style>
                .center {
                    text-align: center;
                }

                .indent {
                    text-indent: 1rem;
                }
            </style>
            <p>
                <b>Select an artifact piece and main stat</b>. 
                After selecting the main stat, the sub-stats will be displayed in the list.
            </p> <br>
            <p>
                <b>Adding a Sub-Stat</b>
                <p class='indent'>
                    Click the <b>'Add Sub-Stat'</b> button.
                </p>
                <p class='indent'>
                    Select the slot where you want to add the sub-stat, then 
                    click <b>'OK'</b>.
                </p>
            </p>
            <p>
                <b>Removing a Specific Sub-Stat</b>
                <p class='indent'>
                    Click the <b>'Remove Sub-Stat'</b> button.
                </p>
                <p class='indent'>
                    Select the slot where you want to remove the sub-stat, then 
                    click <b>'OK'</b>.
                </p>
            </p>
            <p>
                <b>Removing All Sub-Stats</b>
                <p class='indent'>
                    Click the <b>'Remove All'</b> button.
                </p>
            </p> <br>
            <p>
                You can place <b>3 or 4 sub-stats</b>.
            </p> <br>
            <p>
                <b>** TIP **</b> <br>
                <p class='indent'>
                    <b>For Desktop Users</b>: To quickly add a sub-stat, select it 
                    and press "ENTER" instead of clicking the button.
                </p>
                <p class='indent'>
                    <b>For Mobile Users (also works for Desktop Users)</b>: Double tap/click
                    the sub-stat to appear the adding for sub-stat.
                </p>
            </p> <br>
            <p class='center'>
                Click <b>'OK'</b> to continue.
            </p>
        `
    };

    // async function
    async function displayMessages() {
        // Show the first message
        await Dialog.showMessageDialog('Artifact RNG', messages.artifactSimulatorMsg);

        // Show the second message
        await Dialog.showMessageDialog('Artifact RNG - Custom Stat', messages.customStatMsg);
    };

    // execute the function
    displayMessages();

    // instance of Artifact Simulator Class
    new Artifact_Simulator();
});