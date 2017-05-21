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
        // and place that value into the note modal view's save button
        $('#noteSaveButton').attr('data-id', id);
        $.ajax({
            method: 'GET',
            url: `/getnotes/${id}`,
        }).done(function(data){
            $.each(data.note, function( i, v ) {
                let count = i+1;
                $('#previousNotes')
                    .append( `<div class="well"><strong>${v.title} </strong>
<p>${v.body}</p></div>` );
            });
        })
    });

    // Save Note
    // when the article note modal's save button is clicked
    $('#noteSaveButton').on('click', function () {
        // capture the article id from the save button
        let id = $(this).attr('data-id'),
            title = $('#note-title-input').val().trim(),
            body = $('#note-body-input').val().trim();

        // test to see if the note body field is empty
        if(body.length > 0) {
            // if note text is found then post the note information to the
            //  'savenote/:id' endpoint
            $.ajax({
                method: 'POST',
                url: `/savenote/${id}`,
                data: {
                    title: title,
                    body: body
                }
            })
            // when the post route is complete
                .done(function () {
                    // clear modal input fields for next note creation
                    $('#note-title-input').val('');
                    $('#note-body-input').val('');
                    $('#previousNotes').empty()
                })
        }
        // empty out fields regardless of whether or not any new note data was saved
        $('#note-title-input').val('');
        $('#note-body-input').val('');
        $('#previousNotes').empty()
    });

    // Close Note
    // when the notes modal is closed clear all fields
    $('#noteCloseButton').on('click', function () {
        $('#note-title-input').val('');
        $('#note-body-input').val('');
        $('#previousNotes').empty()
    });
});

