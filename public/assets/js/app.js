$(document).ready(function () {


    // Set article bookmark value to true when bookmark button clicked
    $('.bookmark-btn').on('click', function () {
        let id = $(this).attr('data-id');
        let buttonHit = $(this);
        $.ajax({
            method: 'POST',
            url: `/bookmark/${id}`
        }).done(function () {
            buttonHit.removeClass('btn-warning')
                .addClass('btn-success')
                .text(' Bookmarked')
                .prepend(`<i class='fa fa-bookmark'></i>&nbsp;`);
        })
    });

    // Set article bookmark value to true when bookmark button clicked
    $('.remove-btn').on('click', function () {
        let id = $(this).attr('data-id');
        $.ajax({
            method: 'POST',
            url: `remove/bookmark/${id}`
        }).done(function () {
            $(`.panel-${id}`).hide();
        })
    });

    //
    // when the note button is clicked
    $('.note-btn').on('click', function () {
        // grab data-id value from the note button
        let id = $(this).attr('data-id');
        // and place that value into the Article Note Modal's save button
        $('#noteSaveButton').attr('data-id', id)
    });

    // Save Note
    // when the article note modal's save button is clicked
    $('#noteSaveButton').on('click', function () {
        // capture the article id from the save button
        let id = $(this).attr('data-id'),
            title = $('#note-title-input').val(),
            body = $('#note-body-input').val();

        // post the note information (captured from the title and body input
        //  fields) to the '/bookmark/:id' endpoint
        $.ajax({
            method: 'POST',
            url: `/savenote/${id}`,
            data: {
                title: title,
                body: body
            }
        })
        // when the post route is complete
            .done(function (data) {
                // clear modal input fields for next note creation
                $('#note-title-input').val('');
                $('#note-body-input').val('');
            })
    })

});

