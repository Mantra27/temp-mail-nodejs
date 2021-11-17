const title = "Temp mail ervice".split("");
console.log(title);
let count = 0;
setTimeout(() => {
  document.getElementById("text").innerText = "";
  function loop() {
    if (count >= title.length) {
      setTimeout(() => {
        document.getElementById("text").innerText = "Temp Email Service 😄";
      }, 100);
      console.log("encountered", count);
      return 0;
    } else {
      if (count == 5) {
        document.getElementById("text").innerText = "Temp E";
      }
      if (count == 10) {
        document.getElementById("text").innerText = "Temp Email S";
      }
      setTimeout(() => {
        console.log(title[count], count);
        document.getElementById("text").innerText += title[count];
        count++;
        loop();
      }, 100);
    }
  }
  loop();
}, 10000);
let addi = 100;
document.getElementById("btn").addEventListener("click", () => {
  if (document.getElementById("btn").innerText != "GET RANDOM") {
    return 0;
  }
  document.getElementById("btn").innerText = "Getting an Email...";

  fetch("https://temp-email-api.mantragohil.repl.co/v1/gen", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("mail").value = data.data;
      console.log("Success:", data);
      document.getElementById("info").innerText =
        "New Emails on this address will be displayed here.";
      document.getElementById("btn").innerText = "Mailbox(0 new mails);";
      return data.data.split("@");
    })
    .then((e) => {
      let count = undefined;
      let inbox = 1;
      setInterval(() => {
        fetch(`https://temp-email-api.mantragohil.repl.co/v1/mailbox`, {
          headers: {
            "Content-Type": "application/json",
          },

          method: "POST",

          body: JSON.stringify({
            username: e[0],
            domain: e[1],
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (count != data.mails.id) {
              count = data.mails.id;
              console.log("id reset");
              console.log(data.mails);

              let node = document.createElement("a");
              node.innerHTML = `<p>
                              <div class="dropdown">
                              <button class="dropbtn">Mail ${inbox}</button>
                              <div class="dropdown-content">
                                <a>From: ${data.mails.from}</a>
                                <a>Subject: ${data.mails.subject}</a>
                                <a>Body: ${data.mails.body}</a>
                                <a>Date: ${data.mails.date}</a>
                              </div>
                            </div>
                            </p>`;
              document.getElementById("container").appendChild(node);
              document.getElementById("btn").innerText = `Mailbox(${inbox} new mails)`
              document.getElementById("root").height += `${inbox}0%`
              inbox++;
            } else {
            }
          });
      }, 1000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

document.getElementById("copy").addEventListener("click", () => {
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
  copyToClipboard("#mail");
  document.getElementById("copy").value = "copied!";
  setTimeout(() => {
    document.getElementById("copy").value = "copy";
  }, 10000);
});
