<?php
    class tutors extends connect{
        use getInstance;
        private $message;
        private $queryPostTutors = 'INSERT INTO tutors (id_staff, id_academic_area, id_position) VALUES (:id_staff, :id_academic_area, :id_position)';
        private $queryGetTutors = 'SELECT * FROM tutors';
        private $queryUpdateTutors = 'UPDATE tutors SET id_staff = :id_staff, id_academic_area = :id_academic_area, id_position = :id_position WHERE id = :id_tutors';
        private $queryDeleteTutors = 'DELETE FROM tutors WHERE id = :id_tutors';

        public function __construct(private $id_staff, private $id_academic_area, private $id_position){parent::__construct();}

        public function postTutors(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostTutors);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_academic_area", $this->id_academic_area);
                $res->bindValue("id_position", $this->id_position);
                $res->execute();
                $this->message = [ "STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
            $this->message = $error->getMessage();

            } finally {
            print_r($this->message);
            }
        }

        public function getTutors(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetTutors);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function updateTutors($id_tutors){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateTutors);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_academic_area", $this->id_academic_area);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_tutors", $id_tutors);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }

        public function deleteTutors($id_tutors){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteTutors);
                $res->bindValue("id_tutors", $id_tutors);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Delete Succesful"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }
    }
?>