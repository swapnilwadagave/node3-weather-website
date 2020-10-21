console.log("Client side javascript file is loaded!");
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

message1.textContent = "Loading";
message2.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log("Location to Search", location);
  fetch("/weather?address=" + location)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
          console.log(data.error);
        } else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
          console.log(data);
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
