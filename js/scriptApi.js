


// Load Categories data
const loadData = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(err => console.log('Error Found',err));
}

// Load videos

const loadVideos = (searchtext='') =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(err => console.log('Error:',err))

}

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('active');
        displayVideos(data.category);
    })
    .catch(err => console.log('Error:',err))
}
// Removing active class as active backgorund
const removeActiveClass = () => {
    allBtn = document.getElementsByClassName('category-btn');
    for(let btn of allBtn){
        btn.classList.remove("active")
    }
}

// getting details using functions
const loadDetails = async(videoId) => {
 const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
 const res = await fetch(url);
 const data = await res.json();
 displayDetails(data.video);

}

// //"categories": [
//     {
//         "category_id": "1001",
//         "category": "Music"
//       },


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//       {
//         "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//         "profile_name": "Olivia Mitchell",
//         "verified": ""
//       }
//     ],
//     "others": {
//       "views": "100K",
//       "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//   },


// Display Category data
const displayCategories = (categories) => {
    categories.forEach(item => {
        const categoryDiv = document.getElementById('categories');
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
         ${item.category}
        </button>
        `;
        categoryDiv.appendChild(buttonContainer)
    });
}

// display videos

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    if(videos.length == 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center">
            <img src="assets/Icon.png"/>
            <h1 class="py-7 font-bold text-2xl">NO VIDEOS POSTED YET</h1>
        </div>
        `;
        return;
    }else{
        videoContainer.classList.add('grid')
    }
    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black text-white">${getTimeString(video.others.posted_date)}</span>` }
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full" src=${video.authors[0].profile_picture} />
            </div>
            <div>
                <h1 class="font-bold">${video.title}</h1>
                <div class="flex gap-2 justify-start items-center">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                    ${
                        video.authors[0].verified == true
                          ? `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`
                          : ""
                      }
                </div>
                
                <p><button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error hover:text-white">Details</button></p>
            </div>
        </div>
        `;
        videoContainer.append(card);
    })
}

// display Details

const displayDetails = (video) => {
 const descriptionContainer = document.getElementById('modaldetailContainer');
    descriptionContainer.innerHTML = `
    <img class="w-full h-full rounded-lg object-cover" src=${video.thumbnail}>

    <h1 class="py-1 font-bold text-lg">${video.title}</h1>
    <p class="text-justify">${video.description}</p>
    `;

 document.getElementById('customModal').showModal();

}


document.getElementById('search-input').addEventListener('keyup', (e) => {
    loadVideos(e.target.value);
})


loadVideos()
loadData()
