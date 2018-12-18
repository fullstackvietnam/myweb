$('input').each(function(){
	$(this).on('change', function(){
		console.log($(this).val())
	})
})
