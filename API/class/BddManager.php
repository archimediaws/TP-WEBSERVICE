<?php 

class BddManager {

    private $eventRepository;
    private $userRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->eventRepository = new EventRepository( $this->connection );
        $this->userRepository = new UserRepository( $this->connection );
    }

    function getEventRepository(){
        return $this->eventRepository;
    }

    function getUserRepository(){
        return $this->userRepository;
    }

}