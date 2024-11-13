let habits = [];

function addHabit(name, description, status) {
    const newHabit = { name, description, status };
    habits.push(newHabit);
    displayHabits(); 
}

function removeHabit(index) {
    if (index >= 0 && index < habits.length) { 
        habits.splice(index, 1); 
        displayHabits(currentFilter); 
    }
}

let currentFilter = 'all';

function displayHabits(filter = 'all') {
    const habitList = document.getElementById('habit-list');
    habitList.innerHTML = ''; 

    currentFilter = filter;

    const filteredHabits = habits.filter(habit => filter === 'all' || habit.status === filter);

    filteredHabits.forEach((habit, index) => {
        const habitItem = document.createElement('div');
        habitItem.className = 'habit-card';
        habitItem.innerHTML = `
            <strong>${habit.name}</strong>: ${habit.description} - ${habit.status === 'active' ? 'Не выполнена' : 'Выполнена'} 
            <button onclick="removeHabit(${habits.indexOf(habit)})">Удалить</button>`; 
        habitList.appendChild(habitItem);
    });
}

document.getElementById('habit-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const habitName = document.getElementById('habit-name').value;
    const habitDescription = document.getElementById('habit-description').value;
    const habitStatus = document.getElementById('habit-status').value;

    addHabit(habitName, habitDescription, habitStatus); 
    event.target.reset(); 
});

document.getElementById('status-filter').addEventListener('change', function () {
    const selectedStatus = this.value;
    displayHabits(selectedStatus); 
});
displayHabits();