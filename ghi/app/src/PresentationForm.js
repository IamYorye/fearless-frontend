import React, { useEffect, useState } from 'react';

function PresentationForm(props) {

    const [presenter_name, setPresenterName] = useState("")
    const [presenter_email, setPresenterEmail] = useState("")
    const [company_name, setCompanyName] = useState("")
    const [title, setTitle] = useState("")
    const [synopsis, setSynopsis] = useState("")
    const [conference, setConference] = useState("")
    const [conferences, setConferences] = useState([])

    const handlePresenterNameChange = (event) => {
        const value = event.target.value
        setPresenterName(value)
    }

    const handlePresenterEmailChange = (event) => {
        const value = event.target.value
        setPresenterEmail(value)
    }

    const handleCompanyNameChange = (event) => {
        const value = event.target.value
        setCompanyName(value)
    }

    const handleTitleChange = (event) => {
        const value = event.target.value
        setTitle(value)
    }

    const handleSynopsisChange = (event) => {
        const value = event.target.value
        setSynopsis(value)
    }

    const handleConferenceChange = (event) => {
        const value = event.target.value
        setConference(value)
    }


    const fetchData = async () => {
        const url = "http://localhost:8000/api/conferences/"
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setConferences(data.conferences)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.presenter_name = presenter_name
        data.presenter_email = presenter_email
        data.company_name = company_name
        data.title = title
        data.synopsis = synopsis
        data.conference = conference

        const selectTag = document.getElementById('conference');
        const conferenceId = selectTag.options[selectTag.selectedIndex].value;
        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }
        const response = await fetch(presentationUrl, fetchConfig)
        if (response.ok) {
            const newPresentation = await response.json()
            console.log(newPresentation)

            setPresenterName("")
            setPresenterEmail("")
            setCompanyName("")
            setTitle("")
            setSynopsis("")
            setConference("")
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new presentation</h1>
                    <form onSubmit={handleSubmit} id="create-presentation-form">
                        <div className="form-floating mb-3">
                            <input onChange={handlePresenterNameChange} value={presenter_name} placeholder="presenter_name" required type="text" id="presenter_name"
                                name="presenter_name" className="form-control" />
                            <label htmlFor="presenter_name">Presenter Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePresenterEmailChange}
                                value={presenter_email} placeholder="presenter_email" required type="text" id="presenter_email"
                                name="presenter_email" className="form-control" />
                            <label htmlFor="presenter_email">Presenter email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleCompanyNameChange} value={company_name} placeholder="company_name" required type="text" id="company_name"
                                name="company_name" className="form-control" />
                            <label htmlFor="company_name">Company Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleTitleChange} value={title} placeholder="title" required type="text" id="title" name="title"
                                className="form-control" />
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea onChange={handleSynopsisChange} value={synopsis} placeholder="synopsis" required name="synopsis" id="synopsis"
                                className="form-control"></textarea>
                            <label htmlFor="synopsis">Synopsis</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleConferenceChange} value={conference} required id="conference" name="conference" className="form-select">
                                <option value="">Choose a conference</option>
                                {conferences.map(conference => {
                                    return (
                                        <option key={conference.id}
                                            value={conference.id}>
                                            {conference.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className="alert alert-success d-none mb-0" id="success-message">
                        Congratulations! You created a new presentation!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PresentationForm
