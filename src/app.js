const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and view location (Default was './views')
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ahmed Afifi'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ahmed Afifi'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a one helpful page',
        name: 'Ahmed Afifi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        // return to stop the get function here
        return res.send({
            error: 'You have to provide an address'
        })
    }

    geocode (req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
    
        forecast (latitude, longitude, (error, data) => {
            if(error){
                return res.send({ error })
            }
    
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });
        });
    });
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            message: 'You have to provide a search term.'
        })
    }

    res.send({
        search: 'Searching ' + req.query.search
    })    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmed Afifi',
        errorMessage: 'Help article not found.'
    });
})

// '*' = match anything else
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ahmed Afifi',
        errorMessage: 'Page not found.'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');  
})