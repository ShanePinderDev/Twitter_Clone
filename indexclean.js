import { tweetsData } from "./data.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";

let replyTweetUuid = "";
let retweetInput = "";

document.addEventListener("click", identifyClick);
function identifyClick(e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    replyTweetUuid = e.target.dataset.reply;

    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } else if (e.target.id === "retweet-btn") {
    handleRetweetBtnClick(replyTweetUuid);
  }
}

function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
  } else {
    targetTweetObj.likes--;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  render();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++;
  } else {
    targetTweetObj.retweets--;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

  render();
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");

  if (tweetInput.value) {
    tweetsData.unshift({
      handle: "@Scrimba",
      profilePic: "images/scrimbalogo.png",
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
  }

  render();
  tweetInput.value = "";
}

function handleRetweetBtnClick(retweetBtnId) {
  console.log("retweetBtnId: ", retweetBtnId);

  const retweetInputs = document.querySelectorAll(".reply-area");

  retweetInputs.forEach(function (retweet) {
    console.log("tweet dataset", retweet.dataset.tweetreply);
    console.log("retweetBtnId ", retweetBtnId);

    if (retweet.dataset.tweetreply === retweetBtnId) {
      console.log("retweet.id = ", retweet.id);
      retweetInput = document.getElementById(retweet.id);
      console.log("retweet input = ", retweetInput);

      console.log(retweet.id);
      console.log("*", retweetInput.value);
    }
  });

  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === retweetBtnId;
  })[0];
  console.log("help", targetTweetObj);

  if (retweetInput.value) {
    console.log("retweetInput value", retweetInput.value);

    targetTweetObj.replies.unshift({
      handle: "@Scrimba",
      profilePic: "images/scrimbalogo.png",
      tweetText: retweetInput.value,
    });
  }

  render();

  replyTweetUuid = "";
}

function getFeedHtml() {
  let feedHtml = "";

  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";
    let retweetIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";
    let replyInput = `
      
    `;

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        repliesHtml += `
        <div class="tweet-reply">
          <div class="tweet-inner">
            <img src="${reply.profilePic}" class="profile-pic">
              <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
              </div>
          </div>
        </div>
        `;
      });
    }
    if (tweet.replies.length >= 0) {
      replyInput = `
      <div class="tweet-reply">
      <div class="tweet-inner">
      <div class="reply-input-area">
        <div class="reply-input-container">
          <img src="images/scrimbalogo.png" class="profile-pic" />
          <input type="textarea" id="retweet-input" class="reply-area" data-tweetreply="${tweet.uuid}" placeholder="Twimba your reply!">
        </div>
        <button id="retweet-btn">Tweet</button>
      </div>
      </div>
    </div>
      `;
    }

    feedHtml += `
    <div class="tweet">
      <div class="tweet-inner">
          <img src="${tweet.profilePic}" class="profile-pic">
          <div>
              <p class="handle">${tweet.handle}</p>
              <p class="tweet-text">${tweet.tweetText}</p>
              <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
              </div>   
            </div>            
        </div>
          <div  class="hidden" id="replies-${tweet.uuid}">
            
            ${repliesHtml}
            ${replyInput}
          </div>  
    </div>

    `;
  });

  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
