const logos = [
    '/images/logos/html.png',
    '/images/logos/css.png',
    '/images/logos/sass.png',
    '/images/logos/bootstrap.png',
    '/images/logos/tailwind.png',
    '/images/logos/javascript.png',
    '/images/logos/typescript.png',
    '/images/logos/nodejs.png',
    '/images/logos/mongodb.png',
    '/images/logos/python.png',
    '/images/logos/django.png',
    '/images/logos/flask.png',
    '/images/logos/figma.png',
    '/images/logos/threejs.svg',
    // Add more logos as needed
];

const container = document.getElementById('tech-stack-cubes');

logos.forEach((logo) => {
    // Create and append canvas
    const canvas = document.createElement('canvas');
    canvas.width = 150;
    canvas.height = 150;
    canvas.style.borderRadius = '10px';
    container.appendChild(canvas);

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.width / canvas.height,
        0.1,
        1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
    });
    renderer.setSize(canvas.width, canvas.height);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.update();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLights = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLights.position.set(-5, -5, -5);
    directionalLights.castShadow = true;
    scene.add(directionalLights);

    // Load texture and create cube
    const loader = new THREE.TextureLoader();
    loader.load(logo, (texture) => {
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(3, 3, 3),
            new THREE.MeshPhongMaterial({ color: '#023e73', shininess: 50 })
        );

        scene.add(cube);

        const decalMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
        });

        const decalSize = new THREE.Vector3(2.4, 2.4, 2.4);

        const decalConfigs = [
            {
                pos: new THREE.Vector3(0, 0, 1.51),
                rot: new THREE.Euler(0, 0, 0),
            }, // front
            {
                pos: new THREE.Vector3(0, 0, -1.51),
                rot: new THREE.Euler(0, Math.PI, 0),
            }, // back
            {
                pos: new THREE.Vector3(1.51, 0, 0),
                rot: new THREE.Euler(0, Math.PI / 2, 0),
            }, // right
            {
                pos: new THREE.Vector3(-1.51, 0, 0),
                rot: new THREE.Euler(0, -Math.PI / 2, 0),
            }, // left
            {
                pos: new THREE.Vector3(0, 1.51, 0),
                rot: new THREE.Euler(-Math.PI / 2, 0, 0),
            }, // top
            {
                pos: new THREE.Vector3(0, -1.51, 0),
                rot: new THREE.Euler(Math.PI / 2, 0, 0),
            }, // bottom
        ];

        decalConfigs.forEach(({ pos, rot }) => {
            const decal = new THREE.Mesh(
                new THREE.DecalGeometry(cube, pos, rot, decalSize),
                decalMaterial
            );

            scene.add(decal);
        });

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();
    });
});
