<?php 
class UserRepository extends Repository {

    function getAllUser(){
        $query = "SELECT * FROM user";
        $result = $this->connection->query( $query );
        $result = $result->fetchAll( PDO::FETCH_ASSOC );

        $users = [];
        foreach( $result as $data ){
            $users[] = new User( $data );
        }

        return $users;  
    }

    function getUserById( User $user ){

        $query = "SELECT * FROM user WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $user->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return new User( $result );
        }
        
    }

    function save( User $user ){
        if( empty( $user->getId() ) ){
            return $this->insert( $user );
        }
        else {
            return $this->update( $user );
        }
    }

    private function insert( User $user ){

        $query = "INSERT INTO user SET username=:username, Upassword=:Upassword";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "title" => $user->getUsername(),
            "content" => $user->getUpassword()
        ] );
        return $this->connection->lastInsertId();

    }

    private function update( User $user ){

        $query = "UPDATE user SET SET username=:username, Upassword=:Upassword WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "username" => $user->getUsername(),
            "Upassword" => $user->getUpassword(),
            "id" => $user->getId()
        ] );
        return $prep->rowCount();

    }

    function delete( User $user ) {

        $query = "DELETE FROM user WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $user->getId()
        ]);
        return $prep->rowCount();

    }

}