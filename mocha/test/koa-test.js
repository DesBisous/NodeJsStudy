import request from 'supertest';
import app from '../../koa/app';

describe('#test koa app', () => {

    let server = app.listen(9900);

    describe('#test server', () => {

        it('#test GET /', async () => {
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, world!</h1>');
        });

        it('#test GET /hello/邝晓滨', async () => {
            let res = await request(server)
                .get('/hello/Benson')
                .set('Accept', 'application/json; charset=utf-8')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, Benson!</h1>\n');
        });
    });
});
