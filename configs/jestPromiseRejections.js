// https://github.com/facebook/jest/issues/3251#issuecomment-299183885

// In Node v7 unhandled promise rejections will terminate the process
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
    process.on('unhandledRejection', reason => {
        throw reason;
    });
    // Avoid memory leak by adding too many listeners
    process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
