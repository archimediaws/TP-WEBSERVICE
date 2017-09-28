<?php 
header("Access-Control-Allow-Origin:*", false);
// header("Access-Control-Allow-Origin:http://192.168.110.46", false);

require "flight/Flight.php"; 
require "autoload.php";

//Enregistrer en global dans Flight le BddManager
Flight::set("BddManager", new BddManager());

//Lire toutes les notes
Flight::route("GET /notes", function(){

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getNoteRepository();
    $notes = $repo->getAll();

    echo json_encode ( $notes );

});

//Récuperer la note @id
Flight::route("GET /note/@id", function( $id ){
    
    $status = [
        "success" => false,
        "note" => false
    ];

    $note = new Note();
    $note->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getNoteRepository();
    $note = $repo->getById( $note );

    if( $note != false ){
        $status["success"] = true;
        $status["note"] = $note;
    }

    echo json_encode( $status );

});

//Créer une note
Flight::route("POST /note", function(){

    $title = Flight::request()->data["title"];
    $content = Flight::request()->data["content"];

    $status = [
        "success" => false,
        "id" => 0
    ];

    if( strlen( $title ) > 0 && strlen( $content ) > 0 ) {

        $note = new Note();
        $note->setTitle( $title );
        $note->setContent( $content );

        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getNoteRepository();
        $id = $repo->save( $note );

        if( $id != 0 ){
            $status["success"] = true;
            $status["id"] = $id;
        }

    }

    echo json_encode( $status ); 
    
});

//Supprimer la note @id
Flight::route("DELETE /note/@id", function( $id ){

    $status = [
        "success" => false
    ];

    $note = new Note();
    $note->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getNoteRepository();
    $rowCount = $repo->delete( $note );

    if( $rowCount == 1 ){
        $status["success"] = true;
    }

    echo json_encode( $status );
    
});

Flight::route("PUT /note/@id", function( $id ){

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

        $note = new Note();
        $note->setId( $id );
        $note->setTitle( $title );
        $note->setContent( $content );

        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getNoteRepository();
        $rowCount = $repo->save( $note );

        if( $rowCount == 1 ){
            $status["success"] = true;
        }

    }

    echo json_encode( $status );

});

Flight::start();