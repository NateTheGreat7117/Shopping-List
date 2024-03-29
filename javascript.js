let foodList = [];
// Button to clear the shopping list
let clear_button = document.getElementById("clear-button");
// Inputs
let single_item = document.getElementById("single-item"); // Add single item
let category = document.getElementById("item-category"); // Add food category
// Entire div
let list = document.getElementById("list");

// Function to add an item whether it is a single item or category
function addItem(type) {
    let input;
    if(type === "single") {
        input = single_item;
    }else {
        input = category;
    }
    // Only run the code if there is some input to be added
    if(input.value.length > 0) {
        const id = new Date().getTime();

        if(category.value.length > 0) {
            foodList.push({food: input.value,
                    id: id, // Random id of the food
                    type: type, // Single item or category
                    index: category.value}); // Is it a single item under a category or just a normal item
        }else {
            foodList.push({food: input.value,
                    id: id,
                    type: type,
                    index: -1});
        }
        render();
    }
}
// Function to remove an item
function removeItem(event) {
    const buttonId = event.target;
    const idToDelete = buttonId.id;

    let deleted = 0;
    foodList = foodList.filter(function (item) {
        if(item.id == idToDelete)
        {
            deleted = item;
            return false;
        }else if(deleted.type === "category" && item.index === deleted.index) { // If the button pressed was a category and the input is under the category, delete it
            console.log(category);
            return false;
        }
        else {
            return true;
        }
    });
    render();
}
// Function to edit an item
function editItem(event) {
    const buttonId = event.target;
    const idToChange = buttonId.id;

    for(let i = 0; i < foodList.length; i++) {
        if(foodList[i].id == idToChange) {
            // Only change an item if there is some text in the input box
            if(foodList[i].type === "single") {
                if(single_item.value.length > 0)
                {
                    foodList[i].food = single_item.value;
                }
            }else {
                if(category.value.length > 0)
                {
                    foodList[i].food = category.value;
                }
            }
        }
    }
    render();
}
// Function to add an item under a category
function addUnder(event) {
    if(single_item.value.length > 0){
            const buttonId = event.target;
            const idToAddUnder = buttonId.id;

            for(let i = 0; i < foodList.length; i++) {
                if(foodList[i].id == idToAddUnder) {
                    if(foodList[i].type == "single") {
                        // Add the new item at the index after the category
                        foodList.splice(i+1, 0, {food: single_item.value,
                                                 id: new Date().getTime(),
                                                 type: "single",
                                                 index: -1});
                    }else {
                        foodList.splice(i+1, 0, {food: single_item.value,
                                                 id: new Date().getTime(),
                                                 type: "single",
                                                 index: foodList[i].index});
                    }
                }
            }
            render();
    }
}
// Render all of the items in the list
function render() {
    list.innerHTML = "";
    foodList.forEach(function(food) {
        // Divider for each element in list
        const div = document.createElement('div');
        div.style.display = "grid";
        if(food.type === "single")
        {
            div.style.gridTemplateColumns = "200px 115px 115px";
        }else {
            div.style.gridTemplateColumns = "225px 115px 115px 115px";
        }
        div.style.margin = "auto";
        div.style.marginTop = "15px";
        div.style.width = "200px";
        if(food.type ==="single") {
            if(food.index !== -1) {
                div.style.marginTop = "25px";
                div.style.marginLeft = "50%";
            }
            div.style.border = "black solid 2px";
            div.style.borderRadius = "5px";
            div.style.fontSize = "25px";
        }else {
            div.style.fontSize = "50px";
        }
        div.style.color = "black";

        // Item and button
        let itemDiv = document.createElement('div');
        itemDiv.style.overflow = "auto";
        let item;
        if(food.type === "single") {
            item = document.createElement('p');
        }else {
            item = document.createElement('h3');
        }
        item.innerHTML = food.food;
        item.style.textAlign = "center";
        item.style.margin = "auto";
        itemDiv.appendChild(item);

        const deleteButton = document.createElement('BUTTON');
        deleteButton.innerHTML = "Delete";
        deleteButton.style.margin = "auto";
        deleteButton.style.marginLeft = "50px";
        deleteButton.style.width = "100px";
        deleteButton.style.height = "50px";
        deleteButton.style.textAlign = "center";
        deleteButton.style.borderRadius = "20px";
        deleteButton.id = food.id;
        deleteButton.onclick = removeItem;

        const editButton = document.createElement('BUTTON');
        editButton.innerHTML = "Edit";
        editButton.style.margin = "auto";
        editButton.style.marginLeft = "50px";
        editButton.style.width = "100px";
        editButton.style.height = "50px";
        editButton.style.textAlign = "center";
        editButton.style.borderRadius = "20px";
        editButton.id = food.id;
        editButton.onclick = editItem;

        let addUnderButton;
        if(food.type === "category")
        {
            addUnderButton = document.createElement('BUTTON');
            addUnderButton.innerHTML = "Add Under";
            addUnderButton.style.margin = "auto";
            addUnderButton.style.marginLeft = "50px";
            addUnderButton.style.width = "100px";
            addUnderButton.style.height = "50px";
            addUnderButton.style.textAlign = "center";
            addUnderButton.style.borderRadius = "20px";
            addUnderButton.id = food.id;
            addUnderButton.onclick = addUnder;
        }

        div.appendChild(itemDiv);
        div.appendChild(deleteButton);
        div.appendChild(editButton);
        if(food.type === "category")
        {
            div.appendChild(addUnderButton);
        }
        list.appendChild(div);
        single_item.value = "";
    });
}
// Commands to detect button presses and changes to input box
single_item.addEventListener('keyup', function(event) {
    if(event.code === "Enter")
    {
        addItem("single");
    }else if(event.code === "ArrowUp")
    {
        category.focus();
    }
});
category.addEventListener('keyup', function() {
    if(event.code === "Enter")
    {
        addItem("category");
    }else if(event.code == "ArrowDown")
    {
        single_item.focus();
    }else if(event.code == "ArrowUp")
    {
        clear_button.focus();
    }
})
clear_button.addEventListener('click', function() {
    category.value = "";
    foodList = [];
    render();
});
clear_button.addEventListener('keyup', function() {
    if(event.code === "ArrowDown")
    {
        category.focus();
    }
});
