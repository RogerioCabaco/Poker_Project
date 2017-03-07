var camera, camera2, cameraOriginal, scene, renderer;

var geometry, material, mesh, mesh1, mesh2, mergeGeometry;

var MESH = [];

var MESH2 = [];

var spaceCraft1, i=0;

var randomN=100;

var lastrandom=0;

var clock;

var windowX=0, windowY=0, oldAspectRatio=0;

var limitedY=95, limitedX=50; /*Limites de jogo*/

var vertices = [
	//MESA DE JOGO
		new THREE.Vector3(-70, -30, 0), //0 baixo esquerda
		new THREE.Vector3(0, -30, 0), //1  baixo direita
		new THREE.Vector3(-70, 39, 0), //2 cima esquerda
		new THREE.Vector3(0, 39, 0), //3 cima direita

		new THREE.Vector3(-70, -30, 2), //4 baixo esquerda
		new THREE.Vector3(0, -30, 2), //5 baixo direita
		new THREE.Vector3(-70, 39, 2), //6 cima esquerda
		new THREE.Vector3(0, 39, 2), //7 cima direita
	//CARTA DA MAO DIREITA cima esquerda
		new THREE.Vector3(-53.5,50,0), //8 baixo esquerda
		new THREE.Vector3(-46,50,0), //9 baixo direita
		new THREE.Vector3(-53.5,75,0), //10 cima esquerda
		new THREE.Vector3(-46,75,0), //11 cima direita
	//CARTA DA MAO ESQUERDA cima esquerda
		new THREE.Vector3(-62,50,0), //12 baixo esquerda
		new THREE.Vector3(-54.5,50,0), //13 baixo direita
		new THREE.Vector3(-62,75,0), //14 cima esquerda
		new THREE.Vector3(-54.5,75,0), //15 cima direita
	//CARTA DA MAO DIREITA cima direita
		new THREE.Vector3(-18.5,50,0), //16 baixo esquerda
		new THREE.Vector3(-11,50,0), //17 baixo direita
		new THREE.Vector3(-18.5,75,0), //18 cima esquerda
		new THREE.Vector3(-11,75,0), //19 cima direita
	//CARTA DA MAO ESQUERDA cima direita
		new THREE.Vector3(-27,50,0), //20 baixo esquerda
		new THREE.Vector3(-19.5,50,0), //21 baixo direita
		new THREE.Vector3(-27,75,0), //22 cima esquerda
		new THREE.Vector3(-19.5,75,0), //23 cima direita
	//CARTA DA MAO DIREITA baixo esquerda
		new THREE.Vector3(-53.5,-41,0), //24 baixo esquerda
		new THREE.Vector3(-46,-41,0), //25 baixo direita
		new THREE.Vector3(-53.5,-66,0), //26 cima esquerda
		new THREE.Vector3(-46,-66,0), //27 cima direita
	//CARTA DA MAO ESQUERDA baixo esquerda
		new THREE.Vector3(-62,-41,0), //28 baixo esquerda
		new THREE.Vector3(-54.5,-41,0), //29 baixo direita
		new THREE.Vector3(-62,-66,0), //30 cima esquerda
		new THREE.Vector3(-54.5,-66,0), //31 cima direita
	//CARTA DA MAO DIREITA baixo direita
		new THREE.Vector3(-18.5,-41,0), //32 baixo esquerda
		new THREE.Vector3(-11,-41,0), //33 baixo direita
		new THREE.Vector3(-18.5,-66,0), //34 cima esquerda
		new THREE.Vector3(-11,-66,0), //35 cima direita
	//CARTA DA MAO ESQUERDA baixo direita
		new THREE.Vector3(-27,-41,0), //36 baixo esquerda
		new THREE.Vector3(-19.5,-41,0), //37 baixo direita
		new THREE.Vector3(-27,-66,0), //38 cima esquerda
		new THREE.Vector3(-19.5,-66,0), //39 cima direita
	//CARTA DA MAO DIREITA baixo direita
		new THREE.Vector3(10.5,14,0), //40 baixo esquerda
		new THREE.Vector3(18,14,0), //41 baixo direita
		new THREE.Vector3(10.5,-11,0), //42 cima esquerda
		new THREE.Vector3(18,-11,0), //43 cima direita
	//CARTA DA MAO ESQUERDA baixo direita
		new THREE.Vector3(2,14,0), //44 baixo esquerda
		new THREE.Vector3(9.5,14,0), //45 baixo direita
		new THREE.Vector3(2,-11,0), //46 cima esquerda
		new THREE.Vector3(9.5,-11,0), //47 cima direita
	//CARTA DA MAO esquerda - baixo direita
		new THREE.Vector3(-80.5,14,0), //48 baixo esquerda
		new THREE.Vector3(-88,14,0), //49 baixo direita
		new THREE.Vector3(-80.5,-11,0), //50 cima esquerda
		new THREE.Vector3(-88,-11,0), //51 cima direita
	//CARTA DA MAO DIREITA - baixo direita
		new THREE.Vector3(-79.5,14,0), //52 baixo esquerda
		new THREE.Vector3(-72,14,0), //53 baixo direita
		new THREE.Vector3(-79.5,-11,0), //54 cima esquerda
		new THREE.Vector3(-72,-11,0) //55 cima direita
	]; 


