var particles = ['.blob', '.star'],
	$congratsSection = $('#congrats'),
	$title = $('#title');
init({
	numberOfStars: 300,
	numberOfBlobs: 0
});

$('#pause').hide()


setTimeout(() => {
	$('#congrats').show()
	fancyPopIn()
	// $('#buzzer').get(0).play();
	newQuote()
}, 500);
setInterval(() => {
	$('#congrats').show()
	fancyPopIn()
	newQuote()
}, 10000);

$('#player').on('click', function () {
	$('#buzzer').get(0).play();
	$(this).hide()
	$('#pause').show()
})
$('#pause').on('click', function () {
	$('#buzzer').get(0).pause();
	$(this).hide()
	$('#player').show()
})

function fancyPopIn() {
	reset();
	animateText();

	for (var i = 0, l = particles.length; i < l; i++) {
		animateParticles(particles[i]);
	}
}

function animateText() {
	TweenMax.from($title, 0.65, {
		scale: 0.4,
		opacity: 0,
		rotation: 15,
		ease: Back.easeOut.config(5),
	});
}

function animateParticles(selector) {
	var xSeed = _.random(1350, 1380);
	var ySeed = _.random(1120, 1170);

	$.each($(selector), function (i) {
		var $particle = $(this);
		var speed = _.random(1, 4);
		var rotation = _.random(20, 100);
		var scale = _.random(0.8, 1.5);
		var x = _.random(-xSeed, xSeed);
		var y = _.random(-ySeed, ySeed);

		TweenMax.to($particle, speed, {
			x: x,
			y: y,
			ease: Power1.easeOut,
			opacity: 0,
			rotation: rotation,
			scale: scale,
			onStartParams: [$particle],
			onStart: function ($element) {
				$element.css('display', 'block');
			},
			onCompleteParams: [$particle],
			onComplete: function ($element) {
				$element.css('display', 'none');
				setTimeout(function () {
					$('#congrats').hide()
				}, 4000);

			}
		});
	});
}

function reset() {
	for (var i = 0, l = particles.length; i < l; i++) {
		$.each($(particles[i]), function () {
			TweenMax.set($(this), {
				x: 0,
				y: 0,
				opacity: 1
			});
		});
	}

	TweenMax.set($title, {
		scale: 1,
		opacity: 1,
		rotation: 0
	});

}

function init(properties) {
	for (var i = 0; i < properties.numberOfStars; i++) {
		$congratsSection.append('<div class="particle star fa fa-star ' + i + '"></div>');
	}

	for (var i = 0; i < properties.numberOfBlobs; i++) {
		$congratsSection.append('<div class="particle blob ' + i + '"></div>');
	}
}


function newQuote() {

	var quotes = []

	if (getUrlParameter('msg') !== 'undefined' && getUrlParameter('msg')) {
		var n = getUrlParameter('msg').includes(";");
		if(n) {
			let hehe = decodeURI(getUrlParameter('msg')).split(';')
			for (let key in hehe) {
				if (hehe.hasOwnProperty(key)) {
					let element = hehe[key];
					quotes.push(element)
				}
			}
		} else {
			quotes.push(decodeURI(getUrlParameter('msg')))
		}
		
	} else {
		quotes = ['NETA Vietnam', 'Học trực tuyến cùng giảng viên', 'Đào tạo CNTT trực tuyến', 'Hãy là một IT đam mê', 'Những khóa học độc đáo và chất lượng', 'Chúc bạn một giáng sinh an lành', 'Chúc mừng năm mới', 'Mừng Chúa Giáng Sinh'];
	}

	var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	$('.show-quote').fadeOut(300, function () {
		$(this).text(randomQuote).fadeIn(300)
	});

}


function getUrlParameter(param, dummyPath) {
	var sPageURL = dummyPath || window.location.search.substring(1),
		sURLVariables = sPageURL.replace(/%2C/g, ",").replace(/%3B/g, ";").split(/[&||?]/),
		res;
	for (var i = 0; i < sURLVariables.length; i += 1) {
		var paramName = sURLVariables[i],
			sParameterName = (paramName || "").split("=");

		if (sParameterName[0] === param) {
			res = sParameterName[1];
		}
	}

	return res;
}
