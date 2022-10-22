
let inputField = document.querySelector('#input_field')
inputField.addEventListener('change', func_create_item) 
let inputFieldWrapper = document.querySelector('#input_field_wrapper')
let bodyWeb = document.querySelector('#body_web')
let pointCounter = document.querySelector('#point_counter')
pointCounter.innerHTML = 'number of notes: 0'
let i = 0

let editable



function func_create_item() {

    // Создание пункта заметки на странице
    const itemWrapper = document.createElement('div')
    itemWrapper.classList.add('punkt')
    let itemText = document.createElement('div')
    itemText.setAttribute('class', 'punkt_text')
    let itemParagraph = document.createElement('p')
    itemParagraph.setAttribute('id', 'note_content')
    


    // Создние кнопки удаления пункта заметки
    let deleteItem = document.createElement('div')
    deleteItem.setAttribute('class', 'punkt_remove')
    deleteItem.setAttribute('id', 'delete_note')
    deleteItem.innerHTML = 'delete'
    

    // Создание кнопки редактирования
    let redactButton = document.createElement('div')
    redactButton.setAttribute('class', 'punkt_redact')
    redactButton.setAttribute('id', 'redact_note')
    editable = redactButton.contentEditable
    redactButton.contentEditable = 'false'
    redactButton.innerHTML = 'redact'

    // создание модалього окна
    let openModalButton = document.createElement('i')
    openModalButton.setAttribute('class', 'arrow_right right')
    openModalButton.setAttribute('id', 'open_modal_window')

    // Вставка пункта заметки и его элементов на странице 
    itemParagraph.innerText = inputField.value;
    itemText.append(itemParagraph)
    itemWrapper.append(itemText) 
    itemWrapper.append(deleteItem)   
    itemWrapper.append(redactButton)  
    itemWrapper.append(openModalButton)  
    inputFieldWrapper.after(itemWrapper)

    // Обнуление строки ввода при потери фокуса
    inputField.value = '';

    // Счетчик кол-во пунктов на странице
    i++
    pointCounter.innerHTML = 'number of notes: ' +i;


    // привязка кнопки удаления пункта
    deleteItem.addEventListener('click', delete_remove)
    
    // вставка кнопки редактирования пункта
    redactButton.addEventListener('click', punkt_redact)

    // открытие модального окна
    openModalButton.addEventListener('click', open_modal)

}

function delete_remove() {
    this.parentElement.remove()
    i--
    pointCounter.innerHTML = 'number of notes: ' +i;
    
}

function punkt_redact() {
    let inputField = this.parentElement.children[0].firstChild
    inputField.contentEditable = 'true';
    inputField.addEventListener('keydown', function(e){
        if(e.ctrlKey && e.key == 'Enter'){
            this.contentEditable = 'false';            
        }
    })
}

function open_modal() {
    // Создание структуры модалки
    /* <div class="modal_main">
        <div class="modal_window">
            <div class="modal_header">
                Modal Title
            </div>
            
            <div modal_opisanie>
                Dop opisanie punktov
            </div>
        </div>
    </div> */
    let backgroundModal = document.createElement('div')
    backgroundModal.setAttribute('class', 'modal_main')
    let modalWindow = document.createElement('div')
    modalWindow.setAttribute('class', 'modal_window')
    let modalWindowHeader = document.createElement('div')
    modalWindowHeader.setAttribute('class', 'modal_header')
    let modalWindowBody = document.createElement('textarea')
    modalWindowBody.setAttribute('class', 'modal_opisnie')
    modalWindowBody.setAttribute('id', 'area')
    modalWindowBody.setAttribute('type', 'text')
    modalWindowBody.setAttribute('placeholder', 'add discription...')
    // modalWindowBody.setAttribute('value', 'test text 1')
    // modalWindowBody.setAttribute('value', '')
    let crossModalWindow = document.createElement('div')
    crossModalWindow.setAttribute('class', 'close')
    crossModalWindow.setAttribute('id', 'close_modal_window')
    
    // knopka_zakrit.innerHTML = '&times;'

    // Вставка структуры модалки 
    bodyWeb.append(backgroundModal)
    backgroundModal.append(modalWindow)
    modalWindow.append(modalWindowHeader)
    modalWindow.append(modalWindowBody)
    modalWindow.append(crossModalWindow)

    // Вставка текста заголовка в модальное окно
    let itemParagraph__copy = this.parentElement.children[0].firstChild
    let content__itemParagraph = itemParagraph__copy.innerHTML
    modalWindowHeader.innerHTML = content__itemParagraph
    
    // Кнопка закрытия модалки
    let crossModalWindow__copy = document.querySelector('#close_modal_window')
    crossModalWindow__copy.addEventListener('click', func_close_modal)
    function func_close_modal() {
        backgroundModal.remove()
    }

    // сохранение описания пункта
    // let area = document.querySelector('#area')
    // let value1 = document.querySelector('#area')
    // value1.innerHTML = 'testing text 1'
    // console.log(value1)
    // let area = this.firstChild
    // console.log(area)
    // area.value = localStorage.getItem('area');
    // area.oninput = () => {
    //   localStorage.setItem('area', area.value)
    // };
    // modalWindowBody.addEventListener('keydown', () => {
    //     // console.log(modalWindowBody.value)
    //     let area = modalWindowBody.value
    //     console.log(area)
    //     // area = localStorage.setItem('area', area.value)
    //     localStorage.setItem('area', area)

    //     // area.oninput = () => {
    //     //   localStorage.setItem('area', area.value)
    //     // };
    // })
    // modalWindowBody.value = localStorage.getItem(area)


    modalWindowBody.addEventListener('keydown', function(e){
        if(e.ctrlKey && e.key == 'Enter'){
            let area = modalWindowBody.value
            area = localStorage.setItem('area', area)

           
        }
    })
   modalWindowBody.innerHTML = localStorage.getItem("area")
}

// {
//     title: 'title',
//     content: 'content',
// }