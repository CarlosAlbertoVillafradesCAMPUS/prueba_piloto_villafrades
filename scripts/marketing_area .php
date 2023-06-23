<?php
    class marketing_area extends connect{
        use getInstance;
        private $message;
        private $queryPostMarketingArea = 'INSERT INTO marketing_area (id_area, id_staff, id_position, id_journey) VALUES (:id_area, :id_staff, :id_position, :id_journey)';
        private $queryGetMarketingArea = 'SELECT marketing_area.id, areas.id, areas.name_area, staff.id, staff.doc, staff.first_name, staff.first_surname, position.id, position.name_position, journey.id, journey.name_journey FROM marketing_area INNER JOIN areas ON marketing_area.id_area = areas.id INNER JOIN staff ON marketing_area.id_staff = staff.id INNER JOIN position ON marketing_area.id_position = position.id INNER JOIN journey ON marketing_area.id_journeys = journey.id';

        private $queryUpdateMarketingArea = 'UPDATE marketing_area SET id_area = :id_area, id_staff = :id_staff, id_position = :id_position, id_journey = :id_journey WHERE id = :id_marketing_area';
        private $queryDeleteMarketingArea = 'DELETE FROM marketing_area WHERE id = :id_marketing_area';

        public function __construct(private $id_area, private $id_staff, private $id_position,private $id_journey){parent::__construct();}

        public function postMarketingArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostMarketingArea);
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

        public function getMarketingArea(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetMarketingArea);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" =>$res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function updateMarketingArea($id_marketing_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateMarketingArea);
                $res->bindValue("id_area", $this->id_area);
                $res->bindValue("id_staff", $this->id_staff);
                $res->bindValue("id_position", $this->id_position);
                $res->bindValue("id_journey", $this->id_journey);
                $res->bindValue("id_marketing_area", $id_marketing_area);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally{
                print_r($this->message);
            }
        }

        public function deleteMarketingArea($id_marketing_area){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteMarketingArea);
                $res->bindValue("id_marketing_area", $id_marketing_area);
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