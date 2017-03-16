//Rafael Moisés 66117 PGIAO 


var MaxHeight, MaxWidth,  YPos, XPos, interval1, interval2, interval3, interval4, moveTo;  //variaveis relacionas com movimento
var checkPontos,checkPiramide,checkRoma, checkFim;										   //variaveis necessarias a checks booleanos
var vaticanoPonto, coliseuPonto, panteaoPonto, cornoPonto, chavePonto, ceptroPonto;        //variaveis relaciondas com marcacao de pontos

function init(){  //funcao inicial
	YPos = -300;
	XPos = -150;
	estado = "inicio";
	musica = "on";

	// Inicializa-se as variaveis a falso porque ainda não entrou nas condicoes
	vaticanoPonto = false;
	coliseuPonto = false;
	panteaoPonto = false;
	checkRoma = false;
	checkPiramide = false;
	checkPontos = false;
	checkFim = false;

	toMove = document.getElementById("scroller");
	toMove.style.backgroundPosition = XPos + "px "+YPos + "px";
	
	document.getElementById('inicio').play();
	document.getElementById("inicio").loop = true;
}

function move(){ 
	toMove = document.getElementById("scroller");
	toMove.style.backgroundPosition = XPos + "px "+YPos + "px";
	document.getElementById("pos").innerHTML=toMove.style.backgroundPosition;

	if (estado == "roma") {  //so deixa marcar pontos quando o pinguim entra em roma, evita que sejam marcados pontos se o pinguim passar no mapa
	// no mesmo local estando noutro nivel de mapa
		marcarPontosRoma();
	}

	if (estado == "piramide") {
		marcarPontosPiramide();
	}
	
	limites();
	piramide();
	roma();
	fimPontos();
	final();	
}

function limites(){  //limites do mapa
	if ((YPos >= 110) || (YPos <= -665) || (XPos >= 100) || (XPos <= -940)) {
	    stop();
	    sairMapa(); 
		}
	}

function final(){  // funcao que diz respeito à entrada do pinguim na ultima etapa
	pontos = parseInt(document.getElementById("pontuacao").innerHTML);
	if ((YPos <= -300) && (YPos >= -350) && (XPos <= -677) && (XPos >= -780) && (pontos == 6 )){
		if(!checkFim){
			checkFim = true;
			var d = document.getElementById("character");
			d.className += " hidden";     //esconder pinguim do ecra final
			paraMusica();
			stop();

			if ( musica != "off"){
			document.getElementById('fim').play();	}
			toMove.style.background = "url('gameover1.gif') #424242 no-repeat";
			estado = "final";  // este estado serve para dar trigger nos ifs das funcoes de movimento para que estas deixem de funcionar quando acaba o jogo
		}
	}
}

function fimPontos(){  // alertar que ja todas as peças estao recolhidas
	pontos = parseInt(document.getElementById("pontuacao").innerHTML);
	if (pontos == 6){
		if(!checkPontos){
		checkPontos = true;
		alert("Parabens, colecionou todas as chaves, num local do mapa principal encontra-se um tesouro..sera que o consegue encontrar...")} 
		}
	}

function roma(){  // Verifica posicao do jogador e o estado. Se o jogador estiver dentro dos limites definidos e o estado for inicio
	//entao atualiza o background para roma, define nova musica e atualiza o estado.

	
	// Se o estado for inicio então entra pela porta que dá a roma. Quando ele entra no if declara que o estado é roma
	// e já não entra mais na função isto é desativa a porta
	if ((YPos <= -185) && (YPos >= -195) && (XPos >= -110) && (XPos <= -85) && (estado == "inicio")) {
		toMove.style.background = "url('roma.png')#424242 no-repeat";
		paraMusica();
		alert("As peças encontram-se em 3 dos pontos mais visitados de Roma.. será que as consegue encontrar..");
			if ( musica != "off"){
				document.getElementById('italiano').play();
				document.getElementById("italiano").loop = true;
	    	}
		estado = "roma";
		// Vai buscar os elementos com a classe pontosRoma. Ele retorna uma lista portanto como são 2
		// tem de ir à posição 0 e 1. 
		document.getElementsByClassName("pontosRoma")[0].style.display = 'inline';  // mostrar na pagina os pontos restantes a apanhar, estao escondidos por defeito no css
		document.getElementsByClassName("pontosRoma")[1].style.display = 'inline';
	}
}

