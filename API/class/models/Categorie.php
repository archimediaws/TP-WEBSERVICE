<?php

class Categorie extends Model implements JsonSerializable
{
    
    private $title;
    private $userId;
   
 
    public function getTitle()
    {
        return $this->title;
    }

   
    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getUserId()
    {
        return $this->userId;
    }

   
    public function setUserId($userId)
    {
        $this->userId = $userId;
    }


      // JSON SERIALIZE 

      function jsonSerialize(){
        return [
            "id" => $this->id,
            "title" => $this->title,
            "userId" => $this->userId
        ];
    }
  
    
}