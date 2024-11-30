import { stats } from './stats.js';

const ctx = document.getElementById('statsGraph').getContext('2d');

const statsGraph = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Fuerza', 'Destreza', 'Agilidad', 'Aguante', 'Resistencia'],
        datasets: [{
            label: 'Stats Progress',
            data: [
                stats.strength,
                stats.dexterity,
                stats.agility,
                stats.endurance,
                stats.resistance
            ],
            borderColor: 'rgba(0, 255, 0, 1)', // Color del borde
            backgroundColor: 'rgba(0, 255, 0, 0.1)', // Fondo transparente
            borderWidth: 2, // Ancho del borde
            pointBackgroundColor: 'rgba(0, 255, 0, 1)', // Color de los puntos
        }]
    },
    options: {
        responsive: true,
        scales: {
            r: {
                angleLines: {
                    display: true, // Muestra líneas desde el centro hacia las etiquetas
                    color: 'rgba(255, 255, 255, 0.8)', // Color de las líneas radiales
                },
                grid: {
                    circular: false, // Usa líneas poligonales (como la imagen)
                    color: 'rgba(255, 255, 255, 0.8)', // Color de las líneas de la cuadrícula
                },
                ticks: {
                    display: false, // Oculta los valores de las divisiones
                },
                pointLabels: {
                    display: true, // Muestra las etiquetas
                    color: 'rgba(255, 255, 255, 1)', // Color de las etiquetas (Intel, Physical, etc.)
                    font: {
                        size: 12, // Tamaño de fuente
                        family: "'Arial', sans-serif"
                    }
                },
                suggestedMin: 0, // Valor mínimo
                suggestedMax: 100 // Valor máximo
            }
        },
        plugins: {
            legend: {
                display: false // Oculta la leyenda
            }
        }
    }
});


// Actualiza el gráfico al cambiar las estadísticas
document.addEventListener('statsChanged', () => {
    statsGraph.data.datasets[0].data = [
        stats.strength,
        stats.dexterity,
        stats.agility,
        stats.endurance,
        stats.resistance
    ];
    statsGraph.update();
});