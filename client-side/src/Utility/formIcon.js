export function getMoodIcon(group) {
    switch (group) {
        case 'Thunder':
            return 'fas fa-bolt';
        case 'Drizzle':
            return 'fas fa-tint';
        case 'Rain':
            return 'fas fa-umbrella'
        case 'Snow':
            return 'fas fa-snowflake';
        case 'Windy':
            return 'owf owf-905';
        case 'Clear':
            return 'far fa-sun';
        case 'Clouds':
            return 'fas fa-cloud';
        default:
            return 'fas fa-question-circle';
    }
}