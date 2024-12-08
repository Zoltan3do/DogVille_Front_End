export function formatNumber(num, decimals) {
    const r = new RegExp('\\d(?=(\\d{3})+' + (decimals > 0 ? '\\.' : '$') + ')', 'g');
    return num.toFixed(Math.max(0, Math.floor(decimals))).replace(r, '$&,');
}

export function animateCount(element, start, end, duration, decimals = 0) {
    const easingFunction = t => t * (2 - t);
    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easingFunction(progress);
        const currentValue = start + (end - start) * easedProgress;

        element.textContent = currentValue.toFixed(decimals);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = `${end.toFixed(decimals)}+`;
        }
    }

    requestAnimationFrame(animate);
}

export function determinaProfiloPadrone(risposte) {
    const punteggioTotale = risposte.reduce((acc, punteggio) => acc + punteggio, 0);
    if (punteggioTotale >= 15) {
        return "Energico";
    } else if (punteggioTotale >= 11 && punteggioTotale <= 14) {
        return "Curioso";
    } else if (punteggioTotale >= 9 && punteggioTotale <= 10) {
        return "Affettuoso";
    } else if (punteggioTotale >= 5 && punteggioTotale <= 8) {
        return "Tranquillo";
    } else {
        if (risposte[3] === 1 && risposte[5] === 1) {
            return "Indipendente";
        }
        return "Tranquillo";
    }
}

export function calculateCompatibility(profiles, profile1, profile2) {
    const profileData = profiles.find(p => p.type === profile1);
    if (!profileData) {
        return 0;
    }
    if (profile1 === profile2) {
        return 3;
    } else if (profileData.compatibleProfiles.includes(profile2)) {
        return 2;
    }
    return 1;
}
