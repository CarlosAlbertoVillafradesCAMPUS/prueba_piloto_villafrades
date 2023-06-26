<?php
namespace App;
interface firma{
    public function __get($name);
}
abstract class connect extends credentials implements firma{
    use getInstance;
    protected $conex;
    public function __construct(public $driver = "mysql", private $port=3306){
        try {
            $this->conex = new \PDO($this->driver.":user=".$this->user.";password=".$this->password.";host=".$this->__get("host").";dbname=".$this->__get("dbname").";port=".$this->port);
            $this->conex->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION); //!conexión PDO
        } catch (\PDOException $error) {
            $this->conex = $error->getMessage();
            print_r($error->getMessage());
        }
    }

}

?>