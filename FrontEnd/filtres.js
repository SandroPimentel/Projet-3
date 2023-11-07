// Code pour récupérer les données de "works"
let cachedWorks = null;

async function fetchWorks() {
    if (!cachedWorks) {
        try {
            const response = await fetch("http://localhost:5678/api/works")
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            cachedWorks = await response.json()
        } catch (error) {
            console.error("Error fetching works:", error)
            cachedWorks = []
        }
    }
    return cachedWorks
}

// On exécute la fonction pour être sûr d'avoir les données 
fetchWorks()

// On ajoute les travaux à la galerie 
async function Gallery() {
    const works = await fetchWorks()
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''

    works.forEach(function(work) {
        const figureElement = document.createElement('figure')
        const imageElement = document.createElement('img')
        const captionElement = document.createElement('figcaption')
        
        imageElement.src = work.imageUrl
        imageElement.alt = work.title
        captionElement.innerText = work.title

            
            const categoryName = work.category.name;
            const cleanedCategoryName = categoryName.replace(/[^A-Za-z]/g, '')
            figureElement.classList.add('projet', cleanedCategoryName)

            figureElement.appendChild(imageElement)
            figureElement.appendChild(captionElement)

            gallery.appendChild(figureElement)
        })
        
}

document.addEventListener('DOMContentLoaded', Gallery)

// Changement de couleurs pour les boutons des filtres 
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