/* --------------------------------- CAMPO DE JOGO ---------------------------------

function gameBorders(){
	if(flagLight==0)
		var borderMaterial = new THREE.MeshBasicMaterial({ color: 0xfe0505, wireframe: true });
	//if(flagLight==1)
	//	var borderMaterial = new THREE.MeshLambertMaterial({ color: 0xfe0505, wireframe: true });

	var geometryTop = new THREE.Geometry();
	geometryTop.vertices.push(new THREE.Vector3(limitedX, limitedY, 0));
	geometryTop.vertices.push(new THREE.Vector3(0, limitedY, 0));
	geometryTop.vertices.push(new THREE.Vector3(-limitedX, limitedY, 0));
	
	var line = new THREE.Line(geometryTop, borderMaterial);
	scene.add(line);
	
	var geometryLeftSide = new THREE.Geometry();
	geometryLeftSide.vertices.push(new THREE.Vector3(-limitedX, limitedY, 0));
	geometryLeftSide.vertices.push(new THREE.Vector3(-limitedX, 0, 0));
	geometryLeftSide.vertices.push(new THREE.Vector3(-limitedX, -limitedY, 0));
	
	var line = new THREE.Line(geometryLeftSide, borderMaterial);
	scene.add(line);
	
	var geometryRightSide = new THREE.Geometry();
	geometryRightSide.vertices.push(new THREE.Vector3(limitedX, limitedY, 0));
	geometryRightSide.vertices.push(new THREE.Vector3(limitedX, 0, 0));
	geometryRightSide.vertices.push(new THREE.Vector3(limitedX, -limitedY, 0));
	
	var line = new THREE.Line(geometryRightSide, borderMaterial);
	scene.add(line);

}

/* --------------------------------- BALA ---------------------------------*/
function addFace(material, x, y ,z, vx, vy, vz){
 'use strict'

	var geometry = new THREE.Geometry();

	geometry.vertices = vertices;

	geometry.faces.push(new THREE.Face3(vx, vy, vz));

	geometry.computeFaceNormals();
	geometry.mergeVertices();

	var material= new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(x, y, z);

 	scene.add(mesh);


}
var Mesa=function(x, y, z){

	var material = new THREE.MeshBasicMaterial( {color: 0xffffff , wireframe:true} );
	var mesa1;
	
	/*Cria a mesa de jogo*/
	addFace(material, 0, 0, 0, 0, 1, 2);
	addFace(material, 0, 0, 0, 3, 2, 1);

	addFace(material, 0, 0, 0, 4, 5, 6);
	addFace(material, 0, 0, 0, 7, 6, 5);

/*Cria as mãos dos jogadores*/
	/*Jogador 1?*/
	addFace(material, 0, 0, 0, 40, 42, 41);
	addFace(material, 0, 0, 0, 42, 43, 41);
	addFace(material, 0, 0, 0, 44, 46, 45);
	addFace(material, 0, 0, 0, 46, 47, 45);
	/*Jogador 2?*/
	addFace(material, 0, 0, 0, 48, 50, 49);
	addFace(material, 0, 0, 0, 50, 51, 49);
	addFace(material, 0, 0, 0, 52, 54, 53);
	addFace(material, 0, 0, 0, 54, 55, 53);
	/*Jogador 3?*/
	addFace(material, 0, 0, 0, 24, 26, 25);
	addFace(material, 0, 0, 0, 26, 27, 25);
	addFace(material, 0, 0, 0, 28, 30, 29);
	addFace(material, 0, 0, 0, 30, 31, 29);
	/*Jogador 4?*/
	addFace(material, 0, 0, 0, 32, 34, 33);
	addFace(material, 0, 0, 0, 34, 35, 33);
	addFace(material, 0, 0, 0, 36, 38, 37);
	addFace(material, 0, 0, 0, 38, 39, 37);
	/*Jogador 5?*/
	addFace(material, 0, 0, 0, 8, 10, 9);
	addFace(material, 0, 0, 0, 10, 11, 9);
	addFace(material, 0, 0, 0, 12, 14, 13);
	addFace(material, 0, 0, 0, 14, 15, 13);
	/*Jogador 6?*/
	addFace(material, 0, 0, 0, 16, 18, 17);
	addFace(material, 0, 0, 0, 18, 19, 17);
	addFace(material, 0, 0, 0, 20, 22, 21);
	addFace(material, 0, 0, 0, 22, 23, 21);

	/*ID do jogador 1*/
	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359/2, 3.14159265359);
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff , wireframe:false} );

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(5,-16,0);

	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359 + (3.14159265359/2), 3.14159265359);

	var mesh2 = new THREE.Mesh(geometry, material);
	mesh2.position.set(15,-16,0);

	var geometry = new THREE.BoxGeometry(10, 8, 15, 1, 1, 1);

	var mesh3 = new THREE.Mesh(geometry, material);
	mesh3.position.set(10,-16,0);

	scene.add(mesh);
	scene.add(mesh2);
	scene.add(mesh3);

	/*ID do jogador 2*/
	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359/2, 3.14159265359);
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff , wireframe:false} );

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-85,-16,0);

	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359 + (3.14159265359/2), 3.14159265359);

	var mesh2 = new THREE.Mesh(geometry, material);
	mesh2.position.set(-75,-16,0);

	var geometry = new THREE.BoxGeometry(10, 8, 15, 1, 1, 1);

	var mesh3 = new THREE.Mesh(geometry, material);
	mesh3.position.set(-80,-16,0);

	scene.add(mesh);
	scene.add(mesh2);
	scene.add(mesh3);

	/*ID do jogador 3*/
	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359/2, 3.14159265359);
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff , wireframe:false} );

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-59,-36,0);

	var geometry = new THREE.CircleGeometry(4, 16, Math.PI + (3.14159265359/2), Math.PI);

	var mesh2 = new THREE.Mesh(geometry, material);
	mesh2.position.set(-49,-36,0);

	var geometry = new THREE.BoxGeometry(10, 8, 15, 1, 1, 1);

	var mesh3 = new THREE.Mesh(geometry, material);
	mesh3.position.set(-54,-36,0);

	scene.add(mesh);
	scene.add(mesh2);
	scene.add(mesh3);

	/*ID do jogador 4*/

	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359/2, 3.14159265359);
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff , wireframe:false} );

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-24,-36,0);

	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359 + (3.14159265359/2), 3.14159265359);

	var mesh2 = new THREE.Mesh(geometry, material);
	mesh2.position.set(-14,-36,0);

	var geometry = new THREE.BoxGeometry(10, 8, 15, 1, 1, 1);

	var mesh3 = new THREE.Mesh(geometry, material);
	mesh3.position.set(-19,-36,0);

	scene.add(mesh);
	scene.add(mesh2);
	scene.add(mesh3);

	/*ID do jogador 5*/
	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359/2, 3.14159265359);
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff , wireframe:false} );

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-59,45,0);

	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359 + (3.14159265359/2), 3.14159265359);

	var mesh2 = new THREE.Mesh(geometry, material);
	mesh2.position.set(-49,45,0);

	var geometry = new THREE.BoxGeometry(10, 8, 15, 1, 1, 1);

	var mesh3 = new THREE.Mesh(geometry, material);
	mesh3.position.set(-54,45,0);

	scene.add(mesh);
	scene.add(mesh2);
	scene.add(mesh3);

	/*ID do jogador 6*/
	
	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359/2, 3.14159265359);
	var material = new THREE.MeshBasicMaterial( {color: 0xffffff , wireframe:false} );

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(-24,45,0);

	var geometry = new THREE.CircleGeometry(4, 16, 3.14159265359 + (3.14159265359/2), 3.14159265359);

	var mesh2 = new THREE.Mesh(geometry, material);
	mesh2.position.set(-14,45,0);

	var geometry = new THREE.BoxGeometry(10, 8, 15, 1, 1, 1);

	var mesh3 = new THREE.Mesh(geometry, material);
	mesh3.position.set(-19,45,0);

	scene.add(mesh);
	scene.add(mesh2);
	scene.add(mesh3);
}
/*------------------------------ Camara -------------------------------*/


