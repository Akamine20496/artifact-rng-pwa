import Dialog from './Dialog';
import Artifact_Simulator from './Artifact_Simulator';

// ready function
$(document).ready(() => {
    // Credits
    console.log('%cArtifact RNG by AKAMiNE', 'font-family: SegoeUI; color: red; font-size: 20px; font-weight: bold;');
    console.log('%cCredits to Genshin Impact Wiki for the data', 'font-family: SegoeUI; color: red; font-size: 20px; font-weight: bold;');
    console.log('%chttps://genshin-impact.fandom.com/wiki/Artifact/Distribution', 'font-family: SegoeUI; text-decoration: underline; cursor: pointer;');

    const messages = {
        artifactSimulator: "This application is exclusive only for 5 star artifact\n"
                + "Max Upgrade - Displays the number of upgrades an artifact can have\n\n"
                + "Lock - Locks the combo box and some buttons that are not needed\n"
                + "Generate - Displays main stat selected by the user, artifact piece, and\n"
                + "generates random sub-stats and their values\n"
                + "Skip - Directly upgrades the artifact to max\n"
                + "Roll - Upgrades random value of the sub-stat\n"
                + "Reroll - Removes the upgrades of their sub-stats\n"
                + "Reset - Clears the main stat, sub-stats and their values\n"
                + "Custom Stat - Allows you to enter your own stats\n\n"
                + "If the sub-stats are 3 only, it will have 1 New Attribute and 4 Upgrades\n"
                + "If the sub-stats are 4, it will have 5 Upgrades\n\n"
                + "Occasionally, it will display wrong decimals due to rounding error.\n\n"
                + "Click 'OK' to continue.",
        customStat: "Custom Stat\n\n"
                + "Select a artifact piece and main stat. After selecting main stat,\n"
                + "the sub-stats will be displayed to the list.\n\n"
                + "Select a sub-stat from the list and click 'Add Sub Stat'.\n"
                + "Select what slot to add the sub-stat then click 'OK'.\n\n"
                + "To remove a specific sub-stat from the slot, click the 'Remove Sub Stat'.\n"
                + "Select what slot to remove the sub-stat then click 'OK'.\n\n"
                + "To remove all sub-stats from the slots, click the 'Remove All'.\n\n"
                + "After setting up the stats, click 'Save' then click the\n"
                + "'Roll' to upgrade the value.\n\n"
                + "You can place 3 or 4 sub-stats.\n\n"
                + "Tip for Desktop Users:\n"
                + "Select the sub-stat you want to add and press \"ENTER\".\n"
                + "It is the shortcut way instead of selecting a sub-stat then clicking the button.\n\n"
                + "Click 'OK' to continue."
    };
    
    // async function
    async function displayMessages() {
        // Show the first message
        await Dialog.showMessageDialog('Artifact RNG', messages.artifactSimulator);
                  
        // Show the second message
        await Dialog.showMessageDialog('Artifact RNG', messages.customStat);
    };

    // execute the function
    displayMessages();

    // instance of Artifact Simulator Class
    new Artifact_Simulator();
});