function piramide() { // funcao responsavel pelas interacoes que ocorrem quando o boneco entra na piramide, e reseptivas condicoes para o mesmo entrar
	if ((YPos <= -195) && (YPos >= -210) && (XPos <= -600) && (XPos >= -630) && (estado == "inicio")) {
		toMove.style.background = "url('farao.jpg') WHITE no-repeat";
		paraMusica();
		alert("As peças encontram-se em adereços utilizados pelos faraós, uma por faráo.. será que as consegue encontrar..");
			if ( musica != "off"){
				document.getElementById('egito').play();
				document.getElementById("egito").loop = true;
	        }
		estado = "piramide";
		document.getElementsByClassName("pontosPiramide")[0].style.display = 'inline';
		document.getElementsByClassName("pontosPiramide")[1].style.display = 'inline';
	}
}

function marcarPontosPiramide(){
	pontos = parseInt(document.getElementById("pontuacao").innerHTML);
	pPiramide = parseInt(document.getElementById("pontosPiramide").innerHTML);
	
	if ((YPos <= -190) && (YPos >= -235) && (XPos <= -350) && (XPos >= -376) && !chavePonto){
		pontos++;
		pPiramide--;
		alert ("Encontrou uma peça!");
		chavePonto = true;
		stop();
		document.getElementById('botaoChave').style.display = 'inline';
	}
	
	
	else if ((YPos <= 32) && (YPos >= -370) && (XPos <= 90 ) && (XPos >= 80)&& !ceptroPonto){
		pontos++;
		pPiramide--;
		alert ("Encontrou uma peça!");
		ceptroPonto = true;
		stop();
		document.getElementById('botaoCeptro').style.display = 'inline';
	}

	else if ((YPos <= 98) && (YPos >= 43) && (XPos <= -490 ) && (XPos >= -522)&& !cornoPonto){
		pontos++;
		pPiramide--;
		alert ("Encontrou uma peça!");
		cornoPonto = true;
		stop();
		document.getElementById('botaoCoroa').style.display = 'inline';

	}


	document.getElementById("pontuacao").innerHTML=pontos;
	document.getElementById("pontosPiramide").innerHTML=pPiramide;
	if (pPiramide == 0){
	if(!checkPiramide){
            alert("Ja tem todas as chaves da Piramide! Use o teleport escondido numa barbicha!");
            checkPiramide = true;
        }
		if ((YPos <= 9) && (YPos >= -21) && (XPos <= -240) && (XPos >= -272)) {
			toMove.style.background = "url('screen.png') #424242 no-repeat";
			document.getElementsByClassName("pontosPiramide")[0].style.display = 'none';
			document.getElementsByClassName("pontosPiramide")[1].style.display = 'none';
			paraMusica();

				if ( musica != "off"){
					document.getElementById('inicio').play();
					document.getElementById("inicio").loop = true;
				}

			estado = "inicio";
			
		}
	}	 
}

function marcarPontosRoma(){
	pontos = parseInt(document.getElementById("pontuacao").innerHTML);
	pRoma = parseInt(document.getElementById("pontosRoma").innerHTML);
	// Se o jogador estiver no raio e o vaticanoPonto for false, então entra no if
	if ((YPos <= -150) && (YPos >= -250) && (XPos <= 95) && (XPos >= 0) && !vaticanoPonto){
		// Incrementa os pontos, dá o alerta e muda-se a variavel vaticanoPonto = true para não entrar mais no if
		pontos++;
		pRoma--;
		alert ("Encontrou uma peça!");
		vaticanoPonto = true;
		stop();
		document.getElementById('botaoVaticano').style.display = 'inline';
	}
	
	
	else if ((YPos <= -440) && (YPos >= -555) && (XPos <= -665) && (XPos >= -805) && !coliseuPonto){

		pontos++;
		pRoma--;
		alert ("Encontrou uma peça!");
		coliseuPonto = true;
		stop();
		document.getElementById('botaoColiseu').style.display = 'inline';
	}

	else if ((YPos <= -210) && (YPos >= -290) && (XPos <= -304 ) && (XPos >= -408)&& !panteaoPonto){
		pontos++;
		pRoma--;
		alert ("Encontrou uma peça!");
		panteaoPonto = true;
		stop();
		document.getElementById('botaoPanteao').style.display = 'inline';
	}




	document.getElementById("pontuacao").innerHTML=pontos;
	document.getElementById("pontosRoma").innerHTML=pRoma;

	if (pRoma == 0){
        if(!checkRoma){
            alert("Ja tem todas as chaves de Roma! Use o teleport escondido na pizza!");
            checkRoma = true;
        }
        if ((YPos <= -340) && (YPos >= -350) && (XPos <= -284) && (XPos >= -312)) {
            toMove.style.background = "url('screen.png') #424242 no-repeat";
            document.getElementsByClassName("pontosRoma")[0].style.display = 'none';  //volta a esconder o contador de pontos restantes de roma
            document.getElementsByClassName("pontosRoma")[1].style.display = 'none';
            estado = "inicio";
            paraMusica();
            
            if ( musica != "off"){
				document.getElementById('inicio').play();
				document.getElementById("inicio").loop = true;
			}
			
			
        }
    } // marcacao de pontos quando o estado = roma, definido na funcao roma
}


