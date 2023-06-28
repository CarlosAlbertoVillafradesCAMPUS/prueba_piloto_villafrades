<?php
namespace App;
class emergency_contact extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO emergency_contact(full_name, cel_number, relationship, email, id_staff) VALUES (:name, :number_tel, :relation, :email, :codeStaff)';
    private $queryGetId = 'SELECT emergency_contact.*, doc, first_name, first_surname FROM emergency_contact INNER JOIN staff ON emergency_contact.id_staff = staff.id WHERE emergency_contact.id = :id ';
    private $queryGet = 'SELECT emergency_contact.*, doc, first_name, first_surname FROM emergency_contact INNER JOIN staff ON emergency_contact.id_staff = staff.id';
    private $queryPut = 'UPDATE emergency_contact SET full_name = :newName, cel_number = :newCelNumbre, relationship = :newRelation, email = :newEmail, id_staff = :newIdStaff  WHERE id = :code';
    private $queryDelete = 'DELETE FROM emergency_contact WHERE id = :id';

    public function __construct(public $full_name=1, private $cel_number=1, public $relationship=1, public $email=1, public $id_staff=1){parent::__construct();}

    public function emergencyContactPost(){
        try {
            $res = $this->__get("conex")->prepare($this->queryPost);
            $res->bindValue("name", $this->full_name);
            $res->bindValue("number_tel", $this->cel_number);
            $res->bindValue("relation", $this->relationship);
            $res->bindValue("email", $this->email);
            $res->bindValue("codeStaff", $this->id_staff);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];

        } catch (\PDOException $e) {
           $this->message = $e->getMessage();
        } finally{
           print_r($this->message);
        }
    }

    public function emergencyContactGet(){
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

    public function emergencyContactGetId($code){
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

    public function emergencyContactPut($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryPut);
            $res->bindValue("newName", $this->full_name);
            $res->bindValue("newCelNumbre", $this->cel_number);
            $res->bindValue("newRelation", $this->relationship);
            $res->bindValue("newEmail", $this->email);
            $res->bindValue("newIdStaff", $this->id_staff);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function emergencyContactDelete($code){
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