$(() => {
    // Credits
    console.info(`%c
            Artifact RNG by AKAMiNE
            Credits to the links below for the data

            According to KeqingMains, In a 5 star artifact specifically, 
            the probabilities of getting 3 sub-stats and 4 sub-stats at +0
            varies from where you obtained the artifact.

            80% and 20% respectively from the Domains and Spiral Abyss.
            66% and 34% respectively from the Strongbox (Mystic Offering) and Boss Drops.

            In my Web Application, I used the 66 - 34 as probability for 
            generating 3 sub-stats and 4 sub-stats respectively.
        `, 'font-family: Segoe UI; color: red; font-size: 0.750rem; font-weight: bold; line-height: 1rem;'
    );
    console.info(`%c
            https://genshin-impact.fandom.com/wiki/Artifact/Distribution

            https://keqingmains.com/misc/artifacts/#Substats
        `, 'font-family: Segoe UI; font-size: 0.750rem; cursor: pointer;'
    );

    const APP_VERSION = 'v9.0.0';
    
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
                <b>Generate</b>: Displays the artifact piece selected by the user 
                and generates random main stat (for sands, goblet, circlet piece) and sub-stats.
            </p>
            <p>
                <b>Roll</b>: Upgrades a random value of a sub-stat.
            </p>
            <p>
                <b>Reroll</b>: Removes the upgrades of the sub-stats.
            </p>
            <p>
                <b>Reset</b>: Clears the artifact piece, main stat, and sub-stats.
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
                <b>Random Stat</b>: Generate random artifact piece, random main stat 
                (for sands, goblet, circlet piece), and sub-stats.
            </p>
            <p class='indent'>
                <b>Full Upgrade</b>: Upgrades the sub-stats's value to the max upgrade. 
                (Need 'Random Stat' to be selected first)
            </p> <br>
            <p>
                These flags only works if it's "Lock". Otherwise, it will not work when it's "Unlock".
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
                You can place <b>first 2 sub-stats and first 3 or 4 sub-stats</b>.
            </p> <br>
            <p>
                If you only placed first 2 sub-stats, the rest will automatically generated whether you
                will have 3 sub-stats or 4 sub-stats.
            </p> <br>
            <p>
                <b>Can display stats if</b>
                <p class='indent'>Slot 1 and Slot 2 are filled</p>
                <p class='indent'>Slot 1 to 3 are filled or Slot 1 to 4 are filled</p>
            </p>
            <p>
                <b>Cannot display stats if</b>
                <p class='indent'>All Slots are empty</p>
                <p class='indent'>Slot 1 and Slot 2 are empty but Slot 3 and Slot 4 are filled</p>
            </p> <br>
            <p>
                <b>Defined Affix Mode</b>
                <p>
                    This mode works like new gadget "Artifact Transmuter". You will have to 
                    choose <b>artifact piece (for sands, goblet, circlet piece) </b>, <b>main stat</b>, 
                    and <b>2 sub-stats</b>. The rest will automatically generate.
                </p>
                <p>The catch is that you can't choose initial value, it will be automically generated as well.</p>
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

    $('#currentVersion').text(APP_VERSION);

    // execute the function
    displayMessages();

    // instance of Artifact Simulator Class
    new ArtifactSimulator();
});