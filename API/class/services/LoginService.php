<?php
class LoginService extends Service
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
            $this->error['username'] = 'nom utilisateur manquant';
        }
        if(empty($this->params['password'])){
            $this->error['password'] = 'mot de passe manquant';
        }
        
        if(empty($this->error) == false)
        {
        return $this->error;
        }
        $this->user = $this->checkUsernamePassword();
        if(empty($this->user)){
            $this->error['identifiant'] = 'Nom utilisateur ou le mot de passe incorrect';
            
            return $this->error;
        }
        else
        { 
            
            return $this->user;
        }
        }
    public function checkUsernamePassword(){
            $nom = $this->params['username'];
            $password = $this->params['password'];
            $connexion = new PDO('mysql:host=localhost;dbname=locappart;charset=UTF8','root','');
            $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $connexion->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $objet = $connexion->prepare('SELECT id, username FROM user WHERE username=:username AND password=:password');
            $objet->execute(array(
                'username' => $nom,
                'password' => $password
                
            ));
            $user = $objet->fetch(PDO::FETCH_ASSOC);
            if(empty($user)==false){           
                return new User($user);
            }
            return false;
        }







}


