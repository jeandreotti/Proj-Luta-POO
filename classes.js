//knight ou Sorcerer -  Guerreiro ou Mago 
//littleMonster ou BigMonster 

class Character{

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }

    get life() {
        return this._life;
    }
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife; // [newLife < 0(condição) ? 0(valorSeTrue) : newlife(valorSeFalse)] se newLife for menor que 0, recebe true(ou recebe 0), e se for falsa recebe false(ou recebe newLife).
        //var cargo = salario <= 1000 ? 'junior' : salario <= 5000 ? 'senior' : diretor

        //var x;
        //if(foo) {x=10;} else {x=20;}

        //var x = 20;
        //if(foo) x=10;

        //var x = foo ? 10 : 20;   
    }
}

class Knight extends Character{
    constructor(name){
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = this.life;
    }
}
class Sorcerer extends Character{
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super('little monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super('big monster');
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject){
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start(){
        this.update();
        //TODO: Evento do botão de atacar

        this.fighter1El.querySelector('.attackButton').addEventListener('click' , () => this.doAttack(this.fighter1, this.fighter2) );

        this.fighter2El.querySelector('.attackButton').addEventListener('click' , () => this.doAttack(this.fighter2, this.fighter1 ) );
    }

    update() {
        //fighter 
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life} HP `;

        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        //fighter 2
        this.fighter2El.querySelector('.name').innerHTML =  `${this.fighter2.name} - ${this.fighter2.life} HP `;

        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
        this.log.addMessage(`${attacking.name} está atacando ${attacked.name}`)

        if(attacking.life <= 0 || attacked.life <= 0 ) {
            this.log.addMessage('morto');
        return;
        }
        //variavel.toFixed(2).replace("." , ",");

        let attackFactor = (Math.random() * 2).toFixed(2);
        this.log.addMessage('fator de ataque: ' + attackFactor);
        let defenseFactor = (Math.random() *2).toFixed(2);
        this.log.addMessage('fator de defesa: ' + defenseFactor);

        let actualAttack = attacking.attack * attackFactor;
        this.log.addMessage('Ataque Atual: ' + actualAttack);
         let  actualDefense = attacked.defense * defenseFactor; 
         this.log.addMessage('Defesa Atual: ' + actualDefense);

         if(actualAttack > actualDefense) {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
         } else{
            this.log.addMessage(`${attacked.name} conseguiu defender`)
         }
         this.log.addMessage('-----------------------------------');

        this.update();
    }   
}

class Log{
    list = [];

    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg){
        this.list.push(msg);
        this.list.unshift(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML = '';

        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }

} 