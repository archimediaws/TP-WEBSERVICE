class App {
    
        constructor (){


            this.currentEvent = null; // permet de stocker l'event en cours d'edition

            // formulaire ajout des events 
            this.$form_event = $("#add-event");//formulaire
            this.$event = $("#event"); // champ texte
            this.$description = $("#description");
            this.$date_start_event = $("#date_start");
            this.$date_end_event = $("#date_end");
            // this.$date_start_3 = $("#date_start_3");
            this.$add = $("#add"); // bouton ajouter form event

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
            this.todayplus3days = new Date(); // JS recup la date du jour = un objet -> var du jour-3
            this.todayplus3days.setDate(this.today.getDate()+3);  // set dans objet var du jour-3 la date du jour avec objet var du jour getDate()-3

            this.events = []; // tableau objets events
            this.eventsOftheday = []; //tableau objets alerttoday
            this.eventsCloseOftheday = []; //tableau objets alertclosetoday
            this.eventsOldToShow = []; //tableau objets eventsOldtoshow

            // on declanche des instanciations des que new app

            this.$alerttoday.hide();
            this.$alertClosetoday.hide();
            this.$events_old.hide();

            
            

            this.readEvents(); // lire boucle sur event dans events sur le LS
            this.initPickersCalendar(); // init le datepicker calendar
            this.setAlertToday(); // set alert les events du jour
            this.displayAlertToday();// affiche alerts des events du jour
            this.setAlertCloseToday(); // set alert les events proche du jour
            this.displayAlertCloseToday();// affiche les alertes des event proche du jour
            this.setOldEventsToShow(); // set les events anciens
            this.displayOldEventsToShow();// affiche les events anciens

            this.displayEvents(); // afiche les events

            this.reinit(); //initialise valeur event + hide form et infos event

        }

        reinit(){
            this.$form_event.hide();
            this.$form_event.slideUp(300);
            this.$event.val("");
            this.$description.val("");
            this.$date_start_event.val("");
            this.$date_end_event.val("");
            this.$infos.hide();
            this.$infos.slideUp(300);  
            
        }


        ////// gestion des events ///////////

        addEvent( event ){
            this.events.push( event );
        }

        saveEvents(){
            // le locale storage ne peut enregistere que des chaines de caracter
            // on utilise JSON.stringify pour trnasformer un tableau d'objet en chaine de cgharactere JSON/
            var eventString  = JSON.stringify( this.events );
            localStorage.setItem("events", eventString);

        }
        
        readEvents() {
            var eventString = localStorage.getItem("events");
            var events = JSON.parse( eventString );

            if(!events){ // s'il n y a pas d'event dans le LS alors on arrete le read
                return;
            }

            for(var eventObject of events){
                var event = new Event ( eventObject.name, eventObject.description, eventObject.datestartevent, eventObject.dateendevent );

                this.addEvent( event );
            }
        }



        displayEvents(){

            for( var event of this.events ){
                event.display();
            }

        }


        removeEvent(index){

            var event = this.events[index]; // on recupere l'event pour appeler destroy
            event.$dom.fadeOut(300, function(){
                event.destroy(); // on retire du DOM
            })
            
            this.events.splice(index, 1); // supprime 1 element à l'index indiqué

        }

        //// init datepicker ///  

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
                
               var aujourdhui = this.today.toLocaleDateString();
               this.eventsOftheday =[]; // vide le tableau des alertes avant chaque set
            
                        for(var eventa of this.events){ // pour chaque date de debut d'event = a la date d'aujourdhui
                            if( eventa.datestartevent == aujourdhui ){
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
                    html += "<span> fin : " + eventOftheday.dateendevent+ "</span><br>";
                    html += "<hr>";
                    html += "</li>";
                }
                
                this.$eventstoday.html(html);
                

            }


            ////  GESTION DES ALERTES PROCHE JOUR ///

            setAlertCloseToday(){
                
            
               var aujourdhuiplus3 = this.todayplus3days.toLocaleDateString();

               this.eventsCloseOftheday =[]; // vide le tableau des alertesCloseToday avant chaque set
            
                        for(var eventac of this.events){ // pour chaque date de debut d'event = a la date d'aujourdhuiplus3 jours
                            if( eventac.datestartevent == aujourdhuiplus3 ){
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
                    html += "<span> debut : " + eventCloseOftheday.datestartevent+ "</span><br>";
                    html += "<hr>";
                    html += "</li>";
                }
                
                this.$eventsClosetoday.html(html);   

            }


            ////  GESTION DES EVENTS PERIMES ///

            setOldEventsToShow(){
                
               var aujourdhui = this.today.toLocaleDateString();
               

               this.eventsOldToShow =[]; // vide le tableau des eventsOlToShow avant chaque set
            
                        for(var eventos of this.events){ // pour chaque date de fin d'event < a la date d'aujourdhui
                            if( eventos.dateendevent < aujourdhui ){
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
                    html += "<span> terminé le : " + eventOldToShow.dateendevent+ "</span><br>";
                    html += "<hr>";
                    html += "</li>";
                }
                
                this.$events_old.html(html);   

            }

            removeOldEvent(index){
                
                            var oldevent = this.events[index]; // on recupere l'oldevent pour appeler destroy
                            oldevent.$domoldevent.fadeOut(300, function(){
                                oldevent.destroyOldEvent(); // on retire du DOM
                            })
                            
                            this.events.splice(index, 1); // supprime 1 element à l'index indiqué
                
                        }


            removeAllOldEvents(){

                var aujourdhui = this.today.toLocaleDateString();
                var dateendevent = this.$date_end_event;
                // that = this; //On sauvegarde le contexte "this" dans une variable

                this.eventsOldToShow =[]; // vide le tableau des eventsOlToShow avant 
                var tableauKey = [];
                //remove sur tableau events
                // boucle sur les event de events qui ont dateendevent < aujourdhui

                        for(var key in this.events){ //  var "key" "in" tableau events
                            var eventold = this.events[key]; // fait passer la "key" du tableau dans une variable eventold
                            
                            if( eventold.dateendevent < aujourdhui ){ //pour chaque date de fin d'event < a la date d'aujourdhui 

                                     eventold.$domoldevent.fadeOut(300, function(){ // fadeout des elements du DOM
                                        eventold.destroyOldEvent();// on retire du DOM
                                          
                                    })

                                   tableauKey.push(key);   // on pousse les indexs(key) de events qui match avec la condition dans tableauKey         
                                            
                                    }
                                               
                            }

                            for ( var value of tableauKey){ // pour chaque valeur du tableauKey 
                            this.events.splice(value, 1);  // supprime 1 la value à l'index indiqué
                            
                            }
                        }

                
                //// init datepicker for calendar///  

        initPickersCalendar(){
            var options = {
                // closeText: 'Fermer',
                // prevText: '&#x3c;Préc',
                // nextText: 'Suiv&#x3e;',
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
                // isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: '',
                // minDate: 0,
                maxDate: '+12M +0D',
                minDate: new Date (2017, 8, 1), 
                beforeShowDay: $.proxy(this.CalendarEventDay, this), // pour ne pas perdre le this en tant que mon app
                numberOfMonths: 1,
                showButtonPanel: true
        
                };
        
                 this.$datepicker.datepicker(options);
                // this.$datepicker.datepicker( "options", "beforeShowDay", true);

            }


            CalendarEventDay(date){ 
                    //   console.log(date);
                    //     console.log(this.events);
                        if(!this.events){ // s'il n y a pas d'event dans le LS alors on arrete la boucle
                        return [false, ""];
                        }

                        for(var key in this.events){ //  var "key" "in" tableau events
                        var event = this.events[key]; // fait passer la "key" du tableau dans une variable eventold
                        
                        if( event.datestartevent  == date.toLocaleDateString() ){ 

                            return [true, ""];// on affiche le jour calandar
          
                                }
                        
                    }
                    return [false, ""];//sinon, on cache le jour du calendar
                }
            
    } //end APP