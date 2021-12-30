// `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "9634f845cc7fa46385466e20099bd95c";

form.addEventListener("submit", e =>{
    e.preventDefault();
    const location = input.value;
    const lang = "en";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=${lang}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const {name, main, weather,sys} = data;
            console.log(data);
            if(data.cod == "404"){
                console.log("error");
                document.getElementById("error").style.opacity = "100%";
            }
            else{
                document.getElementById("loader").style.opacity = "0%";
                document.getElementById("error").style.opacity = "0%";
                document.getElementById("container").style.opacity = "100%";
                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                const d = new Date();
                d.getTime();
                const h = d.getHours();
                const m = d.getMinutes();
                const s = d.getSeconds();
                let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                var day = days[d.getDay()];
                input.value = "";
        
                document.getElementById("city").innerText = name;
                document.getElementById("country").innerText = sys.country;
                document.getElementById("temp").innerText = Math.round(main.temp)+"°";
                document.getElementById("feelsLike").innerText = "Feels Like "+Math.round(main.feels_like)+"°";
                document.getElementById("image").src = icon;
                document.getElementById("day").innerText = `${day}, ${h}:${m}:${s}`;
                document.getElementById("description").innerHTML = weather[0].description;
                }
            })    
    })