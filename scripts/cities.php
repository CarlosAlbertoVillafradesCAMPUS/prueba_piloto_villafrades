<?php
class cities extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO cities(name_city, id_region) VALUES (:name, :id)';
    private $queryGet = 'SELECT cities.id AS codeCity, name_city AS nombreCity, regions.id AS codeRegion, name_region AS nombreRegion, countries.id AS codeCountry, name_country AS nombreCountry FROM cities INNER JOIN regions ON cities.id_region = regions.id INNER JOIN countries ON regions.id_country = countries.id';
    private $queryPut = 'UPDATE cities SET name_city = :newName, id_region = :newId WHERE id = :code';
    private $queryDelete = 'DELETE FROM cities WHERE id = :id';

    public function __construct(public $name_city, private $id_region){parent::__construct();}

    public function citiesPost(){
        try {
            $res = $this->conex->prepare($this->queryPost);
            $res->bindValue("name", $this->name_city);
            $res->bindValue("id", $this->id_region);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];

        } catch (\PDOException $e) {
           $this->message = $e->getMessage();
        } finally{
           print_r($this->message);
        }
    }

    public function citiesGet(){
        try {
            $res = $this->conex->prepare($this->queryGet);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function citiesPut($code){
        try {
            $res = $this->conex->prepare($this->queryPut);
            $res->bindValue("newName", $this->name_city);
            $res->bindValue("newId", $this->id_region);
            $res->bindValue("code", $code);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }

    public function citiesDelete($code){
        try {
            $res = $this->conex->prepare($this->queryDelete);
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