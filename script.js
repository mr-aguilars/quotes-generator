const quoteContainer = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Currently Trying to incorporate a loader
// // Show Loading
// function loading() {
//     loader.hidden = false;
//     quoteContainer.hidden = true;
// }

// // Hide Loading
// function complete() {
//     quoteContainer.hidden = false;
//     loader.hidden = true;
// }

// Show New Quote
function newQuote() {
    // loading();
    // Picking a new random Quote here
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check for null value
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check length for styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide loader
    quoteText.textContent = quote.text;
    // complete();
}

// Connecting with API to get Quotes
async function getQuotes() {
    // loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuote();
    } catch (error) {
        // Catch Error Here 
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Loads
getQuotes();
