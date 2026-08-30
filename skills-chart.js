(function () {
    const canvas = document.getElementById('skillsRadarChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const labels = JSON.parse(canvas.dataset.labels || '[]');
    const values = JSON.parse(canvas.dataset.values || '[]');
    const legendTitle = canvas.dataset.legend || 'Niveau';

    const ctx = canvas.getContext('2d');
    const size = Math.min(canvas.clientWidth || 400, canvas.clientHeight || 400);
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 10, center, center, center * 0.9);
    gradient.addColorStop(0, 'rgba(14, 165, 233, 0.45)');
    gradient.addColorStop(1, 'rgba(12, 30, 58, 0.12)');

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: legendTitle,
                data: values,
                backgroundColor: gradient,
                borderColor: '#0ea5e9',
                borderWidth: 2.5,
                pointBackgroundColor: '#d4a853',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: '#0c1e3a',
                pointHoverBorderColor: '#0ea5e9'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 20,
                        showLabelBackdrop: false,
                        color: '#94a3b8',
                        font: { size: 11, family: 'Inter, system-ui, sans-serif' },
                        callback: function (value) {
                            return value + '%';
                        }
                    },
                    pointLabels: {
                        color: '#0c1e3a',
                        font: {
                            size: 12,
                            weight: '600',
                            family: 'Inter, system-ui, sans-serif'
                        }
                    },
                    grid: {
                        color: 'rgba(14, 165, 233, 0.18)'
                    },
                    angleLines: {
                        color: 'rgba(12, 30, 58, 0.12)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#0c1e3a',
                    titleColor: '#ffffff',
                    bodyColor: '#e0f2fe',
                    borderColor: '#0ea5e9',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function (context) {
                            return context.parsed.r + ' %';
                        }
                    }
                }
            }
        }
    });
})();
