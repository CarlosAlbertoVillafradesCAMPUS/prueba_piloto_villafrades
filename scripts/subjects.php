<?php
    class subjects extends connect{
        use getInstance;
        private $message;
        private $queryPostSubjects = 'INSERT INTO subjects (name_subject) VALUES (:name_subject)';
        private $queryGetSubjects = 'SELECT * FROM subjects';
        private $queryUpdateSubjects =  'UPDATE subjects SET name_subject = :name_subject WHERE id = :id_subject';
        private $queryDeleteSubjects = 'DELETE FROM subjects WHERE id = :id_subject';

        public function __construct(public $name_subject){parent::__construct();}

        public function postSubject(){
            try {
                $res = $this->conex->prepare($this->queryPostSubjects);
                $res->bindValue("name_subject", $this->name_subject);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function getSubjects(){
            try {
                $res = $this->conex->prepare($this->queryGetSubjects);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function UpdateSubjects($id_subject){
            try {
                $res = $this->conex->prepare($this->queryUpdateSubjects);
                $res->bindValue("name_subject", $this->name_subject);
                $res->bindValue("id_subject", $id_subject);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function DeleteSubjects($id_subject){
            try {
                $res = $this->conex->prepare($this->queryDeleteSubjects);
                $res->bindValue("id_subject", $id_subject);
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