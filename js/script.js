document.addEventListener('DOMContentLoaded', () =>{
    const path = window.location.pathname;

    // Lógica para a página de perfil (perfil.html)
    if (path.includes('perfil.html')) {
        let usuarioLogado = null;
        if (typeof(Storage) !== "undefined") {
            usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        }

        if (!usuarioLogado) {
            // Se não estiver logado, redireciona para a página de login
            window.location.href = 'login.html';
        } else {
            // Se estiver logado, exibe as informações do usuário
            const nomeElement = document.getElementById('nome');
            const emailElement = document.getElementById('email');
            if (nomeElement) {
                nomeElement.textContent = usuarioLogado.nome;
            }
            if (emailElement) {
                emailElement.textContent = usuarioLogado.email;
            }

            // Funcionalidade de Logout
            const logoutLink = document.getElementById('logout');
            if (logoutLink) {
                logoutLink.addEventListener('click', function(event) {
                    event.preventDefault(); 
                    localStorage.removeItem('usuarioLogado'); 
                    window.location.href = 'login.html'; 
                });
            }
        }
    }

    // Login
    if (path.includes('login.html')) {
        const loginButton = document.querySelector('.box button');
        const nameInput = document.querySelector('.box input[type="text"]');
        const emailInput = document.querySelector('.box input[type="email"]');

        if (loginButton && nameInput) { 
            loginButton.addEventListener('click', function() {
                const nome = nameInput.value;
                const email = emailInput.value;

                if (!nome || !email) {
                    alert('Por favor, preencha seu nome e e-mail.');
                    return;
                }

                const usuario = {
                    nome: nome,
                    email: email
                };

                localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                window.location.href = 'perfil.html';
            });
        }
    }
});
