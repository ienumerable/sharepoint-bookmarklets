(function () {
  var newDate, newDateArray, newMonth, newDay, newYear, itemDialogUrl,
    clientContext, listId, itemId, list, item;
  // Propmpt for updated date
  newDate = prompt("Enter new date, mm/dd/yyyy format");
  newDateArray = newDate.match(/(\d\d)\/(\d\d)\/(\d\d\d\d)/);
  newMonth = newDateArray[1];
  newDay = newDateArray[2];
  newYear = newDateArray[3];
  // Try to find the v4 modal dialog first
  itemDialogUrl = document.getElementsByClassName("ms-dlgFrame")[0].src;
  //Get the List and Item ids
  listId = new RegExp(/ListId={([^&#]*)}&/)
                .exec(decodeURIComponent(itemDialogUrl))[1];
  itemId = new RegExp(/ID=([^&#]*)&/).exec(itemDialogUrl)[1];
  // Load
  clientContext = new SP.ClientContext.get_current();
  list = clientContext.get_web().get_lists().getById(listId);
  item = list.getItemById(itemId);
  clientContext.load(item);
  clientContext.executeQueryAsync(function () {
    // Set the new Created date
    var created = item.get_item("Created");
    created.setFullYear(newYear);
    created.setMonth(newMonth - 1);
    created.setDate(newDay);
    item.set_item("Created", created);
    item.update();
    clientContext.load(item);
    clientContext.executeQueryAsync(function () {
                                      window.location.reload();
                                    },
                                    function () {
                                      alert('failed');
                                    });
  });
})();