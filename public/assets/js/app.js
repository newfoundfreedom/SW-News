$(document).ready(function () {

// Set article bookmark value to true when bookmark button clicked
    $('.bookmark-btn').on("click", function () {
        let thisId = $(this).attr("data-id");
        console.log(thisId);
    });
});
