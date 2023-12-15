import { Group } from '../models/Group.js'
import { User as UserModel } from '../models/User.js'
import { ObjectId } from 'mongodb'

async function getUserIdByName(name) {
    const user = await UserModel.findOne({ username: name })

    if (user){
        return user._id
    } else {
        throw new Error(`Usuário ${name} não encontrado.`);
    }
}

async function checkIfUserExists (names){
    var users = []
    for (const name of names) {
        users.push(await getUserIdByName(name))
    }
    return users
}

async function getUserNameById(id) {
    const user = await UserModel.findById(id)
    return user.username
}

async function getRecipientsNamesByIds(ids) {
    var dests = []
    for (const id of ids) {
        dests.push(await getUserNameById(new ObjectId(id)))
    }
    return dests
}

const groupController = {
    create : async (req, res) => {
        try {

            const people = await checkIfUserExists(req.body.members)
            const group = {
                name: req.body.name,
                members: people
            }
            const response = await Group.create(group)
            res.status(201).json({response, msg: "Grupo criado com sucesso!"})
        } catch (error) {
            res.status(500).json({msg: "Erro ao criar grupo"})
        }
    },

    getUserGroups : async (req, res) => {
        try {
            const response = await Group.find({members: req.params.id})

            let groups = []
            let group = {}

            for (const g of response) {
                group = {
                    id: g._id,
                    name: g.name,
                    members: await getRecipientsNamesByIds(g.members)
                }
                groups.push(group)
            }


            console.log(groups)
            res.status(200).json({groups})
        } catch (error) {
            res.status(500).json({msg: "Erro ao buscar grupos"})
        }
    },

    getGroupById : async (req, res) => {
        try {
            const response = await Group.findById(req.params.id)
            res.status(200).json({response})
        } catch (error) {
            console.log(`ERRO: ${error}`)
            console.log(error)
            res.status(500).json({msg: "Erro ao buscar grupo"})
        }
    },

    delete : async (req, res) => {
        try {
            const response = await Group.findByIdAndDelete(req.params.id)
            res.status(200).json({response, msg: "Grupo deletado com sucesso!"})
        } catch (error) {
            console.log(`ERRO: ${error}`)
            console.log(error)
            res.status(500).json({msg: "Erro ao deletar grupo"})
        }
    },

    update : async (req, res) => {
        try {
            const group = {
                name: req.body.name,
                members: req.body.members
            }
            const response = await Group.findByIdAndUpdate(req.params.id, group)
            res.status(200).json({response, msg: "Grupo atualizado com sucesso!"})
        } catch (error) {
            console.log(`ERRO: ${error}`)
            console.log(error)
            res.status(500).json({msg: "Erro ao atualizar grupo"})
        }
    },

    leaveGroup : async (req, res) => {
        try {
            const group = await Group.findOne({ _id: req.body.group_id, members: req.body.user_id }); 

            if (!group) {
                return res.status(400).json({msg: "Usuário não pertence ao grupo"})
            }

            const response = await Group.findByIdAndUpdate(req.body.group_id, { $pull: { members: req.body.user_id } })
            res.status(200).json({response, msg: "Usuário removido do grupo com sucesso!"})
        } catch (error) {
            
        }

    }

}

export {
    groupController
}