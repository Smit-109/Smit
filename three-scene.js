(() => {
    function createHeroScene({ container, lowMotion = false }) {
        if (!window.THREE || !container) {
            return;
        }

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x07090f, 0.06);

        const camera = new THREE.PerspectiveCamera(
            58,
            container.clientWidth / Math.max(1, container.clientHeight),
            0.1,
            80
        );
        camera.position.set(0, 0.2, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x62b2ff, 1.1);
        scene.add(ambientLight);

        const pointLightA = new THREE.PointLight(0x18f7d3, 2.1, 24, 2);
        pointLightA.position.set(3, 1.2, 4);
        scene.add(pointLightA);

        const pointLightB = new THREE.PointLight(0xff5cb8, 2.4, 20, 2);
        pointLightB.position.set(-3.2, -1.6, 1.5);
        scene.add(pointLightB);

        const group = new THREE.Group();
        scene.add(group);

        const torusKnot = new THREE.Mesh(
            new THREE.TorusKnotGeometry(1.35, 0.34, 180, 28),
            new THREE.MeshPhysicalMaterial({
                color: 0x38a0ff,
                emissive: 0x082042,
                roughness: 0.22,
                metalness: 0.8,
                clearcoat: 0.7,
                clearcoatRoughness: 0.15,
                transparent: true,
                opacity: 0.95
            })
        );
        group.add(torusKnot);

        const ring = new THREE.Mesh(
            new THREE.TorusGeometry(2.5, 0.03, 24, 220),
            new THREE.MeshBasicMaterial({ color: 0x18f7d3, transparent: true, opacity: 0.52 })
        );
        ring.rotation.x = 1.1;
        group.add(ring);

        const sphere = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.62, 1),
            new THREE.MeshStandardMaterial({
                color: 0xff5cb8,
                roughness: 0.42,
                metalness: 0.55,
                emissive: 0x220918
            })
        );
        sphere.position.set(-2.15, 0.8, -1.3);
        group.add(sphere);

        const particlesCount = lowMotion ? 450 : 1200;
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount * 3; i += 1) {
            positions[i] = (Math.random() - 0.5) * 22;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x8cc7ff,
            size: 0.03,
            transparent: true,
            opacity: 0.78,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const pointer = { x: 0, y: 0 };

        function onPointerMove(event) {
            const rect = container.getBoundingClientRect();
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        }

        window.addEventListener("pointermove", onPointerMove);

        function onResize() {
            const width = container.clientWidth;
            const height = container.clientHeight;
            camera.aspect = width / Math.max(1, height);
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }

        window.addEventListener("resize", onResize);

        let rafId = 0;
        const clock = new THREE.Clock();

        function render() {
            const elapsed = clock.getElapsedTime();

            torusKnot.rotation.x += lowMotion ? 0.0025 : 0.0042;
            torusKnot.rotation.y += lowMotion ? 0.003 : 0.005;

            sphere.rotation.x += 0.004;
            sphere.rotation.y += 0.005;

            ring.rotation.z = elapsed * 0.25;

            particles.rotation.y = elapsed * 0.025;
            particles.rotation.x = Math.sin(elapsed * 0.09) * 0.08;

            camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03;
            camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.03;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(render);
        }

        render();

        // Expose a cleanup callback in case future navigation removes the hero scene.
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }

    window.createHeroScene = createHeroScene;
})();
