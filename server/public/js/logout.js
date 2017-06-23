function logout() {

    $.ajax({

        url: '/logout',

        type: 'GET',

        success: function(data) {

            window.location.replace('../index.html');

        }

    });

}