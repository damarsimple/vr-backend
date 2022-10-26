import express, { Router } from "express";
import places from "./places"
import media from "./media"
import mediaEvent from "./mediaEvent";
import proposal from "./proposal";
import events from "./events";

const router = express.Router({

})


router.use("/places", places(router))
router.use("/media", media(router))
router.use("/mediaEvent", mediaEvent(router))
router.use("/proposal", proposal(router))
router.use("/events", events(router))


export default router;