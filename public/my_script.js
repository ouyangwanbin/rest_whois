$(document).ready(function( ){
	$("#submit").click( function( ){
		//frozen the UI
		frozenUI( true );
		var domains = $("#domains").val();
		$.ajax({
			url:'/domains',
			type:'POST',
			dataType:'json',
			data:{domains:domains},
			success:function( result ){
				//unfrozen UI
				frozenUI( false );
				if( result.status === 'success' ){
					$("#result").empty();
					var res_array = result.data;
					for( var i=0; i<res_array.length; i++ ){
						var title = $(document.createElement('h3'));
						title.text( res_array[i].domain );
						$("#result").append( title );
						$("#result").append( createTable( res_array[i].info ) );
					}
				}
			},
			error : function (xhr,status,error){
				//unfrozen UI
				frozenUI( false );
				console.log( error );
			}
		})
	});
})

function createTable( result ){
	var lines = result.split( '\n' );

	var table = document.createElement('table');
	table.className = 'table table-bordered';
	for( var i=0; i<lines.length; i++ ){
		var line = $.trim( lines[i] );
		if( line.length === 0 ){
			continue;
		}
		var tr = document.createElement('tr');
		if( line.split(':').length !== 2){
			var td = document.createElement('td');
			td.colSpan = 2;
			td.innerHTML = line;
			tr.appendChild( td );
		}else{
			var td = document.createElement('td');
			td.innerHTML = line.split(':')[0];
			tr.appendChild( td );
			td = document.createElement('td');
			td.innerHTML = line.split(':')[1];
			tr.appendChild( td );
		}
		table.appendChild(tr);
	}
	return $(table);
}

function frozenUI( flag ){
	$("#submit").prop( 'disabled' , flag );
}