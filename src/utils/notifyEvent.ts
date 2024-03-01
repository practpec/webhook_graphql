import fetch from "node-fetch";

export const notifyEvent = async (message: string, webhookURL: string) => {
    const body = {
        content: message,
    };

    try {
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            console.error("Error al enviar el mensaje a Discord:", response.statusText);
            return false;
        }
        console.log("Mensaje enviado a Discord exitosamente");
        return true;

    } catch (error) {
        console.error("Error al enviar el mensaje a Discord:", error);
        return false;
    }
};