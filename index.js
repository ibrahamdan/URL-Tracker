let myLinks = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.querySelector("#input-btn")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")
let ulEl = document.querySelector("#ul-el")

const local = JSON.parse(localStorage.getItem("savedLinks"))
if (local) {
    myLinks = local
    initLinks()
}

inputBtn.addEventListener("click", saveLink)
deleteBtn.addEventListener("click", clearLinks)
tabBtn.addEventListener("click", saveTab)

function initLinks() {
    for (let i = 0; i < myLinks.length; i++) {
        const a = document.createElement("a")
        a.setAttribute("href", myLinks[i])
        a.setAttribute("target", "_blank")
        a.innerHTML = myLinks[i]
        const li = document.createElement("li")
        li.append(a)
        ulEl.append(li)
    }
}

function saveLink() {
    let link = inputEl.value
    if (link) {
        myLinks.push(link)
        updateUlEl(link)
    }
    inputEl.value = ""
    localStorage.setItem("savedLinks", JSON.stringify(myLinks))
}

function updateUlEl(link) {
    const a = document.createElement("a")
    a.setAttribute("href", link)
    a.setAttribute("target", "_blank")
    a.innerHTML = link
    const li = document.createElement("li")
    li.append(a)
    ulEl.append(li)
}

function saveTab() {
    chrome.runtime.sendMessage({ action: "getTabUrl" }, (response) => {
        if (response.url) {
            myLinks.push(response.url)
            updateUlEl(response.url)
            localStorage.setItem("savedLinks", JSON.stringify(myLinks));
        }
    })
}

function clearLinks() {
    localStorage.clear()
    myLinks = []
    ulEl.innerHTML = ""
}