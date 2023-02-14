
const data = []
let timeFrame = 'weekly'

function getData(){
	fetch('./data.json')
	.then((response) => response.json())
	.then((json) => {
		json.forEach(d => {
			data.push(d)
		});
	})
}

getData()

function showData(){
	const cardsContentDiv = document.querySelector('.cards-content')
	cardsContentDiv.replaceChildren([])
	data.forEach(d => {
		buildCard(d.title, d.timeframes[timeFrame].current, d.timeframes[timeFrame].previous)
	})
}

function handleClickBtn(elem) {
	const activeElements = document.querySelectorAll('.active')
	activeElements.forEach(elem => {
		elem.classList.remove('active')
	})
	
	elem.classList = ['active']
	elem = elem.innerText.toLowerCase()
	switch(elem){
		case 'daily':
			timeFrame = 'daily' 
		break
		case 'weekly':
			timeFrame = 'weekly' 
		break
		case 'monthly':
			timeFrame = 'monthly' 
		break
		default:
			timeFrame = 'weekly'
	}

	showData()
}

function buildCard(title, currentHours, previousHours){

	const cardBackgroundClass = title.replace(' ', '-').toLowerCase()
	
	const cardDiv = document.createElement('div')
	cardDiv.classList = [`card card-${cardBackgroundClass}`]


	const cardContentDiv = document.createElement('div')
	cardContentDiv.classList = ['card-content']

	const cardHeaderDiv = document.createElement('div')
	cardHeaderDiv.classList = ['card-header']

	const titleElement = document.createElement('p')
	titleElement.innerText = title

	const optionsButton = document.createElement('button')
	optionsButton.setAttribute('type', 'button')
	optionsButton.innerHTML = '<img src="images/icon-ellipsis.svg" alt="Options">'
	
	const cardFooterDiv = document.createElement('div')
	cardFooterDiv.classList = ['card-footer']

	const currentHoursElement = document.createElement('p')
	currentHoursElement.innerText = `${currentHours}hrs`

	const previousHoursElement = document.createElement('span')
	previousHoursElement.innerText = `Last week - ${previousHours}hrs`
	
	cardDiv.appendChild(cardContentDiv)
	cardContentDiv.appendChild(cardHeaderDiv)
	cardContentDiv.appendChild(cardFooterDiv)
	cardHeaderDiv.appendChild(titleElement)
	cardHeaderDiv.appendChild(optionsButton)
	cardFooterDiv.appendChild(currentHoursElement)
	cardFooterDiv.appendChild(previousHoursElement)

	const cardsContentDiv = document.querySelector('.cards-content')
	cardsContentDiv.appendChild(cardDiv)
	
}
