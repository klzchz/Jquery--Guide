//Variável que irá controlar a rodada
var rodada	=  1;
var matriz_jogo =  Array(3); // 
	
	matriz_jogo['a'] = Array(3);
	matriz_jogo['b'] = Array(3);
	matriz_jogo['c'] = Array(3);

	matriz_jogo['a'][1] =0;
	matriz_jogo['a'][2] =0;
	matriz_jogo['a'][3] =0;

	matriz_jogo['b'][1] =0;
	matriz_jogo['b'][2] =0;
	matriz_jogo['b'][3] =0;


	matriz_jogo['c'][1] =0;
	matriz_jogo['c'][2] =0;
	matriz_jogo['c'][3] =0;


// Chamando o elemento DOM
$(document).ready(function(){
	//Chamada por id  no botao  #btn_iniciar_jogo pela função .click
	$('#btn_iniciar_jogo').click(function(){

		//validação de dados
		if($('#entrada_apelido_1').val() == ''){
			alert('Apelido do Jogador 1 não foi preenchido');
			return false;
		}

			if($('#entrada_apelido_2').val() == ''){
			alert('Apelido do Jogador 2 não foi preenchido');
			return false;
		}

		//exibir apelidos
		$('#nome_jogador_1').html($('#entrada_apelido_1').val());
		$('#nome_jogador_2').html($('#entrada_apelido_2').val());

		//controla as visualizações das divs por id

		$('#pagina_incial').hide();
		$('#palco_jogo').show();
	});

	//ação da jogada por classe

	$('.jogada').click(function(){
		// recupera o id de cada campo
		var id_campo_clicado = this.id;
		$('#'+id_campo_clicado).off();
		jogada(id_campo_clicado);


	});
	//função irá dar ação para as jogadas

	function jogada(id){
		var icone = '';
		var ponto = 0;

		if ((rodada % 2) == 1){
			 
			ponto = -1;
			icone = 'url("imagens/marcacao_1.png")';
			// alert(' é a vez do Jogador 1');
		}else{
			
			ponto = 1;
			icone = 'url("imagens/marcacao_2.png")';
			// alert(' é a vez do Jogador 2');
		}
		rodada++;
		$('#'+id).css('background-image',icone);

		var linha_coluna = id.split('-');
		matriz_jogo[linha_coluna[0]][linha_coluna[1]] =  ponto;
		
		// console.log(matriz_jogo);
		verifica_combinacao();


	}	

	function verifica_combinacao(){

		//verifica na horizontal
		//linha A
		var pontos = 0;
		for (var i = 1; i <= 3; i++ ){
			pontos += matriz_jogo['a'][i];
		}

		ganhador(pontos);
		// linha B
		pontos = 0;

			for (var i = 1; i <= 3; i++ ){
			pontos += matriz_jogo['b'][i];
		}
		ganhador(pontos);
		// linha C
		pontos = 0;

			for (var i = 1; i <= 3; i++ ){
			pontos +=matriz_jogo['c'][i];
		}
		ganhador(pontos);

		// Verifica na vertical

		

			for (var i = 1; i <= 3; i++ ){
			pontos = 0;
			pontos += matriz_jogo['a'][i];
			pontos += matriz_jogo['b'][i];
			pontos += matriz_jogo['c'][i];
			ganhador(pontos);

		}
		
		// Verificar na Diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1]+matriz_jogo['b'][2]+matriz_jogo['c'][3];

		pontos = 0;
		pontos = matriz_jogo['c'][3]+matriz_jogo['b'][2]+matriz_jogo['a'][1];

		ganhador(pontos);

	}

	function ganhador (pontos){
		if(pontos == -3){
			var jogada_1 = $('#entrada_apelido_1').val();
			alert(jogada_1 + '  é o vencedor');
			$('.jogada').off();
		
		}else if(pontos == 3){
			var jogada_2 = $('#entrada_apelido_2').val();
			alert(jogada_2 + 'Jogador 2 é o vencedor');
			$('.jogada').off();
		}
	}


});// fim da chamada dom