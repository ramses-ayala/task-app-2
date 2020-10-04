
(function(){

    const categorias = [
        {'id': '1', 'elementoCategoria': 'General', 'counter': 0},
        {'id': '2', 'elementoCategoria': 'Casa', 'counter': 0},
        {'id': '3', 'elementoCategoria': 'Trabajo', 'counter': 0}
    ];

    let tareas = [];

    const input = document.querySelector("#inputTask");
    let select = document.querySelector("#select");
    const form = document.querySelector("#form");
    let listContainer = document.querySelector("#list-tasks");

    let resultRenderList = '';

    document.addEventListener('DOMContentLoaded',function(){

        categorias.forEach(categoria => {
            select.innerHTML+=`<option value='${categoria.id}'>${categoria.elementoCategoria}</option>`;
        });

        document.querySelector('#categories').innerHTML = renderCategories(categorias);

    });



    function Task(id, text, completed){
        return {id: id, text: text, list: listContainer, completed: completed};
    }

    form.addEventListener('submit', function(event){
        event.preventDefault();

        let text = input.value.trim();
        let listId = select.value;

        if(text == '' || text == undefined){
            alert("EL CAMPO NO DEBE IR VACIO !!!");
        }
        else{
            // CREAR EL OBJETO
            let task = new Task(listId, text, true);
            tareas.push(task);
            refreshUI(tareas);
    
            console.log(task.text + ' ' + task.id);
            console.table(tareas);
        }


    });


    function refreshUI(task){
        renderList(task);
    }


    function renderList(task){
        document.querySelector('#list-tasks').innerHTML = renderTasks(task);   
    }

    function renderTasks(task){

        let resultRenderTask = '';

        task.forEach(task => {
            resultRenderTask += `
            <div class='task'>   
                <input type='checkbox' class='checkbox'/>
                <span class='textTask'>${task.text}</span>
                <button class='btnRemove'>Eliminar</button>
            </div>
            `    
        });

        return resultRenderTask;
    }


    function renderCategories(categories){
        
        let resultRenderCategories = '';

        categories.forEach(categoria => {
            resultRenderCategories+= `
                <div class='category-item'>
                    <p>${categoria.elementoCategoria}</p>
                    <span>${categoria.counter}</span>
                </div>
            `;
        });

        return resultRenderCategories;

    } // renderCategories()

    

    

    
    
    
        /* let contador1 = 0;
        let contador2 = 0;
        let contador3 = 0;
    
        let divs = document.querySelectorAll('.category-item');
    
         if(task.id == '1'){
            contador1++;
            divs[0].lastElementChild.textContent = contador1;
            console.log("TEXTO DEL CATEGORY : ", contador1);
        }
    
        else if(task.id == '2'){
            contador2++;
            divs[1].lastElementChild.textContent = contador2;
            console.log("TEXTO DEL CATEGORY : ", contador2);
        }
    
        else{
            contador3++;
            divs[2].lastElementChild.textContent = contador3;
            console.log("TEXTO DEL CATEGORY : ", contador3);
        }  */
})();