const	express	=	require('express');
const	hbs		=	require('hbs');
const	fs		=	require('fs');

var	app	=	express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((request, response, next) =>
{
	var	now	=	new Date().toString();
	var	msg	=	`${now} ${request.method} ${request.url}`;
	console.log(msg);
	fs.appendFile('server.log', msg + '\n', (error) =>
	{
		if (error)
		{
			console.log('unable to append to server log');
		}
	});
	
	next();
});

app.use((request, response, next) =>
{
	response.render('maintenance.hbs');
	// NOTE NO next();
});

hbs.registerHelper('getCurrentYear', () =>
{
	return	new Date().getFullYear();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) =>
{
	return	text.toUpperCase();
});

app.get('/', (request, response) =>
{
//	response.send('<h1>Hello Express</h1>');
/*
	response.send({
			name: 'Jeremy',
			likes: [
				'eating',
				'drinking',
				'sleeping',
	]});
*/
	response.render('home.hbs', {
			pageTitle: 		'Home Page',
//			currentYear:	new Date().getFullYear(),
			welcomeMessage:	'Welcome to our website',
	});
});

app.get('/about', (request, response) =>
{
//	response.send('<h1>About Page</h1>');
	response.render('about.hbs', {
			pageTitle: 		'About Page',
//			currentYear:	new Date().getFullYear(),
	});
});

app.get('/bad', (request, response) =>
{
	response.send({
			errorMessage: 'Can not complete request',
			});
});
app.listen(3000, () =>
{
	console.log('server is up on port 3000');
});

