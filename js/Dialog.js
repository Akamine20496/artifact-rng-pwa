// Class Dialog
class Dialog {
    /**
     * State of the Input Dialog OK (1)
     */
    static OK_OPTION = 1;
    /**
     * State of the Input Dialog CANCEL (0)
     */
    static CANCEL_OPTION = 0;
    /**
     * State of the Confirm Dialog YES (1)
     */
    static YES_OPTION = 1;
    /**
     * State of the Confirm Dialog NO (0)
     */
    static NO_OPTION = 0;

    /**
     * method of Dialog Class that allows user input
     * @param {string} textTitle Title of the dialog (only plain text)
     * @param {html} textMessage Message of the dialog for user to see (allows element tags)
     * @returns data of dialog upon resolve().
     */
    static async showInputDialog(textTitle, textMessage) {
        // create elemeents
        const inputDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('div');
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
        divButtons.setAttribute('class', 'divButtons');
        btnOk.setAttribute('id', 'btnOk');
        btnOk.innerText = 'OK';
        btnCancel.setAttribute('id', 'btnCancel');
        btnCancel.innerText = 'Cancel';

        // append the elements
        divButtons.append(btnOk, btnCancel);
        inputDialog.append(title, message, input, divButtons);
        $(document.body).prepend(inputDialog);

        /*
         * dialogData       =   contains the data of the input dialog
         * 
         * output           =   output of the dialog (input). null is default value
         * outputLength     =   length of the output
         * operation        =   operations of the buttons in dialog. 0 is default value
         *                      1 - OK
         *                      0 - CANCEL
         */
        const dialogData = {
            output: null,
            outputLength: 0,
            operation: 0,
        };

        return new Promise((resolve) => {
            if (!inputDialog.open) {
                // Display the modal with the message
                inputDialog.showModal();

                // show the message
                title.innerText = textTitle;
                message.innerHTML = textMessage;

                // focus on the text field
                input.focus();

                function handleOnKeyDownInputDialog(event) {
                    if (event.key === 'Enter' && event.target === input) {
                        event.preventDefault();
                        btnOk.dispatchEvent(new Event('click'));
                    }
                }

                // add keydown listener
                document.addEventListener('keydown', handleOnKeyDownInputDialog);

                btnOk.addEventListener('click', () => {
                    // close the dialog
                    inputDialog.close();

                    // remove the element    
                    inputDialog.remove();

                    // update the data of dialog
                    dialogData.output = !input.value ? null : input.value;
                    dialogData.outputLength = input.value.length;
                    dialogData.operation = 1;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownInputDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogData);
                });

                btnCancel.addEventListener('click', () => {
                    // close the dialog
                    inputDialog.close();

                    // remove the element
                    inputDialog.remove();

                    // update the data of dialog
                    dialogData.operation = 0;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownInputDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogData);
                });
            }
        });
    }

    /**
     * method of Dialog Class that shows information message
     * @param {string} textTitle Title of the dialog (only plain text)
     * @param {html} textMessage Message of the dialog for user to see (allows element tags)
     * @returns nothing, it is only for displaying messages
     */
    static async showMessageDialog(textTitle, textMessage) {
        // create the elements
        const messageDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('div');
        const divButtons = document.createElement('div');
        const btnOk = document.createElement('button');
        // add aatributes
        messageDialog.setAttribute('id', 'messageDialog');
        title.setAttribute('id', 'title');
        message.setAttribute('id', 'message');
        divButtons.setAttribute('class', 'divButtons');
        btnOk.setAttribute('id', 'btnOk');
        btnOk.innerText = 'OK';

        // append the elements
        divButtons.append(btnOk);
        messageDialog.append(title, message, divButtons);
        $(document.body).prepend(messageDialog);

        return new Promise((resolve) => {
            if (!messageDialog.open) {
                // Display the modal with the message
                messageDialog.showModal();

                // show the message
                title.innerText = textTitle;
                message.innerHTML = textMessage;

                // focus on the button
                btnOk.focus();

                function handleOnKeyDownMessageDialog(event) {
                    if (event.key === 'Enter' && document.activeElement === btnOk) {
                        event.preventDefault();
                        btnOk.dispatchEvent(new Event('click'));
                    }
                }

                // add keydown listener
                document.addEventListener('keydown', handleOnKeyDownMessageDialog);

                // Listen for the close event of the modal
                btnOk.addEventListener('click', () => {
                    // Close the modal
                    messageDialog.close();

                    // remove the element
                    messageDialog.remove();

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownMessageDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve();
                });
            }
        });
    };

    /**
     * method of Dialog Class that asks for YES or NO answer
     * @param {string} textTitle Title of the dialog (only plain text)
     * @param {html} textMessage Message of the dialog for user to see (allows element tags)
     * @returns operation of the dialog upon resolve()
     */
    static async showConfirmDialog(textTitle, textMessage) {
        // create the elements
        const confirmDialog = document.createElement('dialog');
        const title = document.createElement('h4');
        const message = document.createElement('div');
        const divButtons = document.createElement('div');
        const btnYes = document.createElement('button');
        const btnNo = document.createElement('button');
        // add aatributes
        confirmDialog.setAttribute('id', 'confirmDialog');
        title.setAttribute('id', 'title');
        message.setAttribute('id', 'message');
        divButtons.setAttribute('class', 'divButtons');
        btnYes.setAttribute('id', 'btnYes');
        btnYes.innerText = 'Yes';
        btnNo.setAttribute('id', 'btnNo');
        btnNo.innerText = 'No';

        // append the elements
        divButtons.append(btnYes, btnNo);
        confirmDialog.append(title, message, divButtons);
        $(document.body).prepend(confirmDialog);

        // Operation of the dialog. (1) YES, (0) NO
        let dialogOperation = 0;

        return new Promise((resolve) => {
            if (!confirmDialog.open) {
                // Display the modal with the message
                confirmDialog.showModal();

                // show the message
                title.innerText = textTitle;
                message.innerHTML = textMessage;

                // focus on the button
                btnYes.focus();

                function handleOnKeyDownConfirmDialog(event) {
                    if (event.key === 'Enter' && document.activeElement === btnYes) {
                        event.preventDefault();
                        btnYes.dispatchEvent(new Event('click'));
                    }
                }

                // add keydown listener
                document.addEventListener('keydown', handleOnKeyDownConfirmDialog);

                btnYes.addEventListener('click', () => {
                    // Close the modal
                    confirmDialog.close();

                    // remove the element
                    confirmDialog.remove();

                    dialogOperation = 1;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownConfirmDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogOperation);
                });

                btnNo.addEventListener('click', () => {
                    // Close the modal
                    confirmDialog.close();

                    // remove the element
                    confirmDialog.remove();

                    dialogOperation = 0;

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownConfirmDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogOperation);
                });
            }
        });
    }
}