(function () {
  //Get List names
  var clientContext, lists, goToList, commonPages;
  clientContext = new SP.ClientContext.get_current();
  lists = clientContext.get_web().get_lists();
  clientContext.load(lists);
  goToList = function (listTitle) {
    if (listTitle.indexOf('@') === 0) {
      window.location = commonPages[listTitle];
    } else {
      var targetList = lists.getByTitle(listTitle);
      clientContext.load(targetList);
      clientContext.executeQueryAsync(function () {
        window.location = targetList.get_defaultViewUrl();
      });
    }
  };
  clientContext.executeQueryAsync(function () {
    var listEnum, allLists, list, script, runAfterJQueryUILoaded,
      layoutsUrl, currentLocation, key;
    listEnum = lists.getEnumerator();
    allLists = [];
    while (listEnum.moveNext()) {
      list = listEnum.get_current();
      allLists.push(list.get_title());
    }
    //Add common layouts pages
    layoutsUrl = L_Menu_BaseUrl + '/_layouts/';
    currentLocation = window.location.toString();
    currentLocation = currentLocation + (currentLocation.indexOf("?") === -1) ? "?" : "&";
    commonPages = {
      '@ViewAllSiteContent' : layoutsUrl + 'viewlsts.aspx',
      '@SiteSettings' : layoutsUrl + 'settings.aspx',
      '@SiteCollectionAdmins' : layoutsUrl + 'mngsiteadmin.aspx',
      '@ChangeSiteMasterPage': layoutsUrl + "changesitemasterpage.aspx",
      '@AccessRequestEmail': layoutsUrl + 'setrqacc.aspx',
      '@SitePermissions' : layoutsUrl + 'user.aspx',
      '@WebPartMaintenancePage' : currentLocation + "contents=1",
      '@SiteFeatures' : layoutsUrl + 'ManageFeatures.aspx',
      '@SiteCollectionFeatures' : layoutsUrl + 'ManageFeatures.aspx?Scope=Site',
      '@AddWebPart' : currentLocation + "displaymode=Catalog",
      '@SetupSiteGroups' : layoutsUrl + 'permsetup.aspx'
    };
    //add commonPages to autocomplete source
    for (key in commonPages) {
      if (commonPages.hasOwnProperty(key)) {
        allLists.push(key);
      }
    }
    //Load JQuery
    script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src",
      "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
    document.body.appendChild(script);

    //wait for it to load
    (runAfterJQueryUILoaded = function () {
      if (typeof $ !== "function") {
        setTimeout(runAfterJQueryUILoaded, 200);
      } else {
        //load jqueryui css
        $("head")
          .append("<link rel='stylesheet' type='text/css' " +
            "href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/base/" +
            "jquery.ui.theme.css'>")
          .append("<link rel='stylesheet' type='text/css' " +
            "href='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/base/" +
            "jquery.ui.autocomplete.css'>");
        //load jQueryUI for autocomplete, from cache is ok
        $.ajaxSetup({
          cache : true
        });
        $.getScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js")
          .done(
            function () {
              var commandBox;
              //Create textbox
              (commandBox = $(
                "<div style='" +
                  "display: block; " +
                  "background-color: white; " +
                  "position: absolute; " +
                  "top: 3px; " +
                  "left: 3px;'>" +
                  "</div>"
              ).appendTo("body"))
                .append(
                  $("<input/>")
                    .autocomplete({
                      source: allLists,
                      select: function (e, textBox) {
                        var targetList;
                        if (textBox.item && textBox.item.value) {
                          goToList(textBox.item.value);
                        }
                      }
                    })
                    .keypress(
                      function (e) {
                        var targetList;
                        if (e.which === 13) {
                          // enter pressed
                          goToList(this.value);
                        } else if (e.which === 27) {
                          // escape pressed
                          $(commandBox).hide();
                        }
                      }
                    )
                ).children().first().focus();
            }
          );
      }
    })();
  });
})();