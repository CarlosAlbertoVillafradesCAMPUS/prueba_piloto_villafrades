<?php
namespace App;
class personal_ref extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO personal_ref(full_name, cel_number, relationship, occupation) VALUES (:name, :number_tel, :relation, :occupa)';
    private $queryGet = 'SELECT * FROM personal_ref';
    private $queryGetId = 'SELECT * FROM personal_ref WHERE id = :id';
    private $queryPut = 'UPDATE personal_ref SET full_name = :newName, cel_number = :newCelNumbre, relationship = :newRelation, occupation = :newOcupation WHERE id = :code';
    private $queryDelete = 'DELETE FROM personal_ref WHERE id = :id';

    public function __construct(public $full_name=1, private $cel_number=1, public $relationship=1, public $occupation=1){parent::__construct();}

    public function personalRefPost(){
        try {
            $res = $this->__get("conex")->prepare($this->queryPost);
            $res->bindValue("name", $this->full_name);
            $res->bindValue("number_tel", $this->cel_number);
            $res->bindValue("relation", $this->relationship);
            $res->bindValue("occupa", $this->occupation);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];

        } catch (\PDOException $e) {
           $this->message = $e->getMessage();
        } finally{
           print_r($this->message);
        }
    }

    public function personalRefGet(){
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

    public function personalRefGetId($code){
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

    public function personalRefPut($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryPut);
            $res->bindValue("newName", $this->full_name);
            $res->bindValue("newCelNumbre", $this->cel_number);
            $res->bindValue("newRelation", $this->relationship);
            $res->bindValue("newOcupation", $this->occupation);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function personalRefDelete($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryDelete);
            $res->bindValue("id", $code);
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