import React, { useEffect, useState } from 'react';

function ConferenceForm(props) {
    const [states, setStates] = useState([])
    const [name, setName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [description, setDescription] = useState("")
    const [maxPresentations, setMaxPresentations] = useState("")
    const [maxAttendees, setMaxAttendees] = useState("")
    const [location, setLocation] = useState("")

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handleStartDateChange = (event) => {
        const value = event.target.value
        setStartDate(value)
    }

    const handleEndDateChange = (event) => {
        const value = event.target.value
        setEndDate(value)
    }

    const handleDescriptionChange = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    const handleMaxPresentationChange = (event) => {
        const value = event.target.value
        setMaxPresentations(value)
    }

    const handleSetMaxAttendeesChange = (event) => {
        const value = event.target.value
        setMaxAttendees(value)
    }

    const handleLocationChange = (event) => {
        const value = event.target.value
        setLocation(value)
    }

    const handleSumbit = async (event) => {
        event.preventDefault()

        const data = {}
        data.name = name
        data.starts = startDate
        data.ends = endDate
        data.description = description
        data.max_presentations = maxPresentations
        data.max_attendees = maxAttendees
        data.location = location
        console.log(data)

        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            const newConference = await response.json();
            console.log(newConference);

            setName("")
            setStartDate("")
            setEndDate("")
            setDescription("")
            setMaxPresentations("")
            setMaxAttendees("")
            setLocation("")

        }
    }


    const fetchData = async () => {
        const url = 'http://localhost:8000/api/locations/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setStates(data.locations)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new conference</h1>
                    <form onSubmit={handleSumbit} id="create-conference-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" id="name" name="name"
                                className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleStartDateChange} value={startDate} placeholder="starts" required type="date" id="starts" name="starts"
                                className="form-control" min="YYYY-MM-DD" max="YYYY-MM-DD" />
                            <label htmlFor="starts">Start Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleEndDateChange} value={endDate} placeholder="ends" required type="date" id="ends" name="ends"
                                className="form-control" min="YYYY-MM-DD" max="YYYY-MM-DD" />
                            <label htmlFor="ends">End Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea onChange={handleDescriptionChange} value={description} placeholder="description" required name="description" id="description"
                                className="form-control"></textarea>
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleMaxPresentationChange} value={maxPresentations} placeholder="max_presentations" required type="text" id="max_presentations"
                                name="max_presentations" className="form-control" />
                            <label htmlFor="max_presentations">Maximum presentations</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleSetMaxAttendeesChange} value={maxAttendees} placeholder="max_attendees" required type="text" id="max_attendees"
                                name="max_attendees" className="form-control" />
                            <label htmlFor="max_attendees">Maximum attendees</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleLocationChange} value={location} required name="location" id="location" className="form-select">
                                <option value="">Choose a location</option>
                                {states.map(state => {
                                    return (
                                        <option key={Math.random(location.id)} value={state.id}>
                                            {state.id}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConferenceForm
