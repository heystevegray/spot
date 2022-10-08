try {
    self.addEventListener('install', function (event) {
        console.log('Hello world from the Service Worker 🤙');
    });
} catch (error) {
    console.log(error);
}
