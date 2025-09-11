$(document).ready(() => {
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
    `, 'font-family: Segoe UI; color: red; font-size: 0.750rem; font-weight: bold; line-height: 1rem;');

    console.info(`%c
        https://genshin-impact.fandom.com/wiki/Artifact/Distribution

        https://keqingmains.com/misc/artifacts/#Substats

        Artifact Category Distribution Probability
        https://genshin-impact.fandom.com/wiki/Loot_System/Artifact_Drop_Distribution

        Source Link of the genshin wallpaper
        https://i.pinimg.com/originals/dd/6a/53/dd6a53af112346d57377e9b4403bdc9e.jpg
    `, 'font-family: Segoe UI; font-size: 0.750rem; cursor: pointer;');

    const APP_VERSION = 'v15.0.1';

    $('#currentVersion').text(APP_VERSION);

    // instance of Artifact Simulator Class
    new ArtifactSimulator();
});