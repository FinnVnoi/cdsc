// Mảng chứa các lá bài đã chọn
let selectedCards = [];
// Số lượng lá bài đã chọn
let selectedCount = 0;

// Mảng chứa các lá bài ẩn
let hiddenCards = [];
// Mảng chứa các lá bài đã biến mất
let removedCards = [];

// Số lượng lá bài ẩn
const hiddenCardCount = 5;

// Số lá bài trên mỗi trang
const cardsPerPage = 2;

// Tính số trang dựa trên số lá bài đã bị mất
const pageCount = Math.ceil(removedCards.length / cardsPerPage);

// Trang hiện tại
let currentPage = 1;

// Tạo các lá bài trên trang chủ
document.getElementById("startButton").disabled = true;
const cardContainer = document.getElementById("cardContainer");
for (let i = 1; i <= 122; i++) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(images/card${i}.jpg)`;
  card.addEventListener("click", function() {
    selectCard(card, i);
  });
  cardContainer.appendChild(card);
}

// Hàm để kiểm tra trạng thái xoay màn hình
function checkOrientation() {
  if (screen.orientation && screen.orientation.type.includes("landscape")) {
    // Trang web đã ở chế độ ngang, không cần thay đổi
    return;
  }

  // Kiểm tra nếu đang trong chế độ toàn màn hình
  if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    // Xác định các API hỗ trợ xoay màn hình
    const orientationAPI = screen.orientation || screen.mozOrientation || screen.msOrientation || screen.webkitOrientation;

    // Kiểm tra nếu API xoay màn hình khả dụng
    if (orientationAPI && orientationAPI.lock) {
      orientationAPI.lock("landscape").then(function() {
        // Xoay màn hình thành công
      }).catch(function() {
        // Xoay màn hình thất bại
      });
    }
  } else {
    // Không trong chế độ toàn màn hình, kiểm tra nếu đang ở chế độ ngang
    if (screen.orientation && screen.orientation.type.includes("portrait")) {
      // Xác định các API hỗ trợ xoay màn hình
      const orientationAPI = screen.orientation || screen.mozOrientation || screen.msOrientation || screen.webkitOrientation;

      // Kiểm tra nếu API xoay màn hình khả dụng
      if (orientationAPI && orientationAPI.lock) {
        orientationAPI.lock("portrait").then(function() {
          // Xoay màn hình thành công
        }).catch(function() {
          // Xoay màn hình thất bại
        });
      }
    }
  }
}

// Gọi hàm checkOrientation khi chuyển đổi chế độ toàn màn hình
document.addEventListener("fullscreenchange", checkOrientation);
document.addEventListener("mozfullscreenchange", checkOrientation);
document.addEventListener("webkitfullscreenchange", checkOrientation);
document.addEventListener("msfullscreenchange", checkOrientation);


// Gọi hàm checkOrientation khi chuyển đổi chế độ toàn màn hình
document.addEventListener("fullscreenchange", checkOrientation);
document.addEventListener("mozfullscreenchange", checkOrientation);
document.addEventListener("webkitfullscreenchange", checkOrientation);
document.addEventListener("msfullscreenchange", checkOrientation);

// Xử lý sự kiện khi nhấp vào nút toàn màn hình
fullscreenButton.addEventListener("click", function() {
  if (document.fullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
});

// Hàm để vào chế độ toàn màn hình
function enterFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }
}

// Hàm để thoát chế độ toàn màn hình
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

// Cập nhật nội dung của nút khi chuyển đổi chế độ toàn màn hình
document.addEventListener("fullscreenchange", function() {
  if (document.fullscreenElement) {
    fullscreenButton.innerHTML = "&#x26F7;"; // Biểu tượng thoát toàn màn hình
  } else {
    fullscreenButton.innerHTML = "&#x26F6;"; // Biểu tượng toàn màn hình
  }
});

// Mảng chứa các tên tập tin nhạc
const musicFiles = ['music1.mp3', 'music2.mp3', 'music3.mp3', 'music4.mp3'];

// Đối tượng âm thanh
const audio = new Audio();
audio.loop = false; // Không phát lại liên tục

// Biến kiểm tra trạng thái âm thanh (mặc định là bật)
let isAudioOn = true;

// Hàm chuyển đổi trạng thái âm thanh
function toggleAudio() {
  if (isAudioOn) {
    audio.pause();
    isAudioOn = false;
    document.getElementById('audioControlButton').textContent = 'Bật tiếng';
  } else {
    audio.play();
    isAudioOn = true;
    document.getElementById('audioControlButton').textContent = 'Tắt tiếng';
  }
}

// Hàm phát nhạc ngẫu nhiên
function playRandomMusic() {
  const randomIndex = Math.floor(Math.random() * musicFiles.length);
  const randomMusicFile = musicFiles[randomIndex];
  audio.src = randomMusicFile;
  audio.play();
}

// Chọn lá bài
function selectCard(card, cardIndex) {
  if (selectedCount < 30) {
    if (!selectedCards.includes(cardIndex)) {
      selectedCards.push(cardIndex);
      selectedCount++;
      card.style.border = "5px solid yellow";
    } else {
      selectedCards = selectedCards.filter(item => item !== cardIndex);
      selectedCount--;
      card.style.border = "none";
    }
  }
  if (selectedCount === 30) {
    document.getElementById("startButton").disabled = false;
  } else {
    document.getElementById("startButton").disabled = true;
  }
}
// Bắt đầu trò chơi
function startGame() {
  document.getElementById("cardContainer").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  document.getElementById("startButton").style.display = "none"
  // Kiểm tra trạng thái âm thanh và phát hoặc tắt nó
  if (isAudioOn) {
    playRandomMusic();
  } else {
    audio.pause();
  }

// Sự kiện phát nhạc tiếp theo khi nhạc kết thúc
audio.addEventListener('ended', playRandomMusic);


  // Gán số biến cho từng lá bài đã chọn
  const cardVariables = {};
  for (let i = 0; i < selectedCards.length; i++) {
    cardVariables[selectedCards[i]] = i + 1;
  }

  // Lưu số biến của lá bài vào mảng
  const cardVariableArray = selectedCards.map(card => cardVariables[card]);

  // Chọn ngẫu nhiên 3 lá bài từ các lá đã chọn
  hiddenCards = getRandomCards(selectedCards, 3, cardVariableArray);

  renderHiddenCards();

  const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundImage = `url(images/card${cardIndex}.jpg)`;
    card.addEventListener("click", function() {
    });
    
    // Hiển thị lá bài ẩn
    const hiddenCardsContainer = document.getElementById("hiddenCards");
    hiddenCardsContainer.innerHTML = "";

    const hiddenCardsWrapper = document.createElement("div");
    hiddenCardsWrapper.className = "hidden-cards-wrapper";

  hiddenCards.forEach(function(cardIndex) {
  const cardElement = document.createElement("div");
  cardElement.className = "card large";
  cardElement.style.backgroundImage = `url(images/card${cardIndex}.jpg)`;

  const removeButton = document.createElement("button");
  removeButton.textContent = "X";
  removeButton.style.marginLeft = "55px";
  removeButton.style.fontSize = "24px";
  removeButton.style.padding = "10px 20px";
  removeButton.style.borderRadius = "5px";
  removeButton.addEventListener("click", function(event) {
    event.stopPropagation();
    revealHiddenCard(cardElement, cardIndex);
  });

  const starButton = document.createElement("button");
  starButton.textContent = "+";
  starButton.style.fontSize = "24px";
  starButton.style.padding = "10px 20px";
  starButton.style.borderRadius = "5px";
  starButton.addEventListener("click", function(event) {
    event.stopPropagation();
    addStar(cardIndex);
  });

  const unstarButton = document.createElement("button");
  unstarButton.textContent = "-";
  unstarButton.style.fontSize = "24px";
  unstarButton.style.padding = "10px 20px";
  unstarButton.style.borderRadius = "5px";
  unstarButton.addEventListener("click", function(event) {
    event.stopPropagation();
    removeStar(cardIndex);
  });

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";
  buttonsContainer.appendChild(removeButton);
  buttonsContainer.appendChild(starButton);
  buttonsContainer.appendChild(unstarButton);

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";
  cardContainer.appendChild(cardElement);
  cardContainer.appendChild(buttonsContainer);

  hiddenCardsWrapper.appendChild(cardContainer);
  });

  hiddenCardsContainer.appendChild(hiddenCardsWrapper);
  updateAddCardButtonVisibility();
}

// Lấy một số ngẫu nhiên không trùng lặp từ mảng
function getRandomNumberArray(array, count) {
  const randomArray = [];
  while (randomArray.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const randomNumber = array[randomIndex];
    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber);
    }
  }
  return randomArray;
}

// Chọn ngẫu nhiên các lá bài ẩn từ danh sách lá bài đã chọn
function getRandomCards(cards, count, cardVariables) {
  const cardCount = cards.length;
  const randomIndices = getRandomNumberArray([...Array(cardCount).keys()], count);
  const randomCards = randomIndices.map(index => cards[index]);
  const randomCardVariables = randomCards.map(card => cardVariables[card]);
  return randomCards.sort((a, b) => cardVariables[a] - cardVariables[b]);
}

// Render các lá bài ẩn
function renderHiddenCards() {
  const hiddenCardsContainer = document.getElementById("hiddenCards");
  hiddenCardsContainer.innerHTML = "";

  hiddenCards.forEach(function(cardIndex) {
    const cardElement = document.createElement("div");
    cardElement.className = "card large";
    cardElement.style.backgroundImage = `url(images/card_back.jpg)`;
    cardElement.addEventListener("click", function() {
      toggleHiddenCard(cardElement, cardIndex);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.style.marginLeft = "55px";
    removeButton.style.fontSize = "24px";
    removeButton.style.padding = "10px 20px";
    removeButton.style.borderRadius = "5px";
    removeButton.addEventListener("click", function(event) {
      event.stopPropagation();
      removeHiddenCard(cardIndex);
    });

    const starButton = document.createElement("button");
    starButton.textContent = "+";
    starButton.style.fontSize = "24px";
    starButton.style.padding = "10px 20px";
    starButton.style.borderRadius = "5px";
    starButton.addEventListener("click", function(event) {
      event.stopPropagation();
      addStar(cardIndex);
    });

    const unstarButton = document.createElement("button");
    unstarButton.textContent = "-";
    unstarButton.style.fontSize = "24px";
    unstarButton.style.padding = "10px 20px";
    unstarButton.style.borderRadius = "5px";
    unstarButton.addEventListener("click", function(event) {
      event.stopPropagation();
      removeStar(cardIndex);
    });

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons-container";
    buttonsContainer.appendChild(removeButton);
    buttonsContainer.appendChild(starButton);
    buttonsContainer.appendChild(unstarButton);

    const cardContainer = document.createElement("div");
    cardContainer.className = "card-container";
    cardContainer.appendChild(cardElement);
    cardContainer.appendChild(buttonsContainer);

    hiddenCardsContainer.appendChild(cardContainer);
  });

  updateAddCardButtonVisibility();
}

// Toggle hiển thị lá bài ẩn
function toggleHiddenCard(card, cardIndex) {
  card.classList.toggle("flipped");
  if (card.classList.contains("flipped")) {
    card.style.backgroundImage = `url(images/card${cardIndex}.jpg)`;
  } else {
    card.style.backgroundImage = `url(images/card_back.jpg)`;
  }
}

// Lấy đường dẫn hình ảnh cho lá bài theo index
function getCardImagePath(cardIndex) {
  if (cardIndex === "back") {
    return "url(images/card_back.jpg)";
  } else {
    return `url(images/card${cardIndex}.jpg)`;
  }
}


// Cập nhật hiển thị nút "Thêm lá bài"
function updateAddCardButtonVisibility() {
  const addCardButton = document.getElementById("addCardButton");
  if (hiddenCards.length >= hiddenCardCount) {
    addCardButton.style.display = "none";
  } else {
    addCardButton.style.display = "block";
  }
}
// Xóa lá bài ẩn
function removeHiddenCard(card) {
  hiddenCards = hiddenCards.filter(item => item !== card);
  removedCards.push(card);
  renderHiddenCards();
  renderRemovedCards();
  renderPagination();

  const removedCardItem = document.createElement("div");
  removedCardItem.className = "removed-card-item";
  removedCardItem.style.backgroundImage = `url(images/card${card}.jpg)`;
  removedCardItem.addEventListener("click", function() {
    restoreCard(card);
  });

  moveRemovedCardToBottom(removedCardItem);
}


// Hiển thị lịch sử bài bị mất
const removedCardsContainer = document.getElementById("removedCards");
removedCardsContainer.innerHTML = "";
removedCards.forEach(function(card) {
  const removedCardItem = document.createElement("div");
  removedCardItem.className = "removed-card-item";
  removedCardItem.style.backgroundImage = `url(images/card${card}.jpg)`;
  removedCardItem.addEventListener("click", function() {
    restoreCard(card);
  });
  removedCardsContainer.appendChild(removedCardItem);
});

// Render lịch sử bài bị mất
function renderRemovedCards() {
  const removedCardsContainer = document.getElementById("removedCards");
  removedCardsContainer.innerHTML = "";

  removedCards.forEach(function(card) {
    const removedCardItem = document.createElement("div");
    removedCardItem.className = "removed-card-item";
    removedCardItem.style.backgroundImage = `url(images/card${card}.jpg)`;
    removedCardItem.addEventListener("click", function() {
      restoreCard(card);
    });

    moveRemovedCardToBottom(removedCardItem);
  });
}

// Render phân trang
function renderPagination() {
  const paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";

  const pageCount = Math.ceil(removedCards.length / 4);
  for (let i = 1; i <= pageCount; i++) {
    const paginationItem = document.createElement("div");
    paginationItem.className = "pagination-item";
    paginationItem.textContent = i;
    paginationItem.addEventListener("click", function() {
      showRemovedCards(i);
    });
    paginationContainer.appendChild(paginationItem);
  }
}

// Hiển thị các lá bài bị mất theo trang
function showRemovedCards(page) {
  const startIndex = (page - 1) * 4;
  const endIndex = page * 4;

  const removedCardsContainer = document.getElementById("removedCards");
  removedCardsContainer.innerHTML = "";

  for (let i = startIndex; i < endIndex; i++) {
    if (i >= removedCards.length) {
      break;
    }

    const card = removedCards[i];
    const removedCardItem = document.createElement("div");
    removedCardItem.className = "removed-card-item";
    removedCardItem.style.backgroundImage = `url(images/card${card}.jpg)`;
    removedCardItem.addEventListener("click", function() {
      restoreCard(card);
    });
    removedCardsContainer.appendChild(removedCardItem);
  }
}

// Phục hồi lá bài
function restoreCard(card) {
  hiddenCards.push(card);
  removedCards = removedCards.filter(item => item !== card);
  renderHiddenCards();
  renderRemovedCards();
  renderPagination();
}

// Thêm lá bài
function addCard() {
  if (selectedCount === 30) {
    const availableCards = selectedCards.filter(card => !hiddenCards.includes(card) && !removedCards.includes(card));
    if (availableCards.length === 0) {
      alert("Thẻ bài của bạn đã hết");
    } else {
      let randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      while (hiddenCards.includes(randomCard)) {
        randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      }

      hiddenCards.push(randomCard);
      renderHiddenCards();
      if (hiddenCards.length >= hiddenCardCount) {
        addCardButton.style.display = "none";
      } else {
        addCardButton.style.display = "block";
      }
      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.style.marginLeft = "55px";
      removeButton.style.marginTop = "5px";
      removeButton.style.fontSize = "24px";
      removeButton.style.padding = "10px 20px";
      removeButton.style.borderRadius = "5px";
      removeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        removeHiddenCard(randomCard);
      });

      const starButton = document.createElement("button");
      starButton.textContent = "+";
      starButton.style.fontSize = "24px";
      starButton.style.padding = "10px 20px";
      starButton.style.borderRadius = "5px";
      starButton.addEventListener("click", function(event) {
        event.stopPropagation();
        addStar(randomCard);
      });

      const unstarButton = document.createElement("button");
      unstarButton.textContent = "-";
      unstarButton.style.fontSize = "24px";
      unstarButton.style.padding = "10px 20px";
      unstarButton.style.borderRadius = "5px";
      unstarButton.addEventListener("click", function(event) {
        event.stopPropagation();
        removeStar(randomCard);
      });

      const buttonsContainer = document.createElement("div");
      buttonsContainer.appendChild(removeButton);
      buttonsContainer.appendChild(starButton);
      buttonsContainer.appendChild(unstarButton);

      const cardContainer = document.createElement("div");
      cardContainer.appendChild(cardElement);
      cardContainer.appendChild(buttonsContainer);
      hiddenCardsContainer.appendChild(cardContainer);
    }
  }
}

// Đánh dấu ngôi sao trên lá bài
function addStar(card) {
  const hiddenCardsContainer = document.getElementById("hiddenCards");
  const cards = hiddenCardsContainer.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const cardElement = cards[i];
    if (cardElement.style.backgroundImage.includes(`card${card}.jpg`)) {
      const star = document.createElement("span");
      star.className = "star";
      star.textContent = "*";
      cardElement.appendChild(star);
      break;
    }
  }
}

// Hủy đánh dấu ngôi sao trên lá bài
function removeStar(card) {
  const hiddenCardsContainer = document.getElementById("hiddenCards");
  const cards = hiddenCardsContainer.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    const cardElement = cards[i];
    if (cardElement.style.backgroundImage.includes(`card${card}.jpg`)) {
      const star = cardElement.getElementsByClassName("star")[0];
      if (star) {
        cardElement.removeChild(star);
      }
      break;
    }
  }
}

// Thêm lá bài
function addCard() {
  if (selectedCount === 30) {
    const availableCards = selectedCards.filter(card => !hiddenCards.includes(card) && !removedCards.includes(card));
    if (availableCards.length === 0) {
      alert("Thẻ bài của bạn đã hết");
    } else {
      let randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      while (hiddenCards.includes(randomCard)) {
        randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      }

      hiddenCards.push(randomCard);
      renderHiddenCards();
      if (hiddenCards.length >= hiddenCardCount) {
        addCardButton.style.display = "none";
      } else {
        addCardButton.style.display = "block";
      }
      const removeButton = document.createElement("button");
      removeButton.textContent = "X";
      removeButton.style.marginLeft = "55px";
      removeButton.style.marginTop = "5px";
      removeButton.style.fontSize = "24px";
      removeButton.style.padding = "10px 20px";
      removeButton.style.borderRadius = "5px";
      removeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        removeHiddenCard(randomCard);
      });

      const starButton = document.createElement("button");
      starButton.textContent = "+";
      starButton.style.fontSize = "24px";
      starButton.style.padding = "10px 20px";
      starButton.style.borderRadius = "5px";
      starButton.addEventListener("click", function(event) {
        event.stopPropagation();
        addStar(randomCard);
      });

      const unstarButton = document.createElement("button");
      unstarButton.textContent = "-";
      unstarButton.style.fontSize = "24px";
      unstarButton.style.padding = "10px 20px";
      unstarButton.style.borderRadius = "5px";
      unstarButton.addEventListener("click", function(event) {
        event.stopPropagation();
        removeStar(randomCard);
      });

      const buttonsContainer = document.createElement("div");
      buttonsContainer.appendChild(removeButton);
      buttonsContainer.appendChild(starButton);
      buttonsContainer.appendChild(unstarButton);

      const cardContainer = document.createElement("div");
      cardContainer.appendChild(cardElement);
      cardContainer.appendChild(buttonsContainer);
      hiddenCardsContainer.appendChild(cardContainer);
    }
  }
}

// Hàm để di chuyển lá bài đã bị xóa xuống dưới của thanh lịch sử
function moveRemovedCardToBottom(card) {
  const removedCardsContainer = document.getElementById("removedCards");
  const removedCardItems = removedCardsContainer.getElementsByClassName("removed-card-item");
  if (removedCardItems.length >= cardsPerPage) {
    removedCardsContainer.removeChild(removedCardItems[0]);
  }
  removedCardsContainer.appendChild(card);
}
