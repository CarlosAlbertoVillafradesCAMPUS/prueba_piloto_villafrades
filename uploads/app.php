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
   \App\countries::getInstance(json_decode(file_get_contents("php://input"), true))->countryPost();
});
$router->put("/countries/{id}", function($id){
    $_DATA = json_decode(file_get_contents("php://input"), true);
   \App\countries::getInstance(json_decode(file_get_contents("php://input"), true))->countryUpdate($id);
});


///REGIONS
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


//CITIES
$router->get("/cities", function(){
    echo json_encode(\App\cities::getInstance()->citiesGet());
});
$router->get("/cities/{id}", function($id){
    echo json_encode(\App\cities::getInstance()->citiesGetId($id));
});
$router->delete("/cities/{id}", function($id){
    \App\cities::getInstance()->citiesDelete($id);
});
$router->post("/cities", function(){
   \App\cities::getInstance(json_decode(file_get_contents("php://input"),true))->citiesPost(); 
});
$router->put("/cities/{id}", function($id){
   \App\cities::getInstance(json_decode(file_get_contents("php://input"),true))->citiesPut($id);
});


//AREAS
$router->get("/areas", function(){
    echo json_encode(\App\areas::getInstance()->areasGet());
});
$router->get("/areas/{id}", function($id){
    echo json_encode(\App\areas::getInstance()->areasGetId($id));
});
$router->delete("/areas/{id}", function($id){
    \App\areas::getInstance()->areasDelete($id);
});
$router->post("/areas", function(){
   \App\areas::getInstance(json_decode(file_get_contents("php://input"),true))->areasPost(); 
});
$router->put("/areas/{id}", function($id){
   \App\areas::getInstance(json_decode(file_get_contents("php://input"),true))->areasPut($id);
});

//STAFF
$router->get("/staff", function(){
    echo json_encode(\App\staff::getInstance()->staffGet());
});
$router->get("/staff/{id}", function($id){
    echo json_encode(\App\staff::getInstance()->staffGetId($id));
});
$router->delete("/staff/{id}", function($id){
    \App\staff::getInstance()->staffDelete($id);
});
$router->post("/staff", function(){
   \App\staff::getInstance(json_decode(file_get_contents("php://input"),true))->staffPost(); 
});
$router->put("/staff/{id}", function($id){
   \App\staff::getInstance(json_decode(file_get_contents("php://input"),true))->staffPut($id);
});

//LOCATIONS
$router->get("/locations", function(){
    echo json_encode(\App\locations::getInstance()->getLocations());
});
$router->get("/locations/{id}", function($id){
    echo json_encode(\App\locations::getInstance()->getLocationsId($id));
});
$router->delete("/locations/{id}", function($id){
    \App\locations::getInstance()->DeleteLocations($id);
});
$router->post("/locations", function(){
   \App\locations::getInstance(json_decode(file_get_contents("php://input"),true))->postLocations(); 
});
$router->put("/locations/{id}", function($id){
   \App\locations::getInstance(json_decode(file_get_contents("php://input"),true))->UpdateLocations($id);
});


//CONTACT INFO
$router->get("/contactInfo", function(){
    echo json_encode(\App\contact_info::getInstance()->getContactInfo());
});
$router->get("/contactInfo/{id}", function($id){
    echo json_encode(\App\contact_info::getInstance()->getContactInfoId($id));
});
$router->delete("/contactInfo/{id}", function($id){
    \App\contact_info::getInstance()->DeleteContactInfo($id);
});
$router->post("/contactInfo", function(){
   \App\contact_info::getInstance(json_decode(file_get_contents("php://input"),true))->postContactInfo(); 
});
$router->put("/contactInfo/{id}", function($id){
   \App\contact_info::getInstance(json_decode(file_get_contents("php://input"),true))->UpdateContactInfo($id);
});

//CONTACT EMERGENCY
$router->get("/contactEmer", function(){
    echo json_encode(\App\emergency_contact::getInstance()->emergencyContactGet());
});
$router->get("/contactEmer/{id}", function($id){
    echo json_encode(\App\emergency_contact::getInstance()->emergencyContactGetId($id));
});
$router->delete("/contactEmer/{id}", function($id){
    \App\emergency_contact::getInstance()->emergencyContactDelete($id);
});
$router->post("/contactEmer", function(){
   \App\emergency_contact::getInstance(json_decode(file_get_contents("php://input"),true))->emergencyContactPost(); 
});
$router->put("/contactEmer/{id}", function($id){
   \App\emergency_contact::getInstance(json_decode(file_get_contents("php://input"),true))->emergencyContactPut($id);
});

