require('dotenv').config();

const apiKey = process.env.API_SECRET;
console.log(`Your API key is: ${apiKey}`);

const canvas = document.getElementById('barChart');
const ctx = canvas.getContext('2d');

// Data Configuration
const data = {
    "A": 45,
    "B": 80,
    "C": 55,
    "D": 90,
    "E": 30
};

// Set internal canvas resolution
canvas.width = 500;
canvas.height = 300;

const padding = 40;
const chartWidth = canvas.width - padding * 2;
const chartHeight = canvas.height - padding * 2;
const barWidth = chartWidth / Object.keys(data).length - 10;
const maxValue = Math.max(...Object.values(data));

function drawChart() {
    let x = padding + 5;

    Object.entries(data).forEach(([label, value]) => {
        // Calculate bar height relative to max value
        const barHeight = (value / maxValue) * chartHeight;
        
        // Draw Bar
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(x, canvas.height - padding - barHeight, barWidth, barHeight);

        // Draw Label
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth / 2, canvas.height - padding + 20);

        // Draw Value atop bar
        ctx.fillText(value, x + barWidth / 2, canvas.height - padding - barHeight - 5);

        x += barWidth + 10;
    });

    // Draw Baseline
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
}

drawChart();