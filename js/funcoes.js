var canvas, stage, raiz, mapsObjs;

function init() {
	canvas = document.getElementById("canvas");
	images = images||{};

	var manifest = [
		{src:"images/img1.jpg", id:"img1"},
		{src:"images/img2.jpg", id:"img2"},
		{src:"images/img3.jpg", id:"img3"},
		{src:"images/img4.jpg", id:"img4"},
		{src:"images/mapa_mundi.png", id:"mapa_mundi"},
		{src:"images/mini1.jpg", id:"mini1"},
		{src:"images/mini2.jpg", id:"mini2"},
		{src:"images/mini3.jpg", id:"mini3"},
		{src:"images/mini4.jpg", id:"mini4"}
	];

	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", handleFileLoad);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest);
}

function handleFileLoad(evt) {
	if (evt.item.type == "image") { images[evt.item.id] = evt.result; }
}

function handleComplete() {
	raiz = new lib.protestantismo();

	stage = new createjs.Stage(canvas);
	stage.addChild(raiz);
	stage.update();

	createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", stage);
	
	stage.enableMouseOver(55);
	
	//Mc barra inicia exposta
	raiz.barra.gotoAndStop("barraExposta");
		
	//Redimensionamento do stage (canvas)
	windowResize();		
	eventos();
}



/*(function($){
  $(window).resize(function(){
     windowResize();                      
  });         
})(jQuery);*/

function windowResize(){
   stage.canvas.width = window.innerWidth;
   stage.canvas.height = window.innerHeight; 
   var test = (window.innerWidth/(1024))*0.75;
   raiz.scaleY = raiz.scaleX = test;
}



//Atualizar pela cor do objeto

function bgPadrao(){
	$('body').css('background-color','#C7EAFB');
	$('canvas').css('background-color','#C7EAFB');
}
function bgPreto(){
	$('body').css('background-color','#000');
	$('canvas').css('background-color','#000');
}




