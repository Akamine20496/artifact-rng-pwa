// Class Dialog
class Dialog {
    static OK = 1;
    static CANCEL = 0;

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

        /*
            dialogData      =   contains the data of the input dialog

            output          =   output of the dialog (input). null is default value
            outputLength    =   length of the output
            operation       =   operations of the buttons in dialog. 0 is default value
                                1 - Ok
                                0 - Cancel
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
                message.innerText = textMessage;

                btnOk.addEventListener('click', () => {
                    // close the dialog
                    inputDialog.close();

                    // remove the element                                       
                    $(inputDialog).remove();

                    // update the data of dialog
                    dialogData.output = !input.value ? null : input.value;
                    dialogData.outputLength = input.value.length;
                    dialogData.operation = 1;

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogData);
                });

                btnCancel.addEventListener('click', () => {
                    // close the dialog
                    inputDialog.close();

                    // remove the element
                    $(inputDialog).remove();

                    // update the data of dialog
                    dialogData.outputLength = input.value.length;
                    dialogData.operation = 0;

                    // Resolve the promise to indicate that the modal has been closed
                    resolve(dialogData);
                });
            }
        });
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

                    setTimeout(() => {
                        // remove the element
                        $(messageDialog).remove();
                    }, 20);

                    // Resolve the promise to indicate that the modal has been closed
                    resolve();
                });
            }
        });
    };
}