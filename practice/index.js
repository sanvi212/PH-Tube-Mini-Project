

const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('video_container').classList.add('hidden');
}
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('video_container').classList.remove('hidden');
}






function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");

    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }

}

// {
//     "category_id": "1001",
//     "category": "Music"
// }

// load categorys function

function loadCategories() {
    //fetch link
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")

        //promise ke json e convert korsi
        .then((res) => res.json())
        // json ke displayCategories e pathaisi

        .then((data) => displayCategories(data.categories));
}

// load videos

function loadVideos(searchText = "") {

    showLoader();
    
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(response => response.json())
        .then((data) => {
            document.getElementById("btn-all").classList.add('active');
            displayVideos(data.videos)
        })
}


// category music,comedy others
//  //1001

const loadCategoryVideos = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    // console.log(url)

    fetch(url)
        .then((res) => res.json())
        .then((data) => {

            removeActiveClass();
            // no active class

            const clickedButton = document.getElementById(`btn-${id}`);

            clickedButton.classList.add("active")
            console.log(clickedButton);
            displayVideos(data.category)
        });
};



// display navbar
function displayCategories(categories) {
    // get the container
    const categoryContainer = document.getElementById('category-container');

    // loop operation
    for (let cat of categories) {
        // create element
        const categoryDiv = document.createElement('div');
        // create button
        categoryDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
        `
        // catagory container er modde append korsi
        categoryContainer.append(categoryDiv);
    }
}


// {
//     "category_id": "1003",
//     "video_id": "aaak",
//     "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//     "title": "Beyond The Pale",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//             "profile_name": "Jim Gaffigan",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "2.6K",
//         "posted_date": "15400"
//     },
//     "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }




// display video

const displayVideos = (videos) => {

    const videoContainer = document.getElementById('video_container');

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `<div class="col-span-full py-20 justify-center items-center flex flex-col text-center">
            <img class="w-[120px]" src="../assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold mt-4">Oops!! Sorry, There is no <br> content here</h2>
        </div>`;
        hideLoader();
        return;
    }

    videos.forEach(video => {
        //create element
        console.log(video)
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `

        <div class="card bg-base-100">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-xs bg-black text-white px-2 rounded">3hrs 56 min ago</span>
            </figure>

            <div class="px-0 flex gap-3 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                        <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>

              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="text-sm text-gray-400 flex gap-2">${video.authors[0].profile_name}

                    <!-- verified batch -->
               ${video.authors[0].verified == true ? ` <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">`: ``}

                </p>
                <!-- views -->
                <p class="text-sm text-gray-400">${video.others.views}</p>
                
              </div>
            </div>

            <button onclick="loadVideoDetaitles('${video.video_id}')" class="btn btn-block">Show Details</button>
          </div>

        
        `;
        videoContainer.append(videoCard)
    });
    hideLoader();
}



// video dettiles
const loadVideoDetaitles = (videoId) => {
    console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayVideoDetails(data.video))

};

const displayVideoDetails = (video) => {
    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details_container");

    detailsContainer.innerHTML = `




    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img class= "object-cover w-full h-[150px]"
      src="${video.thumbnail}" />
  </figure>

  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions flex gap-2 flex-row ring-primary w-10 rounded-full">
    <img class="" src="${video.authors[0].profile_picture}">
    <p>${video.authors[0].profile_name}</p>
    </div>
  </div>
</div>

    `;
}


document.getElementById('search-input').addEventListener('keyup', (e) => {

    const input = e.target.value
    loadVideos(input);

    }
    
    

);



loadCategories()
