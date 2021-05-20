"use strict";

var socket = io.connect('http://localhost:3000', {
  transports: ['websocket']
});
var scene, camera, renderer;
var x = 0.01,
    y = 0.01,
    z = 0.01,
    modelo,
    scoreVal = 0,
    createdCars = [];
socket.on('accelerometer', function (data) {
  var arr = [];
  data.forEach(function (element) {
    arr.push(element * 1.2);
  });
  x = arr[0];
  y = arr[1];
  z = arr[2];
});

function init() {
  scene = new THREE.Scene();
  scene.background = null;
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
  camera.position.x = 5.5;
  camera.position.y = 126.5;
  camera.position.z = -458.5;
  camera.rotation.x = -3;
  camera.rotation.y = 1;
  camera.rotation.z = 3;
  light = new THREE.PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);
  light.intensity = 0.9;
  scene.add(light);
  light2 = new THREE.PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);
  light2.intensity = 0.9;
  scene.add(light2);
  light3 = new THREE.PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);
  light3.intensity = 0.9;
  scene.add(light3);
  light4 = new THREE.PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);
  light4.intensity = 0.9;
  scene.add(light4);
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', renderer);
  document.body.appendChild(renderer.domElement);
  var cancel = setInterval(createVehicles, 5000);
  var loader = new THREE.GLTFLoader();
  loader.load('models/ford-f150-2018-raptor/scene.gltf', function (gltf) {
    modelo = gltf.scene;
    modelo.castShadow = true;
    modelo.position.x = -100;
    modelo.position.y = -43;
    scene.add(gltf.scene);
    animate();
  });
}

function createVehicles() {
  var loader = new THREE.GLTFLoader();
  var rand = Math.floor(Math.random() * 4 + 1);
  var randX = Math.floor(Math.random() * (35 - -200) + -200);
  console.log(randX);

  switch (rand) {
    case 1:
      console.log("1 created");
      loader.load('models/electrocar_city_car/scene.gltf', function (gltf) {
        var model = gltf.scene;
        model.position.x = randX;
        model.position.y = -43;
        model.position.z = 680;
        createdCars.push(model);
        scene.add(gltf.scene);
      });
      break;

    case 2:
      console.log("2 created");
      loader.load('models/2019_ford_ranger_raptor_police_cities_skylines/scene.gltf', function (gltf) {
        var model = gltf.scene;
        model.position.x = randX;
        model.position.y = -43;
        model.position.z = 680;
        var car = gltf.scene.children[0];
        car.scale.set(1.2, 1.2, 1.2);
        createdCars.push(model);
        scene.add(gltf.scene);
      });
      break;

    case 3:
      console.log("3 created");
      loader.load('models/suv_vr_rover_3d_model/scene.gltf', function (gltf) {
        var model = gltf.scene;
        model.position.x = randX;
        model.position.y = -43;
        model.position.z = 680;
        createdCars.push(model);
        scene.add(gltf.scene);
      });
      break;

    case 4:
      console.log("4 created");
      loader.load('models/legendary_muscle_car_x-vr/scene.gltf', function (gltf) {
        var model = gltf.scene;
        model.position.x = randX;
        model.position.y = -43;
        model.position.z = 680;
        createdCars.push(model);
        scene.add(gltf.scene);
      });
      break;
  }
}

function animate() {
  renderer.render(scene, camera);
  update();
  requestAnimationFrame(animate);
}

function update() {
  createdCars.forEach(function (element, index, object) {
    if (element.position.z <= -200) {
      //delete element;
      var arrTDel = object.splice(index, 1);
      scene.remove(arrTDel[0]);
      delete arrTDel[0];
    }

    element.position.z -= 25;
  });
  console.log(createdCars);

  if (modelo.position.x <= 41 && modelo.position.x >= -230) {
    modelo.position.x += x;
  } else if (modelo.position.x > 41) {
    modelo.position.x -= Math.abs(x);
  } else {
    modelo.position.x += Math.abs(x);
  }

  if (modelo.position.z > 640) {
    modelo.position.z = 640;
  } else if (modelo.position.z < -215) {
    modelo.position.z = -215;
  } else {
    modelo.position.z += z;
  }

  modelo.position.z += z;
  modelo.position.x += x;
  var score = document.getElementById("score");
  scoreVal += 0.1;
  score.innerHTML = "Score: " + Math.trunc(scoreVal);
  console.log(modelo);
}

init();