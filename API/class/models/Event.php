<?php
class Event extends Model implements JsonSerializable {

    private $title;
    private $content;
    private $date_event_start;
    private $date_event_end;
    private $userId;

    // GETTER

    function getTitle(){
        return $this->title;
    }

    function getContent(){
        return $this->content;
    }

    function getDate_event_start(){
        return $this->date_event_start;
    }

    function getDate_event_end(){
        return $this->date_event_end;
    }

    function getUserId(){
        return $this->userId;
    }
    
    // SETTER

    function setTitle( $title ){
        $this->title = $title;
    }

    function setContent( $content ){
        $this->content = $content;
    }


    function setDate_event_start( $date_event_start ){
        $this->date_event_start = $date_event_start;
    }

    function setDate_event_end( $date_event_end){
        $this->date_event_end = $date_event_end;
    }

    function setUserId( $userId){
        $this->userId = $userId;
    }

    // JSON SERIALIZE 

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "title" => $this->title,
            "content" => $this->content,
            "date_event_start" => $this->date_event_start,
            "date_event_end" => $this->date_event_end,
            "userId" => $this->userId
        ];
    }

}