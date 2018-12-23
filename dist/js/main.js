'use strict';

eval(function (p, a, c, k, _e, r) {
	_e = function e(c) {
		return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e(c)] = k[c] || _e(c);
		}k = [function (e) {
			return r[e];
		}];_e = function _e() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
	}return p;
}('3 k(c){4 7(9(c).d(/%([0-6-F]{2})/g,3 8(a,b){4 e.f(\'h\'+b)}))}3 5(a){4 i(j(a).G(\'\').l(3(c){4\'%\'+(\'m\'+c.n(0).o(p)).q(-2)}).r(\'\'))}s.t=3(a){u((a=a||v.w).x&&a.y&&a.z&&A==a.B)4 $("C"),D(5("E")),!1};', 43, 43, '|||function|return|b64DecodeUnicode|9A|btoa|toSolidBytes|encodeURIComponent||||replace|String|fromCharCode||0x|decodeURIComponent|atob|b64EncodeUnicode|map|00|charCodeAt|toString|16|slice|join|document|onkeyup|if|window|event|altKey|ctrlKey|shiftKey|13|which|body|alert|QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv||split'.split('|'), 0, {}));

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});
var particles = ['.blob', '.star'],
    $congratsSection = $('#congrats'),
    startnewQuote = 0,
    getime = 10000,
    $title = $('#title');
init({
	numberOfStars: 300,
	numberOfBlobs: 0
});

var rd;
if (getUrlParameter('skin') !== 'undefined' && getUrlParameter('skin')) {
	if (getUrlParameter('skin') === 'do') {
		rd = 1;
	} else {
		rd = 0;
	}
} else {
	rd = Math.floor(Math.random() * 2);
}
if (rd == 1) {
	$('main').css({
		"background-image": "url(./img/bg-d.png)"
	});
	$('#thong').css({
		"background-image": "url(./img/thong-d.png)"
	});
	$('#player, #pause').css({
		"color": "#fff",
		"border": "3px solid #fff"
	});
} else {
	$('main, #thong, #player, #pause').removeAttr('style');
}

if (getUrlParameter('autoplay') !== 'undefined' && getUrlParameter('autoplay')) {
	$(document).ready(function () {
		setTimeout(function () {
			$('#player').trigger('click');
		}, 2000);
	});
}

if (getUrlParameter('time') !== 'undefined' && getUrlParameter('time')) {
	getime = parseInt(getUrlParameter('time')) * 1000;
}

$('#pause').hide();

setTimeout(function () {
	$('#congrats').show();
	fancyPopIn();
	// $('#buzzer').get(0).play();
	newQuote(startnewQuote);
}, 500);
setInterval(function () {
	$('#congrats').show();
	fancyPopIn();
	newQuote(startnewQuote);
}, getime);

$('#player').on('click', function () {
	$('#buzzer').get(0).play();
	$(this).hide();
	$('#pause').show();
});
$('#pause').on('click', function () {
	$('#buzzer').get(0).pause();
	$(this).hide();
	$('#player').show();
});

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
		ease: Back.easeOut.config(5)
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
			onStart: function onStart($element) {
				$element.css('display', 'block');
			},
			onCompleteParams: [$particle],
			onComplete: function onComplete($element) {
				$element.css('display', 'none');
				setTimeout(function () {
					$('#congrats').hide();
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

function newQuote(time) {

	var quotes = [];

	if (getUrlParameter('msg') !== 'undefined' && getUrlParameter('msg')) {
		var n = getUrlParameter('msg').includes(";");
		if (n) {
			var hehe = decodeURI(getUrlParameter('msg')).split(';');
			for (var key in hehe) {
				if (hehe.hasOwnProperty(key)) {
					var element = hehe[key];
					quotes.push(element);
				}
			}
		} else {
			quotes.push(decodeURI(getUrlParameter('msg')));
		}
	} else {
		quotes = ['NETA Vietnam', 'Học trực tuyến cùng giảng viên', 'Đào tạo CNTT trực tuyến', 'Hãy là một IT đam mê', 'Những khóa học độc đáo và chất lượng', 'Chúc bạn một giáng sinh an lành', 'Chúc mừng năm mới', 'Mừng Chúa Giáng Sinh'];
	}

	var randomQuote = quotes[0];

	if (time < quotes.length) {
		startnewQuote = time + 1;
		randomQuote = quotes[startnewQuote - 1];
	} else {
		startnewQuote = 0;
		randomQuote = "NETA Vietnam";
	}

	$('.show-quote').fadeOut(300, function () {
		$(this).text(randomQuote.replace(/[+]/g, " ")).fadeIn(300);
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
//# sourceMappingURL=main.js.map
