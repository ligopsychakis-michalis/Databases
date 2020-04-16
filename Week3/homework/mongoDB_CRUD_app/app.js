const express = require('express');
const db = require('./db');
const app = express();
const Joi = require("joi");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

const collection = 'todo';

const schema = Joi.object().keys({
    todo: Joi.string().required()
});

//get routes
app.get('/', (req,res)=> {
    res.sendFile(__dirname +'/index.html');
});

app.get('/getTodos',(req,res)=> {
    db.getDB().collection(collection).find({}).toArray((err,documents)=> {
        if(err){
            console.log(err);
        }else{
            console.log(documents);
            res.json(documents);
        };
    });
});

//put route
app.put('/:id',(req,res)=> {
    const todoID = req.params.id;
    const userInput = req.body;

    db.getDB().collection(collection).findOneAndUpdate({ _id: db.getPrimaryKey(todoID) }, { $set: { todo: userInput.todo }},{ returnOriginal: false }, 
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.json(result);
            console.log(result);
        };
    });
});

//post route
app.post('/', (req,res)=> {
    const userInput = req.body;
    Joi.validate(userInput,schema, (err,result)=> {
        if(err){
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        }else{
            db.getDB().collection(collection).insertOne(userInput, (err,result)=> {
                if(err){
                    const error = new Error("Failed to insert Todo Document");
                    error.status = 400;
                    next(error);
                }else{
                    res.json({result: result.result, document: result.ops[0], msg : "Successfully inserted Todo!", error: null});
                };
            });
        };
    });
});


//delete route
app.delete('/:id', (req,res)=> {
    const todoID = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id: db.getPrimaryKey(todoID)},
        (err,result)=> {
            if (err){
                console.log(err)
            }else{
                res.json(result);
            }
        }
    );
});

app.use((err,req,res,next)=> {
    res.status(err.status).json({
        error: {
            message: err.message
        }
    });
});

//connect to db and run server
db.connect((err)=> {
    if(err){
        console.log('Unable to connect to database..');
        process.exit(1);
    }else{
        app.listen(3000, () => console.log('Connected to database and listen to port 3000..'));
    };
});