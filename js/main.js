(function () {
  "use strict";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* --- Three.js: Brahmand — layered stars, fog, central orb, rings, parallax --- */
  function initCosmos() {
    var canvas = document.getElementById("cosmos");
    if (!canvas || typeof THREE === "undefined") return;

    var reduced = prefersReducedMotion();

    var scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030510, 0.055);

    var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.z = 5.2;

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    var universe = new THREE.Group();
    scene.add(universe);

    function makeStarLayer(count, spread, size, colorHex, opacity) {
      var geo = new THREE.BufferGeometry();
      var positions = new Float32Array(count * 3);
      var i;
      for (i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.65 - 1;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      var mat = new THREE.PointsMaterial({
        color: colorHex,
        size: size,
        transparent: true,
        opacity: opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      return new THREE.Points(geo, mat);
    }

    var farStars = makeStarLayer(2200, 22, 0.028, 0xffffff, 0.55);
    var midStars = makeStarLayer(1400, 16, 0.04, 0xffd54f, 0.45);
    var nearStars = makeStarLayer(900, 12, 0.045, 0x90caf9, 0.5);
    universe.add(farStars);
    universe.add(midStars);
    universe.add(nearStars);

    /* Central “brahmand” orb — metallic + emissive */
    var orbGeo = new THREE.IcosahedronGeometry(0.42, 2);
    var orbMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      emissive: 0xfbbf24,
      emissiveIntensity: 0.35,
      metalness: 0.65,
      roughness: 0.35,
    });
    var orb = new THREE.Mesh(orbGeo, orbMat);
    universe.add(orb);

    var orbWire = new THREE.Mesh(
      orbGeo,
      new THREE.MeshBasicMaterial({
        color: 0xfbbf24,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      })
    );
    orbWire.scale.set(1.08, 1.08, 1.08);
    universe.add(orbWire);

    /* Orbiting rings — Vishnu blue & hari gold */
    function makeRing(radius, tube, color, opacity, tiltX, tiltZ) {
      var g = new THREE.TorusGeometry(radius, tube, 20, 120);
      var m = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity,
      });
      var mesh = new THREE.Mesh(g, m);
      mesh.rotation.x = tiltX;
      mesh.rotation.z = tiltZ;
      return mesh;
    }

    var ring1 = makeRing(1.35, 0.018, 0xfbbf24, 0.45, Math.PI / 2.2, 0);
    var ring2 = makeRing(1.75, 0.012, 0x3b82f6, 0.3, Math.PI / 2.5, Math.PI / 3.2);
    var ring3 = makeRing(2.1, 0.01, 0xea580c, 0.22, Math.PI / 2.1, -Math.PI / 4);
    universe.add(ring1);
    universe.add(ring2);
    universe.add(ring3);

    /* Lights — warm + cool + fill */
    scene.add(new THREE.AmbientLight(0x404878, 0.35));
    var goldLight = new THREE.PointLight(0xfbbf24, 0.9, 25);
    goldLight.position.set(3, 2, 4);
    scene.add(goldLight);
    var blueLight = new THREE.PointLight(0x60a5fa, 0.7, 22);
    blueLight.position.set(-3.5, -1, 3);
    scene.add(blueLight);
    var rimLight = new THREE.DirectionalLight(0xf1f5f9, 0.25);
    rimLight.position.set(0, 4, 6);
    scene.add(rimLight);

    var mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    var lookAtOrigin = new THREE.Vector3(0, 0, 0);
    window.addEventListener("mousemove", function (e) {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    var t = 0;
    function animate() {
      requestAnimationFrame(animate);
      if (!reduced) {
        t += 0.0014;
        universe.rotation.y += 0.00042;
        universe.rotation.x = Math.sin(t * 0.35) * 0.06;

        farStars.rotation.y += 0.00008;
        midStars.rotation.y -= 0.00012;
        nearStars.rotation.y += 0.00018;

        orb.rotation.y += 0.003;
        orb.rotation.x += 0.0012;
        orbWire.rotation.y -= 0.0025;

        ring1.rotation.z += 0.0018;
        ring2.rotation.z -= 0.0012;
        ring3.rotation.x += 0.0009;

        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;
        camera.position.x = mouse.x * 0.35;
        camera.position.y = mouse.y * -0.25;
        camera.lookAt(lookAtOrigin);

        goldLight.intensity = 0.75 + Math.sin(t * 2.2) * 0.2;
        blueLight.intensity = 0.6 + Math.cos(t * 1.8) * 0.15;
      }
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  function initTilt() {
    if (prefersReducedMotion()) return;
    var wraps = document.querySelectorAll("[data-tilt]");
    var max = 10;

    wraps.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var rect = el.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform =
          "perspective(1000px) rotateY(" + x * max + "deg) rotateX(" + -y * max + "deg) translateZ(0)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }

function initReveal() {
 var sections = document.querySelectorAll(".section .card, .section .skills-cloud, .section-head");
 sections.forEach(function (el) {
 el.classList.add("reveal");
 });

 var io = new IntersectionObserver(
 function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 entry.target.classList.add("visible");
 }
 });
 },
 { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
 );

 document.querySelectorAll(".reveal").forEach(function (el) {
 io.observe(el);
 });
 }

 function initSkillBars() {
 var skillFills = document.querySelectorAll(".skill-bar-fill");

 var io = new IntersectionObserver(
 function (entries) {
 entries.forEach(function (entry) {
 if (entry.isIntersecting) {
 var fill = entry.target;
 var width = fill.getAttribute("data-width");
 fill.style.setProperty("--target-width", width + "%");
 fill.classList.add("animate");
 }
 });
 },
 { threshold: 0.3 }
 );

 skillFills.forEach(function (fill) {
 io.observe(fill);
 });
 }

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  function initParallax() {
    if (prefersReducedMotion()) return;
    var aurora = document.querySelector(".aurora");
    if (!aurora) return;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      aurora.style.transform = "translateY(" + y * 0.04 + "px)";
    });
  }

initCosmos();
 initTilt();
 initReveal();
 initNav();
 initParallax();
 initSkillBars();
})();
