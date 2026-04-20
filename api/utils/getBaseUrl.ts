export default function getBaseUrl(): string {
    const environment = process.env.ENVIRONMENT as string;
    if (environment.toLowerCase() === "development") {
        return "http://localhost:3000"
    }
    return "https://waskarpeluqueria.com"
}