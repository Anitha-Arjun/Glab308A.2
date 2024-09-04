//Part 1 - Humble Beginnings
//Creating a adventurer with properties and value. Adding the companion Leo and a sub-object to 'Leo'
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  //Robins travel companion
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      inventory: ["small hat", "sunglasses"],
    },
  },
  //Creating a roll method
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20 + 1 + mod);
    console.log(`${this.name} rolled a ${result}`);
  },
};

// console.log(adventurer.inventory[0]);
adventurer.roll();

//Part 2-Class Fantasy
//Creating Character class
class Character {
  //Adding static max_health property to 100
  static max_health = 100;
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20 + 1 + mod);
    return result;
    console.log(`${this.name} rolled a ${result}`);
  }
}

//Recreate Robin using Character class

// const robin = new Character("Robin");
// robin.inventory = ["sword", "potion", "artifact"];
// robin.companion = new Character("Leo");
// robin.companion.type = "Cat";
// robin.companion.companion = new Character("Frank");
// robin.companion.companion.type = "Flea";
// robin.companion.companion.inventory = ["small hat", "sunglasses"];

//Part3 - Class Features

class Adventurer extends Character {
  //Adding static roles
  static roles = ["Fighter", "Healer", "Wizard"];
  constructor(name, role, health) {
    super(name, health);
    {
      this.health = health;
      // Adventurers have specialized roles.
      if (Adventurer.roles.includes(role)) {
        console.log("Role is valid" + name);
        this.role = role;
      } else {
        console.log("Role is invalid" + name);
      }

      // Every adventurer starts with a bed and 50 gold coins.
      this.inventory.push("bedroll", "50 gold coins");
    }
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
  duel(adventurer1) {
    //const result = Math.round(Math.random() * 20 + 1 + adventurer1 - 1);
    //  console.log(`${this.name} rolled a ${result}`);
    // console.log(`${this.health}`);
    //checks the health and adventurer health are greater than 50
    while (this.health > 50 && adventurer1.health > 50) {
      let currentRoll = this.roll();
      let adventurerRoll1 = adventurer1.roll();
      //Reduces the health by 1 if the currentRoll is less than the adventurerRoll
      if (currentRoll < adventurerRoll1) {
        this.health = this.health - 1;
      } else if (adventurerRoll1 < currentRoll) {
        adventurer1.health = adventurer1.health - 1;
      } else {
        console.log("Its Tie -> " + adventurerRoll1 + "- > " + currentRoll);
        continue;
      }

      if (this.health <= 50 && adventurer1.health > 50) {
        console.log(`${adventurer1.name} won!`);
      } else if (adventurer1.health <= 50 && this.health > 50) {
        console.log(`${this.name} won!`);
      } else {
        console.log(
          "No winner - > " + adventurer1.health + "- > " + this.health
        );
      }
    }
  }
}
//creating a companion class
class Companion {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.health = 100;
  }
  sleep() {
    console.log(`${this.name} is sleeping`);
  }
}

const robin = new Adventurer("Robin", "Fighter");
const companion = new Companion("Leo", "Cat");
const companion1 = new Adventurer("Leo");

//Part 5 - Gather your Party
//Creating a AdventurerFactory class
class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
    this.health = 100;
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role, this.health);
    console.log(newAdventurer);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healers = new AdventurerFactory("Healer");
const fighter = new AdventurerFactory("Fighter");

console.log(healers);
const robin1 = healers.generate("Robin");
const alex1 = healers.generate("Alex");

const robin2 = healers.generate("Robin2");
const alex2 = healers.generate("Alex2");

robin1.duel(alex1);
alex2.duel(robin2);
