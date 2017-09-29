<?php


class CategorieRepository extends Repository
{
    

    public function getCategoryById(Categorie $id){
        
        $object = $this->connection->prepare('SELECT * FROM categorie WHERE id=:id ');
        $object->execute(array(
            'id'=>$id->getId()
        ));
        $result = $object->fetch(PDO::FETCH_ASSOC);
        if( empty( $result ) ){
            return false;
        }
        else {
        return new Categorie($result);
        }
    }



    public function getAllCategories(){
        $object = $this->connection->prepare('SELECT * FROM categorie');
        $object->execute(array());
        $categories = $object->fetchAll(PDO::FETCH_ASSOC);

        foreach ($categories as $c){
            $arrayObjet[] = new Categorie($c);
        }

        return $arrayObjet;
    }

    public function getAllEventByCategorieId(Categorie $categorie){
        
                // recupérer l'id du user en cours
                $catId = $categorie->getId();
                
                $object = $this->connection->prepare('SELECT * FROM event WHERE catId=:catId');
                $object->execute(array(
                    'catId'=> $catId
                ));
                $eventScat = $object->fetchAll(PDO::FETCH_ASSOC);
                $arrayObjet = [];
                foreach ($eventScat as $eventcat){
                    $arrayObjet[] = new Event($eventcat);
                }
        
                return $arrayObjet;
            }

    public function save(Categorie $categories){
        if(empty($categories->getId())){
            return $this->insertCategories($categories);
        }else{
            return $this->updateCategories($categories);
        }
    }



    private function insertCategories(Categorie $categories){
        $query="INSERT INTO categorie SET title=:title, userId=:userId ";
        $pdo = $this->connection->prepare($query);
        $pdo->execute(array(
            'title'=>$categories->getTitle(),
            'userId'=>$categories->getUserId()
            
        ));
        return $pdo->rowCount();
    }

    private function updateCategories(Categorie $categories){
        $query = 'UPDATE categorie SET title=:title  WHERE id=:id';
        $pdo = $this->connection->prepare($query);
        $pdo->execute(array(
            'title'=>$categories->getTitle()
            
        ));
        return $pdo->rowCount();
    }

  

    public function delete(Categorie $categories){
        $object = $this->connection->prepare('DELETE FROM categorie WHERE id=:id');
        $object->execute(array(
            'id'=>$categories->getId()
        ));
        return  $object->rowCount();
    }
}