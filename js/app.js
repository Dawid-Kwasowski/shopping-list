(function() {

   const app = document.querySelector('.app')
   const addBtn = document.querySelector('.add-btn')
   const productList = document.querySelector('.list')
   app.append(productList)

   const addToList = (productName,productQuantity) => {
      const list = document.createElement('li')
      list.classList.add("item","list__item")
      const product = {
         id: productName,
         quantity: productQuantity
      }
      sendToStorage(product)

      const label = document.createElement('label')
      // label.textContent = product.id
      label.textContent = `${product.quantity}x ${product.id}`
      label.classList.add('item__label')
      label.htmlFor = product.id
      
      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'
      checkbox.id = product.id
      
      list.append(label,checkbox)
      productList.append(list)
   }

   const openModal = () => {
      const modal = document.createElement('form')
      modal.classList.add('modal','modal-animation__open')
      const quantityInput = document.createElement('input')
      quantityInput.type = 'number'
      quantityInput.placeholder = 'Ilość'
      quantityInput.classList.add('modal__quantity')
      const productNameInput = document.createElement('input')
      productNameInput.placeholder = 'Nazwa Produktu'
      productNameInput.classList.add('modal__product-name')
      const sendBtn = document.createElement('input')
      sendBtn.type = 'submit'
      sendBtn.textContent = 'Dodaj'
      sendBtn.classList.add('modal__send-btn')

      modal.append(quantityInput,productNameInput,sendBtn)
      app.append(modal)

      sendBtn.addEventListener('click', e => {
         e.preventDefault()
         addToList(productNameInput.value,quantityInput.value)
         
         modal.classList.toggle('modal-animation__close')
         
         setTimeout(() => {
            app.removeChild(modal)
            // add btn are appear
            addBtn.style.opacity = 1
         }, 500);

      })
      
   }

   addBtn.addEventListener('click', () => {
      // add btn are disappear
      addBtn.style.opacity = '0'
      openModal()
   })

   const sendToStorage = (products = {}) => {
      let isExist = localStorage.getItem('products')
      isExist = isExist ? JSON.parse(isExist): []
      isExist.push(products)
      localStorage.setItem('products',JSON.stringify(isExist))
   }

   const removeStorage = () => {
      localStorage.removeItem('products')
   }

   

   const getFromStorage = () => {
      // this feature will be edited
      const storage = localStorage
      let data = JSON.parse(storage.getItem('products'));
      if(data) {
         console.log('It is okay')
         data.forEach((product) => {
            const list = document.createElement('li')
            const label = document.createElement('label')
            list.classList.add("item","list__item")
            label.textContent = `${product.quantity}x ${product.id}`
            label.classList.add('item__label')
            label.htmlFor = product.id
            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.id = product.id
            list.append(label,checkbox)
            productList.append(list)
         })


         
      }
      else {
         return
      }
      // console.log(listProducts)
      
   }
   getFromStorage()
   removeStorage()
})()


