// retrieve the elements
const modalOverlay = document.getElementById('modalOverlay');
const btnOpenModal = document.getElementById('btnCustomStat');
const btnClose = document.getElementById('btnClose');
const subStatList = document.getElementById('subStatList');
const subStats = subStatList.getElementsByTagName('li');
// initial selected index
let selectedIndex = -1;

// When the user clicks on <span> (x), close the modal
$(btnClose).click(() => {
    $('#modalContent *').addClass('disabled');
    $('.selected:first').removeClass('selected');
    $(modalOverlay).fadeOut(300);
});

$(btnOpenModal).click(() => {
    $('#modalContent *').removeClass('disabled');
    $(modalOverlay).fadeIn(300).css('display', 'flex');
});

$(subStatList).click((event) => {
    if ($(subStatList).children().length !== 0) {
        const clickedItem = event.target;
        setSelectedIndex(Array.from(subStats).indexOf(clickedItem));
    }
});

$(document).keydown((event) => {
    if (selectedIndex !== -1) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();

            const hasClassSelected = subStats[selectedIndex].classList.contains('selected');

            if (hasClassSelected) {
                const direction = (event.key === 'ArrowUp') ? -1 : 1;
                const targetIndex = selectedIndex + direction;
                if (targetIndex >= 0 && targetIndex < subStats.length) {
                    setSelectedIndex(targetIndex);
                }

                subStatList.scrollTop += (event.key === 'ArrowUp') ? -20 : 20;
            }
        }
    }
});

const setSelectedIndex = (index) => {
    if (selectedIndex !== -1) {
        subStats[selectedIndex].classList.remove('selected');
    }

    selectedIndex = index;
    subStats[selectedIndex].classList.add('selected');
};