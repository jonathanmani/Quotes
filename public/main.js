const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv =document.querySelector('#message')

update.addEventListener('click', _ =>{
    fetch('/quotes', { 
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Billy Joe',
            quote: 'I just replaced your quote!'
        })
    })
    .then(res =>{
        if(res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ =>{
    fetch('/quotes', { 
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Billy Joe',
        })
    })
    .then(res =>{
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === 'No more quotes to delete'){
            messageDiv.textContent = 'No quotes to delete'
        } else {
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})
