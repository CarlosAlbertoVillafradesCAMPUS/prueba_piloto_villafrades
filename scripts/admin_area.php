<?php
    class admin_area extends connect{
        use getInstance;
        private $message;
        private $queryPostAdminArea = 'INSERT INTO admin_area (id_area, id_staff, id_position, id_journey) VALUES (:id_area, :id_staff, :id_position, :id_journey)';

        private $queryGetAdminArea = 'SELECT admin_area.id, areas.id, areas.name_area, staff.id, staff.doc, staff.first_name, staff.first_surname, position.id, position.name_position, journey.id, journey.name_journey FROM admin_area INNER JOIN areas ON admin_area.id_area = areas.id INNER JOIN staff ON admin_area.id_staff = staff.id INNER JOIN position ON admin_area.id_position = position.id INNER JOIN journey ON admin_area.id_journeys = journey.id';

        private $queryUpdateAdminArea = 'UPDATE admin_area SET id_area = :id_area, id_staff = :id_staff, id_position = :id_position, id_journey = :id_journey WHERE id = :id_admin_area';

        private $queryDeleteAdminArea = 'DELETE FROM admin_area WHERE id = :id_admin_area';

        public function __construct(private $id_area, private $id_staff, private $id_position, private $id_journeys){parent::__construct();}

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
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
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