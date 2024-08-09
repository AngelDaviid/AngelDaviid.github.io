function getCharacters(done){
    const results = fetch("https://rickandmortyapi.com/api/character/");

    results
        .then(response => response.json())
        .then(data => {
            done(data);
        });
}

getCharacters(data => {
    data.results.forEach(personaje => {
        const article = document.createRange().createContextualFragment(`
            <article data-id="${personaje.id}">
                <div class="image-container">
                    <img src="${personaje.image}" alt="${personaje.name}">
                </div>
                <div class="content-container">
                    <h2>${personaje.name}</h2>
                    <div class="status">
                        <span><strong>Status:</strong> ${personaje.status}</span>
                        <span class="status-indicator ${personaje.status === 'Alive' ? 'alive' : personaje.status === 'unknown' ? 'unknown' : ''}"></span>
                    </div>
                    <span><strong>Species:</strong> ${personaje.species}</span>
                    <span><strong>Last known location:</strong> ${personaje.location.name}</span>
                    <span><strong>First seen in:</strong> ${personaje.origin.name}</span>
                </div>
            </article>
        `);

        article.querySelector('article').addEventListener('click' ,function() {
            const characterId = this.getAttribute('data-id');
            window.location.href = `character.html?id=${characterId}`;
        });

        const main = document.querySelector("main");
        main.append(article);
    })
})