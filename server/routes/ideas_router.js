import { Router } from "express";
import ideas_functions from "./ideas_functions.js";

const ideasRouter = Router();

ideasRouter.post("/", async (req, res) => {
    const result = await ideas_functions.create(req.body);

    res.status(201).json({ result });
});

ideasRouter.delete("/:id", async (req, res) => {
    const result = await ideas_functions.deleteOne(req.params.id);

    res.status(200).json({ result });
});

ideasRouter.get("/", async (req, res) => {
    const result = await ideas_functions.getAll();

    res.status(200).json({ result });
});

ideasRouter.get("/completed", async (req, res) => {
    const result = await ideas_functions.getCompleted();

    res.status(200).json({ result });
});

ideasRouter.get("/onHold", async (req, res) => {
    const result = await ideas_functions.getOnHold();

    res.status(200).json({ result });
});

ideasRouter.get("/inProgress", async (req, res) => {
    const result = await ideas_functions.getInProgress();

    res.status(200).json({ result });
});

ideasRouter.put("/:id", async (req, res) => {
    const result = await ideas_functions.updateStatus(req.params.id, req.body.title, req.body.status, req.body.ideaDesc);

    res.status(200).json({ result });
});

export default ideasRouter;