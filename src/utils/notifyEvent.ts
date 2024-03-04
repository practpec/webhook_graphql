import fetch from "node-fetch";

export const notifyEvent = async (url: string, event: string) => {
    try {
        const body = {
            content: `Nuevo evento: ${event}`
        };
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error(`Error al enviar el mensaje a Discord: ${response.statusText}`);
        }
        console.log(`Mensaje enviado a Discord exitosamente con el URL: ${url}`);
    } catch (error) {
        console.error("Error sending data to Discord:", error);
        throw new Error("Error sending data to Discord webhook");
    }
};