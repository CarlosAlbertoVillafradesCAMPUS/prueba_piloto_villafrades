<?php
namespace App;
class staff extends connect{
    use getInstance;
    private $queryPost = 'INSERT INTO staff(doc, first_name, second_name, first_surname, second_surname, eps, id_area, id_city) VALUES (:cc, :firstName, :secondName, :firstSurname, :secondSurname, :eps, :codeArea, :codeCity)';
    private $queryGet = 'SELECT staff.id AS id, doc AS cc, first_name AS name_first, second_name AS name_second, first_surname AS surname_first, second_surname AS surname_second, eps, cities.id AS city_code, name_city AS city_name, areas.id AS area_code, name_area AS area_name FROM staff INNER JOIN cities ON staff.id_city = cities.id INNER JOIN areas ON staff.id_area = areas.id';
    private $queryGetId = 'SELECT staff.id AS id, doc AS cc, first_name AS name_first, second_name AS name_second, first_surname AS surname_first, second_surname AS surname_second, eps, cities.id AS city_code, name_city AS city_name, areas.id AS area_code, name_area AS area_name FROM staff INNER JOIN cities ON staff.id_city = cities.id INNER JOIN areas ON staff.id_area = areas.id WHERE staff.id = :id';
    private $queryPut = 'UPDATE staff SET doc = :cc, first_name = :newFirstName, second_name = :newSecondName, first_surname = :newFirstSurname, second_surname = :newSecondSurname, eps = :newEps, id_area = :newIdArea, id_city = :newIdCity WHERE id = :code';
    private $queryDelete = 'DELETE FROM staff WHERE id = :code';

    public function __construct(private $doc=1,public $first_name=1, public $second_name=1, public $first_surname=1, public $second_surname=1, public $eps=1, public $id_area=1, public $id_city=1){parent::__construct();}

    public function staffPost(){
        try {
            $res = $this->__get("conex")->prepare($this->queryPost);
            $res->bindValue("cc", $this->doc);
            $res->bindValue("firstName", $this->first_name);
            $res->bindValue("secondName", $this->second_name);
            $res->bindValue("firstSurname", $this->first_surname);
            $res->bindValue("secondSurname", $this->second_surname);
            $res->bindValue("eps", $this->eps);
            $res->bindValue("codeArea", $this->id_area);
            $res->bindValue("codeCity", $this->id_city);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];

        } catch (\PDOException $e) {
           $this->message = $e->getMessage();
        } finally{
           print_r($this->message);
        }
    }

    public function staffGet(){
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

    public function staffGetId($code){
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

    public function staffPut($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryPut);
            $res->bindValue("cc", $this->doc);
            $res->bindValue("newFirstName", $this->first_name);
            $res->bindValue("newSecondName", $this->second_name);
            $res->bindValue("newFirstSurname", $this->first_surname);
            $res->bindValue("newSecondSurname", $this->second_surname);
            $res->bindValue("newEps", $this->eps);
            $res->bindValue("newIdArea", $this->id_area);
            $res->bindValue("newIdCity", $this->id_city);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function staffDelete($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryDelete);
            $res->bindValue("code", $code);
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