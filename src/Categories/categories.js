import * as constants from "../constants";
import CategoryMenu from './categoryMenu.js'

export default class Categories {
    constructor(){

    }

    loadCategories() {
        fetch('http://phonebook.hillel.it/api/categories?', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.text();
            })

            .then(array => {
                this.addCategories(array)
            })

            .catch(err => {
                console.log(err);
            })
    }

    addCategories(servAnswer) {
        let allCCategories = new CategoryMenu();
        let answer = JSON.parse(servAnswer);
        let dropMenu = allCCategories.categoryDropDownMenu();
        const categoriesBlock = document.querySelector('.ls-inner__categories__wrapper');


        answer.forEach(obj => {
            let categoryName = document.createElement('p');
            categoryName.classList.add('ls-inner__categories__contacts__header');
            categoryName.innerText = obj.name;

            let categoryOptions = document.createElement('button');
            categoryOptions.classList.add('ls-inner__categories__contacts__option');

            let categoryWrapper = document.createElement('div');
            categoryWrapper.classList.add('ls-inner__categories__contacts-wrapper');
            categoryWrapper.dataset.id = obj._id;

            categoryWrapper.appendChild(categoryName);
            categoryWrapper.appendChild(categoryOptions);

            let newCategory = document.createElement('div');
            newCategory.classList.add('ls-inner__categories__contacts');


            newCategory.appendChild(categoryWrapper);
            categoriesBlock.appendChild(newCategory);

            categoryOptions.addEventListener('click', function (e) {
                e.stopPropagation();
                categoryWrapper.appendChild(dropMenu);
                dropMenu.classList.remove('hidden')
            });
        });

        constants.MAIN.addEventListener('click', () => {
            dropMenu.classList.remove('show');
            dropMenu.classList.add('hidden')
        })
    }
}