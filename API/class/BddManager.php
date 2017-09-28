<?php 
//BddManager va contenir les instances de nos repository
class BddManager {

    private $noteRepository;
    private $connection;

    function __construct(){
        $this->connection = Connection::getConnection();
        $this->noteRepository = new NoteRepository( $this->connection );
    }

    function getNoteRepository(){
        return $this->noteRepository;
    }

}