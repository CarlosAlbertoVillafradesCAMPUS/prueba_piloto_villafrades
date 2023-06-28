<?php
namespace App;
    class contact_info extends connect{
        use getInstance;
        private $message;
        private $queryPostContactInfo = 'INSERT INTO contact_info (id_staff, whatsapp, instagram, linkedin, email, address, cel_number) VALUES (:id_staff, :whatsapp, :instagram, :linkedin, :email, :address, :cel_number)';
        private $queryGetContactInfo = 'SELECT contact_info.*, staff.doc, staff.first_name, staff.first_surname, staff.second_surname FROM contact_info INNER JOIN staff ON contact_info.id_staff = staff.id';
        private $queryGetContactInfoId = 'SELECT contact_info.*, staff.doc, staff.first_name, staff.first_surname, staff.second_surname FROM contact_info INNER JOIN staff ON contact_info.id_staff = staff.id WHERE contact_info.id = :id';
        private $queryUpdateContactInfo = 'UPDATE contact_info SET id_staff = :id_staff, whatsapp = :whatsapp, instagram = :instagram, linkedin = :linkedin, email = :email, address = :address, cel_number = :cel_number  WHERE id = :id_contact_info';
        private $queryDeleteContactInfo = 'DELETE FROM contact_info WHERE id = :id_contact_info';

        public function __construct(private $id_staff=1, public $whatsapp=1, public $instagram=1, public $linkedin=1, private $email=1, private $address=1, private $cel_number=1){parent::__construct();}

        public function postContactInfo(){
            try {
                $res = $this->__get("conex")->prepare($this->queryPostContactInfo);
                $res->bindValue('id_staff', $this->id_staff);
                $res->bindValue('whatsapp', $this->whatsapp);
                $res->bindValue('instagram', $this->instagram);
                $res->bindValue('linkedin', $this->linkedin);
                $res->bindValue('email', $this->email);
                $res->bindValue('address', $this->address);
                $res->bindValue('cel_number', $this->cel_number);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function getContactInfo(){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetContactInfo);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }

        public function getContactInfoId($code){
            try {
                $res = $this->__get("conex")->prepare($this->queryGetContactInfoId);
                $res->bindValue('id', $code);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(\PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                return $this->message;
            }
        }

        public function UpdateContactInfo($id_contact_info){
            try {
                $res = $this->__get("conex")->prepare($this->queryUpdateContactInfo);
                $res->bindValue('id_staff', $this->id_staff);
                $res->bindValue('whatsapp', $this->whatsapp);
                $res->bindValue('instagram', $this->instagram);
                $res->bindValue('linkedin', $this->linkedin);
                $res->bindValue('email', $this->email);
                $res->bindValue('address', $this->address);
                $res->bindValue('cel_number', $this->cel_number);
                $res->bindValue('id_contact_info', $id_contact_info);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function DeleteContactInfo($id_contact_info){
            try {
                $res = $this->__get("conex")->prepare($this->queryDeleteContactInfo);
                $res->bindValue('id_contact_info', $id_contact_info);
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