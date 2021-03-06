const mongoose = require('mongoose');
const User = mongoose.model('User');

// rendring the todo list if any todo is there
exports.todo = async (req, res) => {
    const user = await User.findById(req.user._id);
    // checking if the user have any todos or not
    if (user.todos.length) {
        // if the user have todos then sort them by dates
        // in future if something unexpected  happens due to this aggregate then directly sort todos by date and then group them in the pug file
        const updatedUser = await User.aggregate([
            { $match: { _id: req.user._id } },
            { $unwind: '$todos' },
            { $sort: { 'todos.dueDate': 1 } },
            { $group: { _id: '$_id', todos: { $push: '$todos' } } },
        ]);
        res.render('todos', { updatedUser: updatedUser[0].todos });
    } else res.render('layout');
};

// adding todo
exports.addTodo = async (req, res) => {
    // getting the data form the form
    const add = {
        todos: {
            task: req.body.task,
            dueDate: req.body.dueDate,
            dueTime: req.body.dueTime,
        },
    };

    // finding the user and pushing the data in the database
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: add },
        { new: true }
    ).exec();

    res.redirect('/');
};

// listening for checkbox change for each todos and then updating the database
exports.checkStatus = async (req, res) => {
    await User.findOneAndUpdate(
        { todos: { $elemMatch: { _id: req.params.id } } },
        { $set: { 'todos.$.done': req.body.done } }
    );
};

// listening for click event when someone click the delete button then removing the todo form the database
exports.deleteTodo = async (req, res) => {
    await User.findOneAndUpdate(
        { _id: req.user._id },
        { $pull: { todos: { _id: req.params.id } } }
    );
};
