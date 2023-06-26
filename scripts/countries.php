<?php
namespace App;
class countries extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO countries(name_country) VALUES(:name)';
    private $queryGet = 'SELECT id AS "code", name_country AS "name" FROM countries';
    private $queryPut = 'UPDATE countries SET name_country = :value WHERE id = :code';
    private $queryDelete = 'DELETE FROM countries WHERE id = :id';
    public function __construct(){parent::__construct();}

    public function countryPost($name_country){
        $myData = $this->countryGet();
        $myData = array_values($myData["MESSAGE"]);
        $newArray = (array)[];
        foreach ($myData as $value) {
            array_push( $newArray, $value["name"]);
        }
        if (!in_array($name_country, $newArray)) {
            try {
                $res = $this->__get("conex")->prepare($this->queryPost);
                $res->bindValue("name", $name_country);
                $res->execute();
                $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];
                
             } catch (\PDOException $e) {
                $this->message = $e->getMessage();
             } finally{
                print_r($this->message);
             }
        } else{
            print_r(["STATUS"=>200,"MESSAGE"=>"Error!!, $name_country ya se encuentra registrado"]);
        }

       
    }

    public function countryGet(){
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

    public function countryUpdate($name_country, $code){
        $name_country = $name_country["name_country"];
        $myData = $this->countryGet();
        $myData = array_values($myData["MESSAGE"]);
        $newArray = (array)[];
        foreach ($myData as $value) {
            array_push($newArray, $value["name"]);
        }
        if (!in_array($name_country, $newArray)) {
            try {
                $res = $this->__get("conex")->prepare($this->queryPut);
                $res->bindValue("value", $name_country);
                $res->bindValue("code", $code);
                $res->execute();
                $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
                
             } catch (\PDOException $e) {
                $this->message = $e->getMessage();
             } finally{
                print_r($this->message);
             }
        } else{
            print_r(["STATUS"=>200,"MESSAGE"=>"Error!!, $name_country ya se encuentra registrado"]);
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