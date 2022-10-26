import { Router } from "express";
import prisma from "../context";
import { Prisma } from '@prisma/client'
import { extractFromParam } from "../modules/extractor";

export default function media(router: Router) {

    router.get("/", (req, res) => {
        // #swagger.tags = ['Media']
        //  #swagger.parameters['orderBy'] = { description: 'Order by' }
        //  #swagger.parameters['take'] = { description: 'Take' }
        //  #swagger.parameters['skip'] = { description: 'Skip' }
        // #swagger.description = 'Get all media'
        prisma.media.findMany(extractFromParam(req)).then(media => {
            res.json(media);
        });
    });

    router.get("/:id", (req, res) => {
        // #swagger.tags = ['Media']
        // #swagger.description = 'Get a media by id'
        prisma.media.findUnique({
            where: {
                id: Number(req.params.id)
            }
        }).then(media => {
            res.json(media);
        });
    });

    router.post("/", (req, res) => {
        // #swagger.tags = ['Media']
        // #swagger.description = 'Endpoint to create a media.'
        prisma.media.create({
            data: {
                ...req.body,
            }
        }).then(media => {
            res.json(media);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })

    });

    router.put("/:id", (req, res) => {
        // #swagger.tags = ['Media']
        // #swagger.description = 'Update a media'
        prisma.media.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        }).then(media => {
            res.json(media);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });
    router.delete("/:id", (req, res) => {
        // #swagger.tags = ['Media']
        // #swagger.description = 'Delete a media'
        prisma.media.delete({
            where: {
                id: Number(req.params.id)
            }
        }).then(media => {
            res.json(media);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });


    return router;

}