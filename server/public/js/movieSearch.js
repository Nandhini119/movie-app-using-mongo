/*this method is called when search button is clicked in movie.html*/
function fnaction() {
    localStorage.setItem("email", "");
    localStorage.setItem("email", document.getElementById('email').value);
}

function getMovies() {

    let moviename = document.getElementById('moviename').value;
    if (moviename.length == 0) {
        alert("please enter movie name");
    } else {
        /*to call the route*/
        $.ajax({
            url: '/movie/search',
            type: 'GET',
            data: {
                moviename: moviename
            },
            success: function(movieobj) {
                var obj = JSON.parse(movieobj);
                if (obj.total_results == 0) {
                    alert("Movie doesnt exists,please enter valid movie");
                } else {
                    /*to append the movie list to html page*/
                    var filmHTML = '';
                    var filmHTML = "<tr><td><center>Title</center></td><td><center>Poster</center></td><td><center>Release_Date</center></td><td><center>AddMovie</center></td></tr>";
                    var posterpath;
                    var a;
                    if (obj.total_results < 20) {
                        a = obj.total_results;
                    } else {
                        a = 20;
                    }
                    for (var count = 0; count < a; count++) {
                        if (obj.results[count].poster_path == null) {
                            posterpath = "https://smoothtouchcosmetics.com/wp-content/uploads/2016/08/No-Image-Available.jpg";
                        } else {
                            posterpath = "http://image.tmdb.org/t/p/w185/" + obj.results[count].poster_path;
                        }
                        var movobj = {
                            title: obj.results[count].title,
                            poster: posterpath,
                            release_date: obj.results[count].release_date
                        };
                        var obj1 = JSON.stringify(movobj);
                        filmHTML += "<tr><td><center>" + movobj.title + "</center></td>";
                        filmHTML += '<td><center><img width="200" height="200" src=' + movobj.poster + '></center></td>';
                        filmHTML += '<td><center>' + movobj.release_date + '</center></td>';
                        filmHTML += "<td><center><button  class='btn btn-danger' onclick='addfavourite(event)' value='" + obj1 + "'>Add to Favourite</button></center></td></tr>";
                    }
                    $("#listmovies tbody").html(filmHTML);
                }
            },

            error: function(err) {
                alert("error" + err);
            }
        });
    }

}

/*this function is called when add to fav button is clicked*/
function addfavourite(event) {
    $.ajax({
        url: '/movie/add',
        type: 'POST',
        {
            field1: event.target.value,
            email: localStorage.getItem("email")
        }

    });
}

/*called when show favourite button is clicked*/
function displayfav() {
    $.ajax({
        url: '/movie/view',
        type: 'GET',
        data: {
            email: localStorage.getItem("email")
        },
        success: function(data) {
            var disHTML = '';
            var disHTML = "<tr><td><center>Title</center></td><td><center>Poster</center></td><td><center>Release_Date</center></td><td><center>DeleteMovie</center></td></tr>";
            for (let i in data) {
                var del = data[i].title;
                disHTML += "<tr >";
                disHTML += '<td><center>' + data[i].title + '</center></td>';
                disHTML += '<td><center>' + '<img src=' + data[i].poster + '></center></td>';
                disHTML += '<td><center>' + data[i].release_date + '</center></td>';
                disHTML += "<td><center><button class='btn btn-danger'onclick='delfav(event)' value='" + del + "'>delete</button></center></td>";
                disHTML += '</tr>';
            }
            $("#listmovies tbody").html(disHTML);
        },

        error: function(err) {
            exit
        }
    });
}

/*called when delete button is clicked*/
function delfav(event) {
    $.ajax({
        url: '/movie/delete',
        type: 'GET',
        data: {
            title: event.target.value,
            email: localStorage.getItem("email")
        },

        success: function(data) {
            alert("You have deleted a Movie from favourite");
            displayfav();
        }
    });
}