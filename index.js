import { tweetsData } from "./data.js";

import { v4 as uuidv4 } from "https://jspm.dev/uuid";
// console.log(uuidv4());

// tweetsData.forEach(function (tweet) {
//   console.log(tweet.replies);
// });

// document.addEventListener("click", function (e) {

//   let replyTweetUuid = e.target.dataset.reply;

//   if (e.target.dataset.like) {
//     handleLikeClick(e.target.dataset.like);
//   } else if (e.target.dataset.retweet) {

//     handleRetweetClick(e.target.dataset.retweet);
//   } else if (e.target.dataset.reply) {
//     handleReplyClick(e.target.dataset.reply);
//   } else if (e.target.id === "tweet-btn") {
//     handleTweetBtnClick();
//   } else if (e.target.id === "retweet-btn") {
//     handleRetweetBtnClick(e.target.dataset.reply);
//   }

//   return replyTweetUuid;
// });

let replyTweetUuid = "";
let retweetInput = "";

document.addEventListener("click", identifyClick);
function identifyClick(e) {
  // replyTweetUuid = e.target.dataset.reply;
  // console.log(e.target.dataset.like);
  // let replyTweetUuid = e.target.dataset.reply;
  // console.log(replyTweetUuid);
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    /*
Challenge:
1. Make this eventListener call "handleRetweetClick" 
   when the retweet icon is clicked, passing in the
   uuid from that tweet.  
*/
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    replyTweetUuid = e.target.dataset.reply;

    // console.log(replyTweetUuid);
    // console.log(e.target.dataset.reply);
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
  } else if (e.target.id === "retweet-btn") {
    handleRetweetBtnClick(replyTweetUuid);
  }
  // console.log(replyTweetUuid);
  /*
Challenge:
1. Add an else if so that if the Tweet button
   is clicked, handleTweetBtnClick is called.
*/
  // return replyTweetUuid;
  // console.log(replyTweetUuid);
}

function handleLikeClick(tweetId) {
  // console.log(tweetId);
  /*
Challenge:
1. Iterate over tweetsData and use the uuid 
   saved in tweetId to identify the liked
   tweet's object. Save that object to a 
   new const called 'targetTweetObj'.
⚠️ targetTweetObj should hold an object, NOT
   an array.
2. Increment targetTweetObj's 'likes' count 
   by 1.
3. Log out targetTweetObj.
*/
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  /*
Challenge:
1. When a tweet is liked, it's 'isLiked' property
   should be set to true.
2. When a tweet is unliked, it's 'isLiked' property
   should be set to false and its 'likes' count
   should be decremented.
*/
  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
    // targetTweetObj.isLiked = true;
  } else {
    targetTweetObj.likes--;
    // targetTweetObj.isLiked = false;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  render();
}

function handleRetweetClick(tweetId) {
  /*
Challenge:
2. Find the retweeted tweet's object in tweetsData 
   and save it to a const.
3. Increment or decrement the retweet count of the 
   tweet and flip its isRetweeted boolean.
4. Call the render function.  
*/
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
  /*
Challenge:
1. Use the uuid stored in 'replyId' to take control 
   of the div containing that tweet’s replies. 
   (Check the HTML string below to remind yourself 
   what id that div will have.)  
2. Toggle the CSS class "hidden" on that div. 
*/
  // replyTweetUuid = e.target.dataset.reply;
  // console.log(replyTweetUuid);

  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");

  // console.log(document.getElementById(`replies-${replyId}`).id);
  // console.log(replyId);
  // return replyId;
  // return targetTweetObj.uuid;
}

