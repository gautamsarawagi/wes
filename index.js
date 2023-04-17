    const express = require('express');
    const bodyParser = require('body-parser');
    const path = require('path');
    const uuid = require('uuid');
    
    const app = express();
    const port = 3000;
    
    app.set('view engine', 'ejs');
    
    // Dummy data for testing
    let entries = [
        {
        id: uuid.v4(),
        name: 'John Doe',
        email: 'john@example.com'
        },
        {
        id: uuid.v4(),
        name: 'Jane Doe',
        email: 'jane@example.com'
        }
    ];
    
    // Middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));
    
    // Routes
    app.get('/', (req, res) => {
        res.render('view-entries', { entries });
    });
    
    app.get('/add', (req, res) => {
        res.render('add-entry');
    });
    
    app.post('/add', (req, res) => {
        const { name, email } = req.body;
        const newEntry = { id: uuid.v4(), name, email };
        entries.push(newEntry);
        res.redirect('/');
    });
    
    app.get('/edit/:id', (req, res) => {
        const { id } = req.params;
        const entry = entries.find((e) => e.id === id);
        if (!entry) {
        return res.status(404).send('Entry not found');
        }
        res.render('edit-entry', { entry });
    });
    
    app.post('/edit/:id', (req, res) => {
        const { id } = req.params;
        const { name, email } = req.body;
        const entry = entries.find((e) => e.id === id);
        if (!entry) {
        return res.status(404).send('Entry not found');
        }
        entry.name = name;
        entry.email = email;
        res.redirect('/');
    });
    
    // Start server
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    app.get('/send-to-serial/:id', (req, res) => {
    const { id } = req.params;
    const entry = entries.find((e) => e.id === id);
    if (!entry) {
        return res.status(404).send('Entry not found');
    }
    const data = JSON.stringify(entry); // convert the entry object to JSON string
    serialPort.write(data); // send the data to the virtual serial port
    res.send('Data sent to serial port');
    });
    