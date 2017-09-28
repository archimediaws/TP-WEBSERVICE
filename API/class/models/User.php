<?php
class User extends Model implements JsonSerializable {

    private $username;
    private $Upassword;

    function getUsername(){
        return $this->username;
    }

    function getUpassword(){
        return $this->Upassword;
    }

    function setUsername( $username ){
        $this->username = $username;
    }

    function setUpassword( $Upassword ){
        $this->Upassword = $Upassword;
    }

    function jsonSerialize(){
        return [
            "id" => $this->id,
            "username" => $this->username,
            "Upassword" => $this->Upassword
        ];
    }

}