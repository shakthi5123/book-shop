

const searchIcon = document.querySelector(".search");
const overLay = document.getElementById("searchOverlay");
const closeBtn = document.getElementById("closeSearch");
const navBar = document.querySelector(".navbar");

const cartIcon = document.querySelector(".cart");
const cartPanel = document.getElementById("cartPanel");
const closeCartBtn = document.getElementById("closeCart");

// api integration
const searchInput = document.querySelector('.search-input');
const resultsContainer = document.querySelector('.book-results');


searchIcon.addEventListener("click", () => {
    overLay.style.display = "flex";
    navBar.style.display = "none";

});

closeBtn.addEventListener("click", () => {
    overLay.style.display = "none";
    navBar.style.display = "flex";
})


cartIcon.addEventListener("click", () => {
    cartPanel.classList.add("open");
})

closeCartBtn.addEventListener("click", () => {
    cartPanel.classList.remove("open");
})

// api ka code 

searchInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        const query = searchInput.value.trim();
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(res => res.json())
        .then(data => {
            resultsContainer.innerHTML = "";

            //Filter
            if (!data.items || data.items.length === 0) {
                resultsContainer.innerHTML = "<p>No books found.</p>";
                return;
            }

            data.items.forEach(book => {
                const title = book.volumeInfo.title || "No title";
                const author = book.volumeInfo.authors ? book.volumeInfo.authors.join(", "): "Unknow author";
                const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "";
                const price = book.saleInfo?.retailPrice ? `${book.saleInfo.retailPrice.amount} ${book.saleInfo.retailPrice.currencyCode}` : "Not for Sale";

                const bookHTML = `
                <div class = "book">
                <img src="${thumbnail}" alt="${title}">
                <h3>${title}</h3>
                <p>Author: ${author}</p>
                <p>Price: ${price}</p>
                </div>
                `;
                resultsContainer.innerHTML += bookHTML;
                resultsContainer.scrollIntoView({ behavior: "smooth" });


            });
        });
        
    }
});