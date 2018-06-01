describe('projects-lambda-test', () => {
    it('projects function should return a string', () => {
        const user = require('./users');
        let p1 = new user();
        expect(typeof p1.getUsers().message).toBe("string");
    });
});

