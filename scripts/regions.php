<?php
namespace App;
class regions extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO regions(name_region, id_country) VALUES (:name, :id)';
    private $queryGet = 'SELECT regions.id AS codeRegion, name_region AS nombreRegion, countries.id AS codeCountry, name_country AS nombreCountry FROM regions INNER JOIN countries ON regions.id_country = countries.id';
    private $queryGetId = 'SELECT regions.id AS codeRegion, name_region AS nombreRegion, countries.id AS codeCountry, name_country AS nombreCountry FROM regions INNER JOIN countries ON regions.id_country = countries.id WHERE regions.id = :code';
    private $queryPut = 'UPDATE regions SET name_region = :newName, id_country = :newId WHERE id = :code';
    private $queryDelete = 'DELETE FROM regions WHERE id = :id';

    public function __construct(public $name_region = 1, private $id_country = 1){parent::__construct();}

    public function regionsPost(){
        $myData = $this->regionsGet();
        $myData = array_values($myData["MESSAGE"]);
        $newArray = (array)[];
        foreach ($myData as $value) {
            array_push( $newArray, $value["name"]);
        }
        if (!in_array($this->name_region, $newArray)) {
            try {
                $res = $this->__get("conex")->prepare($this->queryPost);
                $res->bindValue("name", $this->name_region);
                $res->bindValue("id", $this->id_country);
                $res->execute();
                $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];
                
             } catch (\PDOException $e) {
                $this->message = $e->getMessage();
             } finally{
                print_r($this->message);
             }
        } else{
            print_r(["STATUS"=>200,"MESSAGE"=>"Error!!, $this->name_region ya se encuentra registrado"]);
        }
    }

    public function regionsGet(){
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

    public function regionsGetId($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryGetId);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(\PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            return $this->message;
        }
    }


    public function regionsPut($code){
        try {
            $res = $this->__get("conex")->prepare($this->queryPut);
            $res->bindValue("newName", $this->name_region);
            $res->bindValue("newId", $this->id_country);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function regionsDelete($code){
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