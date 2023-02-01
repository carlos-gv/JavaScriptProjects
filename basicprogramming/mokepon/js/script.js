//There is a mini hack in the game.. lets see if you can find it ;)

let petChosen = false;
const hearts = ['😵','❤','❤❤','❤❤❤'];
let pet;
let enemyPet;
let petAttacks = [];
let enemyPetAttacks = [];
let mokeponOption;
let petAttack;
let enemyPetAttack;
let attackButtonTackle;
let attackButtonFire;
let attackButtonWater;
let attackButtonPlant;

const sectionChooseAttack = document.getElementById('choose-attack');
const sectionChooseAPet = document.getElementById('choose-pet');
const restartButton = document.getElementById('btn-restart');
const petButtonPlayer = document.getElementById('btn-pet');
const petAttackMessages = document.getElementById('pet-attack-messages');
const attackButtons = document.getElementById('attack-btns');
const enemyPetAttackMessages = document.getElementById('enemy-pet-attack-messages');
const cardsConteiner = document.getElementById('cards-conteiner')

class Mokepon{
    constructor(name, foto, lives, attacks=[]){
        this.name = name;
        this.mayusName = toUpperCaseFirst(name);
        //TO-DO: to be more consistent: either deprecate all 'toUpperCaseFirst' outside the constructor, or 'mayusName' attribute.
        this.foto = foto;
        this.lives = lives;
        this.attacks = attacks;
    }
}


let hipodoge = new Mokepon('hipodoge', "./images/mokepons_mokepon_hipodoge_attack.png", 3);
let capipepo = new Mokepon('capipepo', "./images/mokepons_mokepon_capipepo_attack.png", 3);
let ratigueya = new Mokepon('ratigueya', "./images/mokepons_mokepon_ratigueya_attack.png", 3);
let langostelvis = new Mokepon('langostelvis', "./images/mokepons_mokepon_langostelvis_attack.png", 3);
let tucapalma = new Mokepon('tucapalma', "./images/mokepons_mokepon_tucapalma_attack.png", 3);
let pydos = new Mokepon('pydos', "./images/mokepons_mokepon_pydos_attack.png", 3);

hipodoge.attacks.push(
    {name: 'Tackle💥', id: 'btn-attack-tackle'},
    {name: 'Water💧', id: 'btn-attack-water'}
);

capipepo.attacks.push(
    {name: 'Tackle💥', id: 'btn-attack-tackle'},
    {name: 'Plant🌱', id: 'btn-attack-plant'}
);
ratigueya.attacks.push(
    {name: 'Tackle💥', id: 'btn-attack-tackle'},
    {name: 'Fire🔥', id: 'btn-attack-fire'}
);
langostelvis.attacks.push(
    {name: 'Tackle💥', id: 'btn-attack-tackle'},
    {name: 'Fire🔥', id: 'btn-attack-fire'},
    {name: 'Water💧', id: 'btn-attack-water'}
);
tucapalma.attacks.push(
    {name: 'Tackle💥', id: 'btn-attack-tackle'},
    {name: 'Water💧', id: 'btn-attack-water'},
    {name: 'Plant🌱', id: 'btn-attack-plant'}
);
pydos.attacks.push(
    {name: 'Tackle💥', id: 'btn-attack-tackle'},
    {name: 'Fire🔥', id: 'btn-attack-fire'},
    {name: 'Plant🌱', id: 'btn-attack-plant'}
);

//Base to create a coppied pet and enemy.
const petsList = [hipodoge,capipepo,ratigueya,langostelvis,tucapalma,pydos];

function toUpperCaseFirst(name){
    return (name.charAt(0).toUpperCase()+name.slice(1));
};

//Select a random number in between, excluding the boundaries. Ex: random(1,3) =2. 1 and 3 are excluded.
function random(max, min){
    return Math.floor(Math.random()*(max-min+1)+min);
};

