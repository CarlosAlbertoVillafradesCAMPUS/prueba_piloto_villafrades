<?php
header("Access-Control-Allow-Origin: *");


require_once "../vendor/autoload.php";

$router = new \Bramus\Router\Router();

//COUNTRIES
$router->get("/countries", function(){
    echo json_encode(\App\countries::getInstance()->countryGetAll());
});
$router->get("/countries/{id}", function($id){
    echo json_encode(\App\countries::getInstance()->countryGetId($id));
});
$router->delete("/countries/{id}", function($id){
    \App\countries::getInstance()->countryDelete($id);
});
$router->post("/countries", function(){
    $_DATA = json_decode(file_get_contents("php://input"), true);
   \App\countries::getInstance()->countryPost(...$_DATA);
});
$router->put("/countries/{id}", function($id){
    $_DATA = json_decode(file_get_contents("php://input"), true);
   \App\countries::getInstance()->countryUpdate($_DATA, $id);
});


//REGIONS
$router->get("/regions", function(){
    echo json_encode(\App\regions::getInstance()->regionsGet());
});
$router->get("/regions/{id}", function($id){
    echo json_encode(\App\regions::getInstance()->regionsGetId($id));
});
$router->delete("/regions/{id}", function($id){
    \App\regions::getInstance()->regionsDelete($id);
});
$router->post("/regions", function(){
   \App\regions::getInstance(json_decode(file_get_contents("php://input"),true))->regionsPost(); 
});
$router->put("/regions/{id}", function($id){
   \App\regions::getInstance(json_decode(file_get_contents("php://input"),true))->regionsPut($id);
});
$router->run();

    
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