// Code your solution here
// by default, have the first shoe rendered in the main container (see deliverable 2).
// * When a user clicks on one of the shoes in the sidebar, they should be able to see more details about the shoe, the reviews associated with it and a form in the main container. There should only be one shoe in the main container at one time.

const shoeImage = document.querySelector("#shoe-image")
const shoeName = document.querySelector("#shoe-name")
const shoeDes = document.querySelector("#shoe-description")
const shoePrice = document.querySelector("#shoe-price")
const shoeReviewUL = document.querySelector("#reviews-list")
const mainShoe = document.querySelector('#main-shoe')
const formDiv = document.querySelector('#form-container')

const sideBarUl = document.querySelector("#shoe-list")
const shoesURL = "http://localhost:3000/shoes"

function fetchMainShoe(){
    fetch(`${shoesURL}/${1}`)
    .then(resp => resp.json())
    .then(shoe => {
        // console.log(firstShoe)
        shoeImage.src = shoe.image
        shoeName.innerText = shoe.name
        shoeDes.innerText = shoe.description
        shoePrice.innerText = `$${shoe.price}`
        const shoeReviews = shoe.reviews.forEach((review) => {
            const reviewLi = document.createElement('li')
            reviewLi.innerText = review.content
            shoeReviewUL.append(reviewLi)
        })
    })
}


function fetchShoes(){
    fetch(shoesURL)
    .then(resp => resp.json())
    .then(shoesData => {
        shoesData.forEach((shoe) => {
            // console.log(shoe)
            displayShoeSideBar(shoe)
        })
    })
}
fetchMainShoe()
fetchShoes()

function displayMainCon(shoe){
    displayReviewForm(shoe)
    shoeImage.src = shoe.image
    shoeName.innerText = shoe.name
    shoeDes.innerText = shoe.description
    shoePrice.innerText = `$${shoe.price}`
    const shoeReviews = eachReview(shoe)
}

function eachReview(shoe){
    shoe.reviews.forEach((review) => {
        const reviewLi = document.createElement('li')
            reviewLi.innerText = review.content
            shoeReviewUL.append(reviewLi)
        })
}

function displayReviewForm(shoe){
    const form = document.createElement('form')
        form.id = "new-review"
    const div = document.createElement('div')
        div.className = "form-group"
    form.append(div)
        const textarea = document.createElement('textarea')
            textarea.className = "form-control"
            textarea.id = "review-content"
            textarea.rows = "3"
            textarea.name = ""
        const input = document.createElement('input')
            input.type = "submit"
            input.className = "btn btn-primary"
        div.append(textarea, input)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            // console.dir(e.target)
            fetch(`${shoesURL}/${shoe.id}`, {
                method: "PATCH",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    "reviews" : {
                        "content" : "hello" //how to get this value?
                    }
                })
            })
            .then(resp => resp.json())
            .then(review => {
                const newReviewLi = document.createElement('li')
                    newReviewLi.innerText = review.content
                shoeReviewUL.append(newReviewLi)
            })
        })
        formDiv.append(form)
}

function displayShoeSideBar(shoe){
    const shoeLi = document.createElement('li')
        shoeLi.className = "list-group-item"
        shoeLi.innerText = shoe.name
        shoeLi.addEventListener('click', (e) => {
            displayMainCon(shoe)
        })
    sideBarUl.append(shoeLi)
    // console.log(shoe.name)
}

// debugger