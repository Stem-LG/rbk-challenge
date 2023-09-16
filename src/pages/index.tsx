export default function Home() {
    return <></>;
}

export function getServerSideProps() {
    return {
        redirect: {
            destination: "/links",
            permanent: false,
        },
    };
}
