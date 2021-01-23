const quoteList = document.getElementById('quote-list')
const newForm = document.getElementById('new-quote-form')

fetch('http://localhost:3000/quotes?_embed=likes').then(resp => resp.json()).then(function(quotes){
console.log(quotes)    
quotes.forEach(function(q){
    quoteList.innerHTML += `
    <li data-id = ${q.id} class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${q.quote}</p>
      <footer class="blockquote-footer">${q.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${q.likes.length}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>
    `
    })
})

newForm.addEventListener('submit', function(e){
    e.preventDefault()
    let a = e.target.author.value
    let q = e.target.quote.value
    console.log(a, q)
    fetch(`http://localhost:3000/quotes`, {
        method: 'POST',
        head:{
            'Content-Type': 'application/json'
        },
        body:{
            quote: q,
            author: a
        }
    }).then(resp => resp.json()).then(function(q){
        console.log(q)
    })
})