//WORK REFERENCE
$router->get("/workReference", function(){
    echo json_encode(\App\work_reference::getInstance()->workReferenceGet());
});
$router->get("/workReference/{id}", function($id){
    echo json_encode(\App\work_reference::getInstance()->workReferenceGetId($id));
});
$router->delete("/workReference/{id}", function($id){
    \App\work_reference::getInstance()->workReferenceDelete($id);
});
$router->post("/workReference", function(){
   \App\work_reference::getInstance(json_decode(file_get_contents("php://input"),true))->workReferencePost(); 
});
$router->put("/workReference/{id}", function($id){
   \App\work_reference::getInstance(json_decode(file_get_contents("php://input"),true))->workReferencePut($id);
});

//PERSONAL REF
$router->get("/personalRef", function(){
    echo json_encode(\App\personal_ref::getInstance()->personalRefGet());
});
$router->get("/personalRef/{id}", function($id){
    echo json_encode(\App\personal_ref::getInstance()->personalRefGetId($id));
});
$router->delete("/personalRef/{id}", function($id){
    \App\personal_ref::getInstance()->personalRefDelete($id);
});
$router->post("/personalRef", function(){
   \App\personal_ref::getInstance(json_decode(file_get_contents("php://input"),true))->personalRefPost(); 
});
$router->put("/personalRef/{id}", function($id){
   \App\personal_ref::getInstance(json_decode(file_get_contents("php://input"),true))->personalRefPut($id);
});

//LEVELS
$router->get("/levels", function(){
    echo json_encode(\App\levels::getInstance()->getLevels());
});
$router->get("/levels/{id}", function($id){
    echo json_encode(\App\levels::getInstance()->getLevelsId($id));
});
$router->delete("/levels/{id}", function($id){
    \App\levels::getInstance()->DeleteLevels($id);
});
$router->post("/levels", function(){
    var_dump(json_decode(file_get_contents("php://input"),true));
   \App\levels::getInstance(json_decode(file_get_contents("php://input"),true))->postLevels(); 
});
$router->put("/levels/{id}", function($id){
   \App\levels::getInstance(json_decode(file_get_contents("php://input"),true))->UpdateLevels($id);
});


//JOURNEY
$router->get("/journey", function(){
    echo json_encode(\App\journey::getInstance()->getJourney());
});
$router->get("/journey/{id}", function($id){
    echo json_encode(\App\journey::getInstance()->getJourneyId($id));
});
$router->delete("/journey/{id}", function($id){
    \App\journey::getInstance()->deleteJourney($id);
});
$router->post("/journey", function(){
    var_dump(json_decode(file_get_contents("php://input"),true));
   \App\journey::getInstance(json_decode(file_get_contents("php://input"),true))->postJourney(); 
});
$router->put("/journey/{id}", function($id){
   \App\journey::getInstance(json_decode(file_get_contents("php://input"),true))->updateJourney($id);
});

//POSITION
$router->get("/position", function(){
    echo json_encode(\App\position::getInstance()->getPosition());
});
$router->get("/position/{id}", function($id){
    echo json_encode(\App\position::getInstance()->getPositionId($id));
});
$router->delete("/position/{id}", function($id){
    \App\position::getInstance()->DeletePosition($id);
});
$router->post("/position", function(){
    var_dump(json_decode(file_get_contents("php://input"),true));
   \App\position::getInstance(json_decode(file_get_contents("php://input"),true))->postPosition(); 
});
$router->put("/position/{id}", function($id){
   \App\position::getInstance(json_decode(file_get_contents("php://input"),true))->UpdatePosition($id);
});
 
//ADMIN AREA
$router->get("/adminArea", function(){
    echo json_encode(\App\admin_area::getInstance()->getAdminArea());
});
$router->get("/adminArea/{id}", function($id){
    echo json_encode(\App\admin_area::getInstance()->getAdminAreaId($id));
});
$router->delete("/adminArea/{id}", function($id){
    \App\admin_area::getInstance()->deleteAdminArea($id);
});
$router->post("/adminArea", function(){
    var_dump(json_decode(file_get_contents("php://input"),true));
   \App\admin_area::getInstance(json_decode(file_get_contents("php://input"),true))->postadminArea(); 
});
$router->put("/adminArea/{id}", function($id){
   \App\admin_area::getInstance(json_decode(file_get_contents("php://input"),true))->updateAdminArea($id);
});


