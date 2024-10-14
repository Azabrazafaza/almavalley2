let isLinkScrolling = false

const updateHeader = () => {
	const header = document.getElementById('main_header')
	const scrollY = window.scrollY
	if (scrollY > header.offsetHeight) {
		header.style.background = `rgba(0, 0, 0, 1)`
	} else {
		header.style.background = `transparent`
	}
}
const updateActiveLink = currentHash => {
	const links = document.querySelectorAll('#main_header ul li a')
	const line = document.querySelector('#line')
	let lineWidth
	let lineLeft

	links.forEach(link => {
		const isActive = link.hash === currentHash
		if (isActive) {
			lineWidth = `${link.offsetWidth}px`
			lineLeft = `${link.offsetLeft}px`
		}

		link.addEventListener('click', () => {
			isLinkScrolling = true
			setTimeout(() => {
				isLinkScrolling = false
			}, 1000)
		})
	})

	if (lineWidth && lineLeft) {
		line.style.width = lineWidth
		line.style.left = lineLeft
	} else {
		line.style.width = 'unset'
		line.style.left = 'unset'
	}
}
const updateCollapse = () => {
	const collapses = document.querySelectorAll('#collapse > .item')
	console.log(collapses)
	collapses.forEach(collapse => {
		const header = collapse.querySelector('.header')
		const content = collapse.querySelector('.content')

		header.addEventListener('click', () => {
			if (collapse.getAttribute('data-expanded') === 'true') {
				collapse.setAttribute('data-expanded', 'false')
				content.style.maxHeight = '0'
			} else {
				collapse.setAttribute('data-expanded', 'true')
				content.style.maxHeight = '100%'
			}
		})
	})
}

const handleIntersection = entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting && !isLinkScrolling) {
			const currentHash = `#${entry.target.id}`
			window.location.hash = currentHash
			updateActiveLink(currentHash)
		}
	})
}

window.addEventListener('load', () => {
	const currentHash = window.location.hash
	updateActiveLink(currentHash)
	updateCollapse()

	const observer = new IntersectionObserver(handleIntersection, {
		threshold: 0.5,
	})

	document.querySelectorAll('section').forEach(section => {
		observer.observe(section)
	})
})

window.addEventListener('hashchange', () => {
	const currentHash = window.location.hash
	updateActiveLink(currentHash)
})
window.addEventListener('scroll', () => {
	updateHeader()
})

const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');

menuIcon.addEventListener('click', () => {
    sideMenu.classList.add('open'); // Открытие меню
});

function closeMenu() {
    sideMenu.classList.remove('open'); // Закрытие меню
}

