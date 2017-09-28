class Note {

    constructor( title, content, date = new Date() ) {

        this.id = 0;
        this.title = title;
        this.content = content;
        this.date = date;
        this.$dom = null;
    }

    display(){

        var div = "<div class='post-it' data-id="+this.id+" >";
        div += "<div class='close'> X </div>";
        div += "<h2>" + this.title +  "</h2>";
        div += "<p>" + this.content + "</p>";
        div += "<i>" + this.date + "</i>";
        div += "</div>";

        this.$dom = $(div); //$("<div></div>")
        $("body").append( this.$dom );
    }

    destroy(){
        this.$dom.remove(); //retire directement l'élément du DOM
    }

}