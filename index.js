// Write your code here
const baseUrl = 'https://api.openbrewerydb.org/breweries'

const main = document.querySelector('main')
const stateForm = document.querySelector('#select-state-form')

const state = {
    breweries : [],
    selectedState: null,
    breweryTypes: ['micro', 'regional', 'brewpub'],
    selectedBreweryType: '',
    selectedCities: []
}

function getCities (breweries) {
    let cities = []

    for (const brewery of breweries) {
        if (!cities.includes(brewery.city)) {
            cities.push(brewery.city)
        }
    }

    return cities
}

function fetchBreweriesByState(state){
    return fetch(`${baseUrl}?by_state=${state}&per_page=50`).then(resp =>
        resp.json()
    )
}


function renderFilter(){
    const filters = document.createElement('aside')
    filters.setAttribute ('class', 'filters-section ')

    const titleEl = document.createElement('h2')
    titleEl.textContent = 'Filter By:'

    const filteredByTypeForm = document.createElement('form')
    filteredByTypeForm.setAttribute('id', 'filter-by-type-form')
    filteredByTypeForm.setAttribute('autocompete', 'off')

    const filteredByLabel = document.createElement('label')
    filteredByLabel.setAttribute ('for', 'filter-by-type')

    const titleH3 = document.createElement('h3')
    titleH3.textContent = 'Type of Brewery'

    const filteredBySelectEl = document.createElement('select')
    filteredBySelectEl.setAttribute('name', 'filter-by-type')
    filteredBySelectEl.setAttribute('id', 'filter-by-type"')
    const option1 = document.createElement ('option')
    option1.setAttribute ('value', '')
    option1.textContent = 'Select a type...'
    const option2 = document.createElement ('option')
    option2.setAttribute ('value', 'micro')
    option2.textContent = 'Micro'
    const option3 = document.createElement ('option')
    option3.setAttribute  ('value', 'regional')
    option3.textContent = 'Regional'
    const option4 = document.createElement  ('option')
    option4.setAttribute  ('value', 'brewpub')
    option4.textContent = 'Brewpub'

    filteredBySelectEl.addEventListener("change", function (){
        !state.breweryTypes === state.breweryTypes
    })

    filteredBySelectEl.append(option1, option2, option3, option4)
    filteredByTypeForm.append(filteredByLabel, titleH3, filteredBySelectEl)


    const filteredCityHeading = document.createElement('div')
    filteredCityHeading.setAttribute('class', 'filter-by-city-heading')
    const citiesH3 = document.createElement('h3')
    citiesH3.textContent = 'Cities'

    const clearBtn = document.createElement('button')
    clearBtn.setAttribute('class', 'clear-all-btn')
    clearBtn.textContent = 'clear all'


    const filteredCityForm = document.createElement('form')
    filteredCityForm.setAttribute('id', 'filter-by-city-form')
    filteredCityForm.addEventListener('submit' , function(event){
        event.preventDefault()

    })
    filteredCityForm.innerHTML =``
    const cities = getCities(state.breweries)

    for (const city of cities) {
        const filterByCityInputEl = document.createElement('input')
        filterByCityInputEl.setAttribute('type', 'checkbox')
        filterByCityInputEl.setAttribute('class', 'city-checkbox')
        filterByCityInputEl.setAttribute('name', city)
        filterByCityInputEl.setAttribute('value' ,city)
        filterByCityInputEl.setAttribute('id', city)

        const filterByCitylabel1Form = document.createElement('label')
        filterByCitylabel1Form.setAttribute('for', city)
        filterByCitylabel1Form.textContent = city

        if (state.breweries.length !== 0) {
            filters.style.display = 'block'
        } else {
            filters.style.display = 'none'

        }
        filteredCityForm.append(filterByCityInputEl, filterByCitylabel1Form)
    }

    filteredCityHeading.append(citiesH3, clearBtn)
    filteredByLabel.append(titleH3)
    filters.append(titleEl, filteredByTypeForm, filteredCityHeading,  filteredCityForm)
    main.append(filters)
}

function renderMainsection(){
    const h1el = document.createElement('h1')
    h1el.textContent = 'List of Breweries'

    const searchHeader = document.createElement('header')
    searchHeader.setAttribute('class', 'search-bar')

    const searchBrewForm = document.createElement('form')
    searchBrewForm.setAttribute('id', 'search-breweries-form')
    searchBrewForm.setAttribute('autocomplete', 'off')

    const searchLabel = document.createElement('label')
    searchLabel.setAttribute('for', '"search-breweries')

    const h2Label = document.createElement('h2')
    h2Label.textContent = 'Search breweries:'

    searchLabel.append(h2Label)

    const searchInput = document.createElement('input')
    searchInput.setAttribute('id', 'search-breweries')
    searchInput.setAttribute('name','search-breweries')
    searchInput.setAttribute('type','text')

    searchBrewForm.append(searchLabel, searchInput)
    searchHeader.append(searchBrewForm)

    const articleEL = document.createElement('article')

    const listOfBreweries = document.createElement('ul')
    listOfBreweries.setAttribute('class', 'breweries-list')
    articleEL.append(listOfBreweries)

    for(const breweries of state.breweries){

        const liEL = document.createElement('li')

        const h2ListEl = document.createElement('h2')
        h2ListEl.textContent= breweries.name

        const microDiv = document.createElement('div')
        microDiv.setAttribute('class', 'type')
        microDiv.textContent = breweries.brewery_type

        const address = document.createElement('section')
        address.setAttribute('class', 'address')

        const h3Section = document.createElement('h3')
        h3Section.textContent = 'Address:'

        const paragraphEL = document.createElement('p')
        paragraphEL.textContent = breweries.street

        const paragraphEl2 = document.createElement('p')
        const strong = document.createElement('strong')
        strong.textContent = `${breweries.city} , ${breweries.postal_code}`
        paragraphEl2.append(strong)

        address.append(h3Section,paragraphEL, paragraphEl2)

        const phone = document.createElement('section')
        phone.setAttribute('class', 'phone')

        const h3Phone = document.createElement('h3')
        h3Phone.textContent = 'Phone:'

        const phoneSection = document.createElement('p')
        phoneSection.textContent = breweries.phone

        phone.append(h3Phone, phoneSection)

        const link = document.createElement('section')
        link.setAttribute('class', 'link')

        const anchorLink = document.createElement ('a')
        anchorLink.setAttribute('href', 'null')
        anchorLink.setAttribute('target', ' _blank')
        anchorLink.textContent = breweries.website_url

        link.append(anchorLink)
        liEL.append(h2ListEl,microDiv,address,phone,link)
        listOfBreweries.append(liEL)

    }

    main.append(h1el,searchHeader, articleEL)
}




function render(){
    renderFilter()
    renderMainsection()
}

function selectedStateForm(){
    stateForm.addEventListener('submit', function(event){
        event.preventDefault()
        state.selectedState = stateForm['select-state'].value

        fetchBreweriesByState(state.selectedState)
            .then(function(getBreweries){
                state.breweries = getBreweries
                render()
            })

    })
}

function init(){
    render()
    selectedStateForm()
}

init()
