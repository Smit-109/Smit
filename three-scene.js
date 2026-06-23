(() => {
    function createHeroScene({ container, lowMotion = false }) {
        if (!window.THREE || !container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            50,
            container.clientWidth / Math.max(1, container.clientHeight),
            0.1,
            60
        );
        camera.position.set(0, 0.3, 7);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x444444, 1.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xc49b5c, 2.2);
        keyLight.position.set(3, 1.8, 4);
        scene.add(keyLight);

        const fillLight = new THREE.DirectionalLight(0x666666, 0.9);
        fillLight.position.set(-3, -1.2, 2);
        scene.add(fillLight);

        const geo = new THREE.IcosahedronGeometry(1.9, 1);
        const mat = new THREE.MeshStandardMaterial({
            color: 0xb8a06a,
            roughness: 0.55,
            metalness: 0.15,
            transparent: true,
            opacity: 0.25
        });
        const mesh = new THREE.Mesh(geo, mat);
        scene.add(mesh);

        const wireframe = new THREE.LineSegments(
            new THREE.EdgesGeometry(geo),
            new THREE.LineBasicMaterial({
                color: 0xd4b36c,
                transparent: true,
                opacity: 0.18
            })
        );
        scene.add(wireframe);

        const particleCount = lowMotion ? 120 : 280;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 18;
        }
        const particleGeo = new THREE.BufferGeometry();
        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xd4b36c,
            size: 0.025,
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        let scrollRatio = 0;
        function onScroll() {
            const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
            scrollRatio = window.scrollY / maxScroll;
        }
        window.addEventListener("scroll", onScroll, { passive: true });

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
        let currentScroll = 0;

        function render() {
            const elapsed = clock.getElapsedTime();
            const speed = lowMotion ? 0.06 : 0.15;

            mesh.rotation.x = Math.sin(elapsed * speed * 0.4) * 0.3;
            mesh.rotation.y += speed * 0.012;

            wireframe.rotation.copy(mesh.rotation);

            particles.rotation.y += 0.002;
            particles.rotation.x += Math.sin(elapsed * 0.06) * 0.004;

            currentScroll += (scrollRatio - currentScroll) * 0.06;
            camera.position.y = 0.3 - currentScroll * 1.2 + Math.sin(elapsed * 0.15) * 0.12;
            camera.position.z = 7 + currentScroll * 0.6;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
            rafId = requestAnimationFrame(render);
        }

        render();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            wireframe.geometry.dispose();
            wireframe.material.dispose();
            particleGeo.dispose();
            particleMat.dispose();
        };
    }

    window.createHeroScene = createHeroScene;
})();