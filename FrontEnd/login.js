// Code pour le login
document.querySelector(".login-section button").addEventListener("click", function() {
    const email = document.getElementById('email-input').value
    const mdp = document.getElementById('mdp-input').value

    if (email && mdp) {
        fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, "password":mdp})
        })
        .then (reponse => reponse.json())
        .then (data => {
            if (data.token) {
                window.localStorage.setItem("token", data.token)
                window.location.href = "index.html"
            } else {
                alert("Erreur dans l'identifiant ou le mot de passe")
            }
        })
        .catch(error => {
            console.error("Erreur lors de la connexion :", error)
        });
    } else {
        alert("Veuillez mettre un e-mail et un mot de passe")
    }
})

// email: sophie.bluel@test.tld
// password: S0phie
