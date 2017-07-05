$(document).ready(function () {

	$('.btn-1').click(function () {
		$('.overlay, .popup__consultation').fadeIn(500);
		return false;
	});

	$('.btn-2').click(function () {
		$('.overlay, .popup__master').fadeIn(500);
		return false;
	});

	$('.overlay, .popup__close').click(function () {
		$('.overlay, .popup').fadeOut(500);
	});


	/*menu*/


	// Cache selectors
	var lastId,
		topMenu = $(".header__menu"),
		topMenuHeight = topMenu.outerHeight() + 1,
		// All list items
		menuItems = topMenu.find(".header__menu-link"),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function() {
			var item = $($(this).attr("href"));
			if (item.length) {
				return item;
			}
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e) {
		var href = $(this).attr("href"),
			offsetTop = $(href).offset().top;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 1500);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function() {
		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop)
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass("active")
				.end().filter("[href='#" + id + "']").parent().addClass("active");
		}
	});
	/*end menu*/
	$(".form__data1").submit(function () {

		var name1 = $('#name1').val();
		var phone1 = $('#phone1').val();
		if ((name1.length === 0) || (phone1.length === 0)) {
			alert('Заполните все поля');
			return false;
		} else {
			$.ajax({
				type: "POST",
				url: "send-request.php",
				data: $(this).serialize(),
				success: function (result) {
					$('form.form__data1 :input').removeAttr('disabled');
					$('form.form__data1 :text').val('');
					$('.popup__thanks, .overlay').fadeIn(300);
				}
			});
			return false;
		}
	});
	$(".form__data2").submit(function () {

		var name2 = $('#name2').val();
		var phone2 = $('#phone2').val();
		if ((name2.length === 0) || (phone2.length === 0)) {
			alert('Заполните все поля');
			return false;
		} else {
			$.ajax({
				type: "POST",
				url: "send-consultation.php",
				data: $(this).serialize(),
				success: function (result) {
					$('form.form__data2 :input').removeAttr('disabled');
					$('form.form__data2 :text').val('');
					$('.popup').fadeOut(300);
					$('.popup__thanks').fadeIn(300);
				}
			});
			return false;
		}
	});
	$(".form__data3").submit(function () {

		var name3 = $('#name3').val();
		var phone3 = $('#phone3').val();
		if ((name3.length === 0) || (phone3.length === 0)) {
			alert('Заполните все поля');
			return false;
		} else {
			$.ajax({
				type: "POST",
				url: "send-master.php",
				data: $(this).serialize(),
				success: function (result) {
					$('form.form__data3 :input').removeAttr('disabled');
					$('form.form__data3 :text').val('');
					$('.popup').fadeOut(300);
					$('.popup__thanks').fadeIn(300);
				}
			});
			return false;
		}
	});


});
