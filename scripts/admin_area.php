<?php
namespace App;
    class admin_area extends connect{
        use getInstance;
        private $message;
        private $queryPostAdminArea = 'INSERT INTO admin_area (id_area, id_staff, id_position, id_journey) VALUES (:id_area, :id_staff, :id_position, :id_journey)';
        private $queryGetAdminArea = 'SELECT admin_area.id, areas.id AS "id_areas", areas.name_area, staff.id AS "id_staff", staff.doc, staff.first_name, staff.second_name, staff.first_surname, position.id AS "id_position", position.name_position, position.arl, journey.id AS "id_journey", journey.name_journey, journey.check_in, journey.check_out FROM admin_area INNER JOIN areas ON admin_area.id_area = areas.id INNER JOIN staff ON admin_area.id_staff = staff.id INNER JOIN position ON admin_area.id_position = position.id INNER JOIN journey ON admin_area.id_journey = journey.id';
        private $queryGetAdminAreaId = 'SELECT admin_area.id, areas.id AS "id_areas", areas.name_area, staff.id AS "id_staff", staff.doc, staff.first_name, staff.second_name, staff.first_surname, position.id AS "id_position", position.name_position, position.arl, journey.id AS "id_journey", journey.name_journey, journey.check_in, journey.check_out FROM admin_area INNER JOIN areas ON admin_area.id_area = areas.id INNER JOIN staff ON admin_area.id_staff = staff.id INNER JOIN position ON admin_area.id_position = position.id INNER JOIN journey ON admin_area.id_journey = journey.id WHERE admin_area.id = :id';
        private $queryUpdateAdminArea = 'UPDATE admin_area SET id_area = :id_area, id_staff = :id_staff, id_position = :id_position, id_journey = :id_journey WHERE id = :id_admin_area';
        private $queryDeleteAdminArea = 'DELETE FROM admin_area WHERE id = :id_admin_area';

        public function __construct(private $id_area=1, private $id_staff=1, private $id_position=1, private $id_journey=1){parent::__construct();}

        public function postAdminArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostAdminArea);
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

        public function getAdminArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetAdminArea);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }

        public function getAdminAreaId($code){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetAdminAreaId);
                $res->bindValue("id", $code);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }


        public function updateAdminArea($id_admin_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateAdminArea);
                $res->bindValue("id_area", $this->id_area);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_journey", $this->id_journey);
                $res->bindValue("id_admin_area", $id_admin_area);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }

        public function deleteAdminArea($id_admin_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteAdminArea);
                $res->bindValue("id_admin_area", $id_admin_area);
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