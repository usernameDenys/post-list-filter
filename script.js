// like counter

function count(event) {
  const likeIcon = event.target;
  const likeCount = likeIcon.nextElementSibling;
  likeCount.value = parseInt(likeCount.value) + 1;
}

// page structure

fetch("db.json")
  .then((response) => response.json())
  .then((data) => {
    const list = document.querySelector(".posts-list");

    const renderPosts = (filteredData) => {
      list.innerHTML = "";

      // elements structure
      filteredData.forEach((element) => {
        const post = document.createElement("li");
        const photoWrapper = document.createElement("div");
        const photo = document.createElement("img");
        const contentWrapper = document.createElement("section");
        const cardTitle = document.createElement("h3");
        const likeIcon = document.createElement("img");
        const likeCount = document.createElement("input");
        const decorationLine = document.createElement("hr");
        const cardText = document.createElement("p");
        const linkReadMore = document.createElement("a");

        // classes
        post.classList.add("posts-list-item");
        photoWrapper.classList.add("posts-list-photo-wrapper");
        photo.classList.add("posts-list-photo");
        contentWrapper.classList.add("posts-list-content");
        cardTitle.classList.add("content-title");
        likeIcon.classList.add("heard-icon");
        likeIcon.addEventListener("click", count);
        likeCount.classList.add("counter");
        likeCount.id = "like";
        likeCount.type = "number";
        decorationLine.classList.add("card-line-decoration");
        cardText.classList.add("content-text");
        linkReadMore.classList.add("content-link");

        // data from db
        post.dataset.filter = element.dataset;
        photo.src = element.image_url;
        photo.alt = element.imageDescription;
        likeIcon.src = element.icon_url;
        likeIcon.alt = "heard";
        likeCount.value = element.likes;
        cardTitle.innerHTML = element.title;
        cardText.innerHTML = element.description;
        linkReadMore.innerHTML = "Read more >>";

        // markup
        photoWrapper.appendChild(photo);
        contentWrapper.append(
          cardTitle,
          likeIcon,
          likeCount,
          decorationLine,
          cardText,
          linkReadMore
        );
        post.append(photoWrapper, contentWrapper);
        list.appendChild(post);
      });
    };

    renderPosts(data);

    // filter
    const filterButtons = document.querySelectorAll(".btn-wrapper button");

    filterButtons.forEach((button) => {
      button.onclick = function () {
        // Remove and add 'btn-active' class
        filterButtons.forEach((btn) => btn.classList.remove("btn-active"));
        button.classList.add("btn-active");

        // Get the data-filter value from html tags
        const filterValue = button.getAttribute("data-filter");

        // Filter the data
        const filteredPosts = data.filter(
          (post) => post.dataset == filterValue
        );

        renderPosts(filteredPosts);
      };
    });
  });
