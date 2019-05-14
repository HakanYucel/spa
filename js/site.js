//site.js


function todoChecked(state,ID) {

	if(state == true)
		{return '<input type="checkbox" data-todoid="'+ ID +'" class="todoCheckbox" checked>'}
	else
		{return '<input type="checkbox" data-todoid="'+ ID +'" class="todoCheckbox">'}


}


function postTable(ID) {
	 var UserID =  ID;
	$('#postTable').DataTable().clear().draw();
	$.get("https://jsonplaceholder.typicode.com/posts?userId="+UserID, function (postsData) {
	
		$.each( postsData, function( i, posts ) {

			
				$('#postTable').DataTable().row.add( {
				        0: posts.id,
				        1: posts.title,
				        2: '<div class="postDetailButton" data-postid="'+posts.id+'"><i class="fas fa-info-circle"></i></div>'} ).draw(); 

		});

	});
}//postTable



function todosTable(ID) {
	 var UserID =  ID;
	$('#postTable').DataTable().clear().draw();
	$.get("https://jsonplaceholder.typicode.com/todos?userId="+UserID, function (todosData) {
	
		$.each( todosData, function( i, todos ) {

			
				$('#todosTable').DataTable().row.add( {
				        0: todoChecked(todos.completed,todos.id),
				        1: todos.title,
				        2: '<div class="d-flex align-center justify-content-around todo-element" data-todoid="'+todos.id+'"><div class="edit"> <i class="far fa-edit"></i></div><div class="delete"><i class="far fa-trash-alt"></i></div></div>'
				    } ).draw(); 


		});

	});
}//postTable




$(document).ready(function(){

	$.get("https://jsonplaceholder.typicode.com/users", function (usersData) {

		$.each( usersData, function( i, users ) {
			$('#userSelect').append($('<option>', {value:users.id, text:users.name } ) );
		});

	});

	$('#postTable').DataTable({
		columns: [
	            { title: "id" },
	            { title: "Title" },
	            { title: "Detail" },
	        ],
	    "lengthMenu": [[5, 10], [5, 10]]
	});


	$('#todosTable').DataTable({
		columns: [
	            { title: "Completed" },
	            { title: "Title" },
	            { title: "Detail" },
	        ],
	    "lengthMenu": [[5, 10], [5, 10]]
	});






// slider 


     swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 45,
        stretch: 0,
        depth: 100,
        modifier: 5,
        slideShadows : true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
 




//slider





}); //ready

$('#userSelect').change(function(){

 var UserID = $(this).val();

 	//userDetail
	$.get("https://jsonplaceholder.typicode.com/users/" + UserID, function (user) {

			$('#userName').html(user.username);
			$('#userMail').html(user.email);
			$('#userAddressStreet').html(user.address.street);
			$('#userAddressSuite').html(user.address.suite);
			$('#userAddressCity').html(user.address.city);
	});


	//userDetail


//album-list 
$( ".album-list" ).html();
$.get("https://jsonplaceholder.typicode.com/albums?userId=" + UserID, function (albumData) {
	$.each( albumData, function( i, albums ) {
		console.log(albums.id)
		$('.album-list').append('<li data-albumid="'+ albums.id +'"><img src="https://via.placeholder.com/150x100" class="mr-1"> <span>'+ albums.title +'</span></li>');
	});

$( ".album-list li" ).eq(1).trigger('click');
});
//album-list




postTable(UserID);
todosTable(UserID);





});//userselect





$( ".album-list" ).on( "click", "li", function() {


	dropdownItem = $(this).html();
	albumID = $(this).attr('data-albumid');

	$('.dropdown-inner').html(dropdownItem);



	swiper.removeAllSlides();	


	$.get("https://jsonplaceholder.typicode.com/photos?albumId=" + albumID, function (photosData) {
console.log(photosData);
		$.each( photosData, function( i, photos ) {

			swiper.addSlide(i, '<div class="swiper-slide"><img src="'+ photos.url  +'" /></div>')
			console.log(photos.url );
			});
	});





	});




$( "#postTable" ).on( "click", ".postDetailButton", function() {
  	
  postID = $(this).attr('data-postid');

	$.get("https://jsonplaceholder.typicode.com/posts/" + postID, function (postSingleData) {

			$('.postDetailModalTitle').html(postSingleData.title);
			$('.postModalBody').html(postSingleData.body);

	});

$('.postModalComments').html();
	$.get('https://jsonplaceholder.typicode.com/comments?postId='+ postID, function (postCommentsData) {
		$.each( postCommentsData, function( i, postComments ) {
			$('.postModalComments').append('<div class="post-comment-row"> <p><b>'+ postComments.name  +'</b></p><p>'+ postComments.body +'</p></div>');
		});
		
	});//get comments

$('#postDetailModal').modal('show')

})





$( "#todosTable" ).on( "click", ".todoCheckbox", function() {

 var todoid = $(this).attr('data-todoid');

  var checkbox = $(this);
    if (checkbox.is(':checked')) {
        bootbox.confirm("Are you sure?", function (result) {
            if (result == true) {
                // your code


                var patch = {
				    "completed" : "true"
				};

				/*
				$.ajax({
				   type: 'PATCH',
				   url: 'https://jsonplaceholder.typicode.com/todos/' + todoid,
				   data: JSON.stringify(patch),
				   processData: false,
				   contentType: 'application/merge-patch+json',

				});
				*/
                ///

            } else {
                checkbox.prop('checked', false);
            }
        });
    }else
    {

    		 var patch = {
				    "completed" : "false"
				};

				/*
				$.ajax({
				   type: 'PATCH',
				   url: 'https://jsonplaceholder.typicode.com/todos/' + todoid,
				   data: JSON.stringify(patch),
				   processData: false,
				   contentType: 'application/merge-patch+json',

				});
				*/
    }

});//checkbox



$( "#todosTable" ).on( "click", ".delete", function() { 

var todoid = $(this).parent().attr("data-todoid");


        bootbox.confirm("Are you sure?", function (result) {
            if (result == true) {
                // your code

                /*
				$.ajax({
				   	 url: 'https://jsonplaceholder.typicode.com/todos/' + todoid,
				     type: 'DELETE',
				});
				*/

				$('.todo-element[data-todoid="'+todoid+'"]').parent().parent().remove();
                ///

            } 
        });


});


$( "#todosTable" ).on( "click", ".edit", function() { 

var todoid = $(this).parent().attr("data-todoid");
var CurrentTitle = $(this).parent().parent().prev().html();

        bootbox.prompt(
        {
        	title:"Update To-do",
        	value:CurrentTitle,
        	callback: function (result) {
         

				$('.todo-element[data-todoid="'+todoid+'"]').parent().prev().html(result);
                

            
        }
    });


});





$( ".add-todo" ).on( "click",function() { 
        bootbox.prompt(
        {
        	title:"Add To-do",
        	callback: function (result) {
         		//burada yeni eleman ekledikten sonra tabloyu tekrar çekmem gerekiyordu fakat yeni eleman ekleyemediğim için random id ürettim
        		randomID = Math.floor(Math.random() * 6) + 1;
			    $('#todosTable').DataTable().row.add( {
				        0: todoChecked(false,randomID),
				        1: result,
				        2: '<div class="d-flex align-center justify-content-around todo-element" data-todoid="'+ randomID +'"><div class="edit"> <i class="far fa-edit"></i></div><div class="delete"><i class="far fa-trash-alt"></i></div></div>'
				    } ).draw(); 


                   
        }
    });

});







