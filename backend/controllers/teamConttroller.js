const poll = require('../config/db');

const getTeam = async (req,res)=>{
    try {
        const result = await pool.query('SELECT * FROM team_members');
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const addMember = async (req,res)=>{
    try {
        const{name,role,bio,email} = req.body;
        const query = 'INSERT INTO team_members(name,role,bio,email) VALUES($1,$2,$3,$4) RETURNING *'
        const result = await pool.query(query,[name,role,bio,email])
        res.status(200).json(result.rows[0])
        
    } catch (error) {
        res.status(500).json({error:err.message});
    }
}

module.exports = {getTeam,addMember};