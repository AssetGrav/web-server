document.addEventListener('click', event => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}
const element = document.querySelector(".element")
document.addEventListener('click', event => {
    console.log(event.target.dataset)
    if (event.target.dataset.type === "update") {
        const titleUpdate = prompt()
        const id = event.target.dataset.id
        if (titleUpdate !== null) {
            update(id, titleUpdate).then(() => {
                element.innerHTML = titleUpdate
                console.log("?", element.value)
            })
        } else {

        }
        console.log(titleUpdate)
    }
})

async function update(id, data) {
    const newData = { "title": data, "id": id }
    await fetch(`/${id}`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newData)
    })
}