function moveBx() {  
	if (estado != "final"){var myclass = new Array('front-right', 'front-stand', 'front-left');
		var n = Math.round(Math.random()*2);
		document.getElementById('character').setAttribute('class', myclass[n]);
		YPos--;
		move();
    }
}

function moveCm() {
	if (estado != "final"){
		var myclass = new Array('back-right', 'back-stand', 'back-left');
		var n = Math.round(Math.random()*2);
		document.getElementById('character').setAttribute('class',myclass[n]);
		YPos++;
		move();
	}
}

function moveDir() {
	if (estado != "final"){
		var myclass = new Array('right-right', 'right-stand', 'right-left');
		var n = Math.round(Math.random()*2);
		document.getElementById('character').setAttribute('class', myclass[n]);
		XPos--;
	move();
	}
}

function moveEsq() {
	if (estado != "final"){
		var myclass = new Array('left-right', 'left-stand', 'left-left');
		var n = Math.round(Math.random()*2);
		document.getElementById('character').setAttribute('class', myclass[n]);
		XPos++;
		move();
	}
}

function moveB() {
	stop();
	interval1 = setInterval(moveBx, 10);
}

function moveC() {
	stop();
	interval3 = setInterval(moveCm, 10);
}

function moveD() {
	stop();
	interval2 = setInterval(moveDir, 10);
}

function moveE() {
	stop();
	interval4 = setInterval(moveEsq, 10);
}

function stop() {
	clearInterval(interval1);
	clearInterval(interval2);
	clearInterval(interval3);
	clearInterval(interval4);
}

window.onload =init;

function Key(e) {  // quando é usada a tecla respetiva ao codigo executa as funcoes de movimento
    if (e.keyCode === 37) moveE();
    if (e.keyCode === 38) moveC();
    if (e.keyCode === 39) moveD();
    if (e.keyCode === 40) moveB();
    if (e.keyCode === 32) stop();
}

function sairMapa(){  // alerta para a funcao limites que o pinguim esta a sair do mapa
	alert("Está a sair do mapa!!");
}

function paraMusica() {  //desativa a musica que estiver a tocar no momento
	var sounds = document.getElementsByTagName('audio');
	for(i = 0; i < sounds.length; i++) sounds[i].pause();
		
}


function paraMusicaBotao() {  //desativa a musica que estiver a tocar no momento, serve para mudar o estado da musica para o botao
// funcionar em conjunto com o botão play
	var sounds = document.getElementsByTagName('audio');
	for(i = 0; i < sounds.length; i++) sounds[i].pause();
		musica = "off";
}




function play(){   // auxiliar para o botao de unmute, inicia/resume a musica que esta definida consoante o local do pinguim
	
	if ((estado == "inicio")&&(musica != "on")){
		paraMusica();
		document.getElementById('inicio').play();
		musica = "on";
		
    }
	else if ((estado == "roma")&& (musica != "on")){
		paraMusica();
		document.getElementById('italiano').play();
		document.getElementById("italiano").loop = true;
		musica = "on";
	}
	else if ((estado == "piramide")&& (musica != "on")){
		paraMusica();
		document.getElementById('egito').play();
		document.getElementById("egito").loop = true;
		musica = "on";
	}

	else if ((estado == "final")&& (musica != "on")){
		paraMusica();
		document.getElementById('egito').play();
		document.getElementById("egito").loop = true;	
		musica = "on";

	}
}