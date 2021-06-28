const User = require("../db/schema/userSchema");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");

// Creating a jsonwebtoken
const maxage = 3 * 24 * 60 * 60;
const createWebToken = (id) =>
{
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: maxage });
}

exports.signIn = async (req, res) =>
{
    const { email, password } = req.body;

    try
    {
        const user = await User.findOne({ email: email });

        if (user)
        {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword)
            {
                const token = createWebToken(user._id);
                return res.status(200).json({ token })
            }
            else
            {
                return res.status(404).json({ error: 'Invalid Credentials' })
            }
        }
        else
        {
            return res.status(404).json({ error: 'No user found' })
        }
    }
    catch (err)
    {
        return res.status(500).json({ error: '500 Internal Error' });
    }
}

exports.signUp = async (req, res) =>
{
    const { email, password } = req.body;

    try
    {
        const salt = bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const created_at = moment().format('MMMM Do YYYY, h:mm:ss a');

        const newUser = await User.create({
            email,
            password
        });

        const token = createWebToken(newUser._id);

        return res.status(200).json({ token })
    }
    catch (err)
    {
        if (err.code === 11000)
        {
            return res.status(500).json({ error: 'Email already registered' });
        }
        return res.status(500).json({ error: '500 Internal Error' });
    }
}