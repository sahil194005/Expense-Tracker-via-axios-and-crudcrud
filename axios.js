let button = document.querySelector("#submit")
let amount = document.querySelector("#amount_input")
let description = document.querySelector("#description_input")
let category = document.querySelector("#category_input")
let form_area = document.querySelector("#form")


window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/6d97243f1b37463883b660040a1ad156/appointment2')
    .then((res)=>{
        generating_form()
    })
    .catch((err)=>console.log(err))
})

button.addEventListener("click", pressed)

function pressed(e) {
  if (amount.value == "" || description.value == "" || category.value == "")
    alert("Please fill all the details")
  let obj = {
    amount: amount.value,
    description: description.value,
    category: category.value,
  } 
  axios
    .post(
      "https://crudcrud.com/api/6d97243f1b37463883b660040a1ad156/appointment2",
      obj
    )
    .then((res) => {
      generating_form()
    })
    .catch((err) => {
      console.log(err)
    })
  amount.value = ""
  description.value = ""
  category.value = ""
}

function generating_form() {
  let oldlis = document.querySelector("ul")
  if (oldlis) {
    oldlis.remove()
  }
  let newList = document.createElement("ul")
  axios
    .get(
      "https://crudcrud.com/api/6d97243f1b37463883b660040a1ad156/appointment2"
    )
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        
        let new_item = document.createElement("li")

        let delete_exp_btn = document.createElement("button")
        let edit_exp_btn = document.createElement("button")

        delete_exp_btn.textContent = "Delete Expense"

        edit_exp_btn.textContent = "Edit Expense"

        let description_span = document.createElement("span")
        description_span.textContent = res.data[i].description

        description_span.style.display = "none"

        let amount_span = document.createElement("span")

        amount_span.textContent = res.data[i].amount
        amount_span.style.display = "none"

        let category_span = document.createElement("span")
        category_span.textContent = res.data[i].category

        category_span.style.display = "none"

        new_item.appendChild(
          document.createTextNode(
            `${res.data[i].amount} - ${res.data[i].description} - ${res.data[i].category}`
          )
        )

        new_item.appendChild(description_span)
        new_item.appendChild(amount_span)
        new_item.appendChild(category_span)

        new_item.appendChild(delete_exp_btn)
        new_item.appendChild(edit_exp_btn)
        newList.appendChild(new_item)

        delete_exp_btn.addEventListener("click", delete_expenses)
        edit_exp_btn.addEventListener("click", edit_expenses)
      }
      form_area.appendChild(newList)
    })
    .catch((err) => {
      console.log(err)
    })
}

function edit_expenses(e) {
  let tobedeleted = e.target.parentNode
  tobedeleted.remove()

  let disc = tobedeleted.firstElementChild.textContent
  let amounti = tobedeleted.firstElementChild.nextElementSibling.textContent
  let cati =
    tobedeleted.firstElementChild.nextElementSibling.nextElementSibling
      .textContent
  amount.value = amounti
  description.value = disc
  category.value = cati
  let unique_id
  axios
    .get(
      "https://crudcrud.com/api/6d97243f1b37463883b660040a1ad156/appointment2"
    )
    .then((res) => {
      res.data.forEach((element) => {
        if (element.description == disc) {
          unique_id = element._id
          axios.delete(
            `https://crudcrud.com/api/6d97243f1b37463883b660040a1ad156/appointment2/${unique_id}`
          )
        }
      })
    })
    .catch((err) => console.log(err))
}

function delete_expenses(e) {
  let tobedeleted = e.target.parentNode
  tobedeleted.remove()

  let disc = tobedeleted.firstElementChild.textContent
  let unique_id
  axios
    .get(
      "https://crudcrud.com/api/6d97243f1b37463883b660040a1ad156/appointment2"
    )
    .then((res) => {
      res.data.forEach((element) => {
        if (element.description == disc) {
          unique_id = element._id
          axios.delete(
            `https://crudcrud.com/api/6d97243f1b37463883b660040a1ad156/appointment2/${unique_id}`
          )
        }
      })
    })
    .catch((err) => console.log(err))
}
