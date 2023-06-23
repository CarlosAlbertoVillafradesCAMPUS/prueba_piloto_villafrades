<?php
    class working_info extends connect{
        use getInstance;
        private $message;
        private $queryPostWorkingInfo = 'INSERT INTO working_info (id_staff, years_exp, months_exp, id_work_reference, id_personal_ref, start_contract, end_contract) VALUES (:id_staff, :years_exp, :months_exp, :id_work_reference, :id_personal_ref, :start_contract, :end_contract)';

        private $queryGetWorkingInfo = 'SELECT working_info.*, staff.id, staff.doc, staff.first_name, staff.first_surname,work_reference.id, work_reference.full_name, work_reference.cel_number, personal_ref.id, personal_ref.full_name, personal_ref.cel_number FROM working_info INNER JOIN work_reference ON working_info.id_work_reference = work_reference.id INNER JOIN personal_ref ON working_info.id_personal_ref = personal_ref.id INNER JOIN staff ON working_info.id_staff = staff.id';

        private $queryUpdateWorkingInfo = 'UPDATE working_info SET id_staff = :id_staff, years_exp = :years_exp, months_exp = :months_exp, id_work_reference = :id_work_reference, id_personal_ref = :id_personal_ref, start_contract = :start_contract, end_contract = :end_contract  WHERE id = :id_working_info';
        
        private $queryDeleteWorkingInfo = 'DELETE FROM working_info WHERE id = :id_working_info';

        public function __construct(private $id_staff, public $years_exp, public $months_exp, private $id_work_reference, private $id_personal_ref, public $start_contract, public $end_contract){parent::__construct();}

        public function postWorkingInfo(){
            try {
                $res = $this->conex->prepare($this->queryPostWorkingInfo);
                $res->bindValue('id_staff', $this->id_staff);
                $res->bindValue('years_exp', $this->years_exp);
                $res->bindValue('months_exp', $this->months_exp);
                $res->bindValue('id_work_reference', $this->id_work_reference);
                $res->bindValue('id_personal_ref', $this->id_personal_ref);
                $res->bindValue('start_contract', $this->start_contract);
                $res->bindValue('end_contract', $this->end_contract);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Add Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function getWorkingInfo(){
            try {
                $res = $this->conex->prepare($this->queryGetWorkingInfo);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => $res->fetchAll(PDO::FETCH_ASSOC)];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function UpdateWorkingInfo($id_working_info){
            try {
                $res = $this->conex->prepare($this->queryUpdateWorkingInfo);
                $res->bindValue('id_staff', $this->id_staff);
                $res->bindValue('years_exp', $this->years_exp);
                $res->bindValue('months_exp', $this->months_exp);
                $res->bindValue('id_work_reference', $this->id_work_reference);
                $res->bindValue('id_personal_ref', $this->id_personal_ref);
                $res->bindValue('start_contract', $this->start_contract);
                $res->bindValue('end_contract', $this->end_contract);
                $res->bindValue('id_working_info', $id_working_info);
                $res->execute();
                $this->message = ["STATUS" => 200, "MESSAGE" => "Update Succesfull"];

            } catch (\PDOException $error) {
                $this->message = $error->getMessage();

            } finally {
                print_r($this->message);
            }
        }

        public function DeleteWorkingInfo($id_working_info){
            try {
                $res = $this->conex->prepare($this->queryDeleteWorkingInfo);
                $res->bindValue('id_working_info', $id_working_info);
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