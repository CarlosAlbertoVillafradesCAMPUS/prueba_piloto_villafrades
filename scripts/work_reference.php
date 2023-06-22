<?php
class work_reference extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO work_reference(full_name, cel_number, position, company) VALUES (:name, :number_tel, :posit, :compan)';
    private $queryGet = 'SELECT * FROM work_reference';
    private $queryPut = 'UPDATE work_reference SET full_name = :newName, cel_number = :newCelNumbre, position = :newPosition, company = :newCompany WHERE id = :code';
    private $queryDelete = 'DELETE FROM work_reference WHERE id = :id';

    public function __construct(public $full_name, private $cel_number, public $position, public $company){parent::__construct();}

    public function workReferencePost(){
        try {
            $res = $this->__get("conex")->prepare($this->queryPost);
            $res->bindValue("name", $this->full_name);
            $res->bindValue("number_tel", $this->cel_number);
            $res->bindValue("posit", $this->position);
            $res->bindValue("compan", $this->company);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];

        } catch (\PDOException $e) {
           $this->message = $e->getMessage();
        } finally{
           print_r($this->message);
        }
    }

    public function workReferenceGet(){
        try {
            $res = $this->__get("conex")->prepare($this->queryGet);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function workReferencePut($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryPut);
            $res->bindValue("newName", $this->full_name);
            $res->bindValue("newCelNumbre", $this->cel_number);
            $res->bindValue("newPosition", $this->position);
            $res->bindValue("newCompany", $this->company);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function workReferenceDelete($code){
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