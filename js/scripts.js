/* Objeto Navigator 
   Comprueba el lenguaje del navegador y
   carga el contenido de la interfaz en consecuencia. */
var leng = navigator.language;

if(leng != "es" && leng != "esp"){
	var textMenu = ["M", "E", "N", "U<span id=\"puntero\"></span>"];
	var textHomepage = ["G", "P", "U", "&nbsp;", "C", "O", "M", "P", "A", "R", "A", "T", "O", "R<span id=\"puntero\"></span>"];
}
else{
	var textMenu = ["M", "E", "N", "Ú<span id=\"puntero\"></span>"];
	var textHomepage = ["G", "P", "U", "&nbsp;", "C", "O", "M", "P", "A", "R", "A", "D", "O", "R<span id=\"puntero\"></span>"];
}

/* Objeto de usuario */
function GPU(codGpu, nombre, memoria, velNucleo, velMemoria, wConsumo, foto, descripcion){
	/* Propiedades */
	this.codGpu = codGpu;
	this.nombre = nombre;
	this.descripcion = descripcion || "";
	this.memoria = memoria;
	this.velNucleo = velNucleo;
	this.velMemoria = velMemoria;
	this.wConsumo = wConsumo;
	this.foto = foto || "No definida";
	/* Métodos */
	this.mostrar = function mostrar(select, imgId, hId){
		var s = select;
		var sImg = document.getElementById(imgId);
		var sNom = document.getElementById(hId);

		var ruta;
		if(listaGpu[s.selectedIndex].foto == "No definida")
			ruta = "./media/imgs/" + s.options[s.selectedIndex].text + ".png";
		else
			ruta = listaGpu[s.selectedIndex].foto;

		sNom.innerHTML = s.options[s.selectedIndex].text;
		if(s.id == 'select-1'){
			var sVS = document.getElementById('vs1');
		}
		else{
			var sVS = document.getElementById('vs2');
		}
		sVS.innerHTML = s.options[s.selectedIndex].text;
		sImg.src = ruta || null;
	}
	this.comparar = function comparar(item){
		var memoriaPor = (this.memoria * 100.0) / item.memoria;
		var velNucleoPor = (this.velNucleo * 100.0) / item.velNucleo;
		var velMemoriaPor = (this.velMemoria * 100.0) / item.velMemoria;
		var wConsumoPor = (this.wConsumo * 100.0) / item.wConsumo;

		return lPor = [memoriaPor, velNucleoPor, velMemoriaPor, wConsumoPor];
	}
}

/* Listas predeterminadas */
var listaNombre = ["GEFORCE GTX 1080", "NVIDIA TITAN X", "GEFORCE GTX 1050", "GEFORCE GTX 1050 Ti", "GEFORCE GT 740", "GEFORCE GT 720"];
var listaMemoria = [8, 12, 2, 4, 2, 2]; /*GB*/
var listaVelNucleo = [1607, 1417, 1354, 1290, 993, 797]; /*MHz*/
var listaVelMemoria = [10, 10, 7, 7, 1.8, 1.8, 1.8]; /*GB*/
var listaConsumo = [180, 250, 75, 75, 64, 23]; /*W*/

/* Iniciar lista en el evento onLoad() */
var listaGpu = iniList(listaNombre, listaMemoria, listaVelNucleo, listaVelMemoria, listaConsumo);

function iniList(l1, l2, l3, l4, l5){
	var l = new Array();
	for(var i = 0; i < l1.length; i++){
		var nombre = l1[i];
		var memoria = l2[i];
		var velNucleo = l3[i];
		var velMemoria = l4[i];
		var wConsumo = l5 [i];
		var codGpu = "GPU" + (i+1);
		var foto = "../media/imgs/" + nombre + ".png";

		var item = new GPU(codGpu, nombre, memoria, velNucleo, velMemoria, wConsumo);
		l.push(item);
	}
	return l;
}

/* Función que recoge enlaza los datos seleccionados 
   con los elemenos html para mostrar estos */
function enlazarDatos(s1, s2){
	var resul = true;
	if(listaGpu.length >= 2){
		s1.selectedIndex = 0;
		s2.selectedIndex = 1;
		listaGpu[s1.selectedIndex].mostrar(s1, 's1Img', 's1Nom');
		listaGpu[s2.selectedIndex].mostrar(s2, 's2Img', 's2Nom');
	}
	else
		resul = false;

	return resul;
}

