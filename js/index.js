
(function(){

    const categorias = [
        {'id': uuid4(), 'elementoCategoria': 'General', 'counter': 0},
        {'id': uuid4(), 'elementoCategoria': 'Casa', 'counter': 0},
        {'id': uuid4(), 'elementoCategoria': 'Trabajo', 'counter': 0}
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



    function Task(id, text, categorias, completed){
        return {id: id, text: text, categ: categorias, completed: completed};
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
            let task = new Task(uuid4(), text, listId, false);
            tareas.push(task);
            refreshUI();
    
            console.log(task.text + ' ' + task.id);
            console.log(tareas);
        }


    });


    function refreshUI(){
        renderTasks();
        renderList();
    }

    function renderTasks(){

        listContainer.innerHTML = ``;

        tareas.forEach(tarea => {
            listContainer.innerHTML += renderTask(tarea);   
        });

        // EVENTO AL CHECKBOX
        document.querySelectorAll('.task input').forEach(item => {
            item.addEventListener('click', function(event){

                const id = event.target.parentNode.parentNode.getAttribute('data-id');
                console.log("ESTE ES EL ID: ",id);
                const index = tareas.findIndex(tarea => tarea.id == id);
                console.log("ESTE ES EL INDICE: ",index);
                tareas[index].completed = !tareas[index].completed;

            });
        });

        // EVENTO AL BOTON DE BORRAR
        document.querySelectorAll('.task a').forEach(item => {
            item.addEventListener('click', function(event){
                event.preventDefault();

                const id = event.target.parentNode.parentNode.getAttribute('data-id');

                let obj = getItemAndIndex(tareas, {'id': id});
                console.log(obj);
                console.log("ID A ELIMIAR: ", id);
                tareas.splice(obj.index, 1);

                renderList();
                renderTasks();
            });
        })

    }

    function getItemAndIndex(arreglo, obj){
        const key = Object.keys(obj); 
        console.log("CLAVE: ",key);
        const value = obj[key];
        console.log("VALOR: ",value);

        for(let i=0;i<arreglo.length;i++){
            console.log("VALORES EN EL METODO GETITEMANDINDEX: ",arreglo[i][key]);
            if(arreglo[i][key] == value){
                console.log('index: ' + i + ' ELEMENTO DE LISTA: ' + arreglo[i]);
                return {'index': i, 'item': arreglo[i]};
            }
        }
    }

    function renderList(){
        renderCategories(categorias);
    }

    function renderTask(tarea){
        return `
        <div class='task' data-id='${tarea.id}'>   
            <div class='checkbox-container'>
                <input type='checkbox' ${(tarea.completed) ? 'checked="checked"' : ''} />
                ${tarea.text}
            </div>
            <a href='#'><i class="fas fa-trash-alt"></i></a>
        </div>
        `;
    }


    function renderCategories(categories){

        categories.forEach(cat => {
            cat.counter = 0;
        });

        tareas.forEach(tarea => {
            categories.forEach(cat => {
                if(tarea.categ == cat.id){
                    cat.counter++;
                }
            });
        })

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

    function uuid4(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c){
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    }

    

    
    
    
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