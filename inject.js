function init() {
    setTimeout( function() {
          var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && ( this.status == 200 || this.status == 201 || this.status == 204 ) ) {
              const docs = document.querySelectorAll("article")
              const d = docs[0]
              const img = new Image()
              img.src = JSON.parse( this.responseText )[ 0 ][ "url" ]
              d.parentElement.appendChild(img)
            }
          };
          xhttp.open( "GET", "https://ad-backend.superquest.repl.co/ads", true );
          xhttp.send();
    }, 3000 )
}

init()
