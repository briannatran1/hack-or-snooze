"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Gets values of form from user and adds new story to story list*/

function submitFormAndAddStory() {
  const authorInput = $('#author-text').val();
  const titleInput = $('#title-text').val();
  const urlInput = $('#url-text').val();

  const newStory = { authorInput, titleInput, urlInput };

  const addedStory = newStory.addStory();
  console.log(addedStory);

  $allStoriesList.append(addedStory);
  clearFormData();
}

$('#submit-button').on('click', this.submitFormAndAddStory.bind(this));

/** Clears input for form */

function clearFormData() {
  authorInput.val('');
  titleInput.val('');
  urlInput.val('');
}