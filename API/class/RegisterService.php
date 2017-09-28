<?php
class RegisterService extends Repository
{
    private $params;
    private $error;
    private $user;
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
    public function getUser()
    {
        return $this->user;
    }
    public function setUser($user)
    {
        $this->user=$user;
    }
    public function launchControls()
        {
   
        if(empty($this->params['username'])){
            $this->error['username'] = 'Le nom de l\'utilisateur n\'est pas renseigner';
        }
       
       
        if(empty($this->params['Upassword'])){
            $this->error['Upassword'] = 'Le mot de passe n\'est pas renseigner' ;
        }
        
    
        $pass = $this->params['Upassword'];
        $pass = strlen($pass);
        if($pass<3 || $pass>16){
            $this->error['UpasswordLength'] = 'Votre mot de passe doit avoir entre 3 a 16 caractere';
        }
        
        if(empty($this->error) == false)
        {
        ;
        return $this->error;
        }
        $this->user = $this->checkAll();
        if(empty($this->user)){
            $this->error['identifiant'] = 'utilisateur deja existant';
            return $this->error;
        }
        else
        {
            return $this->user;
        }
        }
        public function checkAll(){
            $username = $this->params['username'];

            $prep = $this->connection->prepare('SELECT username FROM user WHERE username=:username ');

            $prep->execute(array(
                
                'username' => $this->params['username'],
            ));
            $user = $prep->fetchAll(PDO::FETCH_ASSOC);
            if(empty($user)){
                        
                        $password = $this->params['Upassword'];
                        
                        $objet = $connection->prepare('INSERT INTO user SET 
                            username=:username,
                            Upassword=:Upassword
                            ');
                        $objet->execute(array(
                        'username' => $username,
                        'Upassword' => $Upassword
                        ));
                        $user = true;
                return $user;
            }
            return false;
        }
}