/* Carga inicial de los datos predeterminados. Se usa en el evento onload del body */
function loadInfo(){
	var s1 = document.getElementById('select-1');
	var s2 = document.getElementById('select-2');
	for(var i = 0; i < listaGpu.length; i++){
		var option1 = document.createElement("option");
	    option1.text = listaGpu[i].nombre;
	    option1.value = listaGpu[i].codGpu;
		s1.add(option1);
		var option2 = document.createElement("option");
	    option2.text = listaGpu[i].nombre;
	    option2.value = listaGpu[i].codGpu;
		s2.add(option2);
	}

	if(!enlazarDatos(s1, s2))
		alert("No existen suficientes elementos en la lista para poder comparar.");
}

/* Función de añadir nuevos elementos */
function addNewOption(){
	var s1 = document.getElementById('select-1');
	var s2 = document.getElementById('select-2');

	var option1 = document.createElement("option");
	option1.text = listaGpu[listaGpu.length - 1].nombre;
	option1.value = listaGpu[listaGpu.length - 1].codGpu;
	s1.add(option1);
	var option2 = document.createElement("option");
	option2.text = listaGpu[listaGpu.length - 1].nombre;
	option2.value = listaGpu[listaGpu.length - 1].codGpu;
	s2.add(option2);

	if(!enlazarDatos(s1, s2))
		alert("No existen suficientes elementos en la lista para poder comparar.");
}

/* Función de eliminar elementos existentes */
function deleteOption(){
	var gpuToDelete = prompt("Introduzca el nombre de la GPU que desea eliminar de la lista:").toUpperCase();
	var encontrado = false;
	var s1 = document.getElementById('select-1');
	var s2 = document.getElementById('select-2');

	for(var i = 0; i < listaGpu.length && !encontrado; i++){
		if(gpuToDelete == listaGpu[i].nombre){
			listaGpu.splice(i, 1);
			encontrado = true;

    		s1.remove(i);
    		s2.remove(i);
		}
	}

	if(encontrado)
		alert(gpuToDelete + " ha sido eliminada satisfactoriamente.");
	else
		alert("El elemento " + gpuToDelete + " no se encuentra en la lista.");

	if(!enlazarDatos(s1, s2))
		alert("No existen suficientes elementos en la lista para poder comparar.");
}

/* Puntero, animación de escritura.
   Además, mediante el objeto navigator diferenciamos si el
   navegador es Firefox, ya que esta función no funciona
   correctamente en este navegador debido a un bug conocido de CSS */ 

function eliminarMix(){
	var es_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	var es_iExplorer = navigator.userAgent.toLowerCase().indexOf('trident/7.0') > -1;
	if(!es_firefox && !es_iExplorer){
		document.getElementById('menuWrapper').classList.add('mix');
	}
}


/* Función que proporciona animación al elemento span del titulo
   situado a la derecha del botón de menú */
var punteroTimer = setInterval(puntero, 1000);
function puntero(){
	var punteroItem = document.getElementById('puntero');
	if(punteroItem.innerHTML == "_")
		punteroItem.innerHTML = "";
	else
		punteroItem.innerHTML = "_";
}

/* Escribir ESTADO en el H1 a la derecha del botón de menú */
function escribirEstado(){

	var contEscribir = 0;
	var item = document.getElementById('menuWrapper');

	if(item.classList.contains('open')){
		if(typeof(escribirTimerHomepage) != 'undefined'){
			window.clearInterval(escribirTimerHomepage);
			delete escribirTimerHomepage;
		}
		escribirTimerMenu = window.setInterval(escribirMenu, 200);

		function escribirMenu(){
			if(contEscribir < textMenu.length){
				var tituloItem = document.getElementById('tituloMenu');

				(contEscribir == 0) && (tituloItem.innerHTML = "");
				tituloItem.innerHTML += textMenu[contEscribir];
				
				contEscribir++;
			}
			else
				window.clearInterval(escribirTimerMenu);
		}
	}
	else{
		if(typeof(escribirTimerMenu) != 'undefined'){
			window.clearInterval(escribirTimerMenu);
			delete escribirTimerMenu;
		}
		escribirTimerHomepage = window.setInterval(escribirHomepage, 200);

		function escribirHomepage(){
			if(contEscribir < textHomepage.length){
				var tituloItem = document.getElementById('tituloMenu');

				(contEscribir == 0) && (tituloItem.innerHTML = "");
				tituloItem.innerHTML += textHomepage[contEscribir];
				
				contEscribir++;
			}
			else
				window.clearInterval(escribirTimerHomepage);
		}
	}
}

