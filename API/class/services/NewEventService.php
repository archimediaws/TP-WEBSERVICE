<?php


class NewEventService extends Service
{

    private $params;
    private $error;
    private $event;



    public function getParams()
    {
        return $this->params;
    }
    public function setParams($params)
    {
        $this->params=$params;
    }
    public function getError()
    {
        return $this->error;
    }
    public function setError($error)
    {
        $this->error=$error;
    }
    public function getEvent()
    {
        return $this->event;
    }
    public function setEvent($event)
    {
        $this->event=$event;
    }
 
   
    public function launchControls()
        {
     
        if(empty($this->params['title'])){
            $this->error['type'] = 'Le titre n\'est pas renseigné';
        }
        
        
        if(empty($this->params['description'])){
            $this->error['description'] = 'Vous n\'avez pas decrit votre evenement';
        }

        if(empty($this->params['date_debut'])){
            $this->error['date_debut'] = 'Vous n\'avez pas renseigné la date de début de votre evenement';
        }

        if(empty($this->params['date_fin'])){
            $this->error['date_fin'] = 'Vous n\'avez pas renseigné la date de fin de votre evenement';
        }

        if(empty($this->params['categorie'])){
            $this->error['categorie'] = 'Vous n\'avez pas selectonné votre categorie ';
        }
           
        if(empty($this->error) == false)
        {
        return $this->error;
        }
        $this->event = $this->insertNewEvent();
        
        return $this->event;
        
        }
        public function insertNewEvent(){
            
            $userId = $_SESSION['user']->getId();
            // $date = date('d-m-y');
            
            $objet = $this->connection->prepare('INSERT INTO event SET 
                            userId=:userId,
                            title=:title,
                            content=:content,
                            date_event_start=:date_event_start,
                            date_event_end=:date_event_end
                            catId=:catId
                           
                            ');
                        $objet->execute(array(
                            'userId'=>$userId,
                            'title' =>$this->params['title'],
                            'content'=>$this->params['description'],
                            'date_event_start'=>$this->params['date_debut'],
                            'date_event_end'=>$this->params['date_fin'],
                            // 'date_post'=>$date,
                            'catId'=>$this->params['categorie']                
                        ));
                        $event = true;
                return $event;
            
        }


}