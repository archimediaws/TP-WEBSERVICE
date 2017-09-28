<?php 

class BddManager {

    private $eventRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->eventRepository = new EventRepository( $this->connection );
    }

    function getEventRepository(){
        return $this->eventRepository;
    }

}