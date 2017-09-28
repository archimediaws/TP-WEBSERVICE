<?php
class Note extends Model implements JsonSerializable {

    private $title;
    private $content;

    function getTitle(){
        return $this->title;
    }

    function getContent(){
        return $this->content;
    }

    function setTitle( $title ){
        $this->title = $title;
    }

    function setContent( $content ){
        $this->content = $content;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "title" => $this->title,
            "content" => $this->content
        ];
    }

}