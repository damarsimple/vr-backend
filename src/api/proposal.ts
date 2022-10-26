import { Router } from "express";
import prisma from "../context";
import { Prisma } from '@prisma/client'
import { extractFromParam } from '../modules/extractor';

export default function proposals(router: Router) {

    router.get("/", (req, res) => {
        // #swagger.tags = ['Proposals']
        //  #swagger.parameters['orderBy'] = { description: 'Order by' }
        //  #swagger.parameters['take'] = { description: 'Take' }
        //  #swagger.parameters['skip'] = { description: 'Skip' }
        // #swagger.description = 'Get all proposals'

        prisma.proposal.findMany(extractFromParam(req)).then(proposals => {
            res.json(proposals);
        });
    });

    router.get("/:id", (req, res) => {
        // #swagger.tags = ['Proposals']
        // #swagger.description = 'Get a proposal by id'
        prisma.proposal.findUnique({
            where: {
                id: Number(req.params.id)
            }
        }).then(proposal => {
            res.json(proposal);
        });
    });

    router.post("/", (req, res) => {
        // #swagger.tags = ['Proposals']
        // #swagger.description = 'Create a new proposal'
        prisma.proposal.create({
            data: {
                ...req.body,
            }
        }).then(proposal => {
            res.json(proposal);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })

    });

    router.put("/:id", (req, res) => {
        // #swagger.tags = ['Proposals']
        // #swagger.description = 'Update a proposal'
        prisma.proposal.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                ...req.body
            }
        }).then(proposal => {
            res.json(proposal);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });
    router.delete("/:id", (req, res) => {
        // #swagger.tags = ['Proposals']
        // #swagger.description = 'Delete a proposal'
        prisma.proposal.delete({
            where: {
                id: Number(req.params.id)
            }
        }).then(proposal => {
            res.json(proposal);
        }).catch(e => {
            res.status(500).json({ error: e.message });
        })
    });


    return router;

}