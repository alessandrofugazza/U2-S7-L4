const loadImagesBtn = document.getElementById("load-images-btn");
const loadSecndrImagesBtn = document.getElementById("load-secondary-images-btn");

loadImagesBtn.addEventListener("click", () => loadImages("nature"));

loadSecndrImagesBtn.addEventListener("click", () => loadImages("war"));

const loadImages = async imgType => {
  try {
    const re = await fetch(`https://api.pexels.com/v1/search?query=${imgType}&per_page=9`, {
      headers: {
        Authorization: "MFa0IbbgbM58yPn26z7E5xLXXtKNSXKA6hv8KET14JqswKi3Uw2bwVF0",
      },
    });
    if (!re.ok) {
      throw new Error("error");
    }

    const photos = await re.json();
    if (!photos.photos.length) {
      alert("no photos for this topic");
      throw new Error("No photos found");
    }
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
      const photo = photos.photos[index];
      const imgUrl = photo.src.original;
      const img = document.createElement("img");
      img.setAttribute("src", imgUrl);
      img.className = "card-img";
      //   img.addEventListener("click", () => openDetail(photo.id));
      card.children[0].remove();
      card.insertBefore(img, card.firstElementChild);
      const editHideBtn = card.querySelectorAll("button")[1];
      editHideBtn.innerText = "Hide";
      editHideBtn.addEventListener("click", () => card.parentElement.remove());
      const cardFooterText = card.querySelector("small");
      cardFooterText.innerText = "id: " + photo.id;
    });
  } catch (error) {
    console.log(error);
  }
};

const searchImages = async event => {
  event.preventDefault();
  const searchedTopic = event.target["searchBar"].value;
  loadImages(searchedTopic);
};

// const openDetail = id => {
//   window.location.assign(window.location);
// };
