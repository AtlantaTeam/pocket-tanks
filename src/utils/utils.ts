const playElement = (element: HTMLAudioElement, callback?: () => void) => {
    element.play()
        .then(() => (callback ? callback() : () => (true)))
        .catch((error) => {
            console.log('Не удалось запустить аудио, необходимо взаимодействие со страницей.',
                error);
        });
};

export const mediaSafePlay = (element: HTMLAudioElement | undefined, isRetry?: boolean) => {
    if (!element) {
        return;
    }
    if (isRetry) {
        const playAttempt = setInterval(() => {
            playElement(element, () => { clearInterval(playAttempt); });
        }, 5000);
    } else {
        playElement(element);
    }
};
