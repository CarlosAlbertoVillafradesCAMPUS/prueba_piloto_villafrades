<?php
namespace App;
class countries extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO countries(name_country) VALUES(:name)';
    private $queryGetAll = 'SELECT id AS "code", name_country AS "name" FROM countries';
    private $queryGetId = 'SELECT id AS "code", name_country AS "name" FROM countries WHERE id = :code';
    private $queryPut = 'UPDATE countries SET name_country = :value WHERE id = :code';
    private $queryDelete = 'DELETE FROM countries WHERE id = :id';
    public function __construct(public $name_country=1){parent::__construct();}

    public function countryPost(){
        $myData = $this->countryGetAll();
        $myData = array_values($myData["MESSAGE"]);
        $newArray = (array)[];
        foreach ($myData as $value) {
            array_push( $newArray, $value["name"]);
        }
        if (!in_array($this->name_country, $newArray)) {
            try {
                $res = $this->__get("conex")->prepare($this->queryPost);
                $res->bindValue("name", $this->name_country);
                $res->execute();
                $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];
                
             } catch (\PDOException $e) {
                $this->message = $e->getMessage();
             } finally{
                print_r($this->message);
             }
        } else{
            print_r(["STATUS"=>200,"MESSAGE"=>"Error!!,". $this->name_country . "ya se encuentra registrado"]);
        }
    }

    public function countryGetAll(){
        try {
            $res = $this->__get("conex")->prepare($this->queryGetAll);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(\PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            return $this->message;
        }
    }

    public function countryGetId($id){
        try {
            $res = $this->__get("conex")->prepare($this->queryGetId);
            $res->bindValue("code", $id);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(\PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            return $this->message;
        }
    }

    public function countryUpdate($code){
        $myData = $this->countryGetAll();
        $myData = array_values($myData["MESSAGE"]);
        $newArray = (array)[];
        foreach ($myData as $value) {
            array_push($newArray, $value["name"]);
        }
        if (!in_array($this->name_country, $newArray)) {
            try {
                $res = $this->__get("conex")->prepare($this->queryPut);
                $res->bindValue("value", $this->name_country);
                $res->bindValue("code", $code);
                $res->execute();
                $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
                
             } catch (\PDOException $e) {
                $this->message = $e->getMessage();
             } finally{
                print_r($this->message);
             }
        } else{
            print_r(["STATUS"=>200,"MESSAGE"=>"Error!!,". $this->name_country. "ya se encuentra registrado"]);
        }
    }
    public function countryDelete($code){
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