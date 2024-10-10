document.getElementById('searchUserBtn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  if (username) {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(user => {
        const userProfile = `
          <h2>${user.name}</h2>
          <p><strong>Followers:</strong> ${user.followers}</p>
          <p><strong>Following:</strong> ${user.following}</p>
          <p><strong>Public Repos:</strong> ${user.public_repos}</p>
        `;
        document.getElementById('userProfile').innerHTML = userProfile;
      })
      .catch(error => console.error('Error:', error));
  } else {
    alert('Please enter a GitHub username');
  }
});

document.getElementById('searchRepoBtn').addEventListener('click', function() {
  const username = document.getElementById('username').value;
  const repoName = document.getElementById('repoName').value;
  if (username) {
    let url = `https://api.github.com/users/${username}/repos`;
    if (repoName) {
      url = `https://api.github.com/repos/${username}/${repoName}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const repoResultsDiv = document.getElementById('repoResults');
        repoResultsDiv.innerHTML = '';

        if (Array.isArray(data)) {
          data.forEach(repo => {
            const repoElement = document.createElement('div');
            repoElement.textContent = repo.name;
            repoElement.addEventListener('click', function() {
              fetch(`https://api.github.com/repos/${username}/${repo.name}`)
                .then(response => response.json())
                .then(repoDetail => {
                  const repoDetails = `
                    <h3>${repoDetail.name}</h3>
                    <p><strong>Description:</strong> ${repoDetail.description}</p>
                    <p><strong>Stars:</strong> ${repoDetail.stargazers_count}</p>
                    <p><strong>Forks:</strong> ${repoDetail.forks_count}</p>
                    <p><strong>Language:</strong> ${repoDetail.language}</p>
                  `;
                  document.getElementById('repoDetails').innerHTML = repoDetails;
                })
                .catch(error => console.error('Error:', error));
            });
            repoResultsDiv.appendChild(repoElement);
          });
        } else {
          const repoDetail = `
            <h3>${data.name}</h3>
            <p><strong>Description:</strong> ${data.description}</p>
            <p><strong>Stars:</strong> ${data.stargazers_count}</p>
            <p><strong>Forks:</strong> ${data.forks_count}</p>
            <p><strong>Language:</strong> ${data.language}</p>
          `;
          document.getElementById('repoDetails').innerHTML = repoDetail;
        }
      })
      .catch(error => console.error('Error:', error));
  } else {
    alert('Please enter a GitHub username');
  }
});

document.getElementById('searchBox').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent form submission if needed
    // Custom search function or behavior
    console.log('Search triggered for:', event.target.value);
  }
});