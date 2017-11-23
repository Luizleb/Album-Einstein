$(function(){
    $('#comment-add').hide();
    $('#btn-comment').on('click', function(evt){
        evt.preventDefault();
        $('#comment-add').show();   
    });
    
    $('#btn-like').on('click', function(evt){
        evt.preventDefault();
        $(this).blur();
        var imgId = $(this).data('id');
        $.post('/images/'+imgId+'/like').done(function(data){
            $('.likes-count').text(data.likes);
        });
    });
});