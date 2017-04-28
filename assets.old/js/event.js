var modal = $("#event-modal");
var modalClose = $("#event-modal-close");
modalClose.click(function () {
    modal.fadeOut();
});
$(document).click(function (e)
{
    var modalContent = $("#event-modal-content");
    if (!modalContent.is(e.target) // if the target of the click isn't the container...
            && modalContent.has(e.target).length === 0) // ... nor a descendant of the container
    {
        modal.fadeOut();
    }
});