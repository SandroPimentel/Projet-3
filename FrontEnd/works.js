// Code pour récupérer les données de "works" et ajouter les travaux à la galerie
function gallery(data) {
    const gallery = document.querySelector('.gallery')
    gallery.innerHTML = ''
    data.forEach(function(work) {
        const figureElement = document.createElement('figure')
        const imageElement = document.createElement('img')
        const captionElement = document.createElement('figcaption')

        
        imageElement.src = work.imageUrl
        imageElement.alt = work.title
        captionElement.innerText = work.title

            figureElement.appendChild(imageElement)
            figureElement.appendChild(captionElement)

            gallery.appendChild(figureElement)
        })
        
}

let cachedWorks = null;

async function fetchWorks() {
    if (!cachedWorks) {
        try {
            const response = await fetch("http://localhost:5678/api/works")
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            cachedWorks = await response.json()
            gallery(cachedWorks)
        } catch (error) {
            console.error("Error fetching works:", error)
            cachedWorks = []
        }
    }
    return cachedWorks
}

fetchWorks()
