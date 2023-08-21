const newPassForm = document.querySelector('#newPassword')
const passBtn = document.querySelector('#passwordButton')
const path = window.location.pathname
console.log(path)
const UID = path.split('/')[4]


passBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const [newPass, confirmPass] = newPassForm

    

    if (newPass.value !== confirmPass.value) {
        Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Password values doesnt match'
        })
    }

    fetch(`http://localhost:8080/api/session/restore/${UID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: newPass.value })
    })
        .then(res => res.json())
        .then(info => console.log(info))
        .catch(err => console.log(err))

    newPassForm.reset()
})