<?php
class countries extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO countries(name_country) VALUES(:name)';
    private $queryGet = 'SELECT id AS "code", name_country AS "name" FROM countries';
    private $queryPut = 'UPDATE countries SET name_country = :value WHERE id = :code';
    private $queryDelete = "DELETE FROM countries WHERE id = :id";
    public function __construct(public $name_country){parent::__construct();}

    public function countryPost(){
        try {
            $res = $this->conex->prepare($this->queryPost);
            $res->bindValue("name", $this->name_country);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Add Succesfull"];
            
         } catch (\PDOException $e) {
            $this->message = $e->getMessage();
         } finally{
            print_r($this->message);
         }
    }

    public function countryGet(){
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

    public function countryUpdate($value, $id){
        try {
            $res = $this->conex->prepare($this->queryPut);
            $res->bindValue("value", $value);
            $res->bindValue("code", $id);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>"Update Succesfull"];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }
    public function countryDelete($code){
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