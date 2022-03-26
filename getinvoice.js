function setAd( url, pmthash ) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && ( this.status == 200 || this.status == 201 || this.status == 204 ) ) {
      console.log( this.responseText );
    }
  };
  var json = {
    "url": url,
    "amount": 1000,
    "payment_hash": pmthash
  }
  xhttp.open( "POST", "https://ad-backend.superquest.repl.co/ads", true );
  xhttp.setRequestHeader( "Content-Type", "application/json" );
  xhttp.send( JSON.stringify( json ) );
}
document.getElementById( "submitter" ).addEventListener( "click", function() {
  setAd( document.getElementById( 'ad_url' ).value, document.getElementById( 'pmthash' ).innerText );
});
function getInvoice() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && ( this.status == 200 || this.status == 201 )) {
      document.getElementById( "invoice" ).innerHTML = "";
      document.getElementById( "invoice" ).append( createQR( JSON.parse( this.responseText )[ "payment_request" ].toUpperCase() ) );
      document.getElementById( "pmthash" ).innerText = JSON.parse( this.responseText )[ "payment_hash" ];
    }
  };
  var json = {
    "out": false,
    "amount": 1000, 
    "memo": "test"
  }
  xhttp.open( "POST", "https://legend.lnbits.com/api/v1/payments", true );
  xhttp.setRequestHeader( "X-Api-Key", "e7462365c4794d98bfe8dc60cf26e865" );
  xhttp.setRequestHeader( "Content-type", "application/json" );
  xhttp.send( JSON.stringify( json ) );
}
function createQR( content ) {
        var dataUriPngImage = document.createElement( "img" ),
        s = QRCode.generatePNG( content, {
                ecclevel: "M",
                format: "html",
                fillcolor: "#FFFFFF",
                textcolor: "#373737",
                margin: 4,
                modulesize: 8,
        });
        dataUriPngImage.src = s;
        dataUriPngImage.id = "qr_code";
        dataUriPngImage.style.display = "block";
        dataUriPngImage.style.margin = "auto";
        dataUriPngImage.style.maxWidth = "300px";
        return dataUriPngImage;
}
getInvoice();
