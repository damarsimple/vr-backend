import { Router } from "express";
import prisma from "../context";
import { extractFromParam } from '../modules/extractor';

export default function mediaEvent(router: Router) {

    router.get("/mediaEvent", (req, res) => {
        // #swagger.tags = ['MediaEvent']
        //  #swagger.parameters['orderBy'] = { description: 'Order by' }
        //  #swagger.parameters['take'] = { description: 'Take' }
        //  #swagger.parameters['skip'] = { description: 'Skip' }
        // #swagger.description = 'Get all media events'
        prisma.mediaEvent.findMany(extractFromParam(req)).then(mediaEvent => {
            res.json(mediaEvent);
        });
    });

    router.get("/mediaEvent:id", (req, res) => {
        // #swagger.tags = ['MediaEvent']
        prisma.mediaEvent.findUnique({
            where: {
                id: Number(req.params.id)
            }
        }).then(mediaEvent => {
            res.json(mediaEvent);
        });
    });

    router.post("/mediaEvent", (req, res) => {
        // #swagger.tags = ['MediaEvent']
        // #swagger.description = 'Endpoint to create a mediaEvent.'
        prisma.mediaEvent.create({
            data: {
                ...req.body,
            }
        }).then(mediaEvent => {
            res.json(mediaEvent);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })

    });

    router.put("/mediaEvent/:id", (req, res) => {
        // #swagger.tags = ['MediaEvent']
        // #swagger.description = 'Update a mediaEvent'
        prisma.mediaEvent.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        }).then(mediaEvent => {
            res.json(mediaEvent);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });

    router.delete("/mediaEvent/:id", (req, res) => {
        // #swagger.tags = ['MediaEvent']
        // #swagger.description = 'Delete a mediaEvent'
        prisma.mediaEvent.delete({
            where: {
                id: Number(req.params.id)
            }
        }).then(mediaEvent => {
            res.json(mediaEvent);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });

    return router;

}