function eventos(){
	
	var tl = raiz.barra.timeline;
	
	//Lista de mapas
	mapsObjs = new Array();
	mapsObjs[0] = raiz.mapas.limiteSacroImperio;
	mapsObjs[1] = raiz.mapas.mc_presbiteriano;
	mapsObjs[2] = raiz.mapas.presencaCalvinista;
	mapsObjs[3] = raiz.mapas.mc_calvinista;
	mapsObjs[4] = raiz.mapas.mc_luterana;
	mapsObjs[5] = raiz.mapas.mc_anglicana;
	mapsObjs[6] = raiz.mapas.mc_catolica;
	mapsObjs[7] = raiz.mapas.mapaCompleto;
	
	//mapas iniciam transparentes
	ocultaMapas();	
	
	//rollover cursor
	raiz.bt_iniciar.onMouseOver = cursorSobre;
	raiz.bt_iniciar.onMouseOut = cursorFora;
	raiz.btPlay.onMouseOver = cursorSobre;
	raiz.btPlay.onMouseOut = cursorFora;
	raiz.barra.exibeBarra.onMouseOver = cursorSobre;
	raiz.barra.exibeBarra.onMouseOut = cursorFora;
	raiz.barra.exibeInfo.onMouseOver = cursorSobre;
	raiz.barra.exibeInfo.onMouseOut = cursorFora;
	raiz.barra.caixaInformacaoBarra.fecharInfoBarra.onMouseOver = cursorSobre;
	raiz.barra.caixaInformacaoBarra.fecharInfoBarra
	raiz.mcGaleria.bt_mini3.onMouseOver = cursorSobre;
	raiz.mcGaleria.bt_mini3.onMouseOut = cursorFora;
	raiz.mcGaleria.bt_mini2.onMouseOver = cursorSobre;
	raiz.mcGaleria.bt_mini2.onMouseOut = cursorFora;
	raiz.mcGaleria.bt_mini4.onMouseOver = cursorSobre;
	raiz.mcGaleria.bt_mini4.onMouseOut = cursorFora;
	raiz.mcGaleria.bt_mini1.onMouseOver = cursorSobre;
	raiz.mcGaleria.bt_mini1.onMouseOut = cursorFora;
	raiz.mcGaleria.mc_Img1.bt_fechar.onMouseOver = cursorSobre;
	raiz.mcGaleria.mc_Img1.bt_fechar.onMouseOut = cursorFora;
	raiz.mcGaleria.mc_img2.bt_fechar.onMouseOver = cursorSobre;
	raiz.mcGaleria.mc_img2.bt_fechar.onMouseOut = cursorFora;
	raiz.mcGaleria.mc_Img3.bt_fechar.onMouseOver = cursorSobre;
	raiz.mcGaleria.mc_Img3.bt_fechar.onMouseOut = cursorFora;
	raiz.mcGaleria.mc_Img4.bt_fechar.onMouseOver = cursorSobre;
	raiz.mcGaleria.mc_Img4.bt_fechar.onMouseOut = cursorFora;
	raiz.bt_catolica.onMouseOver = cursorSobre;
	raiz.bt_catolica.onMouseOut = cursorFora;
	raiz.bt_luterana.onMouseOver = cursorSobre;
	raiz.bt_luterana.onMouseOut = cursorFora;
	raiz.bt_presbiteriana.onMouseOver = cursorSobre;
	raiz.bt_presbiteriana.onMouseOut = cursorFora;
	raiz.bt_calvinista.onMouseOver = cursorSobre;
	raiz.bt_calvinista.onMouseOut = cursorFora;
	raiz.bt_presencaCalvinista.onMouseOver = cursorSobre;
	raiz.bt_presencaCalvinista.onMouseOut = cursorFora;
	raiz.bt_limitesSacroImperio.onMouseOver = cursorSobre;
	raiz.bt_limitesSacroImperio.onMouseOut = cursorFora;
	raiz.recomecar.onMouseOver = cursorSobre;
	raiz.recomecar.onMouseOut = cursorFora;
	raiz.verMapaCompleto.onMouseOver = cursorSobre;
	raiz.verMapaCompleto.onMouseOut = cursorFora;
	
	
	
	
	//botoes q. dão sequencia na timeline principal (play)
	raiz.bt_iniciar.onClick = function(){
		if(tl.position == 20){
			raiz.barra.play();
		}
		raiz.play();
	};
	raiz.btPlay.onClick = function(){
		raiz.play();
		raiz.mcGaleria.gotoAndStop(0);
	};
	
	raiz.recomecar.onClick = function(){
		raiz.gotoAndPlay("galeria");
	}
	
	
	
	//barra de informacoes
	raiz.barra.exibeBarra.onClick = function(){
		//verifica timeline do MC barra
		if(tl.position == 20){
			raiz.barra.play();
		}else{
			raiz.barra.gotoAndPlay("desceBarra");
		}		
	};
	raiz.barra.exibeInfo.onClick = function(){
		raiz.barra.gotoAndPlay("mostraInfo");
		bgPreto();
	};
	raiz.barra.caixaInformacaoBarra.fecharInfoBarra.onClick = function(){
		raiz.barra.play();
		bgPadrao();
	};
	
	
	//galeria de imagens
	raiz.mcGaleria.bt_mini3.onClick = function(){
		raiz.mcGaleria.gotoAndPlay("img1");
		bgPreto();
	};
	raiz.mcGaleria.bt_mini2.onClick = function(){	
		raiz.mcGaleria.gotoAndPlay("img2");
		bgPreto();
	};
	raiz.mcGaleria.bt_mini4.onClick = function(){	
		raiz.mcGaleria.gotoAndPlay("img3");
		bgPreto();
	};
	raiz.mcGaleria.bt_mini1.onClick = function(){	
		raiz.mcGaleria.gotoAndPlay("img4");
		bgPreto();
	};


	raiz.mcGaleria.mc_Img1.bt_fechar.onClick = function(){	
		raiz.mcGaleria.gotoAndStop("inicio");
		bgPadrao();
	};
	raiz.mcGaleria.mc_img2.bt_fechar.onClick = function(){	
		raiz.mcGaleria.gotoAndStop("inicio");
		bgPadrao();
	};
	raiz.mcGaleria.mc_Img3.bt_fechar.onClick = function(){	
		raiz.mcGaleria.gotoAndStop("inicio");
		bgPadrao();
	};
	raiz.mcGaleria.mc_Img4.bt_fechar.onClick = function(){	
		raiz.mcGaleria.gotoAndStop("inicio");
		bgPadrao();
	};
	
	
		
		
	raiz.bt_catolica.onClick = function(){	
		fadeInOut(raiz.mapas.mc_catolica, 1000);
	};
	raiz.bt_luterana.onClick = function(){	
		fadeInOut(raiz.mapas.mc_luterana, 1000);
	};
	raiz.bt_anglicana.onClick = function(){	
		fadeInOut(raiz.mapas.mc_anglicana, 1000);
	};
	raiz.bt_presbiteriana.onClick = function(){	
		fadeInOut(raiz.mapas.mc_presbiteriano, 1000);
	};
	raiz.bt_calvinista.onClick = function(){	
		fadeInOut(raiz.mapas.mc_calvinista, 1000);
	};
	raiz.bt_presencaCalvinista.onClick = function(){	
		fadeInOut(raiz.mapas.presencaCalvinista, 1000);
	};
	raiz.bt_limitesSacroImperio.onClick = function(){	
		fadeInOut(raiz.mapas.limiteSacroImperio, 1000);
	};
	raiz.verMapaCompleto.onClick = function(){	
		fadeInOut(raiz.mapas.mapaCompleto, 1000);
	};
}

function ocultaMapas(){
	raiz.mapas.mapaCompleto.alpha = 0;
	raiz.mapas.limiteSacroImperio.alpha = 0;
	raiz.mapas.mc_presbiteriano.alpha = 0;
	raiz.mapas.presencaCalvinista.alpha = 0;
	raiz.mapas.mc_calvinista.alpha = 0;
	raiz.mapas.mc_luterana.alpha = 0;
	raiz.mapas.mc_anglicana.alpha = 0;
	raiz.mapas.mc_catolica.alpha = 0;	
}



function fadeInOut(grafico, tempo){
	for (var i = 0; i < mapsObjs.length; i++) {
			var obj = mapsObjs[i];
			if(obj != grafico){				
				obj.alpha = 0;
			}
    	}
	if(grafico.alpha == 0){
		createjs.Tween.get(grafico).to({alpha:1},tempo);
	}else{
		createjs.Tween.get(grafico).to({alpha:0},tempo);
	}	
}

function cursorSobre(e){
	document.body.style.cursor='pointer';
}
function cursorFora(e){
	document.body.style.cursor='default';
}










