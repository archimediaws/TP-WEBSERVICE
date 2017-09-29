<?php 

class Service {

    protected $connection;

    function __construct( $param ){
        $this->connection = Connection::getConnection();
        $this->setParams ( $param );
        
    }


}
// $service = new Service ( $param);