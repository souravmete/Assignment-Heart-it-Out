const words = ['Adventure', 'Mystery', 'Drama', 'Sci-Fi'];

function createAccordion() {
    const container = document.getElementById('accordionExample');

    words.forEach((word, index) => {
        const accordionId = `accordionItem${index}`;
        const collapseId = `collapse${index}`;

        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordionItem.innerHTML = `
            <h2 class="accordion-header" id="${accordionId}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="true" aria-controls="${collapseId}">
                    ${word}
                </button>
            </h2>
            <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${accordionId}" data-bs-parent="#accordionExample">
                <div class="accordion-body" id="accordion-container-${index}">
                    <!-- TV shows will be inserted here -->
                </div>
            </div>
        `;
        container.appendChild(accordionItem);

        fetch(`http://api.tvmaze.com/search/shows?q=${word}`)
            .then(response => response.json())
            .then(data => {
                const shows = data.slice(0, 3);
                const accordionContainer = document.getElementById(`accordion-container-${index}`);

                const prices = [4499, 8999, 12499];
                const buttonColors = ['#2B7397', '#32959D', '#9C7777'];
                const priceColors = ['#2B7397', '#32959D', '#9C7777'];
                const borderColors = ['#2B7397', '#32959D', '#9C7777'];

                shows.forEach((show, showIndex) => {
                    const cardContainer = document.createElement('div');
                    cardContainer.className = 'd-flex flex-column mb-3 justify-content-between align-items-center gap-2'; 

                    const showType = document.createElement('div');
                    showType.className = 'show-type mb-2';
                    showType.innerHTML = `<h5 class="card-title">${show.show.type}</h5>`;

                    const card = document.createElement('div');
                    card.className = 'card';
                    const price = prices[showIndex];
                    const buttonColor = buttonColors[showIndex];
                    const priceColor = priceColors[showIndex];
                    const borderColor = borderColors[showIndex];

                    card.style.border = `1px solid ${borderColor}`;
                    

                    card.innerHTML = `
                        <div>
                            <h5 class="card-title">${show.show.name}</h5>
                        </div>
                        <div class="d-flex justify-content-between flex-column h-100">
                            <p class="card-body">${show.show.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                            <div class="d-flex flex-column justify-content-center align-items-center w-100">
                                <p>Price: <s>${price}</s></p>
                                <p class="price_color" style="color:${priceColor}; font-weight:800;">${price}</p>
                            </div>
                            <button class="card-button" style="background-color:${buttonColor}; border:none; border-bottom-right-radius:6px; border-bottom-left-radius:6px; padding:10px 0px; width:100%;">
                                <a href="${show.show.url}" target="_blank" style="color:#fff;">Click</a>
                            </button>
                        </div>
                    `;

                    // Append the showType and card to cardContainer
                    cardContainer.appendChild(showType);
                    cardContainer.appendChild(card);

                    // Append the cardContainer to accordionContainer
                    accordionContainer.appendChild(cardContainer);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    });
}

document.addEventListener('DOMContentLoaded', createAccordion);
