// variables
const courses = document.querySelector('#courses-list')
const cartContent = document.querySelector('#cart-content tbody'),
      clearCart = document.querySelector('#clear-cart')

// eventListeners
eventListeners()

function eventListeners(e) {
    // acsses to the buy button
    courses.addEventListener('click', buyCourse)
    // remove course
    cartContent.addEventListener('click', removeCourse)
    // remove All courses from cart
    clearCart.addEventListener('click', clearCartComplete)

    // show courses from storage when loaded page
    document.addEventListener('DOMContentLoaded', showCoursesOnload)
       
}

// functions
function buyCourse(e) {
    // add the course to the cart
    e.preventDefault()
    // use Delegation for access to the course that select
    if (e.target.classList.contains('add-to-cart')) {
        // access to the card div with parent element
        const course = (e.target.parentElement.parentElement);
        // read values
        getCourseInfo(course)
        
    }
}

// get course Info that selected by user
function getCourseInfo(course) {   

    // get corse info after user click in buy button
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('span').textContent,
        id: course.querySelectorAll('a')[1].getAttribute('data-id')
    }
    
    // adding course to cart with function
    addToCart(courseInfo)
}

// adding course to cart
function addToCart(cInfo) {
    // create <tr> tag
    let row = document.createElement('tr')

    // build HTML template
    row.innerHTML = `   
        <tr>
            <td>
                <img src="${cInfo.image}" width="80px">           
            </td>  
            <td>${cInfo.title}</td>    
            <td>${cInfo.price}</td> 
            <td></td> 
            <td>
                <a href="#" class="remove">x</a>
            </td>
        </tr>   
    `
    // adding info cart to the cart
    cartContent.appendChild(row)

    // ADDING INFO CART TO THE LOCAL STORAGE
    saveToLs(cInfo)
}

// push course to the local Storage
function saveToLs(course) {
    let courses= getFromStorage()

    courses.push(course)

    localStorage.setItem('courses', JSON.stringify(courses))
}

// check local Storage exist value or no
function getFromStorage() {
    let courses;

    if (localStorage.getItem('courses')) {
        courses = JSON.parse(localStorage.getItem('courses'))
    }else{
        courses = []
    }

    return courses
}

// remove course from cart
function removeCourse(e){
    if (e.target.classList.contains('remove')) {
         e.target.parentElement.parentElement.remove()
    }
}

// clear all courses from cart 
function clearCartComplete(e){
    
    // cartContent.innerHTML = ''

    while (cartContent.firstChild) {
        cartContent.firstChild.remove()       
    }

    clearLS()
}

// clear all courses from local Storage
function clearLS() {
    localStorage.clear()
}

// show courses from storage when loaded page
function showCoursesOnload() {
    let courses = getFromStorage()

    courses.forEach(function(cInfo) {
        // create <tr> tag
    let row = document.createElement('tr')

    // build HTML template
    row.innerHTML = `   
        <tr>
            <td>
                <img src="${cInfo.image}" width="80px">           
            </td>  
            <td>${cInfo.title}</td>    
            <td>${cInfo.price}</td> 
            <td></td> 
            <td>
                <a href="#" class="remove">x</a>
            </td>
        </tr>   
    `
    // adding info cart to the cart
    cartContent.appendChild(row)
    });
}

