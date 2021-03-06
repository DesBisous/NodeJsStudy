// add url-route:
var hello =  async (ctx, next) => {
    var name = ctx.params.name;
    ctx.render('hello.html', {name: name});
};

var index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
     <form action="/signin" method="post">
         <p>Name: <input name="name" value="koa"></p>
         <p>Password: <input name="password" type="password"></p>
         <p><input type="submit" value="Submit"></p>
     </form>`;
};

var signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};
var helloPage =  async (ctx, next) => {
    ctx.render('helloPage.html');
};

module.exports = [
    {
        method: 'GET',
        path: '/hello/:name',
        func: hello
    },
    {
        method: 'GET',
        path: '/',
        func: index
    },
    {
        method: 'POST',
        path: '/signin',
        func: signin
    },
    {
        method: 'GET',
        path: '/helloPage',
        func: helloPage,
    },
]
