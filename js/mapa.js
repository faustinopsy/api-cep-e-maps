var geocoder;
var map;
var marker;

function initialize() {
	if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(function (position)
      { var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map.setCenter(location);
      map.setZoom(13);
	  
   });
   var latlng = new google.maps.LatLng(36,204, 138,252);
	var options = {
		zoom: 7,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		
	};
	
	map = new google.maps.Map(document.getElementById("mapa"), options);
	
	geocoder = new google.maps.Geocoder();
	
	marker = new google.maps.Marker({
		map: map,
		draggable: true,
	});
	
	marker.setPosition(latlng);
}
	

	
}

$(document).ready(function () {

	initialize();
	
	function carregarNoMapa(endereco) {
		geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
		
					$('#x_endereco').val(results[0].formatted_address);
					$('#x_utmx').val(latitude);
                   	$('#x_utmy').val(longitude);
		
					var location = new google.maps.LatLng(latitude, longitude);
					marker.setPosition(location);
					map.setCenter(location);
					map.setZoom(16);
				}
			}
		})
	}
	
	$("#btnEndereco").click(function() {
		if($(this).val() != "")
			carregarNoMapa($("#x_endereco").val());
	})
	
	$("#cep").blur(function() {
		if($(this).val() != "")
			carregarNoMapa($(this).val());
	})
	
	google.maps.event.addListener(marker, 'drag', function () {
		geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {  
					$('#x_endereco').val(results[0].formatted_address);
					$('#x_utmx').val(marker.getPosition().lat());
					$('#x_utmy').val(marker.getPosition().lng());
				}
			}
		});
	});
	
			
	$("#x_endereco").autocomplete({
		source: function (request, response) {
			geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
				response($.map(results, function (item) {
					return {
						label: item.formatted_address,
						value: item.formatted_address,
						latitude: item.geometry.location.lat(),
          				longitude: item.geometry.location.lng()
					}
				}));
			})
		},
		select: function (event, ui) {
			$("#x_utmx").val(ui.item.latitude);
    		$("#x_utmy").val(ui.item.longitude);
			var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
			marker.setPosition(location);
			map.setCenter(location);
			map.setZoom(18);
		}
	});
	
	$("form").submit(function(event) {
		event.preventDefault();
		
		var endereco = $("#x_endereco").val();
		var latitude = $("#x_utmx").val();
		var longitude = $("#x_utmy").val();
		
		
		
	
	});

});