//ACADEMIC AREA
$router->get("/academicArea", function(){
    echo json_encode(\App\academic_area::getInstance()->getAcademicArea());
});
$router->get("/academicArea/{id}", function($id){
    echo json_encode(\App\academic_area::getInstance()->getAcademicAreaId($id));
});
$router->delete("/academicArea/{id}", function($id){
    \App\academic_area::getInstance()->deleteAcademicArea($id);
});
$router->post("/academicArea", function(){
    var_dump(json_decode(file_get_contents("php://input"),true));
   \App\academic_area::getInstance(json_decode(file_get_contents("php://input"),true))->postAcademicArea(); 
});
$router->put("/academicArea/{id}", function($id){
   \App\academic_area::getInstance(json_decode(file_get_contents("php://input"),true))->updateAcademicArea($id);
});



//MAINT AREA
$router->get("/maintArea", function(){
    echo json_encode(\App\maint_area::getInstance()->getMaintArea());
});
$router->get("/maintArea/{id}", function($id){
    echo json_encode(\App\maint_area::getInstance()->getMaintAreaId($id));
});
$router->delete("/maintArea/{id}", function($id){
    \App\maint_area::getInstance()->deleteMaintArea($id);
});
$router->post("/maintArea", function(){
   \App\maint_area::getInstance(json_decode(file_get_contents("php://input"),true))->postMaintArea(); 
});
$router->put("/maintArea/{id}", function($id){
   \App\maint_area::getInstance(json_decode(file_get_contents("php://input"),true))->updateMaintArea($id);
});


//MARKETING AREA
$router->get("/marketingArea", function(){
    echo json_encode(\App\marketing_area::getInstance()->getMarketingArea());
});
$router->get("/marketingArea/{id}", function($id){
    echo json_encode(\App\marketing_area::getInstance()->getMarketingAreaId($id));
});
$router->delete("/marketingArea/{id}", function($id){
    \App\marketing_area::getInstance()->deleteMarketingArea($id);
});
$router->post("/marketingArea", function(){
   \App\marketing_area::getInstance(json_decode(file_get_contents("php://input"),true))->postMarketingArea(); 
});
$router->put("/marketingArea/{id}", function($id){
   \App\marketing_area::getInstance(json_decode(file_get_contents("php://input"),true))->updateMarketingArea($id);
});


//SUBJECTS
$router->get("/subjects", function(){
    echo json_encode(\App\subjects::getInstance()->getSubjects());
});
$router->get("/subjects/{id}", function($id){
    echo json_encode(\App\subjects::getInstance()->getSubjectsId($id));
});
$router->delete("/subjects/{id}", function($id){
    \App\subjects::getInstance()->DeleteSubjects($id);
});
$router->post("/subjects", function(){
   \App\subjects::getInstance(json_decode(file_get_contents("php://input"),true))->postSubjects(); 
});
$router->put("/subjects/{id}", function($id){
   \App\subjects::getInstance(json_decode(file_get_contents("php://input"),true))->UpdateSubjects($id);
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
    // emergency_contact::getInstance(json_decode(file_get_contents("php://input"), true))->getContactInfo();
    // journey::getInstance(json_decode(file_get_contents("php://input"), true))->updateJourney(1);
    // academic_area::getInstance(json_decode(file_get_contents("php://input"), true))->postAcademicArea();
    // admin_area::getInstance(json_decode(file_get_contents("php://input"), true))->postAdminArea();
    // tutors::getInstance(json_decode(file_get_contents("php://input"), true))->postTutors();
    // maint_area::getInstance(json_decode(file_get_contents("php://input"), true))->postMaintArea();
    // marketing_area::getInstance(json_decode(file_get_contents("php://input"), true))->postMarketingArea();
    // routes::getInstance(json_decode(file_get_contents("php://input"), true))->postRoutes();
    // App\admin_area::getInstance(json_decode(file_get_contents("php://input"), true))->postAdminArea(7);
?>