fetch('http://ergast.com/api/f1/current/next.json')
    .then(response => response.json())
    .then(data => {
        const raceData = data.MRData.RaceTable.Races[0];
        const raceName = raceData.raceName;
        const raceDate = raceData.date;
        const raceTime = raceData.time;
        const raceDateTime = new Date(`${raceDate}T${raceTime}`);

        const events = [];

        if (raceData.Qualifying) {
            const qualifyingDate = raceData.Qualifying.date;
            const qualifyingTime = raceData.Qualifying.time;
            events.push({
                name: 'Qualifying',
                date: new Date(`${qualifyingDate}T${qualifyingTime}`)
            });
        }

        if (raceData.Sprint) {
            const sprintDate = raceData.Sprint.date;
            const sprintTime = raceData.Sprint.time;
            events.push({
                name: 'Sprint',
                date: new Date(`${sprintDate}T${sprintTime}`)
            });
        }

        if (raceData.FirstPractice) {
            const FP1Date = raceData.FirstPractice.date;
            const FP1Time = raceData.FirstPractice.time;
            events.push({
                name: 'Free Practice 1',
                date: new Date(`${FP1Date}T${FP1Time}`)
            });
        }
        if (raceData.SecondPractice) {
            const FP2Date = raceData.SecondPractice.date;
            const FP2Time = raceData.SecondPractice.time;
            events.push({
                name: 'Free Practice 2',
                date: new Date(`${FP2Date}T${FP2Time}`)
            });
        }
        if (raceData.ThirdPractice) {
            const FP3Date = raceData.ThirdPractice.date;
            const FP3Time = raceData.ThirdPractice.time;
            events.push({
                name: 'Free Practice 3',
                date: new Date(`${FP3Date}T${FP3Time}`)
            });
        }

        events.sort((a, b) => a.date - b.date);

        let raceInfo = `<span style="font-size: 30px;">${raceName}</span><br><br>Race: ${raceDateTime.toDateString()} ${raceDateTime.toLocaleTimeString()}`;
        raceInfo += `<br><br>---------------------------------`;
        events.forEach(event => {
            raceInfo += `<br><br>${event.name}: ${event.date.toDateString()} ${event.date.toLocaleTimeString()}`;
        });

        document.getElementById('raceInfo').innerHTML = raceInfo;
    })
    .catch(error => {
        console.error('Error', error);
    });
