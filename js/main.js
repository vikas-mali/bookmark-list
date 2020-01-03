// Listen form Submit 
document.getElementById('myForm').addEventListener('submit', saveBookmark);
// save bookmark
function saveBookmark(e) {
    //Get form value
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }


    if (localStorage.getItem('bookmarks') === null) {
        // Intio=al array
        var bookmarks = [];
        // add array
        bookmarks.push(bookmark);
        // set to bookmark
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from localstorage 
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array 
        bookmarks.push(bookmark);
        // REset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    //Clear form
    document.getElementById('myForm').reset();
    //Re-fetch bookmarks
    fetchBookmarks();

    // Prevent form submitteng
    e.preventDefault();
}
// Delete Bookmark
function deleteBookmark(url) {
    // Get bookarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }
    // Reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}


// Fetch Bookmark
function fetchBookmarks() {
    // Get bookmarks from localstorage 
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output ID
    var bookmarksResult = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResult.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResult.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default"target = "_blank"href = "' + url + '"> visit </a> ' +
            ' <a  onclick="deleteBookmark(\'' + url + '\')" class="btn  btn-danger" href = "#"> Delete </a> '
        '</h3>' +
        '</div>';
    }
}


//  Validation form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("plese fill in the form");
        return false;
    }
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert('plese use valid URL');
        return false;
    }
    return true;
}