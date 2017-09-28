class App {

    constructor(){


        this.url = "http://localhost/API";

        this.$form = $("#create");
        this.$detail = $("#detail");
        this.$title_detail = $("#title_detail");
        this.$content_detail = $("#content_detail");
        this.$title = $("#title");
        this.$content = $("#content");
        this.$add = $("#add");
        

        this.lastSelectedNote = null;
        this.notes = [];

        //On declenche des l'instanciation
        this.readNotes();
        this.reinit();
    }

    reinit() {
        this.$form.slideUp(300);
        this.$detail.fadeOut(300);
        this.$title.val("");
        this.$content.val("");
    }

    addNote( note ){
        this.notes.push( note );
    }

    saveNote( note ){

        var that = this;
        $.ajax({
            url : this.url +"/note",
            method : "POST",
            data : {
                title : note.title,
                content : note.content
            },
            dataType : "json",
            success : function( data ){

                if( data.success == true ){
                    note.id = data.id;
                    note.display();
                    that.addNote( note );
                }
                else {
                    alert( "Une erreur est survenue lors de l'enregistrement !" );
                }

            },
            error : function( error ){
                console.log( error );
            }
        })

    }

    readNotes(){
        var that = this;
        $.ajax({
            url : this.url +"/notes",
            method : "get",
            dataType : "json",
            success : function( data ){
                
                for( var data_note of data ){
                    var note = new Note( data_note.title, data_note.content );
                    note.id = data_note.id;
                    that.addNote( note );
                    note.display();
                }

            },
            error : function( error ){
                // console.log( error );
            }
        });
    }

    removeNote(index){
        var note = this.notes[index];
        var that = this;
        $.ajax({
            url : this.url +"/note/" + note.id,
            method : "DELETE",
            dataType : "json",
            success : function( data ){

                if( data.success == true ){
                    note.destroy();
                    that.notes.splice(index, 1);
                }
                else {
                    alert("Un problème est survenu lors de la suppression !");
                }

            },
            error : function( error ){
                console.log(error);
            }
        });
    }

    detail( note ){

        var that = this;

        $.ajax({
            url: this.url +"/note/" + note.id,
            method: "GET",
            dataType: "json",
            success : function( data ){

                if( data.success == true ){
                    
                    that.lastSelectedNote = note;
                    that.$title_detail.val( data.note.title );
                    that.$content_detail.val( data.note.content );
                    that.$detail.fadeIn(300);

                }
                else {
                    alert("Une erreur est survenu lors de la récupération !");
                }

            },
            error : function( error ){
                console.log(error);
            }
        });

    }

    updateNote( note ){

        var title = this.$title_detail.val();
        var content = this.$content_detail.val();
        var that = this;
        //Ici pour les requetes PUT uniquement, on stringify les données
        //avec JSON.stringify...
        $.ajax({
            url: this.url +"/note/" + note.id,
            method: "PUT",
            data: JSON.stringify({
                title: title,
                content: content
            }),
            dataType: "json",
            success : function(data){
                
                if( data.success == true ){

                    note.$dom.children("h2").html( title );
                    note.$dom.children("p").html( content );
                    that.$detail.fadeOut(300);

                }
                else {
                    alert("Problème de connection lors de la mise a jour ...");
                }

            },
            error: function(error){
                console.log(error);
            }
        })
    }

}