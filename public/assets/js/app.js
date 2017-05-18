$(document).ready(function () {

// Set article bookmark value to true when bookmark button clicked
    $('.bookmark-btn').on("click", function () {
        let id = $(this).attr("data-id");
        let buttonHit = $(this);
        $.ajax({
            method: "POST",
            url: `/bookmark/${id}`
        }).done(function(){
            buttonHit.removeClass('btn-warning')
                .addClass('btn-success')
                .text(' Bookmarked')
                .prepend('<i class="fa fa-bookmark"></i>');
            })
    });
});
