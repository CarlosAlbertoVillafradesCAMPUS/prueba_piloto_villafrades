<?php
    class maint_area extends connect{
        use getInstance;
        private $message;
        private $queryPostMaintArea = 'INSERT INTO maint_area (id_area, id_staff, id_position, id_journey) VALUES (:id_area, :id_staff, :id_position, :id_journey)';
        private $queryGetMaintArea = 'SELECT maint_area.id, areas.id, areas.name_area, staff.id, staff.doc, staff.first_name, staff.first_surname, position.id, position.name_position, journey.id, journey.name_journey FROM maint_area INNER JOIN areas ON maint_area.id_area = areas.id INNER JOIN staff ON maint_area.id_staff = staff.id INNER JOIN position ON maint_area.id_position = position.id INNER JOIN journey ON maint_area.id_journeys = journey.id';

        private $queryUpdateMaintArea = 'UPDATE maint_area SET id_area = :id_area, id_staff = :id_staff, id_position = :id_position, id_journey = :id_journey WHERE id = :id_maint_area';
        private $queryDeleteMaintArea = 'DELETE FROM maint_area WHERE id = :id_maint_area';

        public function __construct(private $id_area, private $id_staff, private $id_position,private $id_journey){parent::__construct();}

        public function postMaintArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostMaintArea);
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

        public function getMaintArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetMaintArea);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function updateMaintArea($id_maint_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateMaintArea);
                $res->bindValue("id_area", $this->id_area);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_journey", $this->id_journey);
                $res->bindValue("id_maint_area", $id_maint_area);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }

        public function deleteMaintArea($id_maint_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteMaintArea);
                $res->bindValue("id_maint_area", $id_maint_area);
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