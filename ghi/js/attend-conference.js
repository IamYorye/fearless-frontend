window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
    const loadingIcon = document.getElementById('loading-conference-spinner');
    const successAlert = document.getElementById("success-message")
    const createdForm = document.getElementById("create-attendee-form")

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        const selectTag = document.getElementById('conference');
        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        loadingIcon.classList.add('d-none')
        selectTag.classList.remove('d-none')

        const formTag = document.getElementById('create-attendee-form')
        formTag.addEventListener('submit', async event => {
            event.preventDefault()
            const formData = new FormData(formTag)
            const json = JSON.stringify(Object.fromEntries(formData))
            const attendeeURL = 'http://localhost:8001/api/attendees/'
            const fetchConfig = {
                method: "POST",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const response = await fetch(attendeeURL, fetchConfig)
            if (response.ok) {
                formTag.reset()
                const newAttendee = await response.json()
                console.log(newAttendee)
            }
            createdForm.classList.add('d-none')
            successAlert.classList.remove('d-none')
        })



    }

});
