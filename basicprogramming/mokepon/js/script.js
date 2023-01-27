const petsList = ["hipodoge", "capipepo", "ratigueya", "langostelvis", "tucapalma", "pydos"];

let petChosen = false;
let petLives; 
let enemyPetLives;
let hearts = ['😵','❤','❤❤','❤❤❤'];
let petName;
let enemyPetName;
let petAttack;
let enemyPetAttack;
let attackButtonTackle;
let attackButtonFire;
let attackButtonWater;
let attackButtonPlant;

let sectionChooseAttack = document.getElementById('choose-attack');
let sectionChooseAPet = document.getElementById('choose-pet');
let restartButton = document.getElementById('btn-restart');
let petButtonPlayer = document.getElementById('btn-pet');
let petAttackMessages = document.getElementById('pet-attack-messages');
let enemyPetAttackMessages = document.getElementById('enemy-pet-attack-messages');

class Mokepon{
    constructor(name, foto, live){
        this.name = name;
        this.foto = foto;
        this.live = live;
    }
}

let hipodoge = new Mokepon('Hipodoge', "./images/mokepons_mokepon_hipodoge_attack.png", hearts[3]);
let capipepo = new Mokepon('Capipepo', "./images/mokepons_mokepon_capipepo_attack.png", hearts[3]);
let ratigueya = new Mokepon('Ratigueya', "./images/mokepons_mokepon_ratigueya_attack.png", hearts[3]);
let langostelvis = new Mokepon('Langostelvis', "./images/mokepons_mokepon_langostelvis_attack.png", hearts[3]);
let tucapalma = new Mokepon('Tucapalma', "./images/mokepons_mokepon_tucapalma_attack.png", hearts[3]);
let pydos = new Mokepon('Pydos', "./images/mokepons_mokepon_pydos_attack.png", hearts[3]);


function toUpperCaseFirst(name){
    return (name.charAt(0).toUpperCase()+name.slice(1));
};

function random(max, min){
    return Math.floor(Math.random()*(max-min+1)+min);
};

function beginGame(){
    
    petChosen = false;
    petLives = 3;
    enemyPetLives = 3;

    sectionChooseAttack.style.display = 'none';
    sectionChooseAPet.style.display = 'flex';

    restartButton.style.display = 'none';
    restartButton.addEventListener('click', restartGame);
    petButtonPlayer.addEventListener('click', selectPet );
    attackButtonTackle = document.getElementById('btn-attack-tackle');
    attackButtonTackle.addEventListener('click', attackTackle );
    attackButtonFire = document.getElementById('btn-attack-fire');
    attackButtonFire.addEventListener('click', attackFire );
    attackButtonWater = document.getElementById('btn-attack-water');
    attackButtonWater.addEventListener('click', attackWater );
    attackButtonPlant = document.getElementById('btn-attack-plant');
    attackButtonPlant.addEventListener('click', attackPlant );

}

function restartGame(){
    petChosen = false;
    petLives = 3;
    enemyPetLives = 3;
    document.getElementById('pet-lives').innerHTML = hearts[petLives];
    document.getElementById('enemy-pet-lives').innerHTML = hearts[enemyPetLives];
    petName = null;
    enemyPetName = null;
    petAttack = null;
    enemyPetAttack = null;
    document.getElementById('pet-name').innerHTML = '';
    document.getElementById('enemy-pet-name').innerHTML = '';
    attackMessage1 = document.getElementById('pet-attack-messages');
    attackMessage2 = document.getElementById('enemy-pet-attack-messages');
    //attackMessages = document.getElementsByClassName('attack-messages');
    while(attackMessage1.firstChild || attackMessage2.firstChild ){
        attackMessage1.removeChild(attackMessage1.firstChild);;
        attackMessage2.removeChild(attackMessage2.firstChild);};
    delete attackMessage1;
    delete attackMessage2;
    
    
    attackButtonTackle = document.getElementById('btn-attack-tackle');
    attackButtonTackle.disabled = true;
    attackButtonFire = document.getElementById('btn-attack-fire');
    attackButtonFire.disabled = true;
    attackButtonWater = document.getElementById('btn-attack-water');
    attackButtonWater.disabled = true;
    attackButtonPlant = document.getElementById('btn-attack-plant');
    attackButtonPlant.disabled = true;
    beginGame();
};

