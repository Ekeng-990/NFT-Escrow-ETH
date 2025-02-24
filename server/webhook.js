import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

// Webhook endpoint for handling escrow events
app.post("/webhook", async (req, res) => {
    try {
        const { event, contractAddress, data } = req.body;

        console.log(`Received event: ${event} from contract: ${contractAddress}`);
        console.log("Event Data:", data);

        // Handle different event types
        switch (event) {
            case "FundsReleased":
                console.log("Funds have been released.", data);
                break;
            case "BuyerRefunded":
                console.log("Buyer has been refunded.", data);
                break;
            default:
                console.log("Unknown event received.");
        }

        res.status(200).json({ success: true, message: "Webhook received successfully." });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Webhook server running on port ${PORT}`);
});
