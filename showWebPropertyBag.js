(function () {
  var cc = new SP.ClientContext();
  var webProps = cc.get_web().get_allProperties();
  cc.load(webProps);
  cc.executeQueryAsync(function () {
     var fieldValues = webProps.get_fieldValues();
      var output = "";
      for (var key in fieldValues) {
         if(fieldValues.hasOwnProperty(key)) {
            output += (key + ":" + fieldValues[key] + "<br/>"); 
         }
      }
      var outputDiv = document.createElement("div");
      document.body.appendChild(outputDiv);
      outputDiv.innerHTML = output + "<br/><a href='' onClick='javascript:this.parentNode.style.display=\"hidden\";'>Close</a>";
      outputDiv.style.display = "block";
      outputDiv.style.position = "absolute";
      outputDiv.style.top=3;
      outputDiv.style.left=3;
      outputDiv.style.backgroundColor = "white";
      outputDiv.style.border = "1px solid black";
   }, function () {alert('error');});
})();