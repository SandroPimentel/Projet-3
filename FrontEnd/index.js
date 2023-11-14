// Code pour l'interface d'édition 
function loadModaleJS() {
    const topBar = document.querySelector('body #hidden-top-bar')
    topBar.removeAttribute('id')

    const modifier = document.querySelector('#not-login')
    modifier.setAttribute("id", "modifier")

    const filtres = document.querySelector(".filtres")
    filtres.setAttribute('id', 'hidden-filtres')

    const logout = document.querySelector('.nav #login')
    logout.textContent = 'logout'


    logout.addEventListener("click", function(event) {
        event.preventDefault()
        window.localStorage.removeItem("token")
        window.location.href = 'index.html'
    })
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.localStorage.getItem("token")) {
        loadModaleJS();
    }
})

// Fonctions pour la modal
function openModal1() {
    document.querySelector(".overlay").removeAttribute('id')
    document.querySelector("#modal1").style.display = "block"
    loadWorksIntoModal()
}


async function loadWorksIntoModal() {
    const modalBody = document.querySelector('#modal-body-1')
    modalBody.innerHTML = ''

    cachedWorks.forEach(function(work) {
        const divElement = document.createElement('div')
        const imageElement = document.createElement('img')
        
        imageElement.src = work.imageUrl
        divElement.appendChild(imageElement)
        

        const buttonElement = document.createElement('button')
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        
        svgElement.setAttribute('width', '9')
        svgElement.setAttribute('height', '11')
        svgElement.setAttribute('viewBox', '0 0 9 11')
        svgElement.setAttribute('fill', 'none')
        
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        pathElement.setAttribute('d', 'M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z')
        pathElement.setAttribute('fill', 'white')
        
        svgElement.appendChild(pathElement)
        buttonElement.appendChild(svgElement)
        divElement.appendChild(buttonElement)
        divElement.setAttribute('id', work.id)

        buttonElement.addEventListener('click', function() {

            const token = localStorage.getItem('token');

            fetch(`http://localhost:5678/api/works/${work.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                if(response.ok) {
                    console.log(divElement)
                    cachedWorks = cachedWorks.filter(element => element.id !== work.id)
                    gallery(cachedWorks)
                    modalBody.removeChild(divElement)
                } else {
                    console.error('Erreur lors de la suppression')
                }
            })
        }) 
        modalBody.appendChild(divElement)
    })
 } 

function closeModal() {
    document.querySelector(".overlay").setAttribute('id', 'hidden-overlay')
    document.querySelector("#modal1").style.display = "none"
    document.querySelector("#modal2").style.display = "none"
    resetModal2() 
}

function openModal2() {
    document.querySelector("#modal1").style.display = "none"
    document.querySelector("#modal2").style.display = "block"
}

function modalBack() {
    document.querySelector("#modal1").style.display = "block"
    document.querySelector("#modal2").style.display = "none"
    resetModal2() 
}

function resetModal2() {
    const imageContainer = document.getElementById('image-container')
    imageContainer.innerHTML = ''

    const titre = document.querySelector('#title-project-input')
    titre.textContent = ''
  
    const inputTitre = document.getElementById('title-project-input')
    inputTitre.value = ''

    const selectCategorie = document.getElementById('select-categorie')
    selectCategorie.selectedIndex = 0

    document.getElementById('icon-image-hidden').style.display = 'flex'
    document.getElementById('form-hidden').style.display = 'flex'
    document.getElementById('hidden-format-text').style.display = 'flex'

    document.getElementById('modal2-button').style.backgroundColor = "#A7A7A7"
}


// Code pour le changement de couleur du bouton valider

function checkInputs() {

    const imageContainer = document.getElementById('image-container')
    const imageChosen = imageContainer.innerHTML !== ''

    const titleInput = document.getElementById('title-project-input')
    const titleEntered = titleInput.value.trim() !== ''

    const categorySelect = document.getElementById('select-categorie')
    const categorySelected = categorySelect.value !== ''


    if (imageChosen && titleEntered && categorySelected) {
        document.getElementById('modal2-button').style.backgroundColor = "#1D6154"
    } else {
        document.getElementById('modal2-button').style.backgroundColor = "#A7A7A7"
    }
}

document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageContainer = document.getElementById('image-container')
            imageContainer.innerHTML = `<img src="${e.target.result}" style="width: 129px; height: 193px;">`

            checkInputs()

        document.getElementById('icon-image-hidden').style.display = 'none'
        document.getElementById('form-hidden').style.display = 'none'
        document.getElementById('hidden-format-text').style.display = 'none'
        }
        reader.readAsDataURL(file)
    }
})

document.getElementById('title-project-input').addEventListener('input', checkInputs)
document.getElementById('select-categorie').addEventListener('change', checkInputs)

// Code pour ajouter les catégories et les filtres 
function filterWorks(id) {
    const activeClass = document.querySelectorAll(".basic-style")
    activeClass.forEach( active => active.classList.remove("filtre-click"))
    const btn = document.getElementById(id)
    let filterWorks = []
    btn.classList.add("filtre-click")
    if (id === 0) {
        filterWorks = cachedWorks
    } else {
        filterWorks = cachedWorks.filter(item => item.categoryId === id) 
    }
    gallery(filterWorks)
}

function createCategories(data) {
    data.unshift({"id":0, "name": "Tous"})
    const filtres = document.querySelector(".filtres")
    filtres.innerHTML = ""
    data.forEach (element => {
        const btn = document.createElement("button")
        btn.classList.add("basic-style")
        btn.classList.remove("filtre-click")
        btn.innerText = element.name
        btn.setAttribute("id", element.id)
        btn.addEventListener("click", () => {
            filterWorks(element.id)
        })
        filtres.appendChild(btn)
    })
}

async function loadCategoriesIntoSelect() {
    try {
        const response = await fetch('http://localhost:5678/api/categories')
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`)
        }
        const categories = await response.json()
        const select = document.getElementById('select-categorie')
        select.length = 1
        if (categories) {
            createCategories(categories)
        }
        categories.forEach((category) => {
            if (category.id > 0) {
                const option = new Option(category.name, category.id)
                select.add(option)
            }
        })
    } catch (error) {
        console.error('Erreur lors du chargement des catégories:', error)
    }
}

// EventListener pour les boutons 
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("modifierBtn").addEventListener("click", openModal1)
    document.getElementById("modal1-close").addEventListener("click", closeModal)
    document.getElementById("modal1-button").addEventListener("click", openModal2)
    document.getElementById("modal2-close").addEventListener("click", closeModal)
    document.getElementById("modal-back").addEventListener("click", modalBack)
});


// Code pour envoyer les données 
async function submitForm() {

    const titleInput = document.getElementById('title-project-input').value
    const imageUrl = document.getElementById('imageInput')
    const categorySelect = document.getElementById('select-categorie')
    const categoryId = categorySelect.value

    const formData = new FormData()
    formData.append("image", imageUrl.files[0])
    formData.append("title", titleInput)
    formData.append("category", categoryId)

    const token = window.localStorage.getItem("token")

    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token 
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`)
        }

        const data = await response.json()
        cachedWorks.push(data)
        gallery(cachedWorks)
        loadWorksIntoModal()
        closeModal()
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadCategoriesIntoSelect()
    document.getElementById('modal2-button').addEventListener('click', function(event) {
        event.preventDefault()
        submitForm()
    })
})
