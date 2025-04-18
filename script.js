
const url = "http://universities.hipolabs.com/search?country=";

// const url = API_BASE_URL;


document.getElementById("generateBtn").addEventListener("click", async () => {
  const countryInput = document.getElementById("topicInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");
  const loadingDiv = document.getElementById("loading");

  // Reset previous output
  resultsDiv.innerHTML = "";
  resultsDiv.style.display = "none";

  if (!countryInput) {
    alert("Please enter a country name.");
    return;
  }

  // Show loading
  loadingDiv.style.display = "block";

  try {
    const response = await axios.get(url + countryInput);
    const colleges = response.data;

    // Capitalize country name for display
    const displayCountry = countryInput.charAt(0).toUpperCase() + countryInput.slice(1);

    if (colleges.length === 0) {
      resultsDiv.innerHTML = `<p class="text-muted text-center">No colleges found for "${displayCountry}".</p>`;
    } else {
      const listItems = colleges
        .map(
          (college) => `
            <li class="list-group-item">
              <strong>${college.name}</strong><br/>
              <small>${college.country}</small><br/>
              <a href="${college.web_pages[0]}" target="_blank">${college.web_pages[0]}</a>
            </li>`
        )
        .join("");

      resultsDiv.innerHTML = `
        <h5 class="mb-3">Colleges in ${displayCountry}</h5>
        <ul class="list-group">${listItems}</ul>`;
    }

    resultsDiv.style.display = "block";
  } catch (error) {
    console.error("Error fetching colleges:", error);
    resultsDiv.innerHTML = `<p class="text-danger text-center">Something went wrong. Please try again.</p>`;
    resultsDiv.style.display = "block";
  } finally {
    loadingDiv.style.display = "none";
  }
});



// let url = "http://universities.hipolabs.com/search?name=";

// let btn = document.querySelector("button");
// let contry;
// btn.addEventListener("click", async () => {
//   contry = document.querySelector("input").value;

//   let colgArr = await getColleges(contry);
//   show(colgArr);
// });

// function show(colgArr) {
//   let list = document.querySelector("#list");
//   list.innerText = "";
//   for (col of colgArr) {
//     console.log(col.name);

//     let li = document.createElement("li");
//     li.innerText = col.name;
//     list.appendChild(li);
//   }
// }

// // let contry = "india";
// async function getColleges() {
//   try {
//     let res = await axios.get(url + contry);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// }
