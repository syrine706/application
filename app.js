// Initialisation de AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

document.addEventListener('DOMContentLoaded', function() {
    // Éléments des modals
    const registerModal = document.getElementById('registerModal');
    const loginModal = document.getElementById('loginModal');

    // Boutons d'ouverture
    const openSignupBtns = document.querySelectorAll('#openSignupBtn, #heroSignupBtn, #switchToSignup');
    const openLoginBtns = document.querySelectorAll('#openLoginBtn, #switchToLogin');
    const closeBtns = document.querySelectorAll('.close');

    // Menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
            this.reset();
        });
    }

    // Ouvrir modal d'inscription
    openSignupBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (registerModal) {
                    if (loginModal) loginModal.classList.remove('active');
                    registerModal.classList.add('active');
                }
            });
        }
    });

    // Ouvrir modal de connexion
    openLoginBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                if (loginModal) {
                    if (registerModal) registerModal.classList.remove('active');
                    loginModal.classList.add('active');
                }
            });
        }
    });

    // Fermer les modals
    closeBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                if (registerModal) registerModal.classList.remove('active');
                if (loginModal) loginModal.classList.remove('active');
            });
        }
    });

    // Fermer en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Menu mobile
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            if (navMenu.style.display === 'flex') {
                navMenu.style.display = 'none';
            } else {
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '70px';
                navMenu.style.left = '0';
                navMenu.style.right = '0';
                navMenu.style.background = 'white';
                navMenu.style.padding = '20px';
                navMenu.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            }
        });
    }

    // GESTION DU FORMULAIRE D'INSCRIPTION
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Récupérer les valeurs
            const nom = document.getElementById('registerNom').value.trim();
            const prenom = document.getElementById('registerPrenom').value.trim();
            const email = document.getElementById('registerEmail').value.trim();
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;

            // Récupérer le genre
            const genreElements = document.getElementsByName('genre');
            let genre = '';
            for (let elem of genreElements) {
                if (elem.checked) {
                    genre = elem.value;
                    break;
                }
            }

            // Validation
            if (!nom || !prenom || !email || !password || !confirmPassword || !genre) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas');
                return;
            }

            if (password.length < 6) {
                alert('Le mot de passe doit contenir au moins 6 caractères');
                return;
            }

            // Validation email simple
            if (!email.includes('@') || !email.includes('.')) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }

            // Sauvegarder les informations
            sessionStorage.setItem('userNom', nom);
            sessionStorage.setItem('userPrenom', prenom);
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('userGenre', genre);
            sessionStorage.setItem('isLoggedIn', 'true');

            // Message de bienvenue personnalisé
            const titre = genre === 'masculin' ? 'M.' : 'Mme';
            alert(`Bienvenue ${titre} ${prenom} ${nom} !\nRedirection vers votre espace personnel...`);

            // Rediriger vers l'application
            window.location.href = 'app2.html';
        });
    }

    // GESTION DU FORMULAIRE DE CONNEXION
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                alert('Veuillez remplir tous les champs');
                return;
            }

            // Validation email simple
            if (!email.includes('@') || !email.includes('.')) {
                alert('Veuillez entrer une adresse email valide');
                return;
            }

            // Simuler une connexion réussie
            sessionStorage.setItem('userEmail', email);
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userPrenom', email.split('@')[0]); // Utiliser la partie avant @ comme prénom

            alert('Connexion réussie !\nRedirection vers votre espace personnel...');
            window.location.href = 'app2.html';
        });
    }

    // Gestion du scroll pour la navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                navbar.classList.remove('scroll-down');
                return;
            }

            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
                navbar.style.transform = 'translateY(-100%)';
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Détection de la section active
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Gestion du bouton démo
    const demoBtn = document.getElementById('demoBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            alert('Démonstration : Découvrez nos fonctionnalités en vidéo !');
            window.open('https://www.youtube.com/watch?v=demo', '_blank');
        });
    }

    // Vérifier si déjà connecté
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const userPrenom = sessionStorage.getItem('userPrenom');
        if (userPrenom) {
            console.log(`Utilisateur connecté : ${userPrenom}`);
        }
    }
});