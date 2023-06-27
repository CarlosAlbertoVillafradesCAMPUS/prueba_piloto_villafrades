<?php
namespace App;
class areas extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO areas(name_area) VALUES(:name)';
    private $queryGet = 'SELECT id AS "code", name_area AS "nombreArea" FROM areas';
    private $queryGetId = 'SELECT id AS "code", name_area AS "nombreArea" FROM areas WHERE id = :id';
    private $queryPut = 'UPDATE areas SET name_area = :newName WHERE id = :code';
    private $queryDelete = 'DELETE FROM areas WHERE id = :id_area';


    public function __construct(public $name_area=1){parent::__construct();}

    public function areasPost(){
        try {
            $res = $this->__get("conex")->prepare($this->queryPost);
            $res->bindValue("name", $this->name_area);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
        
    }

    public function areasGet(){
        try {
            $res = $this->__get("conex")->prepare($this->queryGet);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(\PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            return $this->message;
        }
    }

    public function areasGetId($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryGetId);
            $res->bindValue("id", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(\PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            return $this->message;
        }
    }

    public function areasPut($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryPut);
            $res->bindValue("newName", $this->name_area);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function areasDelete($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryDelete);
            $res->bindValue("id_area", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Delete Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }
}
?>