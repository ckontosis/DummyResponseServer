const util = require("util");
const fastify = require("fastify")({
    logger: false,
});

async function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

//
fastify.addHook("preHandler", async (req, res) => {
    try {
        console.log({
            url: req.url,
            body: req.body,
            headers: req.headers,
        });

        await sleep(120);
        // Respond on call
        res.send({ responseObject: { var1: "string", var2: "number" } });
        return;
    } catch (err) {
        console.error(`Server error!!!`);
        console.error(err);
    }
});

// Run server (port as argument || hardcoded, address)
fastify.listen(process.argv[2] || 3020, `0.0.0.0`, function (err, address) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening on port ${address}`);
});
