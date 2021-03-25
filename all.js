let data = [];

axios.get('https://raw.githubusercontent.com/hexschool/js-traninging-week6API/main/data.json').then(function (response) {
    data = response.data;
    renderData();
    renderComplete();
    renderFaster();
})

function renderData() {
    let index = 0;
    let resultHtml = "";
    data.forEach(function (item) {
        index++;
        let itemHtml = templateBmiKata(index, item);
        resultHtml += itemHtml;
    })

    document.querySelector("#bmiKataTable tbody").innerHTML = resultHtml;

    renderPage(1);
}

function renderComplete() {
    let teams = {};

    data.forEach(function (item) {
        if (teams[item.jsGroup] == undefined) {
            teams[item.jsGroup] = 0;
        }
        teams[item.jsGroup]++;
    })

    let keys = Object.keys(teams);
    let result = [];
    keys.forEach(function (item) {
        result.push({ 
            jsGroup: item, 
            people: teams[item] 
        })
    })

    result.sort(function (a, b) {
        return a.people > b.people ? -1 : 1;
    })

    let resultHtml = "";
    let index = 0;
    result.forEach(function (item) {
        index++;
        if(index <= 5) {
            resultHtml += templateComplete(index, item);
        }
    })

    document.querySelector("#completeTable tbody").innerHTML = resultHtml;
}

function renderFaster() {
    let teams = {};

    data.forEach(function (item) {
        if (teams[item.jsGroup] == undefined) {
            teams[item.jsGroup] = {
                people: 0,
                seconds: 0
            };
        }
        teams[item.jsGroup].people ++;
        teams[item.jsGroup].seconds += parseInt(item.practiceMinute)  * 60 + parseInt(item.practiceSecond);
    })

    let keys = Object.keys(teams);
    let result = [];
    keys.forEach(function (item) {
        result.push({ 
            jsGroup: item, 
            practiceSecond: (teams[item].seconds / teams[item].people).toFixed(2)
        })
    })

    result.sort(function (a, b) {
        return a.practiceSecond > b.practiceSecond ? 1 : -1;
    })
    
    let resultHtml = "";
    let index = 0;
    result.forEach(function (item) {
        index++;
        if(index <= 5) {
            resultHtml += templateFaster(index, item);
        }
    })

    document.querySelector("#fasterTable tbody").innerHTML = resultHtml;
}

function templateBmiKata(index, item) {
    let youtubeBtn = "";
    let codeBtn = "";
    let pageNo = Math.ceil(index / 10);

    if (item.youtubeUrl != "") {
        youtubeBtn = `<a href="${item.youtubeUrl}" target="_blank">Click</a>`;
    }

    if (item.codepenUrl != "") {
        codeBtn = `<a href="${item.codepenUrl}" target="_blank">Click</a>`;
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

function templateComplete(index, item) {
    return `
        <tr>
            <th scope="row">${index}</th>
            <td>${item.jsGroup}</td>
            <td>${item.people}</td>
        </tr>
    `;
}

function templateFaster(index, item) {
    return `
        <tr>
            <th scope="row">${index}</th>
            <td>${item.jsGroup}</td>
            <td>${item.practiceSecond}</td>
        </tr>
    `;
}

function renderPage(pageNo) {

    document.querySelectorAll(".page-display").forEach(function (element) {
        element.style.display = "none";
    })

    document.querySelectorAll(".page-" + pageNo).forEach(function (element) {
        element.style.display = "table-row";
    })

}

function changePage(event) {
    event.preventDefault()
    let pageNo = event.target.getAttribute('data-page');
    renderPage(pageNo);

    document.querySelectorAll(".page-link").forEach(function (element) {
        element.parentElement.classList.remove("active");
        if (pageNo == element.getAttribute('data-page')) {
            element.parentElement.classList.remove("active");
        }
    })
}

document.querySelectorAll(".page-link").forEach(function (element) {
    element.addEventListener("click", changePage);
})