function updatePetsLives(){
    document.getElementById('pet-lives').innerHTML = hearts[petLives];
    document.getElementById('enemy-pet-lives').innerHTML = hearts[enemyPetLives];
};

//If returned 0, the attack was missed.
function attackNotMissed(){
    notMissed = random(-1, 3);
    return notMissed
};
function attackTackle(){
    if (petLives == 0 && enemyPetLives ==0){
        //gameFinished(tie=true)
    } else if(petLives > 0 && enemyPetLives > 0){
        if(attackNotMissed()){
            enemyPetLives = enemyPetLives - 1;
            petAttack = 'tackle💥';
            updatePetsLives();
        } else{petAttack = '...missed!';};
        enemyAttack();
    } else{gameFinished();};
};

function attackFire(){
    if (petLives == 0 && enemyPetLives ==0){
        //gameFinished(tie=true)
    } else if (petLives > 0 && enemyPetLives > 0 ){
        //is pet able to do this attack?
        if(petName == 'ratigueya' || petName == 'langostelvis' || petName == 'pydos'){
            if(attackNotMissed()){
                enemyPetLives = enemyPetLives -1;
                petAttack = 'fire🔥';
                updatePetsLives();
            } else{petAttack = '...missed!';};
            enemyAttack();
        } else {alert(toUpperCaseFirst(petName) + ' can not attack with fire! choose another attack.')}
    } else {gameFinished();};
};

function attackWater(){
    if (petLives == 0 && enemyPetLives ==0){
        //gameFinished(tie=true)
    } else if (petLives > 0 && enemyPetLives > 0 ){
        //is pet able to do this attack?
        if(petName == 'hipodoge' || petName == 'langostelvis' || petName == 'tucapalma'){
            if(attackNotMissed()){
                enemyPetLives = enemyPetLives -1;
                petAttack = 'water💧';
                updatePetsLives();
            } else{petAttack = '...missed!';};
            enemyAttack();
        } else {alert(toUpperCaseFirst(petName) + ' can not attack with water! choose another attack.')}
    } else {gameFinished();};
};

function attackPlant(){
    if (petLives == 0 && enemyPetLives ==0){
        //gameFinished(tie=true)
    } else if (petLives > 0 && enemyPetLives > 0 ){
        //is pet able to do this attack?
        if(petName == 'capipepo' || petName == 'tucapalma' || petName == 'pydos'){
            if(attackNotMissed()){
                enemyPetLives = enemyPetLives -1;
                petAttack = 'plant🌱';
                updatePetsLives();
            } else{petAttack = '...missed!';};
            enemyAttack();
        } else {alert(toUpperCaseFirst(petName) + ' can not attack with plant! choose another attack.')}
    } else {gameFinished();};
};

// from 1 to 3, choose an attack for the enemy.
function randomEnemyAttack(attackNumbs){
    return random(0,attackNumbs+1);
};

