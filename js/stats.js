// Objeto para las estadísticas
export const stats = {
  strength: 15,
  dexterity: 10,
  agility: 10,
  endurance: 25,
  resistance: 15
};


// Objeto para los niveles
export const levels = {
  level: 0,  // Nivel inicial o actual       
  xp: 500000,  // XP almacenada           
  xpTotal: 100,  // XP requerida para subir de nivel    
  points: 0  // Puntos disponibles para mejorar estadísticas
};       


// Objeto para las habilidades
export const skill = {
  damage: 150, // DAMAGE de inicial, depende de la fuerza
  speed: 100,  // SPEED de inicial, depende de la destreza
  skill: [false, false], // Estado de habilidades por agilidad
};


// Funcion que inicializa los niveles/puntos disponibles y los actualiza
export function updateLevels() {
  document.getElementById('level').textContent = levels.level;
  document.getElementById('lvlActual').textContent = levels.level;
  document.getElementById('xp').textContent = levels.xp;
  document.getElementById('xpTotal').textContent = levels.xpTotal;
  document.getElementById('points').textContent = levels.points;
}

// Funcion que inicializa las habilidades y las actualiza
export function updateSkill() {
  document.getElementById('damage').textContent = skill.damage;
  document.getElementById('speed').textContent = skill.speed;
  document.getElementById('skill').textContent = skill.skill;
}


// Función que inicializa las barras y las actualiza
export function updateBars() {
  const healthPercentage = (stats.endurance / 100) * 100;
  const staminaPercentage = (stats.resistance / 100) * 100;
  document.getElementById('healthBar').style.width = `${healthPercentage}%`;
  document.getElementById('staminaBar').style.width = `${staminaPercentage}%`;
}


// Funcion para ganar XP y subir de nivel
export function gainXP() {
  // Asegurarse de que hay suficiente XP para subir un nivel
  if (levels.xp >= levels.xpTotal && levels.level < 350) { // Nivel máximo de 350
    levels.xp -= levels.xpTotal;  // Descontar el XP usado para el nivel actual
    levels.level++;  // Subir un nivel
    levels.points++;  // Ganar 1 punto por cada nivel ganado
    levels.xpTotal = calculateXpRequirement(levels.level);  // Recalcular el XP necesario para el siguiente nivel
    updateLevels();  // Actualizar la UI después de ganar el XP
  }
}


// Calcular la XP requerida para el siguiente nivel
export function calculateXpRequirement(currentLevel) {
  return 100 + (currentLevel - 1) * 30; // Example: each level requires 50 more XP
}


// Funcion para inicializar las estadísticas en HTML
export function initializeStats() {
  for (const stat in stats) {
    document.getElementById(stat).textContent = stats[stat];
  }
  updateLevels();
  updateBars();
  updateSkill();
}


// Función para actualizar estadísticas, consumiendo puntos disponibles.
export function changeStat(stat, change) {
  // Verifica si el cambio es positivo (subir) o negativo (bajar)
  if (change > 0) {
    // Solo permite subir si hay puntos disponibles y la estadística es menor que 100
    if (levels.points > 0 && stats[stat] < 100) {
      let lastStrength = stats.strength;  // Guarda el valor anterior
      let lastSpeed = stats.dexterity;

      stats[stat] += 1;
      levels.points -= 1;

      // Resta 5 puntos de damage y velocidad si la fuerza o destreza subieron
      if (lastStrength < stats.strength) {
        skill.damage += 5;
      }

      if (lastSpeed < stats.dexterity) {
        skill.speed += 5;
      }

      if (stats.agility >= 25 && skill.skill[0] === false) {
        skill.skill[0] = true;
      } else if (stats.agility >= 35 && skill.skill[1] === false) {
        skill.skill[1] = true;
      }
      document.getElementById(stat).textContent = stats[stat];
      updateLevels();
      updateBars();
      updateSkill();
      document.dispatchEvent(new Event('statsChanged')); // Notifica a modulo grafico
    }
  } else if (change < 0) {
    // Solo permite bajar si la estadística es mayor que 0 (no puede ser negativa)
    if (stats[stat] > 0) {
      let lastStrength = stats.strength;  // Guarda el valor anterior
      let lastSpeed = stats.dexterity; 
      stats[stat] -= 1;
      levels.points += 1;

      // Resta 5 puntos de damage y velocidad si la fuerza o destreza subieron
      if (lastStrength > stats.strength) {
        skill.damage -= 5;
      }

      if (lastSpeed > stats.dexterity) {
        skill.speed -= 5;
      }

      if (stats.agility < 25 && skill.skill[0] === true) {
        skill.skill[0] = false;
      } else if (stats.agility < 35 && skill.skill[1] === true) {
        skill.skill[1] = false;
      }
      document.getElementById(stat).textContent = stats[stat];
      updateLevels();
      updateBars();
      updateSkill();
      document.dispatchEvent(new Event('statsChanged')); // Notifica a modulo grafico
    }
  }
}


// Garantiza que los valores se carguen cuando se abre la página
window.changeStat = changeStat;
window.gainXP = gainXP;
window.onload = () => {
  initializeStats();
  updateLevels();
  updateBars();
  updateSkill();
};
