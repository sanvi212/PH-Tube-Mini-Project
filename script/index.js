function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.data);
    });
}

function displayCategories (categories) {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";
  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    categoryContainer.append(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `
      <div class="col-span-full flex text-center flex-col justify-center items-center py-20">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
      </div>
    `;
    return;
  }

  videos.forEach((video) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
      <div class="card bg-base-100">
        <figure class="relative">
          <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
          <span class="absolute bottom-2 right-2 text-white bg-black text-xs px-2 rounded">3hrs 56 min ago</span>
        </figure>
        <div class="py-5 flex gap-3 px-0">
          <div class="profile">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div class="intro">
            <h2 class="text-sm font-semibold">${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-1 items-center">
              ${video.authors[0].profile_name}
              ${video.authors[0].verified ? '<img class="w-4 h-4" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="verified">' : ''}
            </p>
            <p class="text-sm text-gray-400">${video.others.views}</p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
      </div>
    `;
    videoContainer.append(videoCard);
  });
};

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.data);
    });
};

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayVideoDetails(data.data);
    });
};

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details_container");

  const thumbnail = video.thumbnail || "https://via.placeholder.com/300x200?text=No+Thumbnail";
  const title = video.title || "No Title Available";
  const description = video.description || "No Description Available";

  detailsContainer.innerHTML = `
    <div class="card bg-base-100 shadow-xl image-full">
      <figure>
        <img class="w-full h-[200px] object-cover" src="${thumbnail}" alt="${title}" />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-white">${title}</h2>
        <p class="text-white">${description}</p>
      </div>
    </div>
  `;
};

loadCategories();
