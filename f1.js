fetch('http://ergast.com/api/f1/current/next.json')
    .then(response => response.json())
    .then(data => {
        const raceData = data.MRData.RaceTable.Races[0];
        const raceName = raceData.raceName;
        const raceDate = new Date(raceData.date);
        const raceTime = raceData.time;
        const raceDateTime = new Date(`${raceDate.toDateString()} ${raceTime}`);

        const events = [];

        if (raceData.Qualifying) {
            const qualifyingDate = new Date(raceData.Qualifying.date);
            const qualifyingTime = raceData.Qualifying.time;
            events.push({
                name: 'Qualifying',
                date: new Date(`${qualifyingDate.toDateString()} ${qualifyingTime}`)
            });
        }

        if (raceData.Sprint) {
            const sprintDate = new Date(raceData.Sprint.date);
            const sprintTime = raceData.Sprint.time;
            events.push({
                name: 'Sprint',
                date: new Date(`${sprintDate.toDateString()} ${sprintTime}`)
            });
        }

        if (Array.isArray(raceData.FirstPractice)) {
            raceData.FirstPractice.forEach(practice => {
                const practiceDate = new Date(practice.date);
                const practiceTime = practice.time;
                events.push({
                    name: 'Free Practice',
                    date: new Date(`${practiceDate.toDateString()} ${practiceTime}`)
                });
            });
        } else if (raceData.FirstPractice) {
            const practiceDate = new Date(raceData.FirstPractice.date);
            const practiceTime = raceData.FirstPractice.time;
            events.push({
                name: 'Free Practice',
                date: new Date(`${practiceDate.toDateString()} ${practiceTime}`)
            });
        }

        events.sort((a, b) => a.date - b.date);

        let raceInfo = `Upcoming: ${raceName}<br><br>Race: ${raceDateTime.toDateString()} ${raceDateTime.toLocaleTimeString()}`;
        events.forEach(event => {
            raceInfo += `<br><br>${event.name}: ${event.date.toDateString()} ${event.date.toLocaleTimeString()}`;
        });

        document.getElementById('raceInfo').innerHTML = raceInfo;
    })
    .catch(error => {
        console.error('Error', error);
    });
