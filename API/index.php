<?php 
header("Access-Control-Allow-Origin:*", false);
// header("Access-Control-Allow-Origin:http://192.168.110.46", false);

require "flight/Flight.php"; 
require "autoload.php";

//Enregistre en global dans Flight le BddManager
Flight::set("BddManager", new BddManager());



// routes CATEGORIES


//CATEGORIES GET ALL Lire toutes les categories
Flight::route("GET /categories", function(){
    
        $bddManager = Flight::get("BddManager");
        $repoCat = $bddManager->getCategorieRepository();
        $categories = $repoCat->getAllCategories();
    
        echo json_encode ( $categories );
    
    });


//CATEGORIES GET CATEGORIE par id
Flight::route("GET /categorie/@id", function( $id ){
    
    $status = [
        "success" => false,
        "catId" => false
    ];

    $categorie = new Categorie();
    $categorie->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repoCat = $bddManager->getCategorieRepository();
    $categorie = $repoCat->getCategoryById( $categorie );

    if( $categorie != false ){
        $status["success"] = true;
        $status["catId"] = $categorie;
    }

    echo json_encode( $status );

});


// CATEGORIE POST  / Créer une categorie
Flight::route("POST /categorie", function(){
    
        $title = Flight::request()->data["title"];
        $userId = Flight::request()->data["userId"];
        
    
        $status = [
            "success" => false,
            "userId" => 0
        ];
    
        if( strlen( $title ) > 0  && strlen( $userId ) > 0 ) {
    
            $categorie = new Categorie();
            
            $categorie->setTitle( $title );
            $categorie->setUserId( $userId );
            
    
            $bddManager = Flight::get("BddManager");
            $repoCat = $bddManager->getCategorieRepository();
            $id = $repoCat->save( $categorie );
    
            if( $id != 0 ){
                $status["success"] = true;
                $status["userId"] = $id;
            }
    
        }
    
        echo json_encode( $status ); 
        
    });


// CATEGORIE DELETE / Supprimer la categorie à l'@id
Flight::route("DELETE /categorie/@id", function( $id ){
    
        $status = [
            "success" => false
        ];
    
        $categorie = new Categorie();
        $categorie->setId( $id );
    
        $bddManager = Flight::get("BddManager");
        $repoCat = $bddManager->getCategorieRepository();
        $rowCount = $repoCat->delete( $categorie );
    
        if( $rowCount == 1 ){
            $status["success"] = true;
        }
    
        echo json_encode( $status );
        
    });  


    //CATEGORIE GET EVENTS / Récupere les events de la categorie @id

    Flight::route("GET /eventsByCategorie/@id", function( $id ){
        
        $status = [
            "success" => false,
            "events" => false
        ];

        $categorie = new Categorie();
        $categorie->setId( $id );

        $bddManager = Flight::get("BddManager");
        $repoCat = $bddManager->getCategorieRepository();
        $events = $repoCat->getAllEventByCategorieId($categorie);

        if( $events != false ){
            $status["success"] = true;
            $status["events"] = $events;
        }

        echo json_encode( $status );

    });



// routes EVENT

//EVENT GET EVENTS Lire tous les events
Flight::route("GET /events", function(){

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getEventRepository();
    $events = $repo->getAll();

    echo json_encode ( $events );

});

//EVENT GET EVENT Récuperer l'event @id
Flight::route("GET /event/@id", function( $id ){
    
    $status = [
        "success" => false,
        "event" => false
    ];

    $event = new Event();
    $event->setId( $id );

    $bddManager = Flight::get("BddManager");
    $repo = $bddManager->getEventRepository();
    $event = $repo->getById( $event );

    if( $event != false ){
        $status["success"] = true;
        $status["event"] = $event;
    }

    echo json_encode( $status );

});



