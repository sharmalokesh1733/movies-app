let result = document.getElementById('main');

async function searchDB(searchText) {
    let items = document.getElementsByClassName('card');
    for (const item of items) {
        item.style.display = 'none';
    }

    if (searchText === '') {
        return;
    }

    const res = await fetch(`http://localhost:4000/search?q=${searchText}`);

    const data = await res.json();

    // console.log(data);

    for (const ele of data) {

        console.log(ele);

        let newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'main-div');

        let head = document.createElement('h4');
        head.innerText = ele.name;
        head.style.textAlign = 'center';
        newDiv.appendChild(head);

        let date = document.createElement('p');
        date.innerHTML = `Year : ${ele.date}`;
        newDiv.appendChild(date);

        let rating = document.createElement('p');
        rating.innerHTML = `Rating : ${ele.rating}`;
        newDiv.appendChild(rating);

        let watched = document.createElement('p');
        watched.innerHTML = `Watched : ${ele.isValid===true ? 'Yes' : 'No'}`;
        newDiv.appendChild(watched);


        newDiv.classList = 'card';
        newDiv.style.width = '300px';
        // newDiv.style.height = '150px';
        result.appendChild(newDiv);
    };

}


const searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', () => {
    let searchText = searchInput.value;
    // console.log(searchText);
    searchDB(searchText);
})