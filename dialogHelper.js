var dialogIcon = {
    Alert: 'ui-icon ui-icon-alert',
    Info: 'ui-icon-info'
};

(function (dialogHelper, $, undefined) {
   
    dialogHelper.openDialog = function (dialogName, options, onOKCallback) {

        let dialogPrefix = "dialog_";
        let dialogID = dialogPrefix + dialogName;
        let dialogHTML = "<div id='" + dialogID + "'dialog' title='' style='display: none;'>" +                  
                            "<p style='float: left; margin: 12px 12px 20px 0;'>" +
                                "<span id='icon' class='ui-icon'></span>" +
                                "<span id='message'></span>" +
                            "</p>" +
                         "</div>";   

        let body = $("body");
        body.append(dialogHTML);

        let dialog = body.find("#" + dialogID);

        $(dialog).dialog({
            title: options.title,
            autoOpen: options.autoOpen,
            resizable: options.resizable,
            height: "auto",
            width: options.width,
            modal: options.modal,
            buttons: {
                "OK": function () {
                    onOKCallback();
                    $(this).dialog("close");
                },
                Cancel: function () {
                    $(this).dialog("close");
                }
            }
        });

        $(dialog).on("dialogclose", function (event, ui) {
            let divToDelete = body.find("#" + dialogID);
            divToDelete.remove();
        });

        dialog.find("span#message").text(options.message);
        dialog.find("span#icon").addClass(options.icon);

        $(dialog).dialog("open");
    }

}(window.dialogHelper = window.dialogHelper || {}, jQuery));