window.addEventListener('DOMContentLoaded', async () => {

    let url = 'http://localhost:8000/api/locations/'

    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('An error occurred')
        } else {
            const data = await response.json()

            const selectTag = document.getElementById('location')
            for (let location of data.locations) {
                const option = document.createElement('option')
                option.value = location.id
                option.innerHTML = location.id
                selectTag.appendChild(option)
            }
            const formTag = document.getElementById('create-conference-form')
            formTag.addEventListener('submit', async event => {
                event.preventDefault()
                const formData = new FormData(formTag)
                const json = JSON.stringify(Object.fromEntries(formData))
                const conferenceURL = 'http://localhost:8000/api/conferences/'
                const fetchConfig = {
                    method: 'POST',
                    body: json,
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
                const response = await fetch(conferenceURL, fetchConfig)
                if (response.ok) {
                    formTag.reset()
                    const newConference = await response.json()
                    console.log(newConference)
                }
            })
        }
    } catch (e) {
        console.error(e)
    }
})
