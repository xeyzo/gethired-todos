import Activity from "../models/activity.js";
 
export const get = async (req, res) => {
    try {
        const Activity = await Activity.findAll();
        res.send({
            status:"success",
            message:"success",
            data:Activity
        }).status(200);
    } catch (err) {
        res.send('data not found');
    }
}
 
export const find = async (req, res) => {
    const id = req.params.id;
    Activity.findByPk(id)
    .then(data => {
      if (data) {
        res.send({
            status:"Success",
            message:"Success",
            data: data
        }).status(200);
      } else {
        res.status(404).send({
          message: `Cannot find Activity with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Activity with id=" + id
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
      const activity = {
        title: req.body.title,
        email: req.body.email
      };
      Activity.create(activity)
        .then(data => {
          res.send({
            status:"Success",
            message:"Success",
            data: data
          }).status(201);
        })
        .catch(err => {
          res.status(500).send({
            message:"Some error occurred while creating the Activity"
          });
        });
}
 
export const update = async (req, res) => {
    const id = req.params.id;
    Activity.update(req.body, {
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
          message: `Error updating Activity with id = ${id}`
        });
      });
}
 
export const destroy = async (req, res) => {
    const id = req.params.id;
    Activity.destroy({
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
            message: `Activity with ID ${id} Not Found`
          }).status(401);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete activity with id = ${id}`
        });
      });
}