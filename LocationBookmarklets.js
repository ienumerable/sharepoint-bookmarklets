//view all site content
window.location = L_Menu_BaseUrl + "/_layouts/viewlsts.aspx";
 
//site settings
window.location = L_Menu_BaseUrl + "/_layouts/settings.aspx";
 
//site admins
window.location = L_Menu_BaseUrl + "/_layouts/mngsiteadmin.aspx";
 
//change master page
window.location = L_Menu_BaseUrl + "/_layouts/changesitemasterpage.aspx";
 
//Access request email
window.location = L_Menu_BaseUrl + "/_layouts/setrqacc.aspx";
 
//Site Permissions
window.location = L_Menu_BaseUrl + "/_layouts/user.aspx";
 
//WebPart Maintenance Page
window.location=window.location+((window.location.toString().indexOf("?")==-1)?"?":"&")+"contents=1";
 
//Site Collection Features
window.location = L_Menu_BaseUrl + "/_layouts/ManageFeatures.aspx?Scope=Site";
 
//Site Features
window.location = L_Menu_BaseUrl + "/_layouts/ManageFeatures.aspx";
 
//Add a webpart
window.location=window.location+((window.location.toString().indexOf("?")==-1)?"?":"&")+"displaymode=Catalog";

//Set up Groups
window.location = L_Menu_BaseUrl + "/_layouts/permsetup.aspx";
