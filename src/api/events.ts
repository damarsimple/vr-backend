import { Router } from "express";
import prisma from "../context";
import { Prisma } from '@prisma/client'
import { extractFromParam } from "../modules/extractor";

export default function events(router: Router) {

    router.get("/", (req, res) => {
        // #swagger.tags = ['Events']
        //  #swagger.parameters['orderBy'] = { description: 'Order by' }
        //  #swagger.parameters['take'] = { description: 'Take' }
        //  #swagger.parameters['skip'] = { description: 'Skip' }
        // #swagger.description = 'Get all events'
        prisma.event.findMany(extractFromParam(req)).then(events => {
            res.json(events);
        });
    });

    router.get("/:id", (req, res) => {
        // #swagger.tags = ['Events']
        // #swagger.description = 'Get a event by id'
        prisma.event.findUnique({
            where: {
                id: Number(req.params.id)
            }
        }).then(event => {
            res.json(event);
        });
    });

    router.post("/", (req, res) => {
        // #swagger.tags = ['Events']
        // #swagger.description = 'Endpoint to create a event.'
        prisma.event.create({
            data: {
                ...req.body,
            }
        }).then(event => {
            res.json(event);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })

    });

    router.put("/:id", (req, res) => {
        // #swagger.tags = ['Events']

        // #swagger.description = 'Update a event'
        prisma.event.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        }).then(event => {
            res.json(event);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });
    router.delete("/:id", (req, res) => {
        // #swagger.tags = ['Events']
        // #swagger.description = 'Delete a event'
        prisma.event.delete({
            where: {
                id: Number(req.params.id)
            }
        }).then(event => {
            res.json(event);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });


    return router;

}