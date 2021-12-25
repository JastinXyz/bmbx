function myFunction() {
  var copyText = document.getElementById("url");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  document.getElementById('copy').innerHTML = "<i class='fas fa-check-circle'></i>"
 setTimeout(function(){ document.getElementById('copy').innerHTML = "<i class='far fa-copy'></i>" }, 1000);
}