// Searching for users and their repos from GitHub API

document.addEventListener('DOMContentLoaded', () => {
    // Listen to the user's input
    const form = document.querySelector('#github-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = grabInput(event);
        form.reset();

        searchUser(searchInput)

    })
})

// Get the input of user from the form
function grabInput(event){
    return event.target['search'].value
}

// Search user
function searchUser(userName){
    fetch(`https://api.github.com/search/users?q=${userName}`, {
        method: 'GET',
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then( (response) => response.json())
    .then( (result) => {
        //grab the form for user list
        const ul = document.querySelector('#user-list')
        //console.log(result)

        // show the list of all users
        for (user of result.items){
            //console.log(user)
            // create a list for every user
            const li = document.createElement('li');
            li.textContent = `Username: ${user.login} - ${user.url}`;
            // Show the user info on the screen
            //console.log(li)
            ul.appendChild(li);
        }
    })
}

// For the next part, target repos_url