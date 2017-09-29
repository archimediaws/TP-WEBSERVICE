<?php 

class BddManager {

    private $eventRepository;
    private $categorieRepository;
    private $userRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->eventRepository = new EventRepository( $this->connection );
        $this->categorieRepository = new CategorieRepository( $this->connection );
        $this->userRepository = new UserRepository( $this->connection );
    }

    function getEventRepository(){
        return $this->eventRepository;
    }

    function getCategorieRepository(){
        return $this->categorieRepository;
    }

    function getUserRepository(){
        return $this->userRepository;
    }

}