document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	} else if (event.target.dataset.type === 'edit') {
		const newTitle = prompt('Новое название', event.target.dataset.title)
		if (newTitle) {
			const uNote = {
				id: event.target.dataset.id,
				title: newTitle,
			}
			edit(uNote).then(() => {
				event.target.closest('li').querySelector('span').innerHTML = uNote.title
				event.target.dataset.title = uNote.title
			})
		}
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' })
}
async function edit(uNote) {
	await fetch(`/${uNote.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(uNote),
	})
}
