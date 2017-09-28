<?php 
header("Access-Control-Allow-Origin:*", false);
// header("Access-Control-Allow-Origin:http://192.168.110.46", false);

require "flight/Flight.php"; 
require "autoload.php";

//Enregistrer en global dans Flight le BddManager
Flight::set("BddManager", new BddManager());

//Lire toutes les events
Flight::route("GET /events", function(){

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getEventRepository();
    $events = $repo->getAll();

    echo json_encode ( $notes );

});

//Récuperer l'event @id
Flight::route("GET /event/@id", function( $id ){
    
    $status = [
        "success" => false,
        "note" => false
    ];

    $event = new Event();
    $event->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getEventRepository();
    $event = $repo->getById( $event );

    if( $event != false ){
        $status["success"] = true;
        $status["note"] = $event;
    }

    echo json_encode( $status );

});

//Créer un event
Flight::route("POST /event", function(){

    $title = Flight::request()->data["title"];
    $content = Flight::request()->data["content"];

    $status = [
        "success" => false,
        "id" => 0
    ];

    if( strlen( $title ) > 0 && strlen( $content ) > 0 ) {

        $event = new Event();
        $event->setTitle( $title );
        $event->setContent( $content );

        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getEventRepository();
        $id = $repo->save( $event );

        if( $id != 0 ){
            $status["success"] = true;
            $status["id"] = $id;
        }

    }

    echo json_encode( $status ); 
    
});

//Supprimer l'event à l' @id
Flight::route("DELETE /event/@id", function( $id ){

    $status = [
        "success" => false
    ];

    $event = new Event();
    $event->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getEventRepository();
    $rowCount = $repo->delete( $event );

    if( $rowCount == 1 ){
        $status["success"] = true;
    }

    echo json_encode( $status );
    
});

Flight::route("PUT /event/@id", function( $id ){

    //Pour récuperer des données PUT -> les données sont encodé en json string
    //avec ajax, puis décodé ici en php
    $json = Flight::request()->getBody();
    $_PUT = json_decode( $json , true);//true pour tableau associatif

    $status = [
        "success" => false
    ];

    if( isset( $_PUT["title"] ) && isset( $_PUT["content"] ) ){

        $title = $_PUT["title"];
        $content = $_PUT["content"];

        $event = new Event();
        $event->setId( $id );
        $event->setTitle( $title );
        $event->setContent( $content );

        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getEventRepository();
        $rowCount = $repo->save( $event );

        if( $rowCount == 1 ){
            $status["success"] = true;
        }

    }

    echo json_encode( $status );

});

Flight::start();