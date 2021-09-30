//getting randomValue between max and min
function getRandomValue(min, max) {
  const randomValue = Math.floor(Math.random() * (max - min)) + min;
  return randomValue;
}

// vue app
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessage: [],
      btnIsActive:false
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarHealthStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },

    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },

  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        //player lost
        this.winner = "Monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        //player won
        this.winner = "Player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      // Montser lost health
      this.monsterHealth -= attackValue;
      //loging message
      this.addLogMessage('player','attack',attackValue);
      //Monster respond to player
      this.attackPlayer();

    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      //Player lost health
      this.playerHealth -= attackValue;
      //loging message
      this.addLogMessage('monster','attack',attackValue);
    },
    specialAttackMontster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      //Montser lost health
      this.monsterHealth -= attackValue;
      //loging message
      this.addLogMessage('player','specialAttack',attackValue);
      //Monster respond to player
      this.attackPlayer();
      
    },
    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player','healing',healValue);
      //Montser respond to player
      this.attackPlayer();
    },
    //start a  game ...
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
    },
    surrender() {
      this.winner = "Monster";
    },
    addLogMessage(who, what, actionValue) {
        this.logMessage.unshift({
            actionBy:who,
            actionWhat:what,
            actionValue:actionValue

        })
    },
 
  },
});

app.mount("#game");
