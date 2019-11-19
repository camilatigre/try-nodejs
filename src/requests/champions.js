const mongoose = require('mongoose');
const Champions = mongoose.model('Champions');

// list
exports.listChampions = async (req, res) => {
    try {
        const data = await Champions.find({});
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: 'Falha ao carregar os campeões.' });
    };
}

//create
exports.createChampion = async (req, res) => {  
    try {
        
        const champion = new Champions({
            name: req.body.name,
            label: req.body.label,
            type: req.body.type
        });

        await champion.save();

        res.status(201).send({ message: 'Campeão cadastrado com sucesso!' });
    } catch (e) {
        res.status(500).send({ message: 'Falha ao cadastrar o campeão.' });

    };
};