/* Función que abre y cierra el menú */
function openMenu(x, y){
	x.classList.toggle("open");
	y.classList.toggle("change");
	document.getElementById("tituloDiv").classList.toggle("tituloDivOpen");
	document.getElementById("tituloDiv").classList.toggle("tituloDivClose");
	document.getElementById("mainSection").classList.toggle("menuOpened");
}

/* Esta función cambia el selectedIndex de los select
   ocultos para navegar entro los elementos */
function changeOption(selectId, direccion){
	select = document.getElementById(selectId);
	if(direccion.classList.contains('pagination-left')){
		if(select.selectedIndex == 0){
			select.selectedIndex = select.selectedIndex = select.length - 1;
		}
		else{
			select.selectedIndex = select.selectedIndex - 1;
		}
	}
	else{
		if(select.selectedIndex == select.length - 1){
			select.selectedIndex = select.selectedIndex = 0;
		}
		else{
			select.selectedIndex = select.selectedIndex + 1;
		}
	}

	if(select.id.match('1')){
		sImg = "s1Img";
		sNom = "s1Nom";
	}
	else{
		sImg = "s2Img";
		sNom = "s2Nom";
	}
	listaGpu[select.selectedIndex].mostrar(select, sImg, sNom);
	actualizarGraf();
}

/* Obtener la instancia de objeto con mejores características
   para usarlas de tope. */
function obtenerMejor(){
	var mejorFicticio = new GPU('ZERO', 'Ficticio', 0, 0, 0, 0);
	for(var i = 0; i < listaGpu.length; i++){
		if(listaGpu[i].memoria > mejorFicticio.memoria)
			mejorFicticio.memoria = listaGpu[i].memoria;
		if(listaGpu[i].velNucleo > mejorFicticio.velNucleo)
			mejorFicticio.velNucleo = listaGpu[i].velNucleo;
		if(listaGpu[i].velMemoria > mejorFicticio.velMemoria)
			mejorFicticio.velMemoria = listaGpu[i].velMemoria;
		if(listaGpu[i].wConsumo > mejorFicticio.wConsumo)
			mejorFicticio.wConsumo = listaGpu[i].wConsumo;
	}
	return mejorFicticio;
}

/* Actualiza la gráfica en función de los resultados
   obtenidos de una comparación */
function actualizarGraf(){
	var s1 = document.getElementById('select-1');
	var s2 = document.getElementById('select-2');
	var mejor = obtenerMejor();

	var l1 = listaGpu[s1.selectedIndex].comparar(mejor);
	var l2 = listaGpu[s2.selectedIndex].comparar(mejor);

	var listaGraficas = obtenerElementosGraficas(document.getElementsByClassName('axis-x').length, l1, l2);
	var listaDataGraf1 = document.getElementsByClassName('dataItem-Graf-1');
	var listaDataGraf2 = document.getElementsByClassName('dataItem-Graf-2');

	for(var i = 0; i < listaGraficas.length; i++){
		for(var j = 0; j < listaGraficas[i].length; j++){
			if(j == 0)
				listaDataGraf1[i].style.width = (listaGraficas[i][j] + '%');
			if(j == 1)
				listaDataGraf2[i].style.width = (listaGraficas[i][j] + '%');
		}
	}
}

/* Función que hace uso de arrays bidimensionales para
   generar las gráficas */
function obtenerElementosGraficas(n, l1, l2){
	var l = new Array(n);
	var x1, x2;
	for(var i = 0; i < n; i++){
		x1 = l1[i];
		x2 = l2[i];

		l[i] = new Array(x1, x2) ;
	}

	return l;
}


/* En esta función se usa el objeto screen para posicionar
   y dar un tamaño dinamicamente, con respecto al monitor de cada usuario,
   a la nueva ventana. */
function abrirVentana(x){
	var aH = screen.height;
	var aW = screen.width;

	open(x, "_blank", "scrollbars=yes, resizable=yes, top=0,left=" + aW/2 + ",width=" + aW/2 + ",height=" + aH);
}