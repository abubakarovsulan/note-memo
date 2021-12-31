/**
 * Filter notes and render them on the site.
 */
$("form#search-form").submit(event => {
    const filterTitle = $("input#search-text")[0].value;
    fetchAndRender(filterTitle);
    event.preventDefault();
});

/**
 * Based on the input field, if it is cleared all notes are fetched and rendered.
 */
$("#search-text").on("input", function(e) {
    const currentInput = e.target.value;
    if (currentInput.length !== 0) return;
    fetchAndRender(currentInput);
});

/**
 * HTTPReuest via AJAX call to the webserver with a filter, to fetch all needed notes. Afterwards
 * all notes are rendered with the DOM, which is typical working with AJAX.
 */
function fetchAndRender(data) {
    $.ajax({
        url: "/filter-notes",
        type: "post",
        data: {filter: data},
        success: data => {
            $("#grid-container").html("");
            
            data.forEach(note => {
                const cardElem = document.createElement("div");
                cardElem.classList.add("card");

                const h1Elem = document.createElement("h1");
                h1Elem.appendChild(document.createTextNode(note.title));

                const pContentElem = document.createElement("p");
                pContentElem.appendChild(document.createTextNode(note.content));

                const pQuoteElem = document.createElement("p");
                pQuoteElem.setAttribute("title", note.quote);
                pQuoteElem.appendChild(document.createTextNode("'" + note.quote.slice(0, 50) + "...'"));

                cardElem.appendChild(h1Elem);
                cardElem.appendChild(document.createElement("hr"));
                cardElem.appendChild(pContentElem);
                cardElem.appendChild(document.createElement("hr"));
                cardElem.appendChild(pQuoteElem);

                $("#grid-container").append(cardElem);
            });
        }
    });
}