function createCamera(){
	'use strict';

	camera=new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 1000);
	cameraOriginal=camera;

	camera.position.x=0; 
	camera.position.y=0;
	camera.position.z=15;
}

function createCamera2(x, y, z){
	'use strict';
	camera2=new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 100);
	

	camera2.position.x=0; 
	camera2.position.y=-170;
	camera2.position.z=20;
}

function createScene(){
	'use strict';
	
	scene=new THREE.Scene();
	material= new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
	//material= new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: true });
	new Mesa(10,10,10);
}

function render(){
	'use strict';
	renderer.render(scene, camera);
}

//Para que ao redimensionar a janela, a imagem se adapte
function onResize(){
	'use strict';
	var newAspectRatio=window.innerWidth / window.innerHeight;
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	var Cleft=camera.left;
	var Cright=camera.right;
	var Ctop=camera.top;
	var Cbottom=camera.bottom;
	
	if((oldAspectRatio>=newAspectRatio && window.innerWidth<windowX) || (oldAspectRatio<=newAspectRatio && window.innerWidth>windowX)){
		camera.left=Cbottom*(newAspectRatio/2);
		camera.right=-camera.left;
	}
	if((oldAspectRatio>=newAspectRatio && window.innerHeight>windowY) || (oldAspectRatio<=newAspectRatio && window.innerHeight<windowY)){
		camera.bottom=Cleft*((1/newAspectRatio)/2);
		camera.top=-camera.bottom;
	}
		
	oldAspectRatio=newAspectRatio;
	windowX=window.innerWidth;
	windowY=window.innerHeight;

	camera.updateProjectionMatrix();

}

