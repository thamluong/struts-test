var tableUnion3Master;

/**
 * execute when load page
 */
$(document).ready(
		function() {
			tableUnion3Master = $('#union3-table').DataTable(
			{
				"sScrollY" : "500px",
				"lengthMenu" : [ 10, 20, 50, 100 ],
				"fnInitComplete" : function() {
					$('.dataTables_scrollBody').perfectScrollbar();
				}});
			
			tableUnion3Master.on( 'order.dt search.dt', function () {
				tableUnion3Master.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
		            cell.innerHTML = i+1;
		        } );
		    } ).draw();

			// CLICK NEW BUTTON
			$("#newButton").click(function() {
				$("#mode").val("NEW");
				clearPopup();

				// show popup
            	$("#myModal").on('shown.bs.modal', function () {
            		setTabIndexPopup("NEW");
            	});

				$("#myModal").modal();
			});
		});

$(document).on('click', '#union3-table [data-type = "modal"]', function(event) {
	// here whenever click events are operated
	
});

function clearPopup() {
	$("#category").val("");
	$("#classCd").val("");
	
	document.getElementById("category").removeAttribute("disabled");
};

function changeValidDate(obj) {
	// format like '28.Dec.2014'
	var regx1 = /^\d{2}\.[A-Z][a-z]{2}\.\d{4}$/g,
	// format like '28122014'
	regx2 = /^\d{8}$/g,
	// format like '28/12/2014'
	regx3 = /^\d{2}\/\d{2}\/\d{4}$/g,
	// format like '28-12-2014'
	regx4 = /^\d{2}-\d{2}-\d{4}$/g;
	// input date
	
	
};

function loading_ajax(){
	$('body').append('<div id="mpb_loadingAjax"></div>');
    $('#mpb_loadingAjax').fadeIn(300);
};


function submitForm(params, actionName, methodType, page) {
	loading_ajax();
	$.ajax({
		cache : false,
		url : actionName,
		type : methodType,
		data : params,
		dataType : "json",
		contentType : "application/json; charset=utf-8",
		success : function(response) {
			close_loading_ajax();
			var messageId = response.messageId;
			var Fb = response.fBeandata;
			if (messageId != null && messageId != "") {
				showErrorDialog(messageId)
			} else {
				var fam003List = response.data;
				drawData(fam003List, page);
				closePopup();
				setTabIndex();
			}
		},
		error : function(jqXhr, textStatus, errorThrown) {
			alert(textStatus);
			close_loading_ajax();
		}
	});

}