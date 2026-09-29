let RoomContainer = document.querySelector("#RoomContainer");

let RoomDiv = document.createElement("div");
let InventoryDiv = document.createElement("div");

RoomContainer.append(RoomDiv);
RoomContainer.append(InventoryDiv);

let current_room;

let inventory =[];
let passwordInput;
let passwordMessage = null;


let rooms = {
    1: {
        name: "Locker room",
        item: "Shin pads",
        description: "Where players get ready before games",
        linkedRooms: [
            {
                label: "Go onto the Pitch",
                destination: 2
            }
        ]
    },

    2: {
        name: "Pitch",
        description: "Where the game is played",
        item:"soccer ball",
        linkedRooms: [
            {
                label: "Go to the locker room",
                destination: 1
            },
            {
                label: "Go to the stands",
                destination: 3
            }
        ]
    },

    3: {
        name: "Stands",
        description: "Where fans watch the game",
        linkedRooms: [
            {
                label: "Go to the Pitch",
                destination: 2
            },
            {
                label: "Go to the metro",
                destination: 4
            }
        ]
    },

    4: {
        name: "Metro station",
        description: "Where fans arrive to the stadium",
        linkedRooms: [
            {
                label: "Go to the Stands",
                destination: 3
            }
        ]
    }
};

function exitButton(event) {
    let buttonClicked = event.target;
    let buttonName = buttonClicked.innerHTML;

    for (let i = 0; i<current_room.linkedRooms.length; i++) {
        if (buttonName === current_room.linkedRooms[i].label) {
            renderRoom(rooms[current_room.linkedRooms[i].destination]);
        }
    }
}




function inventory_game(event){
    let buttonClicked = event.target
    let item = current_room.item;

    inventory.push(item);
    current_room.item = "";
    renderRoom(current_room);

    
    


    renderInventory(inventory)

}

function renderRoom(roomObject) {
    current_room = roomObject
    RoomDiv.innerHTML = "";

    let RoomH1 = document.createElement("h1");
    RoomH1.innerHTML = roomObject.name;
    RoomDiv.append(RoomH1);

    let RoomP = document.createElement("p");
    RoomP.innerHTML = roomObject.description;
    RoomDiv.append(RoomP);

    let ButtonContainer = document.createElement("div");
    ButtonContainer.classList.add("ButtonContainer");
    RoomDiv.append(ButtonContainer);

    for (let i = 0; i < roomObject.linkedRooms.length; i++) {
        let RoomButton = document.createElement("button");


        RoomButton.innerHTML = roomObject.linkedRooms[i].label;


        RoomButton.classList.add("Button");

        RoomButton.addEventListener("click", exitButton);

        ButtonContainer.append(RoomButton);
    }

    if(roomObject.item){
        let ItemButton = document.createElement("button")
        ItemButton.innerHTML = "Pick up " + roomObject.item
        ItemButton.classList.add("Button");
        ItemButton.classList.add("ItemButton")
        ItemButton.addEventListener("click", inventory_game);
        ButtonContainer.append(ItemButton);
    }

    if (roomObject.name === "Metro station"){
        passwordMessage = null;
        passwordInput = document.createElement("input")
        passwordInput.type = "text";
        let buttonSubmit = document.createElement("button")
        buttonSubmit.innerHTML = "submit"
        buttonSubmit.classList.add("Button");
        let password_hint = document.createElement("p")
        password_hint.innerHTML = "It is the class name CSC-...."
        RoomDiv.append(password_hint)
        buttonSubmit.addEventListener("click",checkPassword);
        RoomDiv.append(passwordInput);
        RoomDiv.append(buttonSubmit)

    }
}

function checkPassword(event){
    let password = passwordInput.value
    let metro_password = "CSC-336"

    if (passwordMessage === null){
        passwordMessage = document.createElement("p")
        RoomDiv.append(passwordMessage)
    }
    if(password === metro_password){
        passwordMessage.innerHTML ="You can now hop on board the metro SAFE TRAVELS!!"
    }else{
        passwordMessage.innerHTML ="Wrong password so acess is denied"
    }
}
function renderInventory(inventory){
    InventoryDiv.innerHTML = "";
    let h1=document.createElement("h1")
    h1.innerHTML = "Inventory"
    InventoryDiv.append(h1)
    let inventoryList = document.createElement("ul")

    for(let i=0;i<inventory.length;i++){
        let inventoryListbullet = document.createElement("li")
        inventoryListbullet.innerHTML = inventory[i];
        inventoryList.append(inventoryListbullet);



    }
    InventoryDiv.append(inventoryList)

}

renderRoom(rooms[1]);