$(document).ready(function(){
  console.log("DOM listo");

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  var light = new THREE.PointLight( 0xffffff, 1, 100 );
  light.position.set( 0, 0, 10 );
  light.castShadow = true;
  scene.add( light );

  let geometry = new THREE.IcosahedronGeometry(2, 5);
  geometry.computeFlatVertexNormals();
  let material = new THREE.MeshLambertMaterial({ color: 0xFFAA00, flatShading:true });
  let bola = new THREE.Mesh(geometry, material);

  scene.add(bola);

  camera.position.z = 5;

  let contenedor = new THREE.Object3D();
  scene.add(contenedor);

  for(let i = 0; i < bola.geometry.vertices.length; i++){
    let geometry = new THREE.RingGeometry(.05, .1, 32);
    let material = new THREE.MeshBasicMaterial({color: 0x00AAFF, side: THREE.DoubleSide});
    let cubo = new THREE.Mesh(geometry, material);
    cubo.position.set( bola.geometry.vertices[i].x, bola.geometry.vertices[i].y, bola.geometry.vertices[i].z);
    cubo.rotation.y += 1;
    contenedor.add(cubo);


  }



  function animate(){
    requestAnimationFrame(animate);

    bola.rotation.y += 0.001;

    for(let i = 0; i < bola.geometry.vertices.length; i++ ){
      bola.geometry.vertices[i].x += (-0.005 + (Math.random()*0.010));
      bola.geometry.vertices[i].y += (-0.005 + (Math.random()*0.010));
      bola.geometry.vertices[i].z += (-0.005 + (Math.random()*0.010));
    }
    bola.geometry.verticesNeedUpdate = true;

    for(let i = 0; i < contenedor.children.length; i++){
      contenedor.children[i].position.x = bola.geometry.vertices[i].x;
      contenedor.children[i].position.y = bola.geometry.vertices[i].y;
      contenedor.children[i].position.z = bola.geometry.vertices[i].z;
    }
    contenedor.rotation.y += 0.001;

    renderer.render(scene, camera);
  };

  animate();

});
