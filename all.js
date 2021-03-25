let data = [];

axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json').then(function(response){
    data = response.data;
    renderData();
})

function renderData() {
    let index = 0;
    let resultHtml = "";
    data.forEach(function(item) {
        index++;
        let itemHtml = templateBmiKata(index, item);
        resultHtml += itemHtml;
    })

    document.querySelector("#bmiKataTable tbody").innerHTML = resultHtml;

    renderPage(1);
}


function templateBmiKata(index , item) {
    let youtubeBtn = "";
    let codeBtn = "";
    let pageNo = Math.ceil(index / 10);

    if(item.youtubeUrl != ""){
        youtubeBtn = `<a href="${item.youtubeUrl}">Click</a>`;
    }

    if(item.codepenUrl != ""){
        codeBtn = `<a href="${item.codepenUrl}">Click</a>`;
    }

    return `
    <tr class="page-display page-${pageNo}">
        <th scope="row">${index}</th>
        <td>${item.slackName}</td>
        <td>${item.jsGroup}</td>
        <td>${item.practiceMinute}</td>
        <td>${item.practiceSecond}</td>
        <td>${item.haveTen}</td>
        <td>${youtubeBtn}</td>
        <td>${codeBtn}</td>
    </tr>
    `;
}

function templateComplete(index , item) {
    return `
        <th scope="row">${index}</th>
        <td>${item.jsGroup}</td>
        <td>${item.practiceSecond}</td>
    `;
}

function templateFaster(index , item) {
    return `
        <th scope="row">${index}</th>
        <td>${item.jsGroup}</td>
        <td>${item.people}</td>
    `;
}

function renderPage(pageNo) {

    document.querySelectorAll(".page-display").forEach(function(element) {
        element.style.display = "none";
    })

    document.querySelectorAll(".page-" + pageNo).forEach(function(element) {
        element.style.display =  "table-row";
    })

}

function changePage(event) {
    event.preventDefault()
    let pageNo = event.target.getAttribute('data-page');
    renderPage(pageNo);

    document.querySelectorAll(".page-link").forEach(function(element) {
        element.parentElement.classList.remove("active");
        if(pageNo == element.getAttribute('data-page')){
            element.parentElement.classList.remove("active");
        }
    })
}

document.querySelectorAll(".page-link").forEach(function(element) {
    element.addEventListener("click", changePage);
})