export default function handler(req, res) {
    if (req.method === "POST") {
        console.log(req.body);

        return res.status(200).json({
            success: true,
            message: "Working ✅"
        });
    }

    return res.status(405).json({ message: "Method not allowed" });
}