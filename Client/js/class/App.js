class App {
    
        constructor (){


            this.url = "http://localhost/EcoleDuNum/Webservices/TP/TP-WEBSERVICE/API";

            // login
            this.$form_login = $("#login_form");//formulaire
            this.$usernamelogin = $("#usernamelogin"); // champ texte
            this.$passewordlogin = $("#passewordlogin");

            this.$addlogin = $("#addlogin"); //btn

            //signup
            this.$form_signup = $("#signup_form");//formulaire
            this.$usernamesignup = $("#usernamesignup"); 
            this.$passewordsignup = $("#passewordsignup");

            this.$addsignup = $("#addsignup"); //btn


            //event en cours
            this.currentEvent = null; // permet de stocker l'event en cours d'edition

            // formulaire ajout des events 
            this.$form_event = $("#add-event");//formulaire
            this.$event = $("#event"); // champ texte
            this.$description = $("#description");
            this.$date_start_event = $("#date_start");
            this.$date_end_event = $("#date_end");
            this.$datefinevent = $("#date_end").datepicker("getDate");

            this.$add = $("#add"); // bouton ajouter form event

             // formulaire ajout des categories
             this.$form_categorie = $("#add_categorie");//formulaire
             this.$titlecategorie = $("#titlecategorie"); // champ titre
            
             this.$addcat = $("#addcat"); // bouton ajouter form categorie

            
            // fenetre information & description de l'event
            this.$infos= $("#eventinfos");
            this.$titre = $("#container_eventinfos h2");
            this.$descriptioninfos = $("#descriptioninfos");
            this.$d_event = $("#d_event");
            this.$e_event = $("#e_event");

            //alerts event Oftheday and closeOfthetoday
            this.$eventstoday =$('#events_today');
            this.$alerttoday = $('#alert .alert-success');
            this.$eventsClosetoday =$('#events_closetoday');
            this.$alertClosetoday = $('#alert .alert-info');

            //affiche olds events
            this.$showoldevents = $('#showoldevents');
            this.$eventstodelete = $('#eventstodelete');
            this.$events_old = $("#events_old");
            

            // calendar
            this.$datepicker = $("#datepicker");
            this.$eventcalendaractive = $('.ui-state-default.ui-state-active');

            // variables static pour event et alerts et calendar
            this.today = new Date();

            this.todayplus1days = new Date(); // JS recup la date du jour = un objet -> var du jour+1
            this.todayplus1days.setDate(this.today.getDate()+1);
            this.todayplus2days = new Date(); // JS recup la date du jour = un objet -> var du jour+2
            this.todayplus2days.setDate(this.today.getDate()+2);
            this.todayplus3days = new Date(); // JS recup la date du jour = un objet -> var du jour+3
            this.todayplus3days.setDate(this.today.getDate()+3);  


            this.events = []; // tableau objets events
            this.eventsOftheday = []; //tableau objets alerttoday
            this.eventsCloseOftheday = []; //tableau objets alertclosetoday
            this.eventsOldToShow = []; //tableau objets eventsOldtoshow
            

            // on declanche des instanciations des que new app

            this.$alerttoday.hide();
            this.$alertClosetoday.hide();
            this.$events_old.hide();

            var that = this;
            this.readEvents(function(){
                that.displaydatecalendar();// affiche la date du jour dans le calendar
                that.setAlertToday(); // set alert les events du jour
                that.displayAlertToday();// affiche alerts des events du jour
                that.setAlertCloseToday(); // set alert les events proche du jour
                that.displayAlertCloseToday();// affiche les alertes des event proche du jour
                that.setOldEventsToShow(); // set les events anciens
                that.displayOldEventsToShow();// affiche les events anciens
                that.initPickersCalendar();
                // that.CalendarEventDay(today);
            }); // lire boucle sur event dans events sur le bdd

            this.initPickersCalendar(); // init le datepicker calendar
            // this.displaydatecalendar();// affiche la date du jour dans le calendar
            // this.setAlertToday(); // set alert les events du jour
            // this.displayAlertToday();// affiche alerts des events du jour
            // this.setAlertCloseToday(); // set alert les events proche du jour
            // this.displayAlertCloseToday();// affiche les alertes des event proche du jour
            // this.setOldEventsToShow(); // set les events anciens
            // this.displayOldEventsToShow();// affiche les events anciens
            // this.initPickersCalendar();
            // this.CalendarEventDay();

            

            this.reinit(); //initialise valeur event + hide form et infos event + categorie

        }

        reinit(){
            this.$form_login.hide();
            this.$form_login.slideUp(300);
            this.$usernamelogin.val("");
            this.$passewordlogin.val("");
            this.$form_signup.hide();
            this.$form_signup.slideUp(300);
            this.$usernamesignup.val("");
            this.$passewordsignup.val("");
            this.$form_event.hide();
            this.$form_event.slideUp(300);
            this.$event.val("");
            this.$description.val("");
            this.$date_start_event.val("");
            this.$date_end_event.val("");
            this.$infos.hide();
            this.$infos.slideUp(300); 
            this.$form_categorie.hide();
            this.$form_categorie.slideUp(300);
            this.$titlecategorie.val("");
            
        }


        ////// gestion des events ///////////

        addEvent( event ){
            this.events.push( event );
        }

        saveEvents(event){

            // saveEvents via API

                        var that = this;
                        $.ajax({
                            url : this.url + "/event",
                            method : "POST",
                            data : {
                                title : event.name,
                                content : event.description,
                                date_event_start : that.dateToString(event.datestartevent),
                                date_event_end : that.dateToString(event.dateendevent),
                                userId : "1",
                                catId : "1"
                            },
                            dataType : "json",
                            success : function( data ){
                                // console.log( data );
                                if( data.success == true ){
                                    event.id = data.id;
                                    event.display();
                                    that.addEvent( event );
                                }
                                else {
                                    alert( "Une erreur est survenue lors de l'enregistrement !" );
                                }
                
                            },
                            error : function( error ){
                                console.log( error );
                            }
                        })
            
            // save via localstorage
            // le locale storage ne peut enregistere que des chaines de caracter
            // on utilise JSON.stringify pour trnasformer un tableau d'objet en chaine de cgharactere JSON/
            // var eventString  = JSON.stringify( this.events );
            // localStorage.setItem("events", eventString);


        }
        
        readEvents(callback) {
            // read les events via api

            var that = this;
            $.ajax({
                url : this.url +"/events",
                method : "get",
                dataType : "json",
                success : function( data ){
                    
                    for( var data_event of data ){
                        var event = new Event( data_event.title, data_event.content, new Date(data_event.date_event_start), new Date(data_event.date_event_end) ) ;
                        event.id = data_event.id; // recupere l'event id pour s'en reservie ex: delete, uptade ...
                        that.addEvent( event );
                        event.display();
                    }
                    callback();
                },
                error : function( error ){
                      console.log( error );
                }
            });

            // read les events via localstorage
            // var eventString = localStorage.getItem("events");
            // var events = JSON.parse( eventString );
            // if(!events){ // s'il n y a pas d'event dans le LS alors on arrete le read
            //     return;
            // }
            // for(var eventObject of events){
            //     var event = new Event ( eventObject.name, eventObject.description, new Date(eventObject.datestartevent), new Date(eventObject.dateendevent) );
            //     this.addEvent( event );
            // }
        }



        // displayEvents(){
        //     for( var event of this.events ){
        //         event.display();
        //     }
        // }


        removeEvent(index){
            
            var event = this.events[index]; // on recupere l'event pour appeler destroy

            var that = this;
            $.ajax({
                url : this.url +"/event/" + event.id,
                method : "DELETE",
                dataType : "json",
                success : function( data ){
    
                    if( data.success == true ){
                        event.$dom.fadeOut(300, function(){
                            event.destroy(); // on retire du DOM
                        })
                        
                        that.events.splice(index, 1);
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

        //// init datepicker Form Event ///  

        initPickersEvents(){
            var options = {
                closeText: 'Fermer',
                prevText: '&#x3c;Préc',
                nextText: 'Suiv&#x3e;',
                currentText: 'Aujourd\'hui',
                monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
                'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
                monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
                'Jul','Aou','Sep','Oct','Nov','Dec'],
                dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
                dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
                dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: '',
                minDate: 0,
                maxDate: '+12M +0D',
                // minDate: new Date (2018, 0, 1), // en cas resa debut fixe 
                // maxDate: new Date (2018,  11, 31),
                // beforeShowDay: $.datepicker.noWeekends,
                // beforeShowDay: $.proxy(this.ClosedDay, this), // pour ne pas perdre le this en tant que mon app
                numberOfMonths: 1,
                showButtonPanel: true
        
                };
        
                this.$date_start_event.datepicker( options);
                this.$date_end_event.datepicker( options);
        
        
            }

            ////  GESTION DES ALERTES DU JOUR ///

            setAlertToday(){
                
               var datedujour = this.today.getDate();
               this.eventsOftheday =[]; // vide le tableau des alertes avant chaque set
            
                        for(var eventa of this.events){ // pour chaque date de debut d'event = a la date d'aujourdhui
                            if( eventa.datestartevent.getDate() == datedujour ){
                               this.addAlertToday(eventa);
                               
                            }
                            
                        }
                    
            }

            addAlertToday(eventOftheday){
                this.eventsOftheday.push( eventOftheday );
                this.$alerttoday.show();
            }

            displayAlertToday(){
                
                var html="";
                for(var eventOftheday of this.eventsOftheday){
                    html += "<li>";
                    html += "<span>" + eventOftheday.name+ "</span><br>";
                    html += "<span>" + eventOftheday.description+ "</span><br>";
                    html += "<span> fin : " + eventOftheday.dateendevent.toLocaleDateString()+ "</span><br>";
                    html += "<hr>";
                    html += "</li>";
                }
                
                this.$eventstoday.html(html);
                

            }


            ////  GESTION DES ALERTES PROCHE JOUR ///

            setAlertCloseToday(){
                var aujourdhui = this.today.getTime();
                var aujourdhuiplus1 = this.today.getTime()+1*(24*60*60*1000);
                var aujourdhuiplus2 = this.today.getTime()+2*(24*60*60*1000);
                var aujourdhuiplus3 = this.today.getTime()+3*(24*60*60*1000);

               this.eventsCloseOftheday =[]; // vide le tableau des alertesCloseToday avant chaque set
            
                        for(var eventac of this.events){ // pour chaque date de debut d'event = a la date d'aujourdhuiplus3 jours
                            if( aujourdhui <= eventac.datestartevent.getTime() &&  eventac.datestartevent.getTime() <= aujourdhuiplus3){
                               this.addAlertCloseToday(eventac);  
                            }
                            
                        }
                    
            }


            addAlertCloseToday(eventCloseOftheday){
                this.eventsCloseOftheday.push( eventCloseOftheday );
                this.$alertClosetoday.show();
            }

            displayAlertCloseToday(){
                
                var html="";
                for(var eventCloseOftheday of this.eventsCloseOftheday){
                    html += "<li>";
                    html += "<span>" + eventCloseOftheday.name+ "</span><br>";
                    html += "<span>" + eventCloseOftheday.description+ "</span><br>";
                    html += "<span> debut : " + eventCloseOftheday.datestartevent.toLocaleDateString()+ "</span><br>";
                    html += "<hr>";
                    html += "</li>";
                }
                
                this.$eventsClosetoday.html(html);   

            }


            ////  GESTION DES EVENTS PERIMES ///

            setOldEventsToShow(){
                
               var aujourdhui = this.today.getTime()-1*(24*60*60*1000);
            
               this.eventsOldToShow =[]; // vide le tableau des eventsOlToShow avant chaque set
            
                        for(var eventos of this.events){ // pour chaque date de fin d'event < a la date d'aujourdhui getTime
                            
                            if(   aujourdhui > eventos.dateendevent.getTime() ){
                               this.addOldEventsToShow(eventos);
                               
                            }
                            
                        }
                    
            }

            addOldEventsToShow(eventOldToShow){
                this.eventsOldToShow.push( eventOldToShow );
                this.$events_old.show();
            }

            displayOldEventsToShow(){
                
                var html="";
                for(var eventOldToShow of this.eventsOldToShow){
                    html += "<li>";
                    html += "<span>" + eventOldToShow.name+ "</span>";
                    html += "<span>" + eventOldToShow.description+ "</span>";
                    html += "<span> terminé le : " + eventOldToShow.dateendevent.toLocaleDateString() + "</span><br>";
                    html += "<hr>";
                    html += "</li>";
                }
                
                this.$events_old.html(html);   

            }

            removeOldEvent(index){

                var event = this.events[index]; // on recupere l'oldevent pour appeler destroy

                var that = this;
                $.ajax({
                    url : this.url +"/event/" + event.id,
                    method : "DELETE",
                    dataType : "json",
                    success : function( data ){
        
                        if( data.success == true ){
                            event.$domoldevent.fadeOut(300, function(){
                                event.destroyOldEvent(); // on retire du DOM
                            })
                            
                            that.events.splice(index, 1);
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


            removeAllOldEvents(){


                var that = this;
                $.ajax({
                    url : this.url +"/oldevents",
                    method : "DELETE",
                    dataType : "json",
                    success : function( data ){
        
                        if( data.success == true ){

                            that.eventsOldToShow =[];
                            that.$events_old.hide();
                                      
                        }
                        else {
                            alert("Il n'y a plus d'évenement à supprimer !");
                        }
        
                    },
                    error : function( error ){
                        console.log(error);
                    }
                });
  
            }

                
                //// init datepicker for calendar///  

        initPickersCalendar(){
            var options = {
                closeText: 'Fermer',
                prevText: '&#x3c;Préc',
                nextText: 'Suiv&#x3e;',
                currentText: 'Aujourd\'hui',
                monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
                'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
                monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
                'Jul','Aou','Sep','Oct','Nov','Dec'],
                dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
                dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
                dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
                weekHeader: 'Sm',
                dateFormat: 'dd/mm/yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: '',
                maxDate: '+12M +0D',
                // minDate: new Date (2016, 8, 1), 
                
                beforeShowDay: $.proxy(this.CalendarEventDay, this), // pour ne pas perdre le this en tant que mon app
                onSelect: $.proxy(this.onSelectDateCalendar, this),
                numberOfMonths: 1,
                showButtonPanel: true


                    // onSelect: function(dateText) {
                    //     var date,
                    //         selectedDate = new Date(dateText),
                    //         i = 0,
                    //         this.$event = null;
                        
                    //     while (i < this.$events.length && !this.$event) {
                    //         date = events[i].Date;
        
                    //         if (selectedDate.valueOf() === date.valueOf()) {
                    //             event = events[i];
                    //         }
                    //         i++;
                    //     }
                    //     if (event) {
                    //         alert(event.Title);
                    //     }
                    // }
        
                }; // fin options
        
                 this.$datepicker.datepicker(options);
                 
                    // this.$datepicker.datepicker( "options", "beforeShowDay", true);

            }

            displaydatecalendar(){
                
                                // les noms de jours / mois
                                 var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi");
                                 var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre");
                                 
                                    var datea = this.today; // on recupere la date
                                    $('#day').html(jours[datea.getDay()]);
                                    $('#mnt').html(mois[datea.getMonth()]);
                                    $('#date').html(datea.getDate());
                                 }
                
               
            CalendarEventDay(date){ 
                
                        if(!this.events){ // s'il n y a pas d'event alors on arrete la boucle
                        return [false, ""];
                        }

                        for(var key in this.events){ //  var "key" "in" tableau events
                        var event = this.events[key]; // fait passer la "key" du tableau dans une variable 
                        
                        // if( event.datestartevent.getTime()  == date.getTime() ){ 

                        //     return [true, ""];// on affiche le jour calandar
          
                        //         }
console.log(event);
                        if( event.datestartevent  == date ){ 

                            return [true, ""];// on affiche le jour calandar
          
                                }
                        
                        
                    }
                    return [false, ""];//sinon, on cache le jour du calendar
                }

            onSelectDateCalendar(dateText){
                var date;
                var selectedDate = new Date(dateText);

                if(!this.events){ // s'il n y a pas d'event dans le LS alors on arrete la boucle
                return;
                }
                for ( var key in this.events){

                    date = this.events[key].datestartevent;

                    if (selectedDate.valueOf() === date.valueOf()) {
                                     // return  affiche le deatils de l'event    
                    
                    }
                }

            }
            dateToString(date){
                var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
                var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
                var yyyy = date.getFullYear();
        
                return (yyyy + "-" + MM + "-" + dd);
             }  
    } //end APP