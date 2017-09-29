<?php 
class EventRepository extends Repository {

    function getAll(){
        $query = "SELECT * FROM event";
        $result = $this->connection->query( $query );
        $result = $result->fetchAll( PDO::FETCH_ASSOC );

        $events = [];
        foreach( $result as $data ){
            $events[] = new Event( $data );
        }

        return $events;  
    }

    function getById( Event $event ){

        $query = "SELECT * FROM event WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $event->getId()
        ]);
        $result = $prep->fetch(PDO::FETCH_ASSOC);

        if( empty( $result ) ){
            return false;
        }
        else {
            return new Event( $result );
        }
        
    }



    // public function getAllEventByUserId(User $user){

    //     // recupérer l'id du user en cours
    //     $userId = $user->getId(); 
        
    //     $object = $this->connection->prepare('SELECT * FROM event WHERE userId=:userId');
    //     $object->execute(array(
    //         'userId'=> $userId
    //     ));
    //     $eventSuser = $object->fetchAll(PDO::FETCH_ASSOC);
    //     $arrayObjet = [];
    //     foreach ($eventSuser as $eventuser){
    //         $arrayObjet[] = new Event($eventuser);
    //     }

    //     return $arrayObjet;
    // }



    function save( Event $event ){
        if( empty( $event->getId() ) ){
            return $this->insert( $event );
        }
        else {
            return $this->update( $event );
        }
    }

    private function insert( Event $event ){

        $query = "INSERT INTO event SET title=:title, content=:content, date_event_start=:date_event_start, date_event_end=:date_event_end, userId=:userId  ";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "title" => $event->getTitle(),
            "content" => $event->getContent(),
            "date_event_start" => $event->getDate_event_start(),
            "date_event_end" => $event->getDate_event_end(),
            "userId" => $event->getUserId()
        ] );
        return $this->connection->lastInsertId();

    }

    private function update( Event $event ){

        $query = "UPDATE event SET title=:title, content=:content, date_event_start=:date_event_start, date_event_end=:date_event_end WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute( [
            "title" => $event->getTitle(),
            "content" => $event->getContent(),
            "date_event_start" => $event->getDate_event_start(),
            "date_event_end" => $event->getDate_event_end(),
            "id" => $event->getId()
        ] );
        return $prep->rowCount();

    }

    function delete( Event $event ) {

        $query = "DELETE FROM event WHERE id=:id";
        $prep = $this->connection->prepare( $query );
        $prep->execute([
            "id" => $event->getId()
        ]);
        return $prep->rowCount();

    }

}