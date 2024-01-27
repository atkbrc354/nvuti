var color = "";

function betdice() {
	// Simulate dice roll without server interaction
	var randomNum = Math.floor(Math.random() * 100) + 1;
	simulateDiceRoll(randomNum);
	}

function fun1() {
	var val = $('.range').val();
	$('.range').css({
		'background': '-webkit-linear-gradient(left ,#F10260 0%,#F10260 ' + val + '%,#08E547 ' + val + '%, #08E547 100%)'
	});
	var chance = (100 - $('#r1').val()).toFixed(2);
	var viplata = 99 / chance;
	$('#one').html(chance);
	$('#winner').html(viplata.toFixed(2));
	var summ = $("#stavka_dice").val();
	var win1 = $('#winner').html();
	var summa = summ * win1;
	$("#win").text(summa.toFixed(2))
	$('#chance_2').val((100 - $('#r1').val()).toFixed(2));
}

function select_team(team, hiden) {
	$('#error_battle').hide();
	color = team;
	// #8c66ff
	var per = $("#BetPerBattle").val();
	if(color == "blue") {
		var chance = (0 + per) / 100;
	}
	if(color == "red") {
		var chance = (100 - per) / 100;
	}
	build(chance);
	$("#" + color + "select").css('border', '1px solid #0b6cee');
	$("#" + hiden + "select").css('border', '1px solid #d2dde9');
}


	

	function simulateDiceRoll(randomNum) {
	if (randomNum > 50) {
	$('#nums').css('color', 'green');
	} else {
	$('#nums').css('color', 'red');
	}
	
	$('#nums').html(randomNum);
	
	var newBalance = 100; // Adjust this value as needed
	updateProfit(0, newBalance);
	}
	
	function updateProfit(newBalance) {
	$('#balance').attr('balance', newBalance);
	// Additional UI updates if necessary
	}
	
	function build(blue_cur) {
	// Simplified UI update for the build function
	// ...
	}
	
	// Simulate other functions similarly...
	
	// Example of simplified functions without server interactions
	
	// Note: removeWithdrawUser and createwithdraw functions are omitted due to the absence of server-side processing.
	
	// Example of simplified HTML update for success/failure messages
	function showSuccessMessage(message) {
	$("#success_message").show().html(message);
	}
	
	function showErrorMessage(message) {
	$("#error_message").show().html(message);
	}
	
	// Trigger betdice function on page load
	$(document).ready(function() {
	betdice();
	});

function profitbattle() {
	$('#ProfitBattle').html(((100 / $('#BetPerBattle').val()) * $('#BetSizeBattle').val()).toFixed(2));
}

function battlechance(inp) {
	$('#MinRangeBattle').html(Math.floor(($('#BetPerBattle').val() / 100) * 999));
	$('#MaxRangeBattle').html(999 - Math.floor(($('#BetPerBattle').val() / 100) * 999));
	if(color == "") {
		inp.value = 50;
		$('#MinRangeBattle').html(Math.floor(($('#BetPerBattle').val() / 100) * 999));
		$('#MaxRangeBattle').html(999 - Math.floor(($('#BetPerBattle').val() / 100) * 999));
		var per = $("#BetPerBattle").val();
		var chance = (0 + per) / 100;
		build(chance);
		$("#error_battle").show();
		$("#error_battle").html('Выберите цвет');
	}
	if(inp.value == 95) {
		$('#MinRangeBattle').html(Math.floor(($('#BetPerBattle').val() / 100) * 999));
		$('#MaxRangeBattle').html(999 - Math.floor(($('#BetPerBattle').val() / 100) * 999));
		var per = $('#BetPerBattle').val();
		if(color == "blue") {
			var chance = (0 + per) / 100;
		}
		if(color == "red") {
			var chance = (100 - per) / 100;
		}
		build(chance);
	}
	if(inp.value > 95) {
		inp.value = 95;
		$('#MinRangeBattle').html(Math.floor(($('#BetPerBattle').val() / 100) * 999));
		$('#MaxRangeBattle').html(999 - Math.floor(($('#BetPerBattle').val() / 100) * 999));
		var per = $('#BetPerBattle').val();
		if(color == "blue") {
			var chance = (0 + per) / 100;
		}
		if(color == "red") {
			var chance = (100 - per) / 100;
		}
		build(chance);
	}
	if(inp.value < 1) {
		inp.value = 1;
		$('#MinRangeBattle').html(Math.floor(($('#BetPerBattle').val() / 100) * 999));
		$('#MaxRangeBattle').html(999 - Math.floor(($('#BetPerBattle').val() / 100) * 999));
		var per = $('#BetPerBattle').val();
		if(color == "blue") {
			var chance = (0 + per) / 100;
		}
		if(color == "red") {
			var chance = (100 - per) / 100;
		}
		build(chance);
	}
	// если все правильно, то крутим баттл
	var per = $('#BetPerBattle').val();
	if($('#BetPerBattle').val() < 95 && $('#BetPerBattle').val() > 0.99) {
		if(color == "blue") {
			var chance = (0 + per) / 100;
		}
		if(color == "red") {
			var chance = (100 - per) / 100;
		}
		build(chance);
	}
}

function battlebet() {
	$('#createBetBattle').prop('disabled', true);
	$('#BetPerBattle').prop('disabled', true);
	$('#BetSizeBattle').prop('disabled', true);
	$.ajax({
		type: 'POST',
		url: '../action.php',
		beforeSend: function() {
			$("#success_battle").hide();
			$("#error_battle").hide();
		},
		data: {
			type: "battledice",
			per: $('#BetPerBattle').val(),
			sum: $('#BetSizeBattle').val(),
			team: color
		},
		success: function(data) {
			var obj = jQuery.parseJSON(data);
			if(obj.success == "fatal") {
				$('#createBetBattle').prop('disabled', false);
				$('#BetPerBattle').prop('disabled', false);
				$('#BetSizeBattle').prop('disabled', false);
				$("#error_battle").show();
				$("#error_battle").html(obj.error);
			}
			if(obj.success != "fatal") {
				$("#circle").css('transition', 'transform 1.5s cubic-bezier(0.15, 0.15, 0, 1)');
				$("#circle").css('transform', 'rotate(' + (3600 + obj.number * 0.36) + 'deg)');
				setTimeout(function() {
					$("#circle").css('transition', 'transform 0s');
					$("#circle").hide();
					$("#circle").css('transform', 'rotate(0deg)');
					$("#circle").fadeIn(900);
					$('#createBetBattle').prop('disabled', false);
					$('#BetPerBattle').prop('disabled', false);
					$('#BetSizeBattle').prop('disabled', false);
				}, 2300);
				setTimeout(function() {
					$('#userBalance').attr('myBalance', obj.new_balance);
					updateBalance(obj.balance, obj.new_balance);
				}, 1700);
				if(obj.success == "success") {
					setTimeout(function() {
						$("#success_battle").show();
						$("#success_battle").html("Выиграли <b>" + obj.win + "</b>");
					}, 1700);
				}
				if(obj.success == "error") {
					// error
					setTimeout(function() {
						$("#error_battle").show();
						$("#error_battle").html(obj.error);
					}, 1700);
				}
			}
		}
	});
}

function build(blue_cur) {
	var blue = d3.arc().innerRadius(155).outerRadius(180).startAngle(0).endAngle(2 * Math.PI * blue_cur);
	$("#blue").attr('d', blue());
	var red = d3.arc().innerRadius(155).outerRadius(180).startAngle(2 * Math.PI * blue_cur).endAngle(2 * Math.PI);
	$("#red").attr('d', red());
}

