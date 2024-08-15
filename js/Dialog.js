// Class Dialog
class Dialog {
    /**
     * State of the Input Dialog OK (1)
     */
    static OK = 1;
    /**
     * State of the Input Dialog CANCEL (0)
     */
    static CANCEL = 0;

    /**
     * method of Dialog Class that allows user input
     * @param {innerText} textTitle Title of the dialog (only plain text)
     * @param {innerHTML} textMessage Message of the dialog for user input (allows element tags)
     * @returns data of dialog upon resolve().
     */
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

        /**
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
                    if (event.key === 'Enter' && document.activeElement === input) {
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
                    $(inputDialog).remove();

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
                    $(inputDialog).remove();

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
     * method of Dialog Class that shows message
     * @param {innerText} textTitle Title of the dialog (only plain text)
     * @param {innerHTML} textMessage Message of the dialog for user input (allows element tags)
     * @returns nothing, it is only for displaying messages
     */
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

                    setTimeout(() => {
                        // remove the element
                        $(messageDialog).remove();
                    }, 20);

                    // remove keydown listener
                    document.removeEventListener('keydown', handleOnKeyDownMessageDialog);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve();
                });
            }
        });
    };
}