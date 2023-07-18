function AttendeesList(props) {
    return (
        <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Conference</th>
                </tr>
            </thead>
            <tbody>
                {props.attendees.map(attendee => {
                    return (
                        <tr key={attendee.href}>
                            <td>{attendee.name}</td>
                            <td>{attendee.conference}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default AttendeesList;
