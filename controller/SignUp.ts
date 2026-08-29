import express from "express"
import type { Request, Response } from "express"
import zod from "zod"

const data = zod.object({

});
async function SignUp(req: Request, res: Response): Promise<void> {
    try {

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default SignUp