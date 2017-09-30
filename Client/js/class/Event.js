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
            this.todayplus3days = new Date(); // JS recup la date du jour = un objet -> var du jour-3
            this.todayplus3days.setDate(this.today.getDate()+3);  // set dans objet var du jour-3 la date du jour avec objet var du jour getDate()-3

        }
    
        display(){

            var aujourdhui = this.today.toLocaleDateString();//transforme numerique en string format date locale
            var aujourdhuiplus3 = this.todayplus3days.toLocaleDateString();
            
        
            // si la date d'aujourd'hui = date de debut de levent -> vert
            if(aujourdhui == this.datestartevent ){

                var div = "<div class='event' style='background-color:#72C088;'>";
                div += "<div class='closetoday'>X</div>";
                div += "<h2>"+ this.name +"</h2>";
                div += "<p>"+ this.description +"</p>";
                div += "<p> debut :"+ this.datestartevent +"</p>";
                div += "<p> fin :"+ this.dateendevent +"</p>";
                div += "<di class='openeventinfos'> voir details </div>";
                div += "</div>";

            this.$dom = $(div);//$("<div></div>") // creer un element JQUERY pour ajouter au DOM
            $("#container_events").append( this.$dom ); // pour le rajouter au DOM

            }

            // si la date de fin de l'event supp à la date d'aujourd'hui -> orange
            else if(this.dateendevent < aujourdhui){
                
                 var div = "<div class='event' style='background-color:#EC971F'>";
                div += "<div class='closeold'>X</div>";
                div += "<h2>"+ this.name +"</h2>";
                div += "<p>"+ this.description +"</p>";
                div += "<p> debut :"+ this.datestartevent +"</p>";
                div += "<p> fin :"+ this.dateendevent +"</p>";
                // div += "<di class='openeventinfos'> voir details </div>";
                div += "</div>";
                

            this.$domoldevent = $(div);
            $("#container_events").append( this.$domoldevent ); // pour le rajouter au DOM
                
            }
            // si la date de debut de l'event moins 3 jours = la date d'aujourd'hui -> bleu
            else if(aujourdhuiplus3 == this.datestartevent){
                
                 var div = "<div class='event' style='background-color:#51789B;'>";
                div += "<div class='closeto'>X</div>";
                div += "<h2>"+ this.name +"</h2>";
                div += "<p>"+ this.description +"</p>";
                div += "<p> debut :"+ this.datestartevent +"</p>";
                div += "<p> fin :"+ this.dateendevent +"</p>";
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
            div += "<p> debut :"+ this.datestartevent +"</p>";
            div += "<p> fin :"+ this.dateendevent +"</p>";
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