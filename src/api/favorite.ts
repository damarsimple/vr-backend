import { Router } from "express";
import prisma from "../context";
import { Prisma } from '@prisma/client'
import { extractFromParam } from '../modules/extractor';

export default function favorites(router: Router) {

    router.get("/", (req, res) => {
        // #swagger.tags = ['Favorites']
        //  #swagger.parameters['orderBy'] = { description: 'Order by' }
        //  #swagger.parameters['take'] = { description: 'Take' }
        //  #swagger.parameters['skip'] = { description: 'Skip' }
        // #swagger.description = 'Endpoint to get all favorites.'
        prisma.favorite.findMany(extractFromParam(req)).then(favorites => {
            res.json(favorites);
        });
    });

    router.get("/:id", (req, res) => {
        // #swagger.tags = ['Favorites']
        // #swagger.description = 'Endpoint to get a favorite by id.'
        prisma.favorite.findUnique({
            where: {
                id: Number(req.params.id)
            }
        }).then(favorite => {
            res.json(favorite);
        });
    });

    router.post("/", (req, res) => {
        // #swagger.tags = ['Favorites']
        // #swagger.description = 'Endpoint to create a favorite.'
        prisma.favorite.create({
            data: {
                ...req.body,
            }
        }).then(favorite => {
            res.json(favorite);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })

    });

    router.put("/:id", (req, res) => {
        // #swagger.tags = ['Favorites']
        // #swagger.description = 'Update a favorite'
        prisma.favorite.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        }).then(favorite => {
            res.json(favorite);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });


    router.delete("/:id", (req, res) => {
        // #swagger.tags = ['Favorites']
        // #swagger.description = 'Delete a favorite'
        prisma.favorite.delete({
            where: {
                id: Number(req.params.id)
            }
        }).then(favorite => {
            res.json(favorite);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });

    return router;

}