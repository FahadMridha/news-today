const loadAllCetagorys = async (news_id) => {
    const url = `  https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json();
    seatAllCetagorys(data.data.news_category)
}
const seatAllCetagorys = (categories) => {
    const setCategories = document.getElementById('all-category');
    for (const categorie of categories) {
        // console.log(categorie.category_id)
        const li = document.createElement("li");
        // li.classList.add('text-decoration-none')
        li.innerHTML = `<a onclick="showAllNewsData('${categorie.category_id}')">${categorie.category_name}</a>`;
        setCategories.appendChild(li);

    }
}
const showAllNewsData = (category_id) => {
    // console.log(category_id)
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showAllNews(data.data))
}
const showAllNews = data => {
    // console.log(data)
    const resultFound = document.getElementById('result-found');
    resultFound.innerHTML = `<p class="text-center fs-3 fst-italic text-info">Totat News Found:${data.length}</p>`
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ' ',
        data.forEach(news => {
            // console.log(news)
            const {
                details,
                _id,
                thumbnail_url,
                author,
                title,
                total_view,
                image_url
            } = news;
            // console.log(_id)
            const div = document.createElement('div')
            div.innerHTML = `<div class="row g-0">
    <div class="col-md-4">
        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.length>500?details.slice(0,400)+ '..'+'See more...':details}</p>
            <div class="d-flex justify-content-center ">
            <div>
            <div>
            <img style="height:10%;width:10%;" class="rounded-circle" src="${author.img?author.img:'No image Found'}">
            </div>
            <p>${author.name?author.name:'no data found'}</p>
            <p>${author.published_date?author.published_date:'no data found'}</p>
            </div>
            <div>
             <h6>View:${total_view}</h6>
            </div>
           <div>
            <button onclick="loadModalDetalis('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authorDetalisModal">
            Detalis
             </button>
             </div>
             </div>
        </div>
    </div>
</div>
    `;
            newsContainer.appendChild(div)
        });

}
const loadModalDetalis = news_id => {
    // console.log(news_id)
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data[0]))
}
const displayNews = (data) => {
    console.log(data);
    const {
        details,
        thumbnail_url,
        author,
        title,
        total_view,
        image_url
    } = data;
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = ' ';
    const div = document.createElement('div')
    div.innerHTML = `
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <h5 class="modal-title" id="authorDetalisModalLabel">${title}</h5>
                    <div>
                    <img src="${image_url}" class="img-fluid rounded-start" alt="..."></div>
                    <p class="card-text">${details.length>300?details.slice(0,300)+ '..'+'...':details}</p>
                    <div class="d-flex justify-content-center ">
            <div>
            <div>
            <img style="height:10%;width:10%;" class="rounded-circle" src="${author.img?author.img:'No image Found'}">
            </div>
            <p>${author.name?author.name:'no data found'}</p>
            <p>${author.published_date?author.published_date:'no data found'}</p>
            </div>
            <div>
             <h6>View:${total_view}</h6>
            </div>

                    
    
    `
    modalBody.appendChild(div)
}
showAllNewsData()
loadAllCetagorys()
// const loadAllNews = (newsId) => {
//     const url = ` https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
//     fetch(url)