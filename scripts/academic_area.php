<?php
namespace App;
    class academic_area extends connect{
        use getInstance;
        private $message;
        private $queryPostAcademicArea = 'INSERT INTO academic_area (id_area, id_staff, id_position, id_journey) VALUES (:id_area, :id_staff, :id_position, :id_journey)';
        private $queryGetAcademicArea = 'SELECT academic_area.id, areas.id AS "id_areas", areas.name_area, staff.id AS "id_staff", staff.doc, staff.first_name, staff.second_name, staff.first_surname, position.id AS "id_position", position.name_position, position.arl, journey.id AS "id_journey", journey.name_journey, journey.check_in, journey.check_out FROM academic_area INNER JOIN areas ON academic_area.id_area = areas.id INNER JOIN staff ON academic_area.id_staff = staff.id INNER JOIN position ON academic_area.id_position = position.id INNER JOIN journey ON academic_area.id_journey = journey.id';
        private $queryGetAcademicAreaId = 'SELECT academic_area.id, areas.id AS "id_areas", areas.name_area, staff.id AS "id_staff", staff.doc, staff.first_name, staff.second_name, staff.first_surname, position.id AS "id_position", position.name_position, position.arl, journey.id AS "id_journey", journey.name_journey, journey.check_in, journey.check_out FROM academic_area INNER JOIN areas ON academic_area.id_area = areas.id INNER JOIN staff ON academic_area.id_staff = staff.id INNER JOIN position ON academic_area.id_position = position.id INNER JOIN journey ON academic_area.id_journey = journey.id WHERE academic_area.id = :id';
        private $queryUpdateAcademicArea = 'UPDATE academic_area SET id_area = :id_area, id_staff = :id_staff, id_position = :id_position, id_journey = :id_journey WHERE id = :id_academic_area';
        private $queryDeleteAcademicArea = 'DELETE FROM academic_area WHERE id = :id_academic_area';

        public function __construct(private $id_area=1, private $id_staff=1, private $id_position=1, private $id_journey=1){parent::__construct();}

        public function postAcademicArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostAcademicArea);
                $res->bindValue("id_area", $this->id_area);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_journey", $this->id_journey);
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
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }

        public function getAcademicAreaId($code){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetAcademicAreaId);
                $res->bindValue("id", $code);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }

        public function updateAcademicArea($id_academic_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateAcademicArea);
                $res->bindValue("id_area", $this->id_area);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_journey", $this->id_journey);
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