const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  registerUser: async (req, res) => {
    const { name, email, password, identity_type, identity_number, address } =
      req.body;

    if (!name)
      return res
        .status(400)
        .json({ error: true, message: "name iis required" });

    function isValidEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailRegex.test(email);
    }

    if (!email) {
      return res
        .status(400)
        .json({ error: true, message: "email is requierd" });
    } else if (!isValidEmail(email)) {
      return res.status(400).json({ error: true, Messege: "email not valid" });
    }

    const existingEmail = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return res
        .status(400)
        .json({ error: true, message: "email already registed" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ error: true, message: "password is required" });
    } else if (password.length < 6) {
      return res
        .status(400)
        .json({ error: true, message: "password length must be 8 caracter" });
    }

    if (!identity_type) {
      return res
        .status(400)
        .json({ error: true, message: "identity type is required" });
    }

    if (!identity_number) {
      return res
        .status(400)
        .json({ error: true, message: "identity number is requierd" });
    }

    if (!address) {
      return res
        .status(400)
        .json({ error: true, message: "address is required" });
    }

    try {
      const user = await prisma.users.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          profile: {
            create: {
              identity_type: req.body.identity_type,
              identity_number: req.body.identity_number,
              address: req.body.address,
            },
          },
        },
      });

      const response = {
        ...user,
      };

      return res.status(201).json({
        error: false,
        message: "register user successfully",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, message: "internal server error" });
    }
  },

  // users

  getUser: async (req, res) => {
    const users = await prisma.users.findMany();
    return res.status(200).json({
      error: false,
      message: "success find all user",
      data: users,
    });
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.json({
      data: user,
    });
  },

  getProfile: async (req, res) => {
    const profiles = await prisma.profiles.findMany();
    return res.json({
      data: profiles,
    });
  },

  getProfileById: async (req, res) => {
    const { id } = req.params;
    const profile = await prisma.profiles.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.json({
      data: profile,
    });
  },
};