function onKeyDown(e){
	'use strict';
	
	switch(e.keyCode){
		case 49: //1
			camera=cameraOriginal;
			break;
		case 50: //2
			camera=camera2;
			camera.position.set(0, -70, 50);
			camera.lookAt(new THREE.Vector3(0,0,0));
			break;
		case 51: //3
			camera=camera2;
			camera.position.set(0, -80, 100);
			camera.lookAt(new THREE.Vector3(0,20,20));
			break;
	}
}

function animate(){
	'use strict';
	var deltaT=clock.getDelta();

	render();
	requestAnimationFrame(animate);
}

function init(){
	'use strict';
	/*Allien.prototype = Object.create(THREE.Object3D.prototype);
	Allien.prototype.constructor=Allien;
	Bullet.prototype = Object.create(THREE.Object3D.prototype);
	Bullet.prototype.constructor=Bullet;*/
	
	renderer=new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	windowX=window.innerWidth;
	windowY=window.innerHeight;
	oldAspectRatio=window.innerWidth / window.innerHeight;
	
	document.body.appendChild(renderer.domElement);
	
	createScene();
	createCamera();
	createCamera2();
	scene.add(camera2);
	
	camera2.lookAt(scene.position);
	
	clock = new THREE.Clock();
	
	render();
	
	//Ativa o evento de redimensionar a janela
	window.addEventListener("resize", onResize);
	
	window.addEventListener("keydown", onKeyDown);
	//window.addEventListener("keyup", onKeyUp);
}