function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

function createCard(name, description, pictureUrl, starts, ends, location) {
    const formattedStarts = formatDate(starts);
    const formattedEnds = formatDate(ends);
    return `
      <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
            ${formattedStarts} - ${formattedEnds}
      </div>
      </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
    const cardContainers = document.querySelectorAll('.card-columns');

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("An error has occurred")
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const starts = details.conference.starts
                    const ends = details.conference.ends
                    const pictureUrl = details.conference.location.picture_url;
                    const location = details.conference.location.name
                    const html = createCard(name, description, pictureUrl, starts, ends, location);
                    // const column = document.querySelector('.col');
                    // column.innerHTML += html;
                    const targetContainer = cardContainers[Math.floor(Math.random() * cardContainers.length)];
                    targetContainer.innerHTML += html;
                }
            }

        }
    } catch (e) {
        console.error(e);
        const errorHtml = `
          <div class="alert alert-danger" role="alert">
            Error occurred while fetching conference data: ${e.message}
          </div>
        `;
        const column = document.querySelector('.col');
        column.innerHTML += errorHtml;
    }

})



// window.addEventListener('DOMContentLoaded', async () => {

//     const url = 'http://localhost:8000/api/conferences/';

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             // Figure out what to do when the response is bad
//             console.error("An error occurred")
//         } else {
//             const data = await response.json();

//             const conference = data.conferences[0];
//             const nameTag = document.querySelector(".card-title")
//             nameTag.innerHTML = conference.name

//             const detailUrl = `http://localhost:8000${conference.href}`
//             const detailResponse = await fetch(detailUrl)

//             if (detailResponse.ok) {
//                 const details = await detailResponse.json()
//                 const description = details.conference.description
//                 const descriptionTag = document.querySelector(".card-text")
//                 descriptionTag.innerHTML = details.conference.description
//                 const imageTag = document.querySelector(".card-img-top")
//                 imageTag.src = details.conference.location.picture_url
//             }
//         }
//     }
//     catch (error) {
//         // Figure out what to do if an error is raised
//         console.error("An error occurred", error)
//     }

// });
