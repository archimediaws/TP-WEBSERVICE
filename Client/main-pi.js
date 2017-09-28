var app = new App();

app.$add.click(function(){

    app.$form.slideToggle(200);

});

app.$form.submit(function( event ){

    event.preventDefault(); //Empeche le rechargement

    var title = app.$title.val();
    var content = app.$content.val();

    var date = new Date();
    date = date.getDate() + "/" + ( date.getMonth() + 1 )  + "/" + date.getFullYear();

    var note = new Note( title, content, date );
    
    app.saveNote( note );

    app.reinit();    

});

/* A utiliser en cas de création dynamique -> en effet le click est bindé sur tout le document
et vérifie si l'élément cible est de type ".close" */
$(document).on("click", ".close", function(event){ 

    event.stopPropagation();

    var index = $(".close").index( $(this) );
    app.removeNote( index );

});

$(document).on('click', '.post-it', function(){
    var index = $('.post-it').index( $(this) );
    var note = app.notes[index];
    app.detail( note );
});

app.$detail.submit(function(event){

    event.preventDefault();
    app.updateNote( app.lastSelectedNote );

});