<?php
class areas extends connect{
    use getInstance;
    private $message;
    private $queryPost = 'INSERT INTO areas(name_area) VALUES(:name)';
    private $queryGet = 'SELECT id AS "code", name_area AS "nombreArea" FROM areas';

    public function __construct(public $name_area){parent::__construct();}

    public function areasPost(){
        try {
            $res = $this->conex->prepare($this->queryPost);
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
            $res = $this->conex->prepare($this->queryGet);
            $res->execute();
            $this->message = ["STATUS"=>200,"MESSAGE"=>$res->fetchAll(PDO::FETCH_ASSOC)];
        } catch (\PDOException $e) {
            $this->message = $e->getMessage();
        } finally{
            print_r($this->message);
        }
    }
}
?>