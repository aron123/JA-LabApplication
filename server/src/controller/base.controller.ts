import { Repository } from "typeorm";

export abstract class Controller {
    repository: Repository<any>;

    getAll = async (req, res) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getOne = async (req, res) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOneBy({ id: id });
            if (!entity) {
                return this.handleError(res, null, 404, 'Not found.');
            }

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req, res) => {
        try {
            const entity = this.repository.create(req.body as object);
            entity.id = null;            

            const result = await this.repository.save(entity);
            
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    update = async (req, res) => {
        try {
            let entity = await this.repository.findOneBy({ id: req.body.id });
            if (!entity || !req.body.id) {
                return this.handleError(res, null, 404, 'No entity found with this id.');
            }

            entity = this.repository.create(req.body as object);
            const result = await this.repository.save(entity);
 
            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    delete = async (req, res) => {
        try {
            const entityToDelete = await this.repository.findOneBy({
                id: req.params.id
            });

            if (!entityToDelete) {
                return this.handleError(res, null, 404, 'Not found.');
            }

            await this.repository.remove(entityToDelete);
            res.status(200).send();
        } catch (err) {
            this.handleError(res, err);
        }
    };

    handleError(res, err = null, status = 500, message = 'Unexpected server error') {
        if (err) {
            console.error(err);
        }

        res.status(status);
        res.json({ error: message });
    }
}