function beginGame(){
    
    petChosen = false;

    sectionChooseAttack.style.display = 'none';
    sectionChooseAPet.style.display = 'flex';

    petsList.forEach((mokepon) => {
        mokeponOption =`
            <input type="radio" name="petChoise" id=${mokepon.name} />
            <label class="mokepon-card" for=${mokepon.name}>
                <p>${mokepon.mayusName}</p>
                <img src=${mokepon.foto} alt=${mokepon.name} />
            </label>
        `
        cardsConteiner.innerHTML += mokeponOption;

    });

    restartButton.style.display = 'none';
    restartButton.addEventListener('click', restartGame);
    petButtonPlayer.addEventListener('click', selectPet );

}

function restartGame(){
    petChosen = false;

    document.getElementById('pet-lives').innerHTML = hearts[pet.lives];
    document.getElementById('enemy-pet-lives').innerHTML = hearts[enemyPet.lives];
    pet = null;
    enemyPet = null;
    petAttack = null;
    enemyPetAttack = null;
    cardsConteiner.innerHTML = '';
    document.getElementById('pet-name').innerHTML = '';
    document.getElementById('enemy-pet-name').innerHTML = '';
    attackMessage1 = document.getElementById('pet-attack-messages');
    attackMessage2 = document.getElementById('enemy-pet-attack-messages');
    //Actually this works bc both have the same number of childs
    while(attackMessage1.firstChild || attackMessage2.firstChild ){
        attackMessage1.removeChild(attackMessage1.firstChild);;
        attackMessage2.removeChild(attackMessage2.firstChild);};
    delete attackMessage1;
    delete attackMessage2;
    
    
    while(attackButtons.firstChild){
        attackButtons.removeChild(attackButtons.firstChild);
    };
    beginGame();
};

function updatePetsLives(){
    document.getElementById('pet-lives').innerHTML = hearts[pet.lives];
    document.getElementById('enemy-pet-lives').innerHTML = hearts[enemyPet.lives];
};

//If returned 0, the attack was missed.
function attackNotMissed(){
    notMissed = random(-1, 3);
    return notMissed
};
function attackTackle(){
        if(pet.lives > 0 && enemyPet.lives > 0){
        if(attackNotMissed()){
            enemyPet.lives = enemyPet.lives - 1;
            petAttack = 'tackle💥';
            updatePetsLives();
        } else{petAttack = '...missed!';};
        enemyAttack();
    } else{gameFinished();};
};

function attackFire(){
        if (pet.lives > 0 && enemyPet.lives > 0 ){
        //is pet able to do this attack?
        if(pet.name == 'ratigueya' || pet.name == 'langostelvis' || pet.name == 'pydos'){
            if(attackNotMissed()){
                enemyPet.lives = enemyPet.lives -1;
                petAttack = 'fire🔥';
                updatePetsLives();
            } else{petAttack = '...missed!';};
            enemyAttack();
        } else {alert(toUpperCaseFirst(pet.name) + ' can not attack with fire! choose another attack.')}
    } else {gameFinished();};
};

function attackWater(){
        if (pet.lives > 0 && enemyPet.lives > 0 ){
        //is pet able to do this attack?
        if(pet.name == 'hipodoge' || pet.name == 'langostelvis' || pet.name == 'tucapalma'){
            if(attackNotMissed()){
                enemyPet.lives = enemyPet.lives -1;
                petAttack = 'water💧';
                updatePetsLives();
            } else{petAttack = '...missed!';};
            enemyAttack();
        } else {alert(toUpperCaseFirst(pet.name) + ' can not attack with water! choose another attack.')}
    } else {gameFinished();};
};

function attackPlant(){
        if (pet.lives > 0 && enemyPet.lives > 0 ){
        //is pet able to do this attack?
        if(pet.name == 'capipepo' || pet.name == 'tucapalma' || pet.name == 'pydos'){
            if(attackNotMissed()){
                enemyPet.lives = enemyPet.lives -1;
                petAttack = 'plant🌱';
                updatePetsLives();
            } else{petAttack = '...missed!';};
            enemyAttack();
        } else {alert(toUpperCaseFirst(pet.name) + ' can not attack with plant! choose another attack.')}
    } else {gameFinished();};
};

// from 1 to 3, choose an attack for the enemy.
function randomEnemyAttack(attackNumbs){
    return random(0,attackNumbs+1);
    //TO-DO: enemyAttack() can be optimized by using the class attributes
};

