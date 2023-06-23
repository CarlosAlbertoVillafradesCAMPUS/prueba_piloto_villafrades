<?php
    class levels extends connect{
        use getInstance;
        private $message;
        private $queryPostLevels = 'INSERT INTO levels (name_level, group_level) VALUES (:name_levels, :group_levels)';
        private $queryGetLevels = 'SELECT * FROM levels';
        private $queryUpdateLevels =  'UPDATE levels SET name_level = :name_levels, group_level = :group_levels WHERE id = :id_levels';
        private $queryDeleteLevels = 'DELETE FROM levels WHERE id = :id_levels';

        public function __construct(public $name_levels, public $group_levels){parent::__construct();}

        public function postLevels(){
            try {
                $res = $this->conex->prepare($this->queryPostLevels);
                $res->bindValue("name_levels", $this->name_levels);
                $res->bindValue("group_levels", $this->group_levels);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function getLevels(){
            try {
                $res = $this->conex->prepare($this->queryGetLevels);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function UpdateLevels($id_levels){
            try {
                $res = $this->conex->prepare($this->queryUpdateLevels);
                $res->bindValue("name_levels", $this->name_levels);
                $res->bindValue("group_levels", $this->group_levels);
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
                $res = $this->conex->prepare($this->queryDeleteLevels);
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