const form = document.getElementById('form')
form.addEventListener('submit', formSubmit)

function formSubmit(e) {
    let siteName = document.getElementById('siteName').value
    let siteUrl = document.getElementById('siteUrl').value

    if (!formValidate(siteName, siteUrl)) {
        return false
    }
    
    const bookmark = {
        name: siteName,
        url: siteUrl
    }

    let bookmarks = []
    if (localStorage.getItem('bookmarks') === null) {
        bookmarks = []
    } else {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    }
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    
    e.preventDefault()

    fetchBookmark()

    form.reset()
}

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            bookmarks.splice(i, 1)
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    fetchBookmark()
}

function fetchBookmark() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    let bookmarkList = document.getElementById('bookmarkList')
    bookmarkList.innerHTML = ''
    for (let i = 0; i < bookmarks.length; i++) {
        let { name, url } = bookmarks[i]
        bookmarkList.innerHTML += `
        <div class="jumbotron">
            <h3> ${name} </h3>
            <a href="${url}" target="_blank" class="btn btn-dark text-white"> Visit </a>
            <a href="#" onClick="deleteBookmark('${url}')" class="btn btn-danger text-white"> Delete </a>
        </div>
        `
    }
}

function formValidate(siteName, siteUrl) {
    if (!siteUrl || !siteName) {
        alert('Please add the details')
        return false
    }

    let expression = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    let regex = new RegExp(expression)

    if (!siteUrl.match(regex)) {
        alert('Please provide a valid url')
        return false;
    }
    return true
}