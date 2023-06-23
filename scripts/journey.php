<?php
    class journey extends connect{
        use getInstance;
        private $message;
        private $queryPostJourney = 'INSERT INTO journey (name_journey, check_in, check_out) VALUES (:name_journey, :check_in, :check_out)';
        private $queryGetJourney = 'SELECT * FROM journey';
        private $queryUpdateJourney = 'UPDATE journey SET name_journey = :name_journey, check_in = :check_in, check_out = :check_out WHERE id = :id_journey';
        private $queryDeleteJourney = 'DELETE FROM journey WHERE id = :id_journey';

        public function __construct(public $name_journey, public $check_in, public $check_out){parent::__construct();}

        public function postJourney(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostJourney);
                $res->bindValue("name_journey", $this->name_journey);
                $res->bindValue("check_in", $this->check_in);
                $res->bindValue("check_out", $this->check_out);
                $res->execute();
                $this->message = [ "STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
            $this->message = $error->getMessage();

            } finally {
            print_r($this->message);
            }
        }

        public function getJourney(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetJourney);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function updateJourney($id_journey){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateJourney);
                $res->bindValue("name_journey", $this->name_journey);
                $res->bindValue("check_in", $this->check_in);
                $res->bindValue("check_out", $this->check_out);
                $res->bindValue("id_journey", $id_journey);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }

        public function deleteJourney($id_journey){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteJourney);
                $res->bindValue("id_journey", $id_journey);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Delete Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }
    }
?>