// const rowHeader = (data) => {
//   let header = Object.keys(data).map((d) => {
//       if (d === "image") return;
//       return `<td class=${d}>${d}</td>`
//   }).join("")
//   return `<tr>${header}</tr>`
// }

// const row = (data, headers) => {
// let row = headers.map((h) => {
//   let value = data[h];
//   if (h === "image") return;
//   if (h === 'id' && data['image']) {
//       value = `<img src="${data['image']}"/>${value} `;
//   } else if (typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'))) {
//       value = `<a href="${value}" target="_blank">${value}</a>`;
//   }
//   return `<td>${value}</td>`;
// }).join("");
// return `<tr>${row}</tr>`;
// }

// const createTable = (data) => {
//   const headers = Object.keys(data[0])
//   document.getElementById("app").innerHTML = `<table class="table table-bordered table-hover">
//       ${data.map(d => row(d, headers)).join("")}
//       </table>`
//   console.log(data)
// }

// const url = "https://api.mtw-testnet.com/assets/all"
// fetch(url)
//   .then((response) => {
//       return response.json()
//   })
//   .then((v) => createTable(Object.values(v)))
//   .catch((err) => console.log(err))


// let items = []

// const add = ()=>{
//     let newItem = document.getElementById('newItem').value
//     if(items.indexOf(newItem)==-1 && items.indexOf(newItem)!=''){
//          items.push(newItem)
//          document.getElementById('newItem').value = ''
//          createList()
//          document.getElementById('newItem').focus()
//     }    
// }

// const createList = ()=>{
//     let div =  document.querySelector('https://api.mtw-testnet.com/assets/all')
//     if(div.firstChild) div.removeChild(div.firstChild)

//     let ul = document.createElement('ul')
//     div.appendChild(ul)

//     items.forEach(i=>{
//         let li = document.createElement('li')
//         li.innerText = i
//         ul.appendChild(li)
//     })   
//     save() 
// }
 
// const save = ()=>{
//     let s = JSON.stringify(items)
//     localStorage.setItem('items', s)
// }

// const restore = ()=>{
//     let s = localStorage.getItem('items')
//     if(s!=undefined) {
//         items = JSON.parse(s)
//         createList()
//     }
// }

// const clearItems = ()=>{    
//     items = []
//     let div =  document.querySelector('#content')
//     if(div.firstChild) div.removeChild(div.firstChild)
//     localStorage.removeItem('items')
// }

// restore()


const url = "https://api.mtw-testnet.com/assets/all"

const createList = ()=>{
  let div =  document.querySelector('#content')
  if(div.firstChild) div.removeChild(div.firstChild)

  let ul = document.createElement('ul')
  div.appendChild(ul)

  items.forEach(i=>{
      let li = document.createElement('li')
      li.innerText = i
      ul.appendChild(li)
  })   
  save() 
}


const save = ()=>{
  let s = JSON.stringify(items)
  localStorage.setItem('items', s)
}

const restore = ()=>{
  let s = localStorage.getItem('items')
  if(s!=undefined) {
      items = JSON.parse(s)
      createList()
  }
}

const clearItems = ()=>{    
  items = []
  let div =  document.querySelector('#content')
  if(div.firstChild) div.removeChild(div.firstChild)
  localStorage.removeItem('items')
}

restore()