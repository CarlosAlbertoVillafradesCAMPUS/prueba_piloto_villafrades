<?php
namespace App;
require_once "../vendor/autoload.php";

$router = new \Bramus\Router\Router();

$router->get("areas", function(){
    \App\areas::getInstance(json_decode(file_get_contents("php://input"), true))->areasGet();
});

$router->post("areas", function(){
    \App\areas::getInstance(json_decode(file_get_contents("php://input"), true))->areasPost();
});

$router->run();

    // countries::getInstance(json_decode(file_get_contents("php://input"), true))->countryPost();
    // regions::getInstance(json_decode(file_get_contents("php://input"), true))->regionsGet();
    // cities::getInstance(json_decode(file_get_contents("php://input"), true))->citiesPost();
   
    // staff::getInstance(json_decode(file_get_contents("php://input"), true))->staffGet(); 
    /* work_reference::getInstance(json_decode(file_get_contents("php://input"), true))->workReferencePut(541856); */
    /* personal_ref::getInstance(json_decode(file_get_contents("php://input"), true))->personalRefPut(5423); */
    /* emergency_contact::getInstance(json_decode(file_get_contents("php://input"), true))->emergencyContactPost(); */
    // \App\levels::getInstance(json_decode(file_get_contents("php://input"), true))->getLevels();
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
    // App\admin_area::getInstance(json_decode(file_get_contents("php://input"), true))->postAdminArea(7);
?>