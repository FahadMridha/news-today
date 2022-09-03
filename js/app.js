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
    console.log(data)
    const resultFound = document.getElementById('result-found');
    resultFound.innerHTML = `<p class="text-center fs-3 fst-italic text-info">Totat News Found:${data.length}</p>`
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = ' ',
        data.forEach(news => {
            // console.log(news)
            const {
                details,
                thumbnail_url,
                author,
                title,
                total_view,
                image_url
            } = news;
            const div = document.createElement('div')
            div.innerHTML = `<div class="row g-0">
    <div class="col-md-4">
        <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.length>500?details.slice(0,400)+ '..'+'See more...':details}</p>
            <div class="card-footer text-muted">
            <img class="rounded-circle w-25 h-25 " src="${author.img?author.img:'No image Found'}">
            <p>${author.name?author.name:'no data found'} Total-View: ${total_view}</p>
            
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#authorDetalisModal">
           Detalis
            </button>
             </div>
        </div>
    </div>
</div>
    
    `;
            newsContainer.appendChild(div)
        });

}
showAllNewsData()
loadAllCetagorys()
// const loadAllNews = (newsId) => {
//     const url = ` https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayNews(data.data[0]))
// }
// const displayNews = (data) => {
//     // console.log(data);
//     const {
//         details,
//         thumbnail_url,
//         author,
//         title,
//         total_view
//     } = data;
// }