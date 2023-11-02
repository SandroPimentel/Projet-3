fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(works => {
        const gallery = document.querySelector('.gallery');

        works.forEach(function(work) {

            const figureElement = document.createElement('figure');
            const imageElement = document.createElement('img');
            const captionElement = document.createElement('figcaption');
            

            imageElement.src = work.imageUrl;
            imageElement.alt = work.title;
            captionElement.innerText = work.title;

            
            const categoryName = work.category.name;
            const cleanedCategoryName = categoryName.replace(/[^A-Za-z]/g, '');
            figureElement.classList.add('projet', cleanedCategoryName);

            figureElement.appendChild(imageElement);
            figureElement.appendChild(captionElement);

            gallery.appendChild(figureElement);
        });
        
    })
    .catch(error => console.error("Erreur lors de la récupération des données:", error));

document.querySelectorAll('.filtres button').forEach(bouton => {
    bouton.addEventListener('click', function () {
        const buttons = document.querySelectorAll('.filtres button')
        buttons.forEach(b => {
            b.classList.toggle('filtre-click', b === bouton)
            b.classList.toggle('basic-style', b !== bouton)
        })

        const className = bouton.id.replace(/[^A-Za-z]/g, '')
        const projets = document.querySelectorAll('.projet')
        projets.forEach(projet => {
            projet.style.display = className === "Tous" || projet.classList.contains(className) ? 'block' : 'none'
        })
    })
})

