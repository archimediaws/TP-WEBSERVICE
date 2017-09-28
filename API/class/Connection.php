<?php 
class Connection {

    static $connection = null;

    static function getConnection(){
      
        if( empty( self::$connection ) ){    
            self::$connection = new PDO(
                "mysql:dbname=bddevents;host=localhost",
                "root",
                ""
            );
        }

        return self::$connection;
    }

    private function __construct(){}

}

