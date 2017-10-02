class Event {
    
        constructor ( name, description, datestartevent, dateendevent){
            this.name = name;
            this.description = description;
            this.datestartevent = datestartevent;
            this.dateendevent = dateendevent;
            
            this.$dom = null; // pour le DOM
            this.$domoldevent = null;
            // var standar
            this.today = new Date(); // JS recup la date du jour = un objet -> var du jour

    
        }
    
        display(){
            
            var aujourdhui = this.today.getTime();
            
            
            var aujourdhuiplus1 = this.today.getTime()+1*(24*60*60*1000);
            var aujourdhuiplus2 = this.today.getTime()+2*(24*60*60*1000);
            var aujourdhuiplus3 = this.today.getTime()+3*(24*60*60*1000);
           
            var datedujour = this.today.getDate();
            var date = new Date();
            var datedujourplus1 = date.setDate(datedujour+1);
            var datedujourplus2 = date.setDate(datedujour+2);
            var datedujourplus3 = date.setDate(datedujour+3);
            
        
            // si la date d'aujourd'hui = date de debut de levent -> vert
            if(datedujour == this.datestartevent.getDate() ){

                var div = "<div class='event' style='background-color:#72C088;'>";
                div += "<div class='closetoday'>X</div>";
                div += "<h2>"+ this.name +"</h2>";
                div += "<p>"+ this.description +"</p>";
                div += "<p> debut :"+ this.datestartevent.toLocaleDateString() +"</p>";
                div += "<p> fin :"+ this.dateendevent.toLocaleDateString() +"</p>";
                div += "<di class='openeventinfos'> voir details </div>";
                div += "</div>";

            this.$dom = $(div);//$("<div></div>") // creer un element JQUERY pour ajouter au DOM
            $("#container_events").append( this.$dom ); // pour le rajouter au DOM

            }

            // si la date de fin de l'event inf à la date d'aujourd'hui -> orange
            else if( this.dateendevent.getTime() < aujourdhui ){
                
                 var div = "<div class='event' style='background-color:#EC971F'>";
                div += "<div class='closeold'>X</div>";
                div += "<h2>"+ this.name +"</h2>";
                div += "<p>"+ this.description +"</p>";
                div += "<p> debut :"+ this.datestartevent.toLocaleDateString() +"</p>";
                div += "<p> fin :"+ this.dateendevent.toLocaleDateString() +"</p>";
                // div += "<di class='openeventinfos'> voir details </div>";
                div += "</div>";
                

            this.$domoldevent = $(div);
            $("#container_events").append( this.$domoldevent ); // pour le rajouter au DOM
                
            }
            // si la date de debut de l'event + 3 jours = la date d'aujourd'hui -> bleu
            else if(aujourdhui <= this.datestartevent.getTime() &&  this.datestartevent.getTime() <= aujourdhuiplus3 ) {
                
                 var div = "<div class='event' style='background-color:#51789B;'>";
                div += "<div class='closeto'>X</div>";
                div += "<h2>"+ this.name +"</h2>";
                div += "<p>"+ this.description +"</p>";
                div += "<p> debut :"+ this.datestartevent.toLocaleDateString() +"</p>";
                div += "<p> fin :"+ this.dateendevent.toLocaleDateString() +"</p>";
                div += "<di class='openeventinfos'> voir details </div>";
                div += "</div>";
                
            this.$dom = $(div);//$("<div></div>") // creer un element JQUERY pour ajouter au DOM
            $("#container_events").append( this.$dom ); // pour le rajouter au DOM
                
            }

            else{

            var div = "<div class='event'>";
            div += "<div class='close'>X</div>";
            div += "<h2>"+ this.name +"</h2>";
            div += "<p>"+ this.description +"</p>";
            div += "<p> debut :"+ this.datestartevent.toLocaleDateString() +"</p>";
            div += "<p> fin :"+ this.dateendevent.toLocaleDateString() +"</p>";
            // div += "<p>"+ aujourdhuiplus3 +"</p>";
            div += "<di class='openeventinfos'> voir details </div>";
            div += "</div>";
    
            this.$dom = $(div);//$("<div></div>") // creer un element JQUERY pour ajouter au DOM
            $("#container_events").append( this.$dom ); // pour le rajouter au DOM
                
            }
            
        }


        
        destroy(){
            this.$dom.remove(); //retire du DOM
        }
        destroyOldEvent(){
            this.$domoldevent.remove(); //retire du DOM
        }
    
    }