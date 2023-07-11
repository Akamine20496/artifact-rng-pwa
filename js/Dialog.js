class Dialog {
    static async showInputDialog(textTitle, textMessage) {
        // create elemeents
        const inputDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('p');
        const input = document.createElement('input');
        const divButtons = document.createElement('div');
        const btnOk = document.createElement('button');
        const btnCancel = document.createElement('button');
        // add attributes
        inputDialog.setAttribute('id', 'inputDialog');
        title.setAttribute('id', 'title');
        message.setAttribute('id', 'message');
        input.setAttribute('id', 'txtInput');
        input.type = 'text';
        divButtons.setAttribute('id', 'divButtons');
        btnOk.setAttribute('id', 'btnOk');
        btnOk.innerText = 'OK';
        btnCancel.setAttribute('id', 'btnCancel');
        btnCancel.innerText = 'Cancel';

        // append the elements
        divButtons.append(btnOk, btnCancel);
        inputDialog.append(title, message, input, divButtons);
        $('body').prepend(inputDialog);

        return new Promise((resolve) => {
            if (!inputDialog.open) {
                // Display the modal with the message
                inputDialog.showModal();

                // show the message
                title.innerText = textTitle;
                message.innerText = textMessage;

                btnOk.addEventListener('click', () => {
                    // store the value to the session storage
                    sessionStorage.setItem('inputValue', input.value);
                    // remove the element
                    $(inputDialog).remove();

                    // Resolve the promise to indicate that the modal has been closed
                    resolve();
                });

                btnCancel.addEventListener('click', () => {
                    // remove the stored value
                    sessionStorage.removeItem('inputValue');
                    // remove the element
                    $(inputDialog).remove();

                    // Resolve the promise to indicate that the modal has been closed
                    resolve();
                });
            }
        });
    }

    static async getInputText() {
        return sessionStorage.getItem('inputValue');
    }

    static async getInputLength() {
        const inputValue = sessionStorage.getItem('inputValue');
        return Number(inputValue.length);
    }

    static async showMessageDialog(textTitle, textMessage) {
        // create the elements
        const messageDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('p');
        const btnOk = document.createElement('button');
        // add aatributes
        messageDialog.setAttribute('id', 'messageDialog');
        title.setAttribute('id', 'title');
        message.setAttribute('id', 'message');
        btnOk.setAttribute('id', 'btnOk');
        btnOk.innerText = 'OK';

        // append the elements
        messageDialog.append(title, message, btnOk);
        $('body').prepend(messageDialog);

        return new Promise((resolve) => {
            if (!messageDialog.open) {
                // Display the modal with the message
                messageDialog.showModal();
                // show the message
                title.innerText = textTitle;
                message.innerText = textMessage;

                // Listen for the close event of the modal
                btnOk.addEventListener('click', () => {
                    // Close the modal
                    messageDialog.close();
                    // remove the element
                    $(messageDialog).remove();

                    // Resolve the promise to indicate that the modal has been closed
                    resolve();
                });
            }
        });
    };
}