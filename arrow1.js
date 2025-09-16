const user = {
    name: 'Sija',
    sayHi: function() {
        console.log(`Halo nama saya ${this.name}`);
        setTimeout(() => {
            console.log(`Setelah 1 detik, nama saya ${this.name}`);
        }, 1000);
    }
};

// Memanggil method
user.sayHi();