function enemyAttack(){
    let attackNum = 0;
    if (true){
        if(enemyPetName == 'hipodoge'){
            if(attackNotMissed()){
                attackNum = randomEnemyAttack(2);
               if(attackNum == 1){
                   enemyPetAttack = 'tackle💥';
                   petLives = petLives -1;
                   updatePetsLives();
                   createMessage();
               } else if(attackNum == 2){
                   enemyPetAttack = 'water💧';
                   petLives = petLives -1;
                   updatePetsLives();
                   createMessage();
               };
            } else{enemyPetAttack = '...missed!';createMessage();};
        } else if (enemyPetName == 'capipepo'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(2);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'plant🌱';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPetName == 'ratigueya'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(2);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'fire🔥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPetName == 'langostelvis'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(3);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'fire🔥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }else if(attackNum == 3){
                       enemyPetAttack = 'water💧'
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPetName == 'tucapalma'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(3);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'plant🌱';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }else if(attackNum == 3){
                       enemyPetAttack = 'water💧'
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }else if (enemyPetName == 'pydos'){
                if(attackNotMissed()){
                    attackNum = randomEnemyAttack(3);
                   if(attackNum == 1){
                       enemyPetAttack = 'tackle💥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   } else if(attackNum == 2){
                       enemyPetAttack = 'plant🌱';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }else if(attackNum == 3){
                       enemyPetAttack = 'fire🔥';
                       petLives = petLives -1;
                       updatePetsLives();
                       createMessage();
                   }; 
                } else{enemyPetAttack = '...missed!';createMessage();};
            
        }
    }
    if(petLives == 0 || enemyPetLives == 0){
        if(petLives == 0 && enemyPetLives == 0){
            gameFinished(tie=true);
        } else{gameFinished();}
        //TO-DO: with the lines above, I think parts of the pet attack's functions can be errased bc the game is finished here.. but too lazy right now to do it :P 
    }
};

//Player's pet selection logic when "select" button pressed
function selectPet(){
    let notSelected = true;

    sectionChooseAttack.style.display = 'flex';
    sectionChooseAPet.style.display = 'none';

    attackButtonTackle = document.getElementById('btn-attack-tackle');
    attackButtonTackle.disabled = false;
    attackButtonFire = document.getElementById('btn-attack-fire');
    attackButtonFire.disabled = false;
    attackButtonWater = document.getElementById('btn-attack-water');
    attackButtonWater.disabled = false;
    attackButtonPlant = document.getElementById('btn-attack-plant');
    attackButtonPlant.disabled = false;
    if (!petChosen){
        petChosen = true;
        for(let i in petsList){
            if(document.getElementById(petsList[i]).checked){
                petName = petsList[i];
                document.getElementById('pet-name').innerHTML = toUpperCaseFirst(petName);
                notSelected = false;
                //alert('You have selected: ' + toUpperCaseFirst(petName));
                selectEnemyPet();
                document.getElementById('enemy-pet-name').innerHTML = toUpperCaseFirst(enemyPetName);
            } 
        }
        if(notSelected){
            alert("You must select a pet!!");
        }
    } else {alert('Pet has been chosen! You must restart to select another pet.')};
};

//Randomly choose enemy pet after player selected pet
function selectEnemyPet(){
    enemyPetName = document.getElementById('enemy-pet-name').innerHTML;
    enemyPetName = petsList[random(-1,petsList.length)];
    //setting to uppercase enemy pet name
    //enemyPetName = enemyPetName;
};

function createMessage(){
    let paragraph1 = document.createElement('p');
    let paragraph2 = document.createElement('p');
    //pet messages
    //paragraph1.innerHTML = 'Your pet attacked with ' + petAttack; 
    paragraph1.innerHTML = petAttack; 
    paragraph1.classList.add('attack-message-box');

    petAttackMessages.appendChild(paragraph1);
    //enemy messages
    //paragraph2.innerHTML = 'Enemy pet attacked with ' + enemyPetAttack;
    paragraph2.innerHTML = enemyPetAttack;
    paragraph2.classList.add('attack-message-box');
    enemyPetAttackMessages.appendChild(paragraph2);

};

//Alert that someone has been defeted
function gameFinished(tie=false){
    restartButton.style.display = 'block';
    
    if(tie){
        setTimeout(function(){ alert("Both pets can not move... it has been a tie😯");}, 600 );
    } else if (petLives == 0){
        setTimeout(function(){alert("You have lost 😵");} , 600) ;
    } else{setTimeout(function(){ alert("Enemy pet have been defeated 🏆");} , 600); };

};

window.addEventListener('load', beginGame);
