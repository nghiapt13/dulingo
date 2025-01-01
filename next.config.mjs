/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    async headers() {
        return [
            {
                source: "/api/(.*)",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*"
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTION"
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization"
                    },
                    {
                        key: 'Access-Control-Expose-Headers',
                        value: 'Content-Range'
                    },
                    {
                        key: "Content-Range",
                        value: "bytes : 0-9/*"
                    },
                ],
            },
        ];
    },
};

export default withNextIntl(nextConfig);