// EVENT POST EVENT / Créer un event
Flight::route("POST /event", function(){

    $title = Flight::request()->data["title"];
    $content = Flight::request()->data["content"];
    $date_event_start = Flight::request()->data["date_event_start"];
    $date_event_end = Flight::request()->data["date_event_end"];
    $userId = Flight::request()->data["userId"];
    $catId = Flight::request()->data["catId"];

    $status = [
        "success" => false,
        "id" => 0
    ];

    if( strlen( $title ) > 0 && strlen( $content ) > 0 && strlen( $date_event_start ) > 0 && strlen( $date_event_end ) > 0  && strlen( $userId ) > 0 && strlen( $catId ) > 0 ) {

        $event = new Event();
        
        $event->setTitle( $title );
        $event->setContent( $content );
        $event->setDate_event_start( $date_event_start );
        $event->setDate_event_end( $date_event_end );
        $event->setUserId( $userId );
        $event->setCatId( $catId );

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

// EVENT POST updater = modifier les datas d'un event  = en POST 

Flight::route("POST /event/@id", function($id){
    
        $title = Flight::request()->data["title"];
        $content = Flight::request()->data["content"];
        $date_event_start = Flight::request()->data["date_event_start"];
        $date_event_end = Flight::request()->data["date_event_end"];
        $userId = Flight::request()->data["userId"];
        

        $status = [
            "success" => false,
        
        ];
    
        if( strlen( $title ) > 0 && strlen( $content ) > 0 && strlen( $date_event_start ) > 0 && strlen( $date_event_end ) > 0  && strlen( $userId ) > 0 ) {
    
            $event = new Event();

            $event->setId($id);
            $event->setTitle( $title );
            $event->setContent( $content );
            $event->setDate_event_start( $date_event_start );
            $event->setDate_event_end( $date_event_end );
            $event->setUserId( $userId );
    
            $bddManager = Flight::get("BddManager");
            $repo = $bddManager->getEventRepository();
            $rowCount = $repo->save( $event );
    
            
            if( $rowCount == 1 ){
                $status["success"] = true;
            }
    
        }
    
        echo json_encode( $status ); 
        
    });


// EVENT PUT updater = modifier les datas d'un event  = en PUT 
Flight::route("PUT /event/@id", function( $id ){
    
        //Pour récuperer des données PUT -> les données sont encodées en json string
        //avec ajax, puis décodées ici en php
        $json = Flight::request()->getBody();
        $_PUT = json_decode( $json , true);//true pour tableau associatif
    
        $status = [
            "success" => false
        ];
    
        if( isset( $_PUT["title"] ) && isset( $_PUT["content"] ) && isset( $_PUT["date_event_start"] ) && isset( $_PUT["date_event_end"] ) ){
    
            $title = $_PUT["title"];
            $content = $_PUT["content"];
            $date_event_start = $_PUT["date_event_start"];
            $date_event_end = $_PUT["date_event_end"];
    
            $event = new Event();
    
            $event->setId( $id );
            $event->setTitle( $title );
            $event->setContent( $content );
            $event->setDate_event_start( $date_event_start );
            $event->setDate_event_end( $date_event_end );
            
    
            $bddManager = Flight::get("BddManager");
            $repo = $bddManager->getEventRepository();
            $rowCount = $repo->save( $event );
    
            if( $rowCount == 1 ){
                $status["success"] = true;
            }
    
        }
    
        echo json_encode( $status );
    
    });

// EVENT DELETE / Supprimer l'event à l'@id
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


// ROUTES USER

// USER LOGIN 

Flight::route("POST /user/login", function(){ // route login user en objet PHP 
    
        $username = Flight::request()->data['username'];
        $Upassword = Flight::request()->data['Upassword'];

        
        $user = new User();
        $user->setUsername ($username);
        $user->setUpassword ($Upassword);
    
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getUserRepository();
        $findedUser = $repo->getUserByUsername($user);
    
        $status = [
            "success" => "",
            "error" => "",
            "user" => ""
        ];
    
        if( $findedUser == false ){
            $status["success"] = false;
            $status["error"] = "identifiant incorrect";
        }
        else if( $findedUser->getUpassword()  != $user->getUpassword()){
            
            $status["success"] = false;
            $status["error"] = "mot de passe incorrect";
        }
        else {
            
            $status["success"] = true;
            $status["user"] = $findedUser;
        }
    
    
        echo json_encode($status); // tranforme une variable en JSON
    
    });

    // USER REGISTER utilise le registerservice

Flight::route("POST /user/register", function(){ 
    
       

        $param = Flight::request()->data->getData();
        $service = new RegisterService($param);
        $service->launchControls();

        $status = [
            "success" => "",
            "error" => "",
            "user" => ""
        ];


        if($service->getError()){
        
            $status["success"] = false;
            $status["error"] = "il y a des erreurs dans le formulaire d'enregistrement";
        }
        else
        {

        $username = $service->getParams()['username'];
        $Upassword = $service->getParams()['Upassword'];

        $user = new User();
        $user->setUsername ($username);
        $user->setUpassword ($Upassword);
    
        $bddManager = Flight::get("BddManager");
        $repo = $bddManager->getUserRepository();
        $createdUser = $repo->getUserByUsername($user);
    
    
            
            $status["success"] = true;
            $status["user"] = $createdUser;
        }
    
    
        echo json_encode($status); 
    
    });


    //USER GET EVENTS / Récupere les events de l'userId @id

    Flight::route("GET /eventsByUser/@id", function( $id ){
        
        $status = [
            "success" => false,
            "events" => false
        ];

        $user = new User();
        $user->setId( $id );

        $bddManager = Flight::get("BddManager");
        $repoUser = $bddManager->getUserRepository();
        $events = $repoUser->getAllEventByUserId($user);

        if( $events != false ){
            $status["success"] = true;
            $status["events"] = $events;
        }

        echo json_encode( $status );

    });

    

Flight::start();