<?php
    class academic_area extends connect{
        use getInstance;
        private $message;
        private $queryPostAcademicArea = 'INSERT INTO academic_area (id_area, id_staff, id_position, id_journeys) VALUES (:id_area, :id_staff, :id_position, :id_journeys)';

        private $queryGetAcademicArea = 'SELECT academic_area.id, areas.id, areas.name_area, staff.id, staff.doc, staff.first_name, staff.first_surname, position.id, position.name_position, journey.id, journey.name_journey FROM academic_area INNER JOIN areas ON academic_area.id_area = areas.id INNER JOIN staff ON academic_area.id_staff = staff.id INNER JOIN position ON academic_area.id_position = position.id INNER JOIN journey ON academic_area.id_journeys = journey.id';

        private $queryUpdateAcademicArea = 'UPDATE academic_area SET id_area = :id_area, id_staff = :id_staff, id_position = :id_position, id_journeys = :id_journeys WHERE id = :id_academic_area';
        private $queryDeleteAcademicArea = 'DELETE FROM academic_area WHERE id = :id_academic_area';

        public function __construct(private $id_area, private $id_staff, private $id_position, private $id_journeys){parent::__construct();}

        public function postAcademicArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostAcademicArea);
                $res->bindValue("id_area", $this->id_area);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_journeys", $this->id_journeys);
                $res->execute();
                $this->message = [ "STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
            $this->message = $error->getMessage();

            } finally {
            print_r($this->message);
            }
        }

        public function getAcademicArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetAcademicArea);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function updateAcademicArea($id_academic_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateAcademicArea);
                $res->bindValue("id_area", $this->id_area);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_journeys", $this->id_journeys);
                $res->bindValue("id_academic_area", $id_academic_area);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }

        public function deleteAcademicArea($id_academic_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteAcademicArea);
                $res->bindValue("id_academic_area", $id_academic_area);
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