(function () {
  //Get List names
  var clientContext, lists, goToList;
  clientContext = new SP.ClientContext.get_current();
  lists = clientContext.get_web().get_lists();
  clientContext.load(lists);
  goToList = function (listTitle) {
    var targetList = lists.getByTitle(listTitle);
    clientContext.load(targetList);
    clientContext.executeQueryAsync(function () {
      window.location = targetList.get_defaultViewUrl();
    });
  };
  clientContext.executeQueryAsync(function () {
    var listEnum, allLists, list, script, runAfterJQueryUILoaded;
    listEnum = lists.getEnumerator();
    allLists = [];
    while (listEnum.moveNext()) {
      list = listEnum.get_current();
      allLists.push(list.get_title());
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
        //load jQueryUI for autocomplete
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