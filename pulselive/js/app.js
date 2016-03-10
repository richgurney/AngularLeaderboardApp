angular
  .module("cricket", []);

  $( document ).ready(function() {
  	$("#menu-toggle").click(function(e) {
  	    e.preventDefault();
  	    $("#wrapper").toggleClass("toggled");
  	});
  });  

  