document.getElementById("submitBtn").addEventListener("click", function () {
  const x = document.getElementById("username").value;
  const y = document.getElementById("pass").value;
  document.getElementById("new").innerHTML = "Your passsword " + x + " is " + y ;
  this.style.backgroundColor = "blue";
});