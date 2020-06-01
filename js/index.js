 //default https://api.github.com
 // Accept: application/vnd.github.v3+json
 //https://api.github.com/search/users?q=${user}
 //https://api.github.com/users/${user}/repos

const defaultURL = "https://api.github.com/"
const input = document.getElementById('search');
const form = document.getElementById('github-form'); 
const promise = fetch('http://example.com/movies.json');
const userList = document.getElementById('user-list');
const repolist = document.getElementById('repos-list');

form.addEventListener('submit', function(e){
  e.preventDefault();
  const promise1 = fetch(`https://api.github.com/search/users?q=${input.value}`);

  promise1.then(response => response.json())
  .then((data) =>{
    for(let index of data.items){
      userList.insertAdjacentHTML("beforeend", 
      `
      <li>
        <a href="${index.html_url}">
        ${index.login}
        <img src="${index.avatar_url} ">
        </a>
        <button onclick="repoInfo(this)" value="${index.login}">Repos</button>
      </li>
      `
      );
    }
  });
  promise1.catch(() => {
    userList.insertAdjacentHTML("beforeend", 
      `
      <li>
        There is No User With This Name, Try To Search Another Name :)
      </li>
      `
      );
})

});

function repoInfo(e){
  let li=e.parentElement;
  let topOffset=li.offsetTop - 110;
   const promise2 = fetch(`https://api.github.com/users/${e.value}/repos`);
   promise2.then(response => response.json())
  .then((data) =>{
    repolist.innerHTML='';
    for(let index of data){
      repolist.insertAdjacentHTML("beforeend", 
      `
      <li">
        ${index.full_name}
      </li>
      `
      );
      repolist.style.marginTop =`${topOffset}`;
    }
  }); 
}