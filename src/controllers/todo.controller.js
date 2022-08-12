import Todo from "../models/todo.js";
 
export const get = async (req, res) => {
    try {
        const todo = await Todo.findAll();
        res.send({
            status:"success",
            message:"success",
            data:todo
        }).status(200);
    } catch (err) {
        res.send('data not found');
    }
}
 
export const find = async (req, res) => {
    const id = req.params.id;
    Todo.findByPk(id)
    .then(data => {
      if (data) {
        res.send({
            status:"Success",
            message:"Success",
            data: data
        });
      } else {
        res.status(404).send({
          message: `Cannot find Todo with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Todo with id=" + id
      });
    });
}
 
export const create = async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
          message: "Title can not be empty!"
        });
        return;
      }
    if (!req.body.activity_group_id) {
        res.status(400).send({
          message: "activity_group_id can not be empty!"
        });
        return;
      }
      const todo = {
        activity_group_id : req.body.activity_group_id,
        title: req.body.title,
        is_active: req.body.is_active ? req.body.is_active : false,
        priority: req.body.priority
      };
      Todo.create(todo)
        .then(data => {
          res.send({
            status:"Success",
            message:"Success",
            data: data
          }).status(201);
        })
        .catch(err => {
          res.status(500).send({
            message:"Some error occurred while creating the Todo"
          });
        });
}
 
export const update = async (req, res) => {
    const id = req.params.id;
    Todo.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            status:"Success",
            message: "Success",
            data:req.body
          }).status(200);
        } else {
          res.send({
            message: `data not found`
          }).status(404);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Error updating Todo with id = ${id}`
        });
      });
}
 
export const destroy = async (req, res) => {
    const id = req.params.id;
    Todo.destroy({
      where: { id: id }
    })
      .then(number => {
        if (number == 1) {
          res.send({
            status:"Success",
            message: "Success",
            data:{}
          }).status(200);
        } else {
          res.send({
            message: `Todo with ID ${id} Not Found`
          }).status(401);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete todo with id = ${id}`
        });
      });
}