import { Router } from "express";
import prisma from "../context";
import { Prisma } from '@prisma/client'
import { extractFromParam } from "../modules/extractor";
import { errorHandler } from '../modules/errorHandler';

export default function places(router: Router) {

    router.get("/", (req, res) => {
        //  #swagger.parameters['orderBy'] = { description: 'Order by' }
        //  #swagger.parameters['take'] = { description: 'Take' }
        //  #swagger.parameters['skip'] = { description: 'Skip' }
        // #swagger.tags = ['Places']
        // #swagger.description = 'Endpoint to get all places.'
        prisma.place.findMany(extractFromParam(req)).then(places => {
            res.json(places);
        });
    });

    router.get("/:id", (req, res) => {
        // #swagger.tags = ['Places']
        // #swagger.description = 'Endpoint to get a place by id.'
        prisma.place.findUnique({
            where: {
                id: Number(req.params.id)
            }
        }).then(place => {
            res.json(place);
        });
    });

    router.post("/", (req, res) => {
        // #swagger.tags = ['Places']
        // #swagger.description = 'Endpoint to create a place.'
        prisma.place.create({
            data: {
                ...req.body,
            }
        }).then(place => {
            res.json(place);
        }).catch(e => {
            res.status(500).json({ error: errorHandler(e) });
        })

    });

    router.put("/:id", (req, res) => {
        // #swagger.tags = ['Places']
        // #swagger.description = 'Endpoint to update a place.'
        prisma.place.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        }).then(place => {
            res.json(place);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });

    router.delete("/:id", (req, res) => {
        // #swagger.tags = ['Places']
        // #swagger.description = 'Endpoint to delete a place.'
        prisma.place.delete({
            where: {
                id: Number(req.params.id)
            }
        }).then(place => {
            res.json(place);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });



    return router;

}