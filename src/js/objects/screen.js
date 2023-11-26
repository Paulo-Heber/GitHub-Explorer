const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="foto de perfil do usuário">
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😿'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😿'}</p>
                                            <p>👥 Seguidores : ${user.followers}</p>
                                            <p>👥 Seguindo : ${user.following}</p>
                                        </div>
                                    </div>`



        let eventsItens = ''
        user.events.forEach(event => {
            let eventType = event.type
            let eventMessage = ''

            event.payload.commits
                ? eventMessage = event.payload.commits[0].message
                : eventMessage = 'Não possui comentário'



            if (eventType === "CreateEvent" || eventType === "PushEvent")
                eventsItens += `<li>${event.repo.name} <span>-${eventMessage}</span></li>`

        })


        if (user.events.length > 0 && eventsItens != '') {
            this.userProfile.innerHTML += `<div class="events section">
                                               <h2>Eventos</h2>
                                               <ul>${eventsItens}</ul>
                                            </div>`
        } else {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <h3>O usuário não possou eventos do tipo CreateEvent e nem PushEvent em seus 10 últimos repositórios</h3>
                                             </div>`}

        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repositoriesItens +=
                            `<li>
                                <a href="${repo.html_url}" target="_blank">${repo.name}
                                    <div>
                                        <p class=about ><i class="fas fa-star"></i> ${repo.forks_count}</p>
                                        <p class=about ><i class="fas fa-code-branch"></i> ${repo.stargazers_count}</p>
                                        <p class=about ><i class="fas fa-eye"></i> ${repo.watchers_count}</p>
                                        <p class=about ><i class="fas fa-language"></i> ${repo.language}</p>
                                    </div>
                                </a>
                                
                            </li>` })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                               <h2>Repositórios</h2>
                                               <ul>${repositoriesItens}</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }