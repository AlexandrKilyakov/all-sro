document.addEventListener('DOMContentLoaded', function() {
	const accordion = document.querySelectorAll('.accordion');
	let accordionHeight = [];

	if(accordion) {
		setTimeout(function() {
			for(let i = 0; i < accordion.length; i++) {
				let child = accordion[i].querySelector('.accordion-child');
				accordionHeight.push(child.offsetHeight);
				child.style.height = '0px';
			}

			for(let i = 0; i < accordion.length; i++) {
				let child = accordion[i].querySelector('.accordion-child');
				let arrow = accordion[i].querySelector('.accordion-arrow');

				accordion[i].querySelector('.accordion-name').addEventListener('click', function() {
					if(child.offsetHeight == 0) {
						child.style.height = `${accordionHeight[i]}px`;
						if(!arrow.classList.contains('accordion-arrow-active'))
							arrow.classList.add('accordion-arrow-active');
					} else {
						child.style.height = `0px`;
						if(arrow.classList.contains('accordion-arrow-active'))
							arrow.classList.remove('accordion-arrow-active');
					}
				});
			}
		}, 500);
	}
});