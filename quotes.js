$(document).ready(function() {
	getQuote();
	$("button").on("click", function() {
		getQuote();
	});
});

function getQuote() {
	$.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?", function (data) {
		var content = '<i class="fa fa-quote-left" aria-hidden="true"></i>' + data[0].content + '<i class="fa fa-quote-right" aria-hidden="true"></i>';
		var author = '<p id="author">&mdash; ' + data[0].title + '</p>';
		var link = data[0].link;
		var quote = content + author;

		randomColor();
		$("#quote").html(quote);

		tweet = parseTweet(quote, link);

		$("#twitter").attr("href", href="https://twitter.com/intent/tweet?text=" + tweet);
	});
}

function parseTweet(quote, link) {

	// remove HTML tags from the text
	var tweet = $(quote).text();

	// if longer than 140 characters, reduce and include link to quote
	if (tweet.length > 140) {
		// all links will be altered to 23 char by t.co service
		var tweet = tweet.substring(0, 111) + "[...] " + link; //
	}

	return tweet;
}

function randomColor() {
	// chose random red, green and blue hues
	// 200 set for readability of white text
	var colors = [];

	for (var i = 0; i < 3; i++) {
		colors[i] = Math.floor(Math.random() * 200);
	}

	$("body").css("background", "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")");
}