function enemyAttack(){
    let attackNum = 0;
    if (true){
        if(enemyPet.name == 'hipodoge'){
            if(attackNotMissed()){
                attackNum = randomEnemyAttack(2);
               if(attackNum == 1){
                   enemyPetAttack = 'tackle💥';
                   pet.lives = pet.lives -1;
                   updatePetsLives();
                   createMessage();
               } else if(attackNum == 2){
                   enemyPetAttack = 'water💧';
                   pet.lives = pet.lives -1;
                   updatePetsLives();
                   createMessage();
               };
            } else{enemyPetAttack = '...missed!';createMessage();};
        } else if (enemyPet.name == 'capipepo'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(2);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'plant🌱';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPet.name == 'ratigueya'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(2);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'fire🔥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPet.name == 'langostelvis'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(3);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'fire🔥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }else if(attackNum == 3){
                       enemyPetAttack = 'water💧'
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPet.name == 'tucapalma'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(3);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'plant🌱';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }else if(attackNum == 3){
                       enemyPetAttack = 'water💧'
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPet.name == 'pydos'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(3);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'plant🌱';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }else if(attackNum == 3){
                       enemyPetAttack = 'fire🔥';
                       pet.lives = pet.lives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }
    }
    if(pet.lives == 0 || enemyPet.lives == 0){
        if(pet.lives == 0 && enemyPet.lives == 0){
            gameFinished(tie=true);
        } else{gameFinished();}
        //TO-DO: with the lines above, I think parts of the pet attack's functions can be errased bc the game is finished here.. but too lazy right now to do it :P 
    }
};

//Player's pet selection logic when "select" button pressed
function selectPet(){
    let notSelected = true;

    if (!petChosen){
        for(let i in petsList){
            if(document.getElementById(petsList[i].name).checked){
                petChosen = true;
                sectionChooseAttack.style.display = 'flex';
                sectionChooseAPet.style.display = 'none';
                pet = new Mokepon(petsList[i].name, petsList[i].foto, petsList[i].lives,petsList[i].attacks);
                pet.attacks.forEach((attack)=>{
                    let button = document.createElement("button")
                    button.innerHTML = attack.name; 
                    button.id = attack.id;
                    button.className = "btn-attack";
                    attackButtons.appendChild(button);
                    let attackName = attack.name.slice(0,-2);
                    eval("attackButton"+attackName+ "=button");
                    eval("attackButton"+attackName+".addEventListener('click',"+"attack"+attackName+")");
                })
                document.getElementById('pet-name').innerHTML = toUpperCaseFirst(pet.name);
                notSelected = false;
                selectEnemyPet();
                document.getElementById('enemy-pet-name').innerHTML = toUpperCaseFirst(enemyPet.name);
            } 
        }
        if(notSelected){
            alert("You must select a pet!!");
        }
    } else {alert('Pet has been chosen! You must restart to select another pet.')};
};

//Randomly choose enemy pet after player selected pet
function selectEnemyPet(){
    let randomNum = random(-1,petsList.length);
    enemyPet = new Mokepon(petsList[randomNum].name,petsList[randomNum].foto,petsList[randomNum].lives, petsList[randomNum].attacks);
    document.getElementById('enemy-pet-name').innerHTML = toUpperCaseFirst(enemyPet.name);
};

function createMessage(){
    let paragraph1 = document.createElement('p');
    let paragraph2 = document.createElement('p');
    //pet messages
    paragraph1.innerHTML = petAttack; 
    paragraph1.classList.add('attack-message-box');

    petAttackMessages.appendChild(paragraph1);
    //enemy messages
    paragraph2.innerHTML = enemyPetAttack;
    paragraph2.classList.add('attack-message-box');
    enemyPetAttackMessages.appendChild(paragraph2);

};

//Alert that someone has been defeted
function gameFinished(tie=false){
    restartButton.style.display = 'block';
    
    if(tie){
        setTimeout(function(){ alert("Both pets can not move... it has been a tie😯");}, 600 );
    } else if (pet.lives == 0){
        setTimeout(function(){alert("You have lost 😵");} , 600) ;
    } else{setTimeout(function(){ alert("Enemy pet have been defeated 🏆");} , 600); };

};

window.addEventListener('load', beginGame);
