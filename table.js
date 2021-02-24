     /////////////Ajax Requests////////////
     $(document).ready(function() {
        // Fetch the initial table
        refreshTable();
    
        // Fetch every 1 second
        setInterval(refreshTable, 1000);
    });
    
    function refreshTable(){
        
        // var trHTML = '';	    
        
        $.getJSON("https://spreadsheets.google.com/feeds/list/1IidzqfDy00SgMu-tGNXn3BEoLSyGtyQCcOIVzwMdLXs/5/public/full?alt=json", function(data) {
        	
            	var trHTML = '';

            	for (var i = 0; i < data.feed.entry.length; ++i) {
                	var myData_map, myData_order;

                    trHTML += '<tr><td>' + data.feed.entry[i].gsx$orderid.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$item.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$priority.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$city.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$orderdispatched.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$ordershipped.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$orderdateandtime.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$dispatchtime.$t +
                                  '</td><td>' + data.feed.entry[i].gsx$shippingtime.$t +
                        	  '</td></tr>';

                }

                console.log(trHTML);
        		$('#tableContent').html(trHTML);
        		var trHTML = '';

        	});	 
    }	
 