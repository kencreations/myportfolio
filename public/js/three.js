const container = document.getElementById("tech-stack-cubes");

const pl = [
    "/images/logos/html.png", 
    "/images/logos/css.png",
    "/images/logos/sass.png",
    "/images/logos/bootstrap.png",
    "/images/logos/tailwind.png",
    "/images/logos/javascript.png",
    "/images/logos/typescript.png",
    "/images/logos/nodejs.png",
    "/images/logos/express.png",
    "/images/logos/mongodb.png",
    "/images/logos/python.png",
    "/images/logos/django.png",
    "/images/logos/flask.png",
    "/images/logos/git.png",
    "/images/logos/github.png",
    "/images/logos/azure.png",
    "/images/logos/figma.png",
    "/images/logos/threejs.png",
    "/images/logos/react.png",
    "/images/logos/redux.png",
    "/images/logos/vue.png",
    "/images/logos/angular.png"


]

pl.forEach((item) => {
    console.log(item.name, item.path);
    const canvas = document.createElement("canvas");
    canvas.width = 150;
    canvas.height = 150;
    canvas.style.borderRadius = "10px";
    canvas.className = name.toLowerCase().replace(/\s+/g, '-');
    canvas.id = item.toLowerCase().replace(/\s+/g, '-');

    container.appendChild(canvas);

    // Create a 3D scene using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);

    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(canvas.width, canvas.height);

    const control = new THREE.OrbitControls(camera, canvas);
    control.enableZoom = false;
    control.enablePan = false;
    control.enableRotate = true;
    control.enableDamping = true;
    control.dampingFactor = 0.25;
    control.autoRotate = true;
    control.autoRotateSpeed = 2.0;
    control.update();

    // Add a light source
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const directionalLights = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLights.position.set(-5, -5, -5);
    directionalLights.castShadow = true;
    scene.add(directionalLights);

    // Load the texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(item, (texture) => {
        // Create a cube with the loaded texture
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ color: "#023e73", shininess: 50 })
        const cube = new THREE.Mesh(geometry, material);
        
        // Set the position of the cube
        item.position.x = Math.random() * 2 - 1; // Random x position
        item.position.z = Math.random() * 2 - 1; // Random z position


        cube.position.set(item.position.x, item.position.z);
        
        // Add the cube to the scene
        scene.add(cube);


        // Create a decal on the cube

        const decalMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -5,
        });

        const decalSize = new THREE.Vector3(2.4, 2.4, 2.4); // Size of the decal


        const decalConfigs = [
            { pos: new THREE.Vector3(0, 0, 1.51), rot: new THREE.Euler(0, 0, 0) },                     // front
            { pos: new THREE.Vector3(0, 0, -1.51), rot: new THREE.Euler(0, Math.PI, 0) },              // back
            { pos: new THREE.Vector3(1.51, 0, 0), rot: new THREE.Euler(0, Math.PI / 2, 0) },           // right
            { pos: new THREE.Vector3(-1.51, 0, 0), rot: new THREE.Euler(0, -Math.PI / 2, 0) },         // left
            { pos: new THREE.Vector3(0, 1.51, 0), rot: new THREE.Euler(-Math.PI / 2, 0, 0) },          // top
            { pos: new THREE.Vector3(0, -1.51, 0), rot: new THREE.Euler(Math.PI / 2, 0, 0) },          // bottom
        ];

        decalConfigs.forEach(({ pos, rot }) => {
            const decal = new THREE.Mesh(
                new THREE.DecalGeometry(cube, pos, rot, decalSize),
                decalMaterial
            );
    
            scene.add(decal);
         });
         
        // Set camera position
        camera.position.z = 3;

        // Render the scene
        function animate() {
            requestAnimationFrame(animate);
            control.update();
            renderer.render(scene, camera);
        }
        animate();
    });
});