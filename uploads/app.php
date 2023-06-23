<?php
trait getInstance{
    public static $instance;
    public static function getInstance() {
        $arg = func_get_args();
        $arg = array_pop($arg);
        return (!(self::$instance instanceof self) || !empty($arg)) ? self::$instance = new static(...(array) $arg) : self::$instance;
    }
    function __set($name, $value){
        $this->$name = $value;
    }
}
    function autoload($class) {
        // Directorios donde buscar archivos de clases
        $directories = [
            dirname(__DIR__).'/scripts/',
            dirname(__DIR__).'/scripts/db/'
        ];
        // Convertir el nombre de la clase en un nombre de archivo relativo
        $classFile = str_replace('\\', '/', $class) . '.php';
    
        // Recorrer los directorios y buscar el archivo de la clase
        foreach ($directories as $directory) {
            $file = $directory.$classFile;
            // Verificar si el archivo existe y cargarlo
            if (file_exists($file)) {
                require $file;
                break;
            }
        }
    }
    spl_autoload_register("autoload");
    /* countries::getInstance(json_decode(file_get_contents("php://input"), true))->countryPost();
    regions::getInstance(json_decode(file_get_contents("php://input"), true))->regionsGet();
    cities::getInstance(json_decode(file_get_contents("php://input"), true))->citiesPost();
    areas::getInstance(json_decode(file_get_contents("php://input"), true))->areasGet();
    staff::getInstance(json_decode(file_get_contents("php://input"), true))->staffGet(); */
    /* work_reference::getInstance(json_decode(file_get_contents("php://input"), true))->workReferencePut(541856); */
    /* personal_ref::getInstance(json_decode(file_get_contents("php://input"), true))->personalRefPut(5423); */
    /* emergency_contact::getInstance(json_decode(file_get_contents("php://input"), true))->emergencyContactPost(); */
    /* levels::getInstance(json_decode(file_get_contents("php://input"), true))->getLevels(); */
    /* locations::getInstance(json_decode(file_get_contents("php://input"), true))->DeleteLocations(6); */
    /* position::getInstance(json_decode(file_get_contents("php://input"), true))->UpdatePosition(7); */
    /* subjects::getInstance(json_decode(file_get_contents("php://input"), true))->DeleteSubjects(8); */
    /* team_educators::getInstance(json_decode(file_get_contents("php://input"), true))->UpdateTeamEducators(5); */
    /* working_info::getInstance(json_decode(file_get_contents("php://input"), true))->getWorkingInfo(); */
    // contact_info::getInstance(json_decode(file_get_contents("php://input"), true))->getContactInfo();
    // journey::getInstance(json_decode(file_get_contents("php://input"), true))->updateJourney(1);
    // academic_area::getInstance(json_decode(file_get_contents("php://input"), true))->postAcademicArea();
    // admin_area::getInstance(json_decode(file_get_contents("php://input"), true))->postAdminArea();
    // tutors::getInstance(json_decode(file_get_contents("php://input"), true))->postTutors();
    // maint_area::getInstance(json_decode(file_get_contents("php://input"), true))->postMaintArea();
    // marketing_area::getInstance(json_decode(file_get_contents("php://input"), true))->postMarketingArea();
    // routes::getInstance(json_decode(file_get_contents("php://input"), true))->postRoutes();
    admin_area::getInstance(json_decode(file_get_contents("php://input"), true))->postAdminArea(7);
?>