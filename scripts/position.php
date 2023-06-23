<?php
    class position extends connect{
        use getInstance;
        private $message;
        private $queryPostPosition = 'INSERT INTO position (name_position, arl) VALUES (:name_position, :arl_name)';
        private $queryGetPosition = 'SELECT * FROM position';
        private $queryUpdatePosition = 'UPDATE position SET name_position = :name_position, arl = :arl WHERE id = :id_position';
        private $queryDeletePosition = 'DELETE FROM position WHERE id = :id_position';

        public function __construct(public $name_position, public $arl_name){parent::__construct();}

        public function postPosition(){
            try {
                $res = $this->conex->prepare($this->queryPostPosition);
                $res->bindValue("name_position", $this->name_position);
                $res->bindValue("arl_name", $this->arl_name);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }
        
        public function getPosition(){
            try {
                $res = $this->conex->prepare($this->queryGetPosition);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();
                
            } finally {
                print_r($this->message);
            }
        }

        public function UpdatePosition($id_position){
            try {
                $res = $this->conex->prepare($this->queryUpdatePosition);
                $res->bindValue("name_position", $this->name_position);
                $res->bindValue("arl", $this->arl_name);
                $res->bindValue("id_position", $id_position);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function DeletePosition($id_position){
            try {
                $res = $this->conex->prepare($this->queryDeletePosition);
                $res->bindValue("id_position", $id_position);
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