// function getReplyUuid(replyId) {
//   const targetTweetObj = tweetsData.filter(function (tweet) {
//     return tweet.uuid === replyId;
//   })[0];
//   return targetTweetObj.uuid;
// }

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");
  // console.log(tweetInput.value);
  /*
Challenge:
2. When the Tweet button is clicked, log out an object
   for a new tweet. Make sure you include the text of 
   the tweet (how can you get that?) and a unique 
   identifier using uuidjs.
   
   The handle @Scrimba (or whatever you prefer) and 
   the profile pic scrimbalogo.png can be hard-coded.
*/
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
  // console.log("Retweet button clicked!");
  // identifyClick();
  // console.log(replyTweetUuid);
  // handleReplyClick();
  // console.log(replyId);
  console.log("retweetBtnId: ", retweetBtnId);
  // const retweetInput = document.getElementById("retweet-input");
  const retweetInputs = document.querySelectorAll(".reply-area");
  // const retweetInputs = document.querySelectorAll(
  //   "[data-tweetreply='retweetBtnId']"
  // );
  // data-tweetreply="${tweet.uuid}"
  retweetInputs.forEach(function (retweet) {
    console.log("tweet dataset", retweet.dataset.tweetreply);
    console.log("retweetBtnId ", retweetBtnId);
    // console.log("innerText", tweet.attributes.innerText);
    if (retweet.dataset.tweetreply === retweetBtnId) {
      console.log("retweet.id = ", retweet.id);
      retweetInput = document.getElementById(retweet.id);
      console.log("retweet input = ", retweetInput);
      // retweetInput = document.querySelectorAll(
      //   "input[data-tweetreply='${tweet.uuid}']"
      // );

      console.log(retweet.id);
      console.log("*", retweetInput.value);
    }
  });
  // console.log("*", retweetInput);
  // console.log("retweetInputs: ", retweetInputs);
  // retweetInputs.forEach(function (element) {
  //   if() {}
  // });

  // console.log(retweetInput);
  // let retweetInput = document
  //   .querySelectorAll("#retweet-input")
  //   .map(function (tweet) {
  //     if (tweet.uuid === retweetBtnId) {
  //       console.log(retweetInput.value);
  //     }
  //   });
  // console.log(retweetInput);
  // getReplyUuid();
  // console.log(document.getElementById(`replies-${replyId}`));

  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === retweetBtnId;
    // console.log(tweet.uuid);
  })[0];
  console.log("help", targetTweetObj);
  // console.log("*", retweetInput);
  // targetTweetObj.replies.forEach(function (reply) {
  //   let retweetInput = document.getElementById("retweet-input");
  // });
  // if (retweetInput.value) {

  // if (!retweetInput.value) {
  //   alert("Please type a message.");
  // document
  //   .getElementById(`replies-${replyTweetUuid}`)
  //   .classList.remove("hidden");
  // } else
  // targetTweetObj.replies.unshift({
  //   handle: "@Scrimba",
  //   profilePic: "images/scrimbalogo.png",
  //   tweetText: retweetInput.value,
  // });
  if (retweetInput.value) {
    console.log("retweetInput value", retweetInput.value);
    // tweetsData.forEach(function (tweet) {
    //   console.log(replyTweetUuid);
    //   if (tweet.uuid === replyTweetUuid) {
    //     // if (e.target.dataset.tweetreply === replyTweetUuid) {
    //     tweet.replies.unshift({
    //       handle: "@Scrimba",
    //       profilePic: "images/scrimbalogo.png",
    //       tweetText: retweetInput.value,
    //       // });
    //     });

    //   }
    // });
    targetTweetObj.replies.unshift({
      handle: "@Scrimba",
      profilePic: "images/scrimbalogo.png",
      tweetText: retweetInput.value,
    });
  }

  // });
  // tweetsData.replies.unshift({
  //   handle: "@Scrimba",
  //   profilePic: "images/scrimbalogo.png",
  //   tweetText: retweetInput.value,
  // });
  // targetTweetObj.unshift({
  //   handle: "@Scrimba",
  //   profilePic: "images/scrimbalogo.png",
  //   tweetText: retweetInput.value,
  // });

  render();
  // console.log(tweetsData);
  // retweetInput.value = "";
  replyTweetUuid = "";
}

function getFeedHtml() {
  /*
Challenge:
1. Use a "for of" to iterate over the data and 
   create HTML string for each tweet using the 
   boilerplate below. Replace UPPERCASE text
   with data from the tweets. 
2. Store this HTML in a let called "feedHtml".
3. Log out feedHtml.
4. Call getFeedHtml to check it's working.
*/
  let feedHtml = "";

  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";
    let retweetIconClass = "";

    /*
Challenge:
1. Use an if statement to set the value of 
   'likeIconClass' to the string 'liked' 
   if the tweet has been liked. 
2. In the like icon tag, add 'likeIconClass' 
   to the list of classes.
*/

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    /*
Challenge:
1. Use an if statement to check if a tweet has replies.
2. If it does, log out the uuid for that tweet.
*/

    let repliesHtml = "";
    let replyInput = `
      
    `;

    if (tweet.replies.length > 0) {
      /*
Challenge:
1. If a tweet has replies, iterate through the replies
   and wrap each one in the HTML template provided below. 
   Make sure to replace words in UPPERCASE with data from 
   the tweet. On each iteration, add this HTML to repliesHtml.
   
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="PROFILE PIC" class="profile-pic">
            <div>
                <p class="handle">HANDLE</p>
                <p class="tweet-text">TWEET TEXT</p>
            </div>
        </div>
</div>
*/

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
      // return repliesHtml;
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
    /*
Challenge:
2. Place repliesHtml in its parent div remembering 
   to update that divs id.
*/
  });

  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
