import { Sequelize } from "sequelize";
import User from "../models/UserModel.js";
import argon2 from "argon2";

// sqlinjection on

const seque = new Sequelize("pajak", "root", "root", {
  dialect: "mysql", // ganti dengan dialect yang sesuai
  host: "localhost", // ganti dengan host yang sesuai
});

export const Login = async (req, res) => {
  const user = await seque.query(
    `SELECT * FROM users WHERE email = '${req.body.email}' and password = '${req.body.password}'`,
    { type: Sequelize.QueryTypes.SELECT }
  );

  if (user.length < 1)
    return res
      .status(404)
      .json({ msg: "User tidak ditemukan atau password salah" });

  req.session.userId = user[0].uuid;
  const uuid = user[0].uuid;
  const name = user[0].name;
  const email = user[0].email;
  const role = user[0].role;
  res.status(200).json({ uuid, name, email, role });

  //   {
  //     "email":"yyy' OR 1=1 -- ",
  //     "password":"root"
  //   }

  //   const user = await User.findOne({
  //     where: {
  //       email: req.body.email,
  //     },
  //   });

  //     const user = await seque.query(
  //       `SELECT * FROM users WHERE email = '${req.body.email}'`,
  //       { type: seque.QueryTypes.SELECT }
  //     );

  // if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  // const match = await argon2.verify(user.password, req.body.password);
  // if (!match) return res.status(400).json({ msg: "Wrong Password" });
  // req.session.userId = user.uuid;
  // const uuid = user.uuid;
  // const name = user.name;
  // const email = user.email;
  // const role = user.role;
  // res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
