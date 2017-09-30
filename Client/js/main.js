var app = new App(); // instance de l'application
app.initPickersEvents(); // init du datepicker form events
app.initPickersCalendar(); // init le datepicker calendar
app.reinit(); // init des hide() slideup() et val() des events dans le formulaire

////////// formulaire ajouter event et gestion des alerts  ///////////////

// BTN ADD EVENT
app.$add.click(function(){
    app.$form_event.slideToggle(200);
});

// FORM AD EVENT
app.$form_event.submit(function(event){

    event.preventDefault(); //Empeche le rechargement
    var name = app.$event.val();// recupere la valeur du champ titre
    var description = app.$description.val();// recupere la valeur du champ description
    var datestartevent = app.$date_start_event.val();// recupere la valeur du champ description
    var dateendevent = app.$date_end_event.val();// recupere la valeur du champ description

    var today = new Date();

    var event = new Event ( name, description, datestartevent, dateendevent );
    app.addEvent( event );
    event.display();
    
    app.setAlertToday();
    app.displayAlertToday();
    app.setAlertCloseToday();
    app.displayAlertCloseToday();
    app.setOldEventsToShow();
    app.displayOldEventsToShow();
    app.initPickersCalendar();
    app.CalendarEventDay(today);
    app.reinit();

});

// Btn open alert old events
app.$showoldevents.click(function(){
    app.$eventstodelete.slideToggle(200);
    });


////////// affichage et gestion des events  ///////////////

//on click sur event 
$(document).on("click", ".event .openeventinfos", function(){
app.$infos.fadeIn(300); 
var index = $ (".event").index( $(this).parent() );
var event = app.events[ index ]; //cherche l'event corrspondant
app.currentEvent = event; // on va stocker event dans app on va pouvoir s'en resservir par la suite

app.$titre.html( event.name );
app.$descriptioninfos.html( event.description );
app.$d_event.html( event.datestartevent );
app.$e_event.html( event.dateendevent );

});

// cache les infos events
$(document).on("click", "#close", function(){
    app.$infos.fadeOut(300);
});

// remove les events = destroy de localstorage et cache les infos
$(document).on("click", ".event .close", function(event){
        event.stopPropagation(); // empeche la propagation de l'evenement au parent
       var index = $(".event").index( $(this).parent());
        app.removeEvent( index ); 
        app.$infos.fadeOut(300);
});
// remove les events du jour affichage "postit" = destroy de localstorage et cache les infos
$(document).on("click", ".event .closetoday", function(event){
    event.stopPropagation(); // empeche la propagation de l'evenement au parent
    var index = $(".event").index( $(this).parent());
    app.removeEvent( index );
    app.$infos.fadeOut(300);
});

 // remove les events proche affichage "postit" = destroy de localstorage et cache les infos
$(document).on("click", ".event .closeto", function(event){
    event.stopPropagation(); // empeche la propagation de l'evenement au parent
   var index = $(".event").index( $(this).parent());
    app.removeEvent( index ); 
    app.$infos.fadeOut(300);
});
// remove les old events affichage "postit" = destroy de localstorage et cache les infos
$(document).on("click", ".event .closeold", function(event){
    event.stopPropagation(); // empeche la propagation de l'evenement au parent
   var index = $(".event").index( $(this).parent());
    app.removeOldEvent( index ); 
    app.$infos.fadeOut(300);
});
//remove de All old events affichage sur #infos
$(document).on("click", "#deletealloldevents", function(event){
    event.stopPropagation(); // empeche la propagation de l'evenement au parent
    app.removeAllOldEvents();
    app.$events_old.hide();
    app.$infos.fadeOut(300);
});  

//on click sur la date de event du calendar
$(document).on("click", ".ui-state-default.ui-state-active", function(){
    app.$infos.fadeIn(300); 
    var index = $ ("#calendrier .ui-datepicker").index( $(this).parent() );
    var event = app.events[ index ]; //cherche l'event corrspondant
    
    app.$titre.html( event.name );
    app.$descriptioninfos.html( event.description );
    app.$d_event.html( event.datestartevent );
    app.$e_event.html( event.dateendevent );
    
    });



    window.onbeforeunload = function(){ //lorsque l'utilisateur quitte la page sauvegarde sur localstorage
    app.saveEvents();
}