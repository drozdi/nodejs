document.addEventListener('click', event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id
		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	} else if (event.target.dataset.type === 'edit') {
		const $li = event.target.closest('li')
		const id = event.target.dataset.id
		const title = event.target.dataset.title
		const srcHtml = $li.innerHTML

		$li.innerHTML = `
      <input class="flex-fill me-4" type="text" value="${title}">
			<div>
        <button class="btn btn-success" data-type="save">Сохранить</button>
        <button class="btn btn-danger" data-type="cancel">Отменить</button>
      </div>
    `

		function onClick({ target }) {
			if (target.dataset.type === 'cancel') {
				$li.innerHTML = srcHtml
				$li.removeEventListener('click', onClick)
			} else if (target.dataset.type === 'save') {
				const title = $li.querySelector('input').value
				edit({ title, id }).then(() => {
					$li.innerHTML = `
						<span>${title}</span>
						<div>
							<button class="btn btn-primary" data-type="edit" data-id="${id}" data-title="${title}">Обновить</button>
							<button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
						</div>
					`
					$li.removeEventListener('click', onClick)
				})
			}
		}

		$li.addEventListener('click', onClick)
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
