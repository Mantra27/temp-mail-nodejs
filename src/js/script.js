
const title = 'Temp mail ervice'.split('');
console.log(title);
let count =0;
setTimeout(()=>{
  
        document.getElementById('text').innerText = ''
    
    function loop(){
        if(count>=title.length){
            console.log('encountered', count)
            document.getElementById('text').innerText = 'Temp Email Service 😄'
            return 0;
        }
        else{
            if(count == 5){ 
                document.getElementById('text').innerText = 'Temp E'
            }
            if(count == 10){
                document.getElementById('text').innerText = 'Temp Email S'
            }
            setTimeout(()=>{
                console.log(title[count], count);
                document.getElementById('text').innerText += title[count];
                count++;
                loop();
            },100)
        }
    }
    loop();
}, 10000)
let addi = 100;
document.getElementById('btn').addEventListener('click', ()=>{
//     let node = document.createElement("a");
//   node.innerHTML = `<p>
//   <div class="dropdown">
//   <button class="dropbtn">Dropdown</button>
//   <div class="dropdown-content">
//     <a>From: mantra</a>
//     <a>Subject: </a>
//     <a>Body: </a>
//   </div>
// </div>
// </p>`

//   console.log('sccs')
//    document.getElementById('root').style.height  = `${addi}vh`
//    addi = addi + 9;
//   document.getElementById("container").appendChild(node);


fetch('https://temp-email-api.mantragohil.repl.co/v1/gen', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
})
  .then(response => response.json())
  .then(data => {
      document.getElementById('mail').value = data.data;
    console.log('Success:', data);  
    document.getElementById('info').innerText = 'Listening this current email address.'
  })
  .catch((error) => {
    console.error('Error:', error);
  });

})

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  
  document.addEventListener('click', ()=>{
    var copyText = document.getElementById("mail");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
    function copyToClipboard(element) {
        var $temp = $("mail");
        $("body").append($temp);
        $temp.val($(element).text()).select();
        document.execCommand("copy");
        $temp.remove();
      }
      copyToClipboard('#mail')
      
  })
