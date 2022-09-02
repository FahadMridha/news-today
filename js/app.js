const loadAllCetagorys = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url)
    const data = await res.json();
    seatAllCetagorys(data.data.news_category)
}
const seatAllCetagorys = (categories) => {
    const setCategories = document.getElementById('all-category');
    for (const categorie of categories) {
        // console.log(categorie.category_name)
        const li = document.createElement("li");
        // li.classList.add('text-decoration-none')
        li.innerHTML = `<a >${categorie.category_name}</a>`;
        setCategories.appendChild(li);
    }
}
loadAllCetagorys()