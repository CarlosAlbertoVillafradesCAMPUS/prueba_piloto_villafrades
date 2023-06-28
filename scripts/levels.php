<?php
namespace App;
    class levels extends connect{
        use getInstance;
        private $message;
        private $queryPostLevels = 'INSERT INTO levels (name_level, group_level) VALUES (:name_level, :group_level)';
        private $queryGetLevels = 'SELECT * FROM levels';
        private $queryGetLevelsId = 'SELECT * FROM levels WHERE id = :id';
        private $queryUpdateLevels =  'UPDATE levels SET name_level = :name_level, group_level = :group_level WHERE id = :id_levels';
        private $queryDeleteLevels = 'DELETE FROM levels WHERE id = :id_levels';

        public function __construct(public $name_level=1, public $group_level=1){parent::__construct();}

        public function postLevels(){
            $myData = $this->getLevels();
            $myData = array_values($myData["MESSAGE"]);
            $newArray = (array)[];
            foreach ($myData as $value) {
                array_push($newArray, $value["name_level"]);
            }
            if (!in_array($this->name_level, $newArray)) {
                try {
                    $res = $this->__get("conex")->prepare($this->queryPostLevels);
                    $res->bindValue("name_level", $this->name_level);
                    $res->bindValue("group_level", $this->group_level);
                    $res->execute();
                    $this->message = ["STATUS" => 200, "MESSAGE" => "Add Succesfull"];
    
                } catch (\PDOException $error) {
                    $this->message = $error->getMessage();
    
                } finally {
                    print_r($this->message);
                }
            } else{
                print_r(["STATUS"=>200,"MESSAGE"=>"Error!!, ".$this->name_location." ya se encuentra registrado"]);
            }
        }

        public function getLevels(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetLevels);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }

        public function getLevelsId($code){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetLevelsId);
                $res->bindValue("id", $code);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }

        public function UpdateLevels($id_levels){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateLevels);
                $res->bindValue("name_level", $this->name_level);
                $res->bindValue("group_level", $this->group_level);
                $res->bindValue("id_levels", $id_levels);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];
                
            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function DeleteLevels($id_levels){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteLevels);
                $res->bindValue("id_levels", $id_levels);